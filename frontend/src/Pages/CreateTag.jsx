import React, { useState, useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

const CreateTag = () => {

    const [tag, setTag] = useState({
        name: ""
    })

    const handleTag = async (e) => {
        setTag({ ...tag, [e.target.name]: e.target.value })
        console.log(tag)
    }

    useEffect(() => {
        AOS.init({
          offset: 200,
          duration: 600,
          easing: 'ease-in-out',
        });
    
      }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {tagName} = tag
        const tagRegex = /^[a-zA-Z]+$/;
        const isValidRegex = tagRegex.test(tagName)

        if (isValidRegex) {
            try {
                const response = await fetch('api/tags/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(tag)
                })
                if (response.ok) {
                    alert("Tag created successfully !!")
                }
                else {
                    alert("Input is not proper !!")
                }
            } catch (error) {
                console.log({error: error.msg})
            }
        }
    }
    return (
        <div className='create-tag' data-aos="fade-in">
            <form className='container mt-4' onSubmit={handleSubmit}>
                <label className='h6 fw-bold'>Tag Name:</label>
                <input type="text" className='form-control' name='name' value={tag.name} onChange={handleTag} required />
                <div className='mt-3'>
                    <input type="submit" className='btn btn-dark' value='Submit' />
                </div>
            </form>
        </div>
    )
}

export default CreateTag