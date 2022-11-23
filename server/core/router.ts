import 'reflect-metadata';
import Router, { Middleware } from '@koa/router';

// http请求类型
export enum HttpMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DEL = 'del',
  ALL = 'all',
};

// 前缀装饰器，类型是类装饰器
export function prefix (path: string): ClassDecorator {
  return (target: Function) => {
    // 把前缀存起来
    Reflect.defineMetadata('prefix', path, target);
  }
};

// 用工厂生成http请求装饰器 post get等
export function httpRequestDecorator (method: HttpMethods) {
  return function (path: string, middle?: Middleware) {
    return function (target: Object, key: string) {
      Reflect.defineMetadata('path', path, target, key);
      Reflect.defineMetadata('middle', middle, target, key);
      Reflect.defineMetadata('method', method, target, key);
    };
  };
};

export const get = httpRequestDecorator(HttpMethods.GET);
export const post = httpRequestDecorator(HttpMethods.POST);
export const put = httpRequestDecorator(HttpMethods.PUT);
export const del = httpRequestDecorator(HttpMethods.DEL);
export const all = httpRequestDecorator(HttpMethods.ALL);

export default class KoaRouter {
  router: Router;

  constructor () {
    this.router = new Router({
      prefix: ''
    });
  }

  mount (controller: Function): KoaRouter {
    // 获取路由配置的前缀
    const prefix = Reflect.getMetadata('prefix', controller);
    // 获取路由信息，然后挂载到koa-router上
    const keys = Object.getOwnPropertyNames(controller.prototype).filter(item => item !== 'constructor');
    keys.map(key => {
      const path: string = Reflect.getMetadata('path', controller.prototype, key);
      const middle: string = Reflect.getMetadata('middle', controller.prototype, key);
      const method: HttpMethods = Reflect.getMetadata('method', controller.prototype, key);
      const hanlder = controller.prototype[key];
      if (path && method && hanlder) {
        if (middle) {
          this.router[method](prefix + path, middle, hanlder);
        } else {
          this.router[method](prefix + path, hanlder);
        }
      }
    });
    return this;
  }
};
