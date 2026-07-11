'use client'

import { useState, useEffect } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { getComments, addComment } from '@/app/editor/actions'

interface CollaborationPanelProps {
  documentId: string
}

export function CollaborationPanel({ documentId }: CollaborationPanelProps) {
  const [comments, setComments] = useState<
    { id: string; text: string; user: string }[]
  >([])
  const [newComment, setNewComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function loadComments() {
      const res = await getComments(documentId)
      if (res.success && res.comments) {
        setComments(
          res.comments.map(
            (c: { id: string; message: string; user?: string }) => ({
              id: c.id,
              text: c.message,
              user: c.user || 'User',
            })
          )
        )
      }
    }
    loadComments()
  }, [documentId])

  const handlePost = async () => {
    if (!newComment.trim()) return
    setIsLoading(true)
    const res = await addComment(documentId, newComment)
    if (res.success && res.comment) {
      setComments([
        ...comments,
        {
          id: res.comment.id,
          text: res.comment.message,
          user: res.comment.user || 'You',
        },
      ])
      setNewComment('')
    }
    setIsLoading(false)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto pr-2">
        {comments.length === 0 ? (
          <p className="text-muted-foreground mt-10 text-center text-xs">
            No comments yet. Start the conversation!
          </p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="bg-muted/50 space-y-1 rounded-lg p-3">
              <span className="text-xs font-semibold">{c.user}</span>
              <p className="text-muted-foreground text-xs">{c.text}</p>
            </div>
          ))
        )}
      </div>
      <div className="border-border/40 mt-4 space-y-2 border-t pt-4">
        <textarea
          className="bg-background border-border w-full resize-none rounded-md border p-2 text-xs"
          rows={3}
          placeholder="Leave a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className={buttonVariants({
            size: 'sm',
            className: 'h-8 w-full text-xs',
          })}
          onClick={handlePost}
          disabled={isLoading || !newComment.trim()}
        >
          {isLoading ? 'Posting...' : 'Post Comment'}
        </button>
      </div>
    </div>
  )
}
