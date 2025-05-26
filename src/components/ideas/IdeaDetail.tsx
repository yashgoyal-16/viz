import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, PlusCircle, ExternalLink, Star, Share2 } from 'lucide-react';
import { mockIdeas } from '../../data/mockData';

const IdeaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'components' | 'steps'>('overview');
  const [expandedSteps, setExpandedSteps] = useState<string[]>([]);
  
  // Find the idea by id
  const idea = mockIdeas.find(idea => idea.id === id);
  
  if (!idea) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Idea not found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">The idea you're looking for doesn't exist or has been removed.</p>
        <Link to="/ideas" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Ideas
        </Link>
      </div>
    );
  }

  const toggleStep = (stepId: string) => {
    setExpandedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId) 
        : [...prev, stepId]
    );
  };

  // Mock project steps for the idea
  const projectSteps = [
    {
      id: 'step1',
      title: 'Gather Components',
      description: 'Collect all necessary hardware components including sensors, microcontroller, and power supply.',
      imageUrl: 'https://images.pexels.com/photos/3465983/pexels-photo-3465983.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'step2',
      title: 'Set Up Development Environment',
      description: 'Install the necessary software tools and libraries needed for programming the microcontroller.',
      imageUrl: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'step3',
      title: 'Connect Hardware Components',
      description: 'Wire up the sensors and other components to the microcontroller according to the connection diagram.',
      imageUrl: 'https://images.pexels.com/photos/1432675/pexels-photo-1432675.jpeg?auto=compress&cs=tinysrgb&w=800',
      codeSnippet: `// Example wiring code
// Connect DHT22 sensor to Arduino
// VCC -> 5V
// GND -> GND
// DATA -> Digital Pin 2`
    },
    {
      id: 'step4',
      title: 'Program the Microcontroller',
      description: 'Write and upload the code to the microcontroller to read sensor data and control actuators.',
      codeSnippet: `#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println(" °C");
  
  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.println(" %");
  
  delay(2000);
}`
    },
    {
      id: 'step5',
      title: 'Test and Troubleshoot',
      description: 'Verify that all components are working correctly and debug any issues that arise.',
    }
  ];

  // Mock components needed for the project
  const components = [
    { name: 'ESP32 Development Board', quantity: 1, description: 'Main microcontroller for the project' },
    { name: 'DHT22 Temperature & Humidity Sensor', quantity: 1, description: 'For measuring environmental conditions' },
    { name: 'Breadboard', quantity: 1, description: 'For prototyping the circuit' },
    { name: 'Jumper Wires', quantity: 20, description: 'For connecting components' },
    { name: 'USB Cable', quantity: 1, description: 'For programming and power' },
    { name: 'Resistors (10kΩ)', quantity: 5, description: 'For pull-up/pull-down configurations' }
  ];

  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb navigation */}
        <div className="mb-6">
          <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Link to="/ideas" className="hover:text-gray-700 dark:hover:text-gray-300 flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Ideas
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-white">{idea.title}</span>
          </nav>
        </div>

        {/* Idea header */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="relative h-64 md:h-80">
            <img 
              src={idea.imageUrl} 
              alt={idea.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6 text-white">
                <div className="flex space-x-2 mb-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${difficultyColor[idea.difficulty]}`}>
                    {idea.difficulty.charAt(0).toUpperCase() + idea.difficulty.slice(1)}
                  </span>
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full">
                    {idea.category}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">{idea.title}</h1>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-2">
                <button className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Start Project
                </button>
                <button className="inline-flex items-center justify-center p-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Star className="w-5 h-5" />
                </button>
                <button className="inline-flex items-center justify-center p-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              
              <a 
                href="#" 
                className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center text-sm font-medium"
              >
                View Similar Projects
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {idea.description}
            </p>
            
            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-800 mb-6">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-4 px-1 font-medium text-sm ${
                    activeTab === 'overview'
                      ? 'border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('components')}
                  className={`pb-4 px-1 font-medium text-sm ${
                    activeTab === 'components'
                      ? 'border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Components
                </button>
                <button
                  onClick={() => setActiveTab('steps')}
                  className={`pb-4 px-1 font-medium text-sm ${
                    activeTab === 'steps'
                      ? 'border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Steps
                </button>
              </nav>
            </div>
            
            {/* Tab content */}
            <div className="min-h-[300px]">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Project Overview</h2>
                  <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert">
                    <p>
                      This IoT project allows you to monitor environmental conditions such as temperature and humidity in real-time. 
                      The data is collected using sensors connected to a microcontroller and can be viewed through a web interface or mobile app.
                    </p>
                    <h3>Key Features</h3>
                    <ul>
                      <li>Real-time temperature and humidity monitoring</li>
                      <li>Data visualization through graphs and charts</li>
                      <li>Automated alerts for abnormal conditions</li>
                      <li>Historical data storage and analysis</li>
                    </ul>
                    <h3>Applications</h3>
                    <p>
                      This system can be used in various settings including:
                    </p>
                    <ul>
                      <li>Home environmental monitoring</li>
                      <li>Greenhouse climate control</li>
                      <li>Server room temperature monitoring</li>
                      <li>Food storage conditions tracking</li>
                    </ul>
                    <h3>Skills You'll Learn</h3>
                    <ul>
                      <li>Sensor integration with microcontrollers</li>
                      <li>IoT data collection and transmission</li>
                      <li>Web dashboard development</li>
                      <li>Basic data analysis and visualization</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {activeTab === 'components' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Required Components</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Component</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                        {components.map((component, index) => (
                          <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{component.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{component.quantity}</td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{component.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {activeTab === 'steps' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Project Steps</h2>
                  <div className="space-y-4">
                    {projectSteps.map((step, index) => (
                      <div 
                        key={step.id} 
                        className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden"
                      >
                        <div 
                          className="bg-gray-50 dark:bg-gray-800 px-4 py-3 flex justify-between items-center cursor-pointer"
                          onClick={() => toggleStep(step.id)}
                        >
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            <span className="inline-block w-6 h-6 mr-2 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center">
                              {index + 1}
                            </span>
                            {step.title}
                          </h3>
                          <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                            {expandedSteps.includes(step.id) ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        
                        {expandedSteps.includes(step.id) && (
                          <div className="p-4 bg-white dark:bg-gray-900">
                            <p className="text-gray-700 dark:text-gray-300 mb-4">{step.description}</p>
                            
                            {step.imageUrl && (
                              <div className="mb-4">
                                <img 
                                  src={step.imageUrl} 
                                  alt={step.title} 
                                  className="rounded-lg w-full h-48 object-cover"
                                />
                              </div>
                            )}
                            
                            {step.codeSnippet && (
                              <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto">
                                <pre className="text-sm text-gray-800 dark:text-gray-300">
                                  <code>{step.codeSnippet}</code>
                                </pre>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Related ideas */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Related Ideas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {mockIdeas.slice(0, 3).map((relatedIdea) => (
              <div 
                key={relatedIdea.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-32 overflow-hidden">
                  <img 
                    src={relatedIdea.imageUrl} 
                    alt={relatedIdea.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-1">{relatedIdea.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{relatedIdea.description}</p>
                  <Link 
                    to={`/ideas/${relatedIdea.id}`}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetail;