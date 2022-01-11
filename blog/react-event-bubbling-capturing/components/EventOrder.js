import * as React from 'react';

function App() {
  const handleClick = () => {
    alert('click');
  };

  const handleMouseUp = () => {
    alert('mouseup');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseUp={handleMouseUp}
    >
      Which one fires first?
    </button>
  );
}

export default App;
