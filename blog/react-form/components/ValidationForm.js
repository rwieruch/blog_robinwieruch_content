import * as React from 'react';

const INITIAL_STATE = {
  email: '',
  password: '',
};

const VALIDATION = {
  email: [
    {
      isValid: (value) => !!value,
      message: 'Is required.',
    },
    {
      isValid: (value) => /\S+@\S+\.\S+/.test(value),
      message: 'Needs to be an email.',
    },
  ],
  password: [
    {
      isValid: (value) => !!value,
      message: 'Is required.',
    },
  ],
};

const getErrorFields = (form) =>
  Object.keys(form).reduce((acc, key) => {
    if (!VALIDATION[key]) return acc;

    const errorsPerField = VALIDATION[key]
      // get a list of potential errors for each field
      // by runnign through all the checks
      .map((validation) => ({
        isValid: validation.isValid(form[key]),
        message: validation.message,
      }))
      // only keep the errors
      .filter((errorPerField) => !errorPerField.isValid);

    return { ...acc, [key]: errorsPerField };
  }, {});


const LoginForm = () => {
  const [form, setForm] = React.useState(INITIAL_STATE);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const hasErrors = Object.values(errorFields).flat().length > 0;
    if (hasErrors) return;

    // call your compoennt's callback handler, e.g. onLogin
  };

  const errorFields = getErrorFields(form);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={form.email}
          onChange={handleChange}
        />
        {errorFields.email?.length ? (
          <span style={{ color: 'red' }}>
            {errorFields.email[0].message}
          </span>
        ) : null}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        {errorFields.password?.length ? (
          <span style={{ color: 'red' }}>
            {errorFields.password[0].message}
          </span>
        ) : null}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;