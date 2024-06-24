import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const EditBlog = () => {
    const token = localStorage.getItem('token');
    const decodeToken = JSON.parse(atob(token.split('.')[1]));
    const { userid, username } = decodeToken;

    const [blogData, setBlogData] = useState({
        title: '',
        tags: [],
        image: '',
        details: '',
        user: userid,
    });

    const [searchResults, setSearchResults] = useState([]); // Initialize search results state
    const [searchInput, setSearchInput] = useState(''); // Initialize search input state

    const navigate = useNavigate();

    const [availableTags, setAvailableTags] = useState([]); // State to store available tags

    const { id } = useParams()

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(`/api/blogs/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setBlogData(data);
                    console.log(data)
                } else {
                    console.log('Failed to fetch blogs:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error.message);
            }
        };

        fetchBlogs();
    }, []);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch('/api/tags/');
                if (response.ok) {
                    const data = await response.json();
                    setAvailableTags(data);
                } else {
                    console.log('Failed to fetch tags:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching tags:', error.message);
            }
        };
        fetchTags();
    }, []);

    useEffect(() => {
        AOS.init({
          offset: 200,
          duration: 600,
          easing: 'ease-in-out',
        });
    
      }, [])

    const blogDataFunction = (event) => {
        setBlogData({ ...blogData, [event.target.name]: event.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return; // Return if no file selected
        const allowedExtension = ['jpg', 'jpeg', 'png'];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        const isValidFile = allowedExtension.includes(fileExtension);
        if (!isValidFile) {
            alert("Not A Valid File");
        } else {
            setBlogData({ ...blogData, image: file });
        }
    };    

    const handleTagSearch = async (event) => {
        const searchTerm = event.target.value;
        setSearchInput(searchTerm);

        const filteredResults = availableTags.filter((tag) =>
            tag.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSearchResults(filteredResults);
    };

    const handleTagSelection = (tag) => {
        const tagId = tag._id;
        const updatedTags = [...blogData.tags, tagId];
        setBlogData(prevState => ({ ...prevState, tags: updatedTags }));
        setSearchInput(''); // Clear search input
    };

    const handleCustomTagCreate = () => {
        navigate('/createtag');
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        const { title, tags} = blogData;

        const titleRegex = /^[a-zA-Z0-9_\s]+$/;
        const isValidTitle = titleRegex.test(title);

        if (isValidTitle) {
            const invalidTags = tags.filter((tagId) => !availableTags.some((tag) => tag._id === tagId));

            if (invalidTags.length > 0) {
                alert(`Following tags are not available: ${invalidTags.join(', ')}`);
                return;
            }
            try {
                const response = await fetch(`/api/blogs/${blogData._id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(blogData)
                });
                if (response.ok) {
                    alert('Blog successfully Updated!');
                    setBlogData({ title: '', tags: [], image: '', details: '' }); // Clear form data
                    console.log(blogData)
                } else {
                    alert(response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Something went wrong. Please try again!');
            }
        } else {
            alert('Inputs are not valid!');
        }
    };

    return (
        <div className='container mt-4 write-blog mb-3'>
            <form onSubmit={handlesubmit}>
                {/* Username */}
                <div data-aos="fade-in">
                    <label htmlFor="username" className='h6 fw-bold'>Username:</label>
                    <input type="text" className='form-control' id='username' value={username} disabled />
                </div>

                {/* Blog Title */}
                <div className='mt-4' data-aos="fade-in">
                    <label htmlFor="title" className='hr fw-bold'>Blog Title:</label>
                    <input type="text" className='form-control mt-2' name='title' value={blogData.title} onChange={blogDataFunction} required />
                </div>

                {/* Tags */}
                <div className='mt-4 tags-input' data-aos="fade-in">
                    <label htmlFor="tags" className='hr fw-bold'>Tags:</label>
                    <input type="text" className='form-control mt-2' name='tags' value={searchInput} onChange={handleTagSearch} />
                    <ul className="list-group mt-2">
                        {blogData.tags.map(tagId => {
                            const tag = availableTags.find(tag => tag._id === tagId);
                            if (tag) { // Check if tag is defined
                                return (
                                    <li className="list-group-item bg-secondary text-white" key={tagId}>
                                        {tag.name}
                                    </li>
                                );
                            } else {
                                return null;
                            }
                        })}
                        {searchResults.map(tag => (
                            <li className="list-group-item" key={tag._id} onClick={() => handleTagSelection(tag)}>
                                {tag.name}
                            </li>
                        ))}
                        <li className="list-group-item" onClick={handleCustomTagCreate}>Create Custom Tag</li>
                    </ul>
                </div>

                {/* Select Image */}
                <div className='mt-4' data-aos="fade-in">
                    <label htmlFor="image" className='hr fw-bold'>Select Image:</label>
                    <input type="file" className='form-control mt-2' name='image' onChange={handleFileChange} />
                </div>

                {/* Blog Details */}
                <div className='mt-5' data-aos="fade-in">
                    <textarea className='form-control mt-2 vh-100' name='details' value={blogData.details} onChange={blogDataFunction} placeholder='Write your story here...'></textarea>
                </div>

                {/* Submit Button */}
                <div className='mt-4'>
                    <input type="submit" className='btn btn-dark' />
                </div>
            </form>
        </div>
    );
}

export default EditBlog;
