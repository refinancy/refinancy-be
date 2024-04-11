export class UpdateExpenseCommand {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly from: string,
    readonly description: string,
    readonly value: number,
    readonly paidAt: Date,
  ) {}
}
