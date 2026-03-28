// frontend/src/pages/LoginPage.js
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };
 <br></br>
  return (
    <>
      <main 
        className="container content" 
        style={{ marginTop: '-30px' }}
      >
        <br></br>
        <h1>Login</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
          </form>
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </main>
      <br></br>
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

export default LoginPage;