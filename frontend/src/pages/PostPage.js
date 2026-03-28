// frontend/src/pages/PostPage.js
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

// Define backend URL (adjust port if needed)
const BACKEND_URL = 'http://localhost:5000';

function PostPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const [postRes, commentsRes] = await Promise.all([
          api.get(`/posts/${id}`),
          api.get(`/comments/${id}`)
        ]);
        setPost(postRes.data);
        setComments(commentsRes.data);
      } catch (err) {
        console.error('Failed to fetch post or comments', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPostAndComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const res = await api.post(`/comments/${id}`, { body: newComment });
      setComments([...comments, res.data]);
      setNewComment('');
    } catch (err) {
      console.error('Comment failed', err);
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await api.delete(`/posts/${id}`);
      navigate('/home');
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter(c => c._id !== commentId));
    } catch (err) {
      alert('Failed to delete comment');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  const isAuthor = user?._id === post.author?._id;
  const isAdmin = user?.role === 'admin';
  const canModifyPost = isAuthor || isAdmin;

  return (
    <main className="container content">
      <article className="post-full">
        {post.image && (
          <img
            src={`${BACKEND_URL}/uploads/${post.image}`}
            alt={post.title}
            className="post-full-image"
          />
        )}
        <h1>{post.title}</h1>
        <p className="post-meta">
          By {post.author?.name} on {new Date(post.createdAt).toLocaleDateString()}
          {canModifyPost && (
            <span style={{ marginLeft: '20px' }}>
              <Link to={`/edit-post/${post._id}`} className="btn" style={{ marginRight: '10px' }}>Edit</Link>
              <button onClick={handleDeletePost} className="btn" style={{ background: '#dc3545' }}>Delete</button>
            </span>
          )}
        </p>
        <div className="post-content">{post.body}</div>
      </article>

      <section className="comments-section">
        <h2>Comments</h2>
        {comments.map((c) => {
          const isCommentAuthor = user?._id === c.author?._id;
          const canDeleteComment = isCommentAuthor || isAdmin;
          return (
            <div key={c._id} className="comment">
              <strong>{c.author?.name}:</strong> {c.body}
              {canDeleteComment && (
                <button
                  onClick={() => handleDeleteComment(c._id)}
                  style={{
                    marginLeft: '10px',
                    background: 'transparent',
                    border: 'none',
                    color: 'red',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  x
                </button>
              )}
            </div>
          );
        })}

        {user ? (
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Leave a comment..."
              rows="3"
            />
            <button type="submit">Post Comment</button>
          </form>
        ) : (
          <p><Link to="/login">Log in</Link> to leave a comment.</p>
        )}
      </section>
    </main>
  );
}

export default PostPage;