import React from 'react';
import { FaTools, FaMapMarkedAlt, FaClock } from "react-icons/fa"
import FeatureCard from './FeatureCard';
const Feature = () => {
    return (
        <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold">Our Key Features</h2>
        <p className="text-gray-600 mt-2">
          We make public issue reporting faster, smarter and more efficient.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        <FeatureCard 
          icon={<FaMapMarkedAlt />} 
          title="Easy Location Reporting" 
          description="Users can pin exact issue locations directly on the map."
        />
        <FeatureCard 
          icon={<FaTools />} 
          title="Fast Resolution" 
          description="Admin quickly assigns issues to the right department." 
        />
        <FeatureCard 
          icon={<FaClock />} 
          title="Real-time Tracking" 
          description="Track every public issue until it gets solved." 
        />
      </div>
    </section>
  );
    ;
};

export default Feature;