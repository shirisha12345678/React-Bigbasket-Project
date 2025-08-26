import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from './store';


function SignUp() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = (data) => {
    dispatch(registerUser(data));
    toast.success("Account created successfully!");
    setTimeout(() => {
      navigate("/SignIn");
    }, 1500);  // Wait 1.5 seconds before navigating
  };

  return (
    <div className="signup-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <h2 className="signup-title">Create Account</h2>
      <form onSubmit={handleSubmit(handleSignUp)} className="signup-form">
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
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register('email', { required: true })}
            className="form-control"
          />
        </div>
        <button type="submit" className="submit-button">Create Account</button>
      </form>
    </div>
  );
}

export default SignUp;
