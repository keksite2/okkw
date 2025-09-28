import React, { useState } from 'react';
import Calendar from './components/Calendar';
import TimeSlot from './components/TimeSlot';
import UserProfile from './components/UserProfile';
import GoogleSignIn from './components/GoogleSignIn';
import { ChevronDown, Globe, Shield, Star, Users, Calendar as CalendarIcon } from 'lucide-react';

const CalendlyLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#006BFF"/>
    <path d="M8 12C8 9.79086 9.79086 8 12 8H20C22.2091 8 24 9.79086 24 12V20C24 22.2091 22.2091 24 20 24H12C9.79086 24 8 22.2091 8 20V12Z" fill="white"/>
    <path d="M12 14V18H14V16H18V14H12Z" fill="#006BFF"/>
    <circle cx="19" cy="17" r="1" fill="#006BFF"/>
  </svg>
);

function App() {
  const [selectedDate, setSelectedDate] = useState(22);
  const [selectedTime, setSelectedTime] = useState('11:00am');
  const [showGoogleSignIn, setShowGoogleSignIn] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  
  const timeSlots = [
    { time: '10:00am', isBooked: false, isPast: false },
    { time: '11:00am', isBooked: false, isPast: false },
    { time: '1:00pm', isBooked: true, isPast: false },
    { time: '2:30pm', isBooked: false, isPast: false },
    { time: '4:00pm', isBooked: false, isPast: false },
    { time: '5:30pm', isBooked: false, isPast: false },
  ];
  
  const getDateName = (date: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = date === 22 ? 1 : 2; // Monday for 22nd, Tuesday for 23rd
    return `${days[dayIndex]}, July ${date}`;
  };

  const handleConfirmBooking = () => {
    setShowGoogleSignIn(true);
  };

  const handleBookingComplete = () => {
    setIsBooked(true);
    setShowGoogleSignIn(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-blue-100/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-4 transform hover:scale-105 transition-transform duration-200">
                <CalendlyLogo />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Calendly
                </h1>
                <p className="text-sm text-gray-600 font-medium">Easy scheduling ahead</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-sm text-gray-700 bg-green-50 px-3 py-2 rounded-full border border-green-200">
                <Shield size={16} className="mr-2 text-green-600" />
                <span className="font-medium">Secure</span>
              </div>
              <div className="flex items-center text-sm text-gray-700 bg-yellow-50 px-3 py-2 rounded-full border border-yellow-200">
                <Star size={16} className="mr-2 text-yellow-600" />
                <span className="font-medium">4.9/5</span>
              </div>
              <div className="flex items-center text-sm text-gray-700 bg-blue-50 px-3 py-2 rounded-full border border-blue-200">
                <Users size={16} className="mr-2 text-blue-600" />
                <span className="font-medium">10M+ users</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">
              Schedule Your Meeting
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Book a time that works for you with our easy-to-use scheduling platform
            </p>
            <div className="flex items-center justify-center mt-4 space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <CalendarIcon size={16} className="mr-2 text-blue-500" />
                <span>No back-and-forth emails</span>
              </div>
              <div className="flex items-center">
                <Globe size={16} className="mr-2 text-green-500" />
                <span>Timezone detection</span>
              </div>
              <div className="flex items-center">
                <Shield size={16} className="mr-2 text-purple-500" />
                <span>Calendar integration</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left sidebar - User profile */}
          <div className="xl:col-span-4">
            <UserProfile />
            
            {/* Trust indicators */}
            <div className="mt-6 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Why choose EssenceMedia?</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-700">
                  <Users size={16} className="mr-3 text-indigo-600" />
                  <span>500+ successful campaigns</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Star size={16} className="mr-3 text-yellow-500" />
                  <span>4.9/5 client satisfaction</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Shield size={16} className="mr-3 text-green-500" />
                  <span>100% confidential consultations</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content - Date and time selection */}
          <div className="xl:col-span-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-blue-100/50 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                  Select Date & Time
                </h3>
                <div className="flex items-center text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
                  <Globe size={16} className="mr-2" />
                  <span className="font-medium">Your timezone</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calendar */}
                <div>
                  <h4 className="font-semibold text-lg text-gray-900 mb-4">Choose a date</h4>
                  <Calendar 
                    selectedDate={selectedDate} 
                    onDateSelect={setSelectedDate} 
                  />
                </div>
                
                {/* Time slots */}
                <div>
                  <h4 className="font-semibold text-lg text-gray-900 mb-2">
                    Available times
                  </h4>
                  <p className="text-sm text-gray-600 mb-6">
                    {getDateName(selectedDate)}
                  </p>
                  <div className="space-y-3">
                    {timeSlots.map((slot) => (
                      <TimeSlot
                        key={slot.time}
                        time={slot.time}
                        isSelected={selectedTime === slot.time}
                        isBooked={slot.isBooked}
                        isPast={slot.isPast}
                        onClick={() => setSelectedTime(slot.time)}
                        onConfirm={handleConfirmBooking}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Timezone and additional info */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-sm font-semibold text-gray-700 mr-3">Time zone</span>
                    <button className="flex items-center text-sm text-gray-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full transition-all duration-200 border border-blue-200 hover:border-blue-300">
                      <Globe size={16} className="mr-2" />
                      Eastern time - US & Canada
                      <ChevronDown size={16} className="ml-2" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50 shadow-sm">
                  <h5 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <CalendarIcon size={18} className="mr-2 text-blue-600" />
                    What to expect:
                  </h5>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li>• You'll receive a confirmation email with the Zoom link</li>
                    <li>• Calendar invite will be sent automatically</li>
                    <li>• Join from any device with the meeting link</li>
                    <li>• Reschedule or cancel anytime if needed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Sign-In Modal */}
      <GoogleSignIn
        isOpen={showGoogleSignIn}
        onClose={() => setShowGoogleSignIn(false)}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        onBookingComplete={handleBookingComplete}
      />
    </div>
  );
}

export default App;