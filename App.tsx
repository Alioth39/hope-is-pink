import { useState, useEffect } from 'react'
import { translations, mythQuestions, quizQuestions, type Lang } from './data/content'
import universityLogo from './assets/university-logo.jpg'

type Page = 'home' | 'what-is' | 'warning-signs' | 'early-detection' | 'mammogram' | 'journey' | 'reconstruction' | 'risk-factors' | 'prevention'

// ─── Translation helper ────────────────────────────────────────────────────
function useT(lang: Lang) {
  return (key: keyof typeof translations.ar) => translations[lang][key] as string
}

// ─── Ribbon SVG ────────────────────────────────────────────────────────────
function RibbonSVG({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M40 55 C20 40 10 25 15 12 C18 4 25 0 32 0 C37 0 40 4 40 4 C40 4 43 0 48 0 C55 0 62 4 65 12 C70 25 60 40 40 55Z" fill="#E87096" opacity="0.9"/>
      <path d="M40 55 L28 85 C26 90 22 95 18 98 C14 101 12 102 14 105 C16 108 22 108 28 105 L40 95 L52 105 C58 108 64 108 66 105 C68 102 66 101 62 98 C58 95 54 90 52 85 L40 55Z" fill="#D4547E" opacity="0.9"/>
      <ellipse cx="40" cy="55" rx="4" ry="4" fill="#FAC0D4"/>
    </svg>
  )
}

// ─── Medical Disclaimer ────────────────────────────────────────────────────
function MedicalDisclaimer({ lang, t }: { lang: Lang; t: (k: keyof typeof translations.ar) => string }) {
  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="bg-blush-50 border border-blush-200 rounded-2xl p-4 flex gap-3 items-start">
      <span className="text-rose-500 text-xl mt-0.5 flex-shrink-0">ℹ️</span>
      <p className="text-sm text-plum-700 leading-relaxed">{t('disclaimer')}</p>
    </div>
  )
}

// ─── Back Button ───────────────────────────────────────────────────────────
function BackButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 text-rose-500 hover:text-rose-600 font-semibold transition-colors group"
      aria-label={label}
    >
      <span className="group-hover:-translate-x-1 transition-transform">←</span>
      <span>{label}</span>
    </button>
  )
}

// ─── Navbar ────────────────────────────────────────────────────────────────
function Navbar({
  lang,
  setLang,
  setPage,
  t,
}: {
  lang: Lang
  setLang: (l: Lang) => void
  setPage: (p: Page) => void
  t: (k: keyof typeof translations.ar) => string
}) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navLinks = [
    { label: t('nav_home'), href: '#hero', page: 'home' as Page },
    { label: t('nav_signs'), href: '#signs', page: 'warning-signs' as Page },
    { label: t('nav_detection'), href: '#detection', page: 'early-detection' as Page },
    { label: t('nav_saudi'), href: '#saudi', page: 'home' as Page },
    { label: t('nav_faq'), href: '#faq', page: 'home' as Page },
  ]

  return (
    <nav
      dir={dir}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-blush-100' : 'bg-white/80 backdrop-blur-sm'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => setPage('home')}
            className="flex items-center gap-2 group"
          >
            <RibbonSVG className="w-7 h-10 group-hover:scale-110 transition-transform" />
            <span className="nav-campaign-name font-bold leading-tight hidden sm:block">
              Hope Is Pink
            </span>
            <img
              src={universityLogo}
              alt={lang === 'ar' ? 'شعار كلية الطب بجامعة الإمام محمد بن سعود الإسلامية' : 'College of Medicine, Imam Mohammad Ibn Saud Islamic University'}
              className="h-8 w-auto max-w-16 object-contain"
            />
          </button>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  if (link.href.startsWith('#')) {
                    setPage('home')
                    setTimeout(() => {
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                    }, 100)
                  } else {
                    setPage(link.page)
                  }
                }}
                className="text-sm text-plum-700 hover:text-rose-500 font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="text-sm font-semibold text-rose-500 hover:text-rose-600 border border-rose-300 hover:border-rose-400 rounded-full px-3 py-1 transition-all hover:bg-rose-50"
              aria-label={`Switch to ${lang === 'ar' ? 'English' : 'Arabic'}`}
            >
              {t('nav_lang')}
            </button>

            {/* CTA button */}
            <button
              onClick={() => setPage('early-detection')}
              className="hidden sm:flex bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all hover:shadow-lg hover:shadow-rose-200 active:scale-95"
            >
              {t('nav_start')}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 text-plum-700 hover:text-rose-500 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-blush-100 py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  setMenuOpen(false)
                  if (link.href.startsWith('#')) {
                    setPage('home')
                    setTimeout(() => {
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                    }, 100)
                  } else {
                    setPage(link.page)
                  }
                }}
                className="block w-full text-start px-2 py-2 text-plum-700 hover:text-rose-500 font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { setPage('early-detection'); setMenuOpen(false) }}
              className="w-full bg-rose-500 text-white font-semibold py-2 rounded-full mt-2"
            >
              {t('nav_start')}
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

// ─── Hero Section ──────────────────────────────────────────────────────────
function Hero({ lang, t, setPage }: { lang: Lang; t: (k: keyof typeof translations.ar) => string; setPage: (p: Page) => void }) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  return (
    <section id="hero" dir={dir} className="relative min-h-screen flex items-center overflow-hidden hero-gradient pt-16">
      {/* Background geometric pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute top-0 right-0 w-96 h-96 text-blush-200 opacity-40" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="1"/>
          <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="0.5"/>
          <line x1="20" y1="200" x2="380" y2="200" stroke="currentColor" strokeWidth="0.5"/>
          <line x1="200" y1="20" x2="200" y2="380" stroke="currentColor" strokeWidth="0.5"/>
          <line x1="73" y1="73" x2="327" y2="327" stroke="currentColor" strokeWidth="0.5"/>
          <line x1="327" y1="73" x2="73" y2="327" stroke="currentColor" strokeWidth="0.5"/>
        </svg>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blush-100 rounded-full -translate-x-1/2 translate-y-1/2 opacity-50"/>
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blush-200 rounded-full opacity-20"/>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`${lang === 'ar' ? 'text-right' : 'text-left'} space-y-6`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-rose-200 text-rose-600 text-xs font-semibold px-4 py-2 rounded-full shadow-sm animate-fade-up">
              <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"/>
              {t('hero_badge')}
            </div>

            {/* Headline */}
            <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-plum-900 leading-tight">
                {t('hero_headline_1')}
                <br />
                <span className="text-rose-500">{t('hero_headline_2')}</span>
                <span dir="ltr" className="block mt-3 text-2xl sm:text-3xl font-bold italic text-rose-600">
                  Hope Is Pink
                </span>
              </h1>
            </div>

            {/* Subtext */}
            <p className="text-lg text-plum-700 leading-relaxed max-w-lg animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {t('hero_sub')}
            </p>

            {/* CTAs */}
            <div className={`flex flex-wrap gap-3 animate-fade-up ${lang === 'ar' ? 'justify-end' : 'justify-start'}`} style={{ animationDelay: '0.3s' }}>
              <button
                onClick={() => setPage('early-detection')}
                className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-3 rounded-full transition-all hover:shadow-xl hover:shadow-rose-200 active:scale-95"
              >
                {t('hero_cta1')}
              </button>
              <button
                onClick={() => setPage('warning-signs')}
                className="bg-white hover:bg-blush-50 text-plum-800 border border-blush-200 hover:border-rose-300 font-semibold px-6 py-3 rounded-full transition-all"
              >
                {t('hero_cta2')}
              </button>
            </div>

            {/* Floating facts */}
            <div className="grid grid-cols-3 gap-3 pt-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              {[t('hero_fact1'), t('hero_fact2'), t('hero_fact3')].map((fact, i) => (
                <div key={i} className="bg-white/80 backdrop-blur-sm border border-blush-100 rounded-2xl p-3 text-center shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-xs font-medium text-plum-700 leading-snug">{fact}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="flex justify-center items-center relative">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96">
              {/* Large ribbon */}
              <div className="absolute inset-0 flex items-center justify-center animate-float">
                <RibbonSVG className="w-48 h-72 opacity-20 text-rose-300" />
              </div>
              {/* Center circle */}
              <div className="absolute inset-8 rounded-full ribbon-gradient shadow-2xl flex items-center justify-center">
                <div className="text-center text-white p-6">
                  <div className="text-6xl mb-3">🎀</div>
                  <p className="font-bold text-lg leading-tight">
                    {lang === 'ar' ? 'اكتشفي\nمبكرًا' : 'Detect\nEarly'}
                  </p>
                </div>
              </div>
              {/* Orbiting elements */}
              {[
                { emoji: '🩷', label: lang === 'ar' ? 'أمل' : 'Hope', angle: 0 },
                { emoji: '🔎', label: lang === 'ar' ? 'كشف' : 'Screen', angle: 90 },
                { emoji: '💪', label: lang === 'ar' ? 'قوة' : 'Strength', angle: 180 },
                { emoji: '🌸', label: lang === 'ar' ? 'تعافي' : 'Recover', angle: 270 },
              ].map(({ emoji, label, angle }) => {
                const rad = (angle * Math.PI) / 180
                const r = 155
                const x = 50 + r * Math.sin(rad) / 3.5
                const y = 50 - r * Math.cos(rad) / 3.5
                return (
                  <div
                    key={angle}
                    className="absolute bg-white rounded-2xl shadow-lg p-2 text-center w-16"
                    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    <div className="text-xl">{emoji}</div>
                    <div className="text-xs font-semibold text-plum-700">{label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-plum-400 animate-bounce">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}

// ─── Explore Section ───────────────────────────────────────────────────────
function ExploreSection({ lang, t, setPage }: { lang: Lang; t: (k: keyof typeof translations.ar) => string; setPage: (p: Page) => void }) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  const cards: Array<{ emojiKey: keyof typeof translations.ar; titleKey: keyof typeof translations.ar; descKey: keyof typeof translations.ar; page: Page; bg: string; border: string }> = [
    { emojiKey: 'card1_emoji', titleKey: 'card1_title', descKey: 'card1_desc', page: 'what-is', bg: 'bg-blush-50', border: 'border-blush-200' },
    { emojiKey: 'card2_emoji', titleKey: 'card2_title', descKey: 'card2_desc', page: 'warning-signs', bg: 'bg-rose-400/5', border: 'border-rose-200' },
    { emojiKey: 'card3_emoji', titleKey: 'card3_title', descKey: 'card3_desc', page: 'early-detection', bg: 'bg-blush-50', border: 'border-blush-200' },
    { emojiKey: 'card4_emoji', titleKey: 'card4_title', descKey: 'card4_desc', page: 'risk-factors', bg: 'bg-rose-400/5', border: 'border-rose-200' },
    { emojiKey: 'card5_emoji', titleKey: 'card5_title', descKey: 'card5_desc', page: 'journey', bg: 'bg-blush-50', border: 'border-blush-200' },
    { emojiKey: 'card6_emoji', titleKey: 'card6_title', descKey: 'card6_desc', page: 'reconstruction', bg: 'bg-rose-400/5', border: 'border-rose-200' },
  ]

  return (
    <section id="explore" dir={dir} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-12 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <h2 className="text-3xl sm:text-4xl font-black text-plum-900 mb-3">{t('explore_title')}</h2>
          <p className="text-plum-600 text-lg">{t('explore_sub')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <button
              key={card.page}
              onClick={() => setPage(card.page)}
              className={`${card.bg} ${card.border} border-2 rounded-3xl p-6 text-${lang === 'ar' ? 'right' : 'left'} card-hover group relative overflow-hidden`}
              aria-label={t(card.titleKey)}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-rose-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"/>
              <div className="text-4xl mb-4">{t(card.emojiKey)}</div>
              <h3 className="font-black text-plum-900 text-xl mb-2">{t(card.titleKey)}</h3>
              <p className="text-plum-600 text-sm leading-relaxed mb-4">{t(card.descKey)}</p>
              <span className="text-rose-500 font-semibold text-sm group-hover:gap-3 flex items-center gap-2 transition-all">
                {t('explore_read_more')}
                <span className={`${lang === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`}>
                  {lang === 'ar' ? '←' : '→'}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── What Is Breast Cancer Page ────────────────────────────────────────────
function WhatIsBreastCancerPage({ lang, t, setPage }: { lang: Lang; t: (k: keyof typeof translations.ar) => string; setPage: (p: Page) => void }) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  const [activeArea, setActiveArea] = useState<string | null>(null)

  const areas = [
    { id: 'tissue', label: t('anatomy_tissue'), desc: t('anatomy_tissue_desc'), cx: 50, cy: 45, fill: '#FAC0D4' },
    { id: 'ducts', label: t('anatomy_ducts'), desc: t('anatomy_ducts_desc'), cx: 40, cy: 60, fill: '#E87096' },
    { id: 'nipple', label: t('anatomy_nipple'), desc: t('anatomy_nipple_desc'), cx: 50, cy: 72, fill: '#D4547E' },
    { id: 'lymph', label: t('anatomy_lymph'), desc: t('anatomy_lymph_desc'), cx: 25, cy: 38, fill: '#8B2D52' },
  ]

  return (
    <div dir={dir} className="section-transition min-h-screen bg-cream pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BackButton onClick={() => setPage('home')} label={t('back')} />
        </div>

        <div className={`mb-10 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className="inline-flex items-center gap-2 bg-blush-100 text-rose-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            🎀 {lang === 'ar' ? 'فهم المرض' : 'Understanding the Disease'}
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-plum-900 mb-4">{t('whatIs_title')}</h1>
          <p className="text-lg text-plum-700 leading-relaxed max-w-2xl">{t('whatIs_body')}</p>
          <p className="text-base text-plum-600 leading-relaxed max-w-2xl mt-3">{t('whatIs_body2')}</p>
        </div>

        {/* Interactive anatomy */}
        <div className="bg-white rounded-3xl border border-blush-100 shadow-sm p-6 sm:p-8 mb-8">
          <h2 className={`font-black text-plum-900 text-2xl mb-2 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t('whatIs_anatomy_title')}</h2>
          <p className={`text-plum-500 text-sm mb-6 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t('whatIs_anatomy_sub')}</p>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* SVG illustration */}
            <div className="flex justify-center">
              <div className="relative w-64 h-72">
                <svg viewBox="0 0 100 100" className="w-full h-full" aria-label={t('whatIs_anatomy_title')}>
                  {/* Breast outline */}
                  <ellipse cx="50" cy="55" rx="38" ry="32" fill="#FEF0F5" stroke="#FAC0D4" strokeWidth="1.5"/>
                  {/* Tissue layer */}
                  <ellipse cx="50" cy="52" rx="28" ry="24" fill="#FDDEE9" opacity="0.7"/>
                  {/* Ducts */}
                  <path d="M50 72 Q45 65 40 55 Q38 50 42 45" stroke="#E87096" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  <path d="M50 72 Q55 65 60 55 Q62 50 58 45" stroke="#E87096" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  <path d="M50 72 Q50 62 50 50 Q50 45 50 40" stroke="#E87096" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  {/* Nipple */}
                  <circle cx="50" cy="74" r="3.5" fill="#D4547E"/>
                  {/* Lymph node area */}
                  <ellipse cx="22" cy="38" rx="8" ry="6" fill="#8B2D52" opacity="0.2"/>
                  <circle cx="20" cy="36" r="2.5" fill="#8B2D52" opacity="0.6"/>
                  <circle cx="24" cy="40" r="2" fill="#8B2D52" opacity="0.5"/>

                  {/* Clickable hotspots */}
                  {areas.map(area => (
                    <circle
                      key={area.id}
                      cx={area.cx}
                      cy={area.cy}
                      r="6"
                      fill={activeArea === area.id ? area.fill : 'transparent'}
                      stroke={area.fill}
                      strokeWidth="2"
                      className="cursor-pointer"
                      onClick={() => setActiveArea(activeArea === area.id ? null : area.id)}
                    >
                      <title>{area.label}</title>
                    </circle>
                  ))}
                  {/* Hotspot dots */}
                  {areas.map(area => (
                    <circle
                      key={`dot-${area.id}`}
                      cx={area.cx}
                      cy={area.cy}
                      r="3"
                      fill={area.fill}
                      className="cursor-pointer pointer-events-none"
                    />
                  ))}
                </svg>
                {/* Labels */}
                {areas.map(area => (
                  <button
                    key={`label-${area.id}`}
                    onClick={() => setActiveArea(activeArea === area.id ? null : area.id)}
                    className={`absolute text-xs font-semibold px-2 py-1 rounded-full transition-all ${
                      activeArea === area.id
                        ? 'bg-rose-500 text-white shadow-md'
                        : 'bg-white border border-blush-200 text-plum-700 hover:border-rose-300'
                    }`}
                    style={{
                      left: `${area.cx}%`,
                      top: `${area.cy}%`,
                      transform: `translate(${area.cx > 50 ? '-110%' : '20%'}, -50%)`,
                    }}
                  >
                    {area.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Info panel */}
            <div>
              {activeArea ? (
                <div className="bg-blush-50 rounded-2xl p-5 border border-blush-200 animate-fade-up">
                  <h3 className="font-black text-plum-900 text-lg mb-3">
                    {areas.find(a => a.id === activeArea)?.label}
                  </h3>
                  <p className="text-plum-700 leading-relaxed text-sm">
                    {areas.find(a => a.id === activeArea)?.desc}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {areas.map(area => (
                    <button
                      key={area.id}
                      onClick={() => setActiveArea(area.id)}
                      className="w-full text-start bg-blush-50 hover:bg-blush-100 border border-blush-200 hover:border-rose-300 rounded-2xl p-4 transition-all flex items-center gap-3"
                    >
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: area.fill }}/>
                      <span className="font-semibold text-plum-800 text-sm">{area.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Important note */}
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 flex gap-3 mb-8">
          <span className="text-rose-500 text-xl flex-shrink-0">💡</span>
          <p className={`text-plum-800 font-medium leading-relaxed ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t('whatIs_note')}</p>
        </div>

        <MedicalDisclaimer lang={lang} t={t} />
      </div>
    </div>
  )
}

// ─── Warning Signs Page ────────────────────────────────────────────────────
function WarningSigns({ lang, t, setPage }: { lang: Lang; t: (k: keyof typeof translations.ar) => string; setPage: (p: Page) => void }) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  const [activeSign, setActiveSign] = useState<number | null>(null)

  const signs = [
    { num: 1, titleKey: 'sign1_title' as const, descKey: 'sign1_desc' as const, whyKey: 'sign1_why' as const, icon: '🔵', emoji: '🟣' },
    { num: 2, titleKey: 'sign2_title' as const, descKey: 'sign2_desc' as const, whyKey: 'sign2_why' as const, icon: '📏', emoji: '📐' },
    { num: 3, titleKey: 'sign3_title' as const, descKey: 'sign3_desc' as const, whyKey: 'sign3_why' as const, icon: '🔴', emoji: '🟠' },
    { num: 4, titleKey: 'sign4_title' as const, descKey: 'sign4_desc' as const, whyKey: 'sign4_why' as const, icon: '🔻', emoji: '🔽' },
    { num: 5, titleKey: 'sign5_title' as const, descKey: 'sign5_desc' as const, whyKey: 'sign5_why' as const, icon: '💧', emoji: '🫧' },
    { num: 6, titleKey: 'sign6_title' as const, descKey: 'sign6_desc' as const, whyKey: 'sign6_why' as const, icon: '🔵', emoji: '🫁' },
  ]

  return (
    <div dir={dir} className="section-transition min-h-screen bg-cream pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BackButton onClick={() => setPage('home')} label={t('back')} />
        </div>

        <div className={`mb-10 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className="inline-flex items-center gap-2 bg-blush-100 text-rose-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            🔎 {lang === 'ar' ? 'علامات مهمة' : 'Important Signs'}
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-plum-900 mb-4">{t('signs_title')}</h1>
          <p className="text-plum-500">{t('signs_sub')}</p>
        </div>

        {/* Signs grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {signs.map((sign) => (
            <button
              key={sign.num}
              onClick={() => setActiveSign(activeSign === sign.num ? null : sign.num)}
              className={`text-${lang === 'ar' ? 'right' : 'left'} rounded-2xl p-5 border-2 transition-all card-hover ${
                activeSign === sign.num
                  ? 'bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-200'
                  : 'bg-white border-blush-100 hover:border-rose-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0 ${
                  activeSign === sign.num ? 'bg-white/20 text-white' : 'bg-blush-100 text-rose-600'
                }`}>
                  {sign.num}
                </div>
                <div>
                  <h3 className={`font-black text-base mb-1 ${activeSign === sign.num ? 'text-white' : 'text-plum-900'}`}>
                    {t(sign.titleKey)}
                  </h3>
                  {activeSign === sign.num && (
                    <p className="text-white/90 text-sm leading-relaxed animate-fade-up">{t(sign.descKey)}</p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Expanded info panel */}
        {activeSign !== null && (
          <div className="bg-white rounded-2xl border border-blush-200 p-6 mb-8 animate-fade-up shadow-sm">
            <h3 className={`font-black text-plum-900 text-xl mb-3 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              {t(signs[activeSign - 1].titleKey)}
            </h3>
            <p className={`text-plum-700 mb-3 leading-relaxed ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              {t(signs[activeSign - 1].descKey)}
            </p>
            <div className={`flex gap-2 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              <span className="text-rose-400 flex-shrink-0 mt-0.5">ℹ</span>
              <p className="text-plum-600 text-sm italic leading-relaxed">
                {t(signs[activeSign - 1].whyKey)}
              </p>
            </div>
          </div>
        )}

        {/* Important note */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
          <h4 className={`font-black text-amber-800 mb-2 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t('signs_note_title')}</h4>
          <p className={`text-amber-700 text-sm leading-relaxed ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t('signs_note')}</p>
        </div>

        {/* CTA */}
        <div className="bg-rose-500 rounded-2xl p-6 text-white">
          <p className={`font-semibold leading-relaxed ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t('signs_cta')}</p>
        </div>

        <div className="mt-6">
          <MedicalDisclaimer lang={lang} t={t} />
        </div>
      </div>
    </div>
  )
}

// ─── Early Detection Page ──────────────────────────────────────────────────
function EarlyDetection({ lang, t, setPage }: { lang: Lang; t: (k: keyof typeof translations.ar) => string; setPage: (p: Page) => void }) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  const [activeStep, setActiveStep] = useState(0)

  const steps: Array<{ labelKey: keyof typeof translations.ar; descKey: keyof typeof translations.ar; icon: string }> = [
    { labelKey: 'timeline_t1', descKey: 'timeline_t1_desc', icon: '🗓️' },
    { labelKey: 'timeline_t2', descKey: 'timeline_t2_desc', icon: '🔬' },
    { labelKey: 'timeline_t3', descKey: 'timeline_t3_desc', icon: '📋' },
    { labelKey: 'timeline_t4', descKey: 'timeline_t4_desc', icon: '💊' },
    { labelKey: 'timeline_t5', descKey: 'timeline_t5_desc', icon: '🫶' },
  ]

  return (
    <div dir={dir} className="section-transition min-h-screen bg-cream pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BackButton onClick={() => setPage('home')} label={t('back')} />
        </div>

        <div className={`mb-10 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className="inline-flex items-center gap-2 bg-blush-100 text-rose-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            🩷 {lang === 'ar' ? 'الكشف المبكر' : 'Early Detection'}
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-plum-900 mb-4">{t('detection_title')}</h1>
          <p className="text-plum-600 text-lg leading-relaxed max-w-2xl">{t('detection_sub')}</p>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-3xl border border-blush-100 shadow-sm p-6 sm:p-8 mb-8">
          <h2 className={`font-black text-plum-900 text-xl mb-6 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t('detection_timeline_title')}</h2>

          {/* Step buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {steps.map((step, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeStep === i
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'bg-blush-50 text-plum-700 hover:bg-blush-100 border border-blush-200'
                }`}
              >
                <span>{step.icon}</span>
                <span>{t(step.labelKey)}</span>
              </button>
            ))}
          </div>

          {/* Step detail */}
          <div className="bg-blush-50 rounded-2xl p-5 border border-blush-200 animate-fade-up">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-rose-500 rounded-2xl flex items-center justify-center text-xl">
                {steps[activeStep].icon}
              </div>
              <h3 className="font-black text-plum-900 text-lg">{t(steps[activeStep].labelKey)}</h3>
            </div>
            <p className={`text-plum-700 leading-relaxed ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              {t(steps[activeStep].descKey)}
            </p>
          </div>

          {/* Progress bar */}
          <div className="mt-4 flex gap-1">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                  i <= activeStep ? 'bg-rose-400' : 'bg-blush-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Screening note */}
        <div className="bg-blush-50 border border-blush-200 rounded-2xl p-5 mb-6">
          <p className={`text-plum-700 text-sm leading-relaxed ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t('detection_note')}</p>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-rose-500 to-plum-700 rounded-3xl p-8 text-white text-center mb-8">
          <h3 className="text-2xl font-black mb-2">{t('detection_cta')}</h3>
          <p className="text-white/80 mb-4">{t('detection_sub_cta')}</p>
          <button
            onClick={() => setPage('mammogram')}
            className="bg-white text-rose-600 font-bold px-6 py-3 rounded-full hover:shadow-lg transition-all active:scale-95"
          >
            {lang === 'ar' ? 'تعرّفي على الماموغرام' : 'Learn About Mammogram'}
          </button>
        </div>

        <MedicalDisclaimer lang={lang} t={t} />
      </div>
    </div>
  )
}

// ─── Mammogram Section ─────────────────────────────────────────────────────
function MammogramSection({ lang, t, setPage }: { lang: Lang; t: (k: keyof typeof translations.ar) => string; setPage: (p: Page) => void }) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  const [activeStep, setActiveStep] = useState(0)

  const steps: Array<{ num: number; titleKey: keyof typeof translations.ar; descKey: keyof typeof translations.ar; color: string }> = [
    { num: 1, titleKey: 'mammo_step1_title', descKey: 'mammo_step1_desc', color: '#FAC0D4' },
    { num: 2, titleKey: 'mammo_step2_title', descKey: 'mammo_step2_desc', color: '#E87096' },
    { num: 3, titleKey: 'mammo_step3_title', descKey: 'mammo_step3_desc', color: '#D4547E' },
    { num: 4, titleKey: 'mammo_step4_title', descKey: 'mammo_step4_desc', color: '#8B2D52' },
  ]

  return (
    <div dir={dir} className="section-transition min-h-screen bg-cream pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BackButton onClick={() => setPage('home')} label={t('back')} />
        </div>

        <div className={`mb-10 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className="inline-flex items-center gap-2 bg-blush-100 text-rose-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            🔬 {lang === 'ar' ? 'الماموغرام' : 'Mammogram'}
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-plum-900 mb-4">{t('mammo_title')}</h1>
          <p className="text-plum-600 text-lg">{t('mammo_sub')}</p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-4 gap-3 mb-6">
          {steps.map((step, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`rounded-2xl p-4 border-2 transition-all text-center ${
                activeStep === i
                  ? 'border-rose-400 shadow-lg shadow-rose-100'
                  : 'bg-white border-blush-100 hover:border-rose-200'
              }`}
              style={activeStep === i ? { backgroundColor: step.color + '20', borderColor: step.color } : {}}
            >
              <div
                className="w-10 h-10 rounded-xl mx-auto flex items-center justify-center text-white font-black text-lg mb-2"
                style={{ backgroundColor: step.color }}
              >
                {String(step.num).padStart(2, '0')}
              </div>
              <p className="text-sm font-semibold text-plum-800">{t(step.titleKey)}</p>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="bg-white rounded-3xl border border-blush-100 shadow-sm p-6 sm:p-8 mb-6 animate-fade-up">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-2xl flex-shrink-0"
              style={{ backgroundColor: steps[activeStep].color }}
            >
              {String(steps[activeStep].num).padStart(2, '0')}
            </div>
            <h3 className="font-black text-plum-900 text-xl">{t(steps[activeStep].titleKey)}</h3>
          </div>
          <p className={`text-plum-700 leading-relaxed text-base ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            {t(steps[activeStep].descKey)}
          </p>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className="px-4 py-2 rounded-full border border-blush-200 text-plum-600 text-sm font-semibold disabled:opacity-40 hover:bg-blush-50 transition-all"
            >
              {lang === 'ar' ? 'السابق ←' : '← Previous'}
            </button>
            <button
              onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
              disabled={activeStep === steps.length - 1}
              className="px-4 py-2 rounded-full bg-rose-500 text-white text-sm font-semibold disabled:opacity-40 hover:bg-rose-600 transition-all"
            >
              {lang === 'ar' ? '→ التالي' : 'Next →'}
            </button>
          </div>
        </div>

        {/* Reassurance note */}
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 mb-6">
          <p className={`text-plum-800 font-medium leading-relaxed ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            💗 {t('mammo_reassure')}
          </p>
        </div>

        <MedicalDisclaimer lang={lang} t={t} />
      </div>
    </div>
  )
}

// ─── Saudi Arabia Section ──────────────────────────────────────────────────
function SaudiSection({ lang, t }: { lang: Lang; t: (k: keyof typeof translations.ar) => string }) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  const journeySteps = [
    { key: 'saudi_j1' as const, icon: '📢', color: '#FAC0D4' },
    { key: 'saudi_j2' as const, icon: '📚', color: '#E87096' },
    { key: 'saudi_j3' as const, icon: '🏥', color: '#D4547E' },
    { key: 'saudi_j4' as const, icon: '🔍', color: '#B83B63' },
    { key: 'saudi_j5' as const, icon: '✨', color: '#8B2D52' },
  ]

  return (
    <section id="saudi" dir={dir} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-12 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className="inline-flex items-center gap-2 bg-blush-100 text-rose-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            🇸🇦 {lang === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-plum-900 mb-4">{t('saudi_title')}</h2>
          <p className="text-xl font-semibold text-plum-700 max-w-2xl">{t('saudi_main')}</p>
        </div>

        {/* Awareness journey timeline */}
        <div className="bg-gradient-to-br from-blush-50 to-white rounded-3xl border border-blush-100 p-6 sm:p-8 mb-8">
          <h3 className={`font-black text-plum-900 text-xl mb-6 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            {t('saudi_journey_title')}
          </h3>
          <div className={`flex flex-col sm:flex-row items-center gap-4 ${lang === 'ar' ? 'sm:flex-row-reverse' : ''}`}>
            {journeySteps.map((step, i) => (
              <div key={i} className="flex sm:flex-col items-center gap-2 flex-1">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ backgroundColor: step.color + '30', border: `2px solid ${step.color}` }}
                >
                  {step.icon}
                </div>
                <p className="text-xs font-semibold text-plum-700 text-center">{t(step.key)}</p>
                {i < journeySteps.length - 1 && (
                  <div className="hidden sm:block w-full h-0.5 bg-blush-200 flex-1" style={{ margin: '0 -8px' }}/>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* MOH Efforts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blush-50 rounded-2xl p-6 border border-blush-100">
            <h4 className={`font-black text-plum-900 text-lg mb-3 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              {t('saudi_efforts_title')}
            </h4>
            <p className={`saudi-efforts-copy text-plum-600 leading-relaxed text-sm mb-3 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? (
                <>
                  تُجري وزارة الصحة السعودية حملات وطنية للتوعية بسرطان الثدي والكشف المبكر، مع التشجيع على الفحص الدوري المبكر. وهذا المحتوى تعليمي{' '}
                  <span className="fg-inline-bold" data-fge-id="fge-443">
                    من النادي الطلابي لكلية الطب بجامعة الإمام محمد بن سعود الإسلامية
                  </span>{' '}
                  ويهدف إلى رفع الوعي العام.
                </>
              ) : (
                t('saudi_efforts')
              )}
            </p>
            <p className={`text-xs text-dusty italic ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              {t('saudi_educational_note')}
            </p>
          </div>

          <div className="bg-gradient-to-br from-rose-500 to-plum-700 rounded-2xl p-6 text-white flex flex-col justify-between">
            <div>
              <div className="text-4xl mb-3">🏥</div>
              <p className={`font-semibold leading-relaxed mb-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                {t('saudi_cta')}
              </p>
            </div>
            <a
              href="https://www.moh.gov.sa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-rose-600 font-bold px-5 py-2.5 rounded-full hover:shadow-lg transition-all text-sm w-fit"
            >
              {t('footer_moh')} ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Myth vs Fact ──────────────────────────────────────────────────────────
function MythVsFact({ lang, t }: { lang: Lang; t: (k: keyof typeof translations.ar) => string }) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  const questions = mythQuestions[lang]
  const [current, setCurrent] = useState(0)
  const [answered, setAnswered] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const handleAnswer = (guessedMyth: boolean) => {
    const correct = guessedMyth === questions[current].isMyth
    setAnswered(correct)
    if (correct) setScore(s => s + 1)
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setDone(true)
    } else {
      setCurrent(c => c + 1)
      setAnswered(null)
    }
  }

  const handleRestart = () => {
    setCurrent(0)
    setAnswered(null)
    setScore(0)
    setDone(false)
  }

  return (
    <section id="myth" dir={dir} className="py-20 bg-plum-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-10 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">{t('myth_title')}</h2>
          <p className="text-blush-200">{t('myth_sub')}</p>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
          {done ? (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">🎀</div>
              <h3 className="text-2xl font-black text-plum-900 mb-2">
                {score >= questions.length * 0.7 ? t('myth_correct') : t('myth_wrong')}
              </h3>
              <p className="text-plum-600 text-lg mb-6">
                {t('myth_score_title')}: <strong className="text-rose-500">{score}</strong> {t('myth_score_out')} {questions.length}
              </p>
              <button
                onClick={handleRestart}
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-6 py-3 rounded-full transition-all"
              >
                {t('myth_restart')}
              </button>
            </div>
          ) : (
            <div>
              {/* Progress */}
              <div className="h-1.5 bg-blush-100">
                <div
                  className="h-full bg-rose-500 transition-all duration-500"
                  style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className={`flex justify-between items-center mb-6 text-sm text-plum-400 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <span>{current + 1} / {questions.length}</span>
                  <span className="font-semibold text-rose-500">{score} ✓</span>
                </div>

                <p className={`text-xl font-bold text-plum-900 mb-8 leading-relaxed ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  "{questions[current].statement}"
                </p>

                {answered === null ? (
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => handleAnswer(true)}
                      className="flex-1 bg-rose-50 hover:bg-rose-100 border-2 border-rose-200 hover:border-rose-400 text-rose-700 font-black text-lg py-4 rounded-2xl transition-all active:scale-95"
                    >
                      {t('myth_btn')}
                    </button>
                    <button
                      onClick={() => handleAnswer(false)}
                      className="flex-1 bg-blush-50 hover:bg-blush-100 border-2 border-blush-200 hover:border-rose-400 text-plum-700 font-black text-lg py-4 rounded-2xl transition-all active:scale-95"
                    >
                      {t('fact_btn')}
                    </button>
                  </div>
                ) : (
                  <div className="animate-fade-up">
                    <div className={`rounded-2xl p-4 mb-4 ${answered ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                      <p className={`font-black text-lg mb-2 ${answered ? 'text-green-700' : 'text-red-700'}`}>
                        {answered ? t('myth_correct') : t('myth_wrong')}
                      </p>
                      <p className={`text-sm leading-relaxed ${answered ? 'text-green-600' : 'text-red-600'} ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                        {questions[current].explanation}
                      </p>
                    </div>
                    <button
                      onClick={handleNext}
                      className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-2xl transition-all"
                    >
                      {current + 1 >= questions.length ? t('myth_score_title') + ' →' : t('myth_next')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Risk Factors ──────────────────────────────────────────────────────────
function RiskFactors({ lang, t, setPage }: { lang: Lang; t: (k: keyof typeof translations.ar) => string; setPage: (p: Page) => void }) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  const [active, setActive] = useState<number | null>(null)

  const risks: Array<{ labelKey: keyof typeof translations.ar; descKey: keyof typeof translations.ar; icon: string }> = [
    { labelKey: 'risk1', descKey: 'risk1_desc', icon: '🎂' },
    { labelKey: 'risk2', descKey: 'risk2_desc', icon: '👨‍👩‍👧' },
    { labelKey: 'risk3', descKey: 'risk3_desc', icon: '🧬' },
    { labelKey: 'risk4', descKey: 'risk4_desc', icon: '⚖️' },
    { labelKey: 'risk5', descKey: 'risk5_desc', icon: '🏃‍♀️' },
    { labelKey: 'risk6', descKey: 'risk6_desc', icon: '🔬' },
    { labelKey: 'risk7', descKey: 'risk7_desc', icon: '☢️' },
  ]

  const isSubPage = false

  return (
    <section id="risk" dir={dir} className="py-20 bg-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-10 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <h2 className="text-3xl sm:text-4xl font-black text-plum-900 mb-4">{t('risk_title')}</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {risks.map((risk, i) => (
            <button
              key={i}
              onClick={() => setActive(active === i ? null : i)}
              className={`text-${lang === 'ar' ? 'right' : 'left'} rounded-2xl p-5 border-2 transition-all card-hover ${
                active === i
                  ? 'bg-rose-500 border-rose-500 shadow-lg shadow-rose-200'
                  : 'bg-white border-blush-100 hover:border-rose-200'
              }`}
            >
              <div className="text-3xl mb-3">{risk.icon}</div>
              <h3 className={`font-bold text-sm ${active === i ? 'text-white' : 'text-plum-800'}`}>{t(risk.labelKey)}</h3>
              {active === i && (
                <p className="text-white/90 text-xs mt-2 leading-relaxed animate-fade-up">{t(risk.descKey)}</p>
              )}
            </button>
          ))}
        </div>

        {/* Important note */}
        <div className="bg-blush-50 border border-blush-200 rounded-2xl p-5">
          <p className={`text-plum-700 font-medium leading-relaxed ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            ⚠️ {t('risk_note')}
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Prevention Section ────────────────────────────────────────────────────
function Prevention({ lang, t }: { lang: Lang; t: (k: keyof typeof translations.ar) => string }) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  const [active, setActive] = useState<number | null>(null)

  const items: Array<{ labelKey: keyof typeof translations.ar; descKey: keyof typeof translations.ar; icon: string; color: string }> = [
    { labelKey: 'prev1', descKey: 'prev1_desc', icon: '🏃‍♀️', color: '#FAC0D4' },
    { labelKey: 'prev2', descKey: 'prev2_desc', icon: '⚖️', color: '#E87096' },
    { labelKey: 'prev3', descKey: 'prev3_desc', icon: '🥗', color: '#D4547E' },
    { labelKey: 'prev4', descKey: 'prev4_desc', icon: '🚭', color: '#B83B63' },
    { labelKey: 'prev5', descKey: 'prev5_desc', icon: '🤱', color: '#8B2D52' },
    { labelKey: 'prev6', descKey: 'prev6_desc', icon: '🏥', color: '#6B2040' },
  ]

  return (
    <section id="prevention" dir={dir} className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-10 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <h2 className="text-3xl sm:text-4xl font-black text-plum-900 mb-3">{t('prev_title')}</h2>
          <p className="text-plum-600">{t('prev_sub')}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(active === i ? null : i)}
              className={`rounded-2xl p-5 transition-all card-hover border-2 text-${lang === 'ar' ? 'right' : 'left'} ${
                active === i ? 'shadow-lg' : 'bg-blush-50 border-blush-100 hover:border-rose-200'
              }`}
              style={active === i ? { backgroundColor: item.color + '15', borderColor: item.color } : {}}
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3 className="font-bold text-sm text-plum-800 mb-1">{t(item.labelKey)}</h3>
              {active === i && (
                <p className="text-plum-600 text-xs leading-relaxed animate-fade-up">{t(item.descKey)}</p>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Treatment Journey Page ────────────────────────────────────────────────
function JourneyPage({ lang, t, setPage }: { lang: Lang; t: (k: keyof typeof translations.ar) => string; setPage: (p: Page) => void }) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  const [activeStep, setActiveStep] = useState(0)

  const steps: Array<{ titleKey: keyof typeof translations.ar; descKey: keyof typeof translations.ar; icon: string; color: string }> = [
    { titleKey: 'journey_s1', descKey: 'journey_s1_desc', icon: '🔍', color: '#FAC0D4' },
    { titleKey: 'journey_s2', descKey: 'journey_s2_desc', icon: '📋', color: '#E87096' },
    { titleKey: 'journey_s3', descKey: 'journey_s3_desc', icon: '📊', color: '#D4547E' },
    { titleKey: 'journey_s4', descKey: 'journey_s4_desc', icon: '💊', color: '#B83B63' },
    { titleKey: 'journey_s5', descKey: 'journey_s5_desc', icon: '🗓️', color: '#8B2D52' },
    { titleKey: 'journey_s6', descKey: 'journey_s6_desc', icon: '🌸', color: '#6B2040' },
  ]

  return (
    <div dir={dir} className="section-transition min-h-screen bg-cream pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BackButton onClick={() => setPage('home')} label={t('back')} />
        </div>

        <div className={`mb-10 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className="inline-flex items-center gap-2 bg-blush-100 text-rose-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            🤍 {lang === 'ar' ? 'رحلة العلاج' : 'Treatment Journey'}
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-plum-900 mb-4">{t('journey_title')}</h1>
          <p className="text-plum-600 leading-relaxed max-w-2xl">{t('journey_sub')}</p>
        </div>

        {/* Timeline steps */}
        <div className="relative mb-8">
          {/* Vertical line */}
          <div className="absolute start-6 top-0 bottom-0 w-0.5 bg-blush-200"/>

          <div className="space-y-4">
            {steps.map((step, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`relative w-full text-${lang === 'ar' ? 'right' : 'left'} flex items-start gap-4 p-5 rounded-2xl border-2 transition-all ${
                  activeStep === i
                    ? 'shadow-md'
                    : 'bg-white border-blush-100 hover:border-rose-200'
                }`}
                style={activeStep === i ? { backgroundColor: step.color + '15', borderColor: step.color } : {}}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 z-10"
                  style={{ backgroundColor: step.color }}
                >
                  {step.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-plum-900 text-base mb-1">{t(step.titleKey)}</h3>
                  {activeStep === i && (
                    <p className="text-plum-600 text-sm leading-relaxed animate-fade-up">{t(step.descKey)}</p>
                  )}
                </div>
                <div className={`text-plum-400 flex-shrink-0 mt-1 transition-transform ${activeStep === i ? 'rotate-180' : ''}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>

        <MedicalDisclaimer lang={lang} t={t} />
      </div>
    </div>
  )
}

// ─── Breast Reconstruction Page ────────────────────────────────────────────
function ReconstructionPage({ lang, t, setPage }: { lang: Lang; t: (k: keyof typeof translations.ar) => string; setPage: (p: Page) => void }) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  const [activeOption, setActiveOption] = useState<0 | 1>(0)

  return (
    <div dir={dir} className="section-transition min-h-screen bg-cream pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BackButton onClick={() => setPage('home')} label={t('back')} />
        </div>

        <div className={`mb-10 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className="inline-flex items-center gap-2 bg-blush-100 text-rose-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            🌸 {lang === 'ar' ? 'إعادة البناء' : 'Reconstruction'}
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-plum-900 mb-4">{t('recon_title')}</h1>
          <p className="text-plum-600 text-lg leading-relaxed max-w-2xl">{t('recon_sub')}</p>
        </div>

        {/* When */}
        <div className="bg-white rounded-2xl border border-blush-100 p-6 mb-6 shadow-sm">
          <h2 className={`font-black text-plum-900 text-xl mb-3 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t('recon_when_title')}</h2>
          <p className={`text-plum-600 leading-relaxed ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t('recon_when')}</p>
        </div>

        {/* Options comparison */}
        <div className="bg-white rounded-3xl border border-blush-100 shadow-sm p-6 sm:p-8 mb-6">
          <h2 className={`font-black text-plum-900 text-xl mb-6 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t('recon_options_title')}</h2>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              { titleKey: 'recon_option1' as const, detailKey: 'recon_option1_detail' as const, icon: '🫀', color: '#FAC0D4' },
              { titleKey: 'recon_option2' as const, detailKey: 'recon_option2_detail' as const, icon: '🌸', color: '#D4547E' },
            ].map((opt, i) => (
              <button
                key={i}
                onClick={() => setActiveOption(i as 0 | 1)}
                className={`text-${lang === 'ar' ? 'right' : 'left'} rounded-2xl p-5 border-2 transition-all ${
                  activeOption === i
                    ? 'shadow-lg'
                    : 'bg-blush-50 border-blush-100 hover:border-rose-200'
                }`}
                style={activeOption === i ? { backgroundColor: opt.color + '15', borderColor: opt.color } : {}}
              >
                <div className="text-3xl mb-3">{opt.icon}</div>
                <h3 className="font-black text-plum-900 text-base mb-2">{t(opt.titleKey)}</h3>
                <p className="text-plum-600 text-sm leading-relaxed">{t(opt.detailKey)}</p>
              </button>
            ))}
          </div>

          <div className="bg-blush-50 rounded-2xl p-4 border border-blush-100">
            <p className={`text-plum-600 text-sm leading-relaxed italic ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              {t('recon_note')}
            </p>
          </div>
        </div>

        <MedicalDisclaimer lang={lang} t={t} />
      </div>
    </div>
  )
}

// ─── Support Section ───────────────────────────────────────────────────────
function SupportSection({ lang, t }: { lang: Lang; t: (k: keyof typeof translations.ar) => string }) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  const [expandedTip, setExpandedTip] = useState<number | null>(null)

  const supportCards: Array<{ labelKey: keyof typeof translations.ar; descKey: keyof typeof translations.ar; icon: string; color: string }> = [
    { labelKey: 'support_psych', descKey: 'support_psych_desc', icon: '🧠', color: '#FAC0D4' },
    { labelKey: 'support_family', descKey: 'support_family_desc', icon: '👨‍👩‍👧', color: '#E87096' },
    { labelKey: 'support_friends', descKey: 'support_friends_desc', icon: '🤝', color: '#D4547E' },
    { labelKey: 'support_medical', descKey: 'support_medical_desc', icon: '👩‍⚕️', color: '#B83B63' },
    { labelKey: 'support_community', descKey: 'support_community_desc', icon: '🌸', color: '#8B2D52' },
  ]

  const tips: Array<keyof typeof translations.ar> = ['support_tip1', 'support_tip2', 'support_tip3', 'support_tip4', 'support_tip5']

  return (
    <section id="support" dir={dir} className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-12 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <h2 className="text-3xl sm:text-4xl font-black text-plum-900 mb-3">{t('support_title')}</h2>
          <p className="text-plum-600 text-lg max-w-2xl">{t('support_sub')}</p>
        </div>

        {/* Support cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {supportCards.map((card, i) => (
            <div
              key={i}
              className="rounded-2xl p-4 text-center border-2 border-blush-100 hover:border-rose-200 transition-all card-hover bg-blush-50"
            >
              <div
                className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center text-2xl"
                style={{ backgroundColor: card.color + '25' }}
              >
                {card.icon}
              </div>
              <h3 className="font-black text-plum-900 text-sm mb-1">{t(card.labelKey)}</h3>
              <p className="text-plum-500 text-xs leading-relaxed">{t(card.descKey)}</p>
            </div>
          ))}
        </div>

        {/* How to help section */}
        <div className="bg-gradient-to-br from-plum-900 to-plum-800 rounded-3xl p-6 sm:p-8 text-white">
          <h3 className={`font-black text-xl mb-5 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t('support_how_title')}</h3>
          <div className="space-y-3">
            {tips.map((tipKey, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white/10 rounded-xl p-3 hover:bg-white/15 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-rose-400 flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                  {i + 1}
                </div>
                <p className="text-white/90 text-sm">{t(tipKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ Section ───────────────────────────────────────────────────────────
function FAQSection({ lang, t }: { lang: Lang; t: (k: keyof typeof translations.ar) => string }) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs: Array<{ qKey: keyof typeof translations.ar; aKey: keyof typeof translations.ar }> = [
    { qKey: 'faq1_q', aKey: 'faq1_a' },
    { qKey: 'faq2_q', aKey: 'faq2_a' },
    { qKey: 'faq3_q', aKey: 'faq3_a' },
    { qKey: 'faq4_q', aKey: 'faq4_a' },
    { qKey: 'faq5_q', aKey: 'faq5_a' },
    { qKey: 'faq6_q', aKey: 'faq6_a' },
    { qKey: 'faq7_q', aKey: 'faq7_a' },
    { qKey: 'faq8_q', aKey: 'faq8_a' },
    { qKey: 'faq9_q', aKey: 'faq9_a' },
  ]

  return (
    <section id="faq" dir={dir} className="py-20 bg-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-10 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <h2 className="text-3xl sm:text-4xl font-black text-plum-900 mb-3">{t('faq_title')}</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-blush-100 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={`w-full flex items-center justify-between gap-4 p-5 text-${lang === 'ar' ? 'right' : 'left'} hover:bg-blush-50 transition-colors`}
                aria-expanded={openIndex === i}
              >
                <span className="font-bold text-plum-900 text-base leading-snug flex-1">{t(faq.qKey)}</span>
                <div
                  className={`w-6 h-6 rounded-full bg-blush-100 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                    openIndex === i ? 'rotate-180 bg-rose-100' : ''
                  }`}
                >
                  <svg className="w-3 h-3 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 animate-fade-up">
                  <div className="h-px bg-blush-100 mb-4"/>
                  <p className={`text-plum-600 leading-relaxed text-sm ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t(faq.aKey)}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Knowledge Quiz ────────────────────────────────────────────────────────
function KnowledgeQuiz({ lang, t }: { lang: Lang; t: (k: keyof typeof translations.ar) => string }) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  const questions = quizQuestions[lang]
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [answers, setAnswers] = useState<boolean[]>([])

  const handleSelect = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    const correct = idx === questions[current].correct
    if (correct) setScore(s => s + 1)
    setAnswers(a => [...a, correct])
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setDone(true)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
    }
  }

  const handleRestart = () => {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setDone(false)
    setAnswers([])
  }

  return (
    <section id="quiz" dir={dir} className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-10 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <h2 className="text-3xl sm:text-4xl font-black text-plum-900 mb-3">{t('quiz_title')}</h2>
          <p className="text-rose-500 text-sm font-medium">{t('quiz_disclaimer')}</p>
        </div>

        <div className="bg-white rounded-3xl border-2 border-blush-100 shadow-sm overflow-hidden">
          {done ? (
            <div className="p-8 text-center">
              <div className="text-7xl mb-4">🎀</div>
              <h3 className="text-2xl font-black text-plum-900 mb-2">
                {score >= questions.length * 0.7 ? t('quiz_excellent') : t('quiz_learned')}
              </h3>
              <p className="text-plum-500 text-lg mb-2">
                {t('quiz_score')}: <strong className="text-rose-500 text-2xl">{score}</strong> {t('quiz_out_of')} {questions.length}
              </p>
              {/* Score dots */}
              <div className="flex justify-center gap-2 mb-6">
                {answers.map((correct, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-full ${correct ? 'bg-green-400' : 'bg-red-300'}`}
                  />
                ))}
              </div>
              <button
                onClick={handleRestart}
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-6 py-3 rounded-full transition-all"
              >
                {t('quiz_restart')}
              </button>
            </div>
          ) : (
            <div>
              {/* Progress */}
              <div className="h-1.5 bg-blush-100">
                <div
                  className="h-full bg-rose-500 transition-all duration-500"
                  style={{ width: `${((current) / questions.length) * 100}%` }}
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className={`flex justify-between text-sm text-plum-400 mb-6 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <span>{current + 1} / {questions.length}</span>
                  <span>{score} ✓</span>
                </div>

                <p className={`text-lg font-bold text-plum-900 mb-6 leading-relaxed ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  {questions[current].question}
                </p>

                <div className="space-y-3 mb-6">
                  {questions[current].options.map((opt, idx) => {
                    let cls = 'border-2 border-blush-100 bg-blush-50 hover:bg-blush-100 hover:border-rose-200 text-plum-800'
                    if (selected !== null) {
                      if (idx === questions[current].correct) {
                        cls = 'border-2 border-green-400 bg-green-50 text-green-800'
                      } else if (idx === selected && selected !== questions[current].correct) {
                        cls = 'border-2 border-red-300 bg-red-50 text-red-700'
                      } else {
                        cls = 'border-2 border-blush-100 bg-blush-50 text-plum-400 opacity-60'
                      }
                    }
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        disabled={selected !== null}
                        className={`w-full text-${lang === 'ar' ? 'right' : 'left'} p-4 rounded-xl font-medium text-sm transition-all ${cls}`}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>

                {selected !== null && (
                  <div className="animate-fade-up">
                    <div className="bg-blush-50 rounded-xl p-3 mb-4 border border-blush-200">
                      <p className={`text-plum-600 text-xs leading-relaxed ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                        {questions[current].explanation}
                      </p>
                    </div>
                    <button
                      onClick={handleNext}
                      className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl transition-all"
                    >
                      {current + 1 >= questions.length ? t('quiz_finish') : t('quiz_next')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Call To Action ────────────────────────────────────────────────────────
function CallToAction({ lang, t, setPage }: { lang: Lang; t: (k: keyof typeof translations.ar) => string; setPage: (p: Page) => void }) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: t('cta_headline'),
        text: t('cta_share_msg'),
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(t('cta_share_msg') + ' ' + window.location.href).catch(() => {})
      alert(lang === 'ar' ? 'تم نسخ الرابط' : 'Link copied!')
    }
  }

  return (
    <section dir={dir} className="py-20 bg-gradient-to-br from-plum-900 via-plum-800 to-plum-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full -translate-y-1/2 translate-x-1/2"/>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blush-300/10 rounded-full translate-y-1/2 -translate-x-1/2"/>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <RibbonSVG className="w-16 h-24 mx-auto mb-6 opacity-60" />
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">{t('cta_headline')}</h2>
        <p className="text-blush-200 text-lg mb-8">{t('cta_sub')}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setPage('early-detection')}
            className="bg-rose-500 hover:bg-rose-400 text-white font-bold px-8 py-4 rounded-full transition-all hover:shadow-xl hover:shadow-rose-500/30 active:scale-95"
          >
            {t('cta_btn1')}
          </button>
          <button
            onClick={handleShare}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-4 rounded-full transition-all backdrop-blur-sm"
          >
            {t('cta_btn2')} 🔗
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ────────────────────────────────────────────────────────────────
function Footer({ lang, t, setPage }: { lang: Lang; t: (k: keyof typeof translations.ar) => string; setPage: (p: Page) => void }) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  return (
    <footer dir={dir} className="bg-plum-900 text-white pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
            <div className="flex items-center gap-3 mb-3">
              <RibbonSVG className="w-8 h-12" />
              <div>
                <h3 className="font-black text-lg">{t('footer_title')}</h3>
                <p className="footer-campaign-name text-blush-300">
                  <span className="font-bold">Hope Is Pink</span>
                </p>
              </div>
            </div>
            <p className="text-white/60 text-xs leading-relaxed">{t('footer_disclaimer')}</p>
          </div>

          {/* Links */}
          <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
            <h4 className="font-bold text-blush-200 mb-3 text-sm uppercase tracking-wider">
              {lang === 'ar' ? 'الأقسام' : 'Sections'}
            </h4>
            <ul className="space-y-2">
              {[
                { label: t('footer_home'), page: 'home' as Page },
                { label: t('footer_learn'), page: 'what-is' as Page },
                { label: t('footer_detection'), page: 'early-detection' as Page },
                { label: t('footer_faq'), page: 'home' as Page },
              ].map(link => (
                <li key={link.page}>
                  <button
                    onClick={() => setPage(link.page)}
                    className="text-white/70 hover:text-blush-200 text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Sources */}
          <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
            <h4 className="font-bold text-blush-200 mb-3 text-sm uppercase tracking-wider">{t('footer_sources')}</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.moh.gov.sa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-blush-200 text-sm transition-colors flex items-center gap-1"
                >
                  {t('footer_moh')} ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.who.int"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-blush-200 text-sm transition-colors flex items-center gap-1"
                >
                  {t('footer_who')} ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">{t('footer_rights')}</p>
          <div className="flex items-center gap-2">
            <RibbonSVG className="w-4 h-6 opacity-50" />
            <span className="text-white/40 text-xs">2026</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Back To Top ───────────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 end-6 z-40 w-10 h-10 bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:shadow-rose-300 active:scale-90"
      aria-label="Back to top"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  )
}

// ─── Home Page ─────────────────────────────────────────────────────────────
function HomePage({ lang, t, setPage }: { lang: Lang; t: (k: keyof typeof translations.ar) => string; setPage: (p: Page) => void }) {
  return (
    <>
      <Hero lang={lang} t={t} setPage={setPage} />
      <ExploreSection lang={lang} t={t} setPage={setPage} />
      <SaudiSection lang={lang} t={t} />
      <MythVsFact lang={lang} t={t} />
      <RiskFactors lang={lang} t={t} setPage={setPage} />
      <Prevention lang={lang} t={t} />
      <SupportSection lang={lang} t={t} />
      <FAQSection lang={lang} t={t} />
      <KnowledgeQuiz lang={lang} t={t} />
      <CallToAction lang={lang} t={t} setPage={setPage} />
      <Footer lang={lang} t={t} setPage={setPage} />
    </>
  )
}

// ─── App ───────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState<Lang>('ar')
  const [page, setPage] = useState<Page>('home')
  const t = useT(lang)
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  const handleSetPage = (p: Page) => {
    setPage(p)
  }

  const renderPage = () => {
    switch (page) {
      case 'what-is':
        return <WhatIsBreastCancerPage lang={lang} t={t} setPage={handleSetPage} />
      case 'warning-signs':
        return <WarningSigns lang={lang} t={t} setPage={handleSetPage} />
      case 'early-detection':
        return <EarlyDetection lang={lang} t={t} setPage={handleSetPage} />
      case 'mammogram':
        return <MammogramSection lang={lang} t={t} setPage={handleSetPage} />
      case 'journey':
        return <JourneyPage lang={lang} t={t} setPage={handleSetPage} />
      case 'reconstruction':
        return <ReconstructionPage lang={lang} t={t} setPage={handleSetPage} />
      case 'risk-factors':
        return <div className="section-transition min-h-screen bg-cream pt-24 pb-16">
          <div className="max-w-5xl mx-auto px-4 pt-4">
            <BackButton onClick={() => setPage('home')} label={t('back')} />
          </div>
          <RiskFactors lang={lang} t={t} setPage={handleSetPage} />
          <div className="max-w-5xl mx-auto px-4 pb-8">
            <MedicalDisclaimer lang={lang} t={t} />
          </div>
        </div>
      case 'prevention':
        return <div className="section-transition min-h-screen bg-cream pt-24 pb-16">
          <div className="max-w-5xl mx-auto px-4 pt-4">
            <BackButton onClick={() => setPage('home')} label={t('back')} />
          </div>
          <Prevention lang={lang} t={t} />
          <div className="max-w-5xl mx-auto px-4 pb-8">
            <MedicalDisclaimer lang={lang} t={t} />
          </div>
        </div>
      default:
        return <HomePage lang={lang} t={t} setPage={handleSetPage} />
    }
  }

  return (
    <div dir={dir} lang={lang} className="min-h-screen bg-cream">
      <Navbar lang={lang} setLang={setLang} setPage={handleSetPage} t={t} />
      <main>{renderPage()}</main>
      <BackToTop />
    </div>
  )
}
