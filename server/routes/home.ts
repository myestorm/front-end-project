import { Context, Next } from 'koa';
import { prefix, get } from '../core/router';

@prefix('/api')
export default class Home {
  @get('/')
  async Home (ctx: Context, next: Next) {
    ctx.body = 'Home page !!!'
    await next()
  }

  @get('/demo')
  async Demo (ctx: Context, next: Next) {
    ctx.body = 'Demo !!!'
    await next()
  }
};
