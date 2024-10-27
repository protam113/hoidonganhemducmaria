// src/components/CalendarCustom.js
import React from "react";
import CalendarComponent from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import CSS của react-calendar

export const CalendarCustom = () => {
  return (
    <div>
      {" "}
      <CalendarComponent
        className="custom-calendar rounded-lg py-3 shadow-md"
        locale="vi-VN"
      />
    </div>
  );
};

export default CalendarCustom;
