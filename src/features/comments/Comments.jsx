import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getCommentsByEvent,
  createComment,
  deleteComment,
  updateComment
} from '../../api/commentService';

function Comments() {
  const { id: eventId } = useParams();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await getCommentsByEvent(eventId);
       if (response && response.data && response.data.result) {

          setComments(response.data.result);
        } else {
          setComments([]);
        }
      } catch (err) {
        console.error('❌ Error fetching comments:', err);
        setError('Failed to load comments.');
      }
    }

    fetchComments();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const response = await createComment(eventId, { text });
      if (response && response.data && response.data.comment) {
        setComments([...comments, response.data.comment]);
        setText('');
        setError('');
      }
    } catch (err) {
      console.error('❌ Error posting comment:', err);
      setError('Failed to post comment. Are you logged in?');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    try {
      await deleteComment(id);
      setComments(comments.filter((c) => c.id !== id));
    } catch (err) {
      console.error('❌ Error deleting comment:', err);
      setError('Failed to delete comment.');
    }
  };

  const handleEdit = (comment) => {
    setEditingId(comment.id);
    setEditText(comment.content);
  };

  const handleEditSave = async (id) => {
    if (!editText.trim()) return;

    try {
      await updateComment(id, { content: editText });
      setComments(
        comments.map((c) =>
          c.id === id ? { ...c, content: editText } : c
        )
      );
      setEditingId(null);
      setEditText('');
    } catch (err) {
      console.error('❌ Error updating comment:', err);
      setError('Failed to update comment.');
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText('');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Comments</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <textarea
          rows="3"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Post Comment
        </button>
      </form>

      <ul className="space-y-3">
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.id} className="border p-3 rounded">
              <p className="font-medium">{comment.name || 'Anonymous'}</p>

              {editingId === comment.id ? (
                <>
                  <textarea
                    className="border p-2 w-full mt-2"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handleEditSave(comment.id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-400 text-white px-2 py-1 rounded"
                      onClick={handleEditCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="mt-1">{comment.content}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                      onClick={() => handleEdit(comment)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(comment.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No comments yet.</li>
        )}
      </ul>
    </div>
  );
}

export default Comments;
