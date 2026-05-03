import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './NotFound.scss';

function NotFound() {
  return (
    <div className="page not-found">
      <Helmet>
        <title>Page Not Found | Susie Jetta Photography</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <h2>404 — Page Not Found</h2>
      <p>
        The page you&apos;re looking for doesn&apos;t exist. <Link to="/">Return home</Link>
      </p>
    </div>
  );
}

export default NotFound;
