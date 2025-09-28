import React from 'react';
import { Clock, Video, MapPin, Calendar } from 'lucide-react';

const UserProfile: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      {/* Company Header */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="6" fill="white"/>
              <path d="M6 9C6 7.34315 7.34315 6 9 6H15C16.6569 6 18 7.34315 18 9V15C18 16.6569 16.6569 18 15 18H9C7.34315 18 6 16.6569 6 15V9Z" fill="#006BFF"/>
              <path d="M9 10.5V13.5H10.5V12H13.5V10.5H9Z" fill="white"/>
              <circle cx="14.25" cy="12.75" r="0.75" fill="white"/>
            </svg>
          </div>
          <div className="ml-3">
            <h2 className="font-bold text-xl text-gray-900">Calendly</h2>
            <p className="text-sm text-gray-500">Scheduling Made Simple</p>
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
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
            CS
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
        <div className="ml-4">
          <h3 className="font-semibold text-lg text-gray-900">Customer Success</h3>
          <p className="text-sm text-gray-600">Calendly Support Team</p>
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
        {/* Footer */}
        <div className="p-6 pt-0">
          <p className="text-xs text-gray-500 text-center">
            By booking, you agree to receive meeting reminders and updates via email.
          </p>
        </div>
  )
}