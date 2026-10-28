---
title: "使用SafeKit实现 K3S 高可用性：安装k3s.safe模块以实现故障转移"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-with-kubernetes/"
description: "为SafeKit部署k3s.safe模块，以启用Kubernetes在Linux上的同步实时复制和自动故障转移。本指南将引导您设置一个双节点无 SAN 集群，用于运行关键的Linux应用程序，而无需共享存储。"
category: "quick-install"
lang: "zh-hans"
topics: "Kubernetes 、 SafeKit高可用性快速安装指南； SafeKit / Kubernetes解决方案概述； SafeKit / Kubernetes解决方案在Linux ( k3s.safe ) 上的安装和配置；集群中网络隔离的不同场景； SafeKit和mirror解决方案演示；🔍 SafeKit高可用性导航中心"
---

# 使用SafeKit的 K3S 高可用性：安装k3s.safe模块以实现故障转移{#k3s-high-availability-with-safekit-install-the-k3ssafe-module-for-failover}


{{%  insert-safekit-mirror-guide-zh-hans app="Kubernetes" mod="k3s"  %}}
 

## SafeKit / Kubernetes解决方案概述{#overview-of-the-safekit--kubernetes-solution}

解决方案如下： ** 💡 [ Kubernetes K3s 高可用性：双节点同步复制和故障转移](</solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/>) **

## 在Linux ( k3s.safe ) {#installation-and-configuration-of-the-safekit--kubernetes-solution-on-linux-k3ssafe}上安装和配置SafeKit / Kubernetes解决方案

### 1. 下载软件包{#1-download-packages}

  * 在Linux上下载免费版SafeKit 8.2 (safekitlinux_xx.bin)
  * 下载k3s.safe Linux模块
  * 下载k3sconfig.sh脚本
  * 文档（pptx）


注意： k3sconfig.sh脚本在 2 个Linux Ubuntu 24.04 节点上安装 K3S、 MariaDB 、NFS、 SafeKit 。

[下载SafeKit ( Linux ) > ](</zh-hans/resources/safekit-free-trial/>)

<a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s.safe" download="k3s.safe">下载k3s.safe ( Linux ) > </a> 

[下载k3sconfig.sh > ](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3sconfig.sh>)

[文档（pdf）> ](</wp-content/uploads/documents/safekit-k3s-en.pdf>)

### 2. 首先在两个节点{#2-first-on-both-nodes}上

在 2 个Linux Ubuntu 24.04 节点上，以 root 用户身份：

  * 确保节点可以访问互联网（可以通过代理）。
  * 将k3sconfig.sh 、 k3s.safe和 safekit_xx.bin 软件包复制到一个目录中，然后进入该目录。
  * 将 .bin 文件重命名为“safekit.bin”。
  * 请确保k3sconfig.sh和 safekit.bin 是可执行文件。
  * 编辑k3sconfig.sh脚本，并根据您的环境自定义环境变量（包括虚拟 IP）。
  * 在两个节点上执行： `./k3sconfig.sh prereq`


脚本将：

  * 安装所需的 Debian 软件包：alien、nfs-kernel-server、nfs-common、mariadb-server
  * 安全安装 MariaDB
  * 创建用于文件复制的目录
  * 准备 NFS 服务器以共享复制目录
  * 安装SafeKit


### 3. 在第一个节点{#3-on-the-first-node}

在第一个节点上执行： `./k3sconfig.sh first`

脚本将：

  * 创建 K3S 配置数据库和 k3s 用户
  * 创建复制存储卷文件（稀疏文件）并将其格式化为 xfs 文件系统
  * 创建 Safekit 集群配置并应用它
  * 在集群上安装并配置k3s.safe模块。
  * 在第一个节点上以“prim”身份启动k3s模块
  * 下载、安装并启动 k3s
  * 下载并安装 nfs-subdir-external-provisioner Helm chart
  * 显示 K3S 令牌（用于第二个节点安装阶段）


### 4. 在第二个节点{#4-on-the-second-node}

在第二个节点上执行： `./k3sconfig.sh second <token>`

  * <token>是在第一个节点上执行“ k3sconfig.sh first”命令结束时显示的字符串。


脚本将：

  * 确保 k3s 模块在第一个节点上以主节点身份启动
  * 在第二个节点上安装 k3s
  * 启动 k3s 模块


### 5. 检查 k3s SafeKit模块是否在两个节点{#5-check-that-the-k3s-safekit-module-is-running-on-both-nodes}上都运行。

在两个节点上使用以下命令进行检查： `/opt/safekit/safekit –H "*" state`

回复内容应与图片类似。
    
    
    /opt/safekit/safekit –H " * " 状态
    ---------------- 服务器= http://10.0.0.20:9010 ----------------
    管理员操作=执行
    --------------------- k3s 状态 ---------------------
    
      本地 (127.0.0.1) : PRIM (服务：可用)(颜色：绿色)
    成功
    ---------------- 服务器= http://10.0.0.21:9010 ----------------
    管理员操作=执行
    --------------------- k3s 状态 ---------------------
    
      本地 (127.0.0.1) : 二级 (服务：可用)(颜色：绿色)
    成功
    

### 6. 启动SafeKit Web 控制台以管理集群{#6-start-the-safekit-web-console-to-administer-the-cluster}

  * 将浏览器连接到SafeKit Web 控制台 URL `http://server0-IP:9010` 。
  * 你应该会看到一个与图片类似的页面。
  * 使用Linux命令行检查 K3S 是否已在两个节点上启动（在`start_prim`和`start_second`中启动），以及MariaDB是否已在主节点上启动（在`start_prim`中启动）。


![ Kubernetes集群已在SafeKit Web 控制台](/wp-content/uploads/2024/03/14-monitoring-prim-second.png)中启动


### 7. 测试{#7-testing}

  * 通过向下滚动其上下文菜单并单击`Stop`来停止 PRIM 节点。
  * 确认第二个节点上是否存在故障转移，该节点应变为单独运行（绿色）。
  * 而且还有命令行 Linux检查服务的故障转移情况（在节点 1 上停止）。 `stop_prim` 脚本在节点 2 上启动 `start_prim` 脚本）。 MariaDB K3S 应该在节点 2 上运行。


![警告](/wp-content/uploads/2022/07/warning-small.png)


如果节点 2 上未达到 ALONE（绿色），请使用节点 2 的模块日志分析原因。

  * 点击`node2`显示模块日志。
  * [一个例子 SQL Server 模块日志](</wp-content/uploads/2024/03/24-module-log-script.png>) 其中服务名称 `start_prim` 无效。 sqlserver.exe 进程受到监控，但由于没有启动，最终模块停止运行。


![警告](/wp-content/uploads/2022/07/warning-small.png)


如果一切正常，则在节点 1 上启动，这将从节点 2 重新同步复制的目录。

如果出现问题，停止节点2，强制节点1的主节点[启动，节点](</wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png>)将使用停止时本地的健康数据重新启动。


![注](/wp-content/uploads/2022/07/note.png)


🛠️ [更多测试信息请参阅用户指南。 ](</resources/safekit-user-guide-82/#tests>)


![停止 PRIM 服务器上的模块](/wp-content/uploads/2024/03/16-monitoring-prim-second-stop.png)


### 8. 使用类似 WordPress Kubernetes {#8-try-the-cluster-with-a-kubernetes-application-like-wordpress}应用程序测试集群。

图片中展示了一个 WordPress 安装示例：一个通过 pod 实现后端数据库的 Web 门户。

您也可以用同样的方法部署自己的应用程序。

WordPress 具有自动高可用性：

  * 其数据（php + 数据库）存储在持久卷中，并由SafeKit实时复制。
  * 用户可以通过虚拟 IP 地址访问 WordPress 网站。
  * 具备自动故障转移和自动故障恢复功能


笔记：

  * WordPress 图表定义了一个负载均衡服务，该服务监听<service.port>和<service.httpsport>端口。
  * 可以通过以下网址访问 WordPress： `http://<virtual-ip>:<service.port>.`
  * 虚拟 IP 由SafeKit管理，并在发生故障转移时自动切换。
  * 默认情况下，K3S 使用 Klipper 实现负载均衡。
  * Klipper 监听<virtual ip> : <service.port> ，并将 TCP/IP 数据包路由到它所选择的 WordPress pod 的 IP 地址和端口。


    
    
    $ export KUBECONFIG= /etc/rancher/k3s/k3s.yaml
    $ helm repo add bitnami https://charts.bitnami.com/bitnami
    $ helm install my-release bitnami/wordpress --set global.storageClass=nfs-client --set service.ports.http=8099,service.ports.https=4439
    

之前的 Helm 命令应该从`registry-1.docker.io`下载 WordPress 镜像。您可能会在`registry-1.docker.io`上遇到身份验证问题。在这种情况下，您应该：

  * 在两个节点上创建`/etc/rancher/k3s/registries.yaml` ，并在其内部： 
        
        配置：
          "registry-1.docker.io":
            认证：
              用户名：你的用户名
              密码：你的密码
            tls：
              insecure_skip_verify: true
        

  * 停止并启动 k3s 以考虑这一点，使用`systemctl stop k3s`和`systemctl start k3s` 。
  * 执行`helm registry login -u your_user_name docker.io` ，然后输入您的密码


### 9. 支持{#9-support}

  * 要获得支持，请下载 2 个SafeKit `Snapshots` （2 个 .zip 文件），每个节点一个。


![注](/wp-content/uploads/2022/07/note.png)


🛠️ [故障排除，请参阅用户指南](</resources/safekit-user-guide-82/#Troubleshooting>)


![拍摄快照以供支持](/wp-content/uploads/2024/03/30-snapshots-mirror.png)


### 10. 如有必要，配置脑裂检测器{#10-if-necessary-configure-a-splitbrain-checker}

  * 请参阅下文[ “集群中网络隔离的不同场景有哪些？” ](#isolation)了解是否需要配置脑裂检测器。
  * 在模块配置中，单击`Advanced Configuration` （见图）以编辑`userconfig.xml` 。
  * 通过在`<check>`的`userconfig.xml`部分中添加以下内容来声明裂脑检测器： 
        
        <service>
         ...
         <check>
          ...
          <splitbrain ident="witness" exec="ping" arg="witness IP"/>
         </check>
        

  * `Save and apply`新配置，用于在两个节点上重新部署修改后的userconfig.xml文件（必须在两个节点上停止模块才能保存和应用）。


**参数** ：

  * `ident="witness"`用于标识资源名称为`splitbrain.witness`的见证人。您可以更改此值以标识见证人。
  * `exec="ping"`指的是要执行的 ping 代码。请勿更改此值。
  * `arg="witness IP"`是 ping 命令的参数。请将此值更改为见证设备的 IP 地址（通常是一个可靠的设备，例如路由器）。


![输入参数](/wp-content/uploads/2024/03/05-module-mirror-edit-config.png)



{{%  insert-safekit-network-isolation-zh-hans  %}}
 

## SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}解决方案的演示


{{%  insert-safekit-mirror-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}