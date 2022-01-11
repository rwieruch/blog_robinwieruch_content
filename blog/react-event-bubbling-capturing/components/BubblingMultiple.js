import * as React from 'react';

const style = {
  padding: '10px 30px',
  border: '1px solid black',
};

function App() {
  const handleOuterClick = () => {
    alert('outer click');
  };

  const handleInnerClick = () => {
    alert('inner click');
  };

  return (
    <div style={style} onClick={handleOuterClick}>
      <div style={style} onClick={handleInnerClick}>
        Click Me
      </div>
    </div>
  );
}

export default App;
