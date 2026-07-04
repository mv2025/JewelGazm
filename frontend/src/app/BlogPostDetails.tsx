import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { blog, BlogPost } from '@/lib/blog/mockBlog';
import { MediaImage } from '@/components/ui/media/MediaImage';
import { Button } from '@/components/ui/Button';

export const BlogPostDetails: React.FC = () => {
  const { handle } = useParams<{ handle: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (!handle) return;
      setLoading(true);
      try {
        const data = await blog.getPostByHandle(handle);
        setPost(data);
      } catch (err) {
        console.error('Failed to load blog post:', err);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full border-t-2 border-gold border-r-2 animate-spin" />
        <span className="font-sans text-xs uppercase tracking-widest text-white/50">Loading Article...</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
        <h2 className="font-serif text-3xl font-light text-white">Article Not Found</h2>
        <Link to="/blog">
          <Button variant="outline" className="text-white border-white">Back to Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-24 select-none">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-white/50 hover:text-gold transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Ledger
        </Link>

        {/* Post Metadata */}
        <div className="flex flex-col gap-6 mb-12 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs tracking-widest uppercase text-gold font-medium">
            <span>{post.category}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-neutral-500">{post.date}</span>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-extralight tracking-tight leading-tight text-white">
            {post.title}
          </h1>

          <div className="flex items-center justify-center md:justify-start gap-3 mt-4">
            <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-[10px] font-bold text-gold uppercase border border-white/5">
              {post.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="text-left">
              <span className="block text-xs font-serif text-white">{post.author}</span>
              <span className="block text-[9px] tracking-widest uppercase text-neutral-500 font-sans mt-0.5">Author</span>
            </div>
          </div>
        </div>

        {/* Large Hero Image */}
        <div className="relative overflow-hidden rounded-md border border-white/5 mb-16 shadow-2xl">
          <MediaImage
            src={post.image}
            alt={post.title}
            aspectRatio="wide"
            priority
          />
        </div>

        {/* Article Body */}
        <article className="prose prose-invert prose-gold max-w-none font-sans font-light text-neutral-300 leading-relaxed text-sm md:text-base flex flex-col gap-6 whitespace-pre-line">
          {post.content}
        </article>

        {/* Post Footer */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <span className="text-xs text-neutral-500">Want more updates?</span>
            <h4 className="font-serif text-md font-light text-white mt-1">Join the Creative Circle</h4>
          </div>
          <Link to="/contact">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
              Book a Consultation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetails;
