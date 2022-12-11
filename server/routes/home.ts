import { Context, Next } from 'koa';
import { prefix, get, post } from '../core/router';
import { cookieTokenName } from '../config/const';

import type { IUserSigninType } from '@t/user';

import UserController from '../controllers/user';
const userController = new UserController();

@prefix('')
export default class Home {
  @get('/')
  async Home (ctx: Context, next: Next) {
    ctx.body = 'Home page !!!'
    await next()
  }

  @post('/signin')
  async Signin (ctx: Context, next: Next) {
    const body = ctx.request.body as unknown as IUserSigninType;
    const token = await userController.signin(body.username, body.password);
    ctx.cookies.set(cookieTokenName, token, {
      maxAge: new Date().getTime() + 24 * 60 * 60 * 1000 * 7,
      signed: true,
      httpOnly: true
    });
    ctx.body = {
      code: 0,
      msg: 'success',
      token
    }
    await next();
  }

  @get('/userinfo')
  async Userinfo (ctx: Context, next: Next) {
    const userinfo = ctx.state.userinfo;
    const token = ctx.state.token || ctx.cookies.get(cookieTokenName) || '';
    ctx.body = {
      code: 0,
      msg: 'success',
      data: {
        userinfo,
        token
      }
    };
    await next();
  }
};
