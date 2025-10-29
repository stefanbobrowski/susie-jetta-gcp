import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Album from './pages/Album/Album';
import About from './pages/About/About';
import Book from './pages/Book/Book';
import Packages from './pages/Packages/Packages';
import Contact from './pages/Contact/Contact';
import './styles/App.scss';

window.onbeforeunload = function () {
  // Set scroll to top on refresh
  window.scrollTo(0, 0);
};

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Album albumName="I" />} />
        <Route path="/I" element={<Album albumName="I" />} />
        <Route path="/II" element={<Album albumName="II" />} />
        <Route path="/III" element={<Album albumName="III" />} />
        <Route path="/book" element={<Book />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
