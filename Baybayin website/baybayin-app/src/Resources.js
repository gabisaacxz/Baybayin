import React, { useState } from "react";
import "./Resources.css";
import { ArrowLeft } from "lucide-react";

function Resources({ onBack }) {
  const [activeTab, setActiveTab] = useState("history");

  return (
    <div className="resources-container">
      <header className="resources-header">
        <h1>Baybayin Resources</h1>
        <p>
          Learn more about Baybayin's origins, alphabets, and its influence on modern design.
        </p>
      </header>

      <nav className="resources-nav">
        <button
          className={activeTab === "history" ? "active" : ""}
          onClick={() => setActiveTab("history")}
        >
          📖 History
        </button>
        <button
          className={activeTab === "fashion" ? "active" : ""}
          onClick={() => setActiveTab("fashion")}
        >
          👕 Fashion & Design
        </button>
      </nav>

      <section className="resources-content">
        {activeTab === "history" && (
          <div>
            <h2>📖 History of Baybayin</h2>
            <p>
              Baybayin is an ancient pre-colonial Philippine script used for writing Tagalog and 
              other languages. It consists of characters that represent syllables, making it an 
              abugida rather than an alphabet. 
            </p>
            <ul>
              <li>✨ Origin: Derived from Brahmic scripts</li>
              <li>🔤 Alphabets: Each symbol represents a consonant + vowel</li>
              <li>📜 Usage: Used in writing letters, poetry, and official documents</li>
              <li>⚡ Decline: Replaced by the Latin alphabet during Spanish colonization</li>
            </ul>
          </div>
        )}

        {activeTab === "fashion" && (
          <div>
            <h2>👕 Baybayin in Fashion & Design</h2>
            <p>
              Baybayin has made its way into modern art, tattoos, and fashion. It is often used as 
              a cultural symbol of pride and identity.
            </p>
            <ul>
              <li>👕 T-shirts and hoodies featuring Baybayin prints</li>
              <li>🎨 Arts and posters blending Baybayin calligraphy</li>
              <li>💉 Tattoos with personal names in Baybayin</li>
              <li>🏛️ Modern logos and signage</li>
            </ul>
          </div>
        )}
      </section>

      <footer className="resources-footer">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={18} style={{ marginRight: "6px" }} />
          Back to Dashboard
        </button>
      </footer>
    </div>
  );
}

export default Resources;
