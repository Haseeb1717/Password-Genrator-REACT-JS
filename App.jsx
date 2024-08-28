import React, { useState, useCallback, useEffect, useRef } from 'react';
import './App.css'; // Add this for the CSS

export function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pas = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += "!@#$%^&*()_+-=[]{}|;:',.<>/?";

    for (let i = 0; i < length; i++) {
      const char = str.charAt(Math.floor(Math.random() * str.length));
      pas += char;
    }
    setPassword(pas);
  }, [length, numberAllowed, charAllowed]);

  const copyToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand('copy');
    }
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className='App'>
      <h1>Generate Your Strong Password</h1>
      <div className='background'>
        <div className='password-container'>
          <input
            type='text'
            className='password-display'
            value={password}
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button className='copy-btn' onClick={copyToClipboard}>
            Copy
          </button>
        </div>
        <div className='settings'>
          <label>Length: {length}</label>
          <input
            type='range'
            min={6}
            max={100}
            value={length}
            onChange={e => setLength(Number(e.target.value))}
          />
          <div>
            <input
              type='checkbox'
              checked={numberAllowed}
              onChange={() => setNumberAllowed(prev => !prev)}
            />
            <label>Include Numbers</label>
          </div>
          <div>
            <input
              type='checkbox'
              checked={charAllowed}
              onChange={() => setCharAllowed(prev => !prev)}
            />
            <label>Include Special Characters</label>
          </div>
        </div>
        <button className='generate-btn' onClick={passwordGenerator}>
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
