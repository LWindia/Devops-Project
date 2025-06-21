// Configuration file for The Project Web Series
// Update these values with your actual information

export const config = {
  // Payment and booking
  paymentUrl: 'https://rzp.io/rzp/Edf24fu', // Replace with actual payment link
  
  // Contact information
  contact: {
    email: 'support@lwindia.com',
    phone: '+91 9772201449',
    whatsapp: '919772201449',
    location: 'India'
  },
  
  // Social media links
  social: {
    github: 'https://github.com', // Replace with actual GitHub profile
    linkedin: 'https://linkedin.com', // Replace with actual LinkedIn profile
    twitter: 'https://twitter.com' // Replace with actual Twitter profile
  },
  
  // Course information
  course: {
    title: 'The Project Web Series',
    subtitle: 'Learn DevOps + Cloud the Real Way',
    duration: 'Every Sunday for 1 month',
    projects: 7,
    mentor: 'Vimal Daga Sir'
  }
};

// Helper function to validate configuration
export const validateConfig = () => {
  const issues: string[] = [];
  
  if (config.paymentUrl.includes('yourpaymentlink')) {
    issues.push('Payment URL needs to be updated with actual Razorpay link');
  }
  
  if (config.social.github === 'https://github.com') {
    issues.push('GitHub profile link needs to be updated');
  }
  
  if (config.social.linkedin === 'https://linkedin.com') {
    issues.push('LinkedIn profile link needs to be updated');
  }
  
  if (config.social.twitter === 'https://twitter.com') {
    issues.push('Twitter profile link needs to be updated');
  }
  
  return issues;
}; 