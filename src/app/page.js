'use client';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [welcomeText, setWelcomeText] = useState('Connecting secure streams...');
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const supabaseUrl = 'https://yrpfevxzocpedpthknhi.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycGZldnh6b2NwZWRwdGhrbmhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NDg5NjIsImV4cCI6MjA5NzUyNDk2Mn0.GMxuE_B17gwzUaqPlaHzwlY20i8XYaMNOoxY9WGijLw';

  useEffect(() => {
    async function loadHome() {
      try {
        const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
        let { data: homeRows } = await supabase
          .from('home')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);

        if (homeRows && homeRows.length > 0) {
          setWelcomeText(homeRows[0].welcome_text || 'Welcome to my digital outpost.');
          setSlides(homeRows);
        } else {
          setWelcomeText("Welcome to my digital outpost");
          setSlides([{ headline: 'Engineering Custom Digital Solutions.', subheadline: 'I build clean, high-performance web spaces and test automation systems.' }]);
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadHome();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  return (
    <>
      <nav>
        <a href="/" className="active">Home</a>
        <a href="/services">Services</a>
        <a href="/about">About</a>
      </nav>

      <div style={{ maxWidth: '600px', margin: '60px auto', padding: '0 20px', textAlign: 'center' }}>
        <div style={{ width: '140px', height: '140px', borderRadius: '50%', border: '2px solid #00ff88', boxShadow: '0 0 20px rgba(0, 255, 136, 0.25)', margin: '0 auto 30px auto', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#111' }}>
          <img src="https://yrpfevxzocpedpthknhi.supabase.co/storage/v1/object/public/robotlee10.dpdns.org/eb1090c3-fbfc-4c85-ad03-229fd22d2f23.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Logo" />
        </div>
        
        <h1 style={{ color: '#ffffff', fontSize: '38px', letterSpacing: '2px', margin: '0 0 10px 0', fontWeight: 'normal' }}>robotlee10</h1>
        <div style={{ color: '#00ff88', fontFamily: 'monospace', fontSize: '13px', letterSpacing: '2px', marginBottom: '30px', textTransform: 'uppercase' }}>SYSTEM // ONLINE</div>

        <div style={{ color: '#e0e0e0', fontFamily: 'system-ui', fontSize: '24px', fontWeight: '300', letterSpacing: '-0.5px', lineHeight: '1.4', margin: '0 auto 24px auto', maxWidth: '500px', textTransform: 'uppercase' }}>
          {welcomeText}
        </div>

        <div style={{ backgroundColor: '#111111', border: '1px solid #222222', borderRadius: '8px', padding: '30px 25px', position: 'relative', minHeight: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
          {slides.map((slide, idx) => (
            <div key={idx} style={{ display: idx === currentSlide ? 'block' : 'none', animation: 'fadeInOut 0.8s ease-in-out' }}>
              <div style={{ color: '#ffffff', fontSize: '20px', fontWeight: 'bold', marginBottom: '14px', lineHeight: '1.4' }}>{slide.headline}</div>
              <div style={{ lineHeight: '1.6', color: '#888888', fontSize: '15px', margin: '0 auto', maxWidth: '500px' }}>{slide.subheadline}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(0, 255, 136, 0.05)', border: '1px solid rgba(0, 255, 136, 0.2)', color: '#00ff88', fontFamily: 'monospace', fontSize: '12px', letterSpacing: '1px', padding: '6px 16px', borderRadius: '20px', margin: '30px auto 20px auto', textTransform: 'uppercase' }}>
          <span style={{ width: '8px', height: '8px', backgroundColor: '#00ff88', borderRadius: '50%', boxShadow: '0 0 8px #00ff88' }}></span>
          Available for Freelance Contracts
        </div>

        <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
          <a href="/services" style={{ flex: 1, backgroundColor: '#111111', border: '1px solid #222222', borderRadius: '8px', padding: '18px', color: '#ffffff', textDecoration: 'none', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Explore Services</span><span style={{ color: '#00ff88' }}>→</span>
          </a>
          <a href="/about" style={{ flex: 1, backgroundColor: '#111111', border: '1px solid #222222', borderRadius: '8px', padding: '18px', color: '#ffffff', textDecoration: 'none', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>View Capabilities</span><span style={{ color: '#00ff88' }}>→</span>
          </a>
        </div>
      </div>
    </>
  );
    }
  
