import { BrowserRouter, Routes, Route}  from 'react-router-dom';

import {Home, Diseases, Resources, Diagnose, Disease, Soilanalysis } from './pages';
import { Navbar, Footer, ScrollToTop } from './components';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-[calc(100vh-80px)]">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/diseases" element={<Diseases />}></Route>
          <Route path="/diseases/:id" element={<Disease />}></Route>
          <Route path="/resources" element={<Resources />}></Route>
          <Route path="/diagnose" element={<Diagnose />}></Route>
          <Route path="/soilanalysis" element={<Soilanalysis />}></Route>
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </BrowserRouter>
  );
}

export default App;
