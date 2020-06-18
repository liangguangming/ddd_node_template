import MongoDB from './lib/db';
import globalEventEmitter, { GLOBAL_EVENT } from './core/GloabelEventEmitter';
import HTTPServer from './http/HttpServer';

/**
 * 0 初始状态
 * 1 初始化进行中
 * 2 初始化完成
 */
let state = 0;

let firstLaunch = false;

class Application {
  static get firstLaunch() {
    return firstLaunch;
  }

  static set firstLaunch(val) {
    firstLaunch = val;
  }

  static get state() {
    return state;
  }

  static get mongoState() {
    return MongoDB.STATE;
  }

  static get httpServerState() {
    return HTTPServer.STATE;
  }

  static initEvent() {
    const launchEvent = {
      name: GLOBAL_EVENT.LAUNCH,
      handler: () => {
        if (Application.firstLaunch) {
          MongoDB.init();
        }
        globalEventEmitter.clearEvent(GLOBAL_EVENT.LAUNCH);
      },
    };
    const mongoInitedEvent = {
      name: GLOBAL_EVENT.MONGODB_INITED,
      handler: () => {
        if (Application.firstLaunch) {
          HTTPServer.init();
        }
        globalEventEmitter.clearEvent(GLOBAL_EVENT.MONGODB_INITED);
      },
    };
    const httpInitedEvent = {
      name: GLOBAL_EVENT.HTTP_INITED,
      handler: () => {
        state = 2;
      },
    };
    globalEventEmitter.addEvent(launchEvent);
    globalEventEmitter.addEvent(mongoInitedEvent);
    globalEventEmitter.addEvent(httpInitedEvent);
  }

  static launch() {
    Application.initEvent();
    globalEventEmitter.fireEvent({ name: GLOBAL_EVENT.LAUNCH });
    state = 1;
  }
}

Application.launch();
