import { useState } from 'react';
import type { FC } from 'react';
import { Code, Server, Zap, Package, Award, TrendingUp } from 'lucide-react';
import ProjectCard from './ProjectCard';

const Projects: FC = () => {
  const projects = [
    {
      id: 1,
      title: "Flask Web Application with CI/CD",
      objective: "Build and deploy a Python Flask application with automated testing and deployment pipeline",
      techStack: ["Python Flask", "Docker", "Jenkins", "GitHub", "AWS EC2"],
      steps: [
        "Create a Flask web application with multiple routes",
        "Write unit tests using pytest framework",
        "Set up Docker containerization",
        "Configure Jenkins CI/CD pipeline",
        "Deploy to AWS EC2 with automated rollback"
      ],
      icon: <Code className="w-8 h-8" />,
      color: "bg-blue-500",
      difficulty: "Beginner",
      duration: "29 June 2025 from 3 pm to 7pm (4hrs)"
    },
    {
      id: 2,
      title: "Containerized Microservices Architecture",
      objective: "Design and implement a microservices architecture using Docker containers",
      techStack: ["Docker", "Docker Compose", "Flask", "Redis", "PostgreSQL"],
      steps: [
        "Break monolithic app into microservices",
        "Create Docker images for each service",
        "Set up inter-service communication",
        "Implement Redis for caching",
        "Configure PostgreSQL database",
        "Use Docker Compose for orchestration"
      ],
      icon: <Package className="w-8 h-8" />,
      color: "bg-green-500",
      difficulty: "Intermediate",
      duration: "6th July 2025 from 3 pm to 7pm (4hrs)"
    },
    {
      id: 3,
      title: "Kubernetes Cluster Management",
      objective: "Deploy and manage applications on Kubernetes with auto-scaling and load balancing",
      techStack: ["Kubernetes", "kubectl", "YAML", "AWS EKS", "Helm"],
      steps: [
        "Set up Kubernetes cluster on AWS EKS",
        "Create deployment and service manifests",
        "Configure horizontal pod autoscaling",
        "Implement load balancing with ingress",
        "Set up persistent volumes",
        "Monitor cluster health and performance"
      ],
      icon: <Server className="w-8 h-8" />,
      color: "bg-yellow-500",
      difficulty: "Advanced",
      duration: "13th July 2025 from 3 pm to 7pm (4hrs)"
    },
    {
      id: 4,
      title: "Infrastructure as Code with Terraform",
      objective: "Provision and manage cloud infrastructure using Terraform automation",
      techStack: ["Terraform", "AWS", "Infrastructure as Code", "S3", "VPC"],
      steps: [
        "Design cloud architecture blueprint",
        "Write Terraform configuration files",
        "Create VPC, subnets, and security groups",
        "Provision EC2 instances and load balancers",
        "Set up S3 buckets for state management",
        "Implement infrastructure versioning"
      ],
      icon: <Code className="w-8 h-8" />,
      color: "bg-purple-500",
      difficulty: "Advanced",
      duration: "20th July 2025 from 3 pm to 7pm (4hrs)"
    },
    {
      id: 5,
      title: "Monitoring and Alerting System",
      objective: "Implement comprehensive monitoring, logging, and alerting for production systems",
      techStack: ["Prometheus", "Grafana", "ELK Stack", "AWS CloudWatch", "PagerDuty"],
      steps: [
        "Set up Prometheus for metrics collection",
        "Configure Grafana dashboards",
        "Implement ELK stack for log aggregation",
        "Create custom metrics and alerts",
        "Set up notification channels",
        "Build SLA monitoring system"
      ],
      icon: <TrendingUp className="w-8 h-8" />,
      color: "bg-red-500",
      difficulty: "Advanced",
      duration: "27th July 2025 from 3 pm to 7pm (4hrs)"
    },
    {
      id: 6,
      title: "Complete DevOps Pipeline Integration",
      objective: "Integrate all previous projects into a unified, production-ready DevOps pipeline",
      techStack: ["All Previous Technologies", "GitOps", "ArgoCD", "Security Scanning"],
      steps: [
        "Implement GitOps workflow with ArgoCD",
        "Add security scanning to pipeline",
        "Set up multi-environment deployments",
        "Configure backup and disaster recovery",
        "Implement blue-green deployment strategy",
        "Create comprehensive documentation"
      ],
      icon: <Zap className="w-8 h-8" />,
      color: "bg-indigo-500",
      difficulty: "Expert",
      duration: "3rd August 2025 from 3 pm to 7pm (4hrs)"
    },
    {
      id: 7,
      title: "ML Model Deployment Pipeline",
      objective: "Deploy a machine learning model with complete MLOps pipeline including monitoring and A/B testing",
      techStack: ["Python", "Flask", "Streamlit", "Docker", "Jenkins", "AWS EKS", "Prometheus", "Terraform"],
      steps: [
        "Prepare and validate ML model (.pkl file)",
        "Create Flask API for model serving",
        "Build Streamlit interface for testing",
        "Containerize application with Docker",
        "Set up Jenkins pipeline for ML deployments",
        "Deploy to AWS EKS with auto-scaling",
        "Implement model monitoring with Prometheus",
        "Create infrastructure with Terraform",
        "Set up A/B testing framework",
        "Monitor model drift and performance"
      ],
      icon: <Award className="w-8 h-8" />,
      color: "bg-pink-500",
      difficulty: "Expert",
      duration: "10th August 2025 from 3 pm to 7pm (4hrs)"
    }
  ];

  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const difficulties = [
    { value: 'all', label: 'All Projects', color: 'bg-gray-600' },
    { value: 'Beginner', label: 'Beginner', color: 'bg-blue-500' },
    { value: 'Intermediate', label: 'Intermediate', color: 'bg-green-500' },
    { value: 'Advanced', label: 'Advanced', color: 'bg-yellow-500' },
    { value: 'Expert', label: 'Expert', color: 'bg-red-500' }
  ];

  const filteredProjects = selectedDifficulty === 'all' 
    ? projects 
    : projects.filter(project => project.difficulty === selectedDifficulty);

  return (
    <section id="projects" className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="responsive-text font-bold mb-6">
            Project <span className="gradient-text">Highlights</span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-8"></div>
          <p className="mobile-friendly text-gray-300 max-w-4xl mx-auto">
            Each project builds upon the previous one, creating a comprehensive learning experience 
            that mirrors real-world DevOps scenarios and challenges. From beginner to expert level.
          </p>
        </div>

        {/* Difficulty Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty.value}
              onClick={() => setSelectedDifficulty(difficulty.value)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedDifficulty === difficulty.value
                  ? `${difficulty.color} text-white shadow-lg`
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
              }`}
            >
              {difficulty.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {filteredProjects.map((project, index) => (
            <div key={project.id} className="slide-up-animation" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProjectCard 
                project={project} 
                isBonus={project.id === 7}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;