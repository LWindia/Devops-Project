import type { FC } from 'react';
import { Star, Users, BookOpen, Award } from 'lucide-react';

const Mentor: FC = () => {
  return (
    <section id="mentor" className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-16 items-center">
          {/* Image Section */}
          <div className="md:col-span-2 flex justify-center md:justify-start">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2">
                <div className="bg-red-600 text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg">
                  Your Mentor
                </div>
              </div>
              <img
                className="rounded-full w-full h-full object-cover border-4 border-red-500 shadow-2xl"
                src="/assets/vimalsir.jpeg"
                alt="Vimal Daga"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="md:col-span-3 space-y-8">
            <p className="text-gray-300 text-lg leading-relaxed">
              With over a decade of experience in transforming careers and
              building tech leaders, Mr. Vimal Daga has mentored thousands of
              professionals across the globe. His unique approach combines
              practical industry experience with innovative teaching
              methodologies.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-red-500 hover:bg-gray-800 transition-colors duration-300">
                <Users className="w-8 h-8 text-red-500 mb-3" />
                <h4 className="text-2xl font-bold">10 Lakh+</h4>
                <p className="text-gray-400">Students Mentored</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-red-500 hover:bg-gray-800 transition-colors duration-300">
                <Award className="w-8 h-8 text-red-500 mb-3" />
                <h4 className="text-2xl font-bold">23+ Years</h4>
                <p className="text-gray-400">Industry Experience</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-red-500 hover:bg-gray-800 transition-colors duration-300">
                <BookOpen className="w-8 h-8 text-red-500 mb-3" />
                <h4 className="text-2xl font-bold">153+</h4>
                <p className="text-gray-400">Tools & Technology</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-red-500 hover:bg-gray-800 transition-colors duration-300">
                <Star className="w-8 h-8 text-red-500 mb-3" />
                <h4 className="text-2xl font-bold">4.9/5</h4>
                <p className="text-gray-400">Student Rating</p>
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-red-500">
              <p className="text-gray-300 italic">
                "Technology should serve humanity, not the other way around. My
                mission is to create tech leaders who build solutions that make
                the world a better place."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mentor;