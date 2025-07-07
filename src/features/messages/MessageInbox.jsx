import {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle
} from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../api/axios';
import "/src/styles/main.scss";

/**
 * MessageInbox Component
 * Displays a list of conversations and users to start a new message.
 * Supports refresh from parent component using a forwarded ref.
 */
const MessageInbox = forwardRef((props, ref) => {
  const currentUser = useSelector((state) => state.user.user); // Get logged-in user from Redux
  const currentUserId = currentUser?.id;

  const [inbox, setInbox] = useState([]); // Holds the list of recent conversations
  const [users, setUsers] = useState([]); // Holds the list of all other users
  const [error, setError] = useState(''); // Stores any error messages for UI display

  /**
   * Fetches the user's inbox (recent conversations).
   * Called on component mount and can be triggered externally using the ref.
   */
  const refreshInbox = async () => {
    if (!currentUserId) return;
    try {
      const res = await api.get('/messages/inbox');
      console.log("📥 Inbox refreshed:", res.data.result);
      setInbox(res.data.result || []);
    } catch (err) {
      console.error('❌ Inbox fetch failed:', err);
      setError('Failed to load your messages.');
    }
  };

  /**
   * Expose refreshInbox method to parent component via useImperativeHandle.
   * This enables parent components to manually trigger a refresh.
   */
  useImperativeHandle(ref, () => ({
    refreshInbox
  }));

  /**
   * Initial load: fetch inbox once when component is mounted.
   */
  useEffect(() => {
    refreshInbox();
  }, [currentUserId]);

  /**
   * Fetch all users except the currently logged-in user (for "Start New Chat" section).
   */
  useEffect(() => {
    if (!currentUserId) return;
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users');
        const others = res.data.result?.filter((u) => u.id !== currentUserId) || [];
        setUsers(others);
      } catch (err) {
        console.error('❌ User fetch failed:', err);
        setError('Unable to load users.');
      }
    };
    fetchUsers();
  }, [currentUserId]);

  return (
    <section className="inbox-container" role="main" aria-labelledby="inbox-title">
      <h2 id="inbox-title" className="inbox-heading">Messages</h2>

      {/* Error display if any API call fails */}
      {error && <p className="inbox-error" role="alert">{error}</p>}

      {/* Inbox Section (list of existing conversations) */}
      <div className="inbox-section">
        {inbox.length === 0 || inbox.filter(msg => msg.sender_id && msg.receiver_id && msg.id).length === 0 ? (
          <p className="inbox-empty"></p>
        ) : (
          <ul className="inbox-list">
            {inbox.map((msg) => {
              const otherUserId = msg.sender_id === currentUserId ? msg.receiver_id : msg.sender_id;
              const otherUsername =
                msg.sender_id === currentUserId
                  ? msg.receiver_username
                  : msg.sender_username;

              // Avoid displaying malformed messages
              if (!otherUserId || isNaN(otherUserId)) {
                console.warn("⚠️ Skipping malformed message:", msg);
                return null;
              }

              return (
                <li key={msg.id} className="inbox-item">
                  <Link
                    to={`/messages/${currentUserId}/${otherUserId}`}
                    className="inbox-link"
                    aria-label={`Open chat with ${otherUsername || 'user'}`}
                  >
                    {otherUsername || 'Unknown user'}
                    {/* Show unread indicator for messages not seen by the receiver */}
                    {!msg.seen && msg.receiver_id === currentUserId && (
                      <span className="inbox-badge" aria-label="New message">●</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="inbox-divider" />

      {/* Section to start a new conversation */}
      <h3 className="inbox-subheading">Start New Chat</h3>

      <div className="inbox-section">
        {users.length === 0 ? (
          <p className="inbox-empty">No users available.</p>
        ) : (
          <ul className="user-list">
            {users.map((user) => (
              <li key={user.id} className="user-item">
                <Link
                  to={`/messages/${currentUserId}/${user.id}`}
                  className="user-link"
                  aria-label={`Message ${user.username || user.firstName}`}
                >
                  {user.username || `${user.firstName} ${user.lastName}`}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
});

export default MessageInbox;
