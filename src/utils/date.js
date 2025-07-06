export const formatDate = (date, options = {}) => {
  return new Date(date).toLocaleDateString("pt-BR", options);
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDateTime = (date) => {
  return {
    date: formatDate(date),
    time: formatTime(date),
  };
};

export const isToday = (date) => {
  return new Date(date).toDateString() === new Date().toDateString();
};

export const isDateInFuture = (date) => {
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate > today;
};

export const getDateString = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};
