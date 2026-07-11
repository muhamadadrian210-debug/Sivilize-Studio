import { create } from 'zustand'

export type ElementType = 'text' | 'image'

export interface EditorElement {
  id: string
  type: ElementType
  x: number
  y: number
  width: number
  height: number
  content: string // text content or image URL
  style?: Record<string, unknown> // font size, weight, etc.
}

interface EditorState {
  elements: EditorElement[]
  selectedElementId: string | null
  paperSize: 'A4' | 'Letter' | 'Legal'

  // Actions
  addElement: (element: EditorElement) => void
  updateElement: (id: string, updates: Partial<EditorElement>) => void
  setPaperSize: (size: 'A4' | 'Letter' | 'Legal') => void
  clearCanvas: () => void
  removeElement: (id: string) => void
  selectElement: (id: string | null) => void
}

export const useEditorStore = create<EditorState>((set) => ({
  elements: [],
  selectedElementId: null,
  paperSize: 'A4',

  addElement: (element) =>
    set((state) => ({ elements: [...state.elements, element] })),

  updateElement: (id, updates) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      ),
    })),

  removeElement: (id: string) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
      selectedElementId:
        state.selectedElementId === id ? null : state.selectedElementId,
    })),

  selectElement: (id: string | null) => set({ selectedElementId: id }),
  setPaperSize: (size) => set({ paperSize: size }),

  clearCanvas: () => set({ elements: [], selectedElementId: null }),
}))
