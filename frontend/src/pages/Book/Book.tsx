import { Helmet } from 'react-helmet-async';
import './Book.scss';

function Book() {
  return (
    <div className="page book">
      <Helmet>
        <title>Book a Session | Susie Jetta Photography</title>
        <meta
          name="description"
          content="Book a photography or make up session with Susie Jetta in Delray Beach, FL. Email to schedule your shoot today."
        />
        <link rel="canonical" href="https://susie-jetta.com/book" />
      </Helmet>
      <h2>Book now</h2>
      <p>
        To book please email your full name, package{'('}s{')'} you&apos;re interested in,
        dates/times, email, and phone number to{' '}
        <a href="mailto:susiejetta@gmail.com">susiejetta@gmail.com</a>
      </p>
    </div>
  );
}

export default Book;
