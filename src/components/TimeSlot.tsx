import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';

interface TimeSlotProps {
  time: string;
  isSelected: boolean;
  isBooked?: boolean;
  isPast?: boolean;
  onClick: () => void;
  onConfirm?: () => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ 
  time, 
  isSelected, 
  isBooked = false, 
  isPast = false,
  onClick,
  onConfirm
}) => {
  if (isBooked) {
    return (
      <div className="w-full p-4 text-center border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-100 opacity-50"></div>
        <div className="relative flex items-center justify-center">
          <Clock size={16} className="mr-2" />
          <span className="font-medium">{time}</span>
          <span className="ml-2 text-xs bg-gray-300 text-gray-600 px-2 py-1 rounded-full">Booked</span>
        </div>
      </div>
    );
  }

  if (isPast) {
    return (
      <div className="w-full p-4 text-center border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed">
        <div className="flex items-center justify-center">
          <Clock size={16} className="mr-2" />
          <span className="font-medium">{time}</span>
          <span className="ml-2 text-xs bg-gray-300 text-gray-600 px-2 py-1 rounded-full">Past</span>
        </div>
      </div>
    );
  }

  if (isSelected) {
    return (
      <div className="w-full p-4 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg border-2 border-indigo-500 transform scale-105 transition-all duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle size={18} className="mr-2" />
            <span className="font-semibold">{time}</span>
          </div>
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 backdrop-blur-sm">
            <span onClick={onConfirm}>Confirm</span>
          </button>
        </div>
        <div className="mt-2 text-xs text-indigo-100">
          30 min • Zoom meeting link will be sent
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-full p-4 text-center border-2 border-indigo-200 rounded-xl text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 hover:shadow-md transition-all duration-200 group hover:scale-102"
    >
      <div className="flex items-center justify-center">
        <Clock size={16} className="mr-2 group-hover:text-indigo-700" />
        <span className="font-semibold group-hover:text-indigo-700">{time}</span>
      </div>
      <div className="mt-1 text-xs text-gray-500 group-hover:text-indigo-500">
        Available
      </div>
    </button>
  );
};

export default TimeSlot;