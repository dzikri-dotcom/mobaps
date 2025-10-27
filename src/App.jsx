import { useState } from 'react';
import './App.css';

function App() {
  const [mode, setMode] = useState('');
  const [text, setText] = useState('');

  const truths = [
    "Apa rahasia terbesarmu?",
    "Siapa orang terakhir yang kamu chat?",
    "Pernah bohong ke orang tua?"
  ];

  const dares = [
    "Lakukan push-up 10x!",
    "Bernyanyi dengan keras selama 10 detik!",
    "Tirukan suara hewan selama 5 detik!"
  ];

  const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const handleChoice = (choice) => {
    setMode(choice);
    setText(choice === 'truth' ? pickRandom(truths) : pickRandom(dares));
  };

  return (
    <div className="app">
      <h1>Truth or Dare 🎲</h1>
      <div className="buttons">
        <button onClick={() => handleChoice('truth')} className="truth">Truth</button>
        <button onClick={() => handleChoice('dare')} className="dare">Dare</button>
      </div>
      {mode && <p className="result">{text}</p>}
    </div>
  );
}

export default App;
