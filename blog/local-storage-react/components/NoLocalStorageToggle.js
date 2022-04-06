import * as React from 'react';

const App = () => {
  const [isOpen, setOpen] = React.useState(false);

  const handleToggle = () => {
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
