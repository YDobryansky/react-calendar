import moment from 'moment';

moment.updateLocale('en', {
  week: {
    dow: 1, // Start of the week on Monday
  },
});

export const getWeekStartDate = date => {
  const dateCopy = new Date(date);
  const dayOfWeek = dateCopy.getDay();
  const difference = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  dateCopy.setDate(dateCopy.getDate() + difference);
  return new Date(dateCopy.getFullYear(), dateCopy.getMonth(), dateCopy.getDate());
};

export const generateWeekRange = startDate => {
  const result = [];
  for (let i = 0; i < 7; i++) {
    const base = new Date(startDate);
    base.setDate(base.getDate() + i);
    result.push(new Date(base));
  }
  return result;
};

export const getDateTime = (date, time) => {
  const [hours, minutes] = time.split(':').map(Number);
  const resultDate = new Date(date);
  resultDate.setHours(hours, minutes);
  return resultDate;
};

export const formatMins = mins => (mins < 10 ? `0${mins}` : mins);

export const getDisplayMonth = date => {
  const startWeek = moment(date).startOf('week');
  const endWeek = moment(date).endOf('week');
  const startMonth = startWeek.format('MMMM');
  const startYear = startWeek.format('YYYY');
  const endMonth = endWeek.format('MMMM');
  const endYear = endWeek.format('YYYY');

  if (startMonth === endMonth) {
    return `${startMonth} ${startYear}`;
  }

  return startYear === endYear
    ? `${startMonth}-${endMonth} ${startYear}`
    : `${startMonth} ${startYear}-${endMonth} ${endYear}`;
};

export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
