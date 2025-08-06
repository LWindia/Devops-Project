import React from 'react';

const Career: React.FC = () => {
  const stats = [
    { value: '85%', label: 'Career Growth' },
    { value: '3x', label: 'Salary Increase' },
    { value: '95%', label: 'Job Placement' },
  ];

  return (
    <section id="career" className="section-padding bg-gray-900">
      <div className="container-custom">
        <div className="bg-gradient-to-br from-gray-800 to-black rounded-xl p-8 sm:p-12 text-center border border-gray-700 shadow-xl shadow-red-900/20">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Ready to Transform Your Career?
          </h2>
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
            Join thousands of professionals who have successfully transitioned into high-paying DevOps and Cloud Engineering roles.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item" style={{ animationDelay: `${index * 150}ms` }}>
                <p className="text-5xl sm:text-6xl font-bold text-red-500 career-stat-value">{stat.value}</p>
                <p className="text-gray-300 sm:text-lg mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Career; 