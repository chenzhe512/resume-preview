'use strict';

!function () {
  var view = document.querySelector('section.messageBoard');
  var model = {
    init: function init() {
      var APP_ID = 'FnE55OEu5V7KNjYOGuKVhD25-gzGzoHsz';
      var APP_KEY = 'btqnvyOB0kSj6OMUVylgILW9';
      AV.init({ appId: APP_ID, appKey: APP_KEY });
    },
    //获取数据
    fetch: function fetch() {
      var query = new AV.Query('Message');
      var now = new Date();
      query.lessThanOrEqualTo('createdAt', now); //查询今天之前创建的 Todo
      query.limit(5); // 最多返回 5 条结果
      return query.find(); // Promise 对象
    },
    //创建数据
    save: function save(name, content) {
      var Message = AV.Object.extend('Message');
      var messgae = new Message();
      return messgae.save({ //返回 Promise 对象
        'name': name,
        'content': content
      });
    }
  };

  var controller = {
    view: null,
    model: null,
    messageList: null,
    init: function init(view, model) {
      this.view = view;
      this.model = model;
      this.messageList = view.querySelector('#messageList');
      this.form = view.querySelector('#leaveMessageForm');
      this.model.init();
      this.loadMessages();
      this.bindEvents();
    },
    loadMessages: function loadMessages() {
      var _this = this;

      this.model.fetch().then(function (messages) {
        var array = messages.map(function (item) {
          return item.attributes;
        });
        array.forEach(function (item) {
          var li = document.createElement('li');
          li.innerText = item.name + ' \u8BF4: ' + item.content;
          _this.messageList.appendChild(li);
        });
      });
    },
    bindEvents: function bindEvents() {
      var _this2 = this;

      this.form.addEventListener('submit', function (e) {
        e.preventDefault();
        _this2.saveMessage();
      });
    },
    saveMessage: function saveMessage() {
      var myForm = this.form;
      var name = myForm.querySelector('input[name=name]').value.trim();
      var content = myForm.querySelector('textarea[name=content]').value.trim();
      //增加一些简单的表单验证
      var messageVerificationPrompt = myForm.querySelector('#message-verification-prompt');
      var nameVerificationPrompt = myForm.querySelector('#name-verification-prompt');
      if (nameVerificationPrompt.innerText) {
        nameVerificationPrompt.innerText = '';
      }
      if (messageVerificationPrompt.innerText) {
        messageVerificationPrompt.innerText = '';
      }

      this.model.save(name, content).then(function (object) {
        if (!name) {
          nameVerificationPrompt.innerText = '内容不能为空';
          return;
        }
        if (!content) {
          messageVerificationPrompt.innerText = '内容不能为空';
          return;
        }
        var li = document.createElement('li');
        li.innerText = object.attributes.name + '\u8BF4: ' + object.attributes.content;
        var messageList = document.querySelector('#messageList');
        messageList.appendChild(li);
        myForm.querySelector('textarea[name=content]').value = '';
      });
    }
  };

  controller.init(view, model);
}.call();