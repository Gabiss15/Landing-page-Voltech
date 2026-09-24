import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { HowItWorks } from './components/HowItWorks';
import { SolarCalculator } from './components/SolarCalculator';
import { Portfolio } from './components/Portfolio';
import { Team } from './components/Team';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { LoginPage } from './components/LoginPage';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [page, setPage] = useState<'home' | 'login'>('home');

  useEffect(() => {
    document.title = "Voltech EJ | Empresa Júnior";
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {page === 'login' ? (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <LoginPage onBack={() => setPage('home')} />
        </motion.div>
      ) : (
        <motion.div
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="min-h-screen bg-white"
        >
          <Header scrolled={scrolled} onLoginClick={() => setPage('login')} />
          <Hero />
          <About />
          <Services />
          <HowItWorks />
          <SolarCalculator />
          <Portfolio />
          <Team />
          <Testimonials />
          <FAQ />
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
