import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Comments from './components/comments';
import Posts from './components/posts';
import Profile from './components/profile';

const App = () => {
  return (
    <Routes>
      {/* Layout Route - applies to all nested routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} /> {/* this is for "/" */}
        <Route path="profile" element={<Profile />} />
        <Route path="posts" element={<Posts />} />
        <Route path="comments" element={<Comments />} />
        {/* Optional: 404 fallback */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Route>
    </Routes>
  );
};

export default App;

