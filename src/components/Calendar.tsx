import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  selectedDate: number;
  onDateSelect: (date: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState('July 2024');
  
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  // July 2024 calendar data with availability
  const calendarDays = [
    { date: 30, isCurrentMonth: false, isAvailable: false },
    { date: 1, isCurrentMonth: true, isAvailable: false },
    { date: 2, isCurrentMonth: true, isAvailable: true },
    { date: 3, isCurrentMonth: true, isAvailable: true },
    { date: 4, isCurrentMonth: true, isAvailable: false },
    { date: 5, isCurrentMonth: true, isAvailable: false },
    { date: 6, isCurrentMonth: true, isAvailable: false },
    { date: 7, isCurrentMonth: true, isAvailable: false },
    { date: 8, isCurrentMonth: true, isAvailable: true },
    { date: 9, isCurrentMonth: true, isAvailable: true },
    { date: 10, isCurrentMonth: true, isAvailable: true },
    { date: 11, isCurrentMonth: true, isAvailable: false },
    { date: 12, isCurrentMonth: true, isAvailable: false },
    { date: 13, isCurrentMonth: true, isAvailable: false },
    { date: 14, isCurrentMonth: true, isAvailable: false },
    { date: 15, isCurrentMonth: true, isAvailable: true },
    { date: 16, isCurrentMonth: true, isAvailable: true },
    { date: 17, isCurrentMonth: true, isAvailable: true },
    { date: 18, isCurrentMonth: true, isAvailable: false },
    { date: 19, isCurrentMonth: true, isAvailable: false },
    { date: 20, isCurrentMonth: true, isAvailable: false },
    { date: 21, isCurrentMonth: true, isAvailable: false },
    { date: 22, isCurrentMonth: true, isAvailable: true },
    { date: 23, isCurrentMonth: true, isAvailable: true },
    { date: 24, isCurrentMonth: true, isAvailable: true },
    { date: 25, isCurrentMonth: true, isAvailable: false },
    { date: 26, isCurrentMonth: true, isAvailable: false },
    { date: 27, isCurrentMonth: true, isAvailable: false },
    { date: 28, isCurrentMonth: true, isAvailable: false },
    { date: 29, isCurrentMonth: true, isAvailable: true },
    { date: 30, isCurrentMonth: true, isAvailable: true },
    { date: 31, isCurrentMonth: true, isAvailable: true },
    { date: 1, isCurrentMonth: false, isAvailable: false },
    { date: 2, isCurrentMonth: false, isAvailable: false },
    { date: 3, isCurrentMonth: false, isAvailable: false },
  ];

  const isToday = (date: number) => {
    return date === 22; // July 22 is today
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200 group">
          <ChevronLeft size={20} className="text-gray-600 group-hover:text-gray-900" />
        </button>
        <h3 className="font-bold text-lg text-gray-900">{currentMonth}</h3>
        <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200 group">
          <ChevronRight size={20} className="text-gray-600 group-hover:text-gray-900" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-xs font-bold text-gray-500 text-center py-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => {
          const isSelectedDate = selectedDate === day.date && day.isCurrentMonth;
          const isTodayDate = isToday(day.date) && day.isCurrentMonth;
          
          return (
            <button
              key={index}
              onClick={() => day.isCurrentMonth && day.isAvailable && onDateSelect(day.date)}
              disabled={!day.isCurrentMonth || !day.isAvailable}
              className={`
                relative w-10 h-10 text-sm rounded-xl flex items-center justify-center transition-all duration-200 font-medium
                ${day.isCurrentMonth 
                  ? day.isAvailable
                    ? isSelectedDate 
                      ? 'bg-indigo-600 text-white shadow-lg scale-105 ring-2 ring-indigo-300' 
                      : isTodayDate
                        ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-300 hover:bg-indigo-200'
                        : 'text-gray-900 hover:bg-indigo-50 hover:text-indigo-600 hover:scale-105'
                    : 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-200 cursor-not-allowed'
                }
              `}
            >
              {day.date}
              {day.isCurrentMonth && day.isAvailable && !isSelectedDate && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-indigo-400 rounded-full"></div>
              )}
              {isTodayDate && !isSelectedDate && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></div>
            <span className="text-gray-600">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
            <span className="text-gray-600">Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;