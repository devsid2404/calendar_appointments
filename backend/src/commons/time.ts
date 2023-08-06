

export const availabilityStart = {
    hour: 10,
    minute: 0
};

export const availabilityEnd = {
    hour: 17,
    minute: 30
};

export const slotDuration = {
    value: 30,
    unit: 'minutes'
}


export const getTimezoneOffsetString = (offsetMinutes) => {
    const sign = offsetMinutes < 0 ? '-' : '+';
    const hours = Math.floor(Math.abs(offsetMinutes) / 60);
    const minutes = Math.abs(offsetMinutes) % 60;
    return `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }


  export const getTimeStampAlongWithTimeZone = ({
    date, hour, minutes, offsetMinutes
}) => `${date} ${hour}:${minutes}:00 ${getTimezoneOffsetString(offsetMinutes)}`;