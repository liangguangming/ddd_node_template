import Koa from 'koa';
import koaBody from 'koa-body';
import router from './routers/router';
import globalEventEmitter, { GLOBAL_EVENT } from '../share/core/GloabelEventEmitter';

const app = new Koa();

/**
 * 0 未初始化
 * 1 初始化中
 * 2 成功启动
 */
let state = 0;

class HTTPServer {
  static get STATE() {
    return state;
  }

  static init() {
    state = 1;
    app.use(koaBody());

    // logger
    app.use(async (ctx, next) => {
      await next();
      const rt = ctx.response.get('X-Response-Time');
      console.log(`${ctx.method} ${ctx.url} - ${rt}`);
    });

    // x-response-time
    app.use(async (ctx, next) => {
      const start = Date.now();
      await next();
      const ms = Date.now() - start;
      ctx.set('X-Response-Time', `${ms}ms`);
    });

    app.use(router.routes());
    app.use(router.allowedMethods());

    app.listen(3000, () => {
      state = 2;
      console.log('launch successful');
      globalEventEmitter.fireEvent({ name: GLOBAL_EVENT.HTTP_INITED });
    });
  }

  /**
   * 获取http服务器健康状态
   */
  static getHealthInfo() {
    const result = {
      health: HTTPServer.STATE === 2,
      state: HTTPServer.STATE,
    };

    return result;
  }
}

export default HTTPServer;
