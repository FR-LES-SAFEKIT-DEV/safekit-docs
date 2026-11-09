---
title: "旧版 SafeKit Milestone 配置"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-old-milestone-configuration/"
category: "quick-install"
lang: "zh-hans"
topics: "SafeKit/Milestone XProtect 解决方案的旧版分步配置"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# 旧版 SafeKit Milestone 配置 {#old-safekit-milestone-configuration}

## SafeKit/Milestone XProtect 解决方案的旧版分步配置 {#old-step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


![警告](/wp-content/uploads/2022/07/warning-small.png)


请注意，需要在虚拟 IP 地址上执行一些特定步骤进行配置，否则故障转移将无法正常工作。

### 1. 启动 SafeKit 控制台 {#1-launch-the-safekit-console}

  * 在某个集群节点上，通过连接到 `http://localhost:9010` 在浏览器中启动 Web 控制台。
  * 输入用户名 `admin` 和安装过程中定义的密码。


您也可以在集群外部工作站的浏览器中运行控制台。


![警告](/wp-content/uploads/2022/07/warning-small.png)


SafeKit 的配置可在单个浏览器上对两个节点进行。


![注意](/wp-content/uploads/2022/07/note.png)


如需保护 Web 控制台，请参阅《用户指南》中的“保护 SafeKit Web 控制台”。


![启动 SafeKit Web 控制台以配置集群](/wp-content/uploads/2023/01/appli-1.png)


### 2. 配置节点地址 {#2-configure-node-addresses}

  * 输入节点 IP 地址。
  * 然后，单击 `Apply` 以保存配置。


![警告](/wp-content/uploads/2022/07/warning-small.png)


如果 node1 或 node2 背景颜色为红色，请检查浏览器与这两个节点的连接性，并检查这两个节点上的防火墙，以进行故障排除。


![注意](/wp-content/uploads/2022/07/note.png)


此操作会将 IP 地址放置在两个节点上的 `cluster.xml` 文件中（有关命令行培训的更多信息）。


![输入集群的节点](/wp-content/uploads/2023/01/appli-3.png)


### 3. 选择模块 {#3-choose-the-module}

  * 在“配置”选项卡中，单击“.safe”模块。


![注意](/wp-content/uploads/2022/07/note.png)


如果您在安装过程中将模块放置在服务器端的“Application_Modules/demo/”目录中，控制台会在该目录中找到 xxx.safe。


![选择模块](/wp-content/uploads/2023/01/appli-4.png)


### 4. 配置模块 {#4-configure-the-module}

  * 选择在启动时自动启动模块，无需延迟。
  * 通常，您有一个用于进行复制的单一心跳网络。但是，如有必要，您可以定义一个私有网络。
  * 检查两个节点上是否都安装了复制目录，以及这些目录是否包含应用程序数据。  
数据库需要数据和日志的复制。  
您可以根据需要添加新的复制目录。
  * 输入虚拟 IP 地址。虚拟 IP 地址是与两个节点的 IP 地址位于同一 IP 网络（同一子网）的标准 IP 地址。  
必须使用虚拟 IP 地址（或与虚拟 IP 地址关联的 DNS 名称）配置应用程序客户端。  
发生故障时，虚拟 IP 地址会自动切换。
  * `start_prim` 和 `stop_prim` 必须包含应用程序的启动和停止。  
您可以在这些脚本中添加新服务。  
检查这些脚本中的服务名称是否与两个节点上安装的服务名称一致，否则请在脚本中修改。
  * 停止在两个节点上配置的 `start_prim` 服务。
  * 在 Windows 和两个节点上，使用 Windows 服务管理器，将 `start_prim` 中注册的所有服务的 `Boot Startup Type = Manual`（SafeKit 控制 `start_prim` 中服务的启动）。


![警告](/wp-content/uploads/2022/07/warning-small.png)


如果 SQL 位于管理服务器上：

  * [SQL 系统数据库](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>)（如 master.mdf 和 mastlog.ldf）必须位于两个节点上的同一目录中。这些目录必须配置为可复制。
  * SQL 也必须安装在两个节点的文件系统的同一位置，因为只读[SQL 资源数据库](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>)位于二进制文件中，并且是故障转移所必需的。此数据库不需要复制。
  * SQL Milestone 数据库（.mdf 和 .ldf）必须位于两个节点上的同一目录中。这些目录必须配置为可复制。根据[本文](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>)，Milestone 数据库如下所示。


![警告](/wp-content/uploads/2022/07/warning-small.png)


请注意，如果进程名称显示在进程检查器中，则在发生故障时，它将通过重启操作进行监控。配置错误的进程名称将导致模块在启动后立即停止。


![注意](/wp-content/uploads/2022/07/note.png)


“应用”按钮将报告两个节点上的 `userconfig.xml`、`start_prim`、`stop_prim` 文件中的配置（更多信息请参见命令行培训）。


![进入模块设置](/wp-content/uploads/2023/01/appli-7-1.png)


### 5. 验证配置是否成功 {#5-verify-successful-configuration}

  * 检查两个节点上的成功消息（绿色），然后单击“下一步”。


![检查模块配置是否成功](/wp-content/uploads/2023/01/appli-9-2.png)


### 6. 不要启动任何程序，然后点击“关闭”按钮 {#6-do-not-start-anything-and-click-on-the-close-button}


![警告](/wp-content/uploads/2022/07/warning-small.png)


请勿启动任何内容并单击“关闭”按钮，因为在启动之前需要对虚拟 IP 地址进行特殊配置


![选择包含最新数据的节点](/wp-content/uploads/2023/01/appli-10-1.png)


### 7. 转到节点 1 的桌面，并在 Milestone 内部文件中设置虚拟 IP 地址 {#milestone-files}


![注意](/wp-content/uploads/2022/07/note.png)


自 Milestone 2022 R3 起，此步骤不再有用，将在下一步中使用“ Server Configurator - 注册服务器 - http://virtual-IP"自动完成。

在节点 1 的管理员 PowerShell 命令行中，执行此脚本：
    
    
    c:/safekit/modules//bin/UpdateAuthServerUri.ps1


![注意](/wp-content/uploads/2022/07/note.png)


此脚本在两个内部 Milestone 文件中设置虚拟 IP 地址：
    
    
    C:\ProgramData\Milestone\XProtect Management Server\ServerConfig.xml
    
    
        <AuthorizationServerUri>http://**<虚拟 IP>**/IDP</AuthorizationServerUri>
    
    
    C:\Program Files\Milestone\XProtect Management Server\IIS\IDP\appsettings.json
    
    
        “Authority”：“ http://**<虚拟 IP>**/IDP”


![警告](/wp-content/uploads/2022/07/warning-small.png)


在此步骤中，我们假设虚拟 IP 地址已在之前的步骤中正确配置（脚本使用在 SafeKit 控制台中输入并存储在 `userconfig.xml` 中的虚拟 IP 地址）。


![注意](/wp-content/uploads/2022/07/note.png)


### 8. 在控制台中将节点 1 启动为主要节点，该节点拥有最新数据 {#8-start-node-1-as-primary-in-the-console-the-node-with-up-to-date-data}

我们假设从步骤 7 开始，节点 1 拥有最新的复制目录。

强制节点 1 启动为主节点。当节点 2 启动时，节点 1 的所有数据都将复制到节点 2。


![警告](/wp-content/uploads/2022/07/warning-small.png)


如果选择错误，则可能导致两个节点上的数据不同步。


![警告](/wp-content/uploads/2022/07/warning-small.png)


还假定应用程序在节点 1 上停止，以便 SafeKit 安装复制机制，然后在 `start_prim` 脚本中启动应用程序。


![强制将拥有最新数据的节点作为主节点启动](/wp-content/uploads/2022/07/appli-11-bis.png)


### 9. 等待过渡到 ALONE ”（绿色） {#9-wait-for-the-transition-to-alone-green}

  * 节点 1 应达到 ALONE（绿色）状态，这意味着 `start_prim` 脚本已在节点 1 上执行。


![警告](/wp-content/uploads/2022/07/warning-small.png)


如果状态为 ALONE（绿色）且应用程序未启动，请检查节点 1 的应用程序日志中 `start_prim` 的输出消息。


![警告](/wp-content/uploads/2022/07/warning-small.png)


如果节点 1 未达到 ALONE（绿色）状态，请使用节点 1 的模块日志分析原因。


![警告](/wp-content/uploads/2022/07/warning-small.png)


如果集群处于 `WAIT (red) not uptodate - STOP (red) not uptodate` 状态，请停止 WAIT 节点并强制其作为主节点启动。


![第一个节点最初是主节点，然后变为 ALONE](/wp-content/uploads/2022/07/appli-11-bis-bis.png)


### 10. 在节点 1 的桌面上，停止，然后在虚拟 IP 地址上注册并重新启动 Milestone 管理服务器 {#10-in-the-desktop-of-node-1-stop-then-register-on-the-vitual-ip-address-and-restart-the-milestone-management-server}

根据图片中的菜单，在节点 1 上执行以下要点：

  * 右键单击任务栏中的 **Milestone 管理服务器**图标。
  * **停止管理服务器服务**
  * 然后选择 **Server Configurator ...”** 并注册虚拟 IP 地址。
  * **启动管理服务器服务**


![注意](/wp-content/uploads/2022/07/note.png)


此过程通过连接到虚拟地址，在 SQL 数据库（在节点 1 上运行）中注册节点 1 管理服务器。


![警告](/wp-content/uploads/2022/07/warning-small.png)


在 Milestone 2022 R3 版本之前，注册时可能会删除内部 Milestone 文件中的虚拟 IP 地址配置。在这种情况下，请重复[步骤 7](#milestone-files)。


![注意](/wp-content/uploads/2022/07/note.png)


注意：要注册 Milestone 2020 R2 之前的版本，请使用 **“更改加密设置...”**


![在 Milestone 2020+ 中注册管理服务器](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 11. 在安装了 Milestone Management Client 节点 1 的桌面上，在服务和网络的 URL 中设置虚拟 IP 地址 {#11-in-the-desktop-of-node-1-with-milestone-management-client-set-the-virtual-ip-address-in-urls-for-services-and-network}


![注意](/wp-content/uploads/2022/07/note.png)


自 Milestone 2022 R3 起，此步骤已不再需要，并且已通过“ Server Configurator - 注册服务器 - http://virtual-IP".

根据图片：

  1. 在节点 1 上启动 **Milestone XProtect Management Client**。
  2. 在 **“工具”** 菜单中，选择 **“已注册服务”**。 
     * 在 **“添加/删除已注册服务”** 窗口中，选择列表中的某个服务，然后单击 **“编辑”**。
     * 在 **“编辑已注册服务”** 窗口中，将服务的 URL 地址更改为包含虚拟 IP 地址的相同 URL 地址。
     * 对窗口中列出的所有服务重复执行这些步骤。
  3. 在同一窗口中，点击 **“网络”**。 
     * 在 **“网络配置”** 窗口中，将服务器的 URL 地址更改为包含虚拟 IP 地址的相同 URL 地址。


![在 URL 和 Milestone Management Client 中设置虚拟 IP 地址](/wp-content/uploads/2022/07/milestone-url-vip.png)


### 12. 在带有 Milestone Management Client 节点 1 的桌面上，设置管理员角色以确保正确故障转移 {#role}


![注意](/wp-content/uploads/2022/07/note.png)


如果 Milestone “ Windows 身份验证”已配置为使用 Active Directory，则在故障转移后，用户/密码将在辅助节点上的外部 AD 中检索，因此无需特殊配置。

启动 Milestone XProtect Management Client 时，您必须使用“ Windows 身份验证”或“基本身份验证”进行身份验证（[单击此处查看屏幕截图](</wp-content/uploads/2022/07/milestone-management-server-connect.png>)）。

打开 **Milestone XProtect Management Client**，然后转到 **“安全/角色”**（参见图片）

  * 设置 Windows 组 **BUILTIN\Administrators**。这样，辅助服务器上的管理员用户将能够使用“ Windows 身份验证”连接到辅助服务器上的 Milestone。
  * 创建一个具有“基本身份验证”的用户（图像中的 **Admin**），以确保在故障转移后在辅助节点上重新进行身份验证。“基本身份验证”的用户/密码存储在 SQL 数据库中，并在故障转移后在辅助节点上检索。


![警告](/wp-content/uploads/2022/07/warning-small.png)


通过设置 BUILTIN\Administrators 组，您将能够使用本地 Windows 管理员在辅助节点上进行身份验证。

否则，在故障转移后，辅助服务器上的本地 Windows 帐户将无法进行身份验证。

这是因为 BUILTIN\Administrators 组在两个节点上具有相同的 SID。对于其他本地组或本地用户，由于两个节点之间的 SID 不同（即使它们具有相同的名称），因此无法在辅助节点上进行身份验证。


![在 Milestone Management Client 中设置角色](/wp-content/uploads/2022/07/milestone-management-server-roles.png)


### 13. 转到节点 2 的桌面，并在内部 Milestone 文件中设置虚拟 IP 地址 {#milestone-files-2}


![注意](/wp-content/uploads/2022/07/note.png)


自 Milestone 2022 R3 起，此步骤不再有用，将在下一步中使用“ Server Configurator - 注册服务器 - http://virtual-IP"自动完成。

在节点 2 的管理员 Powershell 命令行中，执行此脚本：
    
    
    c:/safekit/modules/milestone/bin/UpdateAuthServerUri.ps1


![注意](/wp-content/uploads/2022/07/note.png)


此脚本在两个内部 Milestone 文件中设置虚拟 IP 地址：
    
    
    C:\ProgramData\Milestone\XProtect Management Server\ServerConfig.xml
    
    
        <AuthorizationServerUri>http://**<虚拟 IP>**/IDP</AuthorizationServerUri>
    
    
    C:\Program Files\Milestone\XProtect Management Server\IIS\IDP\appsettings.json
    
    
        “Authority”：“ http://**<虚拟 IP>**/IDP”

### 14. 在节点 2 的桌面上，在虚拟 IP 地址上注册管理服务器 {#14-in-the-desktop-of-node-2-register-the-management-server-on-the-vitual-ip-address}

  * 在节点 2 的任务栏中选择 **Server Configurator**，并在虚拟 IP 地址上注册（见图）。
  * 然后**停止管理服务器服务**。


![警告](/wp-content/uploads/2022/07/warning-small.png)


在节点 2 上执行注册的用户帐户必须在节点 1 的 Milestone 中拥有管理员角色。

如果节点 2 上的本地管理员进行注册，则必须在[步骤 12](#role)中于 Management Client /安全/角色中设置内置 Windows 组 `BUILTIN\Administrators`。否则，注册将无法正常工作。


![注意](/wp-content/uploads/2022/07/note.png)


此过程通过连接到虚拟地址，在 SQL 数据库（在节点 1 上运行）中注册节点 2 管理服务器。


![警告](/wp-content/uploads/2022/07/warning-small.png)


如果使用的是 2022 R3 之前的 Milestone 版本，注册过程可能会删除内部 Milestone 文件中的虚拟 IP 地址配置。在这种情况下，请重复[步骤 13](#milestone-files-2)。


![将管理服务器注册到 Milestone 2020+](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 15. 启动节点 2 {#15-start-node-2}

  * 启动节点 2 及其上下文菜单。
  * 等待 SECOND（绿色）状态。


![注意](/wp-content/uploads/2022/07/note.png)


节点 2 在重新同步复制目录（从节点 1 复制到节点 2）时保持在 SECOND（品红色）状态。

这可能需要一段时间，具体取决于复制目录中要重新同步的文件大小和网络带宽。

要查看复制进度，请查看节点 2 的模块日志，并启用详细信息选项，同时不要忘记刷新窗口。


![第一个节点最初是主节点，然后变为 ALONE](/wp-content/uploads/2022/07/appli-11.png)


### 16. 验证集群是否正常运行 {#16-verify-that-the-cluster-is-operational}

  * 检查集群是否为绿色/绿色，服务是否在 PRIM 节点上运行，而不是在 SECOND 节点上运行。


在此状态下，只有文件内部的更改会实时复制。


![警告](/wp-content/uploads/2022/07/warning-small.png)


作为服务客户端的组件必须配置虚拟 IP 地址。如果已创建 DNS 名称并将其与虚拟 IP 地址相关联，则可以使用 DNS 名称进行配置。


![第二个节点以 SECOND 开头](/wp-content/uploads/2022/07/appli-12.png)


### 17. 在录像服务器中配置虚拟 IP 地址 {#17-configure-the-virtual-ip-address-in-recording-servers}

  * 安装录制服务器，并在安装 URL 中指定虚拟 IP 地址。
  * 或者，在录制服务器端，在以下字段中设置虚拟 IP 地址： 
        
        C:\ProgramData\Milestone\XProtect Recording Server\RecorderConfig.xml
        
            <server><address>
        
            <server><authorizationserveraddress>

  * 在虚拟 IP 地址上连接 Milestone Management Client 和 Milestone Smart Client。


### 18. 节点切换后，Management Client 和 Smart Client 无法正常运行 {#18-management-client-and-smart-client-are-not-functioning-properly-after-node-switch}

在集群式 XProtect Management Server 设置中，Smart Client 和 Management Client 在节点切换后会显示各种问题。此问题与节点切换前后在不同节点上生成的令牌以及访问令牌验证所需的某些证书时出现的问题有关。现有解决方案（适用于 2022 R3 至 2023 R2 版本，请参阅 Milestone 知识库）。

此问题已在 Milestone 2023 R3 中解决。

### 18. 测试 {#18-testing}

  * 向下滚动 PRIM 节点的上下文菜单并单击“停止”以停止该节点。**首次测试时请勿使用交换空间**（请参阅下文原因）。
  * 验证 SECOND 节点上是否存在故障转移，该节点应变为 ALONE（绿色）。
  * 使用 Microsoft 管理控制台 (MMC) 检查服务的故障转移（在 `stop_prim` 脚本中在节点 1 上停止，在 `start_prim` 脚本中在节点 2 上启动）。


![警告](/wp-content/uploads/2022/07/warning-small.png)


如果您的系统是 PRIM-SECOND 且一切正常，请在 PRIM 上执行停止操作，并验证 node2 上的所有内容是否正常工作，将成为 ALONE。如果一切正常，请在 node1 上启动，这将重新同步 node2 的复制目录。

如果出现问题，请停止 node2 并强制 node1 作为主节点启动，它将使用停止时本地健康的数据重新启动。

此交换涉及 PRIM 的停止和启动，它将在停止后立即从 node2 重新同步数据，如果存在复制配置问题，则不会有机会在健康数据上重新启动。


![警告](/wp-content/uploads/2022/07/warning-small.png)


如果状态为 ALONE（绿色）时，应用程序未在节点 2 上启动，请检查节点 2 的应用程序日志中 `start_prim` 脚本的输出消息。


![警告](/wp-content/uploads/2022/07/warning-small.png)


如果未达到 ALONE（绿色）状态，请使用节点 2 的模块日志分析原因。


![注意](/wp-content/uploads/2022/07/note.png)


有关测试的更多信息，请参阅用户指南


![停止 PRIM 服务器上的模块](/wp-content/uploads/2022/07/appli-19.png)