import {Udogodnienie} from './udogodnienie.model';
import {Rezerwacja} from './rezerwacja.model';

export class Sala {
  constructor(
    public id: number,
    public nazwa: string,
    public pojemnosc: number,
    public udogodnienia: Udogodnienie[],
    public rezerwacje: Rezerwacja[]
  ) {}
}
