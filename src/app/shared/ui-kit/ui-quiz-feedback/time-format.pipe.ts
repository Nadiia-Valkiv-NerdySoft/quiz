import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true,
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (!value || value <= 0) {
      return '0 sec';
    }

    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);

    const minutePart = minutes > 0 ? `${minutes} min` : '';
    const secondPart = seconds > 0 ? `${seconds} sec` : '';

    return [ minutePart, secondPart ].filter(part => part).join(' ');
  }
}
