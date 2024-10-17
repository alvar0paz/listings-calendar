import React from 'react';

const CalendarDay = ({ day, onClick }) => {
  const dayClassName = `day${day.isToday ? ' today' : ''}${
    day.tours?.length > 0 ? ' available' : ''
  }`;

  const displayDate = day.date instanceof Date ? day.date.getDate() : '';

  return (
    <div className={dayClassName} onClick={onClick}>
      {displayDate}
    </div>
  );
};

export default CalendarDay;
