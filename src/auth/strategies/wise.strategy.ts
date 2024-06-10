import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WiseStrategy extends PassportStrategy(Strategy, 'wise') {
  constructor() {
    super({
      authorizationURL: process.env.WISE_AUTH_URL,
      tokenURL: process.env.WISE_TOKEN_URL,
      clientID: process.env.WISE_CLIENT_ID,
      clientSecret: process.env.WISE_CLIENT_SECRET,
      callbackURL: process.env.WISE_REDIRECT_URI,
    });
  }

  async validate(accessToken: string) {
    const { data } = await axios.get(`${process.env.WISE_API_URL}/v1/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    data.accessToken = accessToken;
    return data;
  }
}
