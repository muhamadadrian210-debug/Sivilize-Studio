'use client'

import { useState } from 'react'
import { generateAILayoutAction } from '@/app/editor/actions'
import { useEditorStore } from '@/store/editor-store'
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
} from '@dnd-kit/core'
import { buttonVariants } from '@/components/ui/button'

// A draggable tool item in the sidebar
function DraggableTool({ id, label }: { id: string; label: string }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `tool-${id}`,
    data: { type: id },
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`bg-muted/50 hover:border-primary flex h-20 cursor-grab items-center justify-center rounded border text-xs ${
        isDragging ? 'border-primary opacity-50' : 'border-border/50'
      }`}
    >
      {label}
    </div>
  )
}

// The main droppable canvas area
function CanvasArea({ title }: { title: string }) {
  const { setNodeRef } = useDroppable({
    id: 'canvas-droppable',
  })

  const elements = useEditorStore((state) => state.elements)
  const selectElement = useEditorStore((state) => state.selectElement)
  const paperSize = useEditorStore((state) => state.paperSize)

  // Define paper dimensions based on size (96 DPI)
  const getPaperDimensions = () => {
    switch (paperSize) {
      case 'Letter':
        return 'w-[816px] min-h-[1056px]'
      case 'Legal':
        return 'w-[816px] min-h-[1344px]'
      case 'A4':
      default:
        return 'w-[794px] min-h-[1123px]'
    }
  }

  return (
    <main
      className="flex flex-1 items-center justify-center overflow-auto bg-slate-950/60 p-8"
      onClick={() => selectElement(null)}
    >
      {/* Paper Container (Realistic Off-White Paper) */}
      <div
        ref={setNodeRef}
        className={`${getPaperDimensions()} relative flex flex-col rounded-sm border border-slate-200/50 bg-slate-50 p-16 text-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in-out`}
      >
        {/* Render elements based on state */}
        {elements.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 p-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-slate-800">{title}</h1>
            <p className="max-w-sm text-sm text-slate-500">
              Start dragging elements here or use AI to generate the document
              layout.
            </p>
          </div>
        ) : (
          elements.map((el) => (
            <div
              key={el.id}
              className="hover:border-primary/50 hover:bg-primary/5 group absolute cursor-pointer rounded border border-transparent p-2 transition-colors"
              style={{
                left: el.x,
                top: el.y,
                width: el.width,
                height: el.height,
              }}
              onClick={(e) => {
                e.stopPropagation()
                selectElement(el.id)
              }}
            >
              {el.type === 'text' ? (
                <div
                  className={`h-full w-full leading-relaxed whitespace-pre-wrap text-slate-700 ${
                    el.content.toLowerCase().includes('title') ||
                    el.content.toLowerCase().includes('header') ||
                    el.content.length < 50
                      ? 'text-2xl font-bold tracking-tight text-slate-900'
                      : 'text-sm'
                  }`}
                >
                  {el.content}
                </div>
              ) : (
                <div className="group-hover:border-primary/40 flex h-full w-full flex-col items-center justify-center rounded-lg border border-slate-300/60 bg-gradient-to-tr from-slate-100 to-slate-200 p-4 text-center">
                  <span className="text-2xl">🖼️</span>
                  <span className="mt-2 text-xs font-semibold text-slate-700">
                    AI Image Component
                  </span>
                  <span className="mt-1 max-w-[85%] truncate text-[10px] text-slate-400">
                    {el.content}
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  )
}

import { CollaborationPanel } from './CollaborationPanel'

export function EditorWorkspace({
  document,
}: {
  document: { id: string; title: string; type?: string }
}) {
  const [activeTab, setActiveTab] = useState<'properties' | 'comments'>(
    'properties'
  )
  const [isGenerating, setIsGenerating] = useState(false)
  const addElement = useEditorStore((state) => state.addElement)
  const selectedElementId = useEditorStore((state) => state.selectedElementId)
  const elements = useEditorStore((state) => state.elements)
  const updateElement = useEditorStore((state) => state.updateElement)
  const clearCanvas = useEditorStore((state) => state.clearCanvas)
  const paperSize = useEditorStore((state) => state.paperSize)

  const selectedElement = elements.find((el) => el.id === selectedElementId)

  // Handle AI Layout Generation
  const handleGenerateAI = async () => {
    setIsGenerating(true)
    try {
      const res = await generateAILayoutAction(
        document.type || 'Business Document',
        'Professional and clean layout with modern SaaS styling.'
      )
      if (res.success && res.layout) {
        clearCanvas()
        const pages = res.layout.pages
        if (pages && pages.length > 0) {
          const firstPage = pages[0]

          // Stack elements vertically to prevent layout overlaps
          let currentY = 80

          firstPage.elements.forEach(
            (
              aiEl: { type: string; contentPlaceholder?: string },
              idx: number
            ) => {
              const width = 634 // A4 width (794) minus left/right margins (80 * 2)
              let height = 80

              if (aiEl.type === 'image' || aiEl.type === 'logo') {
                height = 200
              } else if (aiEl.type === 'title') {
                height = 60
              } else {
                height = 120
              }

              addElement({
                id: `ai-el-${Date.now()}-${idx}`,
                type:
                  aiEl.type === 'image' || aiEl.type === 'logo'
                    ? 'image'
                    : 'text',
                x: 80, // standardized margin
                y: currentY,
                width,
                height,
                content: aiEl.contentPlaceholder || 'Generated Text',
              })

              currentY += height + 24 // offset with consistent margin spacing
            }
          )
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  // Handle drop event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event

    if (over && over.id === 'canvas-droppable') {
      const toolType = active.data.current?.type
      if (!toolType) return

      const newId = `el-${Date.now()}`

      const estimatedX = Math.max(50, 200 + delta.x)
      const estimatedY = Math.max(50, 100 + delta.y)

      addElement({
        id: newId,
        type: toolType as 'text' | 'image',
        x: estimatedX,
        y: estimatedY,
        width: 300,
        height: toolType === 'text' ? 100 : 200,
        content:
          toolType === 'text' ? 'Click to edit text...' : 'image-placeholder',
      })
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar (Tools/Elements) */}
        <aside className="bg-background border-border/40 w-64 space-y-6 overflow-y-auto border-r p-4">
          <div>
            <h3 className="text-muted-foreground mb-3 text-sm font-medium tracking-wider uppercase">
              Add Elements
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <DraggableTool id="text" label="Text Block" />
              <DraggableTool id="image" label="Image" />
            </div>
          </div>

          <div>
            <h3 className="text-muted-foreground mb-3 text-sm font-medium tracking-wider uppercase">
              AI Generation
            </h3>
            <button
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className={buttonVariants({
                variant: 'secondary',
                className: 'w-full text-xs',
              })}
            >
              {isGenerating ? '⏳ Generating...' : '✨ Generate Layout'}
            </button>
          </div>
        </aside>

        {/* Center Canvas */}
        <CanvasArea title={document.title} />

        {/* Right Sidebar (Properties & Comments) */}
        <aside className="bg-background border-border/40 flex w-64 flex-col border-l">
          <div className="border-border/40 flex border-b">
            <button
              className={`flex-1 p-3 text-xs font-semibold tracking-wider uppercase ${activeTab === 'properties' ? 'text-primary border-primary border-b-2' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('properties')}
            >
              Properties
            </button>
            <button
              className={`flex-1 p-3 text-xs font-semibold tracking-wider uppercase ${activeTab === 'comments' ? 'text-primary border-primary border-b-2' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('comments')}
            >
              Comments
            </button>
          </div>

          <div className="flex-1 overflow-hidden p-4">
            {activeTab === 'comments' ? (
              <CollaborationPanel documentId={document.id} />
            ) : (
              <>
                {!selectedElement ? (
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-xs">
                      Select an element to edit its properties, or edit document
                      properties below.
                    </p>

                    <div className="border-border/40 space-y-3 border-t pt-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold">
                          Paper Size
                        </label>
                        <select
                          className="bg-background border-border focus:ring-primary w-full rounded-md border p-2 text-sm focus:ring-1"
                          value={paperSize}
                          onChange={(e) => {
                            useEditorStore
                              .getState()
                              .setPaperSize(
                                e.target.value as 'A4' | 'Letter' | 'Legal'
                              )
                          }}
                        >
                          <option value="A4">A4 (210 x 297 mm)</option>
                          <option value="Letter">
                            US Letter (8.5 x 11 in)
                          </option>
                          <option value="Legal">US Legal (8.5 x 14 in)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold">Type</label>
                      <div className="text-sm capitalize">
                        {selectedElement.type}
                      </div>
                    </div>

                    {selectedElement.type === 'text' && (
                      <div className="space-y-1">
                        <label className="text-xs font-semibold">Content</label>
                        <textarea
                          className="bg-background border-border w-full rounded-md border p-2 text-sm"
                          value={selectedElement.content}
                          onChange={(e) =>
                            updateElement(selectedElement.id, {
                              content: e.target.value,
                            })
                          }
                          rows={5}
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold">Width</label>
                        <input
                          type="number"
                          className="bg-background border-border w-full rounded border p-1 text-sm"
                          value={selectedElement.width}
                          onChange={(e) =>
                            updateElement(selectedElement.id, {
                              width: parseInt(e.target.value),
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold">Height</label>
                        <input
                          type="number"
                          className="bg-background border-border w-full rounded border p-1 text-sm"
                          value={selectedElement.height}
                          onChange={(e) =>
                            updateElement(selectedElement.id, {
                              height: parseInt(e.target.value),
                            })
                          }
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
  )
}
