export const formatDate = (date: string | Date, options: Intl.DateTimeFormatOptions = {}): string => {
  return new Date(date).toLocaleDateString("pt-BR", options);
};

export const formatTime = (date: string | Date): string => {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getLocalDateString = (date?: Date): string => {
  const now = date || new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getLocalTimeString = (date?: Date): string => {
  const now = date || new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const formatToBrazilianDateTime = (isoString: string): string => {
  if (!isoString) return '';
  
  try {
    const date = new Date(isoString);
    
    if (isNaN(date.getTime())) {
      return '';
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  } catch {
    return '';
  }
};

export const formatDateTime = (date: string | Date) => {
  return {
    date: formatDate(date),
    time: formatTime(date),
  };
};

export const formatDateTimeIso = (dateIso: string): string => {
  const dateOnly = dateIso.split("T")[0];
  const timeOnly = dateIso.split("T")[1].split(".")[0];
  return dateOnly + "T" + timeOnly + "-03:00";
};

export const isToday = (date: string | Date): boolean => {
  return new Date(date).toDateString() === new Date().toDateString();
};

export const isDateInFuture = (date: string | Date): boolean => {
  const selectedDate = new Date(date);
  const today = new Date();
  return selectedDate > today;
};

export const getDateString = (date: string | Date): string => {
  return new Date(date).toISOString().split("T")[0];
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
};