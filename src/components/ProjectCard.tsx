import type { FC, KeyboardEvent } from 'react';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Code, Target, Layers, Clock, Award } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  objective: string;
  techStack: string[];
  steps: string[];
  icon: React.ReactNode;
  color: string;
  difficulty: string;
  duration: string;
}

interface ProjectCardProps {
  project: Project;
  isBonus?: boolean;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, isBonus = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-blue-500';
      case 'Intermediate': return 'bg-green-500';
      case 'Advanced': return 'bg-yellow-500';
      case 'Expert': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className={`enhanced-card ${isBonus ? 'border-2 border-red-600 shadow-red-500/20' : 'border border-gray-600'} hover:border-red-500 transition-all duration-300`}>
      <div 
        className="p-4 sm:p-6 cursor-pointer"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} details for ${project.title}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full ${project.color} flex items-center justify-center text-white shadow-lg`}>
              {project.icon}
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  {project.title}
                </h3>
                <span className={`px-2 py-1 text-xs rounded-full font-semibold ${getDifficultyColor(project.difficulty)} text-white`}>
                  {project.difficulty}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{project.duration}</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-1" />
                  <span>Project {project.id}</span>
                </div>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">Click to expand details</p>
            </div>
          </div>
          <div className="text-red-500">
            {isExpanded ? <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" /> : <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 animate-slide-up" role="region" aria-label={`Details for ${project.title}`}>
          <div className="border-t border-gray-600 pt-4 sm:pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <div className="flex items-center mb-3">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2" />
                  <h4 className="text-base sm:text-lg font-semibold">Objective</h4>
                </div>
                <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">{project.objective}</p>

                <div className="flex items-center mb-3">
                  <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2" />
                  <h4 className="text-base sm:text-lg font-semibold">Tech Stack</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-2 sm:px-3 py-1 bg-gray-700 text-red-400 text-xs sm:text-sm rounded-full border border-red-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center mb-3">
                  <Code className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2" />
                  <h4 className="text-base sm:text-lg font-semibold">Implementation Steps</h4>
                </div>
                <ol className="space-y-2">
                  {project.steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center text-xs font-semibold mr-2 sm:mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-gray-300 text-xs sm:text-sm">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;