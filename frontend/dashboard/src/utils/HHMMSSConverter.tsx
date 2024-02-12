export default function TimeFormatter(time: any) {
    const obj = new Date(time);
    const hrs = obj.getHours();
    const mins = obj.getMinutes();
    const secs = obj.getSeconds();
    const timeString =
      hrs.toString().padStart(2, "0") +
      ":" +
      mins.toString().padStart(2, "0") +
      ":" +
      secs.toString().padStart(2, "0");
    return timeString;
  }