import React from 'react';
import './Dashboard.css';
import { FileText, Book } from 'lucide-react';

function Dashboard({ onGoPosts, onGoResources }) {   // 👈 handlers from App
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Baybayin Learning Portal</h1>
        <p>
          “The revival of Baybayin is not just about the script—it is about
          remembering who we are as Filipinos.”
        </p>
      </header>

      <section className="dashboard-info">
        <h2>Baybayin in Araling Panlipunan</h2>
        <p>
          Baybayin is introduced as part of cultural heritage under Araling Panlipunan. 
          Students learn about its role in pre-colonial history and its relevance in 
          today’s society. It helps Filipinos connect with their roots while appreciating 
          the evolution of written communication.
        </p>
        <ul>
          <li>📖 Pre-colonial history and writing system</li>
          <li>🏫 Integration into classroom lessons</li>
          <li>🌏 Cultural identity and heritage awareness</li>
        </ul>
      </section>

      <div className="dashboard-options">
        {/* Posts card */}
        <div 
          className="dashboard-card"
          onClick={onGoPosts}
          style={{ cursor: 'pointer' }}
        >
          <FileText size={18} style={{ marginRight: "8px" }} />
          Posts
        </div>

        {/* Resources card */}
        <div 
          className="dashboard-card"
          onClick={onGoResources}
          style={{ cursor: 'pointer' }}
        >
          <Book size={18} style={{ marginRight: "8px" }} />
          Resources
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
