'use client'

import { useEffect, useState } from 'react'

export default function Loader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Play pour sound
    playPourSound()

    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  const playPourSound = () => {
    // Create a simple pour sound using Web Audio API
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gain = audioContext.createGain()

      oscillator.connect(gain)
      gain.connect(audioContext.destination)

      // Pour effect: descending frequency
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.5)

      gain.gain.setValueAtTime(0.1, audioContext.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    } catch (e) {
      // Audio API not available
    }
  }

  if (!loading) return null

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-red-50 to-pink-50 flex flex-col items-center justify-center z-[9999] overflow-hidden">
      {/* Background Animated Gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Bottle with Reflection */}
        <div className="relative w-32 h-48 mb-8" style={{ perspective: '1000px' }}>
          {/* Reflection Shadow */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-28 h-8 bg-black opacity-10 rounded-full blur-lg animate-pulse"></div>

          {/* Main Bottle */}
          <div className="relative w-full h-full">
            {/* Glass Reflection Effect */}
            <div className="absolute inset-0 rounded-b-3xl border-4 border-red-500 overflow-hidden bg-gradient-to-br from-red-50 to-transparent shadow-2xl">
              {/* Liquid Fill with Wave Animation */}
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-red-600 via-pink-500 to-red-400 animate-fill">
                {/* Wave Effect */}
                <svg
                  className="absolute top-0 w-full h-2"
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
                  style={{
                    animation: 'wave 3s linear infinite',
                  }}
                >
                  <path
                    d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
                    fill="rgba(220,38,38,0.3)"
                  ></path>
                </svg>
                <svg
                  className="absolute top-1 w-full h-2"
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
                  style={{
                    animation: 'wave 3s linear infinite -1s',
                  }}
                >
                  <path
                    d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
                    fill="rgba(244,63,94,0.2)"
                  ></path>
                </svg>
              </div>

              {/* Glass Shine/Reflection */}
              <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-white to-transparent opacity-20 rounded-b-3xl"></div>
            </div>

            {/* Bubbles */}
            <span className="bubble left-4"></span>
            <span className="bubble left-8"></span>
            <span className="bubble left-12"></span>
            <span className="bubble left-6"></span>
          </div>
        </div>

        {/* Branding Text */}
        <p className="text-2xl font-bold text-red-600 animate-pulse text-center mb-2">
          राजशाही शर्बत
        </p>

        <p className="text-gray-600 text-sm mb-6 animate-pulse">
          Ready to Serve... ✨
        </p>

        {/* Loading Bar */}
        <div className="w-32 h-1 bg-gray-300 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-red-600 via-pink-500 to-red-600 animate-load-bar"></div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fill {
          from {
            height: 0%;
          }
          to {
            height: 100%;
          }
        }

        @keyframes wave {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(1200px);
          }
        }

        @keyframes load-bar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .bubble {
          position: absolute;
          bottom: 0;
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          opacity: 0.7;
          animation: bubbleUp 2s infinite ease-in;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .bubble:nth-child(1) {
          animation-delay: 0s;
        }

        .bubble:nth-child(2) {
          animation-delay: 0.5s;
          left: 8px !important;
        }

        .bubble:nth-child(3) {
          animation-delay: 1s;
          left: 16px !important;
        }

        .bubble:nth-child(4) {
          animation-delay: 0.75s;
          left: 12px !important;
        }

        @keyframes bubbleUp {
          0% {
            transform: translateY(0);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-60px);
            opacity: 0.5;
          }
          100% {
            transform: translateY(-150px);
            opacity: 0;
          }
        }

        .animate-fill {
          animation: fill 2.5s ease-in-out forwards;
        }

        .animate-load-bar {
          animation: load-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}