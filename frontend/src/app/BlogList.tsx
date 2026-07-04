import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blog, BlogPost } from '@/lib/blog/mockBlog';
import { MediaImage } from '@/components/ui/media/MediaImage';

export const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await blog.getPosts();
        setPosts(data);
      } catch (err) {
        console.error('Failed to load blog posts:', err);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full border-t-2 border-gold border-r-2 animate-spin" />
        <span className="font-sans text-xs uppercase tracking-widest text-white/50">Loading Blog...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-24 select-none">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20 flex flex-col gap-3">
          <span className="font-sans text-[10px] tracking-[0.35em] font-medium uppercase text-gold">
            Insights & Behind the Scenes
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white leading-tight">
            The Creative Ledger
          </h1>
          <p className="font-sans font-light text-sm text-neutral-400 max-w-xl mx-auto mt-2 leading-relaxed">
            Technical lighting setups, photography gear tips, set design walkthroughs, and stories straight from our studio production bays.
          </p>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {posts.map((post, idx) => (
            <Link
              key={post.id}
              to={`/blog/${post.handle}`}
              className="group flex flex-col gap-6"
            >
              {/* Image Frame */}
              <div className="relative overflow-hidden rounded-md border border-white/5">
                <MediaImage
                  src={post.image}
                  alt={post.title}
                  aspectRatio="landscape"
                  wrapperClassName="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] scale-100 group-hover:scale-[1.03]"
                />
              </div>

              {/* Text Meta */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-[9px] tracking-widest uppercase font-sans text-gold font-medium">
                  <span>{post.category}</span>
                  <span className="text-neutral-500">{post.date}</span>
                </div>

                <h3 className="font-serif text-lg md:text-xl font-light text-white group-hover:text-gold transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs font-sans font-light text-neutral-400 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <span className="text-[10px] tracking-widest uppercase text-white/55 font-medium border-b border-transparent group-hover:border-gold/40 group-hover:text-gold transition-all duration-300 pb-0.5 mt-2 self-start">
                  Read Article
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
