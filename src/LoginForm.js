import React from 'react';

const LoginForm = ({ onLogin }) => {
  const validateEmail = () => {
    const mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,10})$/;
    const inputLogin = document.getElementById('input-login').value;
    const isValidEmail = inputLogin.match(mailformat);

    document.getElementById('button-login').disabled = !isValidEmail;

    return isValidEmail;
  };

  const handleLogin = (event) => {
    event.preventDefault(); // Impedisce il comportamento predefinito del form
    onLogin();
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div style={{ boxShadow: '0px 0px 30px #dedede', padding: '100px' }}>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input id="input-login" className="form-control" placeholder="Email" onInput={validateEmail} /><br />
          </div>
          <div className="d-flex justify-content-center">
            <button id="button-login" className="btn btn-primary" disabled onClick={onLogin}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
