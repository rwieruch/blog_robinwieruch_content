import * as React from 'react';

const style = {
  padding: '10px 30px',
  border: '1px solid black',
};

function App() {
  const handleClick = () => {
    alert('click');
  };

  return (
    <div style={style} onClick={handleClick}>
      <div style={style}>Click Me</div>
    </div>
  );
}

export default App;
