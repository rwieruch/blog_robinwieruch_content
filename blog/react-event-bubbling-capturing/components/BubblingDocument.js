import * as React from 'react';

const style = {
  padding: '10px 30px',
  border: '1px solid black',
};

function App({ reverse = false }) {
  const handleDocumentClick = () => {
    alert('document click');
  };

  const handleOuterClick = () => {
    alert('outer click');
  };

  const handleInnerClick = () => {
    alert('inner click');
  };

  const outerRef = (node) => {
    if (!node) return;

    node.parentNode.addEventListener(
      'click',
      handleDocumentClick,
      reverse
    );
    node.addEventListener('click', handleOuterClick, reverse);
  };

  const innerRef = (node) => {
    if (!node) return;

    node.addEventListener('click', handleInnerClick, reverse);
  };

  return (
    <div ref={outerRef} style={style}>
      <div ref={innerRef} style={style}>
        Click Me
      </div>
    </div>
  );
}

export default App;
