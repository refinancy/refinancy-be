export class CreateExpenseCommand {
  constructor(
    public title: string,
    public from: string,
    public description: string,
    public user_id: string,
    public value: number,
  ) {}
}
