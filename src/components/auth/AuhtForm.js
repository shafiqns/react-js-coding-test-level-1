import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useInput from '../hooks/use-input';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';
const passwordisNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => value.includes('@');

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const {
    value: emailValue,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    
  } = useInput(passwordisNotEmpty);
  

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    
    
    // optional: Add validation

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC_3bBM-k5t2q3dNpQlcFFBonw1FB3UnSg';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC_3bBM-k5t2q3dNpQlcFFBonw1FB3UnSg';
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
        history.replace('/pokedex');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          
        <label htmlFor='name'>E-Mail Address</label>
        
        

          <label htmlFor='email'>Email</label>
          <input type='email' 
          id='email' 
          required 
          ref={emailInputRef} 
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          />
          {emailHasError && <p className={classes.errortext}>Email address should have "@"</p>}
          
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
            value={passwordValue}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          />
          {passwordHasError && <p className={classes.errortext}>Please enter a password.</p>}
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>

  );
};

export default AuthForm;
