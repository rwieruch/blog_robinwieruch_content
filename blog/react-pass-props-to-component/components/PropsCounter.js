import * as React from 'react';

const App = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <Button label={count} onClick={() => setCount(count + 1)} />
    </div>
  );
};

const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

export default App;