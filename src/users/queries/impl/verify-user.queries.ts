export class VerifyUserQuery {
  constructor(
    public email?: string,
    public password?: string,
    public user_id?: string,
  ) {}
}
