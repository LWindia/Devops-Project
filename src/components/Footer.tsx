import type { FC } from 'react';
import { Mail, Phone, Heart, Code } from 'lucide-react';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 border-t border-primary-red/20">
      <div className="container-custom">
        <div className="py-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Brand Section */}
            <div>
              <div className="flex items-center mb-6">
                <Code className="w-8 h-8 text-primary-red mr-3" />
                <h3 className="text-2xl font-bold text-white">The Project Web Series</h3>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Master DevOps and Cloud technologies through hands-on projects. 
                Transform your career with industry-standard tools and expert mentorship.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Contact</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-primary-red mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400">Email</p>
                    <a 
                      href="mailto:support@lwindia.com" 
                      className="text-white hover:text-primary-red transition-colors duration-300"
                    >
                      support@lwindia.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-primary-red mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400">WhatsApp</p>
                    <a 
                      href="https://wa.me/919772201449" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-primary-red transition-colors duration-300"
                    >
                      +91 9772201449
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-gray-400 mb-4 md:mb-0">
              <span>© {currentYear} The Project Web Series. Made with </span>
              <Heart className="w-4 h-4 text-primary-red mx-1" />
              <span> for aspiring DevOps engineers.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;