export class CreateRecipeCommand {
  constructor(
    public title: string,
    public from: string,
    public description: string,
    public value: number,
    public receivedAt: Date,
  ) {}
}
