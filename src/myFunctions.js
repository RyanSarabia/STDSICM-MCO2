const formatDate = (refDate) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const oldDate = new Date(refDate);

  let newDate = months[oldDate.getMonth()];
  newDate += ' ';
  newDate += oldDate.getDate() < 10 ? `0${oldDate.getDate()}` : oldDate.getDate();
  newDate += ' ';
  newDate += oldDate.getFullYear();
  newDate += ' ';
  newDate += oldDate.getHours() % 12 === 0 ? 12 : oldDate.getHours() % 12;
  newDate += ':';
  newDate += oldDate.getMinutes() < 10 ? `0${oldDate.getMinutes()}` : oldDate.getMinutes();
  newDate += ':';
  newDate += oldDate.getSeconds() < 10 ? `0${oldDate.getSeconds()}` : oldDate.getSeconds();
  newDate += oldDate.getHours() >= 12 ? ' pm' : ' am';

  return newDate;
};

const diffMinutes = (dt2, dt1) => {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
};

exports.formatDate = formatDate;
exports.diffMinutes = diffMinutes;
