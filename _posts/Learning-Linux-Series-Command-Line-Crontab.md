---

title: 'Linux 命令行之 Crontab'
excerpt: '这篇是 Linux 命令行学习、使用笔记中的一篇，主要介绍 Linux 下的任务管理 crontab，包括 cron服务、crontab 相关命令的使用'
coverImage: ''
date: '2020-01-21 14:04:21'
tags: 'Crontab Linux'

---

## 概述

这篇是 Linux 命令行学习、使用笔记中的一篇，主要介绍 Linux 下的任务管理 crontab，包括 cron服务、crontab 相关命令的使用。

日常接触 crontab 会多一些，通过 crontab 命令，可以让系统固定的间隔时间执行指定的 shell 脚本，在介绍 crontab 的使用前，先介绍一下定时任务 cron，cron(即 crond 守护进程) 是 Linux 系统下一个自动执行指定任务的程序，可以使用 service crond status 或 systemctl status crond 查看该服务状态，也可以使用 service crond start/stop/restart来管理它的状态。crond 服务是跟随系统默认启动的，cron 上跑的大多数是系统的一些计划性任务，例如日志的记录、清理等，而 crontab(cron table) 可以看做是 cron 的管理工具，用于安装、移除、列出 cron 进程任务，它是 Linux 或者类 Unix 系统中最为实用的工具之一。

在 Linux 的 /etc 目录下你会发现以下的几个文件：

- cron.hourly // 每小时执行
- cron.daily // 每天执行
- cron.weekly // 每周执行
- cron.monthly // 每月执行

如果把脚本放入对应的文件中，根据文件的名字就知道 cron 会以对应的频率执行里面的脚本，同样的用户也可以通过 crontab 来制定自己的 cron 脚本，用户的脚本文件会以用户名为目录放置在 /var/spool/cron/user_name 目录下。

## crontab 规则

crontab 最小的时间单位 1分钟，5 个 * 对应的是 分(0-59) 时(0-23) 日(1-31) 月(1-12) 星期(0-7) 的时间设置，如下：

```sh
* * * * * command
----------------
| | | | |
| | | | ---- 周当中的某天 (0 - 7) (周日为 0 或 7)
| | | ------ 月份 (1 - 12)
| | -------- 一月当中的某天 (1 - 31)
| ---------- 小时 (0 - 23)
------------ 分钟 (0 - 59)

```

> minute   hour   day   month   week   command

minute： 表示分钟，可以是从0到59之间的任何整数。
hour：表示小时，可以是从0到23之间的任何整数。
day：表示日期，可以是从1到31之间的任何整数。
month：表示月份，可以是从1到12之间的任何整数。
week：表示星期几，可以是从0到7之间的任何整数，这里的0或7代表星期日。

1. 一个口诀，分时日月星。5个 * 数值的设置 分(0-59) 时(0-23) 日(1-31) 月(1-12) 星(0-7)
2. crontab 符号规则：

  \* 星号代表所有可能的值，例如日字段是星号，表示每日会执行该命令  
  \- 理解为一个时间段内都执行，取值整数范围 1-5， 代表 1 2 3 4 5 分钟均会执行一次  
  \, 用于多个值，指定一个范围，例如 1，10 为第 1 和第 10 分钟  
  \/ 分隔是一个时间间隔  */10 每10分钟执行一次  

## crontab 命令

```sh
crontab -l
```

列出当前机器下设置的定时任务，加上 -u 列出指定用户的定时任务

```sh
crontab -u root -l
```

```sh
crontab -e
```

按 i 进入编辑状态，制定定时任务

```sh
crontab -r
```

移除某个用户的的 crontab 任务文件，如果不指定某个用户，则默认删除当前用户的 crontab

```sh
crontab -r -u username
```

## 一些例子

每分钟执行一次

```sh
* * * * * bash command
```

每小时第3分钟、第15分钟执行一次

```sh
3,15 * * * * bash command
```

每小时执行一次

```sh
* */1 * * * bash command
```

每天的凌晨 3 点运行脚本

```sh
0 3 * * * bash command
```

每天晚上的 21:30 点运行

```sh
30 21 * * * bash command
```
