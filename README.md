# 新正方教务管理系统API

### 部分代码来自 [SchoolApi](https://github.com/LeiWang1999/SchoolApi)


#### 项目已部署到微信小程序，可扫码体验!


![小程序](https://s3.bmp.ovh/imgs/2022/04/28/6cdc950f8299c5f1.png)



求⭐⭐⭐⭐⭐


 - [功能实现](#功能实现)
 - [接口说明](#接口说明)
    - [学生信息](#学生信息)
    - [改课通知](#改课通知)
    - [成绩查询](#成绩查询)
    - [课表查询](#课表查询)
    - [教室查询](#空闲教室查询)
 - [使用部署](#使用部署)

------


### 功能实现

 - [x] 学生信息
 - [x] 改课通知
 - [x] 成绩查询
 - [x] 课表查询
 - [x] 教学楼查询
 - [x] 教室查询

------


## 接口说明


#### 学生信息

```
/stuinfo
```

参数名|示例值|必选|参数描述 
 ---- | ---- | ---- | ----
host | ```https://jw.gxvnu.edu.cn``` | 是 | URL地址 |
username | 190XXX | 是 | 学号 
password | xxx    | 是 | 密码 

#### 改课通知
```
/notice
```

参数名|示例值|必选|参数描述 
 ---- | ---- | ---- | ----
host | ```https://jw.gxvnu.edu.cn``` | 是 | URL地址 |
username | 190XXX | 是 | 学号 |
password | xxx    | 是 | 密码 |

#### 成绩查询
```
/score
```

参数名|示例值|必选|参数描述 
 ---- | ---- | ---- | ----
host | ```https://jw.gxvnu.edu.cn``` | 是 | URL地址 |
username | 190XXX | 是 | 学号 |
password | xxx    | 是 | 密码 |
year | 2021 | 是 | 学年 |
term | 2 | 是 | 学期 |

#### 课表查询
```
/course
```

参数名|示例值|必选|参数描述 
 ---- | ---- | ---- | ----
host | ```https://jw.gxvnu.edu.cn``` | 是 | URL地址 |
username | 190XXX | 是 | 学号 |
password | xxx    | 是 | 密码 |


#### 教学楼查询
```
/built
```

参数名|示例值|必选|参数描述 
 ---- | ---- | ---- | ----
host | ```https://jw.gxvnu.edu.cn``` | 是 | URL地址 |
username | 190XXX | 是 | 学号 |
password | xxx    | 是 | 密码 |
campus   |2（每个学校ID可能不一样）| 否 | 校区ID|

#### 空闲教室查询
```
/classroom
```

| 参数名      | 实例值            | 类型     | 必选 | 参数描述   |
|----------|----------------|--------|----|--------|
| host     | ```https://jw.gxvnu.edu.cn```| String | 是  | 教务地址   |
| username | 190522XXX      | String | 是  | 学号/用户名 |
| password | XXXXX          | String | 是  | 密码     |
| campus   | 1              | Number | 否  | 校区ID   |
| built    | 1 PS: 教学楼查询 获取 | Number | 否  | 教学楼ID  |
| weeks    | 1(可传空值)     | Array  | 是  | 周次     |
| day      | [1,2,3]        | Array  | 否  | 星期     |
| periods  | [1,2,3] (可传空值) | Array  | 是  | 节次     |
| seatsmin | 20 (可传空值)      | Number | 否  | 最小座位   |
| seatsmax | 50 (可传空值)      | Number | 否  | 最大座位   |



------

## 使用部署
 - 默认学年、学期 在config/config/default.js中，请根据需要自行修改

 - 请确保服务器或虚拟环境安装了**Node.js**

### 1.安装依赖模块

```bash
$ npm install
```

### 2.终端运行

```bash
$ npm run dev
```

```bash
$ npm start
$ npm stop
```

### 3.访问接口

```
http://localhost:7001/
```

访问你服务器的**IP地址:7001/xxx**