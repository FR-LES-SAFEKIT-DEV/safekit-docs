---
title: "Alte SafeKit Milestone -Konfiguration"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-old-milestone-configuration/"
category: "quick-install"
lang: "de"
topics: "Alte schrittweise Konfiguration der SafeKit / Milestone XProtect Lösung"
---

# Alte SafeKit Milestone Konfiguration {#old-safekit-milestone-configuration}

## Alte schrittweise Konfiguration der SafeKit / Milestone XProtect Lösung {#old-step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


![ Warnung ](/wp-content/uploads/2022/07/warning-small.png)


Achtung: Für die Konfiguration der virtuellen IP-Adresse sind einige spezifische Schritte erforderlich, sonst funktioniert das Failover nicht.

### 1. Starten Sie die Konsole SafeKit {#1-launch-the-safekit-console}

  * Starten Sie die Webkonsole in einem Browser auf einem Clusterknoten, indem Sie eine Verbindung zu `http://localhost:9010` herstellen.
  * Geben Sie `admin` als Benutzernamen und das während der Installation festgelegte Passwort ein.


Sie können die Konsole auch in einem Browser auf einer Workstation außerhalb des Clusters ausführen.


![ Warnung ](/wp-content/uploads/2022/07/warning-small.png)


Die Konfiguration von SafeKit erfolgt auf beiden Knoten über einen einzigen Browser.


![ Hinweis ](/wp-content/uploads/2022/07/note.png)


Informationen zur Sicherung der Webkonsole finden Sie im Benutzerhandbuch unter „Sichern der SafeKit -Webkonsole“.


Starten Sie die Webkonsole ![ SafeKit um den Cluster ](/wp-content/uploads/2023/01/appli-1.png) zu konfigurieren.


### 2. Knotenadressen konfigurieren: {#2-configure-node-addresses}

  * Geben Sie die IP-Adressen der Knoten ein.
  * Klicken Sie anschließend auf `Apply` , um die Konfiguration zu speichern.


![ Warnung ](/wp-content/uploads/2022/07/warning-small.png)


Wenn die Hintergrundfarbe von Knoten 1 oder Knoten 2 rot ist, überprüfen Sie die Verbindung des Browsers zu beiden Knoten und überprüfen Sie die Firewall auf beiden Knoten zur Fehlerbehebung.


![ Hinweis ](/wp-content/uploads/2022/07/note.png)


Bei diesem Vorgang werden die IP-Adressen auf beiden Knoten in der Datei `cluster.xml` abgelegt (weitere Informationen finden Sie im Training mit der Kommandozeile).


![ Geben Sie die Knoten des Clusters ](/wp-content/uploads/2023/01/appli-3.png)


### 3. Wählen Sie das Modul {#3-choose-the-module} aus.

  * Klicken Sie im Konfigurationsmenü auf das Modul .safe.


![ Hinweis ](/wp-content/uploads/2022/07/note.png)


Die Konsole findet xxx.safe im Verzeichnis 'Application_Modules/demo/' auf dem Server, wenn Sie während der Installation ein Modul dort abgelegt haben.


![ Wählen Sie das Modul für ](/wp-content/uploads/2023/01/appli-4.png) aus


### 4. Konfigurieren Sie das Modul {#4-configure-the-module}

  * Wählen Sie einen automatischen Start des Moduls beim Systemstart ohne Verzögerung.
  * Normalerweise gibt es ein einziges Heartbeat-Netzwerk, über das die Replikation erfolgt. Bei Bedarf kann jedoch ein privates Netzwerk definiert werden.
  * Prüfen Sie, ob die replizierten Verzeichnisse auf beiden Knoten installiert sind und die Anwendungsdaten enthalten.  
Für eine Datenbank ist die Replikation von Daten und Protokollen erforderlich.  
Sie können bei Bedarf neue replizierte Verzeichnisse hinzufügen.
  * Geben Sie eine virtuelle IP-Adresse ein. Eine virtuelle IP-Adresse ist eine Standard-IP-Adresse im selben IP-Netzwerk (demselben Subnetz) wie die IP-Adressen beider Knoten.  
Anwendungsclients müssen mit der virtuellen IP-Adresse (oder dem mit der virtuellen IP-Adresse verknüpften DNS-Namen) konfiguriert werden.  
Die virtuelle IP-Adresse wird im Fehlerfall automatisch umgeschaltet.
  * `start_prim` und `stop_prim` müssen das Starten und Stoppen der Anwendung beinhalten.  
Sie können in diesen Skripten neue Dienste hinzufügen.  
Prüfen Sie, ob die Namen der Dienste in diesen Skripten mit den auf beiden Knoten installierten Diensten übereinstimmen; ändern Sie sie andernfalls in den Skripten.
  * Stoppen Sie die in `start_prim` konfigurierten Dienste auf beiden Knoten.
  * Auf Windows und auf beiden Knoten wird mit dem Windows Dienstmanager `Boot Startup Type = Manual` für alle in `start_prim` registrierten Dienste festgelegt ( SafeKit steuert den Start der Dienste in `start_prim` ).


![ Warnung ](/wp-content/uploads/2022/07/warning-small.png)


Wenn SQL auf dem Verwaltungsserver installiert ist:

  * Die SQL-Systemdatenbanken [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (z. B. master.mdf und mastlog.ldf) müssen sich auf beiden Knoten in denselben Verzeichnissen befinden. Die Verzeichnisse müssen als repliziert konfiguriert sein.
  * SQL muss auf beiden Knoten am selben Speicherort im Dateisystem installiert sein, da sich die schreibgeschützte SQL-Ressourcendatenbank [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) in der Binärdatei befindet und für das Failover benötigt wird. Diese Datenbank muss nicht repliziert werden.
  * Die SQL-Datenbanken Milestone (.mdf und .ldf) müssen sich auf beiden Knoten in denselben Verzeichnissen befinden. Die Verzeichnisse müssen als repliziert konfiguriert sein. Die Datenbanken Milestone befinden sich gemäß diesem Artikel [ ](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>) wie folgt.


![ Warnung ](/wp-content/uploads/2022/07/warning-small.png)


Beachten Sie, dass Prozesse, deren Name im Prozessprüfer angezeigt wird, überwacht werden und im Fehlerfall neu gestartet werden. Die Konfiguration eines falschen Prozessnamens führt dazu, dass das Modul direkt nach dem Start beendet wird.


![ Hinweis ](/wp-content/uploads/2022/07/note.png)


Über die Schaltfläche „Anwenden“ wird die Konfiguration in den Dateien `userconfig.xml` , `start_prim` und `stop_prim` auf beiden Knoten angezeigt (weitere Informationen finden Sie im Training mit der Befehlszeile).


![ Moduleinstellungen eingeben ](/wp-content/uploads/2023/01/appli-7-1.png)


### 5. Überprüfen Sie die erfolgreiche Konfiguration {#5-verify-successful-configuration}

  * Prüfen Sie, ob auf beiden Knoten die Erfolgsmeldung (grün) angezeigt wird, und klicken Sie auf Weiter.


![ Modulkonfiguration erfolgreich prüfen ](/wp-content/uploads/2023/01/appli-9-2.png)


### 6. Starten Sie nichts und klicken Sie auf die Schaltfläche „Schließen“ {#6-do-not-start-anything-and-click-on-the-close-button}


![ Warnung ](/wp-content/uploads/2022/07/warning-small.png)


Starten Sie nichts und klicken Sie nicht auf die Schaltfläche „Schließen“, da vor dem Start eine spezielle Konfiguration der virtuellen IP-Adresse erforderlich ist.


![ Wählen Sie den Knoten mit den aktuellen Daten aus ](/wp-content/uploads/2023/01/appli-10-1.png)


### 7. Gehen Sie zum Desktop von Knoten 1 und legen Sie die virtuelle IP-Adresse in den internen Dateien Milestone {#milestone-files} fest.


![ Hinweis ](/wp-content/uploads/2022/07/note.png)


Seit Milestone 2022 R3 ist dieser Schritt nicht mehr notwendig und wird im nächsten Schritt automatisch mit „Server Configurator - Server registrieren - http://virtual-IP" durchgeführt.

Führen Sie auf Knoten 1 in einer PowerShell-Befehlszeile als Administrator folgendes Skript aus:
    
    
    c: /safekit/modules / /bin/UpdateAuthServerUri.ps1


![ Hinweis ](/wp-content/uploads/2022/07/note.png)


Dieses Skript legt die virtuelle IP-Adresse in 2 internen Milestone -Dateien fest:
    
    
    C:\ProgramData\ Milestone \ XProtect Management Server\ ServerConfig.xml
    
    
        <AuthorizationServerUri> /IDP</AuthorizationServerUri> http://** < virtual-ip> **
    
    
    C:\Program Files\ Milestone \ XProtect Management Server\ IIS \IDP\appsettings.json
    
    
        "Autorität": " http://** < virtual-ip> ** /IDP "


![ Warnung ](/wp-content/uploads/2022/07/warning-small.png)


Wir gehen in diesem Schritt davon aus, dass die virtuelle IP-Adresse in den vorherigen Schritten korrekt konfiguriert wurde (das Skript verwendet die in der SafeKit Konsole eingegebene und in `userconfig.xml` gespeicherte virtuelle IP-Adresse).


![ Hinweis ](/wp-content/uploads/2022/07/note.png)


### 8. Starten Sie Knoten 1 in der Konsole als primären Knoten, den Knoten mit den aktuellen Daten {#8-start-node-1-as-primary-in-the-console-the-node-with-up-to-date-data}

Seit Schritt 7 gehen wir davon aus, dass Knoten 1 über die aktuellen replizierten Verzeichnisse verfügt.

Erzwingen Sie den Start von Knoten 1 als primären Knoten. Wenn Knoten 2 gestartet wird, werden alle Daten von Knoten 1 auf Knoten 2 kopiert.


![ Warnung ](/wp-content/uploads/2022/07/warning-small.png)


Wenn Sie die falsche Wahl treffen, riskieren Sie, veraltete Daten auf beiden Knoten zu synchronisieren.


![ Warnung ](/wp-content/uploads/2022/07/warning-small.png)


Es wird außerdem davon ausgegangen, dass die Anwendung auf Knoten 1 gestoppt wird, damit SafeKit die Replikationsmechanismen installiert und anschließend die Anwendung im Skript `start_prim` startet.


![ Erzwingt den Start des Knotens als primären Knoten mit den aktuellen Daten. ](/wp-content/uploads/2022/07/appli-11-bis.png)


### 9. Warten Sie auf den Übergang zu ALLEIN (grün) {#9-wait-for-the-transition-to-alone-green}

  * Knoten 1 sollte den Status ALONE (grün) erreichen, was bedeutet, dass das Skript `start_prim` auf Knoten 1 ausgeführt wurde.


![ Warnung ](/wp-content/uploads/2022/07/warning-small.png)


Wenn der Status ALONE (grün) lautet und die Anwendung nicht gestartet ist, überprüfen Sie die Ausgabemeldungen von `start_prim` im Anwendungsprotokoll von Knoten 1.


![ Warnung ](/wp-content/uploads/2022/07/warning-small.png)


Falls Knoten 1 den Zustand ALONE (grün) nicht erreicht, analysieren Sie die Ursache mithilfe des Modulprotokolls von Knoten 1.


![ Warnung ](/wp-content/uploads/2022/07/warning-small.png)


Befindet sich der Cluster im Zustand `WAIT (red) not uptodate - STOP (red) not uptodate` , stoppen Sie den WAIT-Knoten und erzwingen Sie dessen Start als primären Knoten.


![ Der erste Knoten startet als primärer Knoten und wird zu ALONE ](/wp-content/uploads/2022/07/appli-11-bis-bis.png)


### 10. Stoppen Sie auf dem Desktop von Knoten 1 den Management-Server Milestone , registrieren Sie sich anschließend an der virtuellen IP-Adresse und starten Sie ihn neu {#10-in-the-desktop-of-node-1-stop-then-register-on-the-vitual-ip-address-and-restart-the-milestone-management-server}

Führen Sie die folgenden Schritte auf Knoten 1 gemäß dem Menü im Bild aus:

  * Klicken Sie mit der rechten Maustaste auf das Symbol ** Milestone Management Server ** in der Taskleiste.
  * ** Management-Server-Dienst stoppen **
  * Wählen Sie anschließend ** Server Configurator... ** und registrieren Sie die virtuelle IP-Adresse.
  * ** Start Management Server Service **


![ Hinweis ](/wp-content/uploads/2022/07/note.png)


Dieses Verfahren registriert den Verwaltungsserver von Knoten 1 in der SQL-Datenbank (die auf Knoten 1 läuft) über eine Verbindung zur virtuellen Adresse.


![ Warnung ](/wp-content/uploads/2022/07/warning-small.png)


Vor Version Milestone 2022 R3 wurde bei der Registrierung möglicherweise die Konfiguration der virtuellen IP-Adresse in den internen Dateien Milestone gelöscht. Wiederholen Sie in diesem Fall Schritt 7 von [ ](#milestone-files) .


![ Hinweis ](/wp-content/uploads/2022/07/note.png)


Hinweis: Um eine Version vor Milestone 2020 R2 zu registrieren, verwenden Sie ** Verschlüsselungseinstellungen ändern... **


![ Registrieren Sie den Management-Server in Milestone 2020+ ](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 11. Legen Sie auf dem Desktop von Knoten 1 mit dem Management-Client Milestone die virtuelle IP-Adresse in den URLs für Dienste und Netzwerk {#11-in-the-desktop-of-node-1-with-milestone-management-client-set-the-virtual-ip-address-in-urls-for-services-and-network} fest.


![ Hinweis ](/wp-content/uploads/2022/07/note.png)


Seit Milestone 2022 R3 ist dieser Schritt nicht mehr erforderlich und wird automatisch mit „Serverkonfigurator – Server registrieren – http://virtual-IP". durchgeführt.

Dem Bild zufolge:

  1. Starten Sie den Management-Client ** Milestone XProtect ** auf Knoten 1.
  2. Im Menü ** Tools ** wählen Sie ** Registered Services ** . 
     * Im Fenster ** Hinzufügen/Entfernen registrierter Dienste ** wählen Sie einen Dienst in der Liste aus und klicken Sie auf ** Bearbeiten ** .
     * Ändern Sie im Fenster ** Registrierten Dienst bearbeiten ** die URL-Adresse des Dienstes in eine URL-Adresse, die dieselbe ist, aber die virtuelle IP-Adresse enthält.
     * Wiederholen Sie diese Schritte für alle im Fenster aufgeführten Dienste.
  3. Klicken Sie im selben Fenster auf ** Network ** . 
     * Ändern Sie im Fenster ** Netzwerkkonfiguration ** die URL-Adresse des Servers in eine URL-Adresse, die dieselbe ist, aber die virtuelle IP-Adresse enthält.


![ Legen Sie die virtuelle IP-Adresse in den URLs und im Milestone Management Client ](/wp-content/uploads/2022/07/milestone-url-vip.png) fest.


### 12. Konfigurieren Sie auf dem Desktop von Knoten 1 mit dem Management-Client Milestone die Administratorrollen so, dass ein korrektes Failover {#role} gewährleistet ist.


![ Hinweis ](/wp-content/uploads/2022/07/note.png)


Wenn Milestone " Windows -Authentifizierung mit einem Active Directory konfiguriert wurde, werden Benutzername und Passwort nach einem Failover im externen AD auf dem sekundären Knoten abgerufen, sodass keine spezielle Konfiguration erforderlich ist.

Beim Start des Milestone XProtect Management-Clients müssen Sie sich entweder mit der " Windows -Authentifizierung" oder der "Basisauthentifizierung" ( [ klicken Sie hier, um den Screenshot zu sehen ](</wp-content/uploads/2022/07/milestone-management-server-connect.png>) ) authentifizieren.

Öffnen Sie den Management-Client ** Milestone XProtect ** anschließend in ** Sicherheit / Rollen ** (siehe Abbildung).

  * Setzen Sie die Gruppe Windows ** BUILTIN\Administrators ** . Dadurch kann sich ein Administratorbenutzer auf dem sekundären System mit der Authentifizierung " Windows " mit Milestone auf dem sekundären System verbinden.
  * Erstellen Sie einen Benutzer mit „Basisauthentifizierung“ ( ** Admin ** im Bild), um die erneute Authentifizierung auf dem sekundären Knoten nach einem Failover sicherzustellen. Bei der „Basisauthentifizierung“ werden Benutzername und Passwort in der SQL-Datenbank gespeichert und nach einem Failover auf dem sekundären Knoten abgerufen.


![ Warnung ](/wp-content/uploads/2022/07/warning-small.png)


Durch Festlegen der Gruppe BUILTIN\Administrators können Sie sich auf dem sekundären Knoten mit einem lokalen Administrator namens Windows authentifizieren.

Andernfalls ist nach einem Failover keine Authentifizierung mit einem lokalen Windows -Konto auf dem sekundären Server möglich.

Das liegt daran, dass die Gruppe „BUILTIN\Administrators“ auf beiden Knoten dieselbe SID besitzt. Für andere lokale Gruppen oder Benutzer ist die Authentifizierung auf dem sekundären Knoten nicht möglich, da die SIDs der beiden Knoten unterschiedlich sind, selbst wenn sie denselben Namen haben.


![ Rollen im Management-Client Milestone festlegen ](/wp-content/uploads/2022/07/milestone-management-server-roles.png)


### 13. Gehen Sie zum Desktop von Knoten 2 und legen Sie die virtuelle IP-Adresse in den internen Dateien Milestone {#milestone-files-2} fest.


![ Hinweis ](/wp-content/uploads/2022/07/note.png)


Seit Milestone 2022 R3 ist dieser Schritt nicht mehr notwendig und wird im nächsten Schritt automatisch mit „Server Configurator - Server registrieren - http://virtual-IP" durchgeführt.

Führen Sie auf Knoten 2 in einer PowerShell-Befehlszeile als Administrator folgendes Skript aus:
    
    
    c: /safekit/modules/milestone/bin/UpdateAuthServerUri.ps1


![ Hinweis ](/wp-content/uploads/2022/07/note.png)


Dieses Skript legt die virtuelle IP-Adresse in 2 internen Milestone -Dateien fest:
    
    
    C:\ProgramData\ Milestone \ XProtect Management Server\ ServerConfig.xml
    
    
        <AuthorizationServerUri> /IDP</AuthorizationServerUri> http://** < virtual-ip> **
    
    
    C:\Program Files\ Milestone \ XProtect Management Server\ IIS \IDP\appsettings.json
    
    
        "Autorität": " http://** < virtual-ip> ** /IDP "

### 14. Registrieren Sie auf dem Desktop von Knoten 2 den Management-Server unter der virtuellen IP-Adresse {#14-in-the-desktop-of-node-2-register-the-management-server-on-the-vitual-ip-address}

  * Wählen Sie in der Taskleiste von Knoten 2 ** Serverkonfigurator ** und registrieren Sie ihn auf der virtuellen IP-Adresse (siehe Abbildung).
  * Dann ** Stop Management Server Service ** .


![ Warnung ](/wp-content/uploads/2022/07/warning-small.png)


Der Benutzer, der die Registrierung auf Knoten 2 durchführt, muss auf Knoten 1 die Administratorrolle in Milestone besitzen.

Wenn die Registrierung vom lokalen Administrator auf Knoten 2 durchgeführt wird, muss die integrierte Gruppe Windows `BUILTIN\Administrators` im Management Client unter „Sicherheit“ / „Rollen“ in Schritt 12 [ ](#role) festgelegt worden sein. Andernfalls schlägt die Registrierung fehl.


![ Hinweis ](/wp-content/uploads/2022/07/note.png)


Dieses Verfahren registriert den Verwaltungsserver von Knoten 2 in der SQL-Datenbank (die auf Knoten 1 läuft) über eine Verbindung zur virtuellen Adresse.


![ Warnung ](/wp-content/uploads/2022/07/warning-small.png)


Bei einer Version von Milestone vor 2022 R3 wurde möglicherweise die Konfiguration der virtuellen IP-Adresse in den internen Milestone -Dateien durch die Registrierung gelöscht. Wiederholen Sie in diesem Fall Schritt 13 [ ](#milestone-files-2) .


![ Registrieren Sie den Management-Server mit Milestone 2020+ ](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 15. Startknoten 2 {#15-start-node-2}

  * Starten Sie Knoten 2 mit seinem Kontextmenü.
  * Warten Sie auf den ZWEITEN (grünen) Zustand.


![ Hinweis ](/wp-content/uploads/2022/07/note.png)


Knoten 2 verbleibt im Zustand SECOND (magenta), während die replizierten Verzeichnisse resynchronisiert werden (Kopieren von Knoten 1 zu Knoten 2).

Dies kann je nach Größe der zu synchronisierenden Dateien in den replizierten Verzeichnissen und der Netzwerkbandbreite eine Weile dauern.

Den Fortschritt des Kopiervorgangs können Sie im Modulprotokoll von Knoten 2 mit der Option „verbose“ einsehen. Vergessen Sie nicht, das Fenster zu aktualisieren.


![ Der erste Knoten startet als primärer Knoten und wird zu ALONE ](/wp-content/uploads/2022/07/appli-11.png)


### 16. Überprüfen Sie, ob der Cluster betriebsbereit ist {#16-verify-that-the-cluster-is-operational}

  * Prüfen Sie, ob der Cluster den Status „grün/grün“ hat und ob die Dienste auf dem PRIM-Knoten laufen, aber nicht auf dem SECOND-Knoten.


In diesem Zustand werden nur Änderungen innerhalb von Dateien in Echtzeit repliziert.


![ Warnung ](/wp-content/uploads/2022/07/warning-small.png)


Komponenten, die Dienste nutzen, müssen mit der virtuellen IP-Adresse konfiguriert werden. Die Konfiguration kann über einen DNS-Namen erfolgen (sofern ein DNS-Name erstellt und der virtuellen IP-Adresse zugeordnet wurde).


![ Der zweite Knoten beginnt als SECOND ](/wp-content/uploads/2022/07/appli-12.png)


### 17. Konfigurieren Sie die virtuelle IP-Adresse auf den Aufzeichnungsservern {#17-configure-the-virtual-ip-address-in-recording-servers}

  * Entweder installieren Sie die Aufzeichnungsserver und geben dabei die virtuelle IP-Adresse in der Installations-URL an.
  * Oder legen Sie auf den Aufzeichnungsservern die virtuelle IP-Adresse in den folgenden Feldern fest: 
        
        C:\ProgramData\ Milestone \ XProtect Aufzeichnungsserver\ RecorderConfig.xml
        
            <server> <address>
        
            <server> <authorizationserveraddress>

  * Verbinden Sie den Milestone Management Client und den Milestone Smart Client auf der virtuellen IP-Adresse.


### 18. Management Client und Smart Client funktionieren nach dem Knotenwechsel {#18-management-client-and-smart-client-are-not-functioning-properly-after-node-switch} nicht ordnungsgemäß.

In einer Clusterumgebung mit XProtect Management Servern treten nach einem Knotenwechsel verschiedene Probleme mit Smart Client und Management Client auf. Diese Probleme hängen damit zusammen, dass Token vor und nach dem Knotenwechsel auf unterschiedlichen Knoten generiert werden und dass der Zugriff auf bestimmte, für die Tokenvalidierung benötigte Zertifikate erschwert ist. Eine Lösung ist verfügbar (für die Versionen 2022 R3 bis 2023 R2, siehe Milestone Knowledge Base).

Das Problem ist in Milestone 2023 R3 behoben.

### 18. Testen {#18-testing}

  * Den PRIM-Knoten stoppen, indem Sie im Kontextmenü nach unten scrollen und auf „Stoppen“ klicken. ** Verwenden Sie für den ersten Test keinen Swap-Speicher ** ) (siehe unten).
  * Überprüfen Sie, ob auf dem ZWEITEN Knoten ein Failover erfolgt ist, der dadurch ALLEIN (grün) werden sollte.
  * Überprüfen Sie mit Microsoft Management Console (MMC) das Failover der Dienste (die auf Knoten 1 im Skript `stop_prim` gestoppt und auf Knoten 2 im Skript `start_prim` gestartet wurden).


![ Warnung ](/wp-content/uploads/2022/07/warning-small.png)


Wenn Ihr System als PRIM-SECOND konfiguriert ist und alles ordnungsgemäß funktioniert, stoppen Sie den PRIM-Knoten und überprüfen Sie, ob auf Knoten 2, der dann den Status „ALONE“ erhält, alles korrekt funktioniert. Wenn alles in Ordnung ist, starten Sie Knoten 1 neu, wodurch die replizierten Verzeichnisse von Knoten 2 resynchronisiert werden.

Falls etwas schiefgeht, stoppen Sie Knoten 2 und erzwingen Sie den Start von Knoten 1 als primären Knoten. Dieser wird dann mit den zum Zeitpunkt des Stopps lokal intakten Daten neu gestartet.

Der Austausch beinhaltet einen Neustart des PRIM, der die Daten von Knoten 2 unmittelbar nach dem Stopp neu synchronisiert, sodass bei einem Problem mit der Replikationskonfiguration kein Neustart mit intakten Daten möglich ist.


![ Warnung ](/wp-content/uploads/2022/07/warning-small.png)


Falls die Anwendung auf Knoten 2 nicht gestartet wird, während der Status ALONE (grün) ist, überprüfen Sie die Ausgabemeldungen des Skripts `start_prim` im Anwendungsprotokoll von Knoten 2.


![ Warnung ](/wp-content/uploads/2022/07/warning-small.png)


Falls der Zustand ALONE (grün) nicht erreicht wird, analysieren Sie die Ursache mithilfe des Modulprotokolls von Knoten 2.


![ Hinweis ](/wp-content/uploads/2022/07/note.png)


Weitere Informationen zu den Tests finden Sie im Benutzerhandbuch.


![ Stoppen Sie das Modul auf dem PRIM-Server ](/wp-content/uploads/2022/07/appli-19.png)