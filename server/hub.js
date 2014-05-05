/***********************************************************************************************************************************************
 * HUB
 ***********************************************************************************************************************************************
 * @description Server side Pub/Sub
 */

var Subscriptions = {};

this.subscribe = function(name, fn) {
  if(Subscriptions[name]) {
    Subscriptions[name].push(fn);
  } else {
    Subscriptions[name] = [fn];
  }
};

this.publish = function(name, data) {
  if(Subscriptions[name]) {
    Subscriptions[name].forEach(function(itm, idx) {
      itm(data);
    })
  }
};

this.register = function(name) {
  if(!Subscriptions[name]) {
    Subscriptions[name] = [];
  }
};

return exports.this;