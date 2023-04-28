import moment from 'moment';

export function formatDate(date) {
  if(!date){
    return '';
  }
    return moment(date).format('YYYY-MM-DD');
}


export function truncateText(text = '', maxLength = 30) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}