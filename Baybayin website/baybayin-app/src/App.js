import React, { useState } from 'react';
import GetStarted from './GetStarted';
import Login from './Login';
import Dashboard from './Dashboard';
import Posts from './Posts';
import Resources from './Resources';  // ✅ new import

function App() {
  const [stage, setStage] = useState('start'); // 'start' → 'login' → 'dashboard' → 'posts' → 'resources'
  const [userType, setUserType] = useState(null);

  const handleStart = () => setStage('login');
  const handleLogin = (role) => {
    setUserType(role);
    setStage('dashboard');
  };

  return (
    <div>
      {stage === 'start' && <GetStarted onGetStarted={handleStart} />}
      {stage === 'login' && <Login onLogin={handleLogin} />}
      
      {stage === 'dashboard' && (
        <Dashboard 
          userType={userType} 
          onGoPosts={() => setStage('posts')} 
          onGoResources={() => setStage('resources')}   // ✅ navigate to Resources
        />
      )}
      
      {stage === 'posts' && (
        <Posts onBack={() => setStage('dashboard')} />  // ✅ back to Dashboard
      )}

      {stage === 'resources' && (
        <Resources onBack={() => setStage('dashboard')} />  // ✅ back to Dashboard
      )}
    </div>
  );
}

export default App;
