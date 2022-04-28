# 新正方教务管理系统API




#### 项目已部署到微信小程序，可扫码体验!


![小程序](https://s3.bmp.ovh/imgs/2022/04/28/6cdc950f8299c5f1.png)



求⭐⭐⭐⭐⭐


 - [功能实现](#功能实现)
 - [接口说明](#接口说明)
    - [学生信息](#学生信息)
    - [改课通知](#改课通知)
    - [成绩查询](#成绩查询)
    - [课表查询](#课表查询)
    - [教室查询](#教室查询)
 - [使用部署](#使用部署)

------


### 功能实现

 - [x] 学生信息
 - [x] 改课通知
 - [x] 成绩查询
 - [x] 课表查询
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