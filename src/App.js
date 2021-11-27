import React, { useState, useEffect } from 'react';

const App = () => {
  const [myDevice, setMyDevice] = useState({
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    extWindowWidth: window.outerWidth,
    extWindowHeight: window.outerHeight,
    intWindowWidth: window.innerWidth,
    intWindowHeight: window.innerHeight,
  });

  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    window.print();
    setError(false);
  };

  useEffect(() => {
    window.addEventListener('resize', () =>
      setMyDevice(prevValue => {
        return {
          ...prevValue,
          extWindowWidth: window.outerWidth,
          extWindowHeight: window.outerHeight,
          intWindowWidth: window.innerWidth,
          intWindowHeight: window.innerHeight,
        };
      })
    );
  }, []);

  return (
    <div className='mainbox'>
      <h1>My Device</h1>
      <h2>Name</h2>
      <input
        type='text'
        className={`name ${error && 'error'}`}
        value={name}
        onChange={event => {
          setName(event.target.value);
        }}
        onFocus={() => setError(false)}
      />
      <button
        onClick={() => {
          !name ? setError(true) : handleSubmit();
        }}
      >
        Send
      </button>
      <h2>Screen</h2>
      <p>
        Width: <span>{myDevice.screenWidth}</span>
      </p>
      <p>
        Height: <span>{myDevice.screenHeight}</span>
      </p>
      <h2>External window</h2>
      <p>
        Width: <span>{myDevice.extWindowWidth}</span>
      </p>
      <p>
        Heigth: <span>{myDevice.extWindowHeight}</span>
      </p>
      <h2>Internal window</h2>
      <p>
        Width: <span>{myDevice.intWindowWidth}</span>
      </p>
      <p>
        Height: <span>{myDevice.intWindowHeight}</span>
      </p>
    </div>
  );
};

export default App;
