# 漂流瓶接口文档
## 1. 打捞一个漂流瓶
url: `driftBottle/salve.json`

method: `GET`

入参:
```JSON
{
  "user": "", // 捡漂流瓶的人的用户名或用户id，必须唯一。
  "type": "", // 漂流瓶类型，这里我们设置三种类型：all代表全部，male代表男性，female代表女性，默认时为all。
}
```

出参：
```JSON
{
  "code": 1,
  "msg": {
    "time": "", // 漂流瓶扔出的时间戳，默认时设置为Date.now（）
    "owner": "", // 漂流瓶主人，可以是用户名或用户id，但必须仅有一个。
    "type": "", // 漂流瓶类型，为male或female之一。
    "content": "" // 漂流瓶内容。
  }
}
```

## 2. 扔出一个漂流瓶
url: `driftBottle.json`

method: `POST`

入参:
```JSON
{
  "time": "", // 漂流瓶扔出的时间戳，默认时设置为Date.now（）。
  "owner": "", // 漂流瓶主人，可以是用户名或用户id，但必须仅有一个。
  "type": "", // 漂流瓶类型，为male或female之一。
  "content": "" // 漂流瓶内容。
}
```
出参：
```JSON
{
  "code": 200,
  "meg": "操作成功"
}
```
