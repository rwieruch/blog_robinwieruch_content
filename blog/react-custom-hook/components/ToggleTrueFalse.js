import * as React from 'react';

function App() {
  const [isToggle, setToggle] = React.useState(false);

  const handleToggle = () => setToggle(!isToggle);
  const handleTrue = () => setToggle(true);
  const handleFalse = () => setToggle(false);

  return (
    <div>
      <button type="button" onClick={handleToggle}>
        Toggle
      </button>
      <button type="button" onClick={handleTrue}>
        To True
      </button>
      <button type="button" onClick={handleFalse}>
        To False
      </button>

      {isToggle.toString()}
    </div>
  );
}

export default App;