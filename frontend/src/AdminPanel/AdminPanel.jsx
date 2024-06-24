import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';

const AdminPanel = () => {

    const [section, setSection] = useState("blogs")
    const [blogs, setBlogs] = useState("")
    const [users, setUsers] = useState("")
    const [tags, setTags] = useState("")
    const [adminData, setAdminData] = useState({
        isAdmin: ""
    })
    const navigate = useNavigate();

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const response = await fetch('api/blogs/')
                const data = await response.json()
                if (response.ok) {
                    setBlogs(data)
                }
            } catch (error) {
                console.log(error)
            }
        };
        getBlogs()
    }, [])

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const response = await fetch('api/users/')
                const data = await response.json()
                if (response.ok) {
                    setUsers(data)
                }
            } catch (error) {
                console.log(error)
            }
        };
        getBlogs()
    }, [])

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const response = await fetch('api/tags/')
                const data = await response.json()
                if (response.ok) {
                    setTags(data)
                }
            } catch (error) {
                console.log(error)
            }
        };
        getBlogs()
    }, [])

    useEffect(() => {
        AOS.init({
          offset: 200,
          duration: 600,
          easing: 'ease-in-out',
        });
    
      }, [])

    const deleteBlog = async (blogid) => {
        try {
            const response = await fetch(`api/blogs/${blogid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                alert("Blog Deleted")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async (userid) => {
        try {
            const response = await fetch(`api/users/${userid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                alert("User Deleted")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const makeAdmin = async (userid) => {
        try {
            const response = await fetch(`api/users/${userid}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ isAdmin: "yes" })
            });
            if (response.ok) {
                alert("Authority Granted !!")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const removeAdmin = async (userid) => {
        try {
            const response = await fetch(`api/users/${userid}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ isAdmin: "no" })
            });
            if (response.ok) {
                alert("Authority Revoked !!")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTag = async (tagid) => {
        try {
            const response = await fetch(`api/tags/${tagid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                alert("Tag Deleted")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const adminLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div>
            <div className='row me-0' style={{ height: '100vh' }}>
                <div className='col-lg-3 col-md-3 col-sm-12 pt-5 pe-0 bg-black'>
                    <div>
                        <h3 className='text-center fw-bold text-white'>Admin Panel</h3>
                        <hr style={{ backgroundColor: 'white', height: 2, opacity: 1 }} className='mt-5' />
                    </div>
                    <div className='panel mt-4'>
                        <ul type="none">
                            <div className='blogs-admin' onClick={() => setSection("blogs")} data-aos="fade-right">
                                <li><h6 className='text-white'><i class="fa-regular fa-newspaper me-4 ms-3"></i> Blogs</h6></li>
                            </div>
                            <div className='mt-2 users-admin' onClick={() => setSection("users")} data-aos="fade-right">
                                <li><h6 className='text-white'><i class="fa-solid fa-user me-4 ms-3"></i> Users</h6></li>
                            </div>
                            <div className='mt-2 tags-admin' onClick={() => setSection("tags")} data-aos="fade-right">
                                <li><h6 className='text-white'><i class="fa-solid fa-layer-group me-4 ms-3"></i> Tags</h6></li>
                            </div>
                            <div className='mt-2 tags-admin' onClick={() => adminLogout()} data-aos="fade-right">
                                <li><h6 className='text-white'><i class="fa-solid fa-power-off me-4 ms-3"></i> Logout</h6></li>
                            </div>
                        </ul>
                    </div>
                </div>
                <div className='col-lg-9 col-md-9 col-sm-12 p-0 admin-page'>
                    {
                        section == "blogs" &&
                        <section className='admin-side'>
                            <div>
                                <div data-aos="fade-in">
                                    <h2 className='m-4 fw-bold'>Blogs</h2>
                                    <hr />
                                </div>
                                <div className='p-3'>
                                    <table className='w-100 table' data-aos="fade-left">
                                        <thead>
                                            <tr className='text-center'>
                                                <th>Sr. No.</th>
                                                <th>Blog Title</th>
                                                <th>Publisher</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className='text-center'>
                                            {blogs &&
                                                blogs.map((blogitem, index) => (
                                                    <tr key={blogitem.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{blogitem.title}</td>
                                                        <td>{blogitem.user.username}</td>
                                                        <td><button onClick={() => deleteBlog(blogitem._id)} className='btn btn-danger'>Delete</button></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    }
                    {
                        section == "users" &&
                        <section className='admin-side'>
                            <div>
                                <div>
                                    <h2 className='m-4 fw-bold'>Users</h2>
                                    <hr />
                                </div>
                                <div className='p-3'>
                                    <table className='w-100 table' data-aos="fade-left">
                                        <thead>
                                            <tr className='text-center'>
                                                <th>Sr. No.</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Username</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className='text-center'>
                                            {users &&
                                                users.map((user, index) => (
                                                    <tr key={user._id}>
                                                        <td>{index + 1}</td>
                                                        <td>{user.fname}</td>
                                                        <td>{user.lname}</td>
                                                        <td>{user.username}</td>
                                                        <td><button onClick={() => deleteUser(user._id)} className='btn btn-danger me-2'>Delete</button><button onClick={() => makeAdmin(user._id)} className='btn btn-primary me-2'>Make Admin</button><button onClick={() => removeAdmin(user._id)} className='btn btn-danger'>Remove as Admin</button></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    }
                    {
                        section == "tags" &&
                        <section className='admin-side'>
                            <div>
                                <div>
                                    <h2 className='m-4 fw-bold'>Tags</h2>
                                    <hr />
                                </div>
                                <div className='p-3'>
                                    <table className='w-100 table' data-aos="fade-left">
                                        <thead>
                                            <tr className='text-center'>
                                                <th>Sr. No.</th>
                                                <th>Tag Name</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className='text-center'>
                                            {tags &&
                                                tags.map((tag, index) => (
                                                    <tr key={tag._id}>
                                                        <td>{index + 1}</td>
                                                        <td>{tag.name}</td>
                                                        <td><button onClick={() => deleteTag(tag._id)} className='btn btn-danger'>Delete</button></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminPanel
