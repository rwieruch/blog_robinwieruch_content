import * as React from 'react';

const App = () => (
  <div>
    <h1>US Dollar to Euro:</h1>
    <Amount toCurrency={(amount) => <Euro amount={amount} />} />

    <h1>US Dollar to Pound:</h1>
    <Amount toCurrency={(amount) => <Pound amount={amount} />} />
  </div>
);

const Amount = ({ toCurrency }) => {
  const [amount, setAmount] = React.useState(0);

  const handleIncrement = () => setAmount(amount + 1);
  const handleDecrement = () => setAmount(amount - 1);

  return (
    <div>
      <button type="button" onClick={handleIncrement}>
        +
      </button>
      <button type="button" onClick={handleDecrement}>
        -
      </button>

      <p>US Dollar: {amount}</p>
      {toCurrency(amount)}
    </div>
  );
};

const Euro = ({ amount }) => <p>Euro: {amount * 0.86}</p>;

const Pound = ({ amount }) => <p>Pound: {amount * 0.76}</p>;

export default App;