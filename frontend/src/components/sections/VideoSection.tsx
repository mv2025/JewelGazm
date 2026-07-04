import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoSectionProps {
  videoUrl?: string;
  title?: string;
  subtitle?: string;
}

/**
 * Full-width visual background video banner
 */
export const VideoSection: React.FC<VideoSectionProps> = ({
  videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-jewelry-glistening-under-focused-light-41804-large.mp4",
  title = "A Symphony of Fire",
  subtitle = "Jewelgazm Craftsmanship"
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(e => console.log('Video play failed:', e));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-primary overflow-hidden select-none border-b border-border/40">
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        loop
        muted={isMuted}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Shadow overlay */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[0.5px]" />

      {/* Floating details */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 text-white">
        <span className="font-sans text-[10px] tracking-[0.3em] font-medium uppercase text-gold mb-3.5">
          {subtitle}
        </span>
        <h2 className="font-serif text-2xl md:text-4xl font-light tracking-wide max-w-lg mb-8 leading-tight">
          {title}
        </h2>
        
        {/* Play/Pause icon button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          className="p-4 bg-white/10 hover:bg-gold hover:scale-105 border border-white/20 hover:border-gold rounded-full text-white transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold focus:outline-none"
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-white shrink-0" /> : <Play className="w-5 h-5 fill-white shrink-0 ml-0.5" />}
        </button>
      </div>

      {/* Small Mute Icon in bottom-right corner */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        className="absolute bottom-6 right-6 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full border border-white/10 transition-colors focus-visible:ring-1 focus-visible:ring-gold"
      >
        {isMuted ? <VolumeX className="w-4 h-4 shrink-0" /> : <Volume2 className="w-4 h-4 shrink-0" />}
      </button>
    </section>
  );
};

export default VideoSection;
