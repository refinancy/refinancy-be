export class CreateCashflowCommand {
  constructor(
    public description: string,
    public startedAt: Date,
    public endedAt: Date,
  ) {}
}
