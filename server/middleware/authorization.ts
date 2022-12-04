import { Context, Next } from 'koa';
import jwt, { Jwt } from 'jsonwebtoken';
import isGlob from 'is-glob';
import micromatch from 'micromatch';

import { cookieTokenName, jwtSecret } from '../config/const';

// 检查两个路径是否匹配
export function match (context: string, path: string): boolean {
  if (!isGlob(context)) {
    return path.indexOf(context) === 0;
  } else {
    const matchs = micromatch([path], context);
    return matchs?.length > 0;
  }
};

export type IAuthorizationType = {
  blacklist: string[]
};

export function parseToken (token: string) {
  const verifyInfo = jwt.verify(token, jwtSecret, {
    complete: true
  }) as Jwt;
  return verifyInfo;
}

export default (options: IAuthorizationType = { blacklist: [] }) => {
  return async (ctx: Context, next: Next) => {
    const url = ctx.request.url;
    const needAuth = micromatch.isMatch(url, [...options.blacklist]);
    if (needAuth) {
      const cToken = ctx.cookies.get(cookieTokenName);
      if (ctx.header && ctx.header.authorization) {
        const parts = ctx.header.authorization.split(' ');
        if (parts.length === 2) {
          const scheme = parts[0];
          const token = parts[1];
          if (/^Bearer$/i.test(scheme)) {
            try {
              const verifyInfo = parseToken(token);
              ctx.state.userinfo = verifyInfo.payload || {};
              ctx.state.token = token || '';
            } catch (error) {
              ctx.throw(401);
            }
          } else {
            ctx.throw(401);
          }
        } else {
          ctx.throw(401);
        }
      } else if (cToken) {
        if (cToken) {
          const verifyInfo = parseToken(cToken);
          ctx.state.userinfo = verifyInfo.payload || {};
          ctx.state.token = cToken || '';
        } else {
          ctx.throw(401);
        }
      } else {
        ctx.throw(401);
      }
    }
    await next();
  };
};
