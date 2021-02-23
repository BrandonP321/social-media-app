import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinnerThird } from '@fortawesome/pro-regular-svg-icons'
import './index.css'
import API from '../../utils/API';
import Header from '../../components/Header'

export default function Login() {
    let history = useHistory();

    // state controls which form to display
    const [isLoggingIn, setIsLogginIn] = useState(false);

    const [loadingLogin, setLoadingLogin] = useState(false);
    const [loadingSignUp, setLoadingSignUp] = useState(false)

    const [loginHelperText, setLoginHelperText] = useState('')
    const [signUpHelperText, setSignUpHelperText] = useState('')

    const [loginInputValues, setLoginInputValues] = useState({
        email: {
            value: '',
            helperText: 'Please enter an email'
        },
        password: {
            value: '',
            helperText: "Please enter a password"
        }
    })

    const [signUpInputValues, setSignUpInputValues] = useState({
        email: {
            value: '',
            helperText: 'Please enter an email'
        },
        username: {
            value: '',
            helperText: 'Please enter a username'
        },
        name: {
            value: '',
            helperText: 'Please enter your name'
        },
        password: {
            value: '',
            helperText: 'Please enter a password'
        },
        passwordReEnter: {
            value: '',
            helperText: "Please re-enter your password"
        }
    })

    const toggleFormToDisplay = () => {
        // update state to opposite boolean
        setIsLogginIn(!isLoggingIn)
    }

    const handleLoginInputChange = e => {
        const name = e.target.name
        const value = e.target.value
        // update state with new value
        setLoginInputValues({ ...loginInputValues, [name]: { ...loginInputValues[name], value: value } })
    }

    const handleSignupInputChange = e => {
        const name = e.target.name
        const value = e.target.value

        // update state with new input value
        setSignUpInputValues({ ...signUpInputValues, [name]: { ...signUpInputValues[name], value: value } })
    }

    const handleLoginAttempt = useCallback(e => {
        e.preventDefault();
        // remove any helper text from state
        setLoginHelperText('')

        // if a field is blank, tell user to fill out field before loggin in
        const allInputsFilled = checkForEmptyField({ ...loginInputValues }, setLoginHelperText)
        if (!allInputsFilled) return

        const userObj = {
            email: loginInputValues.email.value,
            password: loginInputValues.password.value
        }

        API.userLogin(userObj)
            .then(response => {
                // get access token (jwt) and user id from response
                const userId = response.data.id
                const username = response.data.username
                const token = response.headers['auth-token']
                // store token in storage
                localStorage.setItem('accessToken', token);

                // redirect user to their profile page
                history.push(`/user/${username}`)
            })
            .catch(err => {
                switch (err.response.status) {
                    case 401:
                        // 401 for incorrect email or password
                        setLoginHelperText("Incorrect email or password")
                        break
                }
            })
            .finally(() => {
                setLoadingLogin(false)
            })
    }, [loginInputValues])

    const handleSignUpAttempt = useCallback((e) => {
        setSignUpHelperText('')

        e.preventDefault();
        // if a field is blank, tell user to fill out field before registering
        const allInputsFilled = checkForEmptyField({ ...signUpInputValues }, setSignUpHelperText)
        if (!allInputsFilled) return

        // check if password and re-entered password match
        if (signUpInputValues.password.value !== signUpInputValues.passwordReEnter.value) {
            setSignUpHelperText("Passwords must match")
            return
        }

        const userObj = {
            email: signUpInputValues.email.value,
            username: signUpInputValues.username.value,
            name: signUpInputValues.name.value,
            password: signUpInputValues.password.value
        }

        API.createUser(userObj)
            .then(response => {
                // get access token (jwt) and user id from response
                const userId = response.data.id
                const token = response.headers['auth-token']
                // store token in storage
                localStorage.setItem('accessToken', token);

                // redirect user to their profile page
                history.push(`/user/${userId}`)
            })
            .catch(err => {
                switch (err.response.status) {
                    case 409:
                        // 409 for email taken
                        setSignUpHelperText('Email taken')
                        break;
                    case 422:
                        // 422 for username taken
                        setSignUpHelperText("Username taken")
                        break;
                }
            })
            .finally(() => {
                setLoadingSignUp(false)
            })
    }, [signUpInputValues])

    // functiont to make sure all input fields are filled out
    const checkForEmptyField = (inputsObj, setHelperTextFunc) => {
        // create array of all keys in state object
        const inputNames = Object.keys(inputsObj)
        for (let i = 0; i < inputNames.length; i++) {
            const inputName = inputNames[i]
            const inputValue = inputsObj[inputName].value
            const inputHelperText = inputsObj[inputName].helperText
            // check if obj property is blank and update helper text if blank, then return
            if (!inputValue) {
                setHelperTextFunc(inputHelperText)
                return false
            }
        }

        // if all fields filled out, return true
        return true
    }

    return (
        <>
            <Header isLoginPage={true} />
            <div>
                <div className='login-page-forms-wrapper'>
                    <form className={`login-page-form${isLoggingIn ? '' : ' hide'}`} onSubmit={handleLoginAttempt}>
                        <h2>Login</h2>
                        <div className={`helper-wrapper${loginHelperText ? '' : ' hide'}`}>
                            {loginHelperText}
                        </div>
                        <div className='form-group'>
                            <input id='loginEmailInput' type='email' onChange={handleLoginInputChange} name='email' value={loginInputValues.email.value} placeholder='Email' aria-label='email' />
                        </div>
                        <div className='form-group'>
                            <input id='loginPasswordInput' type='password' onChange={handleLoginInputChange} name='password' value={loginInputValues.password.value} placeholder='Password' aria-label='password' />
                        </div>
                        <div className='submit-btn-wrapper'>
                            <button className='blue-btn'>Login <span><FontAwesomeIcon icon={faSpinnerThird} className={`load-spinner${loadingLogin ? ' show' : ''}`} /></span></button>
                        </div>
                        <p className='login-display-change-text'>Don't have an account? <span onClick={toggleFormToDisplay}>Create an account</span></p>
                    </form>
                    <form className={`login-page-form${isLoggingIn ? ' hide' : ''}`} onSubmit={handleSignUpAttempt}>
                        <h2>Register</h2>
                        <div className={`helper-wrapper${signUpHelperText ? '' : ' hide'}`}>
                            {signUpHelperText}
                        </div>
                        <div className='form-group'>
                            <input id='registerEmailInput' type='email' onChange={handleSignupInputChange} name='email' value={signUpInputValues.email.value} placeholder='Email' aria-label='email' />
                        </div>
                        <div className='form-group'>
                            <input id='registerUsernameInput' type='text' onChange={handleSignupInputChange} name='username' value={signUpInputValues.username.value} placeholder='Username' aria-label='username' />
                        </div>
                        <div className='form-group'>
                            <input id='registerFullNameInput' type='text' onChange={handleSignupInputChange} name='name' value={signUpInputValues.name.value} placeholder='Full Name' aria-label='full name' />
                        </div>
                        <div className='form-group'>
                            <input id='registerPasswordInput' type='password' onChange={handleSignupInputChange} name='password' value={signUpInputValues.password.value} placeholder='Password' aria-label='password' />
                        </div>
                        <div className='form-group'>
                            <input id='registerPasswordReEnterInput' type='password' onChange={handleSignupInputChange} name='passwordReEnter' value={signUpInputValues.passwordReEnter.value} placeholder='Re-Enter Password' aria-label='re-enter password' />
                        </div>
                        <div className='submit-btn-wrapper'>
                            <button className='blue-btn'>Register <span><FontAwesomeIcon icon={faSpinnerThird} className={`load-spinner${loadingSignUp ? ' show' : ''}`} /></span></button>
                        </div>
                        <p className='login-display-change-text'>Already have an account? <span onClick={toggleFormToDisplay}>Log in</span></p>
                    </form>
                </div>
            </div>
        </>
    )
}
