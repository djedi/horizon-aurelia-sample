define('app',['exports', 'aurelia-framework', 'resources/services/horizon'], function (exports, _aureliaFramework, _horizon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_horizon.HorizonService), _dec(_class = function () {
    function App(horizonService) {
      _classCallCheck(this, App);

      this.horizonService = horizonService;
      this.chat = null;
      this.messages = [];
      this.newMessage = '';
      this.avatar_url = 'http://api.adorable.io/avatars/50/' + new Date().getMilliseconds() + '.png';
    }

    App.prototype.attached = function attached() {
      var _this = this;

      this.horizonService.connect().then(function () {
        _this.chat = _this.horizonService.horizon('messages');
        _this.chat.order('datetime', 'descending').limit(8).watch().subscribe(function (items) {
          _this.items = items;
          _this.messages = items;
        });
      });
    };

    App.prototype.addMessage = function addMessage() {
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
    };

    App.prototype.removeAllMessages = function removeAllMessages() {
      var sure = confirm('Are you sure you want to delete all visible messages?');
      if (sure) {
        for (var _iterator = this.items, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var item = _ref;

          this.chat.remove(item);
        }
      }
    };

    App.prototype.onKeyPress = function onKeyPress(event) {
      if (event.key === 'Enter') {
        this.addMessage();
      }
      return true;
    };

    return App;
  }()) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('resources/services/horizon',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var HorizonService = exports.HorizonService = function () {
        function HorizonService() {
            _classCallCheck(this, HorizonService);

            this.horizon = null;
            this.status = {};
        }

        HorizonService.prototype.connect = function connect() {
            var _this = this;

            this.horizon = Horizon({ host: 'localhost:8181' });
            return new Promise(function (resolve, reject) {
                _this.horizon.onReady(function (status) {
                    _this.status = status;
                    resolve(status);
                });
                _this.horizon.connect();
            });
        };

        return HorizonService;
    }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"app.css\"></require>\n\n  <div id=\"app\" class=\"container\">\n    <div class=\"row\">\n      <ul>\n        <li repeat.for=\"message of messages\" transition=\"exapnd\" class=\"message\">\n          <img src.bind=\"message.url\" height=\"50px\" width=\"50px\">\n          <span class=\"text\">\n            ${message.text}\n          </span>\n\n          <span class=\"datetime u-pull-right\">\n            ${message.datetime.toTimeString()}\n          </span>\n        </li>\n      </ul>\n    </div>\n    <div id=\"input\" class=\"row\">\n      <input class=\"u-full-width\" autofocus=\"true\" keypress.delegate=\"onKeyPress($event)\" value.bind=\"newMessage\">\n    </div>\n  </div>\n</template>\n"; });
define('text!app.css', ['module'], function(module) { module.exports = "/* always present */\n.expand-transition {\n  transition: all .2s ease;\n  height: 30px;\n  padding: 10px;\n  background-color: #eee;\n  overflow: hidden;\n}\n\n/* .expand-enter defines the starting state for entering */\n/* .expand-leave defines the ending state for leaving */\n.expand-enter, .expand-leave {\n  height: 0;\n  padding: 0 10px;\n  opacity: 0;\n}\n\n#app ul {\n  list-style-type: none;\n}\n\n.message {\n  height: 50px;\n}\n\n.message img {\n  vertical-align:middle;\n}\n\n.message .text {\n  vertical-align:middle;\n  margin-left:5px;\n  font-family: 'Source Code Pro', \"Raleway\", \"Helvetica Neue\";\n  font-size:20px;\n}\n\n.message .datetime {\n  color:darkgrey;\n}\n\n#input {\n  margin-bottom:10%;\n}\n\n#input input {\n  position: fixed;\n  top: 80%;\n  width: 80%;\n  height:100px;\n  font-size:5rem;\n  padding:10px;\n  font-family: 'Source Code Pro', \"Raleway\", \"Helvetica Neue\";\n}"; });
//# sourceMappingURL=app-bundle.js.map