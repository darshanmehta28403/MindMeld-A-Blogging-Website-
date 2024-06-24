import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Male from './../male-avatar.jpg'
import Female from './../female-avatar.jpg'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const { id, username } = decodedToken;
        setUserId(id);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.error('Token not found in local storage');
    }
  }, []);

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-out',
    });

  }, [])

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (userId) {
          const response = await fetch(`/api/users/${userId}`);
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            console.error('Failed to fetch user details:', response.status);
          }
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const userLogout = () =>{
    localStorage.removeItem('token');
    navigate('/')
  }

  return (
    <div>
      {user ?
        <div>
          <div className='user-profile container mt-3'>
            <div className='d-flex justify-content-center'>
              {user.gender === "Male" ? <img src={Male} className='profile-pic' data-aos="zoom-in"></img> : <img src={Female} className='profile-pic'></img>}
            </div>
            <div data-aos="fade-in">
              <h2 className='text-center fw-bold'>{user.username}</h2>
            </div>
            <div className='mt-3 border p-5 rounded' data-aos="fade-in">
              <div className='mt-3'>
                <h5><span className='fw-bold'>First Name: </span><span>{user.fname}</span></h5>
              </div>
              <div className='mt-3'>
                <h5><span className='fw-bold'>last Name: </span><span>{user.lname}</span></h5>
              </div>
              <div className='mt-3'>
                <h5><span className='fw-bold'>Gender: </span><span>{user.gender}</span></h5>
              </div>
              <div className='mt-3'>
                <h5><span className='fw-bold'>Email: </span><span>{user.email}</span></h5>
              </div>
              <div className='mt-4'>
                <button className='btn bg-dark text-white me-3'><Link to={`/editprofile/${userId}`} className='text-white text-decoration-none'>Edit</Link></button>
                <button className='btn bg-danger text-white' onClick={userLogout}>Logout</button>
              </div>
            </div>
          </div>
          </div> : 
          <div><p>Loading...</p></div>
          }
        </div>
  );
};

      export default Profile;
