---
title: "使用 SafeKit 实现 Docker 高可用性：安装 mirror.safe 模块以实现故障转移"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-with-docker/"
description: "部署 mirror.safe 模块以实现 SafeKit，从而在 Linux 上启用 Docker 容器的同步实时复制和自动故障转移。本指南将引导您为关键应用程序设置一个无共享存储的 2 节点集群。"
category: "quick-install"
lang: "zh-hans"
topics: "Docker 高可用性快速安装指南、SafeKit 高可用性限制、SafeKit/Docker 解决方案概述、在 Linux 上安装 SafeKit/Docker 解决方案 (mirror.safe)、SafeKit/Docker 解决方案的分步配置、SafeKit mirror 解决方案演示、🔍 探索 SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# 使用 SafeKit 实现 Docker 高可用性：安装 mirror.safe 模块以实现故障转移 {#docker-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-zh-hans app="Docker" mod="mirror"  %}}
 

## SafeKit/Docker 解决方案概述 {#overview-of-the-safekit--docker-solution}

解决方案在此处描述：** 💡 [SafeKit：Docker 高可用性和实时数据复制软件](</zh-hans/solutions/docker-container-high-availability-cluster-synchronous-replication-failover/>)  
**。

## 在 Linux 上安装 SafeKit/Docker 解决方案 (mirror.safe) {#installation-of-the-safekit--docker-solution-on-linux-mirrorsafe}

### 先决条件 {#prerequisites}

  * 您需要在 SafeKit 中安装 Docker 应用程序，并将其重启到 2 个节点（虚拟机或物理服务器）上。



{{%  insert-safekit-installation-package-linux-zh-hans app="" mod="mirror"  %}}
 

### 示例 1：使用 Docker Compose 应用程序 {#example-1-with-a-docker-compose-application}

使用 Docker Compose 应用程序时，您会有一个 **docker-compose.yml** 文件，用于描述应用程序及其所有容器。

  * 首先，在两个服务器上安装 docker compose 应用程序，但不要启动它：**docker-compose -f docker-compose.yml up --no-start**
  * 在其中一台服务器上，针对 docker-compose.yml 中的每个卷，运行此命令：**docker volume inspect volume_name**  
它将返回 **Docker 卷的主机目录**（这些路径未在 docker-compose.yml 中给出）。  
您将获得一个路径列表，例如 **/var/lib/docker/volumes/ <volume_name> /_data**
  * 转到**分步配置**部分，然后 
    * 部署 **mirror.safe** 模块
    * 设置一个**虚拟 IP 地址**，以便在发生故障时进行切换
    * 将 **/var/lib/docker/volumes/ <volume_name> /_data** 的列表设置为**复制目录**
    * 分别放入 start_prim 和 stop_prim 脚本中：**/usr/local/bin/docker-compose-f docker-compose.yml --no-ansi start** 和 **/usr/local/bin/docker-compose-f docker-compose.yml --no-ansi stop**


### 示例 2：使用 Docker 应用程序启动一组容器 {#example-2-with-a-docker-application-starting-a-set-of-containers}

我们假设这里有一个 Docker 应用程序 **myappli** 启动了一组容器。

  * 首先，在两台服务器上安装 **myappli**，但不要启动它
  * 在其中一台服务器上，列出 myapply 使用的卷：**ls /var/lib/docker/volumes**  
因此，您将获得一个路径列表，例如 **/var/lib/docker/volumes/ <volume_name> /_data**
  * 转到**分步配置**部分，然后 
    * 部署 **mirror.safe** 模块
    * 设置一个**虚拟 IP 地址**，以便在发生故障时进行切换
    * 将 **/var/lib/docker/volumes/ <volume_name> /_data** 的列表设置为**复制目录**
    * 分别放入 start_prim 和 stop_prim 脚本中：**/.../myappli start** 和 **/.../myappli stop**


### 示例 3：使用简单的 Docker 镜像 {#example-3-with-a-simple-docker-image}

本配置以 nginx Docker 镜像（Web 服务器）为例。

  * 创建 Docker 卷  
在两个服务器上，创建具有相同名称的 Docker 卷：**docker volume create replicated_vol**  
获取卷在主机上存储的目录路径：**docker volume inspect replicated_vol**  
（例如：**/var/lib/docker/storage/replicated_vol/_data**）
  * 创建 Docker 容器  
在两个服务器上，创建一个绑定到先前卷的 nginx docker 容器：**docker container create --name mynginx -v replicated_vol:/usr/share/nginx/html -p 9011:80 nginx**  
用一些 index.html 文件填充卷：**docker cp index.html mynginx:/usr/share/nginx/html/index.html**
  * 转到**分步配置**部分，然后 
    * 部署 **mirror.safe** 模块
    * 设置一个**虚拟 IP 地址**，以便在发生故障时进行切换
    * 将 **/var/lib/docker/storage/replicated_vol/_data** 设置为复制目录
    * 分别在 start_prim 和 stop_prim 脚本中放入：**docker start mynginx** 和 **docker stop mynginx**
    * 配置 SafeKit 后，使用 **http://vitual-ip:9011** 测试对 index.html 的访问


## SafeKit/Docker 解决方案的分步配置 {#step-by-step-configuration-of-the-safekit--docker-solution}


{{%  insert-safekit-82-configuration-zh-hans app="Docker" mod="mirror"  %}}
 

## SafeKit mirror 解决方案演示 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}