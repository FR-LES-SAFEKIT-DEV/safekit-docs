---
title: "Podman高可用性（需配合SafeKit使用）：安装mirror.safe模块以实现故障转移"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-with-podman/"
description: "为SafeKit部署mirror.safe模块，以在Linux上实现Podman容器的同步实时复制和自动故障转移。本指南将引导您设置一个适用于关键应用程序且无需共享存储的双节点无 SAN 集群。"
category: "quick-install"
lang: "zh-hans"
topics: "Podman 、 SafeKit高可用性快速安装指南； SafeKit / Podman解决方案概述；在Linux ( mirror.safe ) 上安装SafeKit / Podman解决方案； SafeKit / Podman解决方案分步配置； SafeKit mirror解决方案演示；🔍 SafeKit高可用性导航中心"
---

# Podman高可用性（与SafeKit配合使用）：安装mirror.safe模块以实现故障转移 {#podman-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-zh-hans app="Podman" mod="mirror"  %}}
 

## SafeKit / Podman解决方案概述 {#overview-of-the-safekit--podman-solution}

解决方案描述如下： **💡 [ SafeKit : Podman高可用性和实时数据复制软件](</zh-hans/solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers/>)** 。

## 在Linux ( mirror.safe )上安装SafeKit / Podman解决方案 {#installation-of-the-safekit--podman-solution-on-linux-mirrorsafe}

### 先决条件 {#prerequisites}

  * 您需要在 2 个节点（虚拟机或物理服务器）上安装Podman ，以便在SafeKit中重新启动该应用程序。



{{%  insert-safekit-installation-package-linux-zh-hans app="" mod="mirror"  %}}
 

### 示例：简单容器镜像 {#example-with-a-simple-container-image}

在这个例子中，我们将展示SafeKit如何管理nginx （Web 服务器）容器，即：复制容器中访问的目录，并在发生故障时在另一个节点上重新启动容器。

#### 先决条件 {#prerequisites-1}

  * 在两个节点**上创建复制目录** 。  
创建目录**/replicated_dir_path**该目录将由SafeKit复制，并且将包含由nginx提供的 HTML 页面。
  * 在两个节点**上，将初始 html 文件**填充到此目录中。
        
        cp index.html /replicated_dir_path

  * 创建一个容器 **在两个节点上**  
在两个节点上创建nginx容器，并将**/replicated_dir_path**目录绑定到**/usr/share/nginx/html** ： 
        
        podman container create --name mynginx -v /replicated_dir_path : /usr/share/nginx/html -p 9011:80 nginx


#### SafeKit配置 {#safekit-configuration}

  * 请前往**分步配置**部分。
  * 创建并配置**mirror.safe**模块
  * 设置一个**虚拟 IP 地址**，以便在发生故障时进行切换。
  * 将**/replicated_dir_path**设置为复制目录
  * 分别将start_prim和stop_prim脚本中的代码填入： **podman start mynginx**和**podman stop mynginx**  
注意：您可能需要使用“podman start --security-opt label=disable mynginx ”和 SE Linux 。
  * 部署并启动SafeKit mirror模块


#### 测试 {#tests}

  * 在**http://vitual-ip:9011/index.html**处测试对nginx访问权限
  * 测试复现：  
在处于SafeKit PRIM 状态的节点上，向复制目录中添加一些其他 html 文件： 
        
        cp page.html /replicated_dir_path

  * 停止处于SafeKit PRIM 状态的节点上的mirror模块
  * 测试辅助节点上的容器是否已重启
  * 测试对**http://vitual-ip:9011/index.html**和**http://vitual-ip:9011/page.html**的访问权限


## SafeKit / Podman解决方案的逐步配置 {#step-by-step-configuration-of-the-safekit--podman-solution}


{{%  insert-safekit-82-configuration-zh-hans app="Podman" mod="mirror"  %}}
 

## SafeKit mirror解决方案的演示 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}