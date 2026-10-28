---
title: "Clustering-Software für Farmen und Spiegelserver: Hochverfügbarkeit und Lastausgleich"
canonical: "https://safekit.eviden.com/de/architectures/clustering-software-load-balancing-mirroring/"
description: "Implementieren Sie fortschrittliche Architekturen durch die Kombination der Module SafeKit Farm und Mirror . Nutzen Sie die Vorteile des Netzwerk-Load-Balancings für skalierbare Frontend-Lösungen und der Echtzeit-Synchronreplikation für optimalen Backend-Datenschutz. Einfaches, SAN-loses Clustering für Windows und Linux – ohne spezielle IT-Kenntnisse. Jetzt kostenlos testen!"
category: "architectures"
lang: "de"
topics: "Hohe Verfügbarkeit und Skalierbarkeit kritischer Web- und Datenbankanwendungen mit der Clustering-Software SafeKit , 🔍 SafeKit High Availability Navigation Hub"
---

# Clustering-Software für Farmen und Spiegelserver: Hochverfügbarkeit und Lastausgleich {#clustering-software-for-farms-and-mirrors-high-availability--load-balancing}

## Hohe Verfügbarkeit und Skalierbarkeit kritischer Web- und Datenbankanwendungen mit der Clustering-Software SafeKit {#high-availability-and-scalability-of-critical-web-and-database-applications-with-the-safekit-clustering-software}

### Lastausgleich, Spiegelung und Failover {#load-balancing-mirroring-and-failover}


![ SafeKit Clustering mit Lastausgleich und Spiegelung ](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


### Beispiel mit der Clustering-Software SafeKit {#example-with-the-safekit-clustering-software}

Mit der Clustering-Software SafeKit können Sie beispielsweise den Lastausgleich IIS und die Spiegelung Microsoft SQL Server implementieren.

Dazu müssen Sie ein `farm` -Modul für den SQL-Server IIS und ein mirror -Modul für den SQL-Server Microsoft bereitstellen. Jedes `farm` und mirror -Modul ist mit einer eigenen virtuellen IP-Adresse und eigenen Neustartskripten konfiguriert.

Die Module mirror und `farm` können beide auf einem Cluster aus zwei Servern bereitgestellt werden. IIS , Microsoft und SQL Server laufen dann auf diesen beiden Servern. Alternativ können die beiden Module auch auf zwei Clustern mit unterschiedlichen Servern bereitgestellt werden.

Bei der Clustering-Software SafeKit gibt es keinen Unterschied zwischen einer Bereitstellung auf denselben Servern oder auf verschiedenen Servern.

### Hochverfügbarkeits- und Skalierbarkeitslösung {#high-availability-and-scalability-solution}

Die Clustering-Software SafeKit bietet eine einfache Lösung für hohe Verfügbarkeit und Skalierbarkeit bei kritischen Web- und Datenbankanwendungen.

Dadurch werden Netzwerklastverteilung, Echtzeit-Datenspiegelung und Anwendungsausfallsicherung in einem einzigen Produkt kohärent verwaltet.

Im Vergleich zur Hardware-Clusterung benötigt die Clustering-Software SafeKit keine gemeinsam genutzten Festplatten, replizierte SANs, Load Balancer, Enterprise-Editionen von Betriebssystemen oder Datenbanken.


{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}