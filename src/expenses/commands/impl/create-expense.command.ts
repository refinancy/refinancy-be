export class CreateExpenseCommand {
  constructor(
    public title: string,
    public from: string,
    public description: string,
    public value: number,
    public paidAt: Date,
  ) {}
}
