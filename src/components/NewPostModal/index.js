import React, { useState, useRef, useEffect, useCallback } from 'react'
import API from '../../utils/API'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinnerThird } from '@fortawesome/pro-regular-svg-icons'
import './index.css'
import { useHistory } from 'react-router-dom'

export default function NewPostModal(props) {
    let history = useHistory();

    const imageUploadSvg = useRef();

    const [isPosting, setIsPosting] = useState(false)

    const [helperText, setHelperText] = useState('')

    const [imgToPost, setImgToPost] = useState('')
    const captionTextarea = useRef()
    const [captionCount, setCaptionCount] = useState(0)

    const fileInput = useRef()

    useEffect(() => {

    }, [])

    // handler when user selects a new image for upload
    const handleImageChange = (e) => {
        // get location of image on user's computer
        const selectedFile = e.target.files[0]
        // create reader to read img file
        const reader = new FileReader();

        // when file is ready, update state with new img
        reader.onload = (event) => setImgToPost(event.target.result)

        // read image
        reader.readAsDataURL(selectedFile)
    }

    const handlePostBtnClick = useCallback(() => {
        // remove any helper text
        setHelperText('')
        // if user has not chosen an img yet, alert with helper text
        if (!imgToPost) {
            return setHelperText('Please choose an image to post')
        }

        // disable post buttons while posting
        setIsPosting(true);

        // upload image to cloudinary
        API.uploadToCloudinary(imgToPost)
            .then(response => {
                // make request to server to add post to db
                API.createPost({ img: response.data.url, caption: captionTextarea.current.value })
                    .then(response => {
                        // refresh page to load in new post
                        history.go(0)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err.response)
            }).
            finally(() => setIsPosting(false))

    }, [imgToPost])

    const hideModal = () => {
        props.setShow(false)
        // show search bar in header
        const searchbar = document.querySelector('.header-search-wrapper')
        searchbar.style.opacity = 1
    }

    const updateCaptionCharCount = useCallback(() => {
        // set length of caption text in state
        const captionText = captionTextarea.current.value
        setCaptionCount(captionText.length)
    }, [captionCount])

    return (
        <>
            {/* <WidgetLoader /> */}
            <div className={`new-post-modal-wrapper-outer${props.show ? '' : ' hide'}`}>
                <div className='new-post-modal-wrapper-inner'>
                    <h2>New Post</h2>
                    <button className='exit-btn' onClick={hideModal} disabled={isPosting}><span>&times;</span></button>
                    <div className={`helper-wrapper${!helperText ? ' hide' : ''}`}>
                        {helperText}
                    </div>
                    <div className='img-aspect-ratio-wrapper'>
                        <div className='img-wrapper'>
                            {/* show img if there is one, else show svg graphic to add image */}
                            {imgToPost ?
                                <>
                                    <img src={imgToPost} alt='Image to post' />
                                    <div className='btn-wrapper'>
                                        <button className='dark-btn' onClick={() => fileInput.current.click()}>Change Image</button>
                                    </div>
                                </> :
                                <>
                                    <h3 onClick={() => fileInput.current.click()}>Upload Image</h3>
                                    <svg onClick={() => fileInput.current.click()} ref={imageUploadSvg} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 97.75 48.75"><defs></defs><rect className="cls-1" x="0.38" y="0.38" width="97" height="48" rx="3.89" /></svg>
                                </>
                            }
                        </div>
                    </div>
                    <div className='caption-wrapper'>
                        <textarea ref={captionTextarea} placeholder='Caption' maxLength='300' onChange={updateCaptionCharCount}></textarea>
                        <small className='text-count'>{captionCount}/300</small>
                    </div>
                    <div className='post-btn-wrapper'>
                        <button className='blue-btn create-post-btn' onClick={handlePostBtnClick} disabled={isPosting}>
                            Post <span><FontAwesomeIcon icon={faSpinnerThird} className={`btn-load-spinner${isPosting ? '' : ' hide'}`} /></span>
                        </button>
                    </div>
                </div>
                {/* this is a hidden input that will be activated through JS to get image from user's computer */}
                <input ref={fileInput} onChange={handleImageChange} className='hide' type='file' />
            </div>
        </>
    )
}
