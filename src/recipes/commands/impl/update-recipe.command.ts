export class UpdateRecipeCommand {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly from: string,
    readonly description: string,
    readonly value: number,
    readonly receivedAt: Date,
  ) {}
}
