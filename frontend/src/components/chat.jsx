import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api.js";
import socket from "../services/socket.js";

import "./chat.css";

function Chat() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [error, setError] = useState("");

  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // =========================
  // Redirect if user not found
  // =========================
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // =========================
  // Connect Socket
  // =========================
  useEffect(() => {
    if (!user?.username) {
      return;
    }

    socket.connect();

    const handleConnect = () => {
      console.log("Socket connected:", socket.id);

      socket.emit("userOnline", user.username);
    };

    if (socket.connected) {
      socket.emit("userOnline", user.username);
    }

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [user?.username]);

  // =========================
  // Fetch Previous Messages
  // =========================
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setError("");

        const response = await API.get("/messages");

        setMessages(response.data.messages);
      } catch (error) {
        console.error("Failed to fetch messages:", error);

        setError("Failed to load messages.");
      }
    };

    fetchMessages();
  }, []);

  // =========================
  // Receive Real-Time Messages
  // =========================
  useEffect(() => {
    const handleReceiveMessage = (newMessage) => {
      setMessages((previousMessages) => {
        // Prevent duplicate messages
        const alreadyExists = previousMessages.some(
          (msg) => msg._id === newMessage._id
        );

        if (alreadyExists) {
          return previousMessages;
        }

        return [...previousMessages, newMessage];
      });
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, []);

  // =========================
  // Socket Message Errors
  // =========================
  useEffect(() => {
    const handleMessageError = (data) => {
      setError(data.message);
    };

    socket.on("messageError", handleMessageError);

    return () => {
      socket.off("messageError", handleMessageError);
    };
  }, []);

  // =========================
  // Typing Indicator
  // =========================
  useEffect(() => {
    const handleTyping = (username) => {
      setTypingUser(username);
    };

    const handleStoppedTyping = () => {
      setTypingUser("");
    };

    socket.on("userTyping", handleTyping);
    socket.on("userStoppedTyping", handleStoppedTyping);

    return () => {
      socket.off("userTyping", handleTyping);
      socket.off(
        "userStoppedTyping",
        handleStoppedTyping
      );
    };
  }, []);

  // =========================
  // Online Users
  // =========================
  useEffect(() => {
    const handleOnlineUsers = (users) => {
      setOnlineUsers(users);
    };

    socket.on("onlineUsers", handleOnlineUsers);

    return () => {
      socket.off("onlineUsers", handleOnlineUsers);
    };
  }, []);

  // =========================
  // Auto Scroll
  // =========================
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typingUser]);

  // =========================
  // Handle Typing
  // =========================
  const handleTyping = (e) => {
    const value = e.target.value;

    setMessage(value);
    setError("");

    clearTimeout(typingTimeoutRef.current);

    if (value.trim()) {
      socket.emit("typing", user.username);

      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("stopTyping");
      }, 1000);
    } else {
      socket.emit("stopTyping");
    }
  };

  // =========================
  // Send Message
  // =========================
  const sendMessage = () => {
    if (!message.trim()) {
      return;
    }

    if (!socket.connected) {
      setError("Connection lost. Please wait...");
      return;
    }

    socket.emit("sendMessage", {
      sender: user._id,
      message: message.trim(),
    });

    socket.emit("stopTyping");

    clearTimeout(typingTimeoutRef.current);

    setMessage("");
    setError("");
  };

  // =========================
  // Handle Enter Key
  // =========================
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  // =========================
  // Logout
  // =========================
  const handleLogout = () => {
    socket.emit("stopTyping");

    clearTimeout(typingTimeoutRef.current);

    socket.disconnect();

    localStorage.removeItem("user");

    navigate("/login");
  };

  // =========================
  // If User Doesn't Exist
  // =========================
  if (!user) {
    return null;
  }

  return (
    <div className="chat-container">

      {/* =========================
          Header
      ========================= */}
      <div className="chat-header">

        <div>
          <h1>ChatVerse</h1>

          <p>
            Logged in as{" "}
            <strong>{user.username}</strong>
          </p>

          <span className="online-status">
            🟢 {onlineUsers.length}{" "}
            {onlineUsers.length === 1
              ? "user"
              : "users"}{" "}
            online
          </span>
        </div>

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>

      {/* =========================
          Error
      ========================= */}
      {error && (
        <div className="chat-error">
          {error}
        </div>
      )}

      {/* =========================
          Messages
      ========================= */}
      <div className="messages-container">

        {messages.length === 0 ? (
          <div className="empty-chat">
            <p>No messages yet.</p>
            <span>
              Start the conversation!
            </span>
          </div>
        ) : (
          messages.map((msg) => {

            const isOwnMessage =
              String(msg.sender?._id) ===
              String(user._id);

            return (
              <div
                key={msg._id}
                className={`message ${
                  isOwnMessage
                    ? "own-message"
                    : "other-message"
                }`}
              >

                {!isOwnMessage && (
                  <strong>
                    {msg.sender?.username}
                  </strong>
                )}

                <p>{msg.message}</p>

                <small>
                  {new Date(
                    msg.createdAt
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </small>

              </div>
            );
          })
        )}

        {/* Typing Indicator */}
        {typingUser && (
          <div className="typing-indicator">
            {typingUser} is typing...
          </div>
        )}

        <div ref={messagesEndRef} />

      </div>

      {/* =========================
          Message Input
      ========================= */}
      <div className="message-input">

        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={handleTyping}
          onKeyDown={handleKeyDown}
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </div>
  );
}

export default Chat;