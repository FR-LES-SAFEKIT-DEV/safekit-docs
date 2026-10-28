---
title: "旧版SafeKit Milestone配置"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-old-milestone-configuration/"
category: "quick-install"
lang: "zh-hans"
topics: "SafeKit / Milestone XProtect解决方案的旧版逐步配置方法"
---

# 旧配置SafeKit Milestone {#old-safekit-milestone-configuration}

## SafeKit / Milestone XProtect解决方案的旧版逐步配置 {#old-step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


![警告](/wp-content/uploads/2022/07/warning-small.png)


请注意，虚拟 IP 地址的配置需要一些特定的步骤，否则故障转移将无法正常工作。

### 1. 启动SafeKit控制台 {#1-launch-the-safekit-console}

  * 在集群的一个节点上，通过连接到`http://localhost:9010` ，在浏览器中启动 Web 控制台。
  * 输入用户名`admin`和安装过程中定义的密码。


您也可以在集群外部的工作站上的浏览器中运行控制台。


![警告](/wp-content/uploads/2022/07/warning-small.png)


SafeKit的配置可以在两个节点上通过同一个浏览器完成。


![注](/wp-content/uploads/2022/07/note.png)


要保护 Web 控制台，请参阅用户指南中的“保护SafeKit Web 控制台”部分。


启动![ ](/wp-content/uploads/2023/01/appli-1.png)控制台以配置集群SafeKit


### 2. 配置节点地址 {#2-configure-node-addresses}

  * 输入节点IP地址。
  * 然后，点击`Apply`保存配置。


![警告](/wp-content/uploads/2022/07/warning-small.png)


如果节点 1 或节点 2 的背景颜色为红色，请检查浏览器与这两个节点的连接情况，并检查这两个节点上的防火墙以进行故障排除。


![注](/wp-content/uploads/2022/07/note.png)


此操作会将 IP 地址放入两个节点上的`cluster.xml`文件中（更多信息请参阅命令行培训）。


![输入集群](/wp-content/uploads/2023/01/appli-3.png)的节点


### 3. 选择模块 {#3-choose-the-module}

  * 在“配置”选项卡中，单击 .safe 模块。


![注](/wp-content/uploads/2022/07/note.png)


如果在安装过程中将模块放入服务器端的“Application_Modules/demo/”目录中，控制台将在该目录中找到xxx.safe 。


![选择](/wp-content/uploads/2023/01/appli-4.png)的模块


### 4. 配置模块 {#4-configure-the-module}

  * 选择在启动时自动启动该模块，无需延迟。
  * 通常情况下，复制操作会在同一个心跳网络上进行。但如有必要，您也可以定义一个私有网络。
  * 检查复制的目录是否已安装在两个节点上，并且包含应用程序数据。  
数据库需要对数据和日志进行复制。  
您可以根据需要添加新的复制目录。
  * 请输入虚拟IP地址。虚拟IP地址是与两个节点的IP地址位于同一IP网络（同一子网）中的标准IP地址。  
应用程序客户端必须配置虚拟 IP 地址（或与虚拟 IP 地址关联的 DNS 名称）。  
虚拟IP地址在发生故障时会自动切换。
  * `start_prim`和`stop_prim`必须包含应用程序的启动和停止。  
您可以在这些脚本中添加新服务。  
检查这些脚本中的服务名称是否与两个节点上安装的服务名称一致，否则请在脚本中修改它们。
  * 停止两个节点上`start_prim`中配置的服务。
  * 在Windows和两个节点上，使用Windows服务管理器，为`start_prim`中注册的所有服务设置`Boot Startup Type = Manual` （ SafeKit控制`start_prim`中服务的启动）。


![警告](/wp-content/uploads/2022/07/warning-small.png)


如果 SQL 位于管理服务器上：

  * [ SQL 系统数据库](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) （例如 master.mdf 和 mastlog.ldf）必须位于两个节点上的相同目录中。这些目录必须配置为已复制。
  * SQL 必须安装在两个节点文件系统中的相同位置](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) [二进制文件中，并且是故障转移所必需的。此数据库无需复制。
  * SQL Milestone 数据库（.mdf 和 .ldf 文件）必须位于两个节点上的相同目录中。这些目录必须配置为复制。 Milestone 根据此，数据库如下。 [文章](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>).


![警告](/wp-content/uploads/2022/07/warning-small.png)


请注意，如果进程名称显示在进程检查器中，则会对其进行监控，并在发生故障时执行重启操作。配置错误的进程名称会导致模块在启动后立即停止。


![注](/wp-content/uploads/2022/07/note.png)


“应用”按钮会将配置信息报告到两个节点上的`userconfig.xml` 、 `start_prim` 、 `stop_prim`文件中（更多信息请参阅命令行培训）。


![输入模块设置](/wp-content/uploads/2023/01/appli-7-1.png)


### 5. 验证配置是否成功 {#5-verify-successful-configuration}

  * 检查两个节点上的成功消息（绿色），然后单击“下一步”。


![检查模块配置是否成功](/wp-content/uploads/2023/01/appli-9-2.png)


### 6. 不要启动任何程序，然后单击“关闭”按钮 {#6-do-not-start-anything-and-click-on-the-close-button}


![警告](/wp-content/uploads/2022/07/warning-small.png)


请勿启动任何程序，并单击“关闭”按钮，因为在启动之前需要对虚拟 IP 地址进行特殊配置。


![选择具有最新数据的节点](/wp-content/uploads/2023/01/appli-10-1.png)


### 7. 转到节点 1 的桌面，并在内部文件Milestone中设置虚拟 IP 地址。 {#milestone-files}


![注](/wp-content/uploads/2022/07/note.png)


自Milestone 2022 R3 起，此步骤不再有用，将在下一步中使用“服务器配置器 - 注册服务器 - http://virtual-IP"自动完成。

以管理员身份在 PowerShell 命令行中，在节点 1 上执行以下脚本：
    
    
    c: /safekit/modules / /bin/UpdateAuthServerUri.ps1


![注](/wp-content/uploads/2022/07/note.png)


此脚本在两个内部Milestone文件中设置虚拟 IP 地址：
    
    
    C:\ProgramData\ Milestone \ XProtect管理服务器\ ServerConfig.xml
    
    
        <AuthorizationServerUri> /IDP</AuthorizationServerUri> http://** < virtual-ip> **
    
    
    C:\Program Files\ Milestone \ XProtect Management Server\ IIS \IDP\appsettings.json
    
    
        "权限": " http://**< virtual-ip>** /IDP "


![警告](/wp-content/uploads/2022/07/warning-small.png)


我们假设在此步骤中虚拟 IP 地址已在前几个步骤中正确配置（脚本使用在SafeKit控制台中输入并存储在`userconfig.xml`中的虚拟 IP 地址）。


![注](/wp-content/uploads/2022/07/note.png)


### 8. 在控制台中将节点 1 设置为主节点，该节点拥有最新的数据 {#8-start-node-1-as-primary-in-the-console-the-node-with-up-to-date-data}

从步骤 7 开始，我们假设节点 1 具有最新的复制目录。

强制将节点 1 设置为主节点。当节点 2 启动时，节点 1 中的所有数据都将复制到节点 2。


![警告](/wp-content/uploads/2022/07/warning-small.png)


如果选择错误，则可能在两个节点上同步过时的数据。


![警告](/wp-content/uploads/2022/07/warning-small.png)


此外，还假设应用程序在节点 1 上停止，以便SafeKit安装复制机制，然后在`start_prim`脚本中启动应用程序。


![强制将具有最新数据的节点作为主节点启动](/wp-content/uploads/2022/07/appli-11-bis.png)


### 9. 等待状态变为 ALONE（绿色） {#9-wait-for-the-transition-to-alone-green}

  * 节点 1 应达到 ALONE（绿色）状态，这意味着`start_prim`脚本已在节点 1 上执行。


![警告](/wp-content/uploads/2022/07/warning-small.png)


如果状态为 ALONE（绿色）且应用程序未启动，请检查节点 1 的应用程序日志中`start_prim`的输出消息。


![警告](/wp-content/uploads/2022/07/warning-small.png)


如果节点 1 没有达到 ALONE（绿色）状态，请使用节点 1 的模块日志分析原因。


![警告](/wp-content/uploads/2022/07/warning-small.png)


如果集群处于`WAIT (red) not uptodate - STOP (red) not uptodate`状态，则停止 WAIT 节点并强制其作为主节点启动。


![第一个节点最初是主节点，后来变为独立节点](/wp-content/uploads/2022/07/appli-11-bis-bis.png)


### 10. 在节点 1 的桌面上，停止并注册虚拟 IP 地址，然后重启Milestone管理服务器 {#10-in-the-desktop-of-node-1-stop-then-register-on-the-vitual-ip-address-and-restart-the-milestone-management-server}

根据图中所示的菜单，在节点 1 上执行以下步骤：

  * 右键单击任务栏中的**Milestone管理服务器**图标。
  * **停止管理服务器服务**
  * 然后选择**服务器配置器...**并注册虚拟 IP 地址。
  * **启动管理服务器服务**


![注](/wp-content/uploads/2022/07/note.png)


此过程通过与虚拟地址的连接，在 SQL 数据库（运行在节点 1 上）中注册节点 1 管理服务器。


![警告](/wp-content/uploads/2022/07/warning-small.png)


在Milestone 2022 R3 版本之前，注册操作可能删除了内部Milestone文件中的虚拟 IP 地址配置。在这种情况下，请重复[步骤 7 ](#milestone-files) 。


![注](/wp-content/uploads/2022/07/note.png)


注意：要注册Milestone 2020 R2 之前的版本，请使用**更改加密设置...**


![在Milestone 2020+ ](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)中注册管理服务器


### 11. 在节点 1 的桌面上，使用Milestone管理客户端，在服务和网络的 URL 中设置虚拟 IP 地址。 {#11-in-the-desktop-of-node-1-with-milestone-management-client-set-the-virtual-ip-address-in-urls-for-services-and-network}


![注](/wp-content/uploads/2022/07/note.png)


自Milestone 2022 R3 版本起，此步骤已不再需要，并且已通过“服务器配置器 - 注册服务器 - http://virtual-IP".自动完成。

根据图片所示：

  1. 在节点 1 上启动**Milestone XProtect管理客户端** 。
  2. 在**工具**菜单中，选择**注册服务** 。 
     * 在**添加/删除**注册服务”窗口中，选择列表中的一项服务，然后单击“ **** 。
     * 在**编辑已注册服务**窗口中，将服务的 URL 地址更改为与原 URL 地址相同但包含虚拟 IP 地址的地址。
     * 对窗口中列出的所有服务重复这些步骤。
  3. 在同一窗口中，单击**网络** 。 
     * 在**网络配置**窗口中，将服务器的 URL 地址更改为与原 URL 地址相同但包含虚拟 IP 地址的地址。


![在 URL 和Milestone管理客户端中设置虚拟 IP 地址](/wp-content/uploads/2022/07/milestone-url-vip.png)


### 12. 在节点 1 的桌面上，使用Milestone管理客户端，设置管理员角色以确保正确的故障转移 {#role}


![注](/wp-content/uploads/2022/07/note.png)


如果已使用 Active Directory 配置了Milestone “ Windows身份验证”，则在故障转移后，将在辅助节点的外部 AD 中检索用户名/密码，因此无需特殊配置。

启动Milestone XProtect管理客户端时，必须使用“ Windows身份验证”或“基本身份验证”进行身份验证（ [点击此处查看屏幕截图](</wp-content/uploads/2022/07/milestone-management-server-connect.png>) ）。

打开**Milestone XProtect管理客户端** ，然后在**安全/角色**中打开（参见图片）

  * 将Windows组**BUILTIN\Administrators**设置为 。这样，辅助服务器上的管理员用户将能够使用“ Windows身份验证”连接到辅助服务器上的Milestone 。
  * 创建一个使用“基本身份验证”的用户（图中为**Admin** ），以确保在故障转移后能够在备用节点上重新进行身份验证。对于“基本身份验证”，用户名/密码存储在 SQL 数据库中，故障转移后将在备用节点上检索。


![警告](/wp-content/uploads/2022/07/warning-small.png)


通过设置 BUILTIN\Administrators 组，您可以使用本地Windows管理员在辅助节点上进行身份验证。

否则，故障转移后，辅助服务器上的本地Windows帐户将无法进行身份验证。

这是因为 BUILTIN\Administrators 组在两个节点上具有相同的 SID。对于其他本地组或本地用户，即使名称相同，由于两个节点上的 SID 不同，也无法在辅助节点上进行身份验证。


![在Milestone管理客户端中设置角色](/wp-content/uploads/2022/07/milestone-management-server-roles.png)


### 13. 转到节点 2 的桌面，并在内部文件Milestone中设置虚拟 IP 地址。 {#milestone-files-2}


![注](/wp-content/uploads/2022/07/note.png)


自Milestone 2022 R3 起，此步骤不再有用，将在下一步中使用“服务器配置器 - 注册服务器 - http://virtual-IP"自动完成。

以管理员身份在 PowerShell 命令行中，在节点 2 上执行以下脚本：
    
    
    c: /safekit/modules/milestone/bin/UpdateAuthServerUri.ps1


![注](/wp-content/uploads/2022/07/note.png)


此脚本在两个内部Milestone文件中设置虚拟 IP 地址：
    
    
    C:\ProgramData\ Milestone \ XProtect管理服务器\ ServerConfig.xml
    
    
        <AuthorizationServerUri> /IDP</AuthorizationServerUri> http://** < virtual-ip> **
    
    
    C:\Program Files\ Milestone \ XProtect Management Server\ IIS \IDP\appsettings.json
    
    
        "权限": " http://**< virtual-ip>** /IDP "

### 14. 在节点 2 的桌面上，注册管理服务器到虚拟 IP 地址 {#14-in-the-desktop-of-node-2-register-the-management-server-on-the-vitual-ip-address}

  * 在节点 2 的任务栏中选择**服务器配置器** ，并将其注册到虚拟 IP 地址（参见图片）。
  * 然后**停止管理服务器服务** 。


![警告](/wp-content/uploads/2022/07/warning-small.png)


在节点 2 上执行注册的用户帐户必须在节点 1 上的Milestone中具有管理员角色。

如果是由节点 2 上的本地管理员进行注册，则必须在管理客户端/安全/角色中设置内置组Windows `BUILTIN\Administrators` [步骤 12 ](#role) ）。否则，注册将无法成功。


![注](/wp-content/uploads/2022/07/note.png)


此过程通过与虚拟地址的连接，在 SQL 数据库（运行在节点 1 上）中注册节点 2 管理服务器。


![警告](/wp-content/uploads/2022/07/warning-small.png)


对于 2022 R3 之前的Milestone版本，注册过程可能删除了内部Milestone文件中的虚拟 IP 地址配置。在这种情况下，请重复[步骤 13 ](#milestone-files-2) 。


![向Milestone 2020+ ](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)注册管理服务器


### 15. 起始节点 2 {#15-start-node-2}

  * 启动节点 2 及其上下文菜单。
  * 等待第二个（绿色）状态。


![注](/wp-content/uploads/2022/07/note.png)


节点 2 在重新同步复制目录（从节点 1 复制到节点 2）时保持在 SECOND（洋红色）状态。

根据复制目录中要重新同步的文件大小和网络带宽，这可能需要一段时间。

要查看复制进度，请使用详细选项查看节点 2 的模块日志，并且不要忘记刷新窗口。


![第一个节点最初是主节点，后来变为独立节点](/wp-content/uploads/2022/07/appli-11.png)


### 16. 验证集群是否运行正常 {#16-verify-that-the-cluster-is-operational}

  * 检查集群状态是否为绿色/绿色，并且服务在主节点上运行，而不是在第二个节点上运行。


在此状态下，只有文件内部的更改才会实时复制。


![警告](/wp-content/uploads/2022/07/warning-small.png)


作为服务客户端的组件必须配置虚拟 IP 地址。配置可以通过 DNS 名称完成（前提是已创建 DNS 名称并将其与虚拟 IP 地址关联）。


![第二个节点以 SECOND ](/wp-content/uploads/2022/07/appli-12.png)开头


### 17. 在录像服务器中配置虚拟 IP 地址 {#17-configure-the-virtual-ip-address-in-recording-servers}

  * 或者，您可以安装录制服务器，并在安装 URL 中指定虚拟 IP 地址。
  * 或者，在录制服务器端，在以下字段中设置虚拟 IP 地址： 
        
        C:\ProgramData\ Milestone \ XProtect录制服务器\ RecorderConfig.xml
        
            <server> <address>
        
            <server> <authorizationserveraddress>

  * 将Milestone管理客户端和Milestone智能客户端连接到虚拟 IP 地址。


### 18. 节点切换后，管理客户端和智能客户端无法正常工作 {#18-management-client-and-smart-client-are-not-functioning-properly-after-node-switch}

在集群式XProtect管理服务器设置中，节点切换后智能客户端和管理客户端会出现各种问题。该问题与节点切换前后在不同节点上生成的令牌有关，也与访问令牌验证所需的某些证书有关。已有解决方案（适用于 2022 R3 至 2023 R2 版本，请参阅Milestone知识库）。

该问题已在Milestone 2023 R3 中解决。

### 18. 测试 {#18-testing}

  * 向下滚动 PRIM 节点的上下文菜单并单击“停止”来停止该****原因见下文）。
  * 确认第二个节点上是否存在故障转移，该节点应变为单独运行（绿色）。
  * 使用Microsoft管理控制台 (MMC) 检查服务的故障转移（在`stop_prim`脚本中在节点 1 上停止，在`start_prim`脚本中在节点 2 上启动）。


![警告](/wp-content/uploads/2022/07/warning-small.png)


如果您的系统是 PRIM-SECOND 模式且一切运行正常，请停止 PRIM 节点，并验证 node2（此时 node2 变为 ALONE）上的所有功能是否正常。如果一切正常，请启动 node1，这将重新同步来自 node2 的复制目录。

如果出现问题，停止节点2，并强制节点1作为主节点启动，节点1将使用停止时本地的健康数据重新启动。

交换操作涉及 PRIM 的停止和启动，这将在停止后立即重新同步来自 node2 的数据，如果复制配置出现问题，则没有机会在健康数据上重新启动。


![警告](/wp-content/uploads/2022/07/warning-small.png)


如果应用程序在节点 2 上未启动，且状态为 ALONE（绿色），请检查节点 2 的应用程序日志中`start_prim`脚本的输出消息。


![警告](/wp-content/uploads/2022/07/warning-small.png)


如果未达到 ALONE（绿色），请使用节点 2 的模块日志分析原因。


![注](/wp-content/uploads/2022/07/note.png)


更多关于测试的信息，请参阅用户指南。


![停止 PRIM 服务器上的模块](/wp-content/uploads/2022/07/appli-19.png)