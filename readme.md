## Midway LB(Language Bridge)

Midway 与其他的语言桥接器

### 使用方法

#### 在 Node 中
直接使用 `child_process` 包的 spawn 方法来创建子进程：
```js
const { spawn } = require('child_process');
const { establish } = require('@midwayjs/lb');
const proc = spawn('go', ['main.go'], {
    stdio: [0, 1, 2, 'ipc']
});
const lb = await establish(proc, {
    key: 'value'
});
// 发送消息，仅支持字符串
lb.send(JSON.stringify({ test: 123}));
// 接受消息，也是字符串
lb.on('message', msgContext => {
    fmt.Println("message data", msgContext.data);
    msgContext.Response("success")
});
lb.close();
```
#### 在 Go 中
```go
package main
import (
    lb "github.com/midwayjs/lb"
)

func main() {
    lbInstance := lb.Establish();
    lbInstance.On("establish", func(ctx lb.EstablishContext) {
        // 建立成功
        ctx.Response("ready")
    });
    // 监听消息
    lbInstance.On("message", func(msgContext lb.MessageContext) {
        // 在单独的 goroutine 中
        fmt.Println("message data", msgContext.data);
        // 返回消息
        msgContext.Response("success");
    });
    // 主动发送消息
    lbInstance.Send("message", func(msgContext lb.MessageContext) {
        // 在单独的 goroutine 中
        fmt.Println("received message data", msgContext.data);
    });
     // 监听消息
    lbInstance.On("close", func() {
        lbInstance.close();
    });
    // 开启监听消息
    lbInstance.Listen();
}
```
© 2012 echosoar