import {ChangeDetectorRef, NgZone, OnDestroy, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timeAgo',
  pure: false
})
export class TimeAgoPipe implements PipeTransform, OnDestroy {
  private timer: number | null;

  constructor(private ngZone: NgZone,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  transform(value: string| undefined): string {
    this.removeTimer();
    const d = new Date(value || new Date());
    const now = new Date();
    /*
     // Obtenemos el desplazamiento de la zona horaria local en minutos
     const timeZoneOffset = now.getTimezoneOffset();
     // Ajustamos la fecha dada para que coincida con la zona horaria local
     const localDate = new Date(d.getTime() - timeZoneOffset * 60 * 1000);
     */
    const seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
    const timeToUpdate = (Number.isNaN(seconds)) ? 1000 : this.getSecondsUntilUpdate(seconds) * 1000;
    this.timer = this.ngZone.runOutsideAngular(() => {
      if (typeof window !== 'undefined') {
        return window.setTimeout(() => {
          this.ngZone.run(() => this.changeDetectorRef.markForCheck());
        }, timeToUpdate);
      }
      return null;
    });
    const minutes = Math.round(Math.abs(seconds / 60));
    const hours = Math.round(Math.abs(minutes / 60));
    const days = Math.round(Math.abs(hours / 24));
    const months = Math.round(Math.abs(days / 30.416));
    const years = Math.round(Math.abs(days / 365));
    if (Number.isNaN(seconds)) {
      return '';
    } else if (seconds <= 45) {
      return 'alguns segundos atrás';
    } else if (seconds <= 90) {
      return 'um minuto atrás';
    } else if (minutes <= 45) {
      return minutes + ' minutos atrás';
    } else if (minutes <= 90) {
      return 'uma hora atrás';
    } else if (hours <= 22) {
      return hours + ' horas atrás';
    } else if (hours <= 36) {
      return 'um dia atrás';
    } else if (days <= 25) {
      return days + ' dias atrás';
    } else if (days <= 45) {
      return 'um mês atrás';
    } else if (days <= 345) {
      return months + ' meses atrás';
    } else if (days <= 545) {
      return 'um ano atrás';
    } else { // (days > 545)
      return years + ' anos atrás';
    }
  }

  ngOnDestroy(): void {
    this.removeTimer();
  }

  private removeTimer(): void {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private getSecondsUntilUpdate(seconds: number): number {
    const min = 60;
    const hr = min * 60;
    const day = hr * 24;
    if (seconds < min) { // less than 1 min, update every 2 secs
      return 2;
    } else if (seconds < hr) { // less than an hour, update every 30 secs
      return 30;
    } else if (seconds < day) { // less then a day, update every 5 mins
      return 300;
    } else { // update every hour
      return 3600;
    }
  }
}
