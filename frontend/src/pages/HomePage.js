import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';


function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/posts')
      .then(res => setPosts(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      
      <br /><br />
      <main className="container content">
        {/* Your original intro */}
        <div className="content">
          <div>
            <h2>What I love About Dessert Making</h2>
            <p>I'm Raiza Bhea Acosta.For me, dessert making is about creating moments of happiness. There's something magical about transforming simple ingredients—flour, sugar, eggs, butter—into something extraordinary that brings smiles to people's faces. The process itself is meditative: the rhythmic stirring, the careful measuring, the anticipation as aromas fill the kitchen.</p>
          </div>
          <br />

          {/* Your three static cards (keep as is) */}
          <div className="card-grid">
            <div className="highlight-card">
              <img src="/Images/2ndphoto.jpg" alt="sweet" className="card-img" />
              <h3>My Dessert Making Timeline</h3>
              <p>Come and find out why I love making desserts.</p>
              <Link to="/about" className="btn">Read My Story</Link>
            </div>
            <div className="highlight-card">
              <img src="/Images/1stphoto.jpg" alt="sweet" className="card-img" />
              <h3>Join Me</h3>
              <p>Sign up for more updates.</p>
              <Link to="/register" className="btn">Sign Up</Link>
            </div>
            <div className="highlight-card">
              <img src="/Images/3rdphoto.jpg" alt="sweet" className="card-img" />
              <h3>Get In Touch</h3>
              <p>Have a baking question? Want to share a recipe? Send me a message.</p>
              <Link to="/contact" className="btn">Contact Me</Link>
            </div>
          </div>

          {/* NEW: Latest blog posts from database */}
          <h2>Latest from the Blog</h2>
          {loading ? (
            <p>Loading posts...</p>
          ) : (
            <div className="card-grid">
              {posts.map(post => (
                <div key={post._id} className="form-container">
                  {post.image && (
                    <img
                      src={`http://localhost:5000/uploads/${post.image}`}
                      alt={post.title}
                      className="card-img"
                    />
                  )}
                  <h3>{post.title}</h3>
                  <p>{post.body.substring(0, 100)}...</p>
                  <Link to={`/posts/${post._id}`} className="btn">Read More</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
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

export default HomePage;