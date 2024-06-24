import React, {useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ContactForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const senderEmail = event.target.elements.email.value;
    const query = event.target.elements.query.value;
    const receiverEmail = 'receiver123@gmail.com'; // Replace with the fixed receiver's email

    const mailtoLink = `mailto:${receiverEmail}?body=${encodeURIComponent(query)}%0D%0A%0D%0AFrom:%20${senderEmail}`;
    window.location.href = mailtoLink;
  };

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-out',
    });

  }, [])

  return (
    <div className='container' data-aos="fade-in">
      <form className='contactus-form m-5' onSubmit={handleSubmit}>
        <div>
          <label className='h5 fw-bold'>Email: </label>
          <input type="email" name="email" className='form-control' required />
        </div>
        <div className='mt-4'>
          <label className='h5 fw-bold'>Write Your Query Here: </label>
          <textarea name="query" className='form-control' required></textarea>
        </div>
        <div className='mt-4'>
          <button type="submit" className='btn btn-dark'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
