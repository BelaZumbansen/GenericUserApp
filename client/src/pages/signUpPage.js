import axios from 'axios';
import React, { useState } from 'react'
import { isLoggedIn } from '../services/authenticator';
import { useNavigate, Navigate } from 'react-router-dom';

export function SignUpPage() {

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (isLoggedIn()) {
    return (<Navigate to='/home' />);
  }

  function handleLoginRequest(event) {
    event.preventDefault();
    navigate('/login');
  }

  function validate() {
    return email.length > 0 && email.includes('@') && email === confirmEmail
      && password.length >= 8 && /\d/.test(password) && password === confirmPassword;
  }

  const handleSignUp = (event) => {
    event.preventDefault();

    axios.post('/api/auth/signUp', {
      name: name,
      dateOfBirth: dateOfBirth,
      email: email,
      password: password
    },
    {
      withCredentials: true,
    })    
    .then((response) => {
      // Set current state and move to user homepage
      console.log(response);
      
    }, (err) => {
      console.log(err);
    });
  }
  
  return (
    <div className="SignUp">
      <h1>SignUp Page</h1>
      <form onSubmit={handleSignUp}>
      <div>
          Full Name
          <input
          type="text"
          value={name}
          name="Name"
          onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          Date of Birth
          <input
          type="date"
          value={dateOfBirth}
          name="Date of Birth"
          onChange={({ target }) => setDateOfBirth(target.value)}
          />
        </div>
        <div>
          Email
          <input
          type="text"
          value={email}
          name="Email"
          onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div>
          Confirm Email
          <input
          type="text"
          value={confirmEmail}
          name="Confirm Email"
          onChange={({ target }) => setConfirmEmail(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            name="Confirm Password"
            onChange={({ target }) => setConfirmPassword(target.value)}
          />
        </div>
        <button type="submit" disabled={!validate()}>Sign Up</button>
      </form>
      <form onSubmit={handleLoginRequest}>
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}