import { useState } from 'react';
import api from '../../api/axios';
import "/src/styles/main.scss";

function MessageInput({ senderId, receiverId, onMessageSent }) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSend = async () => {
    const trimmed = content.trim();
    if (!trimmed) return;

    try {
      const res = await api.post('/messages', {
        senderId,
        receiverId,
        content: trimmed
      });

      if (res.data?.result) {
        onMessageSent?.();
        setContent('');
        setError('');
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-input-container" role="form" aria-label="Send a message">
      <input
        type="text"
        className="message-input-field"
        placeholder="Type your message..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Message input field"
      />
      <button
        onClick={handleSend}
        className="message-send-button"
        aria-label="Send message"
      >
        Send
      </button>
      {error && <p className="message-error" role="alert">{error}</p>}
    </div>
  );
}

export default MessageInput;
