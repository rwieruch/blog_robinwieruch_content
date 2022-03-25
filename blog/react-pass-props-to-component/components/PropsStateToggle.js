import * as React from 'react';

const App = () => {
  const greeting = 'Welcome to React';

  const [isShow, setShow] = React.useState(true);

  const handleToggle = () => {
    setShow(!isShow);
  };

  return (
    <div>
      <button onClick={handleToggle} type="button">
        Toggle
      </button>

      {isShow ? <Welcome text={greeting} /> : null}
    </div>
  );
};

const Welcome = ({ text }) => {
  return <h1>{text}</h1>;
};

export default App;
