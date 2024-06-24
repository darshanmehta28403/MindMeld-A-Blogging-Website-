import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';

const EditProfile = () => {
    const { id } = useParams()
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/users/${id}`);
                const data = await response.json();
                if (response.ok) {
                    SetformData(data);
                    console.log(formData)
                }
                else {
                    alert("Server is not responding. Try again later !!")
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    }, [])

    useEffect(() => {
        AOS.init({
          offset: 200,
          duration: 600,
          easing: 'ease-in-out',
        });
    
      }, [])

    const seePassword = () =>{
        const password = formData.password
        alert(password)
    }
    
    const navigate = useNavigate()
    const [formData, SetformData] = useState({
        fname: '',
        lname: '',
        username: '',
        gender: '',
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        SetformData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fname, lname, username, email, password } = formData
        const fnameregex = /^[a-zA-Z]+$/;
        const lnameregex = /^[a-zA-Z]+$/;
        const usernameregex = /^[a-zA-Z0-9_]+$/;
        const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

        const isvalidfname = fnameregex.test(fname);
        const isvalidlname = lnameregex.test(lname);
        const isvalidusername = usernameregex.test(username);
        const isvalidemail = emailregex.test(email);
        const isvalidpassword = passwordregex.test(password);

        if (isvalidfname && isvalidlname && isvalidemail && isvalidusername) {
            if (isvalidpassword) {
                try {
                    const response = await fetch(`/api/users/${id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    })
                    if (response.ok) {
                        alert("User updated successfully")
                    }
                    else {
                        alert("This username is already taken !!")
                    }
                } catch (error) {
                    alert(error)
                }
            }
            else {
                alert("Password is not proper !!")
            }
        }
        else {
            alert("Detail is not proper !!")
        }
    }

    return (
        <div className='signup-form' data-aos="zoom-in-up">
            <div class="container mt-5 main-form d-block">
                <form class="border signup-form" onSubmit={handleSubmit}>
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <label for="" class="h5 fw-bold">First Name:</label>
                            <input type="text" class="form-control" name="fname" value={formData.fname} required onChange={handleChange} placeholder='Chandler' />
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <label for="" class="h5 fw-bold">Last Name:</label>
                            <input type="text" class="form-control" name="lname" required value={formData.lname} onChange={handleChange} placeholder='Bing' />
                        </div>
                    </div>
                    <div class="row">
                        <div class="mt-4 col-lg-6 col-md-6 col-sm-12">
                            <label for="" class="h5 fw-bold">Username:</label>
                            <input type="text" class="form-control" name="username" value={formData.username} required onChange={handleChange} placeholder='chandlermbing' />
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12 mt-4">
                            <label for="" class="h5 fw-bold">Gender:</label>
                            <select className='form-control' name="gender" value={formData.gender} onChange={handleChange}>
                                <option>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div class="mt-4">
                        <label for="" class="h5 fw-bold">E-mail:</label>
                        <input type="email" class="form-control" name="email" value={formData.email} required onChange={handleChange} placeholder='mrbing@gmail.com' />
                    </div>
                    <div className='mt-4'>
                        <label class="h5 fw-bold">Password:</label>
                        <input type="password" className="form-control" placeholder="Recipient's password" name='password' value={formData.password} onChange={handleChange} required />
                        <div className='mt-2'>
                            <ul className='m-0 ps-3'>
                                <li className='text-secondary'>The password must consist of capital latters, small latters, digits and minimum length of 8 characters.</li>
                            </ul>
                            <p onClick={seePassword} className='btn btn-success p-1 pe-2 ps-2 mt-3'>See Password</p>
                        </div>
                    </div>
                    <div class="mt-4">
                        <input type="submit" class="btn btn-dark" name="submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfile
