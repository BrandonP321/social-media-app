import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinnerThird } from '@fortawesome/pro-regular-svg-icons'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import API from '../../utils/API'
import './index.css'

export default function EditProfile() {
    let history = useHistory();

    const { username } = useParams()

    const fileInputEle = useRef()

    const [helperText, setHelperText] = useState('')

    const [displayUsername, setDisplayUsername] = useState('')

    const [user, setUser] = useState({
        email: '',
        username: '',
        name: '',
        bio: '',
        profilePicture: ''
    })

    const userHasChangedProfilePic = useRef(false)

    const [isUpdating, setIsUpdating] = useState(false)

    useEffect(() => {
        console.log(username)
        // on load, get user data from database
        API.getUser(username).
            then(response => {
                console.log(response.data)
                // update state with new data
                setUser({ ...response.data, profilePicture: response.data.profileImg })
                setDisplayUsername(response.data.username)
            })
    }, [])

    const handleInputChange = e => {
        // get name and value of input changed
        const name = e.target.name
        const value = e.target.value

        // update state with new value
        setUser({ ...user, [name]: value })
    }

    const handleChangeImgBtnClick = e => {
        e.preventDefault();

        // click file input element
        fileInputEle.current.click();
    }

    const handleImgChange = e => {
        // get location of image on user's computer
        const selectedFile = e.target.files[0]
        // create reader to read img file
        const reader = new FileReader();

        // when file is ready, update state with new img
        reader.onload = (event) => setUser({ ...user, profilePicture: event.target.result })

        // read image
        reader.readAsDataURL(selectedFile)

        // update ref to show user has changed their profile picture
        userHasChangedProfilePic.current = true
    }

    const handleFormSubmit = useCallback(e => {
        e.preventDefault();

        // if no email is provided, tell user to add a valid email
        if (!user.email) {
            return setHelperText('Email can not be blank')
        }
        // if no username is provided, tell user to add a valid username
        if (!user.username) {
            return setHelperText("Username can not be blank")
        }

        setIsUpdating(true)

        // if user has updated their profile pic, upload the new image to cloudinary
        if (userHasChangedProfilePic.current) {
            // upload image to cloudinary
            API.uploadProfilePic(user.profilePicture).
                then(response => {
                    console.log(response.data)
                    // send user data to db
                    updateUserDB(response.data.url)
                }).
                catch(err => {
                    console.log(err.response)
                    alert("An error occurred while uploading profile picture")
                    setIsUpdating(false)
                })
        } else {
            // else user didn't change their profile pic
            updateUserDB(null)
        }
    }, [user])

    // function to make API request to update user data in DB
    const updateUserDB = (img) => {
        // send user info to server
        API.userUpdate({ ...user, profilePicture: img || user.profilePicture }).
            then(response => {
                console.log(response.data)
                // store new token in local storage
                localStorage.setItem('accessToken', response.headers['auth-token'])
                // send user to their profile page
                history.push(`/user/${response.data.username}`)
            }).
            catch(err => {
                console.log(err.response)
                if (err.response.status) {
                    switch (err.response.status) {
                        case 409:
                            // 409: email taken
                            setHelperText('Email Taken')
                            break;
                        case 422:
                            // 422: username taken
                            setHelperText("Username Taken")
                            break;
                        case 401:
                        case 403:
                            // 401 || 403 : invalid token
                            history.push('/login')
                            break;
                    }
                }
            }).
            finally(() => {
                setIsUpdating(false)
            })
    }

    return (
        <>
            <Header />
            <div className='content-header-footer-offset edit-profile-content-wrapper'>
                <h1>{displayUsername}</h1>
                <form className='edit-profile-form'>
                    <div className={`helper-wrapper${helperText ? '' : ' hide'}`}>
                        {helperText}
                    </div>
                    <div className='profile-pic'>
                        <div className='img-wrapper'>
                            <img src={user.profilePicture || 'https://i.imgur.com/dCc7ake.png'} alt='profile picture' />
                        </div>
                        <button 
                            className='dark-btn' 
                            onClick={handleChangeImgBtnClick}
                            disabled={isUpdating}>Change Image</button>
                        {/* hidden input for getting image from computer */}
                        <input ref={fileInputEle} className='hide' type='file' onChange={handleImgChange} />
                    </div>
                    <label for='edit-profile-username'>Username</label>
                    <input
                        className='dark-input'
                        id='edit-profile-username'
                        type='text'
                        placeholder='Username'
                        name='username'
                        value={user.username}
                        onChange={handleInputChange} />
                    <label for='edit-profile-name'>Name</label>
                    <input
                        id='edit-profile-name'
                        className='dark-input'
                        type='text'
                        placeholder='Name'
                        name='name'
                        value={user.name}
                        onChange={handleInputChange} />
                    <label for='edit-profile-email'>Email</label>
                    <input
                        className='dark-input'
                        id='edit-profile-email'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={user.email}
                        onChange={handleInputChange} />
                    <div className='btn-wrapper'>
                        <button
                            className='blue-btn'
                            onClick={handleFormSubmit}
                            disabled={isUpdating}>
                            Save Changes <FontAwesomeIcon 
                                            icon={faSpinnerThird} 
                                            className={`btn-load-spinner${isUpdating ? '' : ' hide'}`}/>
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    )
}
