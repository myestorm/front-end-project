import { join } from 'node:path';
import Koa, { Context, Next } from 'koa';
import koaBody from 'koa-body';
import koaStatic from 'koa-static';
import routes from './routes/index';
import koaBodyConfig, { uploadDir } from './config/koaBody';

const env = process.env.NODE_ENV;
const app = new Koa();
const dirs = env === 'dev' ? '../client/public' : '../public';

// 上传文件
app.use(koaBody(koaBodyConfig));
// 静态资源
app.use(koaStatic(join(__dirname, dirs)));
// 多个目录，这里是用来放置上传文件的
app.use(koaStatic(uploadDir));
// 注入路由
app.use(routes.routes()).use(routes.allowedMethods());

app.use(async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    ctx.app.emit('error', err, ctx);
  }
});

app.listen(6001, () => {
  console.log('application is running on port 6001');
});
