import React from 'react';


interface InstaPost {
  id: number;
  url: string;
  image: string;
}

const INSTA_POSTS: InstaPost[] = [
  { id: 1, url: "#", image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=500&auto=format&fit=crop&q=80" },
  { id: 2, url: "#", image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=500&auto=format&fit=crop&q=80" },
  { id: 3, url: "#", image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=500&auto=format&fit=crop&q=80" },
  { id: 4, url: "#", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&auto=format&fit=crop&q=80" },
  { id: 5, url: "#", image: "https://images.unsplash.com/photo-1543294001-f7cbfe92237e?w=500&auto=format&fit=crop&q=80" },
  { id: 6, url: "#", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&auto=format&fit=crop&q=80" }
];

interface InstagramSectionProps {
  title?: string;
  subtitle?: string;
}

/**
 * Brand Instagram grid visualizer
 */
export const InstagramSection: React.FC<InstagramSectionProps> = ({
  title = "Shared Brilliancy",
  subtitle = "Follow @FRT_Studios"
}) => {
  return (
    <section className="py-24 bg-background select-none border-b border-border/40">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-16 flex flex-col gap-2">
          <span className="font-sans text-[10px] tracking-[0.3em] font-medium uppercase text-gold">
            Lifestyle Chronicles
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-light text-primary">
            {title}
          </h2>
          <a
            href="#"
            className="text-[11px] font-sans font-light tracking-wider text-primary/55 hover:text-gold transition-colors mt-1 inline-block"
          >
            {subtitle}
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTA_POSTS.map(post => (
            <a
              key={post.id}
              href={post.url}
              className="group relative block aspect-square bg-surface-hover overflow-hidden rounded-sm border border-border/20 shadow-sm"
              aria-label="View Instagram post detail"
            >
              {/* Image */}
              <img
                src={post.image}
                alt="Instagram Lifestyle photography display"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] scale-100 group-hover:scale-105"
              />

              {/* Instagram overlay mask */}
              <div className="absolute inset-0 bg-primary/25 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center text-white">
                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 scale-90 group-hover:scale-100 transition-transform duration-500">
                  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default InstagramSection;
