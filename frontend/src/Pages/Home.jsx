import React, { useEffect, useState } from 'react'
import homeBgImage from './../home-bg.jpg';
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs/');
        const json = await response.json(); // Log the fetched data
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
      <div class="relative" data-aos="fade-in">
        <img src={homeBgImage} class="home-bg" />
        <div class="absolute">
          <h2><b>" Discover captivating insights and expert advice on various topics that will ignite your curiosity and deepen your knowledge, all at MindMeld. "</b></h2>
        </div>
      </div>
      <div class="container home">
        <div>
          <div class="home-heading-recent">
            <h3><b>Recently Published</b></h3>
          </div>
          <div class="home-heading-hr">
            <hr />
          </div>
        </div>
        <div>
          <div class="row w-100 m-0 vh-100">
            {/* Blog Div */}
            <div className=''>
              {blog && blog.map((blogItem) => (
                <Link to={`/readblog/${blogItem._id}`} style={{ textDecoration: 'none', color: 'black' }}>
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
                </Link>
              ))}
            </div>
          </div>
          {/* Blog div end */}
        </div>
      </div>
    </div>
  )
}
export default Home
