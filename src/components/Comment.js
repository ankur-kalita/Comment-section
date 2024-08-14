import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { editComment, deleteComment } from '../redux/commentsSlice';
import CommentForm from './CommentForm';
import { FaEdit, FaTrash, FaReply } from 'react-icons/fa';

const Comment = ({ comment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const dispatch = useDispatch();

  const handleEdit = () => {
    if (editedText.trim()) {
      dispatch(editComment({ id: comment.id, text: editedText }));
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteComment(comment.id));
  };

    return (
      <div className="comment">
        {/* <div className="comment-avatar">{comment.name[0].toUpperCase()}</div> */}
        <div className="comment-wrapper">
          <div className="comment-content">
            <div className="comment-header">
              <span className="comment-author">{comment.name}</span>
              <span className="comment-date">{format(new Date(comment.date), 'MMM d, yyyy HH:mm')}</span>
            </div>
            {isEditing ? (
              <div className="comment-edit">
                <textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                ></textarea>
                <button className="btn btn-primary" onClick={handleEdit}>Save</button>
                <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            ) : (
              <p className="comment-text">{comment.text}</p>
            )}
            <div className="comment-actions">
              <button className="btn btn-icon" onClick={() => setIsEditing(true)}><FaEdit /></button>
              <button className="btn btn-icon" onClick={() => setIsReplying(!isReplying)}><FaReply /></button>
            </div>
          </div>
          <button className="btn btn-icon delete-btn" onClick={handleDelete}><FaTrash /></button>
        </div>
        {isReplying && <CommentForm parentId={comment.id} onSubmit={() => setIsReplying(false)} />}
        {comment.replies && comment.replies.length > 0 && (
          <div className="replies">
            {comment.replies.map(reply => (
              <Comment key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    );
  };
export default Comment;