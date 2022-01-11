import * as React from 'react';

const styleHeader = {
  padding: '10px',
  border: '1px solid black',
  boxSizing: 'border-box',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
};

function App() {
  const [isActive, setActive] = React.useState(false);

  const handleHeaderClick = () => {
    alert('header click (e.g. navigate to home page)');
  };

  const handleButtonClick = (event) => {
    alert('button click (e.g. log out user)');

    if (isActive) {
      event.stopPropagation();
    }
  };

  return (
    <>
      <div style={styleHeader} onClick={handleHeaderClick}>
        <div>Header</div>
        <button type="button" onClick={handleButtonClick}>
          Log Out
        </button>
      </div>

      <button type="button" onClick={() => setActive(!isActive)}>
        Stop Propagation: {isActive.toString()}
      </button>
    </>
  );
}

export default App;
