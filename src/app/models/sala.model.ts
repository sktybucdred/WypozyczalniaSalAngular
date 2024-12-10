import {Udogodnienie} from './udogodnienie.model';

export class Sala {
  constructor(
    public id: number,
    public nazwa: string,
    public pojemnosc: number,
    public udogodnienia: Udogodnienie[],
  ) {}
}
