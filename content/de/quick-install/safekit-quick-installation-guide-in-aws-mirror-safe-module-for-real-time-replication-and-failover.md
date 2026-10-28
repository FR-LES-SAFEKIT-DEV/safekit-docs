---
title: "AWS-Hochverfügbarkeit mit SafeKit: Installieren des Moduls mirror.safe für Failover"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-in-aws-mirror-safe-module-for-real-time-replication-and-failover/"
description: "Stellen Sie das SafeKit-Modul mirror.safe in AWS bereit, um synchrone Echtzeitreplikation und automatisches Failover unter Windows und Linux zu ermöglichen. Diese Anleitung führt Sie durch die Einrichtung eines Shared-Nothing-Clusters mit zwei Knoten für kritische Anwendungen ohne gemeinsamen Speicher."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit in AWS, Einschränkungen der SafeKit-Hochverfügbarkeit, Überblick über die SafeKit-/AWS-mirror-Lösung, Installation der SafeKit-/AWS-mirror-Lösung unter Windows und Linux (mirror.safe), Schritt-für-Schritt-Konfiguration der SafeKit-/AWS-mirror-Lösung, Demonstration der SafeKit-mirror-Lösung, 🔍 SafeKit-Navigationszentrale für Hochverfügbarkeit"
---

# AWS-Hochverfügbarkeit mit SafeKit: Installieren des Moduls mirror.safe für Failover {#aws-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}

{{%  insert-safekit-mirror-guide-de app="AWS" mod="mirror"  %}}

## Überblick über die SafeKit-/AWS-mirror-Lösung {#overview-of-the-safekit--aws-mirror-solution}

Die Lösung wird hier beschrieben: **💡[Amazon AWS-Hochverfügbarkeit: synchrone Replikation und Failover mit SafeKit](</solutions/aws-high-availability-cluster-synchronous-replication-failover/>)**.

## Installation der SafeKit-/AWS-mirror-Lösung unter Windows und Linux (mirror.safe) {#installation-of-the-safekit--aws-mirror-solution-on-windows-and-linux-mirrorsafe}

### Konfiguration des Amazon AWS-Load-Balancers {#configuration-of-the-amazon-aws-load-balancer}

Der Load-Balancer muss konfiguriert werden, wenn Sie eine virtuelle IP-Adresse wünschen.  
Außerdem muss der Load-Balancer so konfiguriert werden, dass er regelmäßig Integritätspakete an die Knoten sendet.  
Dafür stellt SafeKit eine Integritätsprüfung bereit, die auf den Knoten läuft und

  * OK zurückgibt, wenn der Status des Moduls mirror PRIM (grün) oder ALONE (grün) ist
  * in allen anderen Status NOT FOUND zurückgibt

Sie müssen den Amazon AWS-Load-Balancer wie folgt konfigurieren:

  * HTTP-Protokoll
  * Port 9010, der Port des SafeKit-Webservers
  * URL /var/modules/mirror/ready.txt (wenn mirror der Name des Moduls ist, das Sie später bereitstellen)

Weitere Informationen finden Sie unter [Konfiguration des Amazon AWS-Load-Balancers](<https://aws.amazon.com/elasticloadbalancing/>).

⚠️ Konfigurieren Sie in Schritt 4 der folgenden Schritt-für-Schritt-Konfiguration keine virtuelle IP-Adresse. Die virtuelle IP-Adresse ist bereits im Amazon AWS-Load-Balancer festgelegt. Das Festlegen einer virtuellen IP-Adresse in Schritt 4 ist nur für eine lokale (On-Premises-)Konfiguration sinnvoll.

### Konfiguration der Amazon AWS-Netzwerksicherheit {#configuration-of-the-amazon-aws-network-security}

Die Netzwerksicherheit muss so konfiguriert werden, dass die Kommunikation für die folgenden Protokolle und Ports möglich ist:

  * UDP - 4800 für den Dienst safeadmin (zwischen SafeKit-Knoten)
  * UDP - 8888 für den Modul-Heartbeat (zwischen SafeKit-Knoten)
  * TCP – 5600 für die Echtzeit-Dateireplikation des Moduls (zwischen SafeKit-Knoten)
  * TCP – 9010 für die Integritätsprüfung des Load-Balancers und für die SafeKit-Webkonsole im http-Modus
  * TCP – 9001 zum Konfigurieren des https-Modus für die Konsole
  * TCP – 9453 für die SafeKit-Webkonsole im https-Modus

{{%  insert-safekit-installation-package-windows-de app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-de app="" mod="mirror"  %}}

Hinweis: Das generische Modul **mirror.safe**, das Sie konfigurieren werden, ist im Paket enthalten.

## Schritt-für-Schritt-Konfiguration der SafeKit-/AWS-mirror-Lösung {#step-by-step-configuration-of-the-safekit--aws-mirror-solution}

{{%  insert-safekit-82-configuration-de app="Windows" mod="mirror"  %}}

## Demonstration der SafeKit-mirror-Lösung {#demonstration-of-the-safekit-mirror-solution}

{{%  insert-safekit-mirror-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}
