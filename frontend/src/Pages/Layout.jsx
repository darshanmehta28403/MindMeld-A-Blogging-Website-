import React, { useContext, useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'

const Layout = () => {
    // const { isLoggedIn} = useContext(AuthContext);

    const token = localStorage.getItem('token');
    return (
        <div className='animate__animated animate__fadeIn'>
            <div>
                <div class="text-center">
                    <h2 class="heading mt-3  mb-3"><Link to="/home" class="text-black text-decoration-none">MindMeld</Link></h2>
                    <hr class="m-0" />
                </div>
                <div class="sticky-top bg-white">
                    <nav class="navbar navbar-expand-sm bg-body-light">
                        <div class="container-fluid">
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarNav">
                                <div class="w-100 link-relative">
                                    <ul class="navbar-nav">
                                        <li class="nav-item me-lg-4">
                                            <Link class="nav-link active fw-bold" aria-current="page" to="/home">Home</Link>
                                        </li>
                                        <li class="nav-item me-lg-4">
                                            <Link class="nav-link active fw-bold" aria-current="page" to="/blog">Blog</Link>
                                        </li>
                                        <li class="nav-item me-lg-4">
                                            <Link class="nav-link active fw-bold" aria-current="page" to="/about">About</Link>
                                        </li>
                                        <li class="nav-item me-lg-4">
                                            <Link class="nav-link active fw-bold" aria-current="page" to="/contact">Contact</Link>
                                        </li>
                                        {token ? (
                                            <li class="nav-item me-lg-4">
                                                <Link class="nav-link active fw-bold" aria-current="page" to="/writeblog">Write Blog</Link>
                                            </li>
                                        ) : (<div></div>)}
                                        {token ? (
                                            <li class="nav-item me-lg-4">
                                                <Link class="nav-link active fw-bold" aria-current="page" to="/yourblog">Your Blog</Link>
                                            </li>
                                        ) : (<div></div>)}
                                    </ul>
                                    <div class="link-absolute">
                                        {token ? (
                                            <Link class="nav-link active fw-bold me-lg-4" aria-current="page" to="/profile"><i class="fa-solid fa-user"></i></Link>
                                        ) : (
                                            <Link class="nav-link active fw-bold me-lg-4" aria-current="page" to="/">Login</Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <hr class="m-0" />
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Layout
