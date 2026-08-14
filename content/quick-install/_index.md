---
title: "SafeKit High Availability Module Library: Quick Installation Guides for Windows & Linux"
slug: "quick-install"
canonical: "https://safekit.eviden.com/quick-install/"
description: "SafeKit High Availability Module Library: Quick Installation Guides for Windows & Linux"
category: "quick-install"
lang: "en"
topics: "SafeKit Application Module Library: Ready-to-Use HA Solutions, 📂 Module Contents & Download, 🔍 SafeKit High Availability Navigation Hub"
---

# SafeKit High Availability Module Library: Quick Installation Guides for Windows & Linux


{{%  insert-safekit-modules-en %}}
 

## 📂 Module Contents & Download

Expand a module below to see its configuration files, restart scripts, and direct download links.

### 📂 **apache_farm.safe**

_Apache HTTP Server load balancing & failover (farm module). Distributes HTTP/HTTPS traffic across multiple Apache instances with automatic failover._

#### Content (Windows)

  * [apache_farm/bin/module_scripts_utils.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/apache_farm/bin/module_scripts_utils.ps1>) — PowerShell utility functions shared across all module lifecycle scripts
  * [apache_farm/bin/postconfig.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/apache_farm/bin/postconfig.ps1>) — Post-configuration script executed after module deployment (sets services to manual start, prepares environment)
  * [apache_farm/bin/prestart.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/apache_farm/bin/prestart.ps1>) — Pre-start script: preventive stop of the application before installing replication and virtual IP
  * [apache_farm/bin/start_both.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/apache_farm/bin/start_both.ps1>) — Starts the application on all farm nodes (farm module); executed during STOP→UP transition
  * [apache_farm/bin/stop_both.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/apache_farm/bin/stop_both.ps1>) — Stops the application on all farm nodes (farm module); executed on module stop
  * [apache_farm/conf/userconfig.xml](</wp-content/uploads/downloads_safekit/version-82/modules_windows/apache_farm/conf/userconfig.xml>) — Module configuration file: heartbeat networks, virtual IP, file replication paths, checkers, and script activation
  * [apache_farm/conf/userconfig.xml.template](</wp-content/uploads/downloads_safekit/version-82/modules_windows/apache_farm/conf/userconfig.xml.template>) — Configuration template with macro parameters (used by the web console wizard for guided setup)
  * [apache_farm/web/index.html](</wp-content/uploads/downloads_safekit/version-82/modules_windows/apache_farm/web/index.html>) — Web console description page displayed for this module in the SafeKit administration interface


#### Content (Linux)

  * [apache_farm/bin/module_scripts_utils](</wp-content/uploads/downloads_safekit/version-82/modules_linux/apache_farm/bin/module_scripts_utils>) — Shell utility functions shared across all module lifecycle scripts
  * [apache_farm/bin/postconfig](</wp-content/uploads/downloads_safekit/version-82/modules_linux/apache_farm/bin/postconfig>) — Post-configuration script executed after module deployment (prepares environment)
  * [apache_farm/bin/prestart](</wp-content/uploads/downloads_safekit/version-82/modules_linux/apache_farm/bin/prestart>) — Pre-start script: preventive stop of the application before installing replication and virtual IP
  * [apache_farm/bin/start_both](</wp-content/uploads/downloads_safekit/version-82/modules_linux/apache_farm/bin/start_both>) — Starts the application on all farm nodes (farm module); executed during STOP→UP transition
  * [apache_farm/bin/stop_both](</wp-content/uploads/downloads_safekit/version-82/modules_linux/apache_farm/bin/stop_both>) — Stops the application on all farm nodes (farm module); executed on module stop
  * [apache_farm/conf/userconfig.xml](</wp-content/uploads/downloads_safekit/version-82/modules_linux/apache_farm/conf/userconfig.xml>) — Module configuration file: heartbeat networks, virtual IP, file replication paths, checkers, and script activation
  * [apache_farm/conf/userconfig.xml.template](</wp-content/uploads/downloads_safekit/version-82/modules_linux/apache_farm/conf/userconfig.xml.template>) — Configuration template with macro parameters (used by the web console wizard for guided setup)
  * [apache_farm/web/index.html](</wp-content/uploads/downloads_safekit/version-82/modules_linux/apache_farm/web/index.html>) — Web console description page displayed for this module in the SafeKit administration interface


#### More information

  * ⬇️ <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/apache_farm.safe" download="apache_farm.safe">⬇️ apache_farm.safe (Windows)</a>
  * ⬇️ <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/apache_farm.safe" download="apache_farm.safe">⬇️ apache_farm.safe (Linux)</a>
  * 📖 [How it works](</solutions/apache-load-balancing-failover-2/>)
  * 🚀 [Quick Installation Guide](</quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/>)


### 📂 **farm.safe**

_Generic farm module template for network load balancing & failover of any application. Included by default in the SafeKit installation package._

#### Content (Windows)

  * [farm/bin/module_scripts_utils.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/farm/bin/module_scripts_utils.ps1>) — PowerShell utility functions shared across all module lifecycle scripts
  * [farm/bin/postconfig.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/farm/bin/postconfig.ps1>) — Post-configuration script executed after module deployment (sets services to manual start, prepares environment)
  * [farm/bin/prestart.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/farm/bin/prestart.ps1>) — Pre-start script: preventive stop of the application before installing replication and virtual IP
  * [farm/bin/start_both.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/farm/bin/start_both.ps1>) — Starts the application on all farm nodes (farm module); executed during STOP→UP transition
  * [farm/bin/stop_both.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/farm/bin/stop_both.ps1>) — Stops the application on all farm nodes (farm module); executed on module stop
  * [farm/conf/userconfig.xml](</wp-content/uploads/downloads_safekit/version-82/modules_windows/farm/conf/userconfig.xml>) — Module configuration file: heartbeat networks, virtual IP, file replication paths, checkers, and script activation
  * [farm/conf/userconfig.xml.template](</wp-content/uploads/downloads_safekit/version-82/modules_windows/farm/conf/userconfig.xml.template>) — Configuration template with macro parameters (used by the web console wizard for guided setup)
  * [farm/web/index.html](</wp-content/uploads/downloads_safekit/version-82/modules_windows/farm/web/index.html>) — Web console description page displayed for this module in the SafeKit administration interface


#### Content (Linux)

  * [farm/bin/module_scripts_utils](</wp-content/uploads/downloads_safekit/version-82/modules_linux/farm/bin/module_scripts_utils>) — Shell utility functions shared across all module lifecycle scripts
  * [farm/bin/postconfig](</wp-content/uploads/downloads_safekit/version-82/modules_linux/farm/bin/postconfig>) — Post-configuration script executed after module deployment (prepares environment)
  * [farm/bin/prestart](</wp-content/uploads/downloads_safekit/version-82/modules_linux/farm/bin/prestart>) — Pre-start script: preventive stop of the application before installing replication and virtual IP
  * [farm/bin/start_both](</wp-content/uploads/downloads_safekit/version-82/modules_linux/farm/bin/start_both>) — Starts the application on all farm nodes (farm module); executed during STOP→UP transition
  * [farm/bin/stop_both](</wp-content/uploads/downloads_safekit/version-82/modules_linux/farm/bin/stop_both>) — Stops the application on all farm nodes (farm module); executed on module stop
  * [farm/conf/userconfig.xml](</wp-content/uploads/downloads_safekit/version-82/modules_linux/farm/conf/userconfig.xml>) — Module configuration file: heartbeat networks, virtual IP, file replication paths, checkers, and script activation
  * [farm/conf/userconfig.xml.template](</wp-content/uploads/downloads_safekit/version-82/modules_linux/farm/conf/userconfig.xml.template>) — Configuration template with macro parameters (used by the web console wizard for guided setup)
  * [farm/web/index.html](</wp-content/uploads/downloads_safekit/version-82/modules_linux/farm/web/index.html>) — Web console description page displayed for this module in the SafeKit administration interface


#### More information

  * ⬇️ <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/farm.safe" download="farm.safe">⬇️ farm.safe (Windows)</a>
  * ⬇️ <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/farm.safe" download="farm.safe">⬇️ farm.safe (Linux)</a>
  * 📖 [How it works](</solutions/windows-load-balancing-failover/>)
  * 🚀 [Quick Installation Guide](</quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/>)


### 📂 **firebird.safe**

_Firebird database HA with real-time replication & automatic failover (mirror module). Replicates Firebird data files between two servers._

#### Content (Windows)

  * [firebird/bin/module_scripts_utils.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/firebird/bin/module_scripts_utils.ps1>) — PowerShell utility functions shared across all module lifecycle scripts
  * [firebird/bin/postconfig.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/firebird/bin/postconfig.ps1>) — Post-configuration script executed after module deployment (sets services to manual start, prepares environment)
  * [firebird/bin/prestart.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/firebird/bin/prestart.ps1>) — Pre-start script: preventive stop of the application before installing replication and virtual IP
  * [firebird/bin/start_prim.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/firebird/bin/start_prim.ps1>) — Starts the application on the primary server (mirror module); executed during STOP→ALONE or SECOND→ALONE transitions
  * [firebird/bin/stop_prim.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/firebird/bin/stop_prim.ps1>) — Stops the application on the primary server (mirror module); executed before failover or module stop
  * [firebird/conf/userconfig.xml](</wp-content/uploads/downloads_safekit/version-82/modules_windows/firebird/conf/userconfig.xml>) — Module configuration file: heartbeat networks, virtual IP, file replication paths, checkers, and script activation
  * [firebird/conf/userconfig.xml.template](</wp-content/uploads/downloads_safekit/version-82/modules_windows/firebird/conf/userconfig.xml.template>) — Configuration template with macro parameters (used by the web console wizard for guided setup)
  * [firebird/web/index.html](</wp-content/uploads/downloads_safekit/version-82/modules_windows/firebird/web/index.html>) — Web console description page displayed for this module in the SafeKit administration interface


#### Content (Linux)

  * [firebird/bin/module_scripts_utils](</wp-content/uploads/downloads_safekit/version-82/modules_linux/firebird/bin/module_scripts_utils>) — Shell utility functions shared across all module lifecycle scripts
  * [firebird/bin/postconfig](</wp-content/uploads/downloads_safekit/version-82/modules_linux/firebird/bin/postconfig>) — Post-configuration script executed after module deployment (prepares environment)
  * [firebird/bin/prestart](</wp-content/uploads/downloads_safekit/version-82/modules_linux/firebird/bin/prestart>) — Pre-start script: preventive stop of the application before installing replication and virtual IP
  * [firebird/bin/start_prim](</wp-content/uploads/downloads_safekit/version-82/modules_linux/firebird/bin/start_prim>) — Starts the application on the primary server (mirror module); executed during STOP→ALONE or SECOND→ALONE transitions
  * [firebird/bin/stop_prim](</wp-content/uploads/downloads_safekit/version-82/modules_linux/firebird/bin/stop_prim>) — Stops the application on the primary server (mirror module); executed before failover or module stop
  * [firebird/conf/userconfig.xml](</wp-content/uploads/downloads_safekit/version-82/modules_linux/firebird/conf/userconfig.xml>) — Module configuration file: heartbeat networks, virtual IP, file replication paths, checkers, and script activation
  * [firebird/conf/userconfig.xml.template](</wp-content/uploads/downloads_safekit/version-82/modules_linux/firebird/conf/userconfig.xml.template>) — Configuration template with macro parameters (used by the web console wizard for guided setup)
  * [firebird/web/index.html](</wp-content/uploads/downloads_safekit/version-82/modules_linux/firebird/web/index.html>) — Web console description page displayed for this module in the SafeKit administration interface


#### More information

  * ⬇️ <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/firebird.safe" download="firebird.safe">⬇️ firebird.safe (Windows)</a>
  * ⬇️ <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/firebird.safe" download="firebird.safe">⬇️ firebird.safe (Linux)</a>
  * 📖 [How it works](</solutions/firebird-high-availability-synchronous-replication-failover/>)
  * 🚀 [Quick Installation Guide](</quick-install/safekit-quick-installation-guide-with-firebird/>)


### 📂 **hyperv.safe**

_Hyper-V virtual machine replication, automatic failover & load balancing (mirror module). Replicates VM disk files and restarts VMs on the secondary server upon failure._

#### Content (Windows)

  * [hyperv/bin/_rfs_callback.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv/bin/_rfs_callback.ps1>) — Callback triggered during file replication events (manages VM state during replication)
  * [hyperv/bin/postconfig.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv/bin/postconfig.ps1>) — Post-configuration script executed after module deployment (sets services to manual start, prepares environment)
  * [hyperv/bin/preparevm.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv/bin/preparevm.ps1>) — Prepares Hyper-V virtual machine before failover (export/import operations)
  * [hyperv/bin/prestart.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv/bin/prestart.ps1>) — Pre-start script: preventive stop of the application before installing replication and virtual IP
  * [hyperv/bin/start_prim.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv/bin/start_prim.ps1>) — Starts the application on the primary server (mirror module); executed during STOP→ALONE or SECOND→ALONE transitions
  * [hyperv/bin/stop_prim.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv/bin/stop_prim.ps1>) — Stops the application on the primary server (mirror module); executed before failover or module stop
  * [hyperv/bin/vmcheck.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv/bin/vmcheck.ps1>) — Checker script monitoring Hyper-V virtual machine health status
  * [hyperv/conf/userconfig.xml](</wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv/conf/userconfig.xml>) — Module configuration file: heartbeat networks, virtual IP, file replication paths, checkers, and script activation
  * [hyperv/conf/userconfig.xml.template](</wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv/conf/userconfig.xml.template>) — Configuration template with macro parameters (used by the web console wizard for guided setup)
  * [hyperv/web/index.html.en](</wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv/web/index.html.en>)
  * [hyperv/web/index.html.ja](</wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv/web/index.html.ja>)


#### More information

  * ⬇️ <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv.safe" download="hyperv.safe">⬇️ hyperv.safe (Windows)</a>
  * 📖 [How it works](</solutions/hyper-v-replication-automatic-failover-load-balancing/>)
  * 🚀 [Quick Installation Guide](</quick-install/safekit-quick-installation-guide-with-hyper-v/>)


### 📂 **iis_farm.safe**

_Microsoft IIS web server load balancing & failover (farm module). Distributes HTTP/HTTPS traffic across multiple IIS instances with automatic failover._

#### Content (Windows)

  * [iis_farm/bin/module_scripts_utils.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/iis_farm/bin/module_scripts_utils.ps1>) — PowerShell utility functions shared across all module lifecycle scripts
  * [iis_farm/bin/postconfig.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/iis_farm/bin/postconfig.ps1>) — Post-configuration script executed after module deployment (sets services to manual start, prepares environment)
  * [iis_farm/bin/prestart.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/iis_farm/bin/prestart.ps1>) — Pre-start script: preventive stop of the application before installing replication and virtual IP
  * [iis_farm/bin/start_both.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/iis_farm/bin/start_both.ps1>) — Starts the application on all farm nodes (farm module); executed during STOP→UP transition
  * [iis_farm/bin/stop_both.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/iis_farm/bin/stop_both.ps1>) — Stops the application on all farm nodes (farm module); executed on module stop
  * [iis_farm/conf/userconfig.xml](</wp-content/uploads/downloads_safekit/version-82/modules_windows/iis_farm/conf/userconfig.xml>) — Module configuration file: heartbeat networks, virtual IP, file replication paths, checkers, and script activation
  * [iis_farm/conf/userconfig.xml.template](</wp-content/uploads/downloads_safekit/version-82/modules_windows/iis_farm/conf/userconfig.xml.template>) — Configuration template with macro parameters (used by the web console wizard for guided setup)
  * [iis_farm/web/index.html](</wp-content/uploads/downloads_safekit/version-82/modules_windows/iis_farm/web/index.html>) — Web console description page displayed for this module in the SafeKit administration interface


#### More information

  * ⬇️ <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/iis_farm.safe" download="iis_farm.safe">⬇️ iis_farm.safe (Windows)</a>
  * 📖 [How it works](</solutions/iis-load-balancing-failover/>)
  * 🚀 [Quick Installation Guide](</quick-install/safekit-quick-installation-guide-with-iis-with-network-load-balancing-and-failover/>)


### 📂 **k3s.safe**

_Kubernetes K3s cluster HA with real-time replication & automatic failover (mirror module). Replicates K3s data between two servers for lightweight Kubernetes at the edge._

#### Content (Linux)

  * [k3s/manifest.xml](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s/manifest.xml>)
  * [k3s/bin/prestart](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s/bin/prestart>) — Pre-start script: preventive stop of the application before installing replication and virtual IP
  * [k3s/bin/start_prim](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s/bin/start_prim>) — Starts the application on the primary server (mirror module); executed during STOP→ALONE or SECOND→ALONE transitions
  * [k3s/bin/start_second](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s/bin/start_second>) — Starts the application on the secondary server (used by k3s module for K3s agent node)
  * [k3s/bin/stop_prim](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s/bin/stop_prim>) — Stops the application on the primary server (mirror module); executed before failover or module stop
  * [k3s/conf/userconfig.xml](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s/conf/userconfig.xml>) — Module configuration file: heartbeat networks, virtual IP, file replication paths, checkers, and script activation
  * [k3s/conf/userconfig.xml.template](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s/conf/userconfig.xml.template>) — Configuration template with macro parameters (used by the web console wizard for guided setup)
  * [k3s/web/index.html](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s/web/index.html>) — Web console description page displayed for this module in the SafeKit administration interface


#### More information

  * ⬇️ <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s.safe" download="k3s.safe">⬇️ k3s.safe (Linux)</a>
  * ⬇️ [k3sconfig.sh (Linux)](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3sconfig.sh>)
  * 📖 [How it works](</solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/>)
  * 🚀 [Quick Installation Guide](</quick-install/safekit-quick-installation-guide-with-kubernetes/>)


### 📂 **kvm.safe**

_Linux KVM virtual machine replication, automatic failover & load balancing (mirror module). Replicates VM disk files and restarts VMs on the secondary server upon failure._

#### Content (Linux)

  * [kvm/manifest.xml](</wp-content/uploads/downloads_safekit/version-82/modules_linux/kvm/manifest.xml>)
  * [kvm/bin/prestart](</wp-content/uploads/downloads_safekit/version-82/modules_linux/kvm/bin/prestart>) — Pre-start script: preventive stop of the application before installing replication and virtual IP
  * [kvm/bin/start_prim](</wp-content/uploads/downloads_safekit/version-82/modules_linux/kvm/bin/start_prim>) — Starts the application on the primary server (mirror module); executed during STOP→ALONE or SECOND→ALONE transitions
  * [kvm/bin/stop_prim](</wp-content/uploads/downloads_safekit/version-82/modules_linux/kvm/bin/stop_prim>) — Stops the application on the primary server (mirror module); executed before failover or module stop
  * [kvm/bin/vmcheck](</wp-content/uploads/downloads_safekit/version-82/modules_linux/kvm/bin/vmcheck>) — Checker script monitoring KVM virtual machine health status
  * [kvm/conf/userconfig.xml](</wp-content/uploads/downloads_safekit/version-82/modules_linux/kvm/conf/userconfig.xml>) — Module configuration file: heartbeat networks, virtual IP, file replication paths, checkers, and script activation
  * [kvm/conf/userconfig.xml.template](</wp-content/uploads/downloads_safekit/version-82/modules_linux/kvm/conf/userconfig.xml.template>) — Configuration template with macro parameters (used by the web console wizard for guided setup)
  * [kvm/web/index.html](</wp-content/uploads/downloads_safekit/version-82/modules_linux/kvm/web/index.html>) — Web console description page displayed for this module in the SafeKit administration interface


#### More information

  * ⬇️ <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/kvm.safe" download="kvm.safe">⬇️ kvm.safe (Linux)</a>
  * 📖 [How it works](</solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)
  * 🚀 [Quick Installation Guide](</quick-install/safekit-quick-installation-guide-with-kvm/>)


### 📂 **milestone.safe**

_Milestone XProtect VMS management server HA with replication & failover (mirror module). Ensures continuity of the video management system for physical security._

#### Content (Windows)

  * [milestone/bin/apppoolcheck.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/milestone/bin/apppoolcheck.ps1>) — Checker monitoring IIS application pools used by Siveillance VMS
  * [milestone/bin/apppoollist.txt](</wp-content/uploads/downloads_safekit/version-82/modules_windows/milestone/bin/apppoollist.txt>) — List of IIS application pools to monitor for Siveillance VMS health checking
  * [milestone/bin/module_scripts_utils.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/milestone/bin/module_scripts_utils.ps1>) — PowerShell utility functions shared across all module lifecycle scripts
  * [milestone/bin/postconfig.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/milestone/bin/postconfig.ps1>) — Post-configuration script executed after module deployment (sets services to manual start, prepares environment)
  * [milestone/bin/prestart.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/milestone/bin/prestart.ps1>) — Pre-start script: preventive stop of the application before installing replication and virtual IP
  * [milestone/bin/start_prim.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/milestone/bin/start_prim.ps1>) — Starts the application on the primary server (mirror module); executed during STOP→ALONE or SECOND→ALONE transitions
  * [milestone/bin/stop_prim.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/milestone/bin/stop_prim.ps1>) — Stops the application on the primary server (mirror module); executed before failover or module stop
  * [milestone/conf/userconfig.xml](</wp-content/uploads/downloads_safekit/version-82/modules_windows/milestone/conf/userconfig.xml>) — Module configuration file: heartbeat networks, virtual IP, file replication paths, checkers, and script activation
  * [milestone/conf/userconfig.xml.template](</wp-content/uploads/downloads_safekit/version-82/modules_windows/milestone/conf/userconfig.xml.template>) — Configuration template with macro parameters (used by the web console wizard for guided setup)
  * [milestone/web/index.html](</wp-content/uploads/downloads_safekit/version-82/modules_windows/milestone/web/index.html>) — Web console description page displayed for this module in the SafeKit administration interface


#### More information

  * ⬇️ <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/milestone.safe" download="milestone.safe">⬇️ milestone.safe (Windows)</a>
  * 📖 [How it works](</solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)
  * 🚀 [Quick Installation Guide](</quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/>)


### 📂 **mirror.safe**

_Generic mirror module template for real-time file replication & failover of any application. Included by default in the SafeKit installation package._

#### Content (Windows)

  * [mirror/bin/module_scripts_utils.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/mirror/bin/module_scripts_utils.ps1>) — PowerShell utility functions shared across all module lifecycle scripts
  * [mirror/bin/postconfig.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/mirror/bin/postconfig.ps1>) — Post-configuration script executed after module deployment (sets services to manual start, prepares environment)
  * [mirror/bin/prestart.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/mirror/bin/prestart.ps1>) — Pre-start script: preventive stop of the application before installing replication and virtual IP
  * [mirror/bin/start_prim.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/mirror/bin/start_prim.ps1>) — Starts the application on the primary server (mirror module); executed during STOP→ALONE or SECOND→ALONE transitions
  * [mirror/bin/stop_prim.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/mirror/bin/stop_prim.ps1>) — Stops the application on the primary server (mirror module); executed before failover or module stop
  * [mirror/conf/userconfig.xml](</wp-content/uploads/downloads_safekit/version-82/modules_windows/mirror/conf/userconfig.xml>) — Module configuration file: heartbeat networks, virtual IP, file replication paths, checkers, and script activation
  * [mirror/conf/userconfig.xml.template](</wp-content/uploads/downloads_safekit/version-82/modules_windows/mirror/conf/userconfig.xml.template>) — Configuration template with macro parameters (used by the web console wizard for guided setup)
  * [mirror/web/index.html](</wp-content/uploads/downloads_safekit/version-82/modules_windows/mirror/web/index.html>) — Web console description page displayed for this module in the SafeKit administration interface


#### Content (Linux)

  * [mirror/bin/module_scripts_utils](</wp-content/uploads/downloads_safekit/version-82/modules_linux/mirror/bin/module_scripts_utils>) — Shell utility functions shared across all module lifecycle scripts
  * [mirror/bin/postconfig](</wp-content/uploads/downloads_safekit/version-82/modules_linux/mirror/bin/postconfig>) — Post-configuration script executed after module deployment (prepares environment)
  * [mirror/bin/prestart](</wp-content/uploads/downloads_safekit/version-82/modules_linux/mirror/bin/prestart>) — Pre-start script: preventive stop of the application before installing replication and virtual IP
  * [mirror/bin/start_prim](</wp-content/uploads/downloads_safekit/version-82/modules_linux/mirror/bin/start_prim>) — Starts the application on the primary server (mirror module); executed during STOP→ALONE or SECOND→ALONE transitions
  * [mirror/bin/stop_prim](</wp-content/uploads/downloads_safekit/version-82/modules_linux/mirror/bin/stop_prim>) — Stops the application on the primary server (mirror module); executed before failover or module stop
  * [mirror/conf/userconfig.xml](</wp-content/uploads/downloads_safekit/version-82/modules_linux/mirror/conf/userconfig.xml>) — Module configuration file: heartbeat networks, virtual IP, file replication paths, checkers, and script activation
  * [mirror/conf/userconfig.xml.template](</wp-content/uploads/downloads_safekit/version-82/modules_linux/mirror/conf/userconfig.xml.template>) — Configuration template with macro parameters (used by the web console wizard for guided setup)
  * [mirror/web/index.html](</wp-content/uploads/downloads_safekit/version-82/modules_linux/mirror/web/index.html>) — Web console description page displayed for this module in the SafeKit administration interface


#### More information

  * ⬇️ <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/mirror.safe" download="mirror.safe">⬇️ mirror.safe (Windows)</a>
  * ⬇️ <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/mirror.safe" download="mirror.safe">⬇️ mirror.safe (Linux)</a>
  * 📖 [How it works](</solutions/windows-high-availability-software-synchronous-replication-failover/>)
  * 🚀 [Quick Installation Guide](</quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/>)


### 📂 **mysql.safe**

_MySQL/MariaDB database HA with real-time replication & automatic failover (mirror module). Replicates MySQL/MariaDB data files between two servers._

#### Content (Windows)

  * [mysql/bin/module_scripts_utils.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/mysql/bin/module_scripts_utils.ps1>) — PowerShell utility functions shared across all module lifecycle scripts
  * [mysql/bin/postconfig.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/mysql/bin/postconfig.ps1>) — Post-configuration script executed after module deployment (sets services to manual start, prepares environment)
  * [mysql/bin/prestart.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/mysql/bin/prestart.ps1>) — Pre-start script: preventive stop of the application before installing replication and virtual IP
  * [mysql/bin/start_prim.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/mysql/bin/start_prim.ps1>) — Starts the application on the primary server (mirror module); executed during STOP→ALONE or SECOND→ALONE transitions
  * [mysql/bin/stop_prim.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/mysql/bin/stop_prim.ps1>) — Stops the application on the primary server (mirror module); executed before failover or module stop
  * [mysql/conf/userconfig.xml](</wp-content/uploads/downloads_safekit/version-82/modules_windows/mysql/conf/userconfig.xml>) — Module configuration file: heartbeat networks, virtual IP, file replication paths, checkers, and script activation
  * [mysql/conf/userconfig.xml.template](</wp-content/uploads/downloads_safekit/version-82/modules_windows/mysql/conf/userconfig.xml.template>) — Configuration template with macro parameters (used by the web console wizard for guided setup)
  * [mysql/web/index.html](</wp-content/uploads/downloads_safekit/version-82/modules_windows/mysql/web/index.html>) — Web console description page displayed for this module in the SafeKit administration interface


#### Content (Linux)

  * [mysql/bin/module_scripts_utils](</wp-content/uploads/downloads_safekit/version-82/modules_linux/mysql/bin/module_scripts_utils>) — Shell utility functions shared across all module lifecycle scripts
  * [mysql/bin/postconfig](</wp-content/uploads/downloads_safekit/version-82/modules_linux/mysql/bin/postconfig>) — Post-configuration script executed after module deployment (prepares environment)
  * [mysql/bin/prestart](</wp-content/uploads/downloads_safekit/version-82/modules_linux/mysql/bin/prestart>) — Pre-start script: preventive stop of the application before installing replication and virtual IP
  * [mysql/bin/start_prim](</wp-content/uploads/downloads_safekit/version-82/modules_linux/mysql/bin/start_prim>) — Starts the application on the primary server (mirror module); executed during STOP→ALONE or SECOND→ALONE transitions
  * [mysql/bin/stop_prim](</wp-content/uploads/downloads_safekit/version-82/modules_linux/mysql/bin/stop_prim>) — Stops the application on the primary server (mirror module); executed before failover or module stop
  * [mysql/conf/userconfig.xml](</wp-content/uploads/downloads_safekit/version-82/modules_linux/mysql/conf/userconfig.xml>) — Module configuration file: heartbeat networks, virtual IP, file replication paths, checkers, and script activation
  * [mysql/conf/userconfig.xml.template](</wp-content/uploads/downloads_safekit/version-82/modules_linux/mysql/conf/userconfig.xml.template>) — Configuration template with macro parameters (used by the web console wizard for guided setup)
  * [mysql/web/index.html](</wp-content/uploads/downloads_safekit/version-82/modules_linux/mysql/web/index.html>) — Web console description page displayed for this module in the SafeKit administration interface


#### More information

  * ⬇️ <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/mysql.safe" download="mysql.safe">⬇️ mysql.safe (Windows)</a>
  * ⬇️ <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/mysql.safe" download="mysql.safe">⬇️ mysql.safe (Linux)</a>
  * 📖 [How it works](</solutions/mysql-high-availability-synchronous-replication-failover/>)
  * 🚀 [Quick Installation Guide](</quick-install/safekit-quick-installation-guide-with-mysql/>)


### 📂 **nedap.safe**

_Nedap AEOS electronic access control system HA with replication & failover (mirror module). Ensures continuity of access control for physical security._

#### Content (Windows)

  * [nedap/bin/module_scripts_utils.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/nedap/bin/module_scripts_utils.ps1>) — PowerShell utility functions shared across all module lifecycle scripts
  * [nedap/bin/postconfig.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/nedap/bin/postconfig.ps1>) — Post-configuration script executed after module deployment (sets services to manual start, prepares environment)
  * [nedap/bin/prestart.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/nedap/bin/prestart.ps1>) — Pre-start script: preventive stop of the application before installing replication and virtual IP
  * [nedap/bin/start_prim.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/nedap/bin/start_prim.ps1>) — Starts the application on the primary server (mirror module); executed during STOP→ALONE or SECOND→ALONE transitions
  * [nedap/bin/stop_prim.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/nedap/bin/stop_prim.ps1>) — Stops the application on the primary server (mirror module); executed before failover or module stop
  * [nedap/conf/userconfig.xml](</wp-content/uploads/downloads_safekit/version-82/modules_windows/nedap/conf/userconfig.xml>) — Module configuration file: heartbeat networks, virtual IP, file replication paths, checkers, and script activation
  * [nedap/conf/userconfig.xml.template](</wp-content/uploads/downloads_safekit/version-82/modules_windows/nedap/conf/userconfig.xml.template>) — Configuration template with macro parameters (used by the web console wizard for guided setup)
  * [nedap/web/index.html](</wp-content/uploads/downloads_safekit/version-82/modules_windows/nedap/web/index.html>) — Web console description page displayed for this module in the SafeKit administration interface


#### More information

  * ⬇️ <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/nedap.safe" download="nedap.safe">⬇️ nedap.safe (Windows)</a>
  * 📖 [How it works](</solutions/nedap-high-availability-synchronous-replication-failover/>)
  * 🚀 [Quick Installation Guide](</quick-install/safekit-quick-installation-guide-with-nedap/>)


### 📂 **oracle.safe**

_Oracle database HA with real-time replication & automatic failover (mirror module). Replicates Oracle data files between two servers._

#### Content (Windows)

  * [oracle/bin/module_scripts_utils.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/oracle/bin/module_scripts_utils.ps1>) — PowerShell utility functions shared across all module lifecycle scripts
  * [oracle/bin/postconfig.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/oracle/bin/postconfig.ps1>) — Post-configuration script executed after module deployment (sets services to manual start, prepares environment)
  * [oracle/bin/prestart.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/oracle/bin/prestart.ps1>) — Pre-start script: preventive stop of the application before installing replication and virtual IP
  * [oracle/bin/start_prim.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/oracle/bin/start_prim.ps1>) — Starts the application on the primary server (mirror module); executed during STOP→ALONE or SECOND→ALONE transitions
  * [oracle/bin/stop_prim.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/oracle/bin/stop_prim.ps1>) — Stops the application on the primary server (mirror module); executed before failover or module stop
  * [oracle/conf/userconfig.xml](</wp-content/uploads/downloads_safekit/version-82/modules_windows/oracle/conf/userconfig.xml>) — Module configuration file: heartbeat networks, virtual IP, file replication paths, checkers, and script activation
  * [oracle/conf/userconfig.xml.template](</wp-content/uploads/downloads_safekit/version-82/modules_windows/oracle/conf/userconfig.xml.template>) — Configuration template with macro parameters (used by the web console wizard for guided setup)
  * [oracle/web/index.html](</wp-content/uploads/downloads_safekit/version-82/modules_windows/oracle/web/index.html>) — Web console description page displayed for this module in the SafeKit administration interface


#### Content (Linux)

  * [oracle/bin/module_scripts_utils](</wp-content/uploads/downloads_safekit/version-82/modules_linux/oracle/bin/module_scripts_utils>) — Shell utility functions shared across all module lifecycle scripts
  * [oracle/bin/postconfig](</wp-content/uploads/downloads_safekit/version-82/modules_linux/oracle/bin/postconfig>) — Post-configuration script executed after module deployment (prepares environment)
  * [oracle/bin/prestart](</wp-content/uploads/downloads_safekit/version-82/modules_linux/oracle/bin/prestart>) — Pre-start script: preventive stop of the application before installing replication and virtual IP
  * [oracle/bin/start_prim](</wp-content/uploads/downloads_safekit/version-82/modules_linux/oracle/bin/start_prim>) — Starts the application on the primary server (mirror module); executed during STOP→ALONE or SECOND→ALONE transitions
  * [oracle/bin/stop_prim](</wp-content/uploads/downloads_safekit/version-82/modules_linux/oracle/bin/stop_prim>) — Stops the application on the primary server (mirror module); executed before failover or module stop
  * [oracle/conf/userconfig.xml](</wp-content/uploads/downloads_safekit/version-82/modules_linux/oracle/conf/userconfig.xml>) — Module configuration file: heartbeat networks, virtual IP, file replication paths, checkers, and script activation
  * [oracle/conf/userconfig.xml.template](</wp-content/uploads/downloads_safekit/version-82/modules_linux/oracle/conf/userconfig.xml.template>) — Configuration template with macro parameters (used by the web console wizard for guided setup)
  * [oracle/web/index.html](</wp-content/uploads/downloads_safekit/version-82/modules_linux/oracle/web/index.html>) — Web console description page displayed for this module in the SafeKit administration interface


#### More information

  * ⬇️ <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/oracle.safe" download="oracle.safe">⬇️ oracle.safe (Windows)</a>
  * ⬇️ <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/oracle.safe" download="oracle.safe">⬇️ oracle.safe (Linux)</a>
  * 📖 [How it works](</solutions/oracle-high-availability-synchronous-replication-failover/>)
  * 🚀 [Quick Installation Guide](</quick-install/safekit-quick-installation-guide-with-oracle/>)


### 📂 **postgresql.safe**

_PostgreSQL database HA with real-time replication & automatic failover (mirror module). Replicates PostgreSQL data files between two servers._

#### Content (Windows)

  * [postgresql/bin/module_scripts_utils.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/postgresql/bin/module_scripts_utils.ps1>) — PowerShell utility functions shared across all module lifecycle scripts
  * [postgresql/bin/postconfig.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/postgresql/bin/postconfig.ps1>) — Post-configuration script executed after module deployment (sets services to manual start, prepares environment)
  * [postgresql/bin/prestart.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/postgresql/bin/prestart.ps1>) — Pre-start script: preventive stop of the application before installing replication and virtual IP
  * [postgresql/bin/start_prim.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/postgresql/bin/start_prim.ps1>) — Starts the application on the primary server (mirror module); executed during STOP→ALONE or SECOND→ALONE transitions
  * [postgresql/bin/stop_prim.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/postgresql/bin/stop_prim.ps1>) — Stops the application on the primary server (mirror module); executed before failover or module stop
  * [postgresql/conf/userconfig.xml](</wp-content/uploads/downloads_safekit/version-82/modules_windows/postgresql/conf/userconfig.xml>) — Module configuration file: heartbeat networks, virtual IP, file replication paths, checkers, and script activation
  * [postgresql/conf/userconfig.xml.template](</wp-content/uploads/downloads_safekit/version-82/modules_windows/postgresql/conf/userconfig.xml.template>) — Configuration template with macro parameters (used by the web console wizard for guided setup)
  * [postgresql/web/index.html](</wp-content/uploads/downloads_safekit/version-82/modules_windows/postgresql/web/index.html>) — Web console description page displayed for this module in the SafeKit administration interface


#### Content (Linux)

  * [postgresql/bin/module_scripts_utils](</wp-content/uploads/downloads_safekit/version-82/modules_linux/postgresql/bin/module_scripts_utils>) — Shell utility functions shared across all module lifecycle scripts
  * [postgresql/bin/postconfig](</wp-content/uploads/downloads_safekit/version-82/modules_linux/postgresql/bin/postconfig>) — Post-configuration script executed after module deployment (prepares environment)
  * [postgresql/bin/prestart](</wp-content/uploads/downloads_safekit/version-82/modules_linux/postgresql/bin/prestart>) — Pre-start script: preventive stop of the application before installing replication and virtual IP
  * [postgresql/bin/start_prim](</wp-content/uploads/downloads_safekit/version-82/modules_linux/postgresql/bin/start_prim>) — Starts the application on the primary server (mirror module); executed during STOP→ALONE or SECOND→ALONE transitions
  * [postgresql/bin/stop_prim](</wp-content/uploads/downloads_safekit/version-82/modules_linux/postgresql/bin/stop_prim>) — Stops the application on the primary server (mirror module); executed before failover or module stop
  * [postgresql/conf/userconfig.xml](</wp-content/uploads/downloads_safekit/version-82/modules_linux/postgresql/conf/userconfig.xml>) — Module configuration file: heartbeat networks, virtual IP, file replication paths, checkers, and script activation
  * [postgresql/conf/userconfig.xml.template](</wp-content/uploads/downloads_safekit/version-82/modules_linux/postgresql/conf/userconfig.xml.template>) — Configuration template with macro parameters (used by the web console wizard for guided setup)
  * [postgresql/web/index.html](</wp-content/uploads/downloads_safekit/version-82/modules_linux/postgresql/web/index.html>) — Web console description page displayed for this module in the SafeKit administration interface


#### More information

  * ⬇️ <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/postgresql.safe" download="postgresql.safe">⬇️ postgresql.safe (Windows)</a>
  * ⬇️ <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/postgresql.safe" download="postgresql.safe">⬇️ postgresql.safe (Linux)</a>
  * 📖 [How it works](</solutions/postgresql-high-availability-synchronous-replication-failover/>)
  * 🚀 [Quick Installation Guide](</quick-install/safekit-quick-installation-guide-with-postgresql/>)


### 📂 **SiveillanceVMS.safe**

_Siemens Siveillance VMS HA with real-time replication & failover (mirror module). Ensures continuity of Siemens video management for physical security._

#### Content (Windows)

  * [SiveillanceVMS/bin/UpdateAuthServerUri.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/SiveillanceVMS/bin/UpdateAuthServerUri.ps1>) — Updates the Siveillance VMS authentication server URI after failover to the new primary
  * [SiveillanceVMS/bin/apppoolcheck.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/SiveillanceVMS/bin/apppoolcheck.ps1>) — Checker monitoring IIS application pools used by Siveillance VMS
  * [SiveillanceVMS/bin/apppoollist.txt](</wp-content/uploads/downloads_safekit/version-82/modules_windows/SiveillanceVMS/bin/apppoollist.txt>) — List of IIS application pools to monitor for Siveillance VMS health checking
  * [SiveillanceVMS/bin/module_scripts_utils.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/SiveillanceVMS/bin/module_scripts_utils.ps1>) — PowerShell utility functions shared across all module lifecycle scripts
  * [SiveillanceVMS/bin/postconfig.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/SiveillanceVMS/bin/postconfig.ps1>) — Post-configuration script executed after module deployment (sets services to manual start, prepares environment)
  * [SiveillanceVMS/bin/prestart.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/SiveillanceVMS/bin/prestart.ps1>) — Pre-start script: preventive stop of the application before installing replication and virtual IP
  * [SiveillanceVMS/bin/start_prim.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/SiveillanceVMS/bin/start_prim.ps1>) — Starts the application on the primary server (mirror module); executed during STOP→ALONE or SECOND→ALONE transitions
  * [SiveillanceVMS/bin/stop_prim.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/SiveillanceVMS/bin/stop_prim.ps1>) — Stops the application on the primary server (mirror module); executed before failover or module stop
  * [SiveillanceVMS/conf/userconfig.xml](</wp-content/uploads/downloads_safekit/version-82/modules_windows/SiveillanceVMS/conf/userconfig.xml>) — Module configuration file: heartbeat networks, virtual IP, file replication paths, checkers, and script activation
  * [SiveillanceVMS/conf/userconfig.xml.template](</wp-content/uploads/downloads_safekit/version-82/modules_windows/SiveillanceVMS/conf/userconfig.xml.template>) — Configuration template with macro parameters (used by the web console wizard for guided setup)
  * [SiveillanceVMS/web/index.html](</wp-content/uploads/downloads_safekit/version-82/modules_windows/SiveillanceVMS/web/index.html>) — Web console description page displayed for this module in the SafeKit administration interface


#### More information

  * ⬇️ <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/SiveillanceVMS.safe" download="SiveillanceVMS.safe">⬇️ SiveillanceVMS.safe (Windows)</a>
  * 📖 [How it works](</solutions/siemens-siveillance-vms-the-simplest-high-availability-cluster-between-two-redundant-servers/>)
  * 🚀 [Quick Installation Guide](</solutions/siemens-siveillance-vms-the-simplest-high-availability-cluster-between-two-redundant-servers/>)


### 📂 **sqlserver.safe**

_Microsoft SQL Server HA with real-time replication & automatic failover (mirror module). Alternative to SQL Server Always On without Windows Server Datacenter license._

#### Content (Windows)

  * [sqlserver/bin/module_scripts_utils.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/sqlserver/bin/module_scripts_utils.ps1>) — PowerShell utility functions shared across all module lifecycle scripts
  * [sqlserver/bin/postconfig.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/sqlserver/bin/postconfig.ps1>) — Post-configuration script executed after module deployment (sets services to manual start, prepares environment)
  * [sqlserver/bin/prestart.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/sqlserver/bin/prestart.ps1>) — Pre-start script: preventive stop of the application before installing replication and virtual IP
  * [sqlserver/bin/start_prim.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/sqlserver/bin/start_prim.ps1>) — Starts the application on the primary server (mirror module); executed during STOP→ALONE or SECOND→ALONE transitions
  * [sqlserver/bin/stop_prim.ps1](</wp-content/uploads/downloads_safekit/version-82/modules_windows/sqlserver/bin/stop_prim.ps1>) — Stops the application on the primary server (mirror module); executed before failover or module stop
  * [sqlserver/conf/userconfig.xml](</wp-content/uploads/downloads_safekit/version-82/modules_windows/sqlserver/conf/userconfig.xml>) — Module configuration file: heartbeat networks, virtual IP, file replication paths, checkers, and script activation
  * [sqlserver/conf/userconfig.xml.template](</wp-content/uploads/downloads_safekit/version-82/modules_windows/sqlserver/conf/userconfig.xml.template>) — Configuration template with macro parameters (used by the web console wizard for guided setup)
  * [sqlserver/web/index.html](</wp-content/uploads/downloads_safekit/version-82/modules_windows/sqlserver/web/index.html>) — Web console description page displayed for this module in the SafeKit administration interface


#### More information

  * ⬇️ <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/sqlserver.safe" download="sqlserver.safe">⬇️ sqlserver.safe (Windows)</a>
  * 📖 [How it works](</solutions/sql-server-high-availability-synchronous-replication-failover/>)
  * 🚀 [Quick Installation Guide](</quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/>)



{{%  insert-safekit-hub-en %}}
 


{{%  insert-safekit-4-buttons-en %}}