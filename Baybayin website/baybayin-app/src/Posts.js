import React, { useState } from "react";
import "./Posts.css";
import { ArrowLeft } from "lucide-react";

const PostCard = ({ post, type, isFeaturedInAll }) => (
  <div className={`${type}-card ${isFeaturedInAll ? "featured-in-all" : ""}`}>
    <h3>
      {post.title} {isFeaturedInAll && <span className="featured-badge">⭐ Featured</span>}
    </h3>
    <p>{post.content}</p>
    {post.date && <small><b>Date:</b> {post.date}</small>}
    {post.author && <><br /><small>By {post.author}</small></>}
    {post.featuredReason && <><br /><small className="featured-reason">Featured because: {post.featuredReason}</small></>}
    <br />
    <small>
      Source: <a href={post.source} target="_blank" rel="noreferrer">{post.source}</a>
    </small>
  </div>
);

export default function Posts({ onBack }) {
  const [activeTab, setActiveTab] = useState("all");
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [reason, setReason] = useState("");
  const [requests, setRequests] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

  const dailyPosts = [
    { id: 3, date: "Aug 27, 2025", title: "📝 Baybayin Alphabet (Abugida)", content: "Baybayin is an abugida...", source: "https://www.omniglot.com/writing/baybayin.htm" },
    { id: 4, date: "Aug 26, 2025", title: "📜 Not 'Alibata'", content: "'Alibata' is a misnomer...", source: "https://medium.com/@davealba/its-not-alibata-its-baybayin-7c8a9b74a74e" },
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
    }
    
  ];

  const allPosts = [...dailyPosts];

  const evaluateRequest = (text) => {
    const lower = text.toLowerCase();
    const inappropriate = ["nsfw", "sexual", "explicit", "offensive"];
    
    if (inappropriate.some(w => lower.includes(w))) 
      return { approved: false, message: "Request declined: inappropriate content." };
    
    if (text.trim().length < 10) 
      return { approved: false, message: "Request declined: reason too short." };
    
    // Automatically approve if the reason is long enough
    if (text.trim().length >= 20) 
      return { approved: true, message: "Request approved!" };
    
    // For medium length reasons (10-19 chars), give a warning but approve
    return { approved: true, message: "Request approved (consider adding more details)." };
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (!selectedId) return;

    const post = allPosts.find(p => p.id === Number(selectedId));
    if (!post) return;

    const result = evaluateRequest(reason);

    if (result.approved && !featuredPosts.some(p => p.id === post.id)) {
      setFeaturedPosts(prev => [...prev, { ...post, author: "Community", featuredReason: reason.trim() }]);
    }

    setRequests(prev => [...prev, { postId: post.id, title: post.title, requestedAt: new Date().toLocaleString(), reason, status: result.approved ? "Approved" : "Declined", systemMessage: result.message }]);
    setSuccessMsg(result.message);
    setSelectedId("");
    setReason("");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <>
      <header className="posts-header">
        <h1>Baybayin Posts</h1>
        <p>Explore featured stories, daily lessons, and community knowledge.</p>
      </header>

      <div className="posts-content-wrapper">
        <nav className="posts-nav">
          {["all", "featured", "daily", "request"].map(key => (
            <button key={key} className={activeTab === key ? "active" : ""} onClick={() => setActiveTab(key)}>
              {key === "all" ? "📜 All Posts" : key === "featured" ? "⭐ Featured" : key === "daily" ? "📅 Daily Posts" : "✉️ Request Featured"}
            </button>
          ))}
        </nav>

        <section className="posts-content">
          {activeTab === "all" && allPosts.map(post => {
            const isFeatured = featuredPosts.some(fp => fp.id === post.id);
            return <PostCard key={post.id} post={post} type="post" isFeaturedInAll={isFeatured} />;
          })}

          {activeTab === "featured" && (featuredPosts.length ? featuredPosts.map(p => <PostCard key={p.id} post={p} type="featured" />) : <p>No featured posts yet.</p>)}

          {activeTab === "daily" && dailyPosts.map(p => <PostCard key={p.id} post={p} type="daily" />)}

          {activeTab === "request" && (
            <div>
              <h2>✉️ Request a Post to be Featured</h2>
              <form className="request-form" onSubmit={handleSubmitRequest}>
                <label>Select a post:
                  <select value={selectedId} onChange={e => setSelectedId(e.target.value)}>
                    <option value="">— Choose —</option>
                    {allPosts.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                  </select>
                </label>

                <label>Reason:
                  <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Explain why this post should be featured" required />
                </label>

                <button type="submit">Submit Request</button>
                {successMsg && <div className="success">{successMsg}</div>}
              </form>

              {requests.length > 0 && (
                <div className="request-list">
                  <h3>Request History</h3>
                  {requests.map((r, i) => (
                    <div key={i} className={`request-item ${r.status.toLowerCase()}`}>
                      <b>{r.title}</b>
                      <div className={`status-badge ${r.status.toLowerCase()}`}>{r.status}</div>
                      <div className="muted">Requested: {r.requestedAt} • Reason: {r.reason}</div>
                      <div className="system-message">{r.systemMessage}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </div>

      <button className="back-button" onClick={onBack}>
        <ArrowLeft size={18} style={{ marginRight: "6px" }} />
        Back to Dashboard
      </button>
    </>
  );
}
