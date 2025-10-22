import React, { useState, useEffect } from 'react';

export default function BlogDigestLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    // Generate random particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 4,
      size: 2 + Math.random() * 4
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="relative w-screen h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 overflow-hidden">
      {/* Animated particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-emerald-400 animate-float opacity-0"
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* Logo Symbol */}
        <div 
          className={`mb-8 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
          }`}
        >
          <div className="relative w-32 h-32">
            {/* Document icon with animation */}
            <div className="absolute inset-0 border-4 border-emerald-400 rounded-lg animate-pulse-slow">
              <div className="absolute top-4 left-4 right-4 h-1 bg-emerald-300 rounded animate-slide-right" style={{ animationDelay: '0.2s' }} />
              <div className="absolute top-8 left-4 right-4 h-1 bg-emerald-300 rounded animate-slide-right" style={{ animationDelay: '0.4s' }} />
              <div className="absolute top-12 left-4 right-6 h-1 bg-emerald-300 rounded animate-slide-right" style={{ animationDelay: '0.6s' }} />
            </div>
            
            {/* Arrow down */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
              <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            
            {/* Summary circle */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center animate-scale-in" style={{ animationDelay: '0.8s' }}>
              <svg className="w-6 h-6 text-emerald-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <h1 
          className={`text-6xl md:text-8xl font-bold text-emerald-400 mb-4 transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
          style={{ textShadow: '0 0 40px rgba(74, 222, 128, 0.3)' }}
        >
          BlogDigest
        </h1>

        {/* Tagline */}
        <p 
          className={`text-xl md:text-2xl text-emerald-300 mb-12 transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          Summarize blogs instantly
        </p>

        {/* CTA Button */}
        <button 
          className={`group relative px-8 py-4 bg-emerald-500 text-emerald-950 font-semibold rounded-full text-lg overflow-hidden transform transition-all duration-1000 delay-700 hover:scale-110 hover:bg-emerald-400 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <span className="relative z-10">Get Started</span>
          <div className="absolute inset-0 bg-emerald-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
        </button>

        {/* Floating feature cards */}
        <div className={`absolute bottom-10 left-10 bg-emerald-900/50 backdrop-blur-sm p-4 rounded-lg border border-emerald-400/30 transform transition-all duration-1000 delay-1000 ${
          isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
        }`}>
          <p className="text-emerald-300 text-sm">⚡ Lightning Fast</p>
        </div>

        <div className={`absolute bottom-10 right-10 bg-emerald-900/50 backdrop-blur-sm p-4 rounded-lg border border-emerald-400/30 transform transition-all duration-1000 delay-1200 ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
        }`}>
          <p className="text-emerald-300 text-sm">🤖 AI-Powered</p>
        </div>

        <div className={`absolute top-20 right-20 bg-emerald-900/50 backdrop-blur-sm p-4 rounded-lg border border-emerald-400/30 transform transition-all duration-1000 delay-1400 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
        }`}>
          <p className="text-emerald-300 text-sm">📝 Perfect Summaries</p>
        </div>
      </div>

      {/* Custom animations styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(100vh);
            opacity: 0;
          }
          10%, 90% {
            opacity: 0.6;
          }
          50% {
            transform: translateY(-10vh);
            opacity: 0.8;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes slide-right {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes scale-in {
          0% {
            transform: translate(-50%, 0) scale(0);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, 0) scale(1);
            opacity: 1;
          }
        }

        .animate-float {
          animation: float 8s infinite ease-in-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s infinite ease-in-out;
        }

        .animate-slide-right {
          animation: slide-right 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}