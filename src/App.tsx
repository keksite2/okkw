import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar, Video, MapPin } from 'lucide-react';
import GoogleSignIn from './components/GoogleSignIn';

const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8)); // September 2025
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
    setShowModal(true);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate === day;
      const isAvailable = day >= 28 && day <= 30; // Only show available dates for demo
      
      days.push(
        <button
          key={day}
          onClick={() => isAvailable && handleDateSelect(day)}
          disabled={!isAvailable}
          className={`
            h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200
            ${isSelected 
              ? 'bg-blue-600 text-white shadow-lg' 
              : isAvailable 
                ? 'hover:bg-blue-50 hover:text-blue-600 text-gray-700' 
                : 'text-gray-300 cursor-not-allowed'
            }
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <Calendar size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Calendly</h1>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span>4.3/5</span>
            </div>
            <div className="flex items-center">
              <span className="mr-1">👥</span>
              <span>20M+ users</span>
            </div>
            <div className="flex items-center">
              <span className="mr-1">📅</span>
              <span>10M+ meetings</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - User Profile */}
          <div className="lg:col-span-1">
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

          {/* Right Panel - Calendar and Time Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Select a Date & Time</h3>
                <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                  <option>Eastern (UTC-5)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calendar */}
                <div className="lg:col-span-1">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => navigateMonth('prev')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <h4 className="text-lg font-semibold text-gray-900">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                      </h4>
                      <button
                        onClick={() => navigateMonth('next')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>

                    {/* Day headers */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {dayNames.map(day => (
                        <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {renderCalendar()}
                    </div>
                  </div>
                </div>

                {/* Time Slots */}
                <div className="lg:col-span-1">
                  {selectedDate ? (
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
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                      <Calendar size={48} className="mb-4 text-gray-300" />
                      <p className="text-center">Select a date to see available times</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-100 px-4 py-6 mt-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-blue-600 rounded mr-2 flex items-center justify-center">
              <Calendar size={12} className="text-white" />
            </div>
            <span>Powered by Calendly</span>
            <span className="mx-2">•</span>
            <span>Hosted by EssenceMedia</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>🍪 GDPR Compliant</span>
            <span>🔒 99.9% Uptime</span>
          </div>
        </div>
      </div>

      {/* Google Sign-in Modal */}
      {showModal && (
        <GoogleSignIn
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          currentDate={currentDate}
          monthNames={monthNames}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default App;