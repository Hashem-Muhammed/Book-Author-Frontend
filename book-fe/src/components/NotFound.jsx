import React from 'react';
import '../css/NotFound.css';

export function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">The page you're looking for doesn't exist.</p>
    </div>
  );
}