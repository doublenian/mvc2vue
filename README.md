# 专为改造前后端不分离的MVC项目打造

> 目的是：打造无侵入式的 vue 渐进式改造 MVC项目

- client中是vue项目中的代码

- server 中是vue 编译输出给mvc的脚本样式等文件，在实际项目中,MVC运行此部分



## client 端

`npm install`

`npm run dev`


## server 目录下

`svrx`  (这个可以通过 npm install -g @svrx/cli 安装)


这样在 client端改动`test-page2.vue`的内容可以在

http://localhost:8000/views/test2

中实时的改变

同样的 在client端改动`test-page1.vue` 的内容可以在

http://localhost:8000/views/test1 可以实时看到改变


