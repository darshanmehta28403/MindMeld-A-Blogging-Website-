import React, {useEffect} from 'react'
import Footer from './Footer'
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-out',
    });

  }, [])
  return (
    <div>
      <div>
        <div class="page-heading" data-aos="fade-in">
          <center class="text-white h1 mb-0">About Us</center>
          <center class="h5"><a href="home.php" class="text-white text-decoration-none">Home :</a><a href="#" class="text-white text-decoration-none">: About Us</a></center>
        </div>
        <div class="container h5 abus mt-5" data-aos="fade-in">
          <p>Welcome to MindMeld !</p>
          <p>At MindMeld, we are passionate about Knowledge. Our goal is to provide valuable and insightful content that informs, inspires, and engages our readers. Whether you're a novice, enthusiast, professional, student or simply have a curiosity for any topic, you've come to the right place.</p>
          <p>What sets us apart is our team of dedicated writers who bring their expertise and unique perspectives to every article. We believe in the power of words to educate, entertain, and make a positive impact on the lives of our readers. Through well-researched articles, practical tips, thought-provoking insights, and engaging stories, we aim to create a space where knowledge is shared and ideas are explored.</p>
          <p>We strive to cover a wide range of topics, including Tech and Stock Market. Our team works diligently to deliver high-quality content that is both informative and enjoyable to read. We understand that our readers come from diverse backgrounds and have varying levels of familiarity with topics. Therefore, we ensure our content is accessible to beginners while also offering in-depth analysis and advanced techniques for the more experienced audience.</p>
          <p>We also value the interaction and feedback from our readers. We encourage you to leave comments, share your thoughts, and engage in discussions. Your contributions enrich the community and foster a collaborative learning environment.</p>
          <p>Thank you for visiting MindMeld! We hope you find our articles valuable, thought-provoking, and enjoyable. Stay connected with us by subscribing to our newsletter and following us on Instagram and Twitter for updates, exclusive content, and behind-the-scenes glimpses into our writing process</p>
          <p>If you have any suggestions, questions, or would like to contribute to our blog, please don't hesitate to reach out. We love hearing from our readers and fellow enthusiasts.</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About
