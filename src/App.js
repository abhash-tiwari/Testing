import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import Join from './components/Join/Join';
import Navbar from './components/Navbar/Navbar';
import Plans from './components/Plans/Plans';
import Programs from './components/Programs/Programs';
import Reasons from './components/Reasons/Reasons';
import Testimonials from './components/Testimonials/Testimonials';
import Coaches from './components/Coaches/Coaches';

function App() {
  return (
    <Router>
      <div className="App-container">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Programs />
              <Reasons />
              <Plans />
              <Testimonials />
              <Join />
              <Footer />
            </>
          } />
          <Route path="/coaches" element={<Coaches />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
