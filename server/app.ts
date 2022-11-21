import { resolve, join } from 'path';
import Koa, { Context, Next } from 'koa';
import Router from '@koa/router';
import koaBody from 'koa-body';
import koaStatic from 'koa-static';

import { IUserType } from '@t/user';

const app = new Koa();
app.use(koaBody());
app.use(koaStatic(join(__dirname, '../client/public')));

const router = new Router();
router.get('/api', (ctx: Context, next: Next) => {
  ctx.body = {
    code: 0,
    data: 'data',
    msg: 'nothing'
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    ctx.app.emit('error', err, ctx);
  }
});

app.use(async (ctx: Context) => {
  const userinfo: IUserType = {
    username: 'ah',
    nickname: 'nickname'
  };
  ctx.body = 'Hello World --' + JSON.stringify(userinfo);
});

app.listen(6001);
console.log(resolve(__dirname, './server'));