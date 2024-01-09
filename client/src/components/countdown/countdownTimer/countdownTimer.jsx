// Importing the required React libraries and the associated styles
import React, { useEffect, useRef, useState } from 'react';
import './countdownTimer.scss';
import CountDownCard from './../countdowncard/countdown';

const CountDownTimer = () => {
  // References for the countdown cards to handle animations
  const SecondsCardRef = useRef(null);
  const MinutesCardRef = useRef(null);
  const HoursCardRef = useRef(null);
  const DaysCardRef = useRef(null);
  
  // States for tracking the countdown time units: days, hours, minutes, and seconds
  const [days, setDays] = useState(14);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Effect for handling seconds and minutes countdown logic
  useEffect(() => {
    seconds === 0 && setSeconds(59);             // Reset seconds when they reach zero
    minutes === 0 && setMinutes(59);             // Reset minutes when they reach zero
    if (seconds > 0) {
      setTimeout(() => {
        setSeconds(seconds - 1);                 // Decrease seconds count
        SecondsCardRef.current.classList.toggle('rotate');   // Rotate animation for the seconds card
      }, 1000);
    }
    if (seconds === 0 && minutes > 0) {
      setMinutes(minutes - 1);                   // Decrease minutes count when seconds reach zero
      MinutesCardRef.current.classList.toggle('rotate');     // Rotate animation for the minutes card
    }
  }, [seconds, minutes]);

  // Effect for handling minutes and hours countdown logic
  useEffect(() => {
    hours === 0 && setHours(23);                 // Reset hours when they reach zero
    if (minutes === 0 && hours > 0) {
      setHours
      (hours - 1); // Decrease hours count when minutes reach zero
      HoursCardRef.current.classList.toggle('rotate'); // Rotate animation for the hours card
      }
      }, [minutes, hours]);
      
      // Effect for handling hours and days countdown logic
      useEffect(() => {
      days === 14 && setDays(13); // Initialize days to 13 if they start at 14
      if (hours === 0 && days > 0) {
      setDays(days - 1); // Decrease days count when hours reach zero
      DaysCardRef.current.classList.toggle('rotate'); // Rotate animation for the days card
      }
      }, [hours, days]);
      
      // Render the countdown timer with its individual cards for days, hours, minutes, and seconds
      return (
      <div className="countdown__container">
      <CountDownCard
           label="days"
           number={days}
           cardRef={DaysCardRef}
         />
      <CountDownCard
           label="hours"
           number={hours}
           cardRef={HoursCardRef}
         />
      <CountDownCard
           label="minutes"
           number={minutes}
           cardRef={MinutesCardRef}
         />
      <CountDownCard
           label="seconds"
           number={seconds}
           cardRef={SecondsCardRef}
         />
      </div>
      );
      };
      
      // Export the CountDownTimer component for use in other parts of the app
      export default CountDownTimer;