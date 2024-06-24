import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const WriteBlog = () => {
    const token = localStorage.getItem('token');
    const decodeToken = JSON.parse(atob(token.split('.')[1]));
    const { id, username } = decodeToken;

    const [blogData, setBlogData] = useState({
        title: '',
        tags: [],
        image: '',
        details: '',
        user: id,
    });

    const [searchResults, setSearchResults] = useState([]); // Initialize search results state
    const [searchInput, setSearchInput] = useState(''); // Initialize search input state

    const navigate = useNavigate();

    const [availableTags, setAvailableTags] = useState([]); // State to store available tags

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch('api/tags/');
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

    const blogDataFunction = (event) => {
        setBlogData({ ...blogData, [event.target.name]: event.target.value });
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

    const encodedDetails = encodeURIComponent(blogData.details);
    const handlesubmit = async (e) => {
        e.preventDefault();
        const { title, tags, image, user } = blogData;

        const titleRegex = /^[a-zA-Z0-9_\s]+$/;
        const isValidTitle = titleRegex.test(title);

        const allowedExtension = ['jpg', 'jpeg', 'png'];
        const fileExtension = image.split('.').pop().toLowerCase();
        const isValidFile = allowedExtension.includes(fileExtension);

        if (isValidFile && isValidTitle) {
            const invalidTags = tags.filter((tagId) => !availableTags.some((tag) => tag._id === tagId));

            if (invalidTags.length > 0) {
                alert(`Following tags are not available: ${invalidTags.join(', ')}`);
                return;
            }

            const formData = new FormData();
            formData.append('title', title);
            formData.append('tags', JSON.stringify(tags));
            formData.append('image', e.target.elements.image.files[0]);
            formData.append('details', encodedDetails);
            formData.append('user', user);

            try {
                const response = await fetch('api/blogs/', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    alert('Blog successfully created!');
                    setBlogData({ title: '', tags: [], image: '', details: '' }); // Clear form data
                } else {
                    alert('Something went wrong. Please try again!');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Something went wrong. Please try again!');
            }
        } else {
            alert('Inputs are not valid!');
        }
    };

    useEffect(() => {
        AOS.init({
          offset: 200,
          duration: 600,
          easing: 'ease-in-out',
        });
    
      }, [])

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
                            return (
                                <li className="list-group-item" style={{backgroundColor: '#d6d6d6'}} key={tagId}>
                                    {tag.name}
                                </li>
                            );
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
                    <input type="file" className='form-control mt-2' name='image' value={blogData.image} onChange={blogDataFunction} required />
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

export default WriteBlog;
