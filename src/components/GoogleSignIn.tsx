import React from 'react';
import { X, Calendar, Clock, Video, MapPin, User, Mail, Phone } from 'lucide-react';

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
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGoogleSignIn = () => {
    setIsSubmitting(true);
    // Redirect to Google OAuth
    window.location.href = '/google/';
  };

  const handleManualBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsSubmitting(false);
      onBookingComplete();
      alert('Booking confirmed! You will receive a confirmation email shortly.');
    }, 2000);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentDate = new Date();
  const selectedMonth = monthNames[currentDate.getMonth()];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Confirm Your Booking</h2>
            <p className="text-sm text-gray-600">Complete your appointment details</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Booking Summary */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Calendar size={18} className="mr-2 text-indigo-600" />
            Client Strategy Session
          </h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-700">
              <Clock size={16} className="mr-2 text-indigo-600" />
              <span>{selectedMonth} {selectedDate} at {selectedTime}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Video size={16} className="mr-2 text-indigo-600" />
              <span>30 minutes via Zoom</span>
            </div>
            <div className="flex items-center text-gray-700">
              <MapPin size={16} className="mr-2 text-indigo-600" />
              <span>Remote Session</span>
            </div>
          </div>
        </div>

        {/* Google Sign In Option */}
        <div className="p-6 border-b border-gray-200">
          <button
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {isSubmitting ? 'Redirecting...' : 'Continue with Google'}
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">
            Quick and secure booking with your Google account
          </p>
        </div>

        {/* Manual Form */}
        <div className="p-6">
          <div className="text-center mb-4">
            <span className="text-sm text-gray-500">Or fill out manually</span>
          </div>
          
          <form onSubmit={handleManualBooking} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <User size={16} className="inline mr-1" />
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Mail size={16} className="inline mr-1" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Phone size={16} className="inline mr-1" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Any specific topics you'd like to discuss?"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.email}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Booking...' : 'Confirm Booking'}
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            By booking, you agree to receive meeting reminders and updates via email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoogleSignIn;