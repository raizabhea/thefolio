// frontend/src/pages/EditPostPage.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

function EditPostPage() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setTitle(res.data.title);
        setBody(res.data.body);
        setImage(res.data.image || '');
      } catch (err) {
        setError('Failed to load post');
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/posts/${id}`, { title, body, image });
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post');
    }
  };

  return (
    <main className="container content">
      <h1>Edit Post</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}
          <div className="form-group">
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} rows="10" required />
          </div>
          <div className="form-group">
            <label>Image URL (optional)</label>
            <input type="url" value={image} onChange={(e) => setImage(e.target.value)} />
          </div>
          <button type="submit">Update Post</button>
        </form>
      </div>
    </main>
  );
}

export default EditPostPage;