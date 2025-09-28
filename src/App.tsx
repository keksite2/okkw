import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Video, MapPin, Calendar, Star, Shield, Users, Zap } from 'lucide-react';
import GoogleSignIn from './components/GoogleSignIn';

const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showGoogleSignIn, setShowGoogleSignIn] = useState(false);

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM'
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
    setSelectedDate(null);
  };

  const handleDateSelect = (day: number) => {
    setSelectedDate(day);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setShowGoogleSignIn(true);
  };

  const handleBookingComplete = () => {
    setShowGoogleSignIn(false);
    setSelectedDate(null);
    setSelectedTime('');
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const today = new Date();
    const isCurrentMonth = currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isPast = isCurrentMonth && day < today.getDate();
      const isSelected = selectedDate === day;
      
      days.push(
        <button
          key={day}
          onClick={() => !isPast && handleDateSelect(day)}
          disabled={isPast}
          className={`
            h-12 w-full rounded-lg text-sm font-medium transition-all duration-200
            ${isPast 
              ? 'text-gray-300 cursor-not-allowed' 
              : isSelected
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md'
            }
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Calendly Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Calendly Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="4" fill="white"/>
                  <path d="M6 9C6 7.34315 7.34315 6 9 6H15C16.6569 6 18 7.34315 18 9V15C18 16.6569 16.6569 18 15 18H9C7.34315 18 6 16.6569 6 15V9Z" fill="#006BFF"/>
                  <path d="M9 10.5V13.5H10.5V12H13.5V10.5H9Z" fill="white"/>
                  <circle cx="14.25" cy="12.75" r="0.75" fill="white"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Calendly</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Scheduling made simple</p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                <span className="font-medium">4.9/5</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 text-blue-600 mr-1" />
                <span>20M+ users</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-green-600 mr-1" />
                <span>10M+ meetings</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Profile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-8">
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
          </div>

          {/* Right Column - Calendar and Time Slots */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Calendar Header */}
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Select a Date & Time</h3>
                  <div className="flex items-center space-x-2">
                    <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Eastern (UTC-5)</option>
                      <option>Pacific (UTC-8)</option>
                      <option>Central (UTC-6)</option>
                      <option>Mountain (UTC-7)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Calendar */}
                  <div className="lg:col-span-2">
                    {/* Month Navigation */}
                    <div className="flex items-center justify-between mb-6">
                      <button
                        onClick={() => navigateMonth('prev')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronLeft size={20} className="text-gray-600" />
                      </button>
                      <h4 className="text-lg font-semibold text-gray-900">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                      </h4>
                      <button
                        onClick={() => navigateMonth('next')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronRight size={20} className="text-gray-600" />
                      </button>
                    </div>

                    {/* Calendar Grid */}
                    <div className="mb-4">
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                          <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-gray-500">
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {renderCalendar()}
                      </div>
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="lg:col-span-1">
                    {selectedDate && (
                      <div className="space-y-3">
                        <h5 className="font-semibold text-gray-900 mb-4">
                          Available Times - {monthNames[currentDate.getMonth()]} {selectedDate}
                        </h5>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              onClick={() => handleTimeSelect(time)}
                              className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 flex items-center group"
                            >
                              <Clock size={16} className="mr-2 text-gray-400 group-hover:text-blue-600" />
                              <span className="font-medium text-gray-700 group-hover:text-blue-700">{time}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {!selectedDate && (
                      <div className="text-center py-12">
                        <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">Select a date to see available times</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-md flex items-center justify-center mr-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" fill="white"/>
                    <path d="M6 9C6 7.34315 7.34315 6 9 6H15C16.6569 6 18 7.34315 18 9V15C18 16.6569 16.6569 18 15 18H9C7.34315 18 6 16.6569 6 15V9Z" fill="#006BFF"/>
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Powered by Calendly</span>
              </div>
              <div className="text-sm text-gray-500">•</div>
              <div className="text-sm text-gray-600">Hosted by EssenceMedia</div>
            </div>
            
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center">
                <Shield size={14} className="mr-1" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center">
                <Zap size={14} className="mr-1" />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Sign In Modal */}
      <GoogleSignIn
        isOpen={showGoogleSignIn}
        onClose={() => setShowGoogleSignIn(false)}
        selectedDate={selectedDate || 0}
        selectedTime={selectedTime}
        onBookingComplete={handleBookingComplete}
      />
    </div>
  );
};

export default App;