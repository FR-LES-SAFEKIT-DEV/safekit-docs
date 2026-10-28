---
title: "Hohe Verfügbarkeit in Azure: Echtzeitreplikation und Failover mit SafeKit"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-in-azure-with-real-time-replication-and-failover/"
description: "Stellen Sie das SafeKit-Modul mirror.safe in Azure bereit, um synchrone Echtzeitreplikation und automatisches Failover unter Windows und Linux zu ermöglichen. Diese Anleitung beschreibt die Einrichtung eines Zwei-Knoten-Clusters ohne gemeinsamen Speicher für geschäftskritische Anwendungen."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit in Azure, Einschränkungen der SafeKit-Hochverfügbarkeit, Überblick über die SafeKit-/Azure-mirror-Lösung, Installation der SafeKit-/Azure-mirror-Lösung unter Windows und Linux (mirror.safe), Schrittweise Konfiguration der SafeKit-/Azure-mirror-Lösung, Demonstration der SafeKit-mirror-Lösung, 🔍 SafeKit-Navigationszentrale für Hochverfügbarkeit"
---

# Hohe Verfügbarkeit in Azure mit SafeKit: Installieren des Moduls mirror.safe für Failover {#azure-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}

{{%  insert-safekit-mirror-guide-de app="Azure" mod="mirror"  %}}

## Überblick über die SafeKit-/Azure-mirror-Lösung {#overview-of-the-safekit--azure-mirror-solution}

Die Lösung wird hier beschrieben: **💡[Microsoft Azure-Hochverfügbarkeit: synchrone Replikation und Failover mit SafeKit](</de/solutions/azure-high-availability-cluster-synchronous-replication-failover/>)**.

## Installation der SafeKit-/Azure-mirror-Lösung unter Windows und Linux (mirror.safe) {#installation-of-the-safekit--azure-mirror-solution-on-windows-and-linux-mirrorsafe}

### Konfiguration des Microsoft-Azure-Load Balancers {#configuration-of-the-microsoft-azure-load-balancer}

Der Load Balancer muss konfiguriert werden, wenn Sie eine virtuelle IP-Adresse einrichten möchten.
Außerdem muss der Load Balancer regelmäßig Integritätsprüfungen an die Knoten senden.
Dafür stellt SafeKit eine Integritätsprüfung bereit, die auf den Knoten ausgeführt wird und:

  * OK zurückgibt, wenn der Status des mirror-Moduls PRIM (grün) oder ALONE (grün) ist
  * in allen anderen Zuständen NOT FOUND zurückgibt

Konfigurieren Sie den Microsoft-Azure-Load Balancer mit:

  * HTTP-Protokoll
  * Port 9010, dem SafeKit-Webserverport
  * URL /var/modules/mirror/ready.txt (wenn mirror der Name des später bereitzustellenden Moduls ist)

Weitere Informationen finden Sie unter [Konfiguration des Microsoft-Azure-Load Balancers](<https://learn.microsoft.com/en-us/azure/load-balancer/>).

⚠️ Konfigurieren Sie in Schritt 4 der folgenden Schritt-für-Schritt-Anleitung keine virtuelle IP-Adresse. Die virtuelle IP-Adresse ist bereits im Microsoft-Azure-Load Balancer festgelegt. Das Festlegen einer virtuellen IP-Adresse in Schritt 4 ist nur für lokale Konfigurationen vorgesehen.

### Konfiguration der Microsoft-Azure-Netzwerksicherheit {#configuration-of-the-microsoft-azure-network-security}

Die Netzwerksicherheit muss so konfiguriert werden, dass die Kommunikation über folgende Protokolle und Ports möglich ist:

  * UDP - 4800 für den safeadmin-Dienst (zwischen SafeKit-Knoten)
  * UDP - 8888 für den Heartbeat des Moduls (zwischen SafeKit-Knoten)
  * TCP – 5600 für die Echtzeit-Dateireplikation des Moduls (zwischen SafeKit-Knoten)
  * TCP – 9010 für die Integritätsprüfung des Load Balancers und die im http-Modus ausgeführte SafeKit-Webkonsole
  * TCP – 9001 zum Konfigurieren des https-Modus für die Konsole
  * TCP – 9453 für die im https-Modus ausgeführte SafeKit-Webkonsole

{{%  insert-safekit-installation-package-windows-de app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-de app="" mod="mirror"  %}}

Hinweis: Das generische Modul **mirror.safe**, das Sie konfigurieren werden, ist im Paket enthalten.

## Schrittweise Konfiguration der SafeKit-/Azure-mirror-Lösung {#step-by-step-configuration-of-the-safekit--azure-mirror-solution}

{{%  insert-safekit-82-configuration-de app="Windows" mod="mirror"  %}}

## Demonstration der SafeKit-mirror-Lösung {#demonstration-of-the-safekit-mirror-solution}

{{%  insert-safekit-mirror-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}
