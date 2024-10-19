import { Type } from '@angular/core';

export interface Category {
  id: number;
  name: string;
  svgComponent: Type<any>;
}
