export class UpdateCashflowCommand {
  constructor(
    public id: string,
    public description: string,
    public user_id: string,
    public total_recipe_amount: number,
    public total_expense_amount: number,
    public total: number,
    public startedAt: Date,
    public endedAt: Date,
  ) {}
}
