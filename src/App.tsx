import React, { useState } from 'react';
import Calendar from './components/Calendar';
import TimeSlot from './components/TimeSlot';
import UserProfile from './components/UserProfile';
import GoogleSignIn from './components/GoogleSignIn';
import { ChevronDown, Globe, Shield, Star, Users } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold mr-3">
                E
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EssenceMedia</h1>
                <p className="text-sm text-gray-500">Professional Booking System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <Shield size={16} className="mr-1 text-green-500" />
                Secure booking
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Star size={16} className="mr-1 text-yellow-500" />
                4.9/5 rating
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Schedule Your Strategy Session</h2>
          <p className="text-lg text-gray-600">Book a personalized consultation with our marketing experts</p>
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
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Select Date & Time</h3>
                <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                  <Globe size={16} className="mr-2" />
                  All times shown in your timezone
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
                    <button className="flex items-center text-sm text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors duration-200">
                      <Globe size={16} className="mr-2" />
                      Eastern time - US & Canada
                      <ChevronDown size={16} className="ml-2" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                  <h5 className="font-semibold text-indigo-900 mb-2">Before your meeting:</h5>
                  <ul className="text-sm text-indigo-700 space-y-1">
                    <li>• You'll receive a confirmation email with the Zoom link</li>
                    <li>• Please prepare any questions about your marketing goals</li>
                    <li>• Have your current campaign data ready (optional)</li>
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