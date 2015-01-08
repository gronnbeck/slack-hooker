var MessageView = function(message) {
  return m('li.message.u-clearfix', [
    m('div.message__comp.timestamp', message.timestamp),
    m('div.message__comp.username',  message.user_name),
    m('div.message__comp.text',      message.text)
  ]);
}

var message = function() {
  var model = m.request({ method: 'GET', url: '/hook/slack'});
  return {
    controller: function () {
      return {
        messages: function() {
          var res = model() || { success: false }
          if (res.success === false) {
            return []
          }
          return res.messages;
        }
      }
    },
    view: function (ctrl) {
      return m('ul.messagebox', ctrl.messages().map(MessageView))
    }
  }
}

m.route(document.getElementById('app'), '/', {
  '/': message()
});
