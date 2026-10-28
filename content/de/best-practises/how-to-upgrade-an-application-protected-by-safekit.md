---
title: "Aktualisierung einer durch SafeKit geschützten Anwendung in einem HA-Cluster"
canonical: "https://safekit.eviden.com/de/best-practises/how-to-upgrade-an-application-protected-by-safekit/"
description: "Erfahren Sie, wie Sie durch SafeKit geschützte Anwendungen sicher aktualisieren. Vergleichen Sie kleinere und größere Upgrades, rollierende Upgrades, Rollback-Strategien und VM-basierte Hochverfügbarkeit."
category: "best-practises"
lang: "de"
topics: "Upgrade einer durch SafeKit geschützten Hochverfügbarkeitsanwendung, VM-basierte Hochverfügbarkeit, Anwendungsbasierte Hochverfügbarkeit, Wahl der richtigen Upgrade-Strategie, Fazit, 🔍 SafeKit Hochverfügbarkeits-Navigationszentrale"
---

# Aktualisierung einer durch SafeKit geschützten Anwendung in einem HA-Cluster {#upgrading-an-application-protected-by-safekit-in-an-ha-cluster}

## Aktualisierung einer durch SafeKit geschützten Hochverfügbarkeitsanwendung {#upgrading-a-high-availability-application-protected-by-safekit}

Die Aktualisierung geschäftskritischer Anwendungen ist unerlässlich für Sicherheit, Leistung und den Zugriff auf neue Funktionen. Wenn eine Anwendung durch SafeKit geschützt ist, hängt das Upgrade-Verfahren von der verwendeten Hochverfügbarkeitsarchitektur ab.

Es gibt zwei gängige Bereitstellungsmodelle:

  * ** Virtuelle Maschine Hochverfügbarkeit ** , wobei die Anwendung in einer geschützten virtuellen Maschine ausgeführt wird, die von SafeKit verwaltet wird.
  * ** Anwendungsweite Hochverfügbarkeit ** , wobei die Anwendung auf zwei Servern installiert ist.


Jedes Modell bietet unterschiedliche Upgrade-Mechanismen und Rollback-Strategien.

## Hochverfügbarkeit auf VM-Ebene {#vm-level-ha}

Bei SafeKit VM-Failover-Lösungen wie **hyperv.safe** und **kvm.safe** wird die Anwendung nur einmal in einer virtuellen Maschine installiert.

SafeKit schützt die gesamte VM und nicht nur die Anwendung selbst, was die Wartungsarbeiten erheblich vereinfacht.

### Vereinfachter Upgrade-Prozess {#simplified-upgrade-process}

Da Sie mit einer einzelnen VM-Instanz der Anwendung arbeiten, erfolgt die Wartung auf der Virtualisierungsebene und nicht durch ein Failover auf Anwendungsebene.

Das Upgrade-Verfahren ist unkompliziert:

  1. Erstellen Sie einen Prüfpunkt oder Snapshot der virtuellen Maschine mithilfe der Hyper-V- oder KVM-Verwaltungskonsole.
  2. Führen Sie das Anwendungs-Upgrade innerhalb der virtuellen Maschine durch.
  3. Überprüfen Sie die aktualisierte Anwendung.
  4. Wenn das Upgrade erfolgreich war, entfernen Sie den Snapshot und setzen Sie den normalen Betrieb fort.
  5. Im Falle eines Problems stellen Sie die virtuelle Maschine aus dem Snapshot wieder her und kehren Sie umgehend zum vorherigen, bekannten Funktionszustand zurück.


Die Serviceunterbrechung ist auf die Dauer begrenzt, die normalerweise durch das eigene Aktualisierungsverfahren der Anwendung erforderlich ist.

### Vorteile des VM-Level-Schutzes {#benefits-of-vm-level-protection}

  * Es muss nur eine Anwendungsinstanz gewartet werden.
  * Kein Cluster-fähiges Upgrade-Verfahren.
  * Schnelles Rollback durch VM-Snapshots.
  * Reduzierte betriebliche Komplexität.
  * Einheitlicher Upgrade-Prozess unabhängig von der geschützten Anwendung.


Dieser Ansatz ist besonders attraktiv für vorgefertigte Softwarepakete und kommerzielle Standardsoftware, bei denen Anwendungsclustering nicht verfügbar oder schwer zu implementieren ist.

## Hochverfügbarkeit auf Anwendungsebene {#app-level-ha}

In einem herkömmlichen SafeKit Cluster wird die Anwendung auf zwei Knoten installiert: Knoten 1 und Knoten 2. SafeKit synchronisiert die Anwendungsdaten zwischen diesen Knoten und übernimmt bei Bedarf automatisch das Failover.

### Geringfügiges Anwendungs-Upgrade {#app-level-ha-minor}

Ein kleineres Upgrade ändert lediglich die Anwendungsdateien, während die replizierten Daten zwischen den Versionen vollständig kompatibel bleiben. Da sich das Format der replizierten Daten nicht ändert, unterstützt SafeKit ein rollierendes Upgrade mit minimaler Ausfallzeit. 

  1. Der Cluster läuft anfänglich in einer ** ✅ PRIM (Knoten 1) / ✅ SECOND (Knoten 2) ** -Konfiguration. Die Anwendung läuft auf dem PRIM-Knoten, und replizierte Daten werden kontinuierlich mit dem SECOND-Knoten synchronisiert. 
  2. Stoppen Sie das Modul SafeKit auf dem zweiten Knoten ( ** ❌ STOP (Knoten 2) ** ), aktualisieren Sie die Anwendung und starten Sie das Modul neu. Währenddessen läuft die Anwendung auf dem ** ✅ ALONE (Knoten 1) ** weiter, und es kommt zu keiner Dienstunterbrechung. 
  3. Nach dem Neustart tritt der aktualisierte Knoten dem Cluster als ** ✅ SECOND (Knoten 2) ** wieder bei und synchronisiert die replizierten Daten neu. 
  4. Der primäre Knoten ( ** ❌ STOP (Knoten 1) ** ) wird gestoppt. SafeKit führt automatisch ein Failover durch, und der aktualisierte Knoten wird zu ** ✅ ALONE (Knoten 2) ** . Die Anwendung wird auf diesem Knoten neu gestartet. Die Ausfallzeit ist auf die Dauer des Failovers und des Neustarts der Anwendung begrenzt. 
  5. Wenn die aktualisierte Anwendung im ALONE-Zustand korrekt funktioniert, aktualisieren Sie den verbleibenden Knoten (Knoten 1) und starten Sie dessen SafeKit Modul neu. 
  6. Nach der Resynchronisierung kehrt der Cluster zu seiner normalen ** ✅ SECOND (Knoten 1) / ✅ PRIM (Knoten 2) ** -Konfiguration zurück. Die ursprünglichen Rollen können entweder manuell über die SafeKit -Administrationskonsole oder automatisch über die SafeKit Konfiguration wiederhergestellt werden. 


** Rollback-Prozedur **

  * In Schritt 5 den Knoten ** ✅ ALONE (Knoten 2) ** stoppen.
  * Erzwinge, dass der ursprüngliche Knoten (Knoten 1) als primärer Knoten ** ALONE (Knoten 1) ** mit der vorherigen Anwendungsversion startet.
  * Installieren Sie die vorherige Version auf dem aktualisierten Knoten (Knoten 2) neu.
  * Rückkehr zu einer normalen ** ✅ PRIM (Knoten 1) / ✅ SECOND (Knoten 2) ** Konfiguration.


Das vollständige Upgrade wird mit einer Ausfallzeit durchgeführt, die auf den Übergang von ** ✅ PRIM / ✅ SECOND ** zu ** ❌ STOP / ✅ ALONE ** beschränkt ist. 

### Wichtiges Anwendungs-Upgrade {#app-level-ha-major}

Ein größeres Upgrade ändert das Format oder die Struktur der replizierten Daten. Da die von der neuen Version generierten Daten nicht mehr mit der alten Version kompatibel sind, kann kein rollierendes Upgrade durchgeführt werden. 

  1. Der Cluster läuft anfänglich in einer ** ✅ PRIM (Knoten 1) / ✅ SECOND (Knoten 2) ** Konfiguration. 
  2. Stoppen Sie zuerst den zweiten Knoten und dann den primären Knoten. Der Cluster wechselt zu ** ❌ STOP (Knoten 1) / ❌ STOP (Knoten 2) ** . 
  3. Aktualisieren Sie den vorherigen PRIM-Knoten und starten Sie ihn neu. Der Knoten startet allein als ** ✅ ALONE (Knoten 1) ** mit der neuen Anwendungsversion. 
  4. Überprüfen Sie die aktualisierte Anwendung und stellen Sie sicher, dass sie ordnungsgemäß funktioniert. 
  5. Wenn die Validierung erfolgreich ist, aktualisieren Sie den verbleibenden Knoten und starten Sie dessen SafeKit -Modul neu. 
  6. Der aktualisierte Knoten wird zu ** ✅ SECOND (Knoten 2) ** , resynchronisiert die Anwendungsdaten, und der Cluster kehrt zu einer normalen ** ✅ PRIM (Knoten 1) / ✅ SECOND (Knoten 2) ** Konfiguration zurück. 


** Rollback-Prozedur **

  * In Schritt 5 wird der aktualisierte Knoten ** ✅ ALONE (Knoten 1) ** gestoppt.
  * Erzwinge, dass der nicht aktualisierte Knoten als primärer Knoten ** ✅ ALLEIN (Knoten 2) ** startet.
  * Installieren Sie die vorherige Anwendungsversion auf dem aktualisierten Knoten neu.
  * Stellen Sie die ursprüngliche ** ✅ SECOND (Knoten 1) / ✅ PRIM (Knoten 2) ** Konfiguration wieder her.


Da replizierte Daten während der Migration verändert werden, entspricht die Ausfallzeit dem Zeitraum zwischen dem Zustand ** ❌ STOP / ❌ STOP ** und dem Neustart des ersten aktualisierten Knotens als ** ✅ ALONE ** . 

### Warum SafeKit Anwendungs-Upgrades vereinfacht {#why-safekit-simplifies-application-upgrades}

SafeKit minimiert das Betriebsrisiko, indem es Administratoren Folgendes ermöglicht:

  * Aktualisieren Sie jeweils einen Knoten.
  * Die Verfügbarkeit des Dienstes sollte nach Möglichkeit sichergestellt werden.
  * Neue Versionen sollten vor der Umstellung auf den Produktionsbetrieb validiert werden.
  * Bei unerwarteten Problemen schnell zum vorherigen Knoten zurückkehren.


## Die richtige Upgrade-Strategie auswählen {#choosing-the-right-upgrade-strategy}

Bereitstellungsmodell | Anwendungsinstanzen | Auswirkungen auf replizierte Daten | Upgrade-Ansatz  
---|---|---|---  
Anwendungsebene HA | Zwei Knoten | Abhängig vom Upgrade-Typ | Rollierendes Upgrade mit Failover  
VM-Level HA ( hyperv.safe / kvm.safe ) | Eine VM | Innerhalb der VM verwaltet | Snapshot, Upgrade, Validierung, Rollback bei Bedarf  
  
## Schlussfolgerung {#conclusion}

SafeKit bietet flexible Hochverfügbarkeitsarchitekturen, die sich an die Betriebsanforderungen verschiedener Anwendungen anpassen. Ob Sie eine Clusteranwendung über zwei Knoten oder eine einzelne Anwendungsinstanz in einer virtuellen Maschine schützen möchten: SafeKit ermöglicht kontrollierte Upgrades, minimiert Ausfallzeiten und bietet zuverlässige Wiederherstellungsoptionen für Wartungsarbeiten.


{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}