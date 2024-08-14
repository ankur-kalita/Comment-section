import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';
import Comment from './Comment';

function CommentSection() {
  const comments = useSelector(state => state.comments);
  const [sortedComments, setSortedComments] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  const sortCommentsAndReplies = (commentsList, order) => {
    return commentsList
      .map(comment => ({
        ...comment,
        replies: sortCommentsAndReplies(comment.replies || [], order),
      }))
      .sort((a, b) => {
        return order === 'asc'
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      });
  };

  useEffect(() => {
    const sorted = sortCommentsAndReplies(comments, sortOrder);
    setSortedComments(sorted);
  }, [comments, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="comment-section">
      <h2>Leave a comment</h2>
      <CommentForm />
      <div className="sort-button" onClick={toggleSortOrder}>
        Sort by Date ({sortOrder === 'asc' ? 'Oldest First' : 'Newest First'})
      </div>
      <div className="comments-list">
        {sortedComments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
