import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment, addReply } from '../redux/commentsSlice';

const CommentForm = ({ parentId = null, onSubmit }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && text.trim()) {
      const newComment = {
        id: Date.now(),
        name,
        text,
        date: new Date().toISOString(),
        replies: [],
      };
      if (parentId) {
        dispatch(addReply({ parentId, reply: newComment }));
      } else {
        dispatch(addComment(newComment));
      }
      setName('');
      setText('');
      if (onSubmit) onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      ></textarea>
      <button type="Post" className="btn btn-primary">Post</button>
    </form>
  );
};

export default CommentForm;