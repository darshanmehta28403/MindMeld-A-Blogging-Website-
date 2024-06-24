import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Readblog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [user, setUser] = useState(null);
  const [tags, setTags] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogResponse = await fetch(`/api/blogs/${id}`);
        const blogData = await blogResponse.json();
        if (blogResponse.ok) {
          setBlog(blogData);
          // Fetch user data using blogData.user
          const userResponse = await fetch(`/api/users/${blogData.user}`);
          const userData = await userResponse.json();
          if (userResponse.ok) {
            setUser(userData);
          } else {
            console.error('Error fetching user:', userData.message);
          }
          // Fetch tags data using blogData.tags
          const tagsResponse = await Promise.all(blogData.tags.map(tagId => fetch(`/api/tags/${tagId}`)));
          const tagsData = await Promise.all(tagsResponse.map(response => response.json()));
          if (tagsResponse.every(response => response.ok)) {
            setTags(tagsData);
          } else {
            console.error('Error fetching tags:', tagsData);
          }
        } else {
          console.error('Error fetching blog:', blogData.message);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };
    fetchBlog();
  }, [id]);

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-out',
    });

  }, [])

  return (
    <div>
      {blog && (
        <div className="container mt-5" key={blog._id}>
          <div data-aos="fade-in">
            <h1 className="fw-bold">{blog.title}</h1>
          </div>
          <div className="mt-3" data-aos="fade-in">
            <span className="h5">
              <i className="fa-solid fa-calendar-days text-secondary me-2"></i>
            </span>
            <span className="text-grey me-4 h5" data-aos="fade-in">
              {new Date(blog.date).toLocaleDateString()}
            </span>
          </div>
          <div className="mt-3" data-aos="fade-in">
            <span className="h5">
              <i className="fa-solid fa-user me-2"></i>
            </span>
            <span className="h5">{user?.username}</span>
          </div>
          <div className="mt-3">
            <img src={blog.image} className="fullblog-img" alt="Blog"  data-aos="fade-in" />
          </div>
          <div className="mt-4 readblog-details" data-aos="fade-in" dangerouslySetInnerHTML={{ __html: blog.details }} />
          <div className="mt-3">
            {tags?.map((tag) => (
              <span key={tag._id} className="tags me-2">
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Readblog;
