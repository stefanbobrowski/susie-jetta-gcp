import { useState, useEffect, useCallback } from 'react';
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
  const [, setLastIndex] = useState(0);

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

  const fetchAlbum = useCallback(async () => {
    try {
      const response = await fetch(`/api/photos?album=${albumName}`);
      const res = await response.json();
      setPhotoAlbum(res.photos || []);
    } catch (err: unknown) {
      console.error('FETCH PHOTOS ERROR:', err);
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Failed to load photos');
      }
    }
  }, [albumName]);

  const fetchPhotos = useCallback(
    (page: number, pageSize: number) => {
      setLastIndex((prevLastIndex) => {
        const nextPhotos = shuffled.slice(prevLastIndex, prevLastIndex + pageSize);
        if (nextPhotos.length === 0) {
          setMore(false);
          return prevLastIndex;
        }

        setDataSize((prev) => prev + nextPhotos.length);
        setPhotoCols((prevCols) => {
          const newCols = [...prevCols];
          nextPhotos.forEach((photo, idx) => {
            // Prevent duplicates — check if the photo is already in the column
            if (!newCols[idx % 2].some((p) => p.url === photo.url)) {
              newCols[idx % 2].push(photo);
            }
          });
          return newCols;
        });

        setCurrentPage(page);
        return prevLastIndex + pageSize;
      });
    },
    [shuffled]
  );

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Effects
  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setPhotoAlbum([]);
    setPhotoCols([[], []]);
    setMore(true);
    setDataSize(0);
    setShuffled([]);
    setLastIndex(0);
    fetchAlbum();
  }, [albumName, fetchAlbum]);

  useEffect(() => {
    if (photoAlbum.length) {
      setShuffled((prev) => (prev.length ? prev : shufflePhotos(photoAlbum)));
    }
  }, [photoAlbum]);

  useEffect(() => {
    if (shuffled.length && dataSize === 0) {
      fetchPhotos(1, 4);
    }
  }, [shuffled, fetchPhotos, dataSize]);

  return (
    <div className="page album">
      {errorMsg && <p>{errorMsg}</p>}
      {albumName === 'III' && (
        <div className="denn-boca">
          <h2>The Denn Boca Photo Studio</h2>
          <p>4160 NW 1st Ave, Boca Raton, FL, 33431, Unit 16</p>
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
        loader={<p>Loading...</p>}
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
