import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Login.scss';

function Login() {
  // credentials
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleChange = e => {
    setErr(null);
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  let formValid = false;

  const emptyKeys = Object.keys(credentials).some(
    key => credentials[key] === ''
  );

  if (!emptyKeys) {
    formValid = true;
  }

  const handleLogin = () => {
    if (!formValid) return;

    fetch('http://localhost:5000/api/auth/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
      .then(response => {
        const resData = response.json();

        if (response.status === 404) {
          return setErr('User not found!');
        } else if (response.status === 400) {
          return setErr('Wrong username or password!');
        } else if (response.status === 403) {
          return setErr('You are not authorized!');
        } else {
          return resData;
        }
      })
      .then(data => {
        if (!data) return;
        dispatch({ type: 'LOGIN', payload: data.details });
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <h2>Login</h2>
        <input
          id="username"
          onChange={handleChange}
          type="email"
          placeholder="username"
        />
        <input
          id="password"
          onChange={handleChange}
          type="password"
          placeholder="password"
        />
        {err && <span style={{ color: 'red' }}>{err}</span>}
        <button className="btnLogin" disabled={emptyKeys} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
