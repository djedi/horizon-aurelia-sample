import {inject} from 'aurelia-framework';
import {HorizonService} from 'resources/services/horizon';


@inject(HorizonService)
export class App {
  constructor(horizonService) {
    this.horizonService = horizonService;
    this.chat = null;
    this.messages = [];
    this.newMessage = '';
    this.avatar_url = `http://api.adorable.io/avatars/50/${new Date().getMilliseconds()}.png`;
  }

  attached() {
    this.horizonService.connect().then(() => {
      this.chat = this.horizonService.horizon('messages');
      this.chat.order('datetime', 'descending').limit(8).watch().subscribe(items => {
        this.items = items;
        this.messages = items;
      });
    });
  }

  addMessage() {
    var text = this.newMessage.trim();
    console.debug('text', this.newMessage);
    if (text === 'delete all') {
      this.removeAllMessages();
      this.newMessage = '';
      return null;
    }
    if (text) {
      this.chat.store({
        text: text,
        datetime: new Date(),
        url: this.avatar_url
      }).subscribe();
      this.newMessage = '';
    }
  }

  removeAllMessages() {
    var sure = confirm('Are you sure you want to delete all visible messages?');
    if (sure) {
      for (let item of this.items) {
        this.chat.remove(item);
      }
    }
  }

  onKeyPress(event) {
    if (event.key === 'Enter') {
      this.addMessage();
    }
    return true;
  }
}
