import { createSlice } from '@reduxjs/toolkit';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: JSON.parse(localStorage.getItem('comments')) || [],
  reducers: {
    addComment: (state, action) => {
      state.unshift(action.payload);
      localStorage.setItem('comments', JSON.stringify(state));
    },
    addReply: (state, action) => {
      const { parentId, reply } = action.payload;
      const addReplyToComment = (comments) => {
        for (let comment of comments) {
          if (comment.id === parentId) {
            comment.replies = comment.replies || [];
            comment.replies.unshift(reply);
            return true;
          }
          if (comment.replies && addReplyToComment(comment.replies)) {
            return true;
          }
        }
        return false;
      };
      addReplyToComment(state);
      localStorage.setItem('comments', JSON.stringify(state));
    },
    editComment: (state, action) => {
      const { id, text } = action.payload;
      const editCommentById = (comments) => {
        for (let comment of comments) {
          if (comment.id === id) {
            comment.text = text;
            return true;
          }
          if (comment.replies && editCommentById(comment.replies)) {
            return true;
          }
        }
        return false;
      };
      editCommentById(state);
      localStorage.setItem('comments', JSON.stringify(state));
    },
    deleteComment: (state, action) => {
      const deleteCommentById = (comments) => {
        const index = comments.findIndex(c => c.id === action.payload);
        if (index !== -1) {
          comments.splice(index, 1);
          return true;
        }
        for (let comment of comments) {
          if (comment.replies && deleteCommentById(comment.replies)) {
            return true;
          }
        }
        return false;
      };
      deleteCommentById(state);
      localStorage.setItem('comments', JSON.stringify(state));
    },
  },
});

export const { addComment, addReply, editComment, deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;