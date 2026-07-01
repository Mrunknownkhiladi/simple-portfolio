import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type ScrambleInProps = {
  text: string;
  delay: number;
  triggered: boolean;
};

type ScrambleTextProps = {
  text: string;
  isHovered: boolean;
  className?: string;
};

const characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

const scrambleValue = (text: string, revealCount: number) =>
  text
    .split('')
    .map((char, index) => {
      if (char === ' ') return ' ';
      if (index < revealCount) return char;
      if (index < revealCount + 3) {
        return characterSet[Math.floor(Math.random() * characterSet.length)];
      }
      return '';
    })
    .join('');

const ScrambleIn = ({ text, delay, triggered }: ScrambleInProps) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (!triggered) {
      setDisplayText('');
      return;
    }

    const timeoutId = window.setTimeout(() => {
      let revealCount = 0;
      const intervalId = window.setInterval(() => {
        revealCount += 0.5;
        const currentReveal = Math.floor(revealCount);
        setDisplayText(scrambleValue(text, currentReveal));

        if (currentReveal >= text.length) {
          window.clearInterval(intervalId);
          setDisplayText(text);
        }
      }, 25);

      return () => window.clearInterval(intervalId);
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [delay, text, triggered]);

  if (!triggered) {
    return <span dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />;
  }

  return <span>{displayText}</span>;
};

const ScrambleText = ({ text, isHovered, className }: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }

    let revealCount = 0;
    const intervalId = window.setInterval(() => {
      revealCount += 1;
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < revealCount) return char;
            return characterSet[Math.floor(Math.random() * characterSet.length)];
          })
          .join('')
      );

      if (revealCount >= text.length) {
        window.clearInterval(intervalId);
        setDisplayText(text);
      }
    }, 25);

    return () => window.clearInterval(intervalId);
  }, [isHovered, text]);

  return <span className={className}>{displayText}</span>;
};

const SynapseXLogo = () => (
  <svg viewBox="-50 -50 100 100" className="h-[18px] w-[18px] shrink-0" aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 1.5,23 L 1.5,33 C 1.5,38.5 6,43 11.5,43 L 16.5,43 C 22,43 26.5,38.5 26.5,33 Q 28,28 33,26.5 C 38.5,26.5 43,22 43,16.5 L 43,11.5 C 43,6 38.5,1.5 33,1.5 L 23,1.5 Q 12,12 1.5,23 Z" />
      <path d="M 1.5,23 L 1.5,33 C 1.5,38.5 6,43 11.5,43 L 16.5,43 C 22,43 26.5,38.5 26.5,33 Q 28,28 33,26.5 C 38.5,26.5 43,22 43,16.5 L 43,11.5 C 43,6 38.5,1.5 33,1.5 L 23,1.5 Q 12,12 1.5,23 Z" transform="rotate(90)" />
      <path d="M 1.5,23 L 1.5,33 C 1.5,38.5 6,43 11.5,43 L 16.5,43 C 22,43 26.5,38.5 26.5,33 Q 28,28 33,26.5 C 38.5,26.5 43,22 43,16.5 L 43,11.5 C 43,6 38.5,1.5 33,1.5 L 23,1.5 Q 12,12 1.5,23 Z" transform="rotate(180)" />
      <path d="M 1.5,23 L 1.5,33 C 1.5,38.5 6,43 11.5,43 L 16.5,43 C 22,43 26.5,38.5 26.5,33 Q 28,28 33,26.5 C 38.5,26.5 43,22 43,16.5 L 43,11.5 C 43,6 38.5,1.5 33,1.5 L 23,1.5 Q 12,12 1.5,23 Z" transform="rotate(270)" />
    </g>
  </svg>
);

const SquashHamburger = ({ open }: { open: boolean }) => (
  <div className="relative h-[12px] w-[18px] sm:h-[10px] sm:w-[15px]">
    <motion.span
      animate={open ? { rotate: 45, y: 5.5, opacity: 1 } : { rotate: 0, y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="absolute left-0 top-0 h-[1.5px] w-full rounded-full bg-white sm:h-[1.2px]"
    />
    <motion.span
      animate={open ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="absolute left-0 top-[5px] h-[1.5px] w-full origin-center rounded-full bg-white sm:top-[4px] sm:h-[1.2px]"
    />
    <motion.span
      animate={open ? { rotate: -45, y: -5.5, opacity: 1 } : { rotate: 0, y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="absolute bottom-0 left-0 h-[1.5px] w-full rounded-full bg-white sm:h-[1.2px]"
    />
  </div>
);

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const secondSectionRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setEntranceComplete(true), 800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!heroVideoRef.current) return;
    const video = heroVideoRef.current;
    video.currentTime = 0;
    video.pause();
  }, []);

  useEffect(() => {
    if (!heroVideoRef.current) return;
    const video = heroVideoRef.current;
    let lastX = 0;
    const onMouseMove = (event: MouseEvent) => {
      if (lastX === 0) {
        lastX = event.clientX;
        return;
      }
      const delta = event.clientX - lastX;
      lastX = event.clientX;
      const nextTime = Math.min(Math.max(video.currentTime + delta * 0.001 * 0.8, 0), video.duration || 0);
      video.currentTime = nextTime;
      video.pause();
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  const scrollToSection = (top: number) => {
    window.scrollTo({ top, behavior: 'smooth' });
    setMenuOpen(false);
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  const { scrollYProgress } = useScroll({
    target: secondSectionRef,
    offset: ['start end', 'end start'],
  });
  const springProgress = useSpring(scrollYProgress, { stiffness: 15, damping: 32, mass: 1.8 });
  const yScaleValue = useTransform(springProgress, [0, 1], [60, -120]);
  const opacityValue = useTransform(springProgress, [0, 0.3, 0.5, 1], [0, 1, 1, 0]);
  const cardTransform = useMotionTemplate`rotateX(24deg) translateY(${yScaleValue}px) translateZ(15px)`;

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: '"Space Mono", monospace' }}>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-x-0 top-0 z-50 h-20 px-4 sm:px-6 md:px-8"
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
          <div className="hidden items-center gap-2 md:flex">
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.22)' }}
              whileTap={{ scale: 0.98 }}
              className="flex h-12 items-center gap-3 rounded-[14px] bg-white/15 px-5 text-white backdrop-blur-md"
            >
              <SynapseXLogo />
              <span className="text-[16px] font-medium tracking-tight">Abhay</span>
            </motion.button>

            <motion.div
              layout
              animate={{ width: menuOpen ? 290 : 48 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="relative flex h-12 items-center overflow-hidden rounded-[14px] bg-white/15 backdrop-blur-md"
            >
              <button
                type="button"
                aria-label="Toggle navigation"
                onClick={() => setMenuOpen((value) => !value)}
                className={`relative z-10 flex h-12 items-center justify-center rounded-[14px] ${menuOpen ? 'ml-1.5 h-[36px] w-[36px] bg-white/10 hover:bg-white/20' : 'h-12 w-[48px]'}`}
              >
                <SquashHamburger open={menuOpen} />
              </button>

              <motion.div
                initial={false}
                animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : 15 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-y-0 left-[56px] flex items-center gap-6 pr-4"
              >
                <button
                  type="button"
                  onMouseEnter={() => setHoveredLink('about')}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={() => scrollToSection(window.innerHeight)}
                  className="text-[16px] font-normal text-white/85 transition hover:text-white"
                >
                  <ScrambleText text="About" isHovered={hoveredLink === 'about'} />
                </button>
                <button
                  type="button"
                  onMouseEnter={() => setHoveredLink('metrics')}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={() => scrollToSection(window.innerHeight * 2)}
                  className="text-[16px] font-normal text-white/85 transition hover:text-white"
                >
                  <ScrambleText text="Metrics" isHovered={hoveredLink === 'metrics'} />
                </button>
              </motion.div>
            </motion.div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <motion.button
              layout
              animate={{ width: menuOpen ? 0 : 92, opacity: menuOpen ? 0 : 1, paddingLeft: menuOpen ? 0 : 16, paddingRight: menuOpen ? 0 : 16 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="flex h-9 items-center justify-center gap-2 overflow-hidden rounded-[10px] bg-white/15 text-white backdrop-blur-md"
            >
              <SynapseXLogo />
              <span className="text-[13px] font-medium tracking-tight">Abhay</span>
            </motion.button>

            <motion.div
              layout
              animate={{ width: menuOpen ? 'calc(100vw - 7.5rem)' : 40 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="flex h-9 items-center justify-center overflow-hidden rounded-[10px] bg-white/15 backdrop-blur-md"
            >
              <button
                type="button"
                aria-label="Toggle navigation"
                onClick={() => setMenuOpen((value) => !value)}
                className="flex h-9 w-full items-center justify-center"
              >
                <SquashHamburger open={menuOpen} />
              </button>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
            whileTap={{ scale: 0.97 }}
            onMouseEnter={() => setHoveredLink('contact')}
            onMouseLeave={() => setHoveredLink(null)}
            onClick={scrollToContact}
            className="flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[14px] font-medium text-black"
          >
            <i className="bi bi-apple text-[16px]" />
            <ScrambleText text="Contact" isHovered={hoveredLink === 'contact'} className="hidden sm:inline" />
          </motion.button>
        </div>
      </motion.header>

      <main>
        <section className="relative flex min-h-[100dvh] flex-col overflow-hidden px-4 pb-8 pt-20 sm:px-6 sm:pt-24 sm:pb-12 md:px-8">
          <video
            ref={heroVideoRef}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            playsInline
            preload="metadata"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.5),_rgba(0,0,0,0.75))]" />
          <div className="pointer-events-none absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="select-none uppercase tracking-[-0.04em] text-transparent text-[clamp(120px,30vw,520px)] font-black leading-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
              ABHAY
            </div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: entranceComplete ? 1 : 0 }} transition={{ duration: 1 }} className="relative z-20 flex flex-1 flex-col">
            <div className="flex flex-1 flex-col justify-end gap-8">
              <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <div className="flex max-w-xl flex-col gap-4">
                  <h1 className="text-[clamp(40px,10vw,100px)] font-light leading-[0.95] tracking-[-0.03em] text-white">
                    <div><ScrambleIn text="I Build" delay={200} triggered={entranceComplete} /></div>
                    <div><ScrambleIn text="Digital" delay={500} triggered={entranceComplete} /></div>
                  </h1>
                  <motion.p initial={{ opacity: 0, y: 25 }} animate={{ opacity: entranceComplete ? 1 : 0, y: entranceComplete ? 0 : 25 }} transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1], delay: 0.2 }} className="max-w-sm text-[13px] leading-relaxed text-white/60 sm:text-[15px]">
                    I’m Abhay Raj Tyagi, a BCA IoT student and aspiring web developer from Gorakhpur. I create modern web experiences rooted in design, curiosity, and hands-on learning.
                  </motion.p>
                </div>

                <div className="flex max-w-xl flex-col gap-4 md:text-right">
                  <h1 className="text-[clamp(40px,10vw,100px)] font-light leading-[0.95] tracking-[-0.03em] text-white">
                    <div><ScrambleIn text="Human" delay={700} triggered={entranceComplete} /></div>
                    <div><ScrambleIn text="Experiences" delay={1000} triggered={entranceComplete} /></div>
                  </h1>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section ref={secondSectionRef} className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6 py-24 sm:px-12 lg:px-20">
          <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline>
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 z-10 h-[180px] bg-gradient-to-b from-[#010103] to-transparent" />
          <div className="relative z-20 mx-auto flex max-w-5xl items-center justify-center px-2 sm:px-6">
            <motion.p
              style={{ opacity: opacityValue, rotateX: 24, transform: cardTransform }}
              className="select-none px-6 text-center text-[22px] font-normal leading-[1.35] tracking-[-0.02em] text-white sm:px-12 sm:text-[30px] md:text-[36px] lg:text-[42px]"
            >
              I’m passionate about building polished digital experiences that blend creativity with technology. My work is shaped by curiosity, practical learning, and a strong interest in web development, UI design, and IoT concepts.
            </motion.p>
          </div>
        </section>

        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-32 sm:px-8 md:px-12">
          <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline>
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4" type="video/mp4" />
          </video>
          <div className="relative z-20 w-full max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.2 }} className="mb-16 text-center">
              <p className="mb-6 text-[13px] uppercase tracking-[0.2em] text-white/40 sm:text-[14px]">About Me</p>
              <h2 className="mb-6 text-[clamp(28px,6vw,48px)] font-light leading-[1.15] tracking-[-0.02em] text-white">A student, designer, and builder with a strong learning curve.</h2>
              <p className="mx-auto max-w-3xl text-[15px] leading-relaxed text-white/60 sm:text-[17px]">I’m Abhay Raj Tyagi, a BCA IoT student from Gorakhpur who enjoys creating modern web experiences, learning new tools, and turning ideas into simple but impactful digital work.</p>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.8 }} className="rounded-2xl border border-white/10 bg-black/30 p-8 backdrop-blur-sm">
                <h3 className="text-[20px] font-normal text-white">My story</h3>
                <p className="mt-4 text-[14px] leading-relaxed text-white/65 sm:text-[15px]">I began with curiosity about technology and design, and gradually developed a strong interest in web designing, frontend development, and IoT-based concepts. I enjoy building websites that feel modern, clean, and meaningful.</p>
                <div className="mt-6 space-y-3 text-[13px] leading-relaxed text-white/60 sm:text-[14px]">
                  <div>• BCA in IoT at Deen Dayal Upadhyaya Gorakhpur University</div>
                  <div>• Diploma in Mechanical Engineering background</div>
                  <div>• Focused on portfolio websites, landing pages, and interactive UI work</div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.8, delay: 0.15 }} className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <h3 className="text-[20px] font-normal text-white">Quick facts</h3>
                <div className="mt-6 grid gap-4">
                  {[
                    ['Location', 'Gorakhpur, Uttar Pradesh'],
                    ['Field', 'Web Designing & Frontend learning'],
                    ['Interest', 'IoT projects and smart systems'],
                    ['Goal', 'Create polished digital experiences'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-lg border border-white/10 bg-black/20 p-3">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-white/35">{label}</div>
                      <div className="mt-1 text-[14px] text-white">{value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="relative flex min-h-[100dvh] flex-col overflow-hidden px-8 py-12 sm:px-12 sm:py-16 md:px-16">
          <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline>
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4" type="video/mp4" />
          </video>
          <div className="relative z-20 flex h-full flex-col">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1 }} className="max-w-xl">
                <h2 className="text-[clamp(36px,8vw,72px)] font-light leading-[0.95] tracking-[-0.03em] text-white">Experience & Projects</h2>
              </motion.div>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, delay: 0.2 }} className="max-w-xs text-[13px] leading-relaxed text-white/50 sm:text-[15px] md:pt-2 md:text-right">
                My work focuses on building polished interface concepts, thoughtful frontend experiences, and IoT-inspired ideas with a practical approach.
              </motion.p>
            </div>

            <div className="flex-1" />

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, delay: 0.3 }} className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 md:gap-6">
              {[
                ['Portfolio Website', 'Built a personal portfolio experience with strong visual identity and smooth interaction.'],
                ['Landing Pages', 'Created modern one-page experiences with clean structure and clear storytelling.'],
                ['Contact Forms', 'Added interactive contact flows with validation and fallback messaging.'],
                ['IoT Concepts', 'Explored smart system ideas such as obstacle detection and smart lock concepts.'],
              ].map(([title, desc], index) => (
                <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: index * 0.1 }} className="rounded-lg border border-white/10 bg-black/25 p-6 backdrop-blur-sm">
                  <div className="mb-2 text-[16px] font-normal text-white">{title}</div>
                  <div className="text-[13px] leading-relaxed text-white/40 sm:text-[14px]">{desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-black px-6 py-32 sm:px-8 md:px-12">
          <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1 }}>
              <p className="mb-8 text-[13px] uppercase tracking-[0.2em] text-white/40 sm:text-[14px]">Education & Skills</p>
              <h2 className="mb-10 text-[clamp(28px,6vw,56px)] font-light leading-[1.15] tracking-[-0.02em] text-white">Education, skills, and steady growth.</h2>
              <p className="mx-auto max-w-2xl text-[15px] leading-relaxed text-white/45 sm:text-[17px]">My education and hands-on practice continue to shape the way I build websites, design interfaces, and explore new ideas in tech.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1.2, delay: 0.4 }} className="mt-16 grid w-full gap-8 lg:grid-cols-[1fr_1fr]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-left">
                <h3 className="text-[18px] font-normal text-white">Education</h3>
                <div className="mt-6 space-y-4 text-[14px] leading-relaxed text-white/60">
                  <div>
                    <div className="text-white">BCA in IoT</div>
                    <div>Deen Dayal Upadhyaya Gorakhpur University</div>
                  </div>
                  <div>
                    <div className="text-white">Diploma in Mechanical Engineering</div>
                    <div>Government Polytechnic Sirsi</div>
                  </div>
                  <div>
                    <div className="text-white">Intermediate and High School</div>
                    <div>Completed through local academic institutions</div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-left">
                <h3 className="text-[18px] font-normal text-white">Skills</h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind', 'C / C++', 'UI Design', 'Problem Solving'].map((skill) => (
                    <div key={skill} className="rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-[14px] text-white/80">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer ref={contactRef} className="overflow-hidden bg-black">
        <div className="flex min-h-[400px] flex-col md:flex-row">
          <video className="h-[300px] w-full object-cover md:h-auto md:w-1/2" autoPlay muted loop playsInline>
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4" type="video/mp4" />
          </video>
          <div className="flex w-full flex-col justify-between p-10 sm:p-16 md:w-1/2">
            <div>
              <div className="mb-8 flex items-center gap-3 text-white/70">
                <SynapseXLogo />
                <span className="text-[15px] font-medium tracking-tight">Abhay Raj Tyagi</span>
              </div>
              <p className="max-w-sm text-[14px] leading-relaxed text-white/40 sm:text-[15px]">Focused on making modern digital ideas feel clear, expressive, and unforgettable. Reach out for web design, frontend work, or creative collaboration.</p>
              <div className="mt-6 space-y-2 text-[13px] text-white/45 sm:text-[14px]">
                <div>Email: abhayrajtyagi207@gmail.com</div>
                <div>Phone: +91 7267015041</div>
                <div>Location: Gorakhpur, Uttar Pradesh</div>
              </div>
            </div>
            <p className="mt-12 text-[12px] text-white/25">(c) 2026 Abhay Raj Tyagi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
