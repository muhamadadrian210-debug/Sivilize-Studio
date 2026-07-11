'use client'

import { useState } from 'react'
import { buttonVariants } from '@/components/ui/button'

export function CollaborationPanel({
  documentId: _documentId,
}: {
  documentId: string
}) {
  const [comments, setComments] = useState<
    { id: string; text: string; user: string }[]
  >([])
  const [newComment, setNewComment] = useState('')

  const handlePost = () => {
    if (!newComment.trim()) return
    setComments([
      ...comments,
      { id: Date.now().toString(), text: newComment, user: 'You' },
    ])
    setNewComment('')
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
          onClick={handlePost}
          className={buttonVariants({
            size: 'sm',
            className: 'h-8 w-full text-xs',
          })}
        >
          Post Comment
        </button>
      </div>
    </div>
  )
}
