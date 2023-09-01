export const convertToDateString = (date: string) => {
  if (date) {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.toLocaleString("en-US", { month: "long" });
    const year = newDate.getFullYear();
    return `${day} ${month} ${year}`;
  }
  return "No date";
};
