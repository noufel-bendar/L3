import React, { useEffect, useMemo, useState } from 'react';

const phrases = [
  'سبحان الله',
  'الحمد لله',
  'لا إله إلا الله',
  'الله أكبر',
  'لا حول ولا قوة إلا بالله',
  'اللهم صلِّ وسلم على نبينا محمد ﷺ',
  'أستغفر الله وأتوب إليه',
  'سبحان الله وبحمده سبحان الله العظيم',
  'حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم',
  'اللهم اغفر لنا ولوالدينا وللمسلمين والمسلمات',
  'رب اغفر لي ولوالدي وارحمهما كما ربياني صغيرًا',
  'اللهم اجعل هذا العمل صدقة جارية'
];

const CharityPopup = () => {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);
  const phrase = useMemo(() => phrases[Math.floor(Math.random() * phrases.length)], []);

  useEffect(() => {
    const t = setTimeout(() => {
      setClosing(true);
      setTimeout(() => setVisible(false), 250);
    }, 10000);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" dir="rtl">
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage:
            'radial-gradient(circle at 2px 2px, rgba(16,185,129,0.3) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />
      </div>

      <div
        className={
          `relative max-w-xl w-[96%] sm:w-full rounded-3xl border ` +
          `border-emerald-400/40 bg-gradient-to-br from-emerald-950/80 to-teal-900/70 ` +
          `backdrop-blur-xl p-8 shadow-[0_10px_40px_rgba(16,185,129,0.25)] text-white ` +
          `ring-1 ring-emerald-300/20 overflow-hidden transform transition-all duration-200 ` +
          `${closing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`
        }
        role="dialog"
        aria-modal="true"
        aria-labelledby="charity-title"
      >
        {/* Corner ornaments */}
        <div className="pointer-events-none">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/20 to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-400/20 to-transparent rounded-tr-full" />
        </div>

        <button
          onClick={() => { setClosing(true); setTimeout(() => setVisible(false), 150); }}
          aria-label="إغلاق"
          className="absolute top-3 right-3 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white text-emerald-700 hover:bg-emerald-50 border border-white/70 shadow-[0_6px_18px_rgba(0,0,0,0.25)] ring-1 ring-emerald-300/40 transition-transform duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="mb-5 text-center">
          <div className="mx-auto mb-3 inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600/20 border border-emerald-400/40 shadow-inner">
            {/* Crescent icon */}
            <svg className="w-8 h-8 text-emerald-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          </div>
          <h3
            id="charity-title"
            className="text-4xl font-extrabold tracking-wide [font-family:'Amiri','Scheherazade New',Georgia,'Times New Roman',serif]"
          >
            صدقة جارية
          </h3>
          <div className="mt-3 flex items-center justify-center gap-3 text-emerald-200">
            <span className="inline-block w-10 h-px bg-emerald-400/50" />
            <span className="text-sm">تذكير يسير بالخير</span>
            <span className="inline-block w-10 h-px bg-emerald-400/50" />
          </div>
        </div>

        <blockquote className="mt-3 text-center text-emerald-100 text-2xl leading-relaxed [font-family:'Amiri','Scheherazade New',Georgia,'Times New Roman',serif]">
          {phrase}
        </blockquote>

        <div className="mt-6 text-center text-xs text-emerald-300/80">
          <span>تختفي النافذة تلقائيًا بعد 10 ثوانٍ</span>
        </div>
      </div>
    </div>
  );
};

export default CharityPopup;


