import React, { useState, useEffect } from 'react';

const App = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [myDevice, setMyDevice] = useState({
    name: name,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    extWindowWidth: window.outerWidth,
    extWindowHeight: window.outerHeight,
    intWindowWidth: window.innerWidth,
    intWindowHeight: window.innerHeight,
  });

  const handleSubmit = async () => {
    setError(false);
    window.print();
    await fetch('https://60b21f9562ab150017ae1b08.mockapi.io/maxServer/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(myDevice),
    })
      .then(response => response.json())
      .then(data =>
        window.alert(
          `Thank you! 
        Acquired ${data.name}
        Width: ${data.screenWidth}px
        Height: ${data.screenHeight}px`
        )
      );
    setName('');
  };

  useEffect(() => {
    setMyDevice(prevValue => {
      return {
        ...prevValue,
        name: name,
      };
    });
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
  }, [name]);

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
        onBlur={event => {
          setName(event.target.value);
        }}
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
