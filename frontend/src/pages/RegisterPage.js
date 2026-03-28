// frontend/src/pages/RegisterPage.js
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function RegisterPage() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bday: '',
    password: '',
    confirmPassword: '',
    gender: '',
    // accountType: ''  // <-- inalis na
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'radio') {
      setFormData({ ...formData, gender: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const calculateAge = (bday) => {
    const today = new Date();
    const birth = new Date(bday);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Frontend validation
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.bday) newErrors.bday = 'Birthdate is required';
    else if (calculateAge(formData.bday) < 18) newErrors.bday = 'You must be 18 years old and above';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    // Hindi na chine-check ang accountType

    if (Object.keys(newErrors).length === 0) {
      try {
        // Ipinapadala lang ang name, email, password – tulad ng hinihintay ng backend
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
      } catch (err) {
        setErrors({ api: err.response?.data?.message || 'Registration failed' });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <br /><br />
      <main className="container content">
        <h1>Join Our Sweet Baking</h1>
        <section className="signup-intro">
          <div className="two-column">
            <div>
              <h2>What You'll Receive</h2>
              <h4>By joining my baking club, you'll become part of a sweet community and receive:</h4>
              <ul>
                <li>Monthly dessert challenge with themed recipes</li>
                <li>Exclusive video tutorials for advanced techniques</li>
                <li>Virtual bake-along sessions with Q&A</li>
                <li>Early access to my new dessert experiments</li>
              </ul>
              <h5>All membership benefits are completely free—we're building a community, not a business!</h5>
            </div>
            <div>
              <img src="/Images/last.png" alt="Dessert" className="img-fluid" />
              <p className="image-credit">Image: Dessert | Credit: insanelygoodrecipes</p>
            </div>
          </div>
        </section>

        <section className="registration-form">
          <h2>Create Your Account</h2>
          <p>Fill out the form below to join our digital art community. All fields are required.</p>
          <div className="form-container">
            {errors.api && <div className="error">{errors.api}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="bday">BirthDate:</label>
                <input type="date" id="bday" name="bday" value={formData.bday} onChange={handleChange} />
                {errors.bday && <span className="error">{errors.bday}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                {errors.password && <span className="error">{errors.password}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
              </div>
              <div className="gender-group">
                <label>Gender:</label>
                <input type="radio" id="male" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} />
                <label htmlFor="male">Male</label>
                <input type="radio" id="female" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
                <label htmlFor="female">Female</label>
                <input type="radio" id="other" name="gender" value="other" checked={formData.gender === 'other'} onChange={handleChange} />
                <label htmlFor="other">Other</label>
                {errors.gender && <span className="error">{errors.gender}</span>}
              </div>
              {/* Wala nang dropdown para sa Account Type */}
              <button type="submit">Register</button>
            </form>
          </div>
        </section>

        <section className="community-info">
          <h2>About My Baking Community</h2>
          <p>My baking club brings together dessert lovers from all backgrounds and skill levels. I believe that everyone can create delicious desserts, and I'm here to support each other through the sweet and sometimes challenging journey of baking.</p>
          <div className="card-grid">
            <div className="highlight-card">
              <h3>Supportive Environment</h3>
              <p>Members share tips, troubleshoot baking disasters, and celebrate each other's successes. No question is too basic!</p>
            </div>
            <div className="highlight-card">
              <h3>Monthly Challenges</h3>
              <p>Each month features a new dessert theme with optional participation. Share photos and win virtual baking badges!</p>
            </div>
            <div className="highlight-card">
              <h3>Skill Growth</h3>
              <p>Progressive tutorials help you build skills step by step, from basic cookies to advanced pastry techniques.</p>
            </div>
          </div>
          <p>Once you join, you'll receive a welcome email with information about our next monthly challenge, how to access our community forum, and details about upcoming virtual events. We can't wait to see what delicious creations you'll share with my community!</p>
        </section>
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

export default RegisterPage;