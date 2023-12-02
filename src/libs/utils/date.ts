import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const setTime = (value?: string) => (value ? dayjs(value) : dayjs());

export const isDayJs = (time: Dayjs) => dayjs.isDayjs(time);

export const currentDateStr = () => dayjs().format(DATETIME_FORMAT);
