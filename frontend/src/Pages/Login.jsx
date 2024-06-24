import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [div, setDiv] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                const token = data;
                localStorage.setItem('token', token)
                const decodeToken = JSON.parse(atob(token.split('.')[1]))
                const { id, username, admin } = decodeToken;
                if(admin == "yes"){
                    setDiv("yes")
                }
                else{
                    navigate('/home')
                }
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div>
            <div className="login-form">
                <h2 className="text-center mb-5"><b>Log In</b></h2>
                <div className="my-form">
                    <form onSubmit={handleSubmit}>
                        <div class="row m-0">
                            <div class="col-lg-4 col-md-4 labels">
                                <h5 class="mt-2"><b>Username: </b></h5>
                                <h5 class="login-password"><b>Password: </b></h5>
                            </div>
                            <div class="col-lg-8 col-md-8 inputs">
                                <input type="text" name='username' value={formData.username} class="form-control" onChange={handleChange} required />
                                <input type="password" name='password' value={formData.password} class="form-control mt-5" onChange={handleChange} required />
                                <input type="submit" class="btn btn-dark mt-3 me-2 loginbutton" name="submit1" />
                                <Link to="/home" class="btn btn-dark mt-3 without-login" name="without-login">Continue Without Login</Link>
                            </div>
                            <div class="mt-5">
                                <h5><b>Not Registered Yet ? <Link to='/signup'> Sign Up</Link></b></h5>
                            </div>
                        </div>
                    </form>
                    {div && (
                            <div>
                                <h4 className="mt-5">Where do you want to navigate?</h4>
                                <div>
                                    <button className="btn btn-dark me-3 mt-3" onClick={() => handleNavigation('/home')}>
                                        User Panel
                                    </button>
                                    <button className="btn btn-dark mt-3" onClick={() => handleNavigation('/adminpanel')}>
                                        Admin Panel
                                    </button>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
};

export default Login;
