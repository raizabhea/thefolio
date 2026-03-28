import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SplashPage() {
  const navigate = useNavigate();
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDotCount(prev => (prev + 1) % 4);
    }, 500);

    const timer = setTimeout(() => {
      document.querySelector('.loader-container')?.classList.add('fade-out');
      setTimeout(() => {
        navigate('/home');
      }, 500);
    }, 3000);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <>
      {/* Style tag na may CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: rgb(226, 165, 213);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        .loader-container {
          text-align: center;
          color: white;
        }
        .logo-icon {
          width: 85px;
          height: 85px;
          display: block;
          border-radius: 50%;
          margin-bottom: 30px;
          margin-left: 175px;
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        h1 {
          font-size: 42px;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        .spinner {
          width: 80px;
          height: 80px;
          border: 8px solid rgba(255, 255, 255, 0.3);
          border-top: 8px solid white;
          border-radius: 50%;
          margin: 30px auto;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .loading-text {
          font-size: 20px;
          margin-top: 20px;
          color: rgba(255, 255, 255, 0.9);
        }
        .dots {
          display: inline-block;
          width: 30px;
        }
        .fade-out {
          animation: fadeOut 0.5s ease-out forwards;
        }
        @keyframes fadeOut {
          to { opacity: 0; }
        }
      `}} />

      <div className="loader-container">
        <img className="logo-icon" src="/Images/logo.jpg" alt="RB logo" />
        <h1>Art of Dessert Making</h1>
        <div className="spinner"></div>
        <div className="loading-text">
          Loading<span className="dots">{'.'.repeat(dotCount)}</span>
        </div>
      </div>
    </>
  );
}

export default SplashPage;