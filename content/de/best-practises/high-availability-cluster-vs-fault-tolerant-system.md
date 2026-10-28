---
title: "HA-Cluster vs. fehlertolerantes System: Die richtige Redundanzstrategie wählen"
canonical: "https://safekit.eviden.com/de/best-practises/high-availability-cluster-vs-fault-tolerant-system/"
description: "Vergleichen Sie HA-Cluster mit fehlertoleranten Systemen. Erfahren Sie, wie SafeKit einen SAN-losen Software-HA-Cluster vorschlägt, der sowohl vor Hardware- als auch vor Softwareausfällen schützt. Senken Sie die Kosten durch den Wegfall spezialisierter fehlertoleranter Hardware und gewährleisten Sie gleichzeitig null Datenverlust (RPO 0)."
category: "best-practises"
lang: "de"
topics: "Was ist der Unterschied zwischen Hochverfügbarkeit und Fehlertoleranz? Vor- und Nachteile von Hochverfügbarkeit und Fehlertoleranz. 🔍 SafeKit Hochverfügbarkeits-Navigationszentrale"
---

# HA-Cluster vs. fehlertolerantes System: Die richtige Redundanzstrategie wählen {#ha-cluster-vs-fault-tolerant-system-choosing-the-right-redundancy-strategy}

## Was ist der Unterschied zwischen Hochverfügbarkeit und Fehlertoleranz? {#what-is-the-difference-between-high-availability-and-fault-tolerance}

### Übersicht {#overview}

Dieser Artikel untersucht die Vor- und Nachteile eines hochverfügbaren Clusters im Vergleich zu einem fehlertoleranten System unter Berücksichtigung von Hardwarebeschränkungen, Softwarefehlern, RTO und RPO.

Die folgenden Vergleichstabellen erläutern detailliert den Unterschied zwischen einem fehlertoleranten System und SafeKit , einem Software-Hochverfügbarkeitscluster.

### Was ist Hochverfügbarkeit? {#what-is-high-availability}

Ein Hochverfügbarkeitscluster basiert auf zwei Servern, wobei die kritische Anwendung bei Hardware- oder Softwarefehlern neu gestartet wird. Es gibt zwei Arten von Clustern: Hardwarecluster und Softwarecluster.

Hardware-Cluster basieren auf gemeinsam genutzten Festplatten, was zu Abhängigkeiten zwischen Servern und deren Verbindungen zu gemeinsam genutzten Festplattenarrays führt.

Softwarecluster wie SafeKit basieren auf Echtzeit-Datenreplikation und sind hardwareunabhängig: Sie können auf physischen oder virtuellen Servern oder in der Cloud eingesetzt werden.

### Was ist Fehlertoleranz? {#what-is-fault-tolerance}

Ein fehlertolerantes System nutzt entweder spezialisierte Hardware oder einen spezialisierten Hypervisor, um einen Hardwareausfall zu erkennen und ohne Neustart der Anwendung sofort auf eine redundante Hardwarekomponente umzuschalten.

Fehlertolerante Systeme beheben lediglich Hardwarefehler und nicht Softwarefehler, die mit Abstand häufigste Ursache für Systemausfälle.

## Vor- und Nachteile von Hochverfügbarkeit und Fehlertoleranz {#pros-and-cons-of-high-availability-and-fault-tolerance}

Zum Schutz kritischer Anwendungen vor Ausfällen gibt es zwei Hauptansätze: Software-Hochverfügbarkeitscluster ** ** und fehlertolerante Systeme ( ** ** ). Jeder Ansatz bietet unterschiedliche Vor- und Nachteile hinsichtlich Kosten, Flexibilität, Wiederherstellungszeit und Hardwareanforderungen. Das Verständnis dieser Unterschiede hilft Ihnen, die passende Lösung für Ihre spezifischen Bedürfnisse auszuwählen.

** Vergleich von hochverfügbaren Software-Clustern mit fehlertoleranten Systemen **

Kriterien | Software-Hochverfügbarkeitscluster | Fehlertolerantes System  
---|---|---  
Produkt | [ SafeKit auf Windows und Linux ](</>) | Fehlertolerante Produkte  
Hardware/Hypervisor | Kein dedizierter Server, kein dedizierter Hypervisor. Funktioniert mit dem standardmäßigen und kostenlosen Hypervisor Hyper-V ( Windows ), der im Kernel Windows für Server und PCs enthalten ist. Funktioniert mit dem standardmäßigen und kostenlosen Hypervisor KVM (Kernel-basierte virtuelle Maschine), der im Mainline-Kernel Linux integriert ist. Jeder Server [ kann für mehrere Anwendungen als Failover-Server für den jeweils anderen Server ](</de/architectures/active-active-cluster-real-time-replication/>) dienen. | Dedizierte Hardware oder dedizierter Hypervisor. Der sekundäre Server ist der Ausführung derselben Anwendung gewidmet und auf Befehlsebene synchronisiert.  
Softwarefehler | : Ein Neustart in einer anderen Betriebssystemumgebung kann helfen. | Softwareausnahme auf beiden Servern gleichzeitig unter demselben Betriebssystem.  
Reibungsloses Upgrade/Fehlerbehebung von Anwendung und Betriebssystem | Ja – Reibungsloses Upgrade/Fehlerbehebung von Anwendung und Betriebssystem serverweise möglich. N- und N+1-Versionen können parallel existieren. | Nein – Gleiches Anwendungs- und Betriebssystem-Image auf beiden Servern.  
RTO/RPO | Die Wiederherstellungszeit mit SafeKit ( [ RTO ](</de/best-practises/what-is-rpo-and-rto-with-examples/>) ) hängt von der Zeit für die Erkennung und den Neustart der Anwendung ab (ca. 1 Minute). Der Datenverlust mit SafeKit ( [ RPO ](</de/best-practises/what-is-rpo-and-rto-with-examples/>) ) ist null, da die Replikation synchron erfolgt. | Die Wiederherstellungszeit (RTO) eines fehlertoleranten Systems ist null. Die Anwendung wird im Fehlerfall nicht neu gestartet und setzt ihre Ausführung auf dem sekundären Server fort. Der Datenverlust (RPO) ist ebenfalls null.  
Flexibilität | Kann auf jedem Servertyp mit Standard-Betriebssystemen ausgeführt werden Windows und Linux | Abhängig von spezifischer Hardware oder spezifischen Hypervisoren  
Geeignet für Softwareentwickler | die ihrer Anwendung eine einfache Hochverfügbarkeitsoption hinzufügen möchten [ Umgebungen | in denen Hardwareausfälle das Hauptproblem darstellen ](</de/use-cases/application-clustering-software/>)  
  
Zusammenfassend bietet die Software SafeKit Hochverfügbarkeit ** mit ** eine kostengünstige und flexible Lösung, die auf Standardhardware läuft und fortlaufende Upgrades mit nahezu null Ausfallzeit (RTO ~1 Minute) und ohne Datenverlust unterstützt. Fehlertolerante Systeme bieten zwar ein sofortiges Failover (RTO = 0), benötigen jedoch dedizierte Hardware und sind für unabhängige Software-Updates weniger flexibel.


{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}