export class UpdateExpenseCommand {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly from: string,
    readonly description: string,
    public user_id: string,
    readonly value: number,
    readonly paidAt: Date,
  ) {}
}
