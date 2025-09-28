import React from 'react';
import { Clock, Video, MapPin, Calendar } from 'lucide-react';

const UserProfile: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      {/* Company Header */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
            EM
          </div>
          <div className="ml-3">
            <h2 className="font-bold text-xl text-gray-900">EssenceMedia</h2>
            <p className="text-sm text-gray-500">Digital Marketing Agency</p>
          </div>
        </div>
      </div>
      
      {/* Host Profile */}
      <div className="flex items-center mb-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
        <div className="relative">
          <img 
            src="/matthew.jpg" 
            alt="Matthew Mee"
            className="w-14 h-14 rounded-full object-cover shadow-lg"
            onError={(e) => {
              // Fallback to initials if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg" style={{display: 'none'}}>
            MM
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
        <div className="ml-4">
          <h3 className="font-semibold text-lg text-gray-900">Matthew Mee</h3>
          <p className="text-sm text-gray-600">Global Chief Strategy Officer</p>
          <div className="flex items-center mt-1">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <span className="text-xs text-green-600 font-medium">Available now</span>
          </div>
        </div>
      </div>
      
      {/* Meeting Details */}
      <div className="border-t border-gray-100 pt-6">
        <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
          <Calendar size={20} className="mr-2 text-indigo-600" />
          Client Strategy Session
        </h4>
        
        <div className="space-y-4">
          <div className="flex items-center text-gray-700 p-3 bg-gray-50 rounded-lg">
            <Clock size={18} className="mr-3 text-indigo-600" />
            <div>
              <span className="font-medium">30 minutes</span>
              <p className="text-sm text-gray-500">One-on-one consultation</p>
            </div>
          </div>
          
          <div className="flex items-center text-gray-700 p-3 bg-gray-50 rounded-lg">
            <Video size={18} className="mr-3 text-indigo-600" />
            <div>
              <span className="font-medium">Zoom Meeting</span>
              <p className="text-sm text-gray-500">Link will be sent via email</p>
            </div>
          </div>
          
          <div className="flex items-center text-gray-700 p-3 bg-gray-50 rounded-lg">
            <MapPin size={18} className="mr-3 text-indigo-600" />
            <div>
              <span className="font-medium">Remote Session</span>
              <p className="text-sm text-gray-500">Join from anywhere</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
          <h5 className="font-semibold text-indigo-900 mb-2">What to expect:</h5>
          <ul className="text-sm text-indigo-700 space-y-1">
            <li>• Marketing strategy review</li>
            <li>• Campaign optimization tips</li>
            <li>• Q&A session</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;