import { Context, Next } from 'koa';
import { prefix, post, get, put, del } from '../core/router';

import UserController from '../controllers/user';
const userController = new UserController();

@prefix('/user')
export default class User {
  @post('/create')
  async Create (ctx: Context, next: Next) {
    const data = await userController.create({
      username: 'username',
      nickname: 'nickname',
      email: 'test1@demo.com'
    });
    ctx.body = {
      code: 0,
      msg: 'success',
      data
    }
    await next();
  }

  @get('/list')
  async List (ctx: Context, next: Next) {
    const data = await userController.findAll();
    ctx.body = {
      code: 0,
      msg: 'success',
      data
    }
    await next();
  }

  @put('/update/:id')
  async Update (ctx: Context, next: Next) {
    const { id } = ctx.params;
    const body = ctx.request.body;
    const data = await userController.update(+id, {
      ...body
    });
    ctx.body = {
      code: 0,
      msg: 'success',
      data
    }
    await next();
  }

  @del('/delete/:id')
  async Delete (ctx: Context, next: Next) {
    const { id } = ctx.params;
    const data = await userController.delete(+id);
    ctx.body = {
      code: 0,
      msg: 'success',
      data
    }
    await next();
  }
};
