import React, { useState } from 'react';
import './login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy authentication (replace later with backend check)
    if (username === "admin" && password === "1234") {
      onLogin("admin");
    } else if (username && password) {
      onLogin("user");
    } else {
      alert("Please enter username and password!");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Baybayin Application</h1>
      <form className="login-box" onSubmit={handleSubmit}>
        <label>Username</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />

        <label>Password</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
