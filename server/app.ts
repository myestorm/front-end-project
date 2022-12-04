import { join } from 'node:path';
import Koa, { Context, Next } from 'koa';
import koaBody from 'koa-body';
import koaStatic from 'koa-static';
import routes from './routes/index';
import koaBodyConfig, { uploadDir } from './config/koaBody';
import authorization from './middleware/authorization';
import config from './middleware/config';
import CONST from './config/const';

const env = process.env.NODE_ENV;
const app = new Koa();
const dirs = env === 'dev' ? '../client/public' : '../public';

// array of signed cookie keys
app.keys = ['front-end-project', 'totonoo.com'];
// 注入全局配置
app.use(config(CONST));
// 通用错误处理
app.use(async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    console.log(ctx.status)
    ctx.app.emit('error', err, ctx);
  }
});
// 权限认证
app.use(authorization({
  blacklist: ['/user/*'] // 黑名单模式，匹配黑名单一律验证，否则不验证
}));
// 上传文件
app.use(koaBody(koaBodyConfig));
// 静态资源
app.use(koaStatic(join(__dirname, dirs)));
// 多个目录，这里是用来放置上传文件的
app.use(koaStatic(uploadDir));
// 注入路由
app.use(routes.routes()).use(routes.allowedMethods());

app.listen(6001, () => {
  console.log('application is running on port 6001');
});
