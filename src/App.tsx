import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesTree from './components/ServicesTree';
import WhyUs from './components/WhyUs';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

function App() {
  useEffect(() => {
    // Smooth reveal animation on scroll
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-hidden');
          entry.target.classList.add('reveal');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
      el.classList.add('reveal-hidden');
      observer.observe(el);
    });

    return () => {
      revealElements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);


  return (
    <Router>
      <Routes>
            <Route path="/" element={
              <div className="relative min-h-screen w-full overflow-x-hidden">
                <Header />
                <main>
                  <Hero />
                  <WhyUs />
                  <ServicesTree />
                  <FAQ />
                  <Contact />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/projelerimiz" element={<ProjectsPage />} />
            <Route path="/hakkimizda" element={<AboutPage />} />
            <Route path="/hizmetlerimiz" element={<ServicesPage />} />
            <Route path="/hizmet/:slug" element={<ServiceDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/iletisim" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
