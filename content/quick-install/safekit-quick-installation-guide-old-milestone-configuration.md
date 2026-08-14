---
title: "Old SafeKit Milestone Configuration"
slug: "safekit-quick-installation-guide-old-milestone-configuration"
canonical: "https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-old-milestone-configuration/"
description: "Be careful, some specific steps are required to configure on the virtual IP address else the failover is not working. 1. Launch the SafeKit console Launch the web console in a browser on one cluster node by connecting to http://localhost:9010. Enter admin as user name and the password defined during installation. You can also run […]"
category: "quick-install"
lang: "en"
---

<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>Be careful, some specific steps are required to configure on the virtual IP address else the failover is not working.</span></div>

### 1\. Launch the SafeKit console

  * Launch the web console in a browser on one cluster node by connecting to `http://localhost:9010`.
  * Enter `admin` as user name and the password defined during installation.


You can also run the console in a browser on a workstation external to the cluster.


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>The configuration of SafeKit is done on both nodes from a single browser.</span></div>


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>To secure the web console, see Securing the SafeKit web console in the User's Guide.</span></div>


<img src="/wp-content/uploads/2023/01/appli-1.png" alt="Start the SafeKit web console to configure the  cluster">


### 2\. Configure node addresses

  * Enter the node IP addresses.
  * Then, click on `Apply` to save the configuration.


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If node1 or node2 background color is red, check connectivity of the browser to both nodes and check firewall on both nodes for troubleshooting.</span></div>


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>This operation will place the IP addresses in the `cluster.xml` file on both nodes (more information in the training with the command line).</span></div>


<img src="/wp-content/uploads/2023/01/appli-3.png" alt="Enter the nodes of the  cluster">


### 3\. Choose the module

  * In the Configuration tab, click on the .safe module.


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>The console finds xxx.safe in the 'Application_Modules/demo/' directory on the server side if you dropped a module there during installation.</span></div>


<img src="/wp-content/uploads/2023/01/appli-4.png" alt="Choose the module for ">


### 4\. Configure the module

  * Choose an automatic start of the module at boot without delay.
  * Normally, you have a single heartbeat network on which the replication is made. But, you can define a private network if necessary.
  * Check that the replicated directories are installed on both nodes and contain the application data.  
Replication of data and also logs is required for a database.  
You can add new replicated directories as needed.
  * Enter a virtual IP address. A virtual IP address is a standard IP address in the same IP network (same subnet) as the IP addresses of both nodes.  
Application clients must be configured with the virtual IP address (or the DNS name associated with the virtual IP address).  
The virtual IP address is automatically switched in the event of a failure.
  * `start_prim` and `stop_prim` must contain starting and stopping of the application.  
You can add new services in these scripts.  
Check that the names of the services in these scripts are those installed on both nodes, otherwise modify them in the scripts.
  * Stop the services configured in `start_prim` on both nodes.
  * On Windows and on both nodes, with the Windows services manager, set `Boot Startup Type = Manual` for all the services registered in `start_prim` (SafeKit controls the start of services in `start_prim`).


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If SQL is on the management server:</span></div>

  * The [SQL system databases](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (like master.mdf and mastlog.ldf) must be located in the same directories on both nodes. The directories must be configured as replicated.
  * SQL must be also installed at the same location in the file system on both nodes because the read-only [SQL resource database](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) is located in the binary and is required for the failover. This database does not need to be replicated.
  * The SQL Milestone databases (.mdf and .ldf) must be located in the same directories on both nodes. The directories must be configured as replicated. Milestone databases are as follows according this [article](<https://doc.milestonesys.com/en-US/bundle/doc1040_2026r1/page/content/standard_features/sf_mc/sf_maintenance/mc_managingthesqlserver.htm>).


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>Note that if a process name is displayed in Process Checker, it will be monitored with a restart action in case of failure. Configuring a wrong process name will cause the module to stop right after its start.</span></div>


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>The "Apply" button will report the configuration in the `userconfig.xml`, `start_prim`, `stop_prim` files on both nodes (more information in the training with the command line).</span></div>


<img src="/wp-content/uploads/2023/01/appli-7-1.png" alt="Enter the  module settings">


### 5\. Verify successful configuration

  * Check the success message (green) on both nodes and click Next.


<img src="/wp-content/uploads/2023/01/appli-9-2.png" alt="Check the  module configuration success">


### 6\. Do not start anything and click on the Close button


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>Do not start anything and click on the Close button because special configuration is required on the virtual IP address before starting</span></div>


<img src="/wp-content/uploads/2023/01/appli-10-1.png" alt="Select the  node with the up-to-date data">


### 7\. Go to desktop of node 1 and set the virtual IP address in internal Milestone files {#milestone-files}


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>Since Milestone 2022 R3, this step is not useful and will be made automatically with "Server Configurator - Registering servers - http://virtual-IP" in a next step.</span></div>

In a Powershell command line as Administrator, execute on node 1 this script:
    
    
    c:/safekit/modules//bin/UpdateAuthServerUri.ps1


<img src="/wp-content/uploads/2022/07/note.png" alt="Note">


This script sets the virtual IP address in 2 internal Milestone files:
    
    
    C:\ProgramData\Milestone\XProtect Management Server\ServerConfig.xml
    
    
        <AuthorizationServerUri>http://**< virtual-ip>**/IDP</AuthorizationServerUri>
    
    
    C:\Program Files\Milestone\XProtect Management Server\IIS\IDP\appsettings.json
    
    
        "Authority": "http://**< virtual-ip>**/IDP"


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>We assume at this step that the virtual IP address has been correctly configured in the previous steps (the script uses the virtual IP address entered in the SafeKit console and stored in `userconfig.xml`).</span></div>


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>### 8. Start node 1 as primary in the console, the node with up-to-date data</span></div>

We assume since Step 7 that node 1 has the up-to-date replicated directories.

Force the start of node 1 as primary. When node 2 will be started, all data from node 1 will be copied to node 2.


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If you make the wrong choice, you run the risk of synchronizing outdated data on both nodes.</span></div>


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>It is also assumed that the application is stopped on node 1 so that SafeKit installs the replication mechanisms and then starts the application in the `start_prim` script.</span></div>


<img src="/wp-content/uploads/2022/07/appli-11-bis.png" alt="Force the start as primary of the  node with the up-to-date data">


### 9\. Wait for the transition to ALONE (green)

  * Node 1 should reach the ALONE (green) state, which means that the `start_prim` script has been executed on node 1.


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If the status is ALONE (green) and the application is not started, check output messages of `start_prim` in the Application Log of node 1.</span></div>


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If node 1 does not reach ALONE (green) state, analyze why with the Module Log of node 1.</span></div>


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If the cluster is in `WAIT (red) not uptodate - STOP (red) not uptodate` state, stop the WAIT node and force its start as primary.</span></div>


<img src="/wp-content/uploads/2022/07/appli-11-bis-bis.png" alt="The first  node starts as primary and becomes ALONE">


### 10\. In the desktop of node 1, stop, then register on the vitual IP address and restart the Milestone Management Server

Execute the following bullets on node 1 according the menu in the image:

  * Right-click on the **Milestone Management Server** icon in the taskbar.
  * **Stop Management Server Service**
  * Then choose **Server Configurator...** and register the virtual IP address.
  * **Start Management Server Service**


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>This procedure registers the node 1 management server in the SQL database (running on node 1) through a connection to the virtual address.</span></div>


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>Before Milestone 2022 R3 version, the registration may have deleted the virtual IP address configuration in the internal Milestone files. In this case, repeat <a href="#milestone-files">Step 7</a>.</span></div>


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>Note: To register a version before Milestone 2020 R2, use **Change encryption settings...**</span></div>


<img src="/wp-content/uploads/2022/07/milestone-management-server-register-2020.png" alt="Register the management server in Milestone 2020+">


### 11\. In the desktop of node 1 with Milestone Management Client, set the virtual IP address in URLs for services and network


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>Since Milestone 2022 R3, this step is not useful and has been made automatically with "Server Configurator - Registering servers - http://virtual-IP".</span></div>

According the image:

  1. Start **Milestone XProtect Management Client** on node 1.
  2. In the **Tools** menu, select **Registered Services**. 
     * In the **Add/Remove Registered Services** window, select a service in the list and click on **Edit**.
     * In the **Edit Registered Service** window, change the URL address of the service with the same URL address but containing the virtual IP address.
     * Repeat these steps for all services listed in the window.
  3. In the same window, click on **Network**. 
     * In the **Network Configuration** window, change the URL address of the server with the same URL address but containing the virtual IP address.


<img src="/wp-content/uploads/2022/07/milestone-url-vip.png" alt="Set the virtual IP address in the URLs and in the Milestone Management Client">


### 12\. In the desktop of node 1 with Milestone Management Client, set the administrator roles to ensure a correct failover {#role}


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>If Milestone "Windows authentication" has been configured with an Active Directory, the user/password will be retrieved in the external AD on the secondary node after a failover, so there is no special configuration.</span></div>

When you start the Milestone XProtect Management Client, you have to authenticate either with "Windows authentication" or "Basic authentication" ([click here to see the screenshot](</wp-content/uploads/2022/07/milestone-management-server-connect.png>)).

Open **Milestone XProtect Management Client** and in **Security / Roles** (see image)

  * Set the Windows group **BUILTIN\Administrators** . Thus an administrator user on the secondary will be able to connect to Milestone on the secondary with "Windows authentication".
  * Create a user with a "Basic authentication" (**Admin** in the image) to be sure to re-authenticate on the secondary node after a failover. For "Basic authentication", the user/password is stored in the SQL database and will be retrieved on the secondary node after a failover.


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>By setting the BUILTINAdministrators group, you will be able to authenticate on the seconday node with a local Windows administrator.</span></div>

Else no authentication will be possibe with a local Windows account on the secondary after a failover.

It's because the BUILTIN\Administrators group has the same SID on both nodes. For other local groups or local users, authentication will not be possible on the secondary because SIDs are different between both nodes even if they have the same name.


<img src="/wp-content/uploads/2022/07/milestone-management-server-roles.png" alt="Set roles in the Milestone Management Client">


### 13\. Go to the desktop of node 2 and set the virtual IP address in internal Milestone files {#milestone-files-2}


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>Since Milestone 2022 R3, this step is not useful and will be made automatically with "Server Configurator - Registering servers - http://virtual-IP" in a next step.</span></div>

In a Powershell command line as Administrator, execute on node 2 this script:
    
    
    c:/safekit/modules/milestone/bin/UpdateAuthServerUri.ps1


<img src="/wp-content/uploads/2022/07/note.png" alt="Note">


This script sets the virtual IP address in 2 internal Milestone files:
    
    
    C:\ProgramData\Milestone\XProtect Management Server\ServerConfig.xml
    
    
        <AuthorizationServerUri>http://**< virtual-ip>**/IDP</AuthorizationServerUri>
    
    
    C:\Program Files\Milestone\XProtect Management Server\IIS\IDP\appsettings.json
    
    
        "Authority": "http://**< virtual-ip>**/IDP"

### 14\. In the desktop of node 2, register the management server on the vitual IP address

  * Choose **Server Configurator** in the taskbar of node 2 and register it on the virtual IP address (see image).
  * Then **Stop Management Server Service**.


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>The account of the user executing the registration on node 2 must have the administrator role in Milestone on node 1.</span></div>

If it is the local administrator on node 2 who makes the registration, the built-in Windows group `BUILTIN\Administrators` must have been set in Management Client / Security / Roles at [Step 12](<#role>). Else the registration will not work.


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>This procedure registers the node 2 management server in the SQL database (running on node 1) through a connection to the virtual address.</span></div>


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>With a version of Milestone before 2022 R3, the registration may have deleted the virtual IP address configuration in the internal Milestone files. In this case, repeat <a href="#milestone-files-2">Step 13</a>.</span></div>


<img src="/wp-content/uploads/2022/07/milestone-management-server-register-2020.png" alt="Register the management server with Milestone 2020+">


### 15\. Start node 2

  * Start node 2 with its contextual menu.
  * Wait for the SECOND (green) state.


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>Node 2 stays in the SECOND (magenta) state while resynchronizing the replicated directories (copy from node 1 to node 2).</span></div>

This may take a while depending on the size of files to resynchronize in replicated directories and the network bandwidth.

To see the progress of the copy, see the Module Log of node 2 with the verbose option without forgetting to refresh the window.


<img src="/wp-content/uploads/2022/07/appli-11.png" alt="The first  node starts as primary and becomes ALONE">


### 16\. Verify that the cluster is operational

  * Check that the cluster is green/green with services running on the PRIM node and not running on the SECOND node.


Only changes inside files are replicated in real time in this state.


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>Components that are clients of services must be configured with the virtual IP address. The configuration can be done with a DNS name (if a DNS name has been created and associated with the virtual IP address).</span></div>


<img src="/wp-content/uploads/2022/07/appli-12.png" alt="The second  node starts as SECOND">


### 17\. Configure the virtual IP address in recording servers

  * Either install the recording servers, specifying the virtual IP address in the installation URL.
  * Or, on the recording servers side, set the virtual IP address in the following fields of 
        
        C:\ProgramData\Milestone\XProtect Recording Server\RecorderConfig.xml
        
            <server><address>
        
            <server><authorizationserveraddress>

  * Connect the Milestone Management Client and the Milestone Smart Client on the virtual IP address.


### 18\. Management Client and Smart Client are not functioning properly after node switch

In a clustered XProtect® Management Server setup, Smart Client and Management Client show various issues after a node switch. The issue is related to tokens being generated on different nodes before and after the node switch, and to problems accessing certain certificates needed for token validation. A solution is available (for versions 2022 R3 to 2023 R2, see Milestone KB).

The issue is solved in Milestone 2023 R3.

### 18\. Testing

  * Stop the PRIM node by scrolling down its contextual menu and clicking Stop. **Do not use swap for a first test** (see why below).
  * Verify that there is a failover on the SECOND node which should become ALONE (green).
  * And with Microsoft Management Console (MMC), check the failover of services (stopped on node 1 in the `stop_prim` script and started on node 2 in the `start_prim` script).


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If your system is PRIM-SECOND and everything is functioning properly, perform a stop on the PRIM and verify that everything is working correctly on node2, which becomes ALONE.If everything is okay, initiate a start on node1, which will resynchronize the replicated directories from node2.</span></div>

If things go wrong, stop node2 and force the start as primary of node1, which will restart with its locally healthy data at the time of the stop.

The swap involves a stop-start of the PRIM, which will resynchronize the data from node2 immediately after its stop, leaving no chance for a restart on healthy data if there is a replication configuration issue.


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If the application is not started on node 2 while the state is ALONE (green), check output messages of the `start_prim` script in the Application Log of node 2.</span></div>


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If ALONE (green) is not reached, analyze why with the Module Log of node 2.</span></div>


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>More information on tests in the User's Guide</span></div>


<img src="/wp-content/uploads/2022/07/appli-19.png" alt="Stop the  module on the PRIM server">