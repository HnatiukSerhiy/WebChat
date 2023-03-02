import { Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

class WebSocketProvider {
  readonly openObserver: Subject<unknown>;
  readonly closeObserver: Subject<unknown>;

  constructor() {
    this.openObserver = new Subject();
    this.closeObserver = new Subject();
  }

  createWebSocket(url: string) {
    const webSocketSubject = webSocket({
      url,
      protocol: 'graphql-ws',
      closingObserver: this.closeObserver,
      openObserver: this.openObserver,
      serializer: value => JSON.stringify(value),
      deserializer: event => JSON.parse(event.data),
    });

    return webSocketSubject;
  }
}

export default WebSocketProvider;
