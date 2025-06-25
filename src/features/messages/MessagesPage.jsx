import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../api/axios';
import Conversation from './Conversation';
import MessageInput from './MessageInput';
import "/src/styles/main.scss";

function MessagesPage() {
  const { userId1, userId2 } = useParams();
  const reduxUser = useSelector((state) => state.user.user);
  const currentUserId = reduxUser?.id;

  // Dynamically determine the receiver
  const routeId1 = parseInt(userId1, 10);
  const routeId2 = parseInt(userId2, 10);
  const receiverId = routeId1 === currentUserId ? routeId2 : routeId1;

  console.log("📦 useParams:", { userId1, userId2 });
  console.log("✅ currentUserId (from Redux):", currentUserId);
  console.log("✅ receiverId (derived):", receiverId);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let didCancel = false;

    const fetchMessages = async () => {
      if (!currentUserId || !receiverId) return;

      try {
        console.log("📤 Fetching messages between:", currentUserId, receiverId);
        const res = await api.get(`/messages/${currentUserId}/${receiverId}`);

        if (!didCancel) {
          const fetchedMessages = res.data.result || [];
          console.log("📥 Fetched messages:", fetchedMessages);
          setMessages(fetchedMessages);
          setError('');
        }
      } catch (err) {
        if (!didCancel) {
          console.error("❌ Error fetching messages:", err);
          setError('Failed to load conversation.');
        }
      } finally {
        if (!didCancel) {
          setLoading(false);
        }
      }
    };

    const markAsRead = async () => {
      if (!currentUserId || !receiverId) return;
      try {
        await api.post('/messages/mark-read', {
          userId: currentUserId,
          otherUserId: receiverId,
        });
      } catch (err) {
        console.error("⚠️ Failed to mark messages as read:", err);
      }
    };

    fetchMessages();
    markAsRead();

    return () => {
      didCancel = true;
    };
  }, [currentUserId, receiverId]);

  const handleMessageSent = async () => {
    try {
      console.log("✉️ Message sent. Refreshing...");
      await new Promise(resolve => setTimeout(resolve, 300));
      const res = await api.get(`/messages/${currentUserId}/${receiverId}`);
      setMessages(res.data.result || []);
    } catch (err) {
      console.error("🔁 Refresh after send failed:", err);
    }
  };

  if (!currentUserId) {
    return <p className="messages-loading">Loading user info...</p>;
  }

  return (
    <div className="messages-page" role="main" aria-labelledby="messages-title">
      <header className="messages-header">
        <Link to="/messages" className="back-link" aria-label="Back to message inbox">
          ← Back to inbox
        </Link>
        <h1 id="messages-title" className="visually-hidden">Conversation</h1>
      </header>

      <section className="messages-body">
        {error && <p className="messages-error" role="alert">{error}</p>}

        {loading ? (
          <p className="messages-loading">Loading conversation...</p>
        ) : messages.length === 0 ? (
          <p className="messages-empty">No messages yet. Start the conversation below.</p>
        ) : (
          <Conversation messages={messages} currentUserId={currentUserId} />
        )}
      </section>

      <footer className="messages-input">
        <MessageInput
          senderId={currentUserId}
          receiverId={receiverId}
          onMessageSent={handleMessageSent}
        />
      </footer>
    </div>
  );
}

export default MessagesPage;
