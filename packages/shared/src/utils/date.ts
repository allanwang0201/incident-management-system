import { format, parseISO, formatDistanceToNow } from 'date-fns';

export const formatDateTime = (datetime: string): string => {
  try {
    const date = parseISO(datetime);
    return format(date, 'M/d/yyyy, h:mm:ss a');
  } catch (error) {
    console.error('Error formatting date:', error);
    return datetime;
  }
};

export const formatDateTimeShort = (datetime: string): string => {
  try {
    const date = parseISO(datetime);
    return format(date, 'M/d/yyyy, h:mm a');
  } catch (error) {
    console.error('Error formatting date:', error);
    return datetime;
  }
};

export const formatRelativeTime = (datetime: string): string => {
  try {
    const date = parseISO(datetime);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return datetime;
  }
};

export const formatDate = (datetime: string): string => {
  try {
    const date = parseISO(datetime);
    return format(date, 'MMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return datetime;
  }
};

export const formatTime = (datetime: string): string => {
  try {
    const date = parseISO(datetime);
    return format(date, 'h:mm:ss a');
  } catch (error) {
    console.error('Error formatting time:', error);
    return datetime;
  }
};
