import React from 'react';
import heroVideoSrc from '@/assets/Banners/Hero-Video.mp4';

interface HeroVideoSectionProps {
  id?: string;
  videoUrl?: string; // Kept for backwards compatibility
}

export const HeroVideoSection: React.FC<HeroVideoSectionProps> = ({ id, videoUrl }) => {
  return (
    <section id={id} className="relative w-full h-screen overflow-hidden bg-black select-none">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={heroVideoSrc || videoUrl}
      />
      
      {/* Dark overlay to ensure header text and logo remain readable over the bright video */}
      <div className="absolute inset-0 bg-black/20 z-10" />
      {/* Top gradient specifically for the header area */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/70 to-transparent pointer-events-none z-10" />
      
      {/* Call to action or main headline could go here, but for now we are just letting the header and video shine */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none mt-32">
        {/* We can place additional content overlay here in the future */}
      </div>
    </section>
  );
};
