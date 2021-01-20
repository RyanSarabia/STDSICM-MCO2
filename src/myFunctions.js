const formatDate = (refDate) => {
  const oldDate = new Date(refDate);
  let newDate = oldDate.getMonth() + 1 < 10 ? `0${oldDate.getMonth() + 1}` : oldDate.getMonth() + 1;
  newDate += '/';
  newDate += oldDate.getDate() < 10 ? `0${oldDate.getDate()}` : oldDate.getDate();
  newDate += '/';
  newDate += oldDate.getFullYear();
  newDate += ' | ';
  newDate += oldDate.getHours() < 10 ? `0${oldDate.getHours()}` : oldDate.getHours();
  newDate += ':';
  newDate += oldDate.getMinutes() < 10 ? `0${oldDate.getMinutes()}` : oldDate.getMinutes();
  newDate += ':';
  newDate += oldDate.getSeconds() < 10 ? `0${oldDate.getSeconds()}` : oldDate.getSeconds();

  return newDate;
};

const diffMinutes = (dt2, dt1) => {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
};

exports.formatDate = formatDate;
exports.diffMinutes = diffMinutes;
