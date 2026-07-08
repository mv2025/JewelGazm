import React from 'react';
import { mockCertificates } from '@/lib/mockData/accountData';
import { Download, ShieldCheck, Search } from 'lucide-react';

export const Certificates: React.FC = () => {
  if (!mockCertificates || mockCertificates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-surface-hover rounded-full flex items-center justify-center mb-6">
          <ShieldCheck className="w-10 h-10 text-gray-300" />
        </div>
        <h3 className="font-serif text-2xl text-primary mb-2">No Certificates Found</h3>
        <p className="text-primary/60 font-sans text-sm max-w-md">
          Once you purchase an eligible diamond or gemstone piece, its digital certificate will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border/40 pb-4 mb-8 gap-4">
        <div>
          <h2 className="font-serif text-3xl text-primary flex items-center gap-2">
            Certificate Vault <ShieldCheck className="w-6 h-6 text-gold" />
          </h2>
          <p className="text-sm font-sans text-primary/60 mt-1">Secure digital storage for your authenticity certificates</p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-primary/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search certificates..." 
            className="pl-9 pr-4 py-2 border border-border/60 rounded-md text-sm font-sans w-full md:w-64 focus:outline-none focus:border-gold transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCertificates.map((cert) => (
          <div key={cert.id} className="bg-surface border border-border/60 rounded-xl overflow-hidden hover:border-gold/30 transition-all duration-300 shadow-sm group">
            <div className="aspect-[4/3] bg-surface-hover overflow-hidden relative border-b border-border/40">
              <img 
                src={cert.image} 
                alt={cert.productName} 
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-sans font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                {cert.status}
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="font-serif text-lg text-primary mb-1">{cert.productName}</h3>
              <p className="text-sm font-sans text-primary/60 mb-4 flex items-center gap-2">
                <span className="font-medium text-primary">Issued:</span> {cert.issueDate}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-border/40">
                <span className="text-xs font-sans font-bold tracking-widest text-gold">{cert.issuer} CERTIFIED</span>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-background text-xs font-sans font-medium rounded hover:bg-primary/90 transition-colors">
                  <Download className="w-3.5 h-3.5" /> PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



