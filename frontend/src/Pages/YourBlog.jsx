import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const YourBlog = () => {

    const navigate = useNavigate()

    const token = localStorage.getItem('token');
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const { id, username } = decodedToken;
    const userid = id;

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('/api/blogs/');
                if (response.ok) {
                    const data = await response.json();
                    setBlogs(data.filter(blogItem => blogItem.user._id === userid));
                } else {
                    console.error('Failed to fetch blogs:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchBlogs();
    }, [id]);

    const deleteBlog = async (blogId) => {
        try {
            const response = await fetch(`/api/blogs/${blogId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                setBlogs(prevBlogs => prevBlogs.filter(blogItem => blogItem._id !== blogId));
                alert("Blog Deleted");
            } else {
                alert("Server error. Try again later !!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        AOS.init({
          offset: 200,
          duration: 600,
          easing: 'ease-in-out',
        });
    
      }, [])

    const EditBlog = (blogId) => {
        // Navigate to the edit blog page with the corresponding blog ID
        navigate(`/editblog/${blogId}`);
    }

    return (
        <div className='container'>
            <div  data-aos="flip-down">
                {blogs.length > 0 ? blogs.map((blogItem) => (
                    <div className='border p-4 mt-4'>
                        <Link key={blogItem._id} to={`/readblog/${blogItem._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <div className='row mr-0 h-100'>
                                <div className='col-lg-9 col-md-8 col-sm-12 h-100'>
                                    <div>
                                        <h4 className='fw-bold'>{blogItem.title}</h4>
                                        <div className='mt-2'>
                                            <span><i className="fa-solid fa-calendar-days text-secondary me-2"></i></span>
                                            <span className="text-grey me-4">{new Date(blogItem.date).toLocaleDateString()}</span>
                                            <span><i className="fa-solid fa-user me-2"></i></span><span>{username}</span>
                                        </div>
                                        <p className='mb-1 mt-2 blog-details'>{blogItem.details.split(' ').slice(0, 30).join(' ') + '...'}</p>
                                    </div>
                                    <div className='mt-3'>
                                        {blogItem.tags && blogItem.tags.map((tag) => (
                                            <span key={tag._id} className='tags me-2'>{tag.name}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className='blogimg col-lg-3 col-md-9 col-sm-12 h-100'>
                                    <img src={blogItem.image} alt={`Blog: ${blogItem.title}`} />
                                </div>
                            </div>
                        </Link>
                        <div className='border p-3 mt-3'>
                            <button className='btn btn-danger me-2' onClick={() => deleteBlog(blogItem._id)}>Delete</button>
                            <button className='btn btn-dark' onClick={() => EditBlog(blogItem._id)}>Edit</button>
                        </div>
                    </div>
                )) : <div><h2 className='mt-4 text-center'>No Blogs to Display....</h2></div>}
            </div>
        </div>
    );
};

export default YourBlog;

{/*  */ }