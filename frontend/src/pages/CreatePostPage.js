// frontend/src/pages/CreatePostPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; // no longer needed
import api from '../api/axios';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const fd = new FormData();
    fd.append('title', title);
    fd.append('body', body);
    if (image) fd.append('image', image);

    try {
      const { data } = await api.post('/posts', fd);
      navigate(`/posts/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to publish post');
    }
  };

  return (
    <>
      <main className="container content">
        <h1>Create New Post</h1>
        {error && <div className="error">{error}</div>}
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title"
                required
              />
            </div>
            <div className="form-group">
              <label>Content</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your post here..."
                rows="12"
                required
              />
            </div>
            {/* Image upload – available to all logged‑in users */}
            <div className="form-group">
              <label>Upload Image (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button type="submit" className="btn">Publish Post</button>
          </form>
        </div>
      </main>
      <br />
      <footer className="site-footer">
        <div className="container footer-container">
          <div className="footer-info">
            <p><strong>Enjoy visiting my WebLife!</strong></p>
            <p><i>(09) 273 997 603</i></p>
            <p><i>San Joaquin Norte, Agoo, La Union</i></p>
          </div>
          <div className="copyright">
            <p>&copy; 2023 Digital Personal Portfolio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default CreatePostPage;