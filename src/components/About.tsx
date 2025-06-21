import type { FC } from 'react';
import { Server, Database, Monitor, Zap, Target, Users, Award, TrendingUp } from 'lucide-react';

const About: FC = () => {
  const outcomes = [
    {
      icon: <Server className="w-6 h-6" />,
      text: "Build 7 real-world DevOps + Cloud projects",
      description: "From simple web apps to complex microservices"
    },
    {
      icon: <Database className="w-6 h-6" />,
      text: "Simulate 1-year job experience",
      description: "Real-world scenarios and industry practices"
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      text: "Learn to deploy, monitor, and scale on AWS",
      description: "Cloud-native development and operations"
    }
  ];

  const stats = [
    { number: "7", label: "Real Projects", icon: <Target className="w-6 h-6" /> },
    { number: "30+", label: "Hours Content", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "100%", label: "Hands-on", icon: <Zap className="w-6 h-6" /> },
    { number: "24/7", label: "Support", icon: <Users className="w-6 h-6" /> }
  ];

  return (
    <section id="about" className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="responsive-text font-bold mb-6">
            About <span className="gradient-text">The Project Series</span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-8"></div>
          <p className="mobile-friendly text-gray-300 max-w-3xl mx-auto">
            Transform your career with hands-on DevOps experience. Learn by doing, not just watching.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-gray-800/50 p-6 rounded-lg text-center border border-gray-700 hover:border-red-500 transition-all duration-300 hover:scale-105"
            >
              <div className="text-red-500 mb-3 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="slide-up-animation">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
              Why Choose <span className="text-gradient-red">The Project Web Series?</span>
            </h3>
            <p className="mobile-friendly text-gray-300 leading-relaxed mb-8">
              This isn't your typical DevOps course. We believe in learning by doing. 
              Through 7 comprehensive projects, you'll build production-ready applications 
              and infrastructure that mirror real-world scenarios. Each project is designed 
              to challenge you and build upon previous knowledge, creating a complete 
              DevOps and Cloud ecosystem.
            </p>
            
            <div className="space-y-4">
              {outcomes.map((outcome, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-lg card-hover border border-gray-700 hover:border-red-500 transition-all duration-300"
                >
                  <div className="text-red-500 mt-1">
                    {outcome.icon}
                  </div>
                  <div>
                    <div className="text-gray-200 font-semibold mb-1">{outcome.text}</div>
                    <div className="text-gray-400 text-sm">{outcome.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="slide-up-animation space-y-6">
            <div className="p-6 bg-gradient-to-r from-red-600/10 to-red-700/10 border border-red-500/20 rounded-lg neon-glow">
              <div className="flex items-center mb-3">
                <Zap className="w-6 h-6 text-red-500 mr-3" />
                <h4 className="text-xl font-semibold text-white">Hands-On Learning</h4>
              </div>
              <p className="text-gray-300">
                Every concept is taught through practical implementation. 
                No theory-heavy sessions – just pure, hands-on experience 
                that prepares you for real-world challenges.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-r from-blue-600/10 to-blue-700/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center mb-3">
                <Award className="w-6 h-6 text-blue-500 mr-3" />
                <h4 className="text-xl font-semibold text-white">Industry Ready</h4>
              </div>
              <p className="text-gray-300">
                Get the skills that employers are looking for. Our curriculum 
                is designed based on real industry requirements and best practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;