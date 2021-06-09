const EventEmitter = {
  events: {},
  trigger: function (event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback(data))
  },
  listen: function(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback)
  },
  cancelAll: function(event) {
    if (this.events[event]) this.events[event] = [];
  }
}

export default EventEmitter;