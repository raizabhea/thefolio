// frontend/src/pages/ContactPage.js
import { useState } from 'react';
import api from '../api/axios'; // we'll use axios

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    if (Object.keys(newErrors).length === 0) {
      setSubmitStatus({ type: 'loading', message: 'Sending...' });
      try {
        await api.post('/contact', formData);
        setSubmitStatus({ type: 'success', message: 'Message sent! We’ll get back to you soon.' });
        setFormData({ name: '', email: '', message: '' }); // reset form
        setErrors({});
      } catch (err) {
        setSubmitStatus({ type: 'error', message: 'Failed to send. Please try again.' });
      }
    } else {
      setErrors(newErrors);
      setSubmitStatus({ type: '', message: '' });
    }
  };

  return (
    <>
      <br /><br />
      <main className="container content">
        <h1>Dessert Recipes & Contact</h1>
        <section className="contact-form">
          <h2>Get In Touch</h2>
          <p>Have a baking question? Want to share a recipe? Interested in collaborating on a dessert project? Send me a message—I'd love to connect with fellow dessert enthusiasts!</p>
          <div className="form-container">
            {submitStatus.message && (
              <div className={submitStatus.type === 'success' ? 'success' : 'error'} style={{ marginBottom: '15px' }}>
                {submitStatus.message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Message:</label>
                <textarea id="message" name="message" rows="5" placeholder="Share your thoughts, questions, or sweet ideas..." value={formData.message} onChange={handleChange}></textarea>
                {errors.message && <span className="error">{errors.message}</span>}
              </div>
              <button type="submit" disabled={submitStatus.type === 'loading'}>Send Sweet Message</button>
            </form>
          </div>
        </section>
        <section className="resources">
          <h2>Essential Dessert Making Resources</h2>
          <p>Here are my go-to resources for baking inspiration, techniques, and ingredients:</p>
          <table className="resource-table">
            <thead><tr><th>Resource Name</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>King Arthur Baking Company</td><td>Excellent flour, baking tools, and hundreds of tested recipes with detailed instructions</td></tr>
              <tr><td>Preppy Kitchen YouTube</td><td>Clear, visual tutorials for everything from simple cookies to elaborate cakes</td></tr>
              <tr><td>Local Farmers' Markets</td><td>Best source for fresh, seasonal fruits and other ingredients for desserts</td></tr>
              <tr><td>America's Test Kitchen</td><td>Rigorously tested recipes that explain why techniques work</td></tr>
            </tbody>
          </table>
        </section>

        <section className="external-links">
          <h2>Explore More Sweet Resources</h2>
          <p>Check out these excellent websites for dessert inspiration and learning:</p>
          <ul>
            <li><a href="https://www.seriouseats.com/desserts" target="_blank" rel="noopener noreferrer">Serious Eats Desserts</a> - Science-based baking articles and recipes</li>
            <li><a href="https://www.bakingmad.com" target="_blank" rel="noopener noreferrer">Baking Mad</a> - Thousands of recipes with step-by-step photos</li>
            <li><a href="https://www.thekitchn.com/collection/baking-desserts" target="_blank" rel="noopener noreferrer">The Kitchn Baking</a> - Practical baking tips and beautiful recipes</li>
          </ul>
        </section>

        <section className="location">
          <h2>Local Baking Supply Stores</h2>
          <p>When sourcing ingredients, I recommend visiting local specialty stores near your area for items like high-quality chocolate, unusual extracts, and specialty flours.</p>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.725074220337!2d121.01481597533372!3d14.561674977239693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c90264a0ed01%3A0x2b066cce7c139a6e!2sMary%20Grace%20Cafe%20-%20Serendra!5e0!3m2!1sen!2sph!4v1698765432100!5m2!1sen!2sph"
              allowFullScreen=""
              loading="lazy"
              title="Map of Cafe in BGC, Taguig City, Philippines"
              width="100%"
              height="400"
              style={{ border: 0 }}
            ></iframe>
            <p>Locations of specialty baking stores in the Taguig area</p>
          </div>
        </section>
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

export default ContactPage;