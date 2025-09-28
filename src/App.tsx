import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - User Profile */}
            <div className="lg:col-span-1">
              <UserProfile />
            </div>

            {/* Right Column - Calendar and Time Slots */}
            <div className="lg:col-span-2 space-y-8">
              {/* Timezone Selector */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Globe size={20} className="text-indigo-600" />
                    <h3 className="font-bold text-lg text-gray-900">Select Timezone</h3>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setShowTimezoneDropdown(!showTimezoneDropdown)}
                      className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors border border-indigo-200"
                    >
                      <span className="font-medium text-indigo-700">
                        {getSelectedTimezone().label}
                      </span>
                      <ChevronDown size={16} className="text-indigo-600" />
                    </button>
                    
                    {showTimezoneDropdown && (
                      <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-64 overflow-y-auto">
                        {timezones.map((timezone) => (
                          <button
                            key={timezone.value}
                            onClick={() => {
                              setSelectedTimezone(timezone.value);
                              setShowTimezoneDropdown(false);
                            }}
                            className={`w-full text-left px-4 py-3 hover:bg-indigo-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                              selectedTimezone === timezone.value ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'
                            }`}
                          >
                            <div className="font-medium">{timezone.label}</div>
                            <div className="text-sm text-gray-500">{timezone.offset}</div>
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
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                  <h3 className="font-bold text-lg text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">Available Times</span>
                    <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {getSelectedTimezone().label}
                    </span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
      </div>

      {/* Google Sign In Modal */}
      <GoogleSignIn
        isOpen={showGoogleSignIn}
        onClose={() => setShowGoogleSignIn(false)}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        onBookingComplete={handleBookingComplete}
      />
    </div>
  );
};

export default App;