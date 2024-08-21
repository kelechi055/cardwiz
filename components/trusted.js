"use client";
import React from "react";

export default function TrustedBy() {
  const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '3px solid black',  // Black outline
    boxShadow: '0 0 0 2px #3F3F46',  // Grey outline
    marginRight: '-20px',  // Overlap effect
    transition: 'transform 0.3s ease-in-out',  // Smooth transition for hover effect
    zIndex: 1,  // Ensures the avatars overlap correctly
    animation: 'slideUp 1s ease-out', 
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'translateX(-10px)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translateX(0)';
  };

  return (
    <>
      <style>
        {`
          @keyframes slideUp {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '16px' }}>
        <img
          src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJrcjlzaklHaUFmMWQ4QjhuTkdBcENDc1k5TiJ9?width=80"
          alt="Avatar 1"
          style={{ ...avatarStyle, marginRight: '-10px', zIndex: 2 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <img
          src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ya3daM0JiSFRoRk1BZkFzdG95TGlhUXlDZjMifQ"
          alt="Avatar 2"
          style={{ ...avatarStyle, marginRight: '-14px', zIndex: 2 }}  
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <img
          src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ya3dWVHVvVFhKYlNrSGpqQXBtMGNzaFZPNVYifQ"
          alt="Avatar 3"
          style={{ ...avatarStyle, marginRight: '-13px', zIndex: 3 }}  
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <img
          src="https://i.postimg.cc/GpM3rgGH/plus100.png"
          alt="+ 100"
          style={{ ...avatarStyle, marginRight: '0', zIndex: 4 }}  
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>
    </>
  );
}
