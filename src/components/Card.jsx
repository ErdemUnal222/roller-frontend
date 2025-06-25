// /src/components/Card.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import "/src/styles/main.scss";

/**
 * Reusable Card component
 * This component is used throughout the application to display content such as events, products, or user info.
 * 
 * Props:
 * - image: URL of the image to display (optional)
 * - title: The title shown in the card (required for a11y)
 * - description: A short paragraph describing the card content (optional)
 * - link: Route to navigate to when clicking the CTA (optional)
 * - altText: Alt text for the image for accessibility (fallback to title if not provided)
 * - footer: Optional React element to display in the card footer
 */
function Card({ image, title, description, link, altText, footer }) {
  return (
    <article
      className="card"
      role="region"
      aria-labelledby={`card-title-${title?.replace(/\s+/g, '-').toLowerCase()}`}
      tabIndex="0"
    >
      {/* Conditional image rendering if an image is provided */}
      {image && (
        <img
          src={image}
          alt={altText || title} // Provide accessible alt text for screen readers
          className="card-image"
        />
      )}

      <div className="card-body">
        {/* Card Title with a unique accessible label */}
        <h3
          id={`card-title-${title?.replace(/\s+/g, '-').toLowerCase()}`}
          className="card-title"
        >
          {title}
        </h3>

        {/* Optional description paragraph */}
        {description && (
          <p className="card-description">{description}</p>
        )}

        {/* Conditional navigation link for more details */}
        {link && (
          <Link
            to={link}
            className="card-link"
            aria-label={`View more details about ${title}`}
          >
            View Details →
          </Link>
        )}

        {/* Optional footer content (e.g. buttons or metadata) */}
        {footer}
      </div>
    </article>
  );
}

export default Card;
