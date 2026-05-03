import { Helmet } from 'react-helmet-async';
import logo from '../../assets/logo.png';
import instagram from '../../assets/icons/instagram.svg';
import youTube from '../../assets/icons/youtube.svg';

import './Contact.scss';

function Contact() {
  return (
    <div className="page contact">
      <Helmet>
        <title>Contact | Susie Jetta Photography</title>
        <meta
          name="description"
          content="Get in touch with Susie Jetta. Email, Instagram, and YouTube contact information for photography and make up inquiries."
        />
        <link rel="canonical" href="https://susie-jetta.com/contact" />
      </Helmet>
      <div className="logo-container">
        <img src={logo} alt="Susie Jetta" />
      </div>
      <div className="email-social">
        <a className="email" href="mailto:susiejetta@gmail.com">
          susiejetta@gmail.com
        </a>
        <div className="social">
          <a
            className="instagram"
            href="https://www.instagram.com/susiejetta/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={instagram} alt="Instagram" />
          </a>
          <a
            className="youtube"
            href="https://www.youtube.com/channel/UCiV7zs_StQ6yv03WnLKy0vg"
            target="_blank"
            rel="noreferrer"
          >
            <img src={youTube} alt="YouTube" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
