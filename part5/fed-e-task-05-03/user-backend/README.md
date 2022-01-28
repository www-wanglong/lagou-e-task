# 用户管理api

## 1. 对象
### 1.1 <span id="User">User</span>
```JSON
{
  "user": {
    "email": "jake@jake.jake",
    "token": "jwt.token.here",
    "username": "jake",
    "bio": "I work at statefarm",
    "image": null
  }
}
```
## 2. 接口
### 2.1 注册接口

post: `/api/users/register`

请求
```JSON
{
  "user":{
    "username": "Jacob",
    "email": "jake@jake.jake",
    "password": "jakejake"
  }
}
```

返回 [User](#User)

### 2.2 登陆

post: `/api/users/login`

请求

```JSON
{
  "user":{
    "email": "jake@jake.jake",
    "password": "jakejake"
  }
}
```

返回 `User`

### 2.3 用户查询

get `/api/users/:username`

返回 [User](#User)


### 2.4 获取当前用户

get `/api/user`

返回 [User](#User)




