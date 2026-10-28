---
title: "Docker高可用性（需配合SafeKit使用）：安装mirror.safe模块以实现故障转移"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-with-docker/"
description: "为SafeKit部署mirror.safe模块，以在Linux上实现Docker容器的同步实时复制和自动故障转移。本指南将引导您设置一个适用于关键应用程序且无需共享存储的双节点无共享集群。"
category: "quick-install"
lang: "zh-hans"
topics: "Docker 、 SafeKit高可用性快速安装指南； SafeKit / Docker解决方案概述；在Linux ( mirror.safe ) 上安装SafeKit / Docker解决方案； SafeKit / Docker解决方案分步配置； SafeKit mirror解决方案演示；🔍 SafeKit高可用性导航中心"
---

# Docker高可用性（与SafeKit配合使用）：安装mirror.safe模块以实现故障转移 {#docker-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-zh-hans app="Docker" mod="mirror"  %}}
 

## SafeKit / Docker解决方案概述 {#overview-of-the-safekit--docker-solution}

解决方案如下： ** 💡 [ SafeKit : Docker高可用性和实时数据复制软件](</zh-hans/solutions/docker-container-high-availability-cluster-synchronous-replication-failover/>)  
**.

## 在Linux ( mirror.safe )上安装SafeKit / Docker解决方案 {#installation-of-the-safekit--docker-solution-on-linux-mirrorsafe}

### 先决条件 {#prerequisites}

  * 您需要在 2 个节点（虚拟机或物理服务器）上安装Docker ，以便在SafeKit中重新启动该应用程序。



{{%  insert-safekit-installation-package-linux-zh-hans app="" mod="mirror"  %}}
 

### 示例 1，使用Docker组合应用程序 {#example-1-with-a-docker-compose-application}

对于Docker compose 应用程序，您将拥有一个**docker-compose.yml**文件，用于描述该应用程序及其所有容器。

  * 首先，在两台服务器上安装 docker compose 应用程序，但不要启动它： **docker-compose -f docker-compose.yml up --no-start**
  * 在一台服务器上，对docker-compose.yml中的每个卷运行以下命令： **docker volume inspect volume_name**  
它将返回**host directories of the docker volumes** （这些路径未在docker-compose.yml中给出）。  
您将获得一个路径列表，格式为**/var/lib/docker/volumes/ <volume_name>/_data**
  * 转到**分步配置**部分， 
    * 部署**mirror.safe**模块
    * 设置虚拟 IP 地址** ** ，以便在发生故障时切换。
    * 将**/var/lib/docker/volumes/ <volume_name>/_data**的列表设置为**复制目录**
    * 分别放入start_prim和stop_prim脚本中： **/usr/local/bin/docker-compose -f docker-compose.yml --no-ansi start**和**/usr/local/bin/docker-compose -f docker-compose.yml --no-ansi stop**


### 示例 2：应用程序Docker启动一组容器 {#example-2-with-a-docker-application-starting-a-set-of-containers}

这里我们假设Docker应用程序** myappli **启动一组容器。

  * 首先，在两台服务器上安装** myappli **但不要启动它们。
  * 在一台服务器上，列出myapply和**ls /var/lib/docker/volumes**使用的卷  
因此，您将获得一个路径列表，格式为**/var/lib/docker/volumes/ <volume_name>/_data**
  * 转到**分步配置**部分， 
    * 部署**mirror.safe**模块
    * 设置虚拟 IP 地址** ** ，以便在发生故障时切换。
    * 将**/var/lib/docker/volumes/ <volume_name>/_data**的列表设置为**复制目录**
    * 分别在start_prim和stop_prim脚本中： ** /.../myappli start **和** /.../myappli stop **


### 示例 3，使用简单的Docker图像 {#example-3-with-a-simple-docker-image}

配置以nginx Docker镜像（Web 服务器）为例进行说明。

  * Docker卷创建  
在两台服务器上，创建一个名为**docker volume create replicated_vol**的 Docker 卷。  
获取主机上卷的存储目录路径： **docker volume inspect replicated_vol**  
（例如： **/var/lib/docker/storage/replicated_vol/_data** ）
  * Docker容器创建  
在两台服务器上，创建一个nginx Docker 容器，并将其绑定到之前的卷： **docker container create --name mynginx -v replicated_vol:/usr/share/nginx/html -p 9011:80 nginx**  
将index.html文件填充到卷中： **docker cp index.html mynginx:/usr/share/nginx/html/index.html**
  * 转到**分步配置**部分， 
    * 部署**mirror.safe**模块
    * 设置虚拟 IP 地址** ** ，以便在发生故障时切换。
    * 将**/var/lib/docker/storage/replicated_vol/_data**设置为复制目录
    * 分别放入start_prim和stop_prim脚本中： **docker start mynginx**和**docker stop mynginx**
    * 配置SafeKit后，使用**和http://vitual-ip:9011**测试对index.html的访问。


## SafeKit / Docker解决方案的逐步配置 {#step-by-step-configuration-of-the-safekit--docker-solution}


{{%  insert-safekit-82-configuration-zh-hans app="Docker" mod="mirror"  %}}
 

## SafeKit mirror解决方案的演示 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}