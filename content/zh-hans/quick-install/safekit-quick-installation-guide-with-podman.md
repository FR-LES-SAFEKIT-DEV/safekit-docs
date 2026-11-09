---
title: "Podman 高可用性与 SafeKit：安装 mirror.safe 模块以实现故障转移"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-with-podman/"
description: "部署 mirror.safe 模块以启用 SafeKit，从而实现 Podman 容器在 Linux 上的同步实时复制和自动故障转移。本指南将引导您为没有共享存储的关键应用程序设置一个 2 节点无共享存储集群。"
category: "quick-install"
lang: "zh-hans"
topics: "Podman 高可用性快速安装指南、SafeKit 高可用性限制、SafeKit/Podman 解决方案概述、在 Linux 上安装 SafeKit/Podman 解决方案 (mirror.safe)、SafeKit/Podman 解决方案的分步配置、SafeKit mirror 解决方案演示、🔍 探索 SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# Podman 高可用性与 SafeKit：安装 mirror.safe 模块以实现故障转移 {#podman-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-zh-hans app="Podman" mod="mirror"  %}}
 

## SafeKit/Podman 解决方案概述 {#overview-of-the-safekit--podman-solution}

解决方案在此处介绍：**💡 [SafeKit：Podman 高可用性和实时数据复制软件](</zh-hans/solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers/>)**。

## 在 Linux 上安装 SafeKit/Podman 解决方案 (mirror.safe) {#installation-of-the-safekit--podman-solution-on-linux-mirrorsafe}

### 先决条件 {#prerequisites}

  * 您需要在 SafeKit 中安装您想要重新启动的 Podman 应用程序，该应用程序安装在 2 个节点（虚拟机或物理服务器）上。



{{%  insert-safekit-installation-package-linux-zh-hans app="" mod="mirror"  %}}
 

### 使用简单容器镜像的示例 {#example-with-a-simple-container-image}

在此示例中，我们将展示 SafeKit 如何管理 nginx（Web 服务器）容器，即：复制容器中访问的目录，并在发生故障时在另一个节点上重新启动容器。

#### 先决条件 {#prerequisites-1}

  * **在两个节点上**创建一个复制目录  
创建一个目录 **/replicated_dir_path**，该目录将由 SafeKit 复制，并包含由 nginx 提供的 html 页面
  * **在两个节点上**，用一个初始 HTML 文件填充此目录
        
        cp index.html /replicated_dir_path

  * **在两个节点上**创建容器  
在两个节点上创建一个 nginx 容器，将 **/replicated_dir_path** 目录绑定到 **/usr/share/nginx/html**： 
        
        podman container create --name mynginx -v /replicated_dir_path:/usr/share/nginx/html -p 9011:80 nginx


#### SafeKit 配置 {#safekit-configuration}

  * 转到**分步配置**部分
  * 创建并配置 **mirror.safe** 模块
  * 设置一个**虚拟 IP 地址**，以便在发生故障时进行切换
  * 将 **/replicated_dir_path** 设置为复制目录
  * 分别在 start_prim 和 stop_prim 脚本中放入：**podman start mynginx** 和 **podman stop mynginx**  
注意：如果启用了 SE Linux 您可能需要使用“podman start --security-opt label=disable mynginx”命令。
  * 部署并启动 SafeKit mirror 模块


#### 测试 {#tests}

  * 测试对 nginx 的访问，地址为 **http://vitual-ip:9011/index.html**
  * 测试复制：  
在 SafeKit PRIM 状态的节点上，将其他一些 HTML 文件添加到复制目录中： 
        
        cp page.html /replicated_dir_path

  * 停止处于 SafeKit PRIM 状态的节点上的 mirror 模块
  * 测试容器是否已在辅助节点上重新启动
  * 测试对 **http://vitual-ip:9011/index.html** 和 **http://vitual-ip:9011/page.html** 的访问权限


## SafeKit/Podman 解决方案的分步配置 {#step-by-step-configuration-of-the-safekit--podman-solution}


{{%  insert-safekit-82-configuration-zh-hans app="Podman" mod="mirror"  %}}
 

## SafeKit mirror 解决方案演示 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}