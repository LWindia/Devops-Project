import type { FC } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Mentor from './components/Mentor';
import Pricing from './components/Pricing';
import Career from './components/Career';
import Footer from './components/Footer';

const App: FC = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-white font-poppins">
      <Header />
      <Hero />
      <About />
      <Projects />
      <Mentor />
      <Pricing />
      <Career />
      <Footer />
    </div>
  );
}

export default App;