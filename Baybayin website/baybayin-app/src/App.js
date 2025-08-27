import React, { useState } from 'react';
import GetStarted from './GetStarted';
import Dashboard from './Dashboard';
import Posts from './Posts';
import Resources from './Resources';

function App() {
  const [stage, setStage] = useState('start'); // 'start' → 'dashboard' → 'posts' → 'resources'

  const handleStart = () => setStage('dashboard');

  return (
    <div>
      {stage === 'start' && <GetStarted onGetStarted={handleStart} />}

      {stage === 'dashboard' && (
        <Dashboard 
          onGoPosts={() => setStage('posts')} 
          onGoResources={() => setStage('resources')} 
          onBack={() => setStage('start')} // ⬅️ back to GetStarted
        />
      )}

      {stage === 'posts' && (
        <Posts onBack={() => setStage('dashboard')} />
      )}

      {stage === 'resources' && (
        <Resources onBack={() => setStage('dashboard')} />
      )}
    </div>
  );
}

export default App;
