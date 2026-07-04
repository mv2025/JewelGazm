import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, Lightbulb, CheckCircle2, Quote } from 'lucide-react';
import { portfolio, CaseStudy } from '@/lib/portfolio';
import { BeforeAfter } from '@/components/ui/media/BeforeAfter';
import { MasonryGrid } from '@/components/ui/media/MasonryGrid';
import { MediaImage } from '@/components/ui/media/MediaImage';
import { Button } from '@/components/ui/Button';

export const CaseStudyDetails: React.FC = () => {
  const { handle } = useParams<{ handle: string }>();
  const [project, setProject] = useState<CaseStudy | null>(null);
  const [related, setRelated] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      if (!handle) return;
      setLoading(true);
      try {
        const data = await portfolio.getCaseStudyByHandle(handle);
        if (data) {
          setProject(data);
          const relatedData = await portfolio.getRelatedCaseStudies(data.id, data.category);
          setRelated(relatedData);
        }
      } catch (err) {
        console.error('Failed to load case study:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full border-t-2 border-gold border-r-2 animate-spin" />
        <span className="font-sans text-xs uppercase tracking-widest text-white/50">Loading Campaign...</span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
        <h2 className="font-serif text-3xl font-light text-white">Campaign Not Found</h2>
        <Link to="/">
          <Button variant="outline" className="text-white border-white">Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white select-none">
      {/* 1. Cinematic Hero Banner */}
      <section className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden flex items-end">
        <div className="absolute inset-0 z-0 scale-102 filter brightness-[0.7]">
          <MediaImage
            src={project.heroImage}
            alt={project.title}
            aspectRatio="auto"
            priority
            wrapperClassName="h-full w-full"
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </div>

        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 pb-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-white/60 hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Studio
          </Link>

          <div className="max-w-4xl flex flex-col gap-4">
            <span className="text-xs font-semibold tracking-[0.35em] uppercase text-gold">
              {project.category} / {project.client}
            </span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight leading-[1.05]">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-x-8 gap-y-2 mt-4 text-[11px] tracking-widest text-white/55 uppercase border-t border-white/10 pt-6">
              <div>Client: <span className="text-white">{project.client}</span></div>
              <div>Year: <span className="text-white">{project.year}</span></div>
              <div>Creative Direction: <span className="text-white">FRT Studios</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Challenge & Retouching slider */}
      <section className="py-24 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Challenge description */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="text-[10px] tracking-[0.3em] font-medium uppercase text-gold">
                The Creative Brief
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-light leading-tight">
                Challenge & Objective
              </h2>
              <p className="font-sans font-light text-sm text-neutral-400 leading-relaxed">
                {project.challenge}
              </p>
              <p className="font-sans font-light text-sm text-neutral-400 leading-relaxed">
                {project.process}
              </p>
            </div>

            {/* Interactive Raw vs Retouch Slider */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <BeforeAfter
                beforeImage={project.galleryImages[1] || project.heroImage}
                afterImage={project.galleryImages[0]}
                beforeLabel="In-Camera Raw"
                afterLabel="Retouched Deliverable"
                aspectRatio="landscape"
              />
              <span className="text-[9px] tracking-widest uppercase font-sans text-center text-neutral-500 mt-2">
                Use the slider to drag and compare the raw studio capture vs the hand-retouched editorial file.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Lighting setups & Equipment used */}
      <section className="py-24 bg-[#0d0d0d] border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Tech details */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] tracking-[0.3em] font-medium uppercase text-gold">
                  Behind the Spark
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-light">
                  Lighting & Technical Blueprint
                </h2>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold shrink-0">
                  <Lightbulb className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif text-sm tracking-wide uppercase text-white">Lighting Setup</h3>
                  <p className="text-xs text-neutral-400 font-sans font-light leading-relaxed">
                    {project.lightingSetup}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold shrink-0">
                  <Camera className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif text-sm tracking-wide uppercase text-white">Equipment Specifications</h3>
                  <ul className="flex flex-wrap gap-2 mt-1">
                    {project.equipmentUsed.map((eq, i) => (
                      <li key={i} className="text-[10px] tracking-widest uppercase bg-neutral-900 border border-white/5 text-white/80 px-3 py-1 rounded-sm font-sans">
                        {eq}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Moodboard / Shoot visuals */}
            <div className="grid grid-cols-2 gap-4">
              {project.moodboardImages.slice(0, 2).map((img, i) => (
                <div key={i} className="rounded-md overflow-hidden border border-white/5 aspect-[4/5]">
                  <img
                    src={img}
                    alt={`Moodboard detail ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 4. Final Editorial Deliverables (Masonry) */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="text-center mb-16 flex flex-col gap-3">
            <span className="text-[10px] tracking-[0.3em] font-medium uppercase text-gold">
              The Retouched Visuals
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-light">
              Final Editorial Deliverables
            </h2>
          </div>

          <MasonryGrid
            images={project.galleryImages}
            columns={{ mobile: 1, tablet: 2, desktop: 3 }}
            gap="lg"
          />
        </div>
      </section>

      {/* 5. Client review box */}
      <section className="py-24 bg-[#0d0d0d] border-y border-white/5">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="flex flex-col items-center text-center gap-8">
            <Quote className="w-12 h-12 text-gold/30 stroke-[1.25]" />
            <p className="font-serif text-lg md:text-2xl font-light italic leading-relaxed text-neutral-300">
              "{project.clientReview.quote}"
            </p>
            <div className="flex items-center gap-4">
              {project.clientReview.avatar && (
                <img
                  src={project.clientReview.avatar}
                  alt={project.clientReview.author}
                  className="w-12 h-12 rounded-full object-cover border border-white/10"
                />
              )}
              <div className="text-left">
                <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-white">
                  {project.clientReview.author}
                </h4>
                <p className="text-[10px] font-sans font-light tracking-widest text-neutral-500 uppercase mt-0.5">
                  {project.clientReview.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Related Projects Showcase */}
      {related.length > 0 && (
        <section className="py-24 bg-black">
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <h3 className="font-serif text-xl md:text-2xl font-light tracking-wide mb-12 text-white/80">
              Explore More Campaigns
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map(rel => (
                <Link
                  key={rel.id}
                  to={`/products/${rel.handle}`} // Routing to productDetails for mock client integration compatibility
                  className="group flex flex-col gap-4"
                >
                  <div className="relative aspect-[3/2] overflow-hidden rounded-md border border-white/10">
                    <img
                      src={rel.heroImage}
                      alt={rel.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] scale-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] tracking-widest font-semibold uppercase text-gold">
                      {rel.client}
                    </span>
                    <h4 className="font-serif text-md font-light text-white group-hover:text-gold transition-colors">
                      {rel.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CaseStudyDetails;
