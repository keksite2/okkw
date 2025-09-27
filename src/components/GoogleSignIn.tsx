import React, { useState } from 'react';
import { X, Mail, Shield, CheckCircle, Clock, User } from 'lucide-react';

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
  onBookingComplete 
}) => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    
    // Simulate Google Sign-In process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSigningIn(false);
    setIsBooking(true);
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsBooking(false);
    setIsComplete(true);
    
    // Auto close after showing success
    setTimeout(() => {
      onBookingComplete();
      onClose();
      setIsComplete(false);
    }, 3000);
  };

  const getDateName = (date: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = date === 22 ? 1 : 2;
    return `${days[dayIndex]}, July ${date}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
              E
            </div>
            <h2 className="text-xl font-bold text-gray-900">Confirm Booking</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isComplete ? (
            <>
              {/* Booking Summary */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 mb-6 border border-indigo-100">
                <h3 className="font-semibold text-gray-900 mb-3">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-700">
                    <Clock size={16} className="mr-2 text-indigo-600" />
                    <span>{getDateName(selectedDate)} at {selectedTime}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Mail size={16} className="mr-2 text-indigo-600" />
                    <span>Client Strategy Session (30 min)</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <User size={16} className="mr-2 text-indigo-600" />
                    <span>With Matthew Mee, Global Chief Strategy Officer</span>
                  </div>
                </div>
              </div>

              {/* Sign In Section */}
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {isSigningIn ? 'Signing you in...' : isBooking ? 'Confirming your booking...' : 'Sign in to confirm your booking'}
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  {isSigningIn ? 'Please wait while we authenticate your account...' : 
                   isBooking ? 'We\'re securing your appointment slot...' :
                   'We\'ll send you a confirmation email and calendar invite'}
                </p>

                {isSigningIn ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    <span className="ml-3 text-gray-600">Authenticating...</span>
                  </div>
                ) : isBooking ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-pulse flex items-center">
                      <div className="w-3 h-3 bg-indigo-600 rounded-full mr-2"></div>
                      <div className="w-3 h-3 bg-indigo-400 rounded-full mr-2"></div>
                      <div className="w-3 h-3 bg-indigo-300 rounded-full"></div>
                    </div>
                    <span className="ml-3 text-gray-600">Booking your session...</span>
                  </div>
                ) : (
                  <button
                    onClick={handleGoogleSignIn}
                    className="w-full bg-white border-2 border-gray-300 rounded-xl py-4 px-6 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md group"
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="font-semibold text-gray-700 group-hover:text-gray-900">Continue with Google</span>
                  </button>
                )}
              </div>

              {/* Security Notice */}
              {!isSigningIn && !isBooking && (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start">
                    <Shield size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-gray-600">
                      <p className="font-medium text-gray-700 mb-1">Your privacy is protected</p>
                      <p>We only use your email to send booking confirmations and meeting details. Your information is never shared with third parties.</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Success State */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
              <p className="text-gray-600 mb-4">
                Your strategy session with Matthew Mee is confirmed for {getDateName(selectedDate)} at {selectedTime}.
              </p>
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <p className="text-sm text-green-700">
                  📧 Confirmation email sent<br/>
                  📅 Calendar invite added<br/>
                  🔗 Zoom link will be provided 15 minutes before the meeting
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoogleSignIn;