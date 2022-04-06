import * as React from 'react';

function App() {
  const [isToggle, setToggle] = React.useState(false);

  const handleToggle = () => setToggle(!isToggle);

  return (
    <div>
      <button type="button" onClick={handleToggle}>
        Toggle
      </button>

      {isToggle.toString()}
    </div>
  );
}

export default App;