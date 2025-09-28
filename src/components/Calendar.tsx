import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';

interface CalendarProps {
  selectedDate: number;
  onDateSelect: (date: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(8); // September = 8 (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);
  const [today] = useState(new Date(2025, 8, 28)); // September 28, 2025
  
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

  const isDateAvailable = (date: number, month: number, year: number) => {
    const checkDate = new Date(year, month, date);
    const dayOfWeek = checkDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isPast = checkDate < today;
    
    return !isWeekend && !isPast;
  };

  const isToday = (date: number, month: number, year: number) => {
    return date === today.getDate() && 
           month === today.getMonth() && 
           year === today.getFullYear();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const daysInPrevMonth = getDaysInMonth(
      currentMonth === 0 ? 11 : currentMonth - 1, 
      currentMonth === 0 ? currentYear - 1 : currentYear
    );
    
    const days = [];
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const date = daysInPrevMonth - i;
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      
      days.push({
        date,
        month: prevMonth,
        year: prevYear,
        isCurrentMonth: false,
        isAvailable: false,
        isToday: false
      });
    }
    
    // Current month days
    for (let date = 1; date <= daysInMonth; date++) {
      days.push({
        date,
        month: currentMonth,
        year: currentYear,
        isCurrentMonth: true,
        isAvailable: isDateAvailable(date, currentMonth, currentYear),
        isToday: isToday(date, currentMonth, currentYear)
      });
    }
    
    // Next month days to fill the grid
    const remainingDays = 42 - days.length;
    for (let date = 1; date <= remainingDays; date++) {
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      
      days.push({
        date,
        month: nextMonth,
        year: nextYear,
        isCurrentMonth: false,
        isAvailable: false,
        isToday: false
      });
    }
    
    return days;
  };
  
  const calendarDays = generateCalendarDays();
  const availableDays = calendarDays.filter(day => day.isCurrentMonth && day.isAvailable).length;

  // Check if we can navigate to previous month (don't allow going to months before current date)
  const canNavigatePrev = () => {
    if (currentYear > today.getFullYear()) return true;
    if (currentYear === today.getFullYear() && currentMonth > today.getMonth()) return true;
    return false;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigateMonth('prev')}
          disabled={!canNavigatePrev()}
          className={`p-3 rounded-xl transition-all duration-200 ${
            canNavigatePrev() 
              ? 'hover:bg-indigo-50 hover:text-indigo-600 text-gray-600 hover:shadow-md' 
              : 'text-gray-300 cursor-not-allowed'
          }`}
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex items-center space-x-3">
          <CalendarIcon size={20} className="text-indigo-600" />
          <h3 className="font-bold text-xl text-gray-900">
            {months[currentMonth]} {currentYear}
          </h3>
        </div>
        
        <button 
          onClick={() => navigateMonth('next')}
          className="p-3 hover:bg-indigo-50 rounded-xl transition-all duration-200 text-gray-600 hover:text-indigo-600 hover:shadow-md"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-xs font-bold text-gray-500 py-3 bg-gray-50 rounded-lg">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {calendarDays.map((day, index) => (
          <button
            key={index}
            onClick={() => day.isCurrentMonth && day.isAvailable && onDateSelect(day.date)}
            disabled={!day.isCurrentMonth || !day.isAvailable}
            className={`
              h-12 w-12 rounded-xl text-sm font-semibold transition-all duration-300 relative group
              ${!day.isCurrentMonth 
                ? 'text-gray-300 cursor-not-allowed' 
                : day.isAvailable
                  ? selectedDate === day.date
                    ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg transform scale-110 ring-4 ring-indigo-200'
                    : 'text-gray-700 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 hover:scale-105 hover:shadow-md border-2 border-transparent hover:border-indigo-200'
                  : 'text-gray-400 cursor-not-allowed bg-gray-50'
              }
              ${day.isToday ? 'ring-2 ring-orange-400 ring-offset-2' : ''}
            `}
          >
            <span className="relative z-10">{day.date}</span>
            
            {/* Today indicator */}
            {day.isToday && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full border-2 border-white shadow-sm"></div>
            )}
            
            {/* Available indicator */}
            {day.isCurrentMonth && day.isAvailable && !day.isToday && (
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-green-400 rounded-full opacity-60 group-hover:opacity-100"></div>
            )}
          </button>
        ))}
      </div>

      {/* Legend and stats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm bg-gray-50 rounded-xl p-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full mr-2 shadow-sm"></div>
              <span className="text-gray-600 font-medium">Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
              <span className="text-gray-600 font-medium">Unavailable</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-400 rounded-full mr-2 shadow-sm"></div>
              <span className="text-gray-600 font-medium">Today</span>
            </div>
          </div>
          
          <div className="flex items-center text-indigo-600 font-semibold">
            <Clock size={16} className="mr-2" />
            <span>{availableDays} days available</span>
          </div>
        </div>

        {/* Current date info */}
        <div className="text-center p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
          <p className="text-sm text-gray-600">
            Today: <span className="font-semibold text-indigo-600">
              {today.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Calendar;