export class CreateCashflowCommand {
  constructor(
    public description: string,
    public user_id: string,
    public startedAt: Date,
    public endedAt: Date,
  ) {}
}
