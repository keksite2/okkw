import React from 'react';
import { X, Calendar, Clock, Video } from 'lucide-react';

interface GoogleSignInProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: number;
  selectedTime: string;
  onBookingComplete: () => void;
}

const GoogleSignIn: React.FC<GoogleSignInProps> = ({
  isOpen,
  onClose,
  selectedDate,
  selectedTime,
  onBookingComplete,
}) => {
  if (!isOpen) return null;

  const getDateName = (date: number) => {
    const today = new Date();
    const currentMonth = today.getMonth(); // September = 8
    const currentYear = today.getFullYear();
    
    const selectedDate = new Date(currentYear, currentMonth, date);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    return `${days[selectedDate.getDay()]}, ${months[selectedDate.getMonth()]} ${date}, ${currentYear}`;
  };

  const handleGoogleSignIn = () => {
    // Redirect to the /google directory on cPanel
    window.location.href = '/google';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Confirm Your Booking</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Meeting Summary */}
        <div className="p-6 bg-blue-50 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Calendar size={18} className="mr-2 text-blue-600" />
            Discovery Call
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-700">
              <Clock size={16} className="mr-2 text-blue-600" />
              <span>{getDateName(selectedDate)} at {selectedTime}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Video size={16} className="mr-2 text-blue-600" />
              <span>30 min • Zoom meeting</span>
            </div>
          </div>
        </div>

        {/* Google Sign In */}
        <div className="p-6">
          <p className="text-gray-600 mb-6 text-center">
            Sign in with Google to confirm your booking and receive calendar invites.
          </p>
          
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>
        </div>

        <div className="px-6 pb-6">
          <p className="text-xs text-gray-500 text-center">
            By continuing, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoogleSignIn;