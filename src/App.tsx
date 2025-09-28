import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Star, Shield, Users, Zap, Globe } from 'lucide-react';
import GoogleSignIn from './components/GoogleSignIn';

const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 28)); // September 28, 2025
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedTimezone, setSelectedTimezone] = useState('America/New_York');
  const [showGoogleSignIn, setShowGoogleSignIn] = useState(false);

  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (UTC-5)' },
    { value: 'America/Chicago', label: 'Central Time (UTC-6)' },
    { value: 'America/Denver', label: 'Mountain Time (UTC-7)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (UTC-8)' },
    { value: 'Europe/London', label: 'London Time (UTC+0)' },
    { value: 'Europe/Paris', label: 'Paris Time (UTC+1)' },
    { value: 'Asia/Tokyo', label: 'Tokyo Time (UTC+9)' },
    { value: 'Australia/Sydney', label: 'Sydney Time (UTC+11)' },
  ];

  const timeSlots = [
    '9:00am', '9:30am', '10:00am', '10:30am', '11:00am', '11:30am',
    '12:00pm', '12:30pm', '1:00pm', '1:30pm', '2:00pm', '2:30pm',
    '3:00pm', '3:30pm', '4:00pm', '4:30pm', '5:00pm'
  ];

  const today = new Date(2025, 8, 28); // September 28, 2025
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const isDateAvailable = (date: number) => {
    const checkDate = new Date(currentYear, currentMonth, date);
    const dayOfWeek = checkDate.getDay();
    
    // Disable weekends (Saturday = 6, Sunday = 0)
    if (dayOfWeek === 0 || dayOfWeek === 6) return false;
    
    // Disable past dates
    if (checkDate < today) return false;
    
    return true;
  };

  const isToday = (date: number) => {
    const checkDate = new Date(currentYear, currentMonth, date);
    return checkDate.toDateString() === today.toDateString();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    } else if (direction === 'prev') {
      const prevMonth = new Date(currentYear, currentMonth - 1, 1);
      // Don't allow going to past months
      if (prevMonth >= new Date(today.getFullYear(), today.getMonth(), 1)) {
        setCurrentDate(prevMonth);
      }
    }
    setSelectedDate(null);
    setSelectedTime('');
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Add days of the month
    for (let date = 1; date <= daysInMonth; date++) {
      const available = isDateAvailable(date);
      const todayDate = isToday(date);
      const selected = selectedDate === date;

      days.push(
        <button
          key={date}
          onClick={() => available && setSelectedDate(date)}
          disabled={!available}
          className={`
            h-12 w-full rounded-lg text-sm font-medium transition-all duration-200 relative
            ${available 
              ? selected
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-white hover:bg-blue-50 hover:text-blue-600 hover:scale-105 text-gray-700 border border-gray-200'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          {date}
          {todayDate && (
            <div className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></div>
          )}
        </button>
      );
    }

    return days;
  };

  const getAvailableDaysCount = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    let count = 0;
    for (let date = 1; date <= daysInMonth; date++) {
      if (isDateAvailable(date)) count++;
    }
    return count;
  };

  const handleConfirmBooking = () => {
    if (selectedDate && selectedTime) {
      setShowGoogleSignIn(true);
    }
  };

  const handleBookingComplete = () => {
    setShowGoogleSignIn(false);
    setSelectedDate(null);
    setSelectedTime('');
  };

  const canGoPrev = () => {
    const prevMonth = new Date(currentYear, currentMonth - 1, 1);
    return prevMonth >= new Date(today.getFullYear(), today.getMonth(), 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Calendly Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Calendly Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="6" fill="white"/>
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
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-medium">4.9/5</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-blue-600" />
                <span>20M+ users</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="w-4 h-4 text-green-600" />
                <span>10M+ meetings</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4 text-purple-600" />
                <span>GDPR compliant</span>
              </div>
            </div>

            {/* Mobile Trust Indicators */}
            <div className="flex md:hidden items-center space-x-3 text-xs text-gray-600">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span>4.9/5</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-3 h-3 text-purple-600" />
                <span>Secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Profile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm lg:shadow-xl border border-gray-100 backdrop-blur-sm">
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
                  <Clock size={20} className="mr-2 text-indigo-600" />
                  Discovery Call
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
                    <Globe size={18} className="mr-3 text-indigo-600" />
                    <div>
                      <span className="font-medium">Zoom Meeting</span>
                      <p className="text-sm text-gray-500">Link will be sent via email</p>
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

          {/* Right Column - Calendar and Time Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Timezone Selector */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Select your timezone</h3>
                <Globe size={20} className="text-indigo-600" />
              </div>
              <select
                value={selectedTimezone}
                onChange={(e) => setSelectedTimezone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              >
                {timezones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Calendar */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {monthNames[currentMonth]} {currentYear}
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigateMonth('prev')}
                    disabled={!canGoPrev()}
                    className={`p-2 rounded-lg transition-colors ${
                      canGoPrev()
                        ? 'hover:bg-gray-100 text-gray-600'
                        : 'text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  {getAvailableDaysCount()} available days this month
                </p>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
                {renderCalendar()}
              </div>
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Available times for {monthNames[currentMonth]} {selectedDate}, {currentYear}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Times shown in {timezones.find(tz => tz.value === selectedTimezone)?.label}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                        selectedTime === time
                          ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                {selectedTime && (
                  <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-green-900">
                          Discovery Call - {monthNames[currentMonth]} {selectedDate}, {currentYear} at {selectedTime}
                        </p>
                        <p className="text-sm text-green-700">
                          30 minutes • {timezones.find(tz => tz.value === selectedTimezone)?.label}
                        </p>
                      </div>
                      <button
                        onClick={handleConfirmBooking}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <p className="text-sm text-gray-600">Powered by</p>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="6" fill="white"/>
                    <path d="M6 9C6 7.34315 7.34315 6 9 6H15C16.6569 6 18 7.34315 18 9V15C18 16.6569 16.6569 18 15 18H9C7.34315 18 6 16.6569 6 15V9Z" fill="#006BFF"/>
                  </svg>
                </div>
                <span className="font-medium text-gray-900">Calendly</span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-600">Hosted by EssenceMedia</span>
            </div>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>99.9% uptime</span>
              <span>•</span>
              <span>GDPR compliant</span>
              <span>•</span>
              <span>Enterprise security</span>
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