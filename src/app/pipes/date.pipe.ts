import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    const monthNames = [
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

    const dateObj = new Date(value);

    let hours = String(dateObj.getHours());
    hours = ('0' + hours).slice(-2);
    let minutes = String(dateObj.getMinutes());
    minutes = ('0' + minutes).slice(-2);
    let date = String(dateObj.getDate());
    date = ('0' + date).slice(-2);

    const modifiedDate = `${hours}:${minutes} ${date}. ${
      monthNames[dateObj.getMonth()]
    } ${dateObj.getFullYear()}`;

    return modifiedDate;
  }
}
