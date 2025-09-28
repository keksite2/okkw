import React, { useState } from 'react';
import { Globe, ChevronDown, ArrowLeft } from 'lucide-react';
import UserProfile from './components/UserProfile';
import Calendar from './components/Calendar';
import TimeSlot from './components/TimeSlot';
import GoogleSignIn from './components/GoogleSignIn';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showGoogleSignIn, setShowGoogleSignIn] = useState<boolean>(false);
  const [selectedTimezone, setSelectedTimezone] = useState<string>('America/New_York');
  const [showTimezoneDropdown, setShowTimezoneDropdown] = useState<boolean>(false);

  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (ET)', offset: 'UTC-5' },
    { value: 'America/Chicago', label: 'Central Time (CT)', offset: 'UTC-6' },
    { value: 'America/Denver', label: 'Mountain Time (MT)', offset: 'UTC-7' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)', offset: 'UTC-8' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)', offset: 'UTC+0' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)', offset: 'UTC+1' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)', offset: 'UTC+9' },
    { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)', offset: 'UTC+11' },
  ];

  const timeSlots = [
    '9:00am', '9:30am', '10:00am', '10:30am', '11:00am', '11:30am',
    '12:00pm', '12:30pm', '1:00pm', '1:30pm', '2:00pm', '2:30pm',
    '3:00pm', '3:30pm', '4:00pm', '4:30pm', '5:00pm', '5:30pm'
  ];

  const bookedSlots = ['10:00am', '2:30pm', '4:00pm'];

  const getSelectedTimezone = () => {
    return timezones.find(tz => tz.value === selectedTimezone) || timezones[0];
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirmBooking = () => {
    if (selectedDate && selectedTime) {
      setShowGoogleSignIn(true);
    }
  };

  const handleBookingComplete = () => {
    setShowGoogleSignIn(false);
    setSelectedDate(0);
    setSelectedTime('');
    alert('Booking confirmed! You will receive a confirmation email shortly.');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Calendly Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Back Button - Mobile */}
            <button className="lg:hidden p-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft size={20} />
            </button>
            
            {/* Calendly Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                  </svg>
                </div>
                <span className="text-xl font-semibold text-gray-900 hidden sm:block">Calendly</span>
              </div>
            </div>

            {/* EssenceMedia Branding */}
            <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600">
              <span>Powered by</span>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-xs">
                  EM
                </div>
                <span className="font-semibold text-gray-900">EssenceMedia</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - User Profile */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <UserProfile />
          </div>

          {/* Right Column - Calendar and Time Slots */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8 order-1 lg:order-2">
            {/* Mobile Header Info */}
            <div className="lg:hidden bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-bold text-lg text-gray-900">Discovery Call</h1>
                  <p className="text-sm text-gray-600">30 min • Matthew Mee</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-blue-600">EssenceMedia</div>
                  <div className="text-xs text-gray-500">via Calendly</div>
                </div>
              </div>
            </div>

            {/* Timezone Selector */}
            <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm lg:shadow-xl border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3">
                  <Globe size={18} lg:size={20} className="text-blue-600" />
                  <h3 className="font-semibold text-base lg:text-lg text-gray-900">Select Timezone</h3>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowTimezoneDropdown(!showTimezoneDropdown)}
                    className="flex items-center justify-between w-full sm:w-auto space-x-2 px-3 lg:px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg lg:rounded-xl transition-colors border border-blue-200 text-sm lg:text-base"
                  >
                    <span className="font-medium text-blue-700 truncate">
                      {getSelectedTimezone().label}
                    </span>
                    <ChevronDown size={14} lg:size={16} className="text-blue-600 flex-shrink-0" />
                  </button>
                  
                  {showTimezoneDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-full sm:w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-64 overflow-y-auto">
                      {timezones.map((timezone) => (
                        <button
                          key={timezone.value}
                          onClick={() => {
                            setSelectedTimezone(timezone.value);
                            setShowTimezoneDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 text-sm lg:text-base ${
                            selectedTimezone === timezone.value ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                          }`}
                        >
                          <div className="font-medium">{timezone.label}</div>
                          <div className="text-xs lg:text-sm text-gray-500">{timezone.offset}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Calendar */}
            <Calendar 
              selectedDate={selectedDate} 
              onDateSelect={setSelectedDate} 
            />

            {/* Time Slots */}
            {selectedDate > 0 && (
              <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm lg:shadow-xl border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 lg:mb-6 space-y-2 sm:space-y-0">
                  <h3 className="font-semibold text-base lg:text-lg text-gray-900">Available Times</h3>
                  <span className="text-xs lg:text-sm font-medium text-gray-500 bg-gray-100 px-2 lg:px-3 py-1 rounded-full">
                    {getSelectedTimezone().label}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 lg:gap-3">
                  {timeSlots.map((time) => (
                    <TimeSlot
                      key={time}
                      time={time}
                      isSelected={selectedTime === time}
                      isBooked={bookedSlots.includes(time)}
                      onClick={() => handleTimeSelect(time)}
                      onConfirm={handleConfirmBooking}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Google Sign In Modal */}
      <GoogleSignIn
        isOpen={showGoogleSignIn}
        onClose={() => setShowGoogleSignIn(false)}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        onBookingComplete={handleBookingComplete}
      />

      {/* Mobile Footer - Calendly Branding */}
      <footer className="lg:hidden bg-gray-50 border-t border-gray-200 p-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <span>Powered by</span>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-blue-600 rounded flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
              </div>
              <span className="font-semibold text-blue-600">Calendly</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded flex items-center justify-center text-white font-bold text-xs">
                E
              </div>
              <span className="font-semibold text-gray-900">EssenceMedia</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;