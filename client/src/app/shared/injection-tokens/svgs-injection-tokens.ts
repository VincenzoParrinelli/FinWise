import { InjectionToken } from '@angular/core';

export const CLASSNAMES_TOKEN = new InjectionToken<string>('classNames', {
  providedIn: 'root',
  factory: () => '',
});
export const WIDTH_TOKEN = new InjectionToken<string>('width', {
  providedIn: 'root',
  factory: () => '50',
});
export const HEIGHT_TOKEN = new InjectionToken<string>('height', {
  providedIn: 'root',
  factory: () => '50',
});
export const FILL_TOKEN = new InjectionToken<string>('fill', {
  providedIn: 'root',
  factory: () => '#6DB6FE',
});
export const STROKE_TOKEN = new InjectionToken<string>('stroke', {
  providedIn: 'root',
  factory: () => '#F1FFF3',
});
