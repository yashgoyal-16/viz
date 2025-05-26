import React, { useState } from 'react';
import { Cpu, Thermometer, Lightbulb, WifiOff, BatteryMedium, Clock, LayoutDashboard, Server, ChevronRight } from 'lucide-react';

const ProjectCreator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [projectDetails, setProjectDetails] = useState<null | any>(null);
  
  const categories = [
    { id: 'smart-home', name: 'Smart Home', icon: <Lightbulb className="w-6 h-6" />, color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
    { id: 'environmental', name: 'Environmental', icon: <Thermometer className="w-6 h-6" />, color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
    { id: 'industrial', name: 'Industrial IoT', icon: <Cpu className="w-6 h-6" />, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
    { id: 'wearable', name: 'Wearables', icon: <WifiOff className="w-6 h-6" />, color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' },
    { id: 'energy', name: 'Energy Monitoring', icon: <BatteryMedium className="w-6 h-6" />, color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' },
    { id: 'automation', name: 'Automation', icon: <Clock className="w-6 h-6" />, color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' },
    { id: 'dashboard', name: 'Data Dashboards', icon: <LayoutDashboard className="w-6 h-6" />, color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' },
    { id: 'server', name: 'Edge Computing', icon: <Server className="w-6 h-6" />, color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' },
  ];

  const samplePrompts = [
    "Create a smart plant monitoring system using ESP32 that measures soil moisture, light levels, and temperature",
    "Design a home security system with motion sensors and camera that sends alerts to my phone",
    "Build a weather station that collects data and displays it on a web dashboard",
    "Make an automated pet feeder with scheduling and remote control capabilities"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock response
      setProjectDetails({
        title: "Smart Plant Monitoring System",
        description: "A system that monitors soil moisture, light levels, and temperature for indoor plants and sends notifications when plants need attention.",
        difficulty: "intermediate",
        components: [
          { name: "ESP32 Development Board", quantity: 1 },
          { name: "Soil Moisture Sensor", quantity: 1 },
          { name: "DHT22 Temperature & Humidity Sensor", quantity: 1 },
          { name: "LDR Light Sensor", quantity: 1 },
          { name: "OLED Display", quantity: 1 },
          { name: "Jumper Wires", quantity: 20 },
          { name: "Breadboard", quantity: 1 },
          { name: "USB Cable", quantity: 1 }
        ],
        steps: [
          {
            title: "Hardware Setup",
            description: "Connect the sensors to the ESP32 according to the following diagram:",
            codeOrDiagram: `
ESP32 Pin Connections:
- Soil Moisture Sensor:
  * VCC → 3.3V
  * GND → GND
  * Analog Output → GPIO34
- DHT22 Sensor:
  * VCC → 3.3V
  * GND → GND
  * Data → GPIO27
- LDR Light Sensor:
  * VCC → 3.3V
  * GND → GND
  * Analog Output → GPIO35
- OLED Display:
  * VCC → 3.3V
  * GND → GND
  * SCL → GPIO22
  * SDA → GPIO21
            `,
            imageUrl: "https://images.pexels.com/photos/1054397/pexels-photo-1054397.jpeg?auto=compress&cs=tinysrgb&w=800"
          },
          {
            title: "Development Environment Setup",
            description: "Set up the Arduino IDE and install the necessary libraries:",
            codeOrDiagram: `
1. Install the Arduino IDE
2. Add ESP32 board support:
   - Go to File → Preferences
   - Add https://dl.espressif.com/dl/package_esp32_index.json to Additional Boards Manager URLs
   - Go to Tools → Board → Boards Manager and install ESP32 by Espressif Systems
3. Install required libraries:
   - DHT sensor library by Adafruit
   - Adafruit SSD1306 for the OLED display
   - WiFiManager by tzapu
   - PubSubClient for MQTT communication
            `
          },
          {
            title: "Programming the ESP32",
            description: "Here's the code to read sensor data and display it on the OLED:",
            codeOrDiagram: `
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <DHT.h>
#include <WiFi.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1
#define SCREEN_ADDRESS 0x3C

#define SOIL_MOISTURE_PIN 34
#define LIGHT_SENSOR_PIN 35
#define DHT_PIN 27
#define DHT_TYPE DHT22

// Initialize display
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// Initialize DHT sensor
DHT dht(DHT_PIN, DHT_TYPE);

void setup() {
  Serial.begin(115200);
  
  // Initialize sensors
  pinMode(SOIL_MOISTURE_PIN, INPUT);
  pinMode(LIGHT_SENSOR_PIN, INPUT);
  dht.begin();
  
  // Initialize OLED display
  if(!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS)) {
    Serial.println(F("SSD1306 allocation failed"));
    for(;;);
  }
  
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.println("Plant Monitor");
  display.println("Initializing...");
  display.display();
  delay(2000);
}

void loop() {
  // Read sensor values
  int soilMoisture = analogRead(SOIL_MOISTURE_PIN);
  int lightLevel = analogRead(LIGHT_SENSOR_PIN);
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  
  // Map the soil moisture to a percentage (calibrate these values for your sensor)
  int soilMoisturePercent = map(soilMoisture, 4095, 1000, 0, 100);
  soilMoisturePercent = constrain(soilMoisturePercent, 0, 100);
  
  // Map light level to a percentage
  int lightPercent = map(lightLevel, 4095, 0, 0, 100);
  
  // Display the readings
  display.clearDisplay();
  display.setCursor(0, 0);
  display.println("Plant Monitor");
  display.println("----------------");
  
  display.print("Soil: ");
  display.print(soilMoisturePercent);
  display.println("%");
  
  display.print("Light: ");
  display.print(lightPercent);
  display.println("%");
  
  display.print("Temp: ");
  display.print(temperature);
  display.println(" C");
  
  display.print("Humidity: ");
  display.print(humidity);
  display.println("%");
  
  display.display();
  
  // Print to serial for debugging
  Serial.print("Soil Moisture: ");
  Serial.print(soilMoisturePercent);
  Serial.println("%");
  
  Serial.print("Light Level: ");
  Serial.print(lightPercent);
  Serial.println("%");
  
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println(" °C");
  
  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.println("%");
  
  delay(5000);
}
            `
          },
          {
            title: "Testing the System",
            description: "Once you've uploaded the code, you should see sensor readings on the OLED display. Test the system by:",
            codeOrDiagram: `
1. Checking that temperature and humidity readings match expected room conditions
2. Touching the soil moisture sensor to see if the values change
3. Covering and uncovering the light sensor to see if light level percentage changes
            `
          },
          {
            title: "Adding WiFi Connectivity",
            description: "Extend the project by adding WiFi connectivity to send data to a cloud service or mobile app:",
            codeOrDiagram: `
// Add these libraries at the top of your code
#include <WiFiManager.h>
#include <PubSubClient.h>

// Add these definitions
#define MQTT_SERVER "your-mqtt-broker.com"
#define MQTT_PORT 1883
#define MQTT_USER "your-username"
#define MQTT_PASSWORD "your-password"
#define MQTT_TOPIC "plant-monitor/data"

// Initialize WiFi and MQTT clients
WiFiClient espClient;
PubSubClient client(espClient);

// In your setup function, add:
WiFiManager wifiManager;
wifiManager.autoConnect("PlantMonitor-AP");
Serial.println("Connected to WiFi");

// Setup MQTT connection
client.setServer(MQTT_SERVER, MQTT_PORT);

// In your loop function, add:
if (!client.connected()) {
  reconnect();
}
client.loop();

// Create JSON payload with sensor data
String payload = "{";
payload += "\"soil_moisture\":" + String(soilMoisturePercent) + ",";
payload += "\"light_level\":" + String(lightPercent) + ",";
payload += "\"temperature\":" + String(temperature) + ",";
payload += "\"humidity\":" + String(humidity);
payload += "}";

// Publish to MQTT topic
client.publish(MQTT_TOPIC, payload.c_str());

// Add this function at the end
void reconnect() {
  while (!client.connected()) {
    Serial.print("Connecting to MQTT...");
    if (client.connect("ESP32Client", MQTT_USER, MQTT_PASSWORD)) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" retrying in 5 seconds");
      delay(5000);
    }
  }
}
            `
          }
        ]
      });
      
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Create Your IoT Project
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Describe what you want to build, and our AI will generate a detailed project plan with components, diagrams, and step-by-step instructions.
          </p>
        </div>

        {!projectDetails ? (
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden p-6">
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="mb-6">
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Describe your project idea
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="I want to build a smart plant monitoring system that..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  rows={4}
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Be specific about what sensors, functionality, and goals you have for your project.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={isGenerating || !prompt.trim()}
                  className={`px-4 py-2 rounded-lg text-white font-medium flex items-center justify-center ${
                    isGenerating || !prompt.trim()
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    'Generate Project Plan'
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => setPrompt('')}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 font-medium"
                >
                  Clear
                </button>
              </div>
            </form>
            
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Example prompts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {samplePrompts.map((samplePrompt, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(samplePrompt)}
                    className="text-left p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm text-gray-700 dark:text-gray-300"
                  >
                    {samplePrompt}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Browse by category</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mb-3`}>
                      {category.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                      {category.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center mb-1">
                    <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                      Intermediate
                    </span>
                    <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Smart Home
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {projectDetails.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {projectDetails.description}
                  </p>
                </div>
                <button
                  onClick={() => setProjectDetails(null)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Start Over
                </button>
              </div>
            </div>
            
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Required Components
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Component</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                    {projectDetails.components.map((component: any, index: number) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{component.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{component.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Project Steps
              </h3>
              <div className="space-y-8">
                {projectDetails.steps.map((step: any, index: number) => (
                  <div key={index} className="relative pl-8 pb-8 border-l border-gray-200 dark:border-gray-800 last:border-0 last:pb-0">
                    <div className="absolute left-0 top-0 transform -translate-x-1/2 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
                        {step.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {step.description}
                      </p>
                      
                      {step.imageUrl && (
                        <div className="mb-4">
                          <img 
                            src={step.imageUrl} 
                            alt={step.title} 
                            className="rounded-lg w-full max-w-lg h-48 object-cover"
                          />
                        </div>
                      )}
                      
                      {step.codeOrDiagram && (
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 overflow-x-auto mb-4">
                          <pre className="text-sm text-gray-800 dark:text-gray-300 whitespace-pre-wrap">
                            <code>{step.codeOrDiagram}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setProjectDetails(null)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Start Over
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center"
                >
                  Save Project
                  <ChevronRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCreator;