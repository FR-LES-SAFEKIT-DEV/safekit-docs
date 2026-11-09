---
title: "使用 SafeKit 实现 K3S 高可用性：安装 k3s.safe 模块以实现故障转移"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-with-kubernetes/"
description: "部署 k3s.safe 模块，以实现 SafeKit 在 Linux 上对 Kubernetes 的同步实时复制和自动故障转移。本指南将引导您为关键 Linux 应用程序设置一个无共享存储的 2 节点无 SAN 集群。"
category: "quick-install"
lang: "zh-hans"
topics: "Kubernetes 高可用性快速安装指南、SafeKit 高可用性限制、SafeKit/Kubernetes 解决方案概述、在 Linux 上安装和配置 SafeKit/Kubernetes 解决方案 (k3s.safe)、集群中网络隔离的不同场景有哪些？、SafeKit mirror 解决方案演示、🔍 探索 SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# 使用 SafeKit 实现 K3S 高可用性：安装 k3s.safe 模块以实现故障转移 {#k3s-high-availability-with-safekit-install-the-k3ssafe-module-for-failover}


{{%  insert-safekit-mirror-guide-zh-hans app="Kubernetes" mod="k3s"  %}}
 

## SafeKit/Kubernetes 解决方案概述 {#overview-of-the-safekit--kubernetes-solution}

解决方案在此处介绍：**💡 [Kubernetes K3s 高可用性：2 节点同步复制和故障转移](</zh-hans/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/>)**

## 在 Linux 上安装和配置 SafeKit/Kubernetes 解决方案 (k3s.safe) {#installation-and-configuration-of-the-safekit--kubernetes-solution-on-linux-k3ssafe}

### 1. 下载软件包 {#1-download-packages}

  * 在 Linux 上下载 SafeKit 8.2 的免费版本 (safekitlinux_xx.bin)
  * 下载 k3s.safe Linux 模块
  * 下载 k3sconfig.sh 脚本
  * 文档 (pptx)


注意：k3sconfig.sh 脚本在 2 个 Linux Ubuntu 24.04 节点上安装 K3S、MariaDB、NFS 和 SafeKit。

[下载 SafeKit (Linux) >](</zh-hans/resources/safekit-free-trial/>)

<a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s.safe" download="k3s.safe">下载 k3s.safe (Linux) ></a> 

[下载 k3sconfig.sh >](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3sconfig.sh>)

[文档 (pdf) >](</wp-content/uploads/documents/safekit-k3s-en.pdf>)

### 2. 首先在两个节点上 {#2-first-on-both-nodes}

在 2 个 Linux Ubuntu 24.04 节点上，以 root 身份：

  * 确保节点可以访问互联网（可以通过代理）
  * 将 k3sconfig.sh、k3s.safe 和 safekit_xx.bin 包复制到一个目录中，然后 cd 到该目录中
  * 将 .bin 文件重命名为“safekit.bin”
  * 确保 k3sconfig.sh 和 safekit.bin 可执行。
  * 编辑 k3sconfig.sh 脚本，并根据您的环境自定义环境变量（包括虚拟 IP）
  * 在两个节点上执行：`./k3sconfig.sh prereq`


该脚本将：

  * 安装所需的 Debian 软件包：alien、nfs-kernel-server、nfs-common、mariadb-server
  * 安全安装 MariaDB
  * 创建用于文件复制的目录
  * 准备 NFS 服务器以共享复制目录
  * 安装 SafeKit


### 3. 在第一个节点上 {#3-on-the-first-node}

在第一个节点上执行：`./k3sconfig.sh first`

该脚本将：

  * 创建 K3S 配置数据库和 k3s 用户
  * 创建复制存储卷文件（稀疏文件）并将其格式化为 xfs 文件系统
  * 创建 safekit 集群配置并应用它
  * 在集群上安装并配置 k3s.safe 模块
  * 在第一个节点上将 k3s 模块启动为“prim”
  * 下载、安装并启动 k3s
  * 下载并安装 nfs-subdir-external-provisioner Helm 图表
  * 显示 K3S 令牌（在第二个节点安装阶段使用）


### 4. 在第二个节点上 {#4-on-the-second-node}

在第二个节点上执行：`./k3sconfig.sh second <token>`

  * <token> 是在第一个节点上首次执行“ k3sconfig.sh ”时显示的字符串


该脚本将：

  * 确保 k3s 模块在第一个节点上以 prim 模式启动
  * 在第二个节点上安装 k3s
  * 启动 k3s 模块


### 5. 检查 k3s SafeKit 模块是否在两个节点上运行 {#5-check-that-the-k3s-safekit-module-is-running-on-both-nodes}

在两个节点上使用此命令进行检查：`/opt/safekit/safekit –H "*" state`

回复应与图片相似。
    
    
    /opt/safekit/safekit –H "*" state
    ---------------- 服务器= http://10.0.0.20:9010 ----------------
    admin 操作=执行
    --------------------- k3s 状态 ---------------------
    
      本地 (127.0.0.1) : PRIM (服务：可用)(颜色：绿色)
    成功
    ---------------- 服务器= http://10.0.0.21:9010 ----------------
    admin 操作=执行
    --------------------- k3s 状态 ---------------------
    
      本地 (127.0.0.1)：SECOND (服务：可用) (颜色：绿色)
    成功
    

### 6. 启动 SafeKit Web 控制台以管理集群 {#6-start-the-safekit-web-console-to-administer-the-cluster}

  * 将浏览器连接到 SafeKit Web 控制台网址 `http://server0-IP:9010`。
  * 您应该会看到一个与图片类似的页面。
  * 使用 Linux 命令行检查 K3S 是否已在两个节点上启动（在 `start_prim` 和 `start_second` 中启动），以及 MariaDB 是否已在主节点上启动（在 `start_prim` 中启动）。


![Kubernetes 集群已在 SafeKit Web 控制台中启动](/wp-content/uploads/2024/03/14-monitoring-prim-second.png)


### 7. 测试 {#7-testing}

  * 向下滚动 PRIM 节点的上下文菜单，然后单击 `Stop`。
  * 验证 SECOND 节点上是否存在故障转移，该节点应变为 ALONE（绿色）。
  * 在 Linux 上使用命令行，检查服务的故障转移（在 `stop_prim` 脚本中停止节点 1 上的服务，并在 `start_prim` 脚本中启动节点 2 上的）。MariaDB 和 K3S 应该在 node2 上运行。


![警告](/wp-content/uploads/2022/07/warning-small.png)


如果 node2 未达到 ALONE（绿色）状态，请使用节点 2 的模块日志分析原因。

  * 点击 `node2` 以显示模块日志。
  * [SQL Server 模块日志示例，](</wp-content/uploads/2024/03/24-module-log-script.png>)其中 `start_prim` 中的服务名称无效 sqlserver.exe 进程受到监控，但由于它未启动，因此模块最终会停止。


![警告](/wp-content/uploads/2022/07/warning-small.png)


如果一切正常，请在 node1 上启动，这将从 node2 重新同步复制的目录。

如果出现问题，请停止 node2 并强制 node1[作为主节点启动](</wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png>)，它将使用停止时本地健康的数据重新启动。


![注意](/wp-content/uploads/2022/07/note.png)


🛠️ [有关测试的更多信息，请参阅《用户指南》。](</zh-hans/resources/safekit-user-guide-82/#tests>)


![停止 PRIM 服务器上的模块](/wp-content/uploads/2024/03/16-monitoring-prim-second-stop.png)


### 8. 使用 WordPress 等 Kubernetes 应用程序试用集群 {#8-try-the-cluster-with-a-kubernetes-application-like-wordpress}

图片中有一个 WordPress 安装示例：一个由 pod 实现的带有后端数据库的门户网站。

您也可以用同样的方式部署自己的应用程序。

WordPress 自动实现高可用性：

  * 其数据（php + 数据库）存储在持久卷中，并由 SafeKit 实时复制
  * 用户通过虚拟 IP 地址访问 WordPress 网站
  * 具有自动故障转移和自动回切


备注：

  * WordPress 图表定义了一个负载均衡服务，该服务监听 <service.port> 和 <service.httpsport> 端口。
  * 可通过网址 `http://<virtual-ip>:<service.port>.`
  * 虚拟 IP 由 SafeKit 管理，并在故障转移时自动切换。
  * 默认情况下，K3S 使用 Klipper 实现负载均衡器。
  * Klipper 监听 <virtual ip> : <service.port>，并将 TCP/IP 数据包路由到其选定的 WordPress pod 的 IP 地址和端口。


    
    
    $ export KUBECONFIG= /etc/rancher/k3s/k3s.yaml
    $ helm repo add bitnami https://charts.bitnami.com/bitnami
    $ helm install my-release bitnami/wordpress --set global.storageClass=nfs-client --set service.ports.http=8099,service.ports.https=4439
    

之前的 helm 命令应该从 `registry-1.docker.io` 下载 WordPress 镜像。您可能会在 `registry-1.docker.io` 上遇到身份验证问题。在这种情况下，您应该：

  * 在两个节点上创建 `/etc/rancher/k3s/registries.yaml` 内容如下： 
        
        configs:
          "registry-1.docker.io":
            auth:
              username: your_user_name
              password: your_password
            tls:
              insecure_skip_verify: true
        

  * 使用 `systemctl stop k3s` 和 `systemctl start k3s`。以使其生效。
  * 执行 `helm registry login -u your_user_name docker.io`，然后输入您的密码


### 9. 支持 {#9-support}

  * 如需获取支持，请为每个节点拍摄 2 个 SafeKit `Snapshots`（2 个 .zip 文件）。


![注意](/wp-content/uploads/2022/07/note.png)


🛠️ [用户指南中的故障排除。](</zh-hans/resources/safekit-user-guide-82/#Troubleshooting>)


![截屏以获取支持](/wp-content/uploads/2024/03/30-snapshots-mirror.png)


### 10. 如有必要，请配置脑裂检测器 {#10-if-necessary-configure-a-splitbrain-checker}

  * 请参阅下面的[“集群中网络隔离的不同场景是什么？”，](#isolation)以了解您是否需要配置脑裂检测器。
  * 在模块配置中，单击 `Advanced Configuration`（见图）以编辑 `userconfig.xml`。
  * 通过在 `userconfig.xml` 的 `<check>` 部分中添加以下内容来声明脑裂检测器： 
        
        <service>
         ...
         <check>
          ...
          <splitbrain ident="witness" exec="ping" arg="witness IP"/>
         </check>
        

  * `Save and apply` 新配置，以便在两个节点上重新部署修改后的 userconfig.xml 文件（必须在两个节点上停止模块才能保存和应用）。


**参数**：

  * `ident="witness"` 使用资源名称 `splitbrain.witness`。标识见证。您可以更改此值以标识见证。
  * `exec="ping"` 引用要执行的 ping 代码。请勿更改此值。
  * `arg="witness IP"` 是 ping 的参数。将此值更改为见证者的 IP（一个可靠的元素，通常是路由器）。


![输入参数](/wp-content/uploads/2024/03/05-module-mirror-edit-config.png)



{{%  insert-safekit-network-isolation-zh-hans  %}}
 

## SafeKit mirror 解决方案演示 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}