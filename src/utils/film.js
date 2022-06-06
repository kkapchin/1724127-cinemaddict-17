import dayjs from 'dayjs';

export const getDuration = (minutes) => {
  const duration = dayjs().hour(0).minute(minutes);
  if(minutes > 59) {
    return `${duration.format('h')}h ${duration.format('mm')}m`;
  }

  if(minutes < 10) {
    return `${duration.format('m')}m`;
  }

  return `${duration.format('mm')}m`;
};
