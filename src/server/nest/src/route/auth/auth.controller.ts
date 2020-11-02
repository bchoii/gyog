import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Request,
  Response,
} from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { sign } from 'jsonwebtoken';
import { default as fetch } from 'node-fetch';
import { Role } from '../../../entities2/User';
import { secret } from '../../secret.json';
import { AuthService } from './auth.service';

const cookieoptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 8 * 60 * 60 * 1000, // 8 hours
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async login(email, response) {
    const user = await this.authService.get(email);
    console.log({ user });
    if (user?.roles.includes(Role.Verified)) {
      await this.authService.login(user);
      response.cookie(
        'session',
        sign({ session: user.session }, secret, { expiresIn: '8h' }),
        cookieoptions,
      );
    }
    // if (user?.roles.includes(Role.Administrator)) {
    //   return response.json({ url: '/admin' });
    // }
    // if (user?.roles.includes(Role.Queue)) {
    //   return response.json({ url: '/agent' });
    // }
    return response.json({ url: '/' });
  }

  @Post('mobile')
  async mobile(@Body() body) {
    try {
      console.log('login mobile');
      console.log(body);
      return 'Check your sms.';
    } catch (error) {
      console.error(error);
    }
  }

  @Post('glogin')
  async glogin(@Body() body, @Response() response) {
    try {
      const { idToken } = body;
      const CLIENT_ID = '';
      const client = new OAuth2Client(CLIENT_ID);
      const ticket = await client.verifyIdToken({ idToken });
      const payload = ticket.getPayload();
      const { email } = payload;
      this.login(email, response);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('fblogin')
  async fblogin(@Body() body, @Response() response) {
    console.log('fblogin');
    console.log(body);
    const YOUR_APP_ID = '963727304104229';
    const appsecret = 'eed96d86d56dd4b1aa95fbac29315463';
    const access_token = body.authResponse.accessToken;
    const url = `https://graph.facebook.com/me?fields=name,email&access_token=${access_token}`;
    try {
      const { email, name } = await (await fetch(url)).json();
      this.login(email, response);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('logout')
  // @UseGuards(SessionGuard)
  @Redirect()
  async logout(@Request() request, @Response() response) {
    console.log('logout');
    response.clearCookie('session');
    // invalidate existing sessions
    await this.authService.logout(request.user);
    return { url: '/' };
  }
}
