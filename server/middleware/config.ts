import { Context, Next } from 'koa';

export default (options: any = {}) => {
  return async (ctx: Context, next: Next) => {
    ctx.state.config = options;
    await next();
  }
};
