import * as React from 'react';

const LoginForm = ({ withReset = false }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (withReset) {
      setEmail('');
      setPassword('');
    } else {
      alert(email + ' ' + password);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmail}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePassword}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;