import * as React from 'react';

const App = () => {
  const [greeting, setGreeting] = React.useState('Welcome to React');
  const [isShow, setShow] = React.useState(true);

  const handleToggle = () => {
    setShow(!isShow);
  };

  const handleChange = (event) => {
    setGreeting(event.target.value);
  };

  return (
    <div>
      <button onClick={handleToggle} type="button">
        Toggle
      </button>

      <input type="text" value={greeting} onChange={handleChange} />

      {isShow ? <Welcome text={greeting} /> : null}
    </div>
  );
};

const Welcome = ({ text }) => {
  return <h1>{text}</h1>;
};

export default App;
