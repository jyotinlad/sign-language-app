import React from 'react';
import WordSlideshow from './components/wordslideshow';
import './App.css';

function App() {
  return (
    <div className='main'>
      <h1>Sign Language</h1>
      <div className='slideshow-box'>
        <WordSlideshow/>
      </div>
    </div>
  );
}

export default App;
