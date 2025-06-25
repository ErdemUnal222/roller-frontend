import React, { useEffect, useRef } from 'react';

/**
 * Conversation Component
 * Displays chat messages and auto-scrolls to latest.
 *
 * Props:
 * - messages: array of message objects
 * - currentUserId: ID of the currently logged-in user
 */
function Conversation({ messages, currentUserId }) {
  const endRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!endRef.current) return;

    const scrollToBottom = () => {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const timeout = setTimeout(scrollToBottom, 100);

    console.log("Conversation props → messages:", messages);
    console.log("currentUserId:", currentUserId);
    console.table(messages);

    return () => clearTimeout(timeout);
  }, [messages]);

  if (!Array.isArray(messages)) {
    return (
      <div className="conversation-placeholder text-gray-500 p-4">
        No conversation loaded.
      </div>
    );
  }

  return (
    <div className="conversation-container" ref={containerRef}>
      {messages.filter(Boolean).map((msg) => {
        if (!msg || typeof msg !== 'object') return null;

        console.log('💬 msg record:', msg);

        // ✅ Force number comparison to prevent type mismatch issues
        const isSentByCurrentUser = Number(msg.sender_id) === Number(currentUserId);

        const senderLabel = isSentByCurrentUser
          ? 'You'
          : msg.sender_username || `User ${msg.sender_id}`;

        return (
          <div
            key={msg.id}
            className={`conversation-message ${isSentByCurrentUser ? 'sent' : 'received'}`}
            style={{
              border: '1px solid',
              borderColor: isSentByCurrentUser ? '#4caf50' : '#ccc',
              backgroundColor: isSentByCurrentUser ? '#d1f7c4' : '#f1f1f1',
              padding: '8px',
              margin: '8px',
              borderRadius: '8px',
            }}
          >
            <div
              className={`message-bubble ${isSentByCurrentUser ? 'sent' : 'received'} ${
                msg.seen ? '' : 'unread'
              }`}
            >
              <p className="message-sender"><strong>{senderLabel}</strong></p>
              <p className="message-text">{msg.content || 'No message'}</p>
              <p className="message-time">
                {msg.sent_at
                  ? new Date(msg.sent_at).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : 'Unknown time'}
              </p>
            </div>
          </div>
        );
      })}
      <div ref={endRef} />
    </div>
  );
}

export default Conversation;
