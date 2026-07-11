"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";

export function CollaborationPanel({ documentId }: { documentId: string }) {
  const [comments, setComments] = useState<{id: string, text: string, user: string}[]>([]);
  const [newComment, setNewComment] = useState("");

  const handlePost = () => {
    if (!newComment.trim()) return;
    setComments([...comments, { id: Date.now().toString(), text: newComment, user: "You" }]);
    setNewComment("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {comments.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center mt-10">No comments yet. Start the conversation!</p>
        ) : (
          comments.map(c => (
            <div key={c.id} className="bg-muted/50 p-3 rounded-lg space-y-1">
              <span className="text-xs font-semibold">{c.user}</span>
              <p className="text-xs text-muted-foreground">{c.text}</p>
            </div>
          ))
        )}
      </div>
      <div className="pt-4 border-t border-border/40 space-y-2 mt-4">
        <textarea 
          className="w-full p-2 text-xs bg-background border border-border rounded-md resize-none"
          rows={3}
          placeholder="Leave a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handlePost} className={buttonVariants({ size: "sm", className: "w-full text-xs h-8" })}>
          Post Comment
        </button>
      </div>
    </div>
  );
}
