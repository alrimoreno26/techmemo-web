import {Observable, tap} from 'rxjs';

export function confirmDialog<T>(accept?: () => void, reject?: () => void): (source$: Observable<T>) => Observable<T> {
  return source$ => source$.pipe(tap(v => v ? accept ? accept() : null : reject ? reject() : null));
}
