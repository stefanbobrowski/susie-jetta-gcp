import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import TrackVisibility from 'react-on-screen';

import Photo from '../../components/Photo/Photo';
import chevronUp from '../../assets/icons/chevron-up.svg';
import logo from '../../assets/logo.png';
import './Album.scss';

interface PhotoItem {
  name: string;
  url: string;
}

interface AlbumProps {
  albumName: string;
}

const Album: React.FC<AlbumProps> = ({ albumName }) => {
  const [dataSize, setDataSize] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [more, setMore] = useState(true);
  const [photoCols, setPhotoCols] = useState<PhotoItem[][]>([[], []]);
  const [errorMsg, setErrorMsg] = useState('');
  const [showScroll, setShowScroll] = useState(false);
  const [photoAlbum, setPhotoAlbum] = useState<PhotoItem[]>([]);
  const [shuffled, setShuffled] = useState<PhotoItem[]>([]);
  const [lastIndex, setLastIndex] = useState(0);

  // Shuffle helper
  const shufflePhotos = (arr: PhotoItem[]): PhotoItem[] => {
    const shuffledDeck = [...arr];
    for (let i = 0; i < shuffledDeck.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }

    const top4 = shuffledDeck.filter((p) => /^top[1-4]\.jpg$/i.test(p.name));
    const others = shuffledDeck.filter((p) => !/^top[1-4]\.jpg$/i.test(p.name));

    return [...top4, ...others];
  };

  const fetchAlbum = async () => {
    try {
      const response = await fetch(`/photos?album=${albumName}`);
      const res = await response.json();
      setPhotoAlbum(res.photos || []);
    } catch (err: any) {
      console.error('FETCH PHOTOS ERROR:', err);
      setErrorMsg(err.message || 'Failed to load photos');
    }
  };

  const fetchPhotos = (page: number, pageSize: number) => {
    const nextPhotos = shuffled.slice(lastIndex, lastIndex + pageSize);
    if (nextPhotos.length > 0) {
      setDataSize((prev) => prev + nextPhotos.length);
      const newCols = [...photoCols];
      nextPhotos.forEach((photo, idx) => {
        newCols[idx % 2].push(photo);
      });
      setPhotoCols(newCols);
      setCurrentPage(page);
      setLastIndex((prev) => prev + pageSize);
    } else {
      setMore(false);
    }
  };

  const checkScrollTop = () => setShowScroll(window.pageYOffset > 400);
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Effects
  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  useEffect(() => {
    setPhotoAlbum([]);
    setPhotoCols([[], []]);
    setMore(true);
    setDataSize(0);
    setShuffled([]);
    setLastIndex(0);
    fetchAlbum();
  }, [albumName]);

  useEffect(() => {
    if (photoAlbum.length && !shuffled.length) {
      setShuffled(shufflePhotos(photoAlbum));
    }
  }, [photoAlbum]);

  useEffect(() => {
    if (shuffled.length) fetchPhotos(1, 4);
  }, [shuffled]);

  return (
    <div className="page album">
      {errorMsg && <p>{errorMsg}</p>}
      {albumName === 'III' && (
        <div className="denn-boca">
          <h2>The Denn Boca Photo Studio</h2>
          <p>4160 NW 1st Ave, Boca Raton, FL, 33431, Unit 16</p>
          <a href="https://thedennboca.booksy.com" target="_blank" rel="noreferrer">
            Click here to book
          </a>
        </div>
      )}

      <InfiniteScroll
        dataLength={dataSize}
        next={() => fetchPhotos(currentPage + 1, 2)}
        hasMore={more}
        scrollThreshold={0.5}
        endMessage={
          <div className="logo-container">
            <img src={logo} alt="Susie Jetta" />
          </div>
        }
        loader={true}
      >
        <div className="photo-album col-2">
          {photoCols.map((photoCol, i) => (
            <div className="photo-column" key={i}>
              {photoCol.map((photo, j) => (
                <TrackVisibility partialVisibility once key={j}>
                  <Photo photo={photo} />
                </TrackVisibility>
              ))}
            </div>
          ))}
        </div>
      </InfiniteScroll>

      <button
        className="scroll-to-top-button"
        style={{ display: showScroll ? 'flex' : 'none' }}
        onClick={scrollTop}
      >
        <img src={chevronUp} alt="Scroll to top" />
      </button>
    </div>
  );
};

export default Album;
