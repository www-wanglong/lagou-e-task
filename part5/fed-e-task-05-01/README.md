# 简答题
## 1. 简述Node.js的特点以及适用的场景
- I/O密集型任务
Node异步I/O处理效率高
- 高并发场景
Node异步I/O以及事件回调特点

## 2. 简述Buffer的使用，包括多种创建方式。实例方法，静态方法
### 2.1 创建方式
- Buffer.alloc()
- Buffer.allocUnsafe()
- Buffer.from()
### 2.2 实例方法
`let buf = Buffer.alloc(6)`

- buf.fill('123')
- buf.write('123')
- buf.toString()
- buf.slice(0, 6)
- buf.indexOf('1')
- buf.copy(buf2)
### 2.3 静态方法
- Buffer.from()
- Buffer.isBuffer()

## 3. 写出5个以上文件操作的API，并且用文字说明其功能
- fs.readFile() 异步读取文件
- fs.readFileSync() 同步读取文件
- fs.open() 打开文件
- fs.stat() 异步模式获取文件信息
- fs.wrietFile() 写入文件
- fs.read() 读取文件
- fs.close() 关闭文件
## 4. 简述使用流操作的优势，以及Node中流的分类

优势：
- 提升内存效率：无需大量加载数据到内存中
- 时间效率：当获取到数据之后可立即开始处理数据，可以边读边写

分类：
- 可读流（Readable）
- 可写流（Writable）
- 双向流（Duplex）
- 转换流（Transform）
## 5. 在数据封装与解封过程中，针对应用层、传输层、网络层、数据链路层、物理层5层分别做了什么事情？

- 应用层：为特定应用程序提供数据传输服务
  - 封装：将数据封装在对应的应用层协议数据体中，添加应用层协议的协议头
  - 解封：通过协议规范，将协议头和数据体拆分，数据从协议数据体中提取

- 传输层：为进程提供通用数据传输服务
  - 封装：将应用层数据封装在数据包的数据体中，添加传输层协议头
  - 解封：将协议头和数据体拆分，根据协议头的信息来将数据体交给应用层来处理
- 网络层： 为主机提供数据传输服务
  - 封装：将传输层的数据报封装在网络层的数据体中，添加网络层协头
  - 解封：将协议头和数据体拆分，根据协议头的信息来将数据体交给传输层来处理
- 数据链路层：确定目标主机
  - 封装：将网络层的数据报封装在数据链路层的数据体中，添加数据链路层协议头
  - 解封：将协议头和数据体拆分，根据协议头的信息来将数据体交给网络层来处理
- 物理层：各种物理设备和标准
  - 封装：物理层负责将数字信号转换为电信号发送
  - 解封：物理层负责将接收的电信号转换为数字信号

# 代码题
## 1. 统计指定目录中文件总大小。要考虑目录中还有子目录的情况。可以同步编码,异步更好
[代码](https://github.com/www-wanglong/lagou-e-task/blob/master/part5/fed-e-task-05-01/01.js)
## 2. 编写单向链表类并且实现队列的入列出列操作
队列先进先出

[代码](https://github.com/www-wanglong/lagou-e-task/blob/master/part5/fed-e-task-05-01/02.js)

## 3. 基于Node写出一静态服务器。接收请求并且响应特定目录
[代码](https://github.com/www-wanglong/lagou-e-task/tree/master/part5/fed-e-task-05-01/wl-server)
