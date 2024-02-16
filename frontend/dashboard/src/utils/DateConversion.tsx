import { format } from "date-fns-tz";
export const DateConversion = (date: any) => {
  const conversionInDateFormat = new Date(date);
  const conversionInYYYYMMDD = format(conversionInDateFormat, "yyyy-MM-dd", {
    timeZone: "Asia/Kolkata",
  });
  return conversionInYYYYMMDD;
};
export const DateConversioninddMMMMyyyy = (date: any) => {
  const conversionInDateFormat = new Date(date);
  const conversionInYYYYMMDD = format(conversionInDateFormat, "dd MMMM yyyy", {
    timeZone: "Asia/Kolkata",
  });
  return conversionInYYYYMMDD;
};
