import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD';

const isBefore = (date: string, dateToCompare: string): boolean => {
  return moment(date, DATE_FORMAT).isBefore(dateToCompare);
};

const isBeforeOrEqual = (date: string, dateToCompare: string): boolean => {
  return moment(date, DATE_FORMAT).isSameOrBefore(dateToCompare);
};

const isAfter = (date: string, dateToCompare: string): boolean => {
  return moment(date, DATE_FORMAT).isAfter(dateToCompare);
};

const isAfterOrEqual = (date: string, dateToCompare: string): boolean => {
  return moment(date, DATE_FORMAT).isSameOrAfter(dateToCompare);
};

const isSame = (date: string, dateToCompare: string): boolean => {
  return moment(date, DATE_FORMAT).isSame(dateToCompare);
};

const isSameOrBefore = (date: string, dateToCompare: string): boolean => {
  return moment(date, DATE_FORMAT).isSameOrBefore(dateToCompare);
};

const isSameOrAfter = (date: string, dateToCompare: string): boolean => {
  return moment(date, DATE_FORMAT).isSameOrAfter(dateToCompare);
};

const isBetween = (
  date: string,
  dateToCompare: string,
  dateToCompare2: string,
): boolean => {
  return moment(date, DATE_FORMAT).isBetween(dateToCompare, dateToCompare2);
};

const isBetweenOrEqual = (
  date: string,
  dateToCompare: string,
  dateToCompare2: string,
): boolean => {
  return moment(date, DATE_FORMAT).isBetween(
    dateToCompare,
    dateToCompare2,
    null,
    '[]',
  );
};

export {
  isBefore,
  isBeforeOrEqual,
  isAfter,
  isAfterOrEqual,
  isSame,
  isSameOrBefore,
  isSameOrAfter,
  isBetween,
  isBetweenOrEqual,
};
