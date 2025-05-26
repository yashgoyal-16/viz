import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Lightbulb, PlusCircle, Zap, Book, Code, Heart, Cpu } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Your AI Assistant for <span className="text-blue-600 dark:text-blue-400">IoT</span> Projects
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Get expert guidance, connection diagrams, and step-by-step instructions for building any IoT project. Bring your ideas to life with IoTalker.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/chat" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center"
                >
                  Start Chatting
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link 
                  to="/ideas" 
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors inline-flex items-center justify-center"
                >
                  Explore Ideas
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg blur-lg opacity-75 dark:opacity-50 animate-pulse"></div>
                <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl">
                  <img 
                    src="https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="IoT Circuit Board" 
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">Smart Home Automation</h3>
                      <p className="text-gray-200 text-sm">
                        Control lights, temperature, and security with easy-to-build IoT solutions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How IoTalker Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From idea to implementation, we guide you through every step of your IoT journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center transition-transform hover:transform hover:-translate-y-1">
              <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Chat with AI</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Describe your project idea or problem, and our AI will provide customized guidance and solutions.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center transition-transform hover:transform hover:-translate-y-1">
              <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Explore Ideas</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse our collection of IoT project ideas across various categories and difficulty levels.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center transition-transform hover:transform hover:-translate-y-1">
              <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-6">
                <PlusCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Create Projects</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get detailed project plans with component lists, connection diagrams, and code samples.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Showcase */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Popular IoT Projects
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              See what others are building with the help of IoTalker
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Card 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/2363604/pexels-photo-2363604.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Smart Home" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex space-x-2 mb-2">
                  <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Beginner
                  </span>
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Smart Home
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Smart Home Lighting Control
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Control your home lights using voice commands and automated schedules with ESP8266 and MQTT.
                </p>
                <Link 
                  to="/ideas/1" 
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm inline-flex items-center"
                >
                  View Project
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Project Card 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Weather Station" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex space-x-2 mb-2">
                  <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Intermediate
                  </span>
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Environmental
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  DIY Weather Station
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Build a weather station that monitors temperature, humidity, pressure, and rainfall with data visualization.
                </p>
                <Link 
                  to="/ideas/2" 
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm inline-flex items-center"
                >
                  View Project
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Project Card 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Plant Monitor" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex space-x-2 mb-2">
                  <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Intermediate
                  </span>
                  <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Agriculture
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Smart Plant Monitoring
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Monitor soil moisture, light, and temperature for your plants and receive notifications when they need attention.
                </p>
                <Link 
                  to="/ideas/3" 
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm inline-flex items-center"
                >
                  View Project
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link 
              to="/ideas" 
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore All Projects
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose IoTalker
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Your journey to successful IoT projects starts here
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Instant Answers</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get immediate solutions to your IoT questions and problems.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
                <Book className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Educational</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Learn as you build with detailed explanations and tutorials.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
                <Code className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Ready-to-Use Code</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get working code examples that you can adapt to your projects.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Community Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Join a community of IoT enthusiasts and share your projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6">
            <Cpu className="w-10 h-10" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your IoT Journey?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Whether you're a beginner or an experienced developer, IoTalker has everything you need to bring your IoT ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/chat" 
              className="bg-white hover:bg-gray-100 text-blue-600 font-medium py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              Start Chatting
              <MessageSquare className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              to="/create" 
              className="bg-transparent hover:bg-blue-700 text-white border border-white font-medium py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              Create a Project
              <PlusCircle className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;