import React from 'react';

export interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalPageProps {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  onBackToHome: () => void;
}

export default function LegalPage({ title, updated, intro, sections, onBackToHome }: LegalPageProps) {
  return (
    <div className="bg-booking-dark min-h-screen pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <button onClick={onBackToHome} className="text-sm text-white/40 hover:text-white transition-colors mb-6">← Back to home</button>

        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{title}</h1>
        <p className="mt-3 text-sm text-white/40">Last updated: {updated}</p>
        <p className="mt-6 text-white/60 leading-relaxed">{intro}</p>

        {/* Table of contents */}
        <nav className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider text-white/40 mb-3">Contents</p>
          <ol className="space-y-1.5 text-sm">
            {sections.map((s, i) => (
              <li key={s.heading}>
                <a href={`#sec-${i}`} className="text-white/60 hover:text-booking-amber transition-colors">{i + 1}. {s.heading}</a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 space-y-10">
          {sections.map((s, i) => (
            <section key={s.heading} id={`sec-${i}`} className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-white">{i + 1}. {s.heading}</h2>
              {s.body.map((p, j) => (
                <p key={j} className="mt-3 text-white/55 leading-relaxed">{p}</p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 text-sm text-white/40">
          Questions? Contact us at <a href="mailto:legal@booking.example" className="text-booking-amber hover:underline">legal@booking.example</a>.
        </div>
      </div>
    </div>
  );
}
