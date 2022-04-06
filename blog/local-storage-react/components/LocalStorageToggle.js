import * as React from 'react';

const App = () => {
  const [isOpen, setOpen] = React.useState(
    JSON.parse(localStorage.getItem('is-open')) || false
  );

  const handleToggle = () => {
    localStorage.setItem('is-open', JSON.stringify(!isOpen));

    setOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={handleToggle}>Toggle</button>
      {isOpen && <div>Content</div>}
    </div>
  );
};

export default App;