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

exports.formatDate = formatDate;
