import {
  format,
  parseISO,
  isToday as isTodayFns,
  isFuture,
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  startOfWeek,
  endOfWeek,
  differenceInDays,
  isValid,
  formatISO,
  parse,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Format date to Brazilian format
export const formatDate = (
  date: string | Date,
  formatString: string = 'dd/MM/yyyy'
): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    return format(dateObj, formatString, { locale: ptBR });
  } catch {
    return '';
  }
};

// Format time
export const formatTime = (
  date: string | Date,
  formatString: string = 'HH:mm'
): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    return format(dateObj, formatString, { locale: ptBR });
  } catch {
    return '';
  }
};

// Format date and time together
export const formatDateTime = (
  date: string | Date,
  formatString: string = 'dd/MM/yyyy HH:mm'
): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    return format(dateObj, formatString, { locale: ptBR });
  } catch {
    return '';
  }
};

// Format to Brazilian date and time with seconds
export const formatToBrazilianDateTime = (isoString: string): string => {
  if (!isoString) return '';
  
  try {
    const date = parseISO(isoString);
    if (!isValid(date)) return '';
    return format(date, 'dd/MM/yyyy HH:mm:ss', { locale: ptBR });
  } catch {
    return '';
  }
};

// Get local date string for input[type="date"]
export const getLocalDateString = (date?: Date): string => {
  const dateObj = date || new Date();
  return format(dateObj, 'yyyy-MM-dd');
};

// Get local time string for input[type="time"]
export const getLocalTimeString = (date?: Date): string => {
  const dateObj = date || new Date();
  return format(dateObj, 'HH:mm');
};

// Format date to ISO string with timezone
export const formatDateTimeIso = (dateTimeString: string): string => {
  try {
    // Parse the datetime string (format: YYYY-MM-DDTHH:mm:ss)
    const date = parse(dateTimeString, "yyyy-MM-dd'T'HH:mm:ss", new Date());
    if (!isValid(date)) return dateTimeString;
    
    // Format to ISO with Brazilian timezone offset
    return formatISO(date).replace('Z', '-03:00');
  } catch {
    return dateTimeString;
  }
};

// Check if date is today
export const isToday = (date: string | Date): boolean => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return false;
    return isTodayFns(dateObj);
  } catch {
    return false;
  }
};

// Check if date is in the future
export const isDateInFuture = (date: string | Date): boolean => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return false;
    return isFuture(dateObj);
  } catch {
    return false;
  }
};

// Get date string (YYYY-MM-DD format)
export const getDateString = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    return format(dateObj, 'yyyy-MM-dd');
  } catch {
    return '';
  }
};

// Get greeting based on time of day
export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
};

// Get start of day
export const getStartOfDay = (date: string | Date): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return startOfDay(dateObj);
};

// Get end of day
export const getEndOfDay = (date: string | Date): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return endOfDay(dateObj);
};

// Get date range for analytics
export const getDateRange = (days: number): { start: Date; end: Date } => {
  const end = new Date();
  const start = subDays(end, days - 1);
  
  return {
    start: startOfDay(start),
    end: endOfDay(end),
  };
};

// Get week range
export const getWeekRange = (date?: Date): { start: Date; end: Date } => {
  const baseDate = date || new Date();
  
  return {
    start: startOfWeek(baseDate, { locale: ptBR }),
    end: endOfWeek(baseDate, { locale: ptBR }),
  };
};

// Calculate days difference
export const getDaysDifference = (date1: string | Date, date2: string | Date): number => {
  try {
    const dateObj1 = typeof date1 === 'string' ? parseISO(date1) : date1;
    const dateObj2 = typeof date2 === 'string' ? parseISO(date2) : date2;
    
    if (!isValid(dateObj1) || !isValid(dateObj2)) return 0;
    
    return differenceInDays(dateObj1, dateObj2);
  } catch {
    return 0;
  }
};

// Format relative time (e.g., "2 days ago", "today", "tomorrow")
export const formatRelativeTime = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    
    const today = new Date();
    const daysDiff = differenceInDays(dateObj, today);
    
    if (daysDiff === 0) return 'Hoje';
    if (daysDiff === 1) return 'Amanhã';
    if (daysDiff === -1) return 'Ontem';
    if (daysDiff > 1) return `Em ${daysDiff} dias`;
    if (daysDiff < -1) return `${Math.abs(daysDiff)} dias atrás`;
    
    return formatDate(dateObj);
  } catch {
    return '';
  }
};

// Parse date from various formats
export const parseDate = (dateString: string, formatString?: string): Date | null => {
  try {
    if (formatString) {
      const parsed = parse(dateString, formatString, new Date());
      return isValid(parsed) ? parsed : null;
    }
    
    // Try ISO format first
    const isoDate = parseISO(dateString);
    if (isValid(isoDate)) return isoDate;
    
    // Try other common formats
    const formats = [
      'dd/MM/yyyy',
      'dd/MM/yyyy HH:mm',
      'dd/MM/yyyy HH:mm:ss',
      'yyyy-MM-dd',
      'yyyy-MM-dd HH:mm',
      'yyyy-MM-dd HH:mm:ss',
    ];
    
    for (const fmt of formats) {
      const parsed = parse(dateString, fmt, new Date());
      if (isValid(parsed)) return parsed;
    }
    
    return null;
  } catch {
    return null;
  }
};

// Check if date is valid
export const isValidDate = (date: string | Date): boolean => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj);
  } catch {
    return false;
  }
};

// Format date for display in different contexts
export const formatDateForContext = (
  date: string | Date,
  context: 'short' | 'medium' | 'long' | 'full' = 'medium'
): string => {
  const formats = {
    short: 'dd/MM',
    medium: 'dd/MM/yyyy',
    long: 'dd \'de\' MMMM \'de\' yyyy',
    full: 'EEEE, dd \'de\' MMMM \'de\' yyyy',
  };
  
  return formatDate(date, formats[context]);
};

// Get calendar month data
export const getCalendarMonth = (date: Date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  // Start from Sunday of the week containing the first day
  const startDate = startOfWeek(firstDay, { weekStartsOn: 0 });
  
  const days: Date[] = [];
  let currentDate = new Date(startDate);
  
  // Generate 42 days (6 weeks) for calendar grid
  for (let i = 0; i < 42; i++) {
    days.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  
  return {
    days,
    firstDay,
    lastDay,
    monthName: format(date, 'MMMM yyyy', { locale: ptBR }),
  };
};