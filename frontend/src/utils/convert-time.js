// Function to convert 24-hour format time to 12-hour format with meridiem
const convertTime = (time) => {
  // Splitting the input time into hours and minutes
  const timeParts = time.split(":");
  
  // Extracting hours and minutes from the timeParts array
  let hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);

  // Setting the default meridiem to "am"
  let meridiem = "AM";

  // Checking if the hours are greater than or equal to 12
  if (hours >= 12) {
    // If true, set meridiem to "pm"
    meridiem = "PM";

    // If hours are greater than 12, convert to 12-hour format
    if (hours > 12) {
      hours = 12;
    }
  }

  // Returning the formatted time in 12-hour format with leading zeros for single-digit minutes
  return (
    hours.toString().padStart(2, "0") + ":" +
    minutes.toString().padStart(2, "0") +
    " " +
    meridiem
  );
};

// Exporting the convertTime function
export default convertTime;
