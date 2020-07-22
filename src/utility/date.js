export const addLeadingZero = (num) => {
  return num <= 9 ? "0" + num : num;
};

export const clientDateTime = (timestamp) => {
  var date_time = new Date(timestamp * 1000);
  var curr_hour = date_time.getHours();
  var zero_added_curr_hour = addLeadingZero(curr_hour);
  var curr_min = date_time.getMinutes();
  var curr_sec = date_time.getSeconds();
  var curr_time = zero_added_curr_hour + ":" + curr_min + ":" + curr_sec;
  return curr_time;
};
