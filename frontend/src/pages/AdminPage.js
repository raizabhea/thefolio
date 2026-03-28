// frontend/src/pages/AdminPage.js
import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = async () => {
    console.log('fetchData called at', new Date().toLocaleTimeString());
    setLoading(true);
    try {
      const [usersRes, postsRes, messagesRes] = await Promise.all([
        api.get('/admin/users'),
        api.get('/admin/posts'),
        api.get('/admin/contact-messages')
      ]);
      setUsers(usersRes.data);
      setPosts(postsRes.data);
      setMessages(messagesRes.data);
    } catch (err) {
      console.error('Admin fetch failed', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('AdminPage mounted');
    fetchData();
    return () => console.log('AdminPage unmounted');
  }, []);

  

  const handleMarkRead = async (messageId) => {
    try {
      await api.put(`/admin/contact-messages/${messageId}/read`);
      setMessages(messages.map(m => m._id === messageId ? { ...m, read: true } : m));
    } catch (err) {
      alert('Failed to mark as read');
    }
  };

  const handleViewMessage = (msg) => {
    setSelectedMessage(msg);
    setModalOpen(true);
  };


  const handleToggleStatus = async (userId) => {
    if (window.confirm('Toggle active/inactive status for this user?')) {
      try {
        const res = await api.put(`/admin/users/${userId}/status`);
        setUsers(users.map(u => u._id === userId ? res.data.user : u));
      } catch (err) {
        alert('Failed to update user status');
      }
    }
  };

  const handleRemovePost = async (postId) => {
    if (window.confirm('Mark this post as removed?')) {
      try {
        const res = await api.put(`/admin/posts/${postId}/remove`);
        setPosts(posts.map(p => p._id === postId ? res.data.post : p));
      } catch (err) {
        alert('Failed to remove post');
      }
    }
  };

  if (loading) return <div>Loading admin panel...</div>;

  return (
    <>
      <main className="container content">
        <h1>Admin Dashboard</h1>
        
        {/* Members Section */}
        <section style={{ marginBottom: '40px' }}>
          <h2>Members ({users.length})</h2>
          {users.length === 0 ? (
            <p>No members found.</p>
          ) : (
            <table className="admin-table">
              <thead>
                
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span style={{
                        backgroundColor: u.status === 'active' ? '#d4edda' : '#f8d7da',
                        color: u.status === 'active' ? '#155724' : '#721c24',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        fontWeight: 'bold'
                      }}>
                        {u.status === 'active' ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => handleToggleStatus(u._id)}>
                        {u.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Posts Section */}
        <section style={{ marginBottom: '40px' }}>
          <h2>All Posts ({posts.length})</h2>
          {posts.length === 0 ? (
            <p>No posts found.</p>
          ) : (
            <table className="admin-table">
              <thead>
                
                  <th>Title</th>
                  <th>Author</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </thead>
              <tbody>
                {posts.map(p => (
                  <tr key={p._id}>
                    <td><Link to={`/posts/${p._id}`}>{p.title}</Link></td>
                    <td>{p.author?.name || 'Unknown'}</td>
                    <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span style={{
                        backgroundColor: p.status === 'published' ? '#d4edda' : '#f8d7da',
                        color: p.status === 'published' ? '#155724' : '#721c24',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        fontWeight: 'bold'
                      }}>
                        {p.status === 'published' ? 'PUBLISHED' : 'REMOVED'}
                      </span>
                    </td>
                    <td>
                      {p.status !== 'removed' && (
                        <button onClick={() => handleRemovePost(p._id)}>Remove</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Messages Section */}
        <section>
          <h2>Messages ({messages.length})</h2>
          {messages.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            <table className="admin-table">
              <thead>
                
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </thead>
              <tbody>
                {messages.map(msg => (
                  <tr key={msg._id}>
                    <td>{msg.name}</td>
                    <td>{msg.email}</td>
                    <td>{msg.message.substring(0, 100)}...</td>
                    <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span style={{
                        backgroundColor: msg.read ? '#d4edda' : '#f8d7da',
                        color: msg.read ? '#155724' : '#721c24',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        fontWeight: 'bold'
                      }}>
                        {msg.read ? 'READ' : 'UNREAD'}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => handleViewMessage(msg)} style={{ marginRight: '5px' }}>View</button>
                      {!msg.read && (
                        <button onClick={() => handleMarkRead(msg._id)}>Mark as Read</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>

   {/* Modal for viewing full message */}
{modalOpen && selectedMessage && (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  }} onClick={() => setModalOpen(false)}>
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      maxWidth: '500px',
      width: '90%',
      maxHeight: '80%',
      overflow: 'auto'
    }} onClick={(e) => e.stopPropagation()}>
      <h3>Message from {selectedMessage.name}</h3>
      <p><strong>Email:</strong> {selectedMessage.email}</p>
      <p><strong>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}</p>
      <p><strong>Message:</strong></p>
      <p style={{ whiteSpace: 'pre-wrap' }}>{selectedMessage.message}</p>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={() => setModalOpen(false)} className="btn" style={{ background: '#ec9acd' }}>Close</button>
      </div>
    </div>
  </div>
)}

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
}

export default AdminPage;