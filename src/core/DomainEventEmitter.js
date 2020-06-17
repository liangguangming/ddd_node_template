// eslint-disable-next-line no-unused-vars
import IDomainEvent from './IDomainEvent';
// eslint-disable-next-line no-unused-vars
import IDomainEventHandler from './IDomainEventHandler';

class DomainEventEmitter {
  constructor() {
    this.eventHandlerMap = new Map();
  }

  /**
   * 添加事件监听
   * @param {IDomainEventHandler} event
   */
  addEvent(event) {
    let handlers = [];
    if (this.eventHandlerMap.has(event.name)) {
      handlers = this.eventHandlerMap.get(event.name);
    }
    handlers.push(event.handler);
    this.eventHandlerMap.set(event.name, handlers);
  }

  /**
   * 触发事件
   * @param {IDomainEvent} event 事件
   */
  fireEvent(event) {
    if (!this.eventHandlerMap.has(event.name)) {
      return;
    }

    const handlers = this.eventHandlerMap.get(event.name);
    handlers.forEach((handler) => {
      handler(event.data);
    });
  }
}

export default DomainEventEmitter;
