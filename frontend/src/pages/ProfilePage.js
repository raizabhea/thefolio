// frontend/src/pages/ProfilePage.js
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

// Define backend base URL (should match your server)
const BACKEND_URL = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000';

function ProfilePage() {
  const { user, setUser, logout } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Compute the image source – use full backend URL
  const getImageSource = () => {
    if (profilePicFile) {
      return URL.createObjectURL(profilePicFile);
    }
    if (user?.profilePic) {
      return `${BACKEND_URL}/uploads/${user.profilePic}?t=${Date.now()}`;
    }
    return '/default-avatar.png'; // frontend public folder
  };

  const imageSource = getImageSource();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (profilePicFile) {
        URL.revokeObjectURL(imageSource);
      }
      setProfilePicFile(file);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const fd = new FormData();
    fd.append('name', formData.name);
    fd.append('bio', formData.bio);
    if (profilePicFile) {
      fd.append('profilePic', profilePicFile);
    }

    try {
      const res = await api.put('/auth/profile', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUser(res.data);
      setMessage('Profile updated successfully');
      setProfilePicFile(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await api.put('/auth/change-password', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      setMessage('Password changed successfully');
      setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Password change failed');
    }
  };

  return (
    <>
      <main className="container content">
        <h1>My Profile</h1>
        {message && <div className="success">{message}</div>}
        {error && <div className="error">{error}</div>}

        {/* Profile Picture and Name */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img
            src={imageSource}
            alt="Profile"
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #d4a5a5',
              marginBottom: '10px'
            }}
            onError={(e) => console.error('Image failed to load:', e.target.src)}
          />
          <h2 style={{ margin: '5px 0', color: '#333' }}>{user?.name}</h2>
          <p style={{ color: '#777', fontStyle: 'italic' }}>{user?.email}</p>
          {user?.bio && <p style={{ maxWidth: '500px', margin: '10px auto' }}>{user.bio}</p>}
        </div>

        {/* Update Profile Section */}
        <section className="profile-section">
          <h2>Update Profile</h2>
          <form onSubmit={handleUpdateProfile}>
            <div className="form-group">
              <label>Change Profile Picture</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea name="bio" value={formData.bio} onChange={handleChange} rows="3" />
            </div>
            <div className="form-group">
              <label>Email (cannot be changed)</label>
              <input type="email" value={user?.email || ''} disabled />
            </div>
            <button type="submit" className="btn">Update Profile</button>
          </form>
        </section>

        {/* Change Password Section */}
        <section className="profile-section">
          <h2>Change Password</h2>
          <form onSubmit={handleChangePassword}>
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn">Change Password</button>
          </form>
        </section>

        <button onClick={logout} className="btn btn-danger">Logout</button>
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
}

export default ProfilePage;