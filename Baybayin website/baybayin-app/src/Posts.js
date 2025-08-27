import React, { useState } from "react";
import "./Posts.css";
import { ArrowLeft } from "lucide-react";

function Posts({ onBack }) {
  const [activeTab, setActiveTab] = useState("all");

  // ✅ Featured posts start empty - only user-requested posts appear here
  const featuredPosts = [];

  const dailyPosts = [
    {
      id: 3,
      date: "Aug 27, 2025",
      title: "📝 Baybayin Alphabet (Abugida)",
      content:
        "Baybayin is an abugida: consonants carry an inherent 'a'. Diacritics (kudlit) change the vowel (ᜊ ba, ᜊᜒ bi, ᜊᜓ bu/bo).",
      source: "https://www.omniglot.com/writing/baybayin.htm",
    },
    {
      id: 4,
      date: "Aug 26, 2025",
      title: "📜 Not 'Alibata'",
      content:
        "'Alibata' is a 20th-century misnomer. The historically attested name of the script is Baybayin (from 'baybay'—to spell).",
      source:
        "https://medium.com/@davealba/its-not-alibata-its-baybayin-7c8a9b74a74e",
    },
    {
      id: 5,
      date: "Aug 25, 2025",
      title: "🎓 Baybayin in Araling Panlipunan Curriculum",
      content:
        "The Department of Education integrates Baybayin into Araling Panlipunan (Social Studies) to promote cultural identity and Filipino heritage understanding among students.",
      source: "https://www.deped.gov.ph/matatag-curriculum/araling-panlipunan-grades-4-7/",
    },
    {
      id: 6,
      date: "Aug 24, 2025",
      title: "📱 Digital Baybayin Learning Apps",
      content:
        "Mobile applications like iBayin use interactive modules and character recognition to make learning Baybayin more accessible to younger generations through technology.",
      source: "https://www.goodnewspilipinas.com/learn-to-write-pinoy-original-baybayin-script-from-mobile-apps/",
    },
    {
      id: 7,
      date: "Aug 23, 2025",
      title: "🔬 UP Diliman's Baybayin OCR Research",
      content:
        "University of the Philippines Diliman developed cutting-edge OCR (Optical Character Recognition) technology to digitally preserve and classify Baybayin texts at block and paragraph levels.",
      source: "https://upd.edu.ph/understanding-and-preserving-baybayin/",
    },
    {
      id: 8,
      date: "Aug 22, 2025",
      title: "🌐 Baybayin Online Translators",
      content:
        "Digital tools like Baybayin translators convert modern Filipino text into traditional script, making the ancient writing system accessible for educational and cultural purposes.",
      source: "https://baybayintranslator.com/",
    },
    {
      id: 9,
      date: "Aug 21, 2025",
      title: "🎨 Cultural Revival Through Technology",
      content:
        "Technology platforms including social media, educational software, and mobile apps are making Baybayin relevant and accessible, supporting its cultural revival in modern education.",
      source: "https://www.asterra.com.ph/uncategorized/the-importance-of-reviving-baybayin-in-education/",
    },
    {
      id: 10,
      date: "Aug 20, 2025",
      title: "📚 Pedagogical Digital Baybayin",
      content:
        "Research shows Digital Baybayin plays a significant role in Philippine higher education, serving as a tool for cultural narrative preservation in post-pandemic educational environments.",
      source: "https://www.researchgate.net/publication/383074458_Pedagogical_explorations_Digital_Baybayin_and_cultural_narratives_in_the_post-pandemic_college_techscape",
    },
    {
      id: 11,
      date: "Aug 19, 2025",
      title: "🏛️ Government Integration Efforts",
      content:
        "Legislative efforts propose integrating Baybayin into official government communication and educational curricula as part of cultural preservation and national identity promotion.",
      source: "https://taasnoopilipino.com/baybayin-the-ancient-filipino-writing-system/",
    },
    {
      id: 12,
      date: "Aug 18, 2025",
      title: "👥 Community Learning Through Apps",
      content:
        "Mobile learning applications provide interactive modules, translation features, and writing practice tools, enabling communities to collectively learn and preserve Baybayin knowledge.",
      source: "https://www.wearlegazy.com/blogs/blogs/discover-how-technology-may-help-preserve-baybayin-writing-and-filipino-culture",
    }
  ];

  // ✅ All Posts = Featured + Daily (everything funnels here)
  const allPosts = [...featuredPosts, ...dailyPosts];

  // --- Request Featured state/logic ---
  const [selectedId, setSelectedId] = useState("");
  const [reason, setReason] = useState("");
  const [requests, setRequests] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [featuredPostsState, setFeaturedPostsState] = useState(featuredPosts);

  // Auto-evaluation function
  const evaluateRequest = (reason, postTitle) => {
    const lowerReason = reason.toLowerCase().trim();
    
    // Check for NSFW or inappropriate content
    const inappropriateWords = ['nsfw', 'sexual', 'explicit', 'inappropriate', 'offensive', 'vulgar'];
    if (inappropriateWords.some(word => lowerReason.includes(word))) {
      return { approved: false, message: "Request declined: Inappropriate content detected." };
    }
    
    // Check for empty or very short reasons
    if (!reason.trim() || reason.trim().length < 10) {
      return { approved: false, message: "Request declined: Please provide a meaningful reason (at least 10 characters)." };
    }
    
    // Check for low-quality reasons
    const lowQualityPhrases = ['just because', 'i like it', 'it\'s cool', 'why not', 'please feature'];
    if (lowQualityPhrases.some(phrase => lowerReason.includes(phrase))) {
      return { approved: false, message: "Request declined: Please provide a more detailed explanation of why this post should be featured." };
    }
    
    // Check for educational/cultural value keywords
    const valueKeywords = ['educational', 'learn', 'history', 'culture', 'heritage', 'important', 'informative', 'helpful', 'understand', 'knowledge', 'traditional', 'preserve', 'teach'];
    const hasEducationalValue = valueKeywords.some(keyword => lowerReason.includes(keyword));
    
    if (hasEducationalValue && reason.trim().length >= 20) {
      return { approved: true, message: "Request approved! Post has been added to Featured Posts." };
    }
    
    return { approved: false, message: "Request declined: The reasoning doesn't demonstrate sufficient educational or cultural value for featuring." };
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (!selectedId) return;

    const picked = allPosts.find((p) => String(p.id) === String(selectedId));
    const evaluation = evaluateRequest(reason, picked.title);
    
    if (evaluation.approved) {
      // Add to featured posts if not already there
      const alreadyFeatured = featuredPostsState.some(fp => fp.id === picked.id);
      if (!alreadyFeatured) {
        setFeaturedPostsState(prev => [...prev, {
          ...picked,
          author: "Community",
          featuredReason: reason.trim()
        }]);
      }
    }
    
    // Add to requests history
    setRequests((prev) => [
      ...prev,
      {
        postId: picked.id,
        title: picked.title,
        requestedAt: new Date().toLocaleString(),
        reason: reason.trim(),
        status: evaluation.approved ? "Approved" : "Declined",
        systemMessage: evaluation.message
      },
    ]);
    
    setSuccessMsg(evaluation.message);
    setSelectedId("");
    setReason("");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <div className="posts-container">
      <header className="posts-header">
        <h1>Baybayin Posts</h1>
        <p>Explore featured stories, daily lessons, and community knowledge.</p>
      </header>

      {/* Tabs */}
      <nav className="posts-nav">
        <button
          className={activeTab === "all" ? "active" : ""}
          onClick={() => setActiveTab("all")}
        >
          📜 All Posts
        </button>
        <button
          className={activeTab === "featured" ? "active" : ""}
          onClick={() => setActiveTab("featured")}
        >
          ⭐ Featured
        </button>
        <button
          className={activeTab === "daily" ? "active" : ""}
          onClick={() => setActiveTab("daily")}
        >
          📅 Daily Posts
        </button>
        <button
          className={activeTab === "request" ? "active" : ""}
          onClick={() => setActiveTab("request")}
        >
          ✉️ Request Featured
        </button>
      </nav>

      {/* Content */}
      <section className="posts-content">
        {activeTab === "all" && (
          <div>
            <h2>📜 All Posts</h2>
            {allPosts.map((post) => (
              <div key={post.id} className="post-card">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                {post.date && (
                  <small>
                    <b>Date:</b> {post.date}
                  </small>
                )}
                <br />
                <small>
                  Source:{" "}
                  <a href={post.source} target="_blank" rel="noreferrer">
                    {post.source}
                  </a>
                </small>
              </div>
            ))}
          </div>
        )}

        {activeTab === "featured" && (
          <div>
            <h2>⭐ Featured Posts</h2>
            <p className="muted">
              Posts are automatically featured based on educational and cultural value.
            </p>
            {featuredPostsState.map((post) => (
              <div key={post.id} className="featured-card">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <small>By {post.author}</small>
                {post.featuredReason && (
                  <>
                    <br />
                    <small className="featured-reason">Featured because: {post.featuredReason}</small>
                  </>
                )}
                <br />
                <small>
                  Source:{" "}
                  <a href={post.source} target="_blank" rel="noreferrer">
                    {post.source}
                  </a>
                </small>
              </div>
            ))}
          </div>
        )}

        {activeTab === "daily" && (
          <div>
            <h2>📅 Daily Posts</h2>
            {dailyPosts.map((post) => (
              <div key={post.id} className="daily-card">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <small>
                  <b>Date:</b> {post.date}
                </small>
                <br />
                <small>
                  Source:{" "}
                  <a href={post.source} target="_blank" rel="noreferrer">
                    {post.source}
                  </a>
                </small>
              </div>
            ))}
          </div>
        )}

        {activeTab === "request" && (
          <div>
            <h2>✉️ Request a Post to be Featured</h2>

            <form className="request-form" onSubmit={handleSubmitRequest}>
              <label>
                Select a post from <b>All Posts</b>:
                <select
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                >
                  <option value="">— Choose a post —</option>
                  {allPosts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Why should this be featured?
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Explain why this post deserves to be featured (educational value, cultural importance, etc.)"
                  required
                />
              </label>

              <button type="submit">Submit Request</button>
              {successMsg && <div className="success">{successMsg}</div>}
            </form>

            {requests.length > 0 && (
              <div className="request-list">
                <h3>Request History</h3>
                {requests.map((r, i) => (
                  <div className={`request-item ${r.status.toLowerCase()}`} key={i}>
                    <b>{r.title}</b>
                    <div className={`status-badge ${r.status.toLowerCase()}`}>
                      {r.status}
                    </div>
                    <div className="muted">
                      Requested: {r.requestedAt}
                      {r.reason ? ` • Reason: ${r.reason}` : ""}
                    </div>
                    <div className="system-message">
                      {r.systemMessage}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Back Button */}
      <footer className="posts-footer">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={18} style={{ marginRight: "6px" }} />
          Back to Dashboard
        </button>
      </footer>
    </div>
  );
}

export default Posts;