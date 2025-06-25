import React from 'react';
import { Link } from 'react-router-dom';
import '/src/styles/main.scss';

/**
 * Home Component
 * Serves as the landing page for the Roller Derby Hub.
 */
function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero" role="banner" aria-labelledby="home-title">
        <h1 id="home-title" className="home-title">
          Welcome to the Roller Derby Hub
        </h1>
        <p className="home-subtitle">
          Discover, join, and organize dynamic roller derby events throughout the country.
        </p>
        <Link
          to="/events"
          className="home-cta-button"
          aria-label="Browse upcoming roller derby events"
        >
          Explore Events
        </Link>
      </section>

      {/* Why Join Section */}
      <section className="home-section" aria-labelledby="why-join-title">
        <h2 id="why-join-title" className="section-title">Why Join Us?</h2>
        <div className="benefits-cards">
          <div className="benefit-card">
            <span className="icon" aria-hidden="true">•</span>
            <p>Browse and register for nearby matches and tournaments.</p>
          </div>
          <div className="benefit-card">
            <span className="icon" aria-hidden="true">•</span>
            <p>Create, promote, and manage your own roller derby events with ease.</p>
          </div>
          <div className="benefit-card">
            <span className="icon" aria-hidden="true">•</span>
            <p>Connect with fellow players, clubs, and organizers in the derby community.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
