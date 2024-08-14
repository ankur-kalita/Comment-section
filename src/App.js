// import React from 'react';
// import { useSelector } from 'react-redux';
// import CommentForm from './components/CommentForm';
// import Comment from './components/Comment';
// import './App.css';

// function App() {
//   const comments = useSelector(state => state.comments);

//   return (
//     <div className="App">
//       <h1>Comments Section</h1>
//       <CommentForm />
//       <div className="comments-list">
//         {comments.map(comment => (
//           <Comment key={comment.id} comment={comment} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import CommentSection from './components/CommentSection';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Community Discussion</h1>
      </header>
      <main>
        <CommentSection />
      </main>
    </div>
  );
}

export default App;