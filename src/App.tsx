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
