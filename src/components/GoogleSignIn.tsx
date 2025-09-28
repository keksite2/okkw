import React, { useState } from 'react';
import { X, Calendar, Clock, Video, User, Mail, Phone, MessageSquare } from 'lucide-react';

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    setTimeout(() => {
      onBookingComplete();
      onClose();
    }, 2000);
  };

  const getDateName = (date: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = date === 22 ? 1 : 2;
    return `${days[dayIndex]}, July ${date}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Complete Your Booking</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar size={32} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
            <p className="text-gray-600 mb-4">
              Your meeting has been scheduled for {getDateName(selectedDate)} at {selectedTime}
            </p>
            <p className="text-sm text-gray-500">
              You'll receive a confirmation email with the meeting details shortly.
            </p>
          </div>
        ) : (
          <>
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

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User size={16} className="inline mr-1" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail size={16} className="inline mr-1" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare size={16} className="inline mr-1" />
                  Additional Notes
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Anything you'd like us to know before the meeting?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Scheduling...' : 'Schedule Meeting'}
              </button>
            </form>

            <div className="px-6 pb-6">
              <p className="text-xs text-gray-500 text-center">
                By scheduling this meeting, you agree to our terms of service and privacy policy.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GoogleSignIn;