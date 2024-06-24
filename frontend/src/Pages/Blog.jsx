import React from 'react'
import Footer from './Footer'
import homeBgImage from './../home-bg.jpg';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Blog = () => {
  const [blog, setBlog] = useState("")

  useEffect(() => {
    console.log("Here I come")
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs/');
        const json = await response.json();// Log the fetched data
        if (response.ok) {
          setBlog(json);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error); // Log any errors
      }
    };
    fetchBlogs();
  }, []); // Empty dependency array to run only once on mount  

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-out',
    });

  }, [])

  return (
    <div>
      {blog && blog.map((blogItem) => (
        <Link to={`/readblog/${blogItem._id}`} style={{textDecoration: 'none', color: 'black'}}>
          <div className='container'>
            <div className='blog'>
              <div>
                <div key={blogItem.id} className='blog mt-5' data-aos="flip-down">
                  <div className='row mr-0 h-100'>
                    <div className='col-lg-9 col-md-8 col-sm-12 h-100'>
                      <div>
                        <h4 className='fw-bold'>{blogItem.title}</h4>
                        <div className='mt-2'>
                          <span><i class="fa-solid fa-calendar-days text-secondary me-2"></i></span>
                          <span class="text-grey me-4">{new Date(blogItem.date).toLocaleDateString()}</span>
                          <span><i class="fa-solid fa-user me-2"></i></span><span>{blogItem.user.username}</span>
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
                      <img src={blogItem.image} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </Link>
      ))}
          <Footer />
        </div>
      )
}

      export default Blog
