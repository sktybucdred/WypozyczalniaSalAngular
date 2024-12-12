export class Rezerwacja {
  constructor(
    public id: number,
    public salaId: number,
    public imie: string,
    public nazwisko: string,
    public startDateTime: string,
    public endDateTime: string,
  ) {}
}
