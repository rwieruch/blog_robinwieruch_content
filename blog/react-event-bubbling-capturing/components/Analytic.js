import * as React from 'react';

const styleHeader = {
  padding: '10px',
  border: '1px solid black',
  boxSizing: 'border-box',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
};

function App({ reverse = false }) {
  const handleOuterClick = () => {
    alert('header click (e.g. navigate to home page)');
  };

  const handleInnerClick = (event) => {
    alert('button click (e.g. log out user)');

    // important: stops event from appearing
    // in the document's event handler
    event.stopPropagation();
  };

  const handleDocumentClick = (event) => {
    alert(`
      document clicked - \n
      run analytics for clicked element: ${event.target}
    `);
  };

  const outerRef = (node) => {
    if (!node) return;

    node.parentNode.addEventListener(
      'click',
      handleDocumentClick,
      reverse
    );
    node.addEventListener('click', handleOuterClick);
  };

  const innerRef = (node) => {
    if (!node) return;

    node.addEventListener('click', handleInnerClick);
  };

  return (
    <div style={styleHeader} ref={outerRef}>
      <div>Header</div>
      <button type="button" ref={innerRef}>
        Log Out
      </button>
    </div>
  );
}

export default App;
