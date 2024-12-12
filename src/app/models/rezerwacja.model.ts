export class Rezerwacja {
  constructor(
    public id: number,
    public imie: string,
    public nazwisko: string,
    public email: string,
    public startDateTime: Date,
    public endDateTime: Date
  ) {}
}
