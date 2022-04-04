import * as React from 'react';

const style = {
  padding: '10px',
  border: '1px solid black',
  display: 'flex',
  justifyContent: 'flex-end',
};

function App() {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount((state) => state + 1);
  };

  const handleClickOutside = () => {
    setCount(0);
  };

  const ref = React.useRef();
  const registeredRef = React.useRef(false)

  const handleDocumentClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      handleClickOutside();
    }
  };

  const documentRef = (node) => {
    if (!node) return;

    if (registeredRef.current) return;
    registeredRef.current = true;

    node.parentNode.addEventListener('click', handleDocumentClick);
  };

  return (
    <div ref={documentRef} style={style}>
      <button ref={ref} type="button" onClick={handleClick}>
        Count: {count}
      </button>
    </div>
  );
}

export default App;
