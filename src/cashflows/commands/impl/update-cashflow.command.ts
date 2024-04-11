export class UpdateCashflowCommand {
  constructor(
    readonly id: string,
    public description: string,
    public startedAt: Date,
    public endedAt: Date,
  ) {}
}
