import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../api/axios';
import "/src/styles/main.scss";

function MessageInbox() {
  const currentUser = useSelector((state) => state.user.user);
  const currentUserId = currentUser?.id;

  const [inbox, setInbox] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!currentUserId) return;
    const fetchInbox = async () => {
      try {
        const res = await api.get('/messages/inbox');
        console.log("📥 Inbox response:", res.data.result);
        setInbox(res.data.result || []);
      } catch (err) {
        console.error('❌ Inbox fetch failed:', err);
        setError('Failed to load your messages.');
      }
    };
    fetchInbox();
  }, [currentUserId]);

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

      {error && <p className="inbox-error" role="alert">{error}</p>}

      <div className="inbox-section">
        {inbox.length === 0 ? (
          <p className="inbox-empty">No conversations yet.</p>
        ) : (
          <ul className="inbox-list">
            {inbox.map((msg) => {
              const otherUserId = msg.sender_id === currentUserId ? msg.receiver_id : msg.sender_id;
              const otherUsername =
                msg.sender_id === currentUserId
                  ? msg.receiver_username
                  : msg.sender_username;

              // ✅ Debug each message object
              console.log("💬 msg record:", msg);
              console.log("📨 Link debug:", {
                currentUserId,
                otherUserId,
                typeOfCurrentUserId: typeof currentUserId,
                typeOfOtherUserId: typeof otherUserId
              });

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
}

export default MessageInbox;
