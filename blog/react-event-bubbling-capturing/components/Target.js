import * as React from 'react';

const style = {
  display: 'block',
  padding: '10px 30px',
  border: '1px solid black',
};

function App() {
  const handleDivClick = (event) => {
    alert(`
      <div /> \n
      event.target: ${event.target} \n
      event.currentTarget: ${event.currentTarget}
    `);
  };

  const handleSpanClick = (event) => {
    alert(`
      <span /> \n
      event.target: ${event.target} \n
      event.currentTarget: ${event.currentTarget}
    `);
  };

  return (
    <div style={style} onClick={handleDivClick}>
      <span style={style} onClick={handleSpanClick}>
        Click Me
      </span>
    </div>
  );
}

export default App;
