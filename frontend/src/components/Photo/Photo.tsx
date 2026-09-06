import { useState } from 'react';
import './Photo.scss';

interface PhotoProps {
  photo: { name: string; url: string };
}

const Photo: React.FC<PhotoProps> = ({ photo }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`photo ${loaded ? 'loaded' : ''}`}>
      <img src={photo.url} alt={photo.name} loading="lazy" onLoad={() => setLoaded(true)} />
    </div>
  );
};

export default Photo;
