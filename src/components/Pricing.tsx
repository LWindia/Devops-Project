import type { FC } from 'react';
import { Check, Clock, Phone, Mail, Zap, Award, BookOpen, Users2, ArrowRight, Target, TrendingUp } from 'lucide-react';

const Pricing: FC = () => {
  // Separate function for individual project
  const handleIndividualProject = () => {
    try {
      const paymentUrl = 'https://rzp.io/rzp/qvXdBmUD'; // Individual project payment URL
      const newWindow = window.open(paymentUrl, '_blank');
      
      if (!newWindow) {
        window.location.href = paymentUrl;
      }
    } catch (error) {
      console.error('Error opening individual project payment link:', error);
      window.location.href = 'https://rzp.io/rzp/qvXdBmUD ';
    }
  };

  // Separate function for complete series
  const handleCompleteSeries = () => {
    try {
      const paymentUrl = 'https://rzp.io/rzp/bwEIjuL'; // Complete series payment URL
      const newWindow = window.open(paymentUrl, '_blank');
      
      if (!newWindow) {
        window.location.href = paymentUrl;
      }
    } catch (error) {
      console.error('Error opening complete series payment link:', error);
      window.location.href = 'https://rzp.io/rzp/bwEIjuL';
    }
  };

  const features = [
    "7 Complete DevOps Projects",
    "1-on-1 Mentorship with Vimal Daga Sir",
    "Live Interactive Sessions",
    "Expert Mentorship",
    "Industry-Standard Tools & Technologies",
    "Career Guidance & Job Placement Support",
    "Lifetime Access to Course Materials",
    "GitHub Portfolio Setup",
    "Real-World Project Experience",
    "Certificate of Completion"
  ];

  const individualFeatures = [
    "1 Complete DevOps Project",
    "Project-specific mentorship",
    "Live Q&A Sessions",
    "Expert Mentorship",
    "Project Documentation",
    "Certificate of Completion"
  ];

  const learningPath = [
    { step: 1, title: "Foundation", icon: <Target className="w-6 h-6" />, color: "bg-blue-500" },
    { step: 2, title: "Development", icon: <BookOpen className="w-6 h-6" />, color: "bg-green-500" },
    { step: 3, title: "Deployment", icon: <Zap className="w-6 h-6" />, color: "bg-yellow-500" },
    { step: 4, title: "Monitoring", icon: <TrendingUp className="w-6 h-6" />, color: "bg-purple-500" },
    { step: 5, title: "Advanced", icon: <Award className="w-6 h-6" />, color: "bg-red-500" },
  ];

  return (
    <section id="pricing" className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container-custom">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="responsive-text font-bold mb-4 sm:mb-6">
            <span className="gradient-text">Choose Your Project Path</span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-6 sm:mb-8"></div>
          <p className="mobile-friendly text-gray-300 max-w-3xl mx-auto">
            Start with a single project or dive deep into the complete DevOps journey. 
            Choose the option that fits your learning goals and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Individual Project Option */}
          <div className="enhanced-card border-2 border-gray-600 hover:border-red-500 transition-all duration-300 flex flex-col h-full">
            <div className="bg-gradient-to-r from-gray-700 to-gray-600 text-white text-center py-6">
              <div className="flex items-center justify-center">
                <BookOpen className="w-6 h-6 mr-3" />
                <span className="font-semibold text-lg">Individual Project</span>
              </div>
            </div>

            <div className="p-8 flex flex-col flex-grow h-full">
              {/* Pricing */}
              <div className="text-center mb-8">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  ₹1,000 <span className="text-lg text-gray-400">+ taxes</span>
                </div>
                <p className="text-gray-400 text-lg">Perfect for beginners</p>
              </div>

              {/* Learning Path */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4 text-center">Learning Path</h4>
                <div className="flex items-center justify-center space-x-3 mb-3">
                  {learningPath.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-white text-lg font-bold shadow-lg`}>
                        {item.step}
                      </div>
                      {index < 2 && <ArrowRight className="w-5 h-5 text-gray-400 mx-2" />}
                    </div>
                  ))}
                </div>
                <p className="text-center text-gray-400 text-sm">
                  Foundation → Development → Deployment
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8 flex-grow">
                {individualFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button - Updated to use handleIndividualProject */}
              <button 
                onClick={handleIndividualProject}
                className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
              >
                <BookOpen className="w-5 h-5 inline mr-2" />
                Start with One Project
              </button>
            </div>
          </div>

          {/* Complete Series Option */}
          <div className="enhanced-card border-2 border-red-600 shadow-red-500/20 relative overflow-hidden flex flex-col h-full">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white text-center py-6">
              <div className="flex items-center justify-center">
                <Award className="w-6 h-6 mr-3" />
                <span className="font-semibold text-lg">Complete DevOps Series</span>
              </div>
            </div>

            <div className="p-8 flex flex-col flex-grow h-full">
              {/* Pricing */}
              <div className="text-center mb-8">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  ₹3,500 <span className="text-lg text-gray-300">+ taxes</span>
                </div>
                <p className="text-red-300 text-lg font-semibold">Best Value - Save 50%</p>
              </div>

              {/* Complete Learning Path */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4 text-center">Complete Learning Journey</h4>
                <div className="flex items-center justify-center space-x-2 mb-3">
                  {learningPath.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
                        {item.step}
                      </div>
                      {index < 4 && <ArrowRight className="w-4 h-4 text-gray-400 mx-1" />}
                    </div>
                  ))}
                </div>
                <p className="text-center text-gray-400 text-sm">
                  Foundation → Development → Deployment → Monitoring → Advanced
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8 flex-grow">
                {features.slice(0, 6).map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button - Updated to use handleCompleteSeries */}
              <button 
                onClick={handleCompleteSeries}
                className="w-full btn-primary glow-animation text-lg py-4"
              >
                <Zap className="w-5 h-5 inline mr-2" />
                Get Complete Series
              </button>
            </div>
          </div>
        </div>

        {/* Course Duration Info */}
        <div className="mt-12 text-center">
          <div className="bg-gray-800 p-6 rounded-lg border border-red-500/20 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 text-red-500 mr-2" />
              <span className="font-semibold text-white">Course Duration</span>
            </div>
            <p className="text-gray-300">Every Sunday for 1 month</p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <div className="responsive-grid max-w-4xl mx-auto">
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
              <div className="flex items-center justify-center text-gray-300 mb-2">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2" />
                <span className="text-sm sm:text-base">support@lwindia.com</span>
              </div>
            </div>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
              <div className="flex items-center justify-center text-gray-300 mb-2">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2" />
                <span className="text-sm sm:text-base">+91 9772201449</span>
              </div>
            </div>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
              <div className="flex items-center justify-center text-gray-300">
                <Users2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2" />
                <span className="text-sm sm:text-base">Limited Seats</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;