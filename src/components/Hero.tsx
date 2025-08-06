import type { FC } from 'react';
import { Play, Code, Cloud, Package, GitBranch, Server, Database, ArrowRight } from 'lucide-react';
import { Link } from 'react-scroll';

const Hero: FC = () => {
  const handleBookNow = () => {
    try {
      const paymentUrl = 'https://rzp.io/rzp/Edf24fu';
      const newWindow = window.open(paymentUrl, '_blank');
      
      if (!newWindow) {
        // Fallback if popup is blocked
        window.location.href = paymentUrl;
      }
    } catch (error) {
      console.error('Error opening payment link:', error);
      // Fallback to direct navigation
      window.location.href = 'https://rzp.io/rzp/Edf24fu';
    }
  };

  const backgroundIcons = [
    { icon: Package, size: 'w-12 h-12', color: 'text-blue-400', top: '15%', left: '10%', floatDuration: '12s', delay: '0s' },
    { icon: GitBranch, size: 'w-16 h-16', color: 'text-orange-400', top: '25%', left: '80%', floatDuration: '10s', delay: '1s' },
    { icon: Server, size: 'w-20 h-20', color: 'text-blue-500', top: '70%', left: '20%', floatDuration: '15s', delay: '2s' },
    { icon: Cloud, size: 'w-12 h-12', color: 'text-yellow-300', top: '80%', left: '85%', floatDuration: '11s', delay: '3s' },
    { icon: Database, size: 'w-10 h-10', color: 'text-red-400', top: '50%', left: '5%', floatDuration: '13s', delay: '4s' },
    { icon: Code, size: 'w-14 h-14', color: 'text-purple-400', top: '45%', left: '90%', floatDuration: '9s', delay: '5s' },
  ];

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden text-center">
      <div className="absolute inset-0 bg-dark-900"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-transparent to-gray-900 opacity-50"></div>
      
      {/* Glowing DevOps Icons */}
      {backgroundIcons.map((item, index) => (
        <div
          key={index}
          className="absolute subtle-float-animation"
          style={{
            top: item.top,
            left: item.left,
            animationDuration: item.floatDuration,
            animationDelay: item.delay,
          }}
        >
          <item.icon
            className={`${item.size} ${item.color} glowing-icon`}
            style={{
              animationDelay: item.delay,
            }}
          />
        </div>
      ))}

      {/* Enhanced animated background elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-red-600/10 rounded-full animate-pulse glow-animation opacity-30"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-red-500/5 rounded-full animate-pulse delay-1000 opacity-30"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-red-600/8 rounded-full animate-pulse delay-500"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-red-700/6 rounded-full animate-pulse delay-1500"></div>
      <div className="absolute top-3/4 left-1/3 w-12 h-12 bg-blue-600/8 rounded-full animate-pulse delay-2000"></div>

      <div className="container-custom section-padding relative z-10">
        <div className="animate-fade-in">
          {/* Main Title Section */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
              {/* Mobile: Stack with spacing, Desktop: Keep inline */}
              <span className="block sm:inline">
                The{' '}
                <span className="relative inline-block">
                  <span className="absolute -inset-2 bg-red-600 blur-2xl opacity-80"></span>
                  <span className="relative text-white bg-red-600 px-4 py-2 rounded-lg">
                    DevOps<br/>
                    
                  </span>
                </span>
              </span>
              <span className="block sm:inline sm:ml-2 mt-2 sm:mt-0">Project Series</span>
            </h1>
            
            <p className="text-md sm:text-lg md:text-xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
              Learn DevOps + Cloud the Real Way – Through{' '}
              <span className="text-red-500 font-semibold">7 Full-Scale Projects</span>
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center">
            <button 
              onClick={handleBookNow}
              className="btn-primary-glow w-full sm:w-auto text-lg"
            >
              Book Now <ArrowRight className="w-5 h-5 inline ml-2" />
            </button>
            
            <Link
              to="about"
              smooth={true}
              duration={500}
              spy={true}
              offset={-70}
              className="btn-secondary-outline w-full sm:w-auto text-lg"
            >
              <Play className="w-5 h-5 inline mr-2" />
              Learn More
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <Link to="about" smooth={true} duration={500}>
          <div className="scroll-indicator"></div>
        </Link>
      </div>
    </section>
  );
};

export default Hero;