import * as React from 'react';

const style = {
  padding: '10px',
  border: '1px solid black',
  display: 'flex',
  justifyContent: 'space-between',
};

function App() {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount((state) => state + 1);
  };

  const handleHeaderClick = (event) => {
    // do something

    event.stopPropagation();
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

  const outerRef = (node) => {
    if (!node) return;

    if (registeredRef.current) return;
    registeredRef.current = true;

    node.addEventListener('click', handleHeaderClick);
    node.parentNode.addEventListener('click', handleDocumentClick);

    ref.current.addEventListener('click', handleClick);
  };

  return (
    <div ref={outerRef} style={style}>
      <div>Header</div>
      <button ref={ref} type="button">
        Count: {count}
      </button>
    </div>
  );
}

export default App;
