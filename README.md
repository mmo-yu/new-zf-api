⭐新正方教务管理系统的爬虫webApi-Django(带后台)🔧用以开发校园APP/小程序

**登录、消息及成绩和课程**部分API基于[NeroAsmarr/zfnew](https://github.com/NeroAsmarr/zfnew)【2020.2.16】

目前项目部署在“西院助手”微信/QQ小程序中作为API

> # ⚠️本项目不再更新!**API部分已从本项目抽出并全部重写（提高代码易读性，提升性能）**，存放于该项目下：[jokerwho/zfn_api](https://github.com/jokerwho/zfn_api)，相关数据抓取issue请移步，后续API更新将在该项目进行
求⭐⭐⭐⭐⭐（跪

 - [相关说明](#相关说明)
    - [功能实现](#功能实现)
 - [接口](#接口)
    - [请求信息](#信息请求)
    - [选课请求](#选课请求)
    - [其它请求](#其它请求)
 - [使用部署](#使用部署)
 - [测试部署](#测试部署-测试用)

------

## 相关说明

### 功能实现

 - [x] 学生信息
 - [x] 改课通知
 - [x] 成绩查询
 - [x] 课表查询
 - [x] 教室查询

------


## 接口说明

### 请求信息

**学生信息：/stuinfo**
参数名|示例值|必选|参数描述 
- | - | - | - 
host | https://jw.gxvnu.edu.cn | 是 | URL地址 
username | 190XXX | 是 | 学号 
password | xxx    | 是 | 密码 

**改课通知：/notice**
参数名|示例值|必选|参数描述 
- | - | - | - |
host | https://jw.gxvnu.edu.cn | 是 | URL地址 |
username | 190XXX | 是 | 学号 |
password | xxx    | 是 | 密码 |

**成绩查询：/score**
参数名|示例值|必选|参数描述 
- | - | - | - |
host | https://jw.gxvnu.edu.cn | 是 | URL地址 |
username | 190XXX | 是 | 学号 |
password | xxx    | 是 | 密码 |
year | 2021 | 是 | 学年 |
term | 2 | 是 | 学期 |

**课表查询：/course**
参数名|示例值|必选|参数描述 
- | - | - | - |
host | https://jw.gxvnu.edu.cn | 是 | URL地址 |
username | 190XXX | 是 | 学号 |
password | xxx    | 是 | 密码 |


------

## 使用部署
 - 推荐使用**uswgi+nginx**，具体部署可移步百度
 - 更改config.json中各项：参照上方Tips

## 测试部署-测试用

 - 请确保服务器或虚拟环境安装了**Python3.6**及以上版本

### 1.安装依赖模块

```shell
$ pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt
```

### 2.开放安全组配置
 - 开放8000端口

### 3.使用-迁移数据库

 - 在settings.py中配置数据库信息

```shell
$ python manage.py makemigrations
$ python manage.py migrate
```

### 4.创建后台用户

```shell
$ python manage.py createsuperuser
```

### 5.用终端打开zfnweb文件夹，并运行

```shell
$ python manage.py runserver 0.0.0.0:8000
```

### 6.访问后台

```
/admin
```

访问你服务器的**IP地址:8000/xxx**
# eduApi



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org