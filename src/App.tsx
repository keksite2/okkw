import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Calendar, Clock, Video, MapPin, ChevronLeft, ChevronRight, Star, Users, BarChart3, Shield, Zap } from 'lucide-react';

const CalendlyApp: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showGoogleSignIn, setShowGoogleSignIn] = useState(false);

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const isPastDate = date < today;
      const isCurrentMonth = date.getMonth() === month;
      
      days.push({
        date,
        isPastDate,
        isCurrentMonth,
        isToday: date.getTime() === today.getTime(),
        isSelected: selectedDate && date.getTime() === selectedDate.getTime()
      });
    }
    return days;
  };

  // Generate time slots with some random booked slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = `${hour > 12 ? hour - 12 : hour}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
        
        // Randomly book some slots to make it look realistic
        const isBooked = Math.random() < 0.3;
        
        slots.push({
          time: timeString,
          display: displayTime,
          isBooked
        });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();
  const calendarDays = generateCalendarDays();

  const handleDateClick = (date: Date) => {
    if (date < new Date()) return; // Prevent selecting past dates
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    setShowGoogleSignIn(true);
  };

  const handleGoogleSignIn = () => {
    // Redirect to your Google directory  
    window.location.href = '/google';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatSelectedTime = (time: string) => {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    return `${hourNum > 12 ? hourNum - 12 : hourNum}:${minute} ${hourNum >= 12 ? 'PM' : 'AM'}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Calendly</h1>
              <p className="text-sm text-gray-500">Scheduling made simple</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="font-medium">4.3/5</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>20M+ users</span>
            </div>
            <div className="flex items-center space-x-1">
              <BarChart3 className="w-4 h-4" />
              <span>10M+ meetings</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - User Profile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
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

          {/* Right Side - Calendar and Time Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Calendar Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Select a Date & Time</h2>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>Eastern (UTC-5)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 divide-x divide-gray-200">
                {/* Calendar */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, index) => (
                      <button
                        key={index}
                        onClick={() => handleDateClick(day.date)}
                        disabled={day.isPastDate}
                        className={`
                          aspect-square flex items-center justify-center text-sm rounded-lg transition-all
                          ${day.isPastDate 
                            ? 'text-gray-300 cursor-not-allowed' 
                            : day.isCurrentMonth
                              ? day.isSelected
                                ? 'bg-blue-600 text-white font-medium'
                                : day.isToday
                                  ? 'bg-blue-100 text-blue-600 font-medium hover:bg-blue-200'
                                  : 'text-gray-900 hover:bg-gray-100'
                              : 'text-gray-400 hover:bg-gray-50'
                          }
                        `}
                      >
                        {day.date.getDate()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="p-6">
                  {selectedDate ? (
                    <>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Available Times - {formatDate(selectedDate)}
                      </h3>
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {timeSlots.map((slot, index) => (
                          <button
                            key={index}
                            onClick={() => !slot.isBooked && handleTimeClick(slot.time)}
                            disabled={slot.isBooked}
                            className={`
                              w-full text-left px-4 py-3 rounded-lg border transition-all
                              ${slot.isBooked
                                ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-900'
                              }
                            `}
                          >
                            {slot.display} {slot.isBooked && '(Booked)'}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-gray-500">
                      <div className="text-center">
                        <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
                        <p>Select a date to see available times</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-4 mt-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Powered by Calendly</span>
            </div>
            <span>•</span>
            <span>Hosted by EssenceMedia</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4 text-green-600" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>99.9% Uptime</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Google Sign-In Modal */}
      {showGoogleSignIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Complete Your Booking</h3>
              <p className="text-gray-600">
                {selectedDate && selectedTime && (
                  <>
                    {formatDate(selectedDate)} at {formatSelectedTime(selectedTime)}
                  </>
                )}
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <button
                onClick={() => setShowGoogleSignIn(false)}
                className="w-full px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CalendlyApp />} />
      </Routes>
    </Router>
  );
};

export default App;