import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  selectedDate: number;
  onDateSelect: (date: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(6); // July = 6 (0-indexed)
  const [currentYear, setCurrentYear] = useState(2024);
  
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const daysInPrevMonth = getDaysInMonth(currentMonth - 1, currentYear);
    
    const days = [];
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: daysInPrevMonth - i,
        isCurrentMonth: false,
        isAvailable: false
      });
    }
    
    // Current month days
    for (let date = 1; date <= daysInMonth; date++) {
      const dayOfWeek = new Date(currentYear, currentMonth, date).getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const isPast = currentMonth === 6 && currentYear === 2024 && date < 22; // July 22 is today
      
      days.push({
        date,
        isCurrentMonth: true,
        isAvailable: !isWeekend && !isPast
      });
    }
    
    // Next month days to fill the grid
    const remainingDays = 42 - days.length;
    for (let date = 1; date <= remainingDays; date++) {
      days.push({
        date,
        isCurrentMonth: false,
        isAvailable: false
      });
    }
    
    return days;
  };
  
  const calendarDays = generateCalendarDays();

  const isToday = (date: number) => {
    return date === 22 && currentMonth === 6 && currentYear === 2024; // July 22 is today
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200 group"
        >
          <ChevronLeft size={20} className="text-gray-600 group-hover:text-gray-900" />
        </button>
        <h3 className="font-bold text-lg text-gray-900">{months[currentMonth]} {currentYear}</h3>
        <button 
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200 group"
        >
          <ChevronRight size={20} className="text-gray-600 group-hover:text-gray-900" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <button
            key={index}
            onClick={() => day.isCurrentMonth && day.isAvailable && onDateSelect(day.date)}
            disabled={!day.isCurrentMonth || !day.isAvailable}
            className={`
              h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200 relative
              ${!day.isCurrentMonth 
                ? 'text-gray-300 cursor-not-allowed' 
                : day.isAvailable
                  ? selectedDate === day.date
                    ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 hover:scale-105'
                  : 'text-gray-400 cursor-not-allowed'
              }
              ${isToday(day.date) && day.isCurrentMonth ? 'ring-2 ring-indigo-600 ring-offset-2' : ''}
            `}
          >
            {day.date}
            {isToday(day.date) && day.isCurrentMonth && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-indigo-600 rounded-full mr-2"></div>
            <span className="text-gray-600">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
            <span className="text-gray-600">Unavailable</span>
          </div>
        </div>
        <div className="text-gray-500">
          {calendarDays.filter(day => day.isCurrentMonth && day.isAvailable).length} days available
        </div>
      </div>
    </div>
  );
};

export default Calendar;