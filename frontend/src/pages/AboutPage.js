import { useState } from 'react';


const quizData = [
  {
    question: "What is the main ingredient in macarons?",
    options: ["Almond flour", "Coconut flour", "All-purpose flour", "Bread flour"],
    answer: 0
  },
  {
    question: "Which ingredient causes cakes to rise when combined with acid?",
    options: ["Baking powder", "Baking soda", "Yeast", "Cream of tartar"],
    answer: 1
  },
  {
    question: "What type of chocolate contains no milk solids?",
    options: ["Milk chocolate", "White chocolate", "Dark chocolate", "Ruby chocolate"],
    answer: 2
  },
  {
    question: "Which of these is NOT a type of buttercream?",
    options: ["Swiss meringue", "Italian meringue", "French meringue", "American"],
    answer: 2
  },
  {
    question: "What is the French term for a pastry chef?",
    options: ["Boulanger", "Chocolatier", "Pâtissier", "Confiseur"],
    answer: 2
  },
  {
    question: "Which of these cookies requires chilling before baking?",
    options: ["Shortbread", "Sugar cookies", "Snickerdoodles", "All of the above"],
    answer: 3
  },
  {
    question: "What is the key ingredient in royal icing?",
    options: ["Egg yolks", "Egg whites", "Heavy cream", "Cream cheese"],
    answer: 1
  },
  {
    question: "Which cake is traditionally associated with birthdays?",
    options: ["Red velvet", "Carrot cake", "Chiffon cake", "Layer cake with frosting"],
    answer: 3
  }
];

function AboutPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleSelect = (index) => {
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;

    const current = quizData[currentIndex];
    if (selectedOption === current.answer) {
      setScore(prev => prev + 1);
      setResult({ text: 'Correct! 🎉', color: 'green' });
    } else {
      setResult({
        text: `Wrong! Correct answer: ${current.options[current.answer]}`,
        color: 'red'
      });
    }

    setTimeout(() => {
      if (currentIndex + 1 < quizData.length) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
        setResult(null);
      } else {
        setQuizComplete(true);
      }
    }, 1500);
  };

  return (
    <>
      
      <br /><br />
      <main className="container content">
        <section className="intro">
          <div className="two-column">
            <div>
              <h2>What I Love About Making Desserts?</h2>
              <p>A great dessert isn't just food—it's an experience. It can evoke memories, celebrate occasions, comfort during hard times, or simply make an ordinary day feel special. Like a good song, the best desserts stay with you long after the last bite.</p>
            </div>
            <div>
              <img src="/Images/2ndphoto.jpg" alt="Dessert" className="img-fluid" />
              <p className="image-credit">Image: Clipart | Credit: Vecteezy</p>
            </div>
          </div>
        </section>

        <section className="timeline">
          <h2>My Dessert Making Timeline</h2>
          <h4>My journey with desserts from messy experiment to sweet creations:</h4>
          <ul>
            <li><strong>2019:</strong> First Baking attempt at age 14—it's our practicum in one subject.</li>
            <li><strong>2021:</strong> Took my first ever did graham</li>
            <li><strong>2022:</strong> Successfully made leche flan and puto with my mother</li>
            <li><strong>2025:</strong> Made a mochi using a simple ingredient available on our house</li>
          </ul>
          <div className="two-column">
            <div>
              <img src="/Images/sweet.png" alt="Digital art" className="img-fluid" />
              <p className="image-credit">Image: Clipart | Credit: Clipart Library</p>
            </div>
            <div>
              <h3>Making Breakthroughs</h3>
              <p>One of my most significant breakthroughs came when I finally understood the measurement of ingredients. I'll never forget the time when I made a perfect leche flan after I make the measurement on the milk perfect.</p>
              <p>Another pivotal moment was when I stopped being afraid of failure. My third attempt at mochi taught me that even "failed" desserts usually taste good, and every mistake is a learning opportunity.</p>
            </div>
          </div>
        </section>

        <section className="quote-section">
          <h2>Sweet Inspiration</h2>
          <blockquote>
            <p>"Dessert is like a feel-good song and the best ones make you dance."</p>
            <footer>— Chef Edward Lee</footer>
          </blockquote>
          <p>This quote perfectly captures why I'm so passionate about dessert making. A great dessert isn't just food—it's an experience. It can evoke memories, celebrate occasions, comfort during hard times. Like a good song, the best desserts stay with you long after the last bite.</p>
        </section>

        <section className="baking-quiz-section">
          <h2 className="quiz-title">Test Your Baking Knowledge!</h2>
          <div className="quiz-wrapper">
            {!quizComplete ? (
              <>
                <div className="quiz-question">{quizData[currentIndex].question}</div>
                <div className="quiz-options">
                  {quizData[currentIndex].options.map((opt, idx) => (
                    <div
                      key={idx}
                      className={`quiz-option ${selectedOption === idx ? 'selected' : ''}`}
                      onClick={() => handleSelect(idx)}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
                <button
                  className="quiz-button"
                  disabled={selectedOption === null}
                  onClick={handleSubmit}
                >
                  Submit Answer
                </button>
                {result && (
                  <div className="quiz-result" style={{ color: result.color }}>
                    {result.text}
                  </div>
                )}
              </>
            ) : (
              <div className="quiz-score-display">
                Your final score is {score} out of {quizData.length}.
              </div>
            )}
          </div>
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

export default AboutPage;