import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import './styles.css';

const App = () => {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/new" element={<CreatePostWrapper />} />
        </Routes>
      </Router>
    </div>
  );
};

const CreatePostWrapper = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    navigate('/');
  };

  return <PostForm onSave={handleSave} />;
};

export default App;
