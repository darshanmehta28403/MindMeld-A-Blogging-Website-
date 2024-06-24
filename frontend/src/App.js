import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Pages/Layout';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Blog from './Pages/Blog';
import Readblog from './Pages/Readblog';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import WriteBlog from './Pages/WriteBlog';
import CreateTag from './Pages/CreateTag';
import EditProfile from './Pages/EditProfile';
import YourBlog from './Pages/YourBlog';
import EditBlog from './Pages/EditBlog';
import AdminPanel from './AdminPanel/AdminPanel';
import './App.css';

function App() {
  const token = localStorage.getItem('token');
  const decodeToken = token ? JSON.parse(atob(token.split('.')[1])):{};
  const { id, username, admin } = decodeToken;
  const isAdmin = admin;

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/readblog/:id' element={<Readblog />} />
            <Route path='/signup' element={<Signup />} />
            {token ? <Route path='/profile' element={<Profile />} />: <Route path='/profile' element={<Home />} />}
            {token ? <Route path='/writeblog' element={<WriteBlog />} />: <Route path='/writeblog' element={<Home />} />}
            {token ? <Route path='/createtag' element={<CreateTag />} />: <Route path='/createtag' element={<Home />} />}
            {token ? <Route path='/editprofile/:id' element={<EditProfile />} />: <Route path='/editprofile/:id' element={<Home />} />}
            {token ? <Route path='/yourblog' element={<YourBlog />} />: <Route path='/yourblog' element={<Home />} />}
            {token ? <Route path='/editblog/:id' element={<EditBlog />} />: <Route path='/editblog/:id' element={<Home />} />}
            {/* Redirect non-admin users trying to access admin panel */}
            {!isAdmin && <Route path='/adminpanel' element={<Navigate to="/home" replace />} />}
          </Route>
          <Route index element={<Login />} />
          {/* Render admin panel if user is admin */}
          {isAdmin==="yes" ? <Route path='/adminpanel' element={<AdminPanel />} /> : <Route path='/adminpanel' element={<Home />} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
