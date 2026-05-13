import React, { useState, useEffect } from 'react'

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      {/* Inject keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.5), 0 0 0 0 rgba(239, 68, 68, 0.3); }
          70% { box-shadow: 0 0 0 10px rgba(168, 85, 247, 0), 0 0 0 14px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0), 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        .scroll-btn {
          animation: float 3s ease-in-out infinite, pulse-ring 2.5s ease-out infinite;
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .scroll-btn:hover {
          animation: none;
          transform: scale(1.15) translateY(-3px) !important;
          box-shadow: 0 0 24px rgba(168, 85, 247, 0.7), 0 0 48px rgba(239, 68, 68, 0.3) !important;
        }
      `}</style>

      <button
        onClick={scrollUp}
        aria-label="Scroll to top"
        className='scroll-btn'
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 9999,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.15)',
          background: 'linear-gradient(135deg, #ef4444, #a855f7)',
          backdropFilter: 'blur(12px)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? 'auto' : 'none',
        }}
      >
        {/* Arrow SVG */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </>
  )
}

export default ScrollToTop