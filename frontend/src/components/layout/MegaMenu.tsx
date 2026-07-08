import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface MegaMenuLink   { label: string; href: string }
interface MegaMenuColumn { title: string; links: MegaMenuLink[] }
interface MegaMenuProps  { columns: MegaMenuColumn[]; onClose: () => void }

/**
 * Full-width mega menu — positioned at the nav-row level so it spans 100%.
 */
export const MegaMenu: React.FC<MegaMenuProps> = ({ columns, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-0 right-0 top-full z-50 bg-surface border-b-2 border-[var(--theme-primary)]/10 shadow-2xl"
    >
      <div className="container mx-auto px-10 max-w-screen-xl py-8">
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: `repeat(${Math.min(columns.length, 4)}, 1fr) 1.2fr` }}
        >
          {/* Category Columns */}
          {columns.map((col, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <h4 className="font-sans text-[9px] font-bold tracking-[0.22em] uppercase text-[var(--theme-primary)]/40 pb-2 border-b border-[#E8E0D5]">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((link, li) => (
                  <li key={li}>
                    <Link
                      to={link.href}
                      onClick={onClose}
                      className="font-sans text-[12px] font-medium text-[var(--theme-primary)]/75 hover:text-[var(--theme-primary)] hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 group"
                    >
                      <span className="w-0 group-hover:w-2 h-[1px] bg-[var(--theme-accent-light)] transition-all duration-200 shrink-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Spotlight Panel */}
          <div className="pl-8 border-l border-[#E8E0D5] flex flex-col justify-between gap-4">
            <div>
              <span className="text-[8px] tracking-[0.2em] font-sans font-semibold uppercase text-[var(--theme-accent-light)] px-2 py-0.5 border border-[var(--theme-accent-light)]/50 inline-block mb-3">
                Spotlight
              </span>
              <h5 className="font-serif text-base text-[var(--theme-primary)] mb-1.5 font-medium">
                Solitaire Promise
              </h5>
              <p className="text-[11px] font-sans font-light leading-relaxed text-[var(--theme-primary)]/55 max-w-[190px]">
                Hand-cut conflict-free diamond solitaires, ethically sourced and certified.
              </p>
            </div>
            <Link
              to="/collections/rings"
              onClick={onClose}
              className="text-[9px] tracking-widest font-sans font-semibold uppercase text-[var(--theme-primary)] hover:text-[var(--theme-accent-light)] border-b border-[var(--theme-primary)]/25 hover:border-[var(--theme-accent-light)] pb-0.5 self-start transition-all duration-200"
            >
              Shop Solitaires →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MegaMenu;
