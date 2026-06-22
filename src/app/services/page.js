'use client';
import { useEffect, useState } from 'react';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const supabaseUrl = 'https://yrpfevxzocpedpthknhi.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycGZldnh6b2NwZWRwdGhrbmhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NDg5NjIsImV4cCI6MjA5NzUyNDk2Mn0.GMxuE_B17gwzUaqPlaHzwlY20i8XYaMNOoxY9WGijLw';

  useEffect(() => {
    async function loadServices() {
      try {
        const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
        let { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('status', 'active')
          .order('sort_order', { ascending: true });

        if (error) throw error;
        setServices(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  return (
    <>
      <nav>
        <a href="/">Home</a>
        <a href="/services" className="active">Services</a>
        <a href="/about">About</a>
      </nav>

      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        <h1 style={{ color: '#ffffff', letterSpacing: '2px', textTransform: 'uppercase', textAlign: 'center', marginBottom: '40px', fontSize: '28px' }}>Services Offered</h1>
        
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#00ff88', fontSize: '28px' }}>
            <i className="fa-solid fa-circle-notch fa-spin"></i>
          </div>
        )}

        {error && <div style={{ textAlign: 'center', color: '#ff4444', fontFamily: 'monospace' }}>Error: {error}</div>}

        {!loading && !error && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {services.map((service, index) => {
              const customUrl = service.whatsapp_url || service.link_url || 'https://wa.me/';
              return (
                <div key={index} style={{ backgroundColor: '#111111', border: '1px solid #222222', borderRadius: '8px', padding: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    {service.image_url && <img src={service.image_url} style={{ width: '200px', height: '150px', objectFit: 'cover', borderRadius: '6px', margin: '0 auto 15px auto', display: 'block', border: '1px solid #1a1a1a' }} alt={service.title} />}
                    <h3 style={{ color: '#ffffff', fontSize: '20px', margin: '0 0 10px 0', letterSpacing: '1px' }}>{service.title}</h3>
                    <p style={{ color: '#888888', fontSize: '15px', lineHeight: '1.6', marginBottom: '20px' }}>{service.description}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <a href={customUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: '#00ff88', border: '1px solid #00ff88', padding: '12px 20px', borderRadius: '6px', textDecoration: 'none', fontFamily: 'monospace', fontSize: '13px', fontWeight: 'bold' }}>
                      <i className="fa-brands fa-whatsapp"></i> {service.cta_text || 'Inquiry Service'}
                    </a>
                    {service.subdomain_url && (
                      <a href={service.subdomain_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#0d0d0d', color: '#666666', border: '1px solid #1a1a1a', padding: '12px 20px', borderRadius: '6px', textDecoration: 'none', fontFamily: 'monospace' }}>
                        Explore Subdomain <i className="fa-solid fa-arrow-right"></i>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
                }
                          
