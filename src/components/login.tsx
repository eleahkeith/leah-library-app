import React from 'react';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { registerAPI, loginAPI } from './api-calls';
import Modal from 'react-modal';
import DeleteButton from '../images/delete-button.png';

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState<string>();
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [auth, setAuth] = useState<string>();

  const emailBtn = useRef<HTMLButtonElement>(null);
  const authBtn = useRef<HTMLButtonElement>(null);

  const checkEmail = (email: string | undefined) => {
    if (email) {
      handleSendEmail(email);
    } else {
      toast.error('Please enter an email address');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.target.id === 'email') {
        clickEmailBtn();
      } else if (e.target.id === 'authCode') {
        clickLoginBtn();
      }
    }
  };

  const clickEmailBtn = () => {
    if (emailBtn && emailBtn.current) {
      emailBtn.current.click();
    }
  };

  const clickLoginBtn = () => {
    if (authBtn && authBtn.current) {
      authBtn.current.click();
      console.log('auth btn enter');
    }
  };

  const handleSendEmail = (addr: string) => {
    registerAPI(addr);
    setIsOpen(true);
  };

  const checkCode = (authCode: string | undefined) => {
    if (authCode) {
      handleLogin(authCode);
    } else {
      toast.error('Please enter a code');
    }
  };

  const handleLogin = async (authCode: string) => {
    if (email) {
      const tokenRes = await loginAPI(email, authCode);
      localStorage.setItem('Authorization', `Bearer ${tokenRes.jwt}`);
      onLogin();
      setIsOpen(false);
    } else {
      toast.error('Something went wrong! Please try again');
    }
  };

  return (
    <>
      <div className="login-overlay">
        <div className="login-box">
          <span className="login-title">
            <span className="title-1">biblio</span>
            <span className="title-2">file</span>
          </span>

          <form className="email">
            <div className="input-label-group">
              <input
                className="modal"
                id="email"
                type="email"
                placeholder="e.g. leah@domain.com"
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <label htmlFor="email">Email</label>
            </div>
            <button
              type="button"
              className="modal"
              ref={emailBtn}
              onClick={() => checkEmail(email)}
            >
              Send Email
            </button>
          </form>
          <div className="login-text">
            <ol>
              <li>Enter your email address</li>
              <li>Provide the authorization code we send to you</li>
              <li>Start your own biblio file!</li>
            </ol>
          </div>
        </div>
      </div>
      <Modal className="Modal-Login" isOpen={modalIsOpen}>
        <div className="auth-box">
          <img
            className="modal-close"
            src={DeleteButton}
            alt="delete button"
            onClick={() => setIsOpen(false)}
          />{' '}
          <div className="auth-text">
            An email with your authorization code has been sent to {email}
          </div>
          <form className="modal" id="auth">
            <div>
              <input
                className="modal"
                id="authCode"
                onChange={(e) => setAuth(e.target.value)}
                placeholder="Enter code..."
                onKeyDown={handleKeyDown}
              ></input>
              <label className="modal" htmlFor="authCode">
                Authorization Code
              </label>
            </div>

            <button
              type="button"
              className="modal"
              onClick={() => checkCode(auth)}
              ref={authBtn}
            >
              Login
            </button>
          </form>
          <span className="auth-text">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Didn't receive your code?{' '}
            <span onClick={() => checkEmail(email)} className="resend-text">
              Click here to resend!
            </span>{' '}
          </span>
          <span className="auth-text" id="spam-text">
            Note: check your spam folder
          </span>
        </div>
      </Modal>
    </>
  );
};

export default Login;
