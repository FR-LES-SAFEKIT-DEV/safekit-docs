---
title: "Alternative zu SQL Server Always On: HA für Express- und Standard-Editionen"
canonical: "https://safekit.eviden.com/de/best-practises/alternative-always-on-sql-server-express-standard-editions/"
description: "Suchen Sie eine kostengünstige Alternative zu SQL Server Always On? SafeKit bietet eine SAN-lose Architektur, die hohe Verfügbarkeit für die Express- und Standard-Editionen SQL Server gewährleistet. Profitieren Sie von synchroner Replikation, virtueller IP und automatischem Failover ohne SAN oder Active Directory."
category: "best-practises"
lang: "de"
topics: "Alternative zu Always On SQL Server für Express- und Standard-Editionen, Wie funktioniert der SafeKit mirror Cluster mit Microsoft SQL Server ?, Videoanleitung: Konfigurieren eines SafeKit HA mirror Clusters für SQL Server , 🔍 SafeKit Hochverfügbarkeits-Navigationshub"
---

# Alternative zu SQL Server Always On: HA für Express- und Standard-Editionen {#alternative-to-sql-server-always-on-ha-for-express-and-standard-editions}

## Alternative zu Always On SQL Server für Express- und Standard-Editionen {#alternative-to-always-on-sql-server-for-express-and-standard-editions}

### Die Lösung für Microsoft SQL Server {#the-solution-for-microsoft-sql-server}

SafeKit sorgt für hohe Verfügbarkeit zwischen Microsoft SQL Server zwischen zwei redundanten Knoten mit synchroner Echtzeit-Datenreplikation und automatischem Failover.

Die Lösung ist unabhängig von der Microsoft SQL Server Edition und funktioniert mit Express- und Standard-Editionen.

### Ein generisches Produkt {#a-generic-product}

SafeKit ist ein generisches Produkt. Sie können damit mehr als nur SQL-Server-Daten und -Protokolle replizieren. Wenn Ihre Anwendung auf SQL Server basiert und bestimmte Ordner mit Ihrer Konfiguration oder anderen Dateien enthält, können Sie diese auf dieselbe Weise replizieren. Außerdem können Sie neben den SQL-Server-Diensten auch Ihre eigenen Dienste neu starten.

Installationsanleitung [ SafeKit Microsoft SQL Server (Express- und Standardausgabe) und ](</de/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/>)

### Ohne Microsoft Failovercluster {#without-microsoft-failover-cluster}

SafeKit funktioniert wie Always On SQL Server auch ohne den Failovercluster Microsoft . Es handelt sich um eine Komplettlösung mit virtueller IP-Adresse, synchroner Echtzeitreplikation von Ordnern, automatischem Failover und Failback und vielem mehr. SafeKit macht gemeinsam genutzte Datenträger und Enterprise-Datenbanken überflüssig. 

### Ohne Domänencontroller und Active Directory {#without-domain-controller-and-active-directory}

SafeKit funktioniert wie Always On SQL Server ohne Konfiguration eines Domänencontrollers und Active Directory. Diese einfach zu implementierende und kostengünstige Lösung erfordert keine besonderen Fachkenntnisse.

### Ohne 3 Knoten für Quorum {#without-3-nodes-for-quorum}

SafeKit funktioniert ohne die Notwendigkeit von drei Knoten für ein Quorum, wie es bei Always On SQL Server der Fall ist. Bei Netzwerkisolation implementiert SafeKit einen Split-Brain-Checker mit einem Ping an einen Router, der als Zeuge fungiert. Darüber hinaus lassen sich mehrere Heartbeats im Produkt problemlos konfigurieren.

### Weitere Redundanz- und Hochverfügbarkeitslösungen {#other-redundancy-and-high-availability-solutions}

Mit SafeKit können Sie auf Windows und Linux die Echtzeitreplikation und das Failover von beliebigen Ordnern und Diensten, Datenbanken, kompletten Hyper-V- oder KVM-VMs, Docker , Kubernetes und Cloud-Anwendungen implementieren.

### Eine Komplettlösung {#a-complete-solution}

SafeKit löst: 

  * Hardwareausfälle (20 % der Probleme), einschließlich des kompletten Ausfalls eines Computerraums, 
  * Softwarefehler (40 % der Probleme), einschließlich Neustart kritischer Prozesse 
  * und menschliche Fehler (40 % der Probleme) dank seiner Benutzerfreundlichkeit und der Webkonsole.



{{%  insert-safekit-mirror-de app="Microsoft SQL Server"  %}}
 

## Videoanleitung: Konfigurieren eines SafeKit HA mirror Clusters für SQL Server {#videoguide-safekit-mirror-cluster}


{{%  insert-safekit-mirror-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}