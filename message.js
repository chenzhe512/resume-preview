'use strict';

//初始化
var APP_ID = 'FnE55OEu5V7KNjYOGuKVhD25-gzGzoHsz';
var APP_KEY = 'btqnvyOB0kSj6OMUVylgILW9';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
console.log('运行到这里没有报错');

var query = new AV.Query('Message');
query.find().then(function (messages) {
  var array = messages.map(function (item) {
    return item.attributes;
  });
  array.forEach(function (item) {
    var li = document.createElement('li');
    li.innerText = item.name + ': ' + item.content;
    var messageList = document.querySelector('#messageList');
    messageList.appendChild(li);
  });
});

var myForm = document.querySelector('#leaveMessageForm');
leaveMessageForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var name = myForm.querySelector('input[name=name]').value;
  var content = myForm.querySelector('input[name=content]').value;
  var Message = AV.Object.extend('Message');
  var message = new Message();
  message.save({
    'name': name,
    'content': content
  }).then(function (object) {
    var li = document.createElement('li');
    li.innerText = object.attributes.name + ': ' + object.attributes.content;
    var messageList = document.querySelector('#messageList');
    messageList.appendChild(li);
    myForm.querySelector('input[name=content]').value = '';
  });
});
/*
//测试代码-创建TextObject表
var TestObject = AV.Object.extend('TestObject');
//在表中创建一行数据
var testObject = new TestObject();
//数据内容是words:'Hello World' 保存
//如果保存成功，则运行  alert('LeanCloud Rocks!');

testObject.save({
  words: 'Hello World!'
}).then(function(object) {
  alert('LeanCloud Rocks!');
})
*/