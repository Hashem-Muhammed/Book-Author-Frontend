import React from 'react';

const UnauthorizedPage = () => {
  const pageStyles = {
    backgroundColor: '#f2f2f2',
    padding: '40px',
    textAlign: 'center',
  };

  const headingStyles = {
    fontSize: '2em',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const paragraphStyles = {
    fontSize: '1.2em',
  };

  return (
    <div className="unauthorized-page" style={pageStyles}>
      <h1 style={headingStyles}>You are not authorized to view this page.</h1>
      <p style={paragraphStyles}>It seems like you are not an Author.</p>
    </div>
  );
};

export default UnauthorizedPage;