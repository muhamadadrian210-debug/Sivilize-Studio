"use client";

import { useState } from "react";
import { generateAILayoutAction } from "@/app/editor/actions";
import { useEditorStore } from "@/store/editor-store";
import { DndContext, useDraggable, useDroppable, DragEndEvent } from "@dnd-kit/core";
import { buttonVariants } from "@/components/ui/button";

// A draggable tool item in the sidebar
function DraggableTool({ id, label }: { id: string; label: string }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `tool-${id}`,
    data: { type: id }
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`h-20 bg-muted/50 border rounded flex items-center justify-center text-xs cursor-grab hover:border-primary ${
        isDragging ? "opacity-50 border-primary" : "border-border/50"
      }`}
    >
      {label}
    </div>
  );
}

// The main droppable canvas area
function CanvasArea({ documentId, title }: { documentId: string; title: string }) {
  const { setNodeRef } = useDroppable({
    id: "canvas-droppable",
  });
  
  const elements = useEditorStore((state) => state.elements);
  const selectElement = useEditorStore((state) => state.selectElement);
  const paperSize = useEditorStore((state) => state.paperSize);

  // Define paper dimensions based on size (96 DPI)
  const getPaperDimensions = () => {
    switch(paperSize) {
      case "Letter": return "w-[816px] min-h-[1056px]";
      case "Legal": return "w-[816px] min-h-[1344px]";
      case "A4":
      default: return "w-[794px] min-h-[1123px]";
    }
  };

  return (
    <main className="flex-1 overflow-auto flex items-center justify-center p-8 bg-slate-950/60" onClick={() => selectElement(null)}>
      {/* Paper Container (Realistic Off-White Paper) */}
      <div 
        ref={setNodeRef}
        className={`${getPaperDimensions()} bg-slate-50 text-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-200/50 p-16 relative flex flex-col transition-all duration-300 ease-in-out rounded-sm`}
      >
        {/* Render elements based on state */}
        {elements.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{title}</h1>
            <p className="text-sm text-slate-500 max-w-sm">Start dragging elements here or use AI to generate the document layout.</p>
          </div>
        ) : (
          elements.map((el) => (
            <div 
              key={el.id} 
              className="absolute border border-transparent hover:border-primary/50 hover:bg-primary/5 cursor-pointer p-2 rounded transition-colors group"
              style={{ left: el.x, top: el.y, width: el.width, height: el.height }}
              onClick={(e) => { e.stopPropagation(); selectElement(el.id); }}
            >
              {el.type === "text" ? (
                <div className={`w-full h-full text-slate-700 whitespace-pre-wrap leading-relaxed ${
                  el.content.toLowerCase().includes("title") || el.content.toLowerCase().includes("header") || el.content.length < 50
                    ? "text-2xl font-bold tracking-tight text-slate-900"
                    : "text-sm"
                }`}>
                  {el.content}
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-slate-100 to-slate-200 border border-slate-300/60 rounded-lg flex flex-col items-center justify-center p-4 text-center group-hover:border-primary/40">
                  <span className="text-2xl">🖼️</span>
                  <span className="text-xs font-semibold text-slate-700 mt-2">AI Image Component</span>
                  <span className="text-[10px] text-slate-400 mt-1 max-w-[85%] truncate">{el.content}</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  );
}

import { CollaborationPanel } from "./CollaborationPanel";

export function EditorWorkspace({ document }: { document: any }) {
  const [activeTab, setActiveTab] = useState<"properties" | "comments">("properties");
  const [isGenerating, setIsGenerating] = useState(false);
  const addElement = useEditorStore((state) => state.addElement);
  const selectedElementId = useEditorStore((state) => state.selectedElementId);
  const elements = useEditorStore((state) => state.elements);
  const updateElement = useEditorStore((state) => state.updateElement);
  const clearCanvas = useEditorStore((state) => state.clearCanvas);
  const paperSize = useEditorStore((state) => state.paperSize);
  
  const selectedElement = elements.find(el => el.id === selectedElementId);

  // Handle AI Layout Generation
  const handleGenerateAI = async () => {
    setIsGenerating(true);
    try {
      const res = await generateAILayoutAction(document.type || "Business Document", "Professional and clean layout with modern SaaS styling.");
      if (res.success && res.layout) {
        clearCanvas();
        const pages = res.layout.pages;
        if (pages && pages.length > 0) {
          const firstPage = pages[0];
          
          // Stack elements vertically to prevent layout overlaps
          let currentY = 80;
          
          firstPage.elements.forEach((aiEl: any, idx: number) => {
            const width = 634; // A4 width (794) minus left/right margins (80 * 2)
            let height = 80;
            
            if (aiEl.type === "image" || aiEl.type === "logo") {
              height = 200;
            } else if (aiEl.type === "title") {
              height = 60;
            } else {
              height = 120;
            }

            addElement({
              id: `ai-el-${Date.now()}-${idx}`,
              type: (aiEl.type === "image" || aiEl.type === "logo") ? "image" : "text",
              x: 80, // standardized margin
              y: currentY,
              width,
              height,
              content: aiEl.contentPlaceholder || "Generated Text",
            });

            currentY += height + 24; // offset with consistent margin spacing
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle drop event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event;
    
    if (over && over.id === "canvas-droppable") {
      const toolType = active.data.current?.type;
      if (!toolType) return;

      const newId = `el-${Date.now()}`;
      
      const estimatedX = Math.max(50, 200 + delta.x); 
      const estimatedY = Math.max(50, 100 + delta.y);

      addElement({
        id: newId,
        type: toolType as "text" | "image",
        x: estimatedX,
        y: estimatedY,
        width: 300,
        height: toolType === "text" ? 100 : 200,
        content: toolType === "text" ? "Click to edit text..." : "image-placeholder",
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (Tools/Elements) */}
        <aside className="w-64 bg-background border-r border-border/40 p-4 space-y-6 overflow-y-auto">
          <div>
            <h3 className="text-sm font-medium mb-3 uppercase tracking-wider text-muted-foreground">Add Elements</h3>
            <div className="grid grid-cols-2 gap-2">
              <DraggableTool id="text" label="Text Block" />
              <DraggableTool id="image" label="Image" />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3 uppercase tracking-wider text-muted-foreground">AI Generation</h3>
            <button 
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className={buttonVariants({ variant: "secondary", className: "w-full text-xs" })}
            >
              {isGenerating ? "⏳ Generating..." : "✨ Generate Layout"}
            </button>
          </div>
        </aside>

        {/* Center Canvas */}
        <CanvasArea documentId={document.id} title={document.title} />
        
        {/* Right Sidebar (Properties & Comments) */}
        <aside className="w-64 bg-background border-l border-border/40 flex flex-col">
          <div className="flex border-b border-border/40">
            <button 
              className={`flex-1 p-3 text-xs font-semibold uppercase tracking-wider ${activeTab === "properties" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
              onClick={() => setActiveTab("properties")}
            >
              Properties
            </button>
            <button 
              className={`flex-1 p-3 text-xs font-semibold uppercase tracking-wider ${activeTab === "comments" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
              onClick={() => setActiveTab("comments")}
            >
              Comments
            </button>
          </div>
          
          <div className="p-4 flex-1 overflow-hidden">
            {activeTab === "comments" ? (
              <CollaborationPanel documentId={document.id} />
            ) : (
              <>
                {!selectedElement ? (
                  <div className="space-y-4">
                    <p className="text-xs text-muted-foreground">Select an element to edit its properties, or edit document properties below.</p>
                    
                    <div className="pt-4 border-t border-border/40 space-y-3">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold">Paper Size</label>
                        <select 
                          className="w-full p-2 text-sm bg-background border border-border rounded-md focus:ring-1 focus:ring-primary"
                          value={paperSize}
                          onChange={(e) => {
                            useEditorStore.getState().setPaperSize(e.target.value as "A4" | "Letter" | "Legal");
                          }}
                        >
                          <option value="A4">A4 (210 x 297 mm)</option>
                          <option value="Letter">US Letter (8.5 x 11 in)</option>
                          <option value="Legal">US Legal (8.5 x 14 in)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold">Type</label>
                      <div className="text-sm capitalize">{selectedElement.type}</div>
                    </div>
                    
                    {selectedElement.type === "text" && (
                      <div className="space-y-1">
                        <label className="text-xs font-semibold">Content</label>
                        <textarea 
                          className="w-full p-2 text-sm bg-background border border-border rounded-md"
                          value={selectedElement.content}
                          onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
                          rows={5}
                        />
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold">Width</label>
                        <input 
                          type="number" 
                          className="w-full p-1 text-sm bg-background border border-border rounded"
                          value={selectedElement.width}
                          onChange={(e) => updateElement(selectedElement.id, { width: parseInt(e.target.value) })}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold">Height</label>
                        <input 
                          type="number" 
                          className="w-full p-1 text-sm bg-background border border-border rounded"
                          value={selectedElement.height}
                          onChange={(e) => updateElement(selectedElement.id, { height: parseInt(e.target.value) })}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </aside>
      </div>
    </DndContext>
  );
}
