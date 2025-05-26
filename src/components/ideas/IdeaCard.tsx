import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { IoTIdea } from '../../types';
import { Link } from 'react-router-dom';

interface IdeaCardProps {
  idea: IoTIdea;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  };

  return (
    <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={idea.imageUrl} 
          alt={idea.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${difficultyColor[idea.difficulty]}`}>
            {idea.difficulty.charAt(0).toUpperCase() + idea.difficulty.slice(1)}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full">
            {idea.category}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {idea.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {idea.description}
        </p>
        
        <div className="flex justify-between items-center">
          <Link 
            to={`/ideas/${idea.id}`}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm inline-flex items-center group"
          >
            View Details
            <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <button className="text-gray-400 hover:text-yellow-500 dark:text-gray-500 dark:hover:text-yellow-400 transition-colors">
            <Star className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;