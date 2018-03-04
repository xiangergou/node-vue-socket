# node-vue-socket

> 基于node+vue—socket.io实现的即时聊天系统(聊天室，私聊，项目已完成，readme稍后更新)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## setup
> 1. 实现聊天室
  思路: 项目入口处随机生成用户名，与socket链接产生的socket.id绑定。由此作为用户区别标示，即可可实现基本聊天室功能。 
> 2. 实现私聊
  