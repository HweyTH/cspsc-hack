import React from 'react';
import ReactDOM from 'react-dom/client';
import '../assets/css/index.css'; // Import from /assets
import DiagnosticTest from '../components/DiagnosticTest';
import LearnersHandbook from '../components/LearnersHandbook';
import DailyQuiz from '../components/DailyPractice';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1>Cybersecurity Learning Hub for Elderly</h1>
      <div className="section-container">
        <section className="section">
          <DiagnosticTest />
        </section>
        <section className="section">
          <LearnersHandbook />
        </section>
        <section className="section">
          <DailyQuiz />
        </section>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
