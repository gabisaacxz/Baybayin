import React, { useState } from 'react';
import './login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Only allow predefined users
    if (!username || !password) {
      setError('Please enter both username and password.');
    } else if (username === 'admin' && password === '1234') {
      onLogin('admin');
    } else if (username === 'user' && password === 'user123') {
      onLogin('user');
    } else {
      setError('Incorrect username or password.');
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

        {error && <p className="login-error">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
