// import React from 'react'

// function Signing() {
//   return (
//     <>
//     <h1>Signing give the message</h1>
//     </>
//   )
// }

// export default Signing;

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser, logout } from './store';
import './Signing.css';

function Signing() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login Successful!");
      // Delay navigation to let toast show
      const timer = setTimeout(() => {
        navigate('/home');
      }, 1500);

      // Cleanup timeout if component unmounts
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (data) => {
    dispatch(loginUser(data));
    // Navigation handled by useEffect
  };

  const handleLogOut = () => {
    dispatch(logout());
    toast.info("You have been logged out.");
  };

  return (
    <div className="signing-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      {isAuthenticated ? (
        <div className="welcome-section">
          <h2 className="welcome-title">Welcome!</h2>
          <button onClick={handleLogOut} className="logout-button">
            Log Out
          </button>
        </div>
      ) : (
        <>
          <h2 className="signing-title">Sign In</h2>
          <form onSubmit={handleSubmit(handleLogin)} className="signing-form">
            <div className="form-group">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                {...register('username', { required: true })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register('password', { required: true })}
                className="form-control"
              />
            </div>
            <button type="submit" className="submit-button">Sign In</button>
          </form>
          <p className="signup-link">
            Don't have an account? <a href="/SignUp">Sign Up</a>
          </p>
        </>
      )}
    </div>
  );
}

export default Signing;
