// /src/components/Comments.jsx

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getCommentsByEvent,
  createComment,
  deleteComment,
  updateComment
} from '../../api/commentService';
import "/src/styles/main.scss";

/**
 * Comments Component
 * Handles fetching, displaying, creating, editing, and deleting comments for a specific event.
 */
function Comments() {
  const { id: eventId } = useParams(); // Get event ID from URL params
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null); // Track which comment is being edited
  const [editContent, setEditContent] = useState(''); // Temporary content for the edit textarea

  // Fetch comments on mount or when eventId changes
  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await getCommentsByEvent(eventId);
        setComments(response?.result || []);
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError('Failed to load comments.');
      }
    }

    fetchComments();
  }, [eventId]);

  // Handle new comment form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const response = await createComment(eventId, content);
      if (response?.comment) {
        setComments([...comments, response.comment]);
        setContent('');
        setError('');
      }
    } catch (err) {
      console.error('Error posting comment:', err);
      setError('Failed to post comment. Are you logged in?');
    }
  };

  // Handle comment deletion
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      await deleteComment(id);
      setComments(comments.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Error deleting comment:', err);
      setError('Failed to delete comment.');
    }
  };

  // Start editing a comment
  const handleEdit = (comment) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  // Save edited comment
  const handleEditSave = async (id) => {
    if (!editContent.trim()) return;

    try {
      await updateComment(id, { content: editContent });
      setComments(
        comments.map((c) =>
          c.id === id ? { ...c, content: editContent } : c
        )
      );
      setEditingId(null);
      setEditContent('');
    } catch (err) {
      console.error('Error updating comment:', err);
      setError('Failed to update comment.');
    }
  };

  // Cancel editing mode
  const handleEditCancel = () => {
    setEditingId(null);
    setEditContent('');
  };

  return (
    <div className="comments-section" role="region" aria-labelledby="comments-title">
      <h2 id="comments-title" className="comments-title">Comments</h2>

      {error && <p className="comments-error" role="alert">{error}</p>}

      {/* New Comment Form */}
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          rows="3"
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="comment-input"
          aria-label="New comment"
          required
        />
        <button type="submit" className="comment-button">Post Comment</button>
      </form>

      {/* List of Comments */}
      <ul className="comment-list">
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <p className="comment-author">{comment.name || 'Anonymous'}</p>

              {editingId === comment.id ? (
                <>
                  <textarea
                    className="comment-edit-input"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    aria-label="Edit comment"
                  />
                  <div className="comment-actions">
                    <button className="comment-save" onClick={() => handleEditSave(comment.id)}>Save</button>
                    <button className="comment-cancel" onClick={handleEditCancel}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <p className="comment-content">{comment.content}</p>
                  <div className="comment-actions">
                    <button className="comment-edit" onClick={() => handleEdit(comment)}>Edit</button>
                    <button className="comment-delete" onClick={() => handleDelete(comment.id)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))
        ) : (
          <li className="comment-empty">No comments yet.</li>
        )}
      </ul>
    </div>
  );
}

export default Comments;
