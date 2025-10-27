import { useState } from 'react';
import TrackVisibility from 'react-on-screen';
import './Photo.scss';

interface PhotoProps {
  photo: { name: string; url: string };
}

const Photo: React.FC<PhotoProps> = ({ photo }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <TrackVisibility partialVisibility once>
      {({ isVisible }) => {
        const active = loaded && isVisible;
        return (
          <div className={`photo ${loaded ? 'loaded' : ''} ${active ? 'visible' : ''}`}>
            <img src={photo.url} alt={photo.name} loading="lazy" onLoad={() => setLoaded(true)} />
          </div>
        );
      }}
    </TrackVisibility>
  );
};

export default Photo;
