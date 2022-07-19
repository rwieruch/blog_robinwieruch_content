import * as React from 'react';

function App() {
  const [seconds, setSeconds] = React.useState(0);
  const [toggle, setToggle] = React.useState(false);

  const ref = React.useRef(null);

  const toggleStopwatch = () => {
    setToggle(!toggle);
  };

  const resetStopwatch = () => {
    setToggle(false);
    setSeconds(0);
  };

  React.useEffect(() => {
    ref.current = setInterval(() => {
      if (toggle) setSeconds((state) => state + 1);
    }, 1000);

    return () => {
      if (ref.current) clearInterval(ref.current);
    };
  }, [toggle]);

  return (
    <>
      <div>{seconds}</div>

      <button onClick={toggleStopwatch}>
        {toggle ? 'Stop' : 'Start'}
      </button>

      <button onClick={resetStopwatch}>Reset</button>
    </>
  );
}

export default App;
