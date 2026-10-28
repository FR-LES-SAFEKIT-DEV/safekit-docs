---
title: "Oude SafeKit Milestone -configuratie"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-old-milestone-configuration/"
category: "quick-install"
lang: "nl"
topics: "Oude stapsgewijze configuratie van de SafeKit / Milestone XProtect oplossing"
---

# Oude SafeKit Milestone -configuratie {#old-safekit-milestone-configuration}

## Oude stapsgewijze configuratie van de SafeKit / Milestone XProtect oplossing {#old-step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


![ Waarschuwing ](/wp-content/uploads/2022/07/warning-small.png)


Wees voorzichtig, er zijn enkele specifieke stappen nodig om het virtuele IP-adres te configureren, anders werkt de failover niet.

### 1. Start de SafeKit console {#1-launch-the-safekit-console}

  * Start de webconsole in een browser op een van de clusterknooppunten door verbinding te maken met `http://localhost:9010` .
  * Voer `admin` in als gebruikersnaam en het wachtwoord dat u tijdens de installatie hebt ingesteld.


Je kunt de console ook in een browser uitvoeren op een werkstation buiten het cluster.


![ Waarschuwing ](/wp-content/uploads/2022/07/warning-small.png)


De configuratie van SafeKit wordt op beide knooppunten vanuit één browser uitgevoerd.


![ Opmerking ](/wp-content/uploads/2022/07/note.png)


Zie 'De SafeKit webconsole beveiligen' in de gebruikershandleiding voor meer informatie over het beveiligen van de webconsole.


![ Start de SafeKit webconsole om het cluster ](/wp-content/uploads/2023/01/appli-1.png) te configureren.


### 2. Configureer de knooppuntadressen {#2-configure-node-addresses}

  * Voer de IP-adressen van de knooppunten in.
  * Klik vervolgens op `Apply` om de configuratie op te slaan.


![ Waarschuwing ](/wp-content/uploads/2022/07/warning-small.png)


Als de achtergrondkleur van node1 of node2 rood is, controleer dan de verbinding van de browser met beide nodes en controleer de firewall op beide nodes voor probleemoplossing.


![ Opmerking ](/wp-content/uploads/2022/07/note.png)


Deze bewerking plaatst de IP-adressen in het bestand `cluster.xml` op beide knooppunten (meer informatie hierover vindt u in de training met de commandoregel).


![ Ga naar de knooppunten van het cluster ](/wp-content/uploads/2023/01/appli-3.png)


### 3. Kies de module {#3-choose-the-module}

  * Klik in het tabblad Configuratie op de module .safe.


![ Opmerking ](/wp-content/uploads/2022/07/note.png)


De console vindt xxx.safe in de map 'Application_Modules/demo/' aan de serverzijde als je daar tijdens de installatie een module hebt geplaatst.


![ Kies de module voor ](/wp-content/uploads/2023/01/appli-4.png)


### 4. Configureer de module {#4-configure-the-module}

  * Kies ervoor om de module automatisch en zonder vertraging te starten bij het opstarten van het apparaat.
  * Normaal gesproken is er één heartbeat-netwerk waarop de replicatie plaatsvindt. Maar indien nodig kunt u een privénetwerk definiëren.
  * Controleer of de gerepliceerde mappen op beide knooppunten zijn geïnstalleerd en de applicatiegegevens bevatten.  
Voor een database is replicatie van gegevens en logbestanden noodzakelijk.  
U kunt naar behoefte nieuwe gerepliceerde mappen toevoegen.
  * Voer een virtueel IP-adres in. Een virtueel IP-adres is een standaard IP-adres in hetzelfde IP-netwerk (hetzelfde subnet) als de IP-adressen van beide knooppunten.  
Applicatieclients moeten geconfigureerd worden met het virtuele IP-adres (of de DNS-naam die aan het virtuele IP-adres is gekoppeld).  
Het virtuele IP-adres wordt automatisch gewijzigd in geval van een storing.
  * `start_prim` en `stop_prim` moeten het starten en stoppen van de applicatie bevatten.  
Je kunt in deze scripts nieuwe services toevoegen.  
Controleer of de namen van de services in deze scripts overeenkomen met de namen van de services die op beide knooppunten zijn geïnstalleerd. Zo niet, pas ze dan aan in de scripts.
  * Stop de services die geconfigureerd zijn in `start_prim` op beide knooppunten.
  * Stel op Windows en op beide knooppunten, met de servicemanager Windows , `Boot Startup Type = Manual` in voor alle services die geregistreerd zijn in `start_prim` ( SafeKit regelt het starten van services in `start_prim` ).


![ Waarschuwing ](/wp-content/uploads/2022/07/warning-small.png)


Als SQL op de beheerserver is geïnstalleerd:

  * De SQL-systeemdatabases [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (zoals master.mdf en mastlog.ldf) moeten zich in dezelfde mappen op beide knooppunten bevinden. De mappen moeten geconfigureerd zijn als gerepliceerd.
  * SQL moet op beide knooppunten op dezelfde locatie in het bestandssysteem worden geïnstalleerd, omdat de alleen-lezen SQL-resourcedatabase [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) zich in het binaire bestand bevindt en nodig is voor de failover. Deze database hoeft niet te worden gerepliceerd.
  * De SQL Milestone -databases (.mdf en .ldf) moeten zich in dezelfde mappen op beide knooppunten bevinden. De mappen moeten geconfigureerd zijn als gerepliceerd. Milestone -databases zijn als volgt, volgens dit artikel over [ ](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>) .


![ Waarschuwing ](/wp-content/uploads/2022/07/warning-small.png)


Houd er rekening mee dat als een procesnaam wordt weergegeven in Process Checker, deze wordt bewaakt en dat er een herstartactie wordt uitgevoerd in geval van een fout. Het configureren van een onjuiste procesnaam zorgt ervoor dat de module direct na het opstarten stopt.


![ Opmerking ](/wp-content/uploads/2022/07/note.png)


De knop "Toepassen" zal de configuratie in de bestanden `userconfig.xml` , `start_prim` en `stop_prim` op beide knooppunten weergeven (meer informatie hierover vindt u in de training met de commandoregel).


![ Voer de module-instellingen ](/wp-content/uploads/2023/01/appli-7-1.png)


### 5. Controleer of de configuratie succesvol is verlopen. {#5-verify-successful-configuration}

  * Controleer het succesbericht (groen) op beide knooppunten en klik op Volgende.


![ Controleer of de moduleconfiguratie succesvol ](/wp-content/uploads/2023/01/appli-9-2.png)


### 6. Start niets en klik op de knop Sluiten {#6-do-not-start-anything-and-click-on-the-close-button}


![ Waarschuwing ](/wp-content/uploads/2022/07/warning-small.png)


Start niets en klik niet op de knop Sluiten, want er is een speciale configuratie van het virtuele IP-adres vereist voordat u kunt beginnen.


![ Selecteer het knooppunt met de meest recente gegevens ](/wp-content/uploads/2023/01/appli-10-1.png)


### 7. Ga naar het bureaublad van knooppunt 1 en stel het virtuele IP-adres in de interne Milestone -bestanden in {#milestone-files}


![ Opmerking ](/wp-content/uploads/2022/07/note.png)


Sinds Milestone 2022 R3 is deze stap niet meer nodig en wordt deze in een volgende stap automatisch uitgevoerd met "Server Configurator - Registering servers - http://virtual-IP" ".

Voer in een PowerShell-opdrachtregel als beheerder op knooppunt 1 het volgende script uit:
    
    
    c: /safekit/modules / /bin/UpdateAuthServerUri.ps1


![ Opmerking ](/wp-content/uploads/2022/07/note.png)


Dit script stelt het virtuele IP-adres in op 2 interne Milestone -bestanden:
    
    
    C:\ProgramData\ Milestone \ XProtect Management Server\ ServerConfig.xml
    
    
        <AuthorizationServerUri> /IDP</AuthorizationServerUri> http://** < virtual-ip> **
    
    
    C:\Program Files\ Milestone \ XProtect Management Server\ IIS \IDP\appsettings.json
    
    
        "Autoriteit": " http://** < virtual-ip> ** /IDP


![ Waarschuwing ](/wp-content/uploads/2022/07/warning-small.png)


We gaan er in deze stap van uit dat het virtuele IP-adres correct is geconfigureerd in de voorgaande stappen (het script gebruikt het virtuele IP-adres dat is ingevoerd in de SafeKit -console en is opgeslagen in `userconfig.xml` ).


![ Opmerking ](/wp-content/uploads/2022/07/note.png)


### 8. Start knooppunt 1 als primair in de console, het knooppunt met de meest recente gegevens {#8-start-node-1-as-primary-in-the-console-the-node-with-up-to-date-data}

We gaan er vanaf stap 7 van uit dat knooppunt 1 de meest recente gerepliceerde mappen bevat.

Dwing de start van knooppunt 1 af als primair knooppunt. Wanneer knooppunt 2 wordt gestart, worden alle gegevens van knooppunt 1 naar knooppunt 2 gekopieerd.


![ Waarschuwing ](/wp-content/uploads/2022/07/warning-small.png)


Als je de verkeerde keuze maakt, loop je het risico dat er verouderde gegevens op beide knooppunten worden gesynchroniseerd.


![ Waarschuwing ](/wp-content/uploads/2022/07/warning-small.png)


Er wordt tevens aangenomen dat de applicatie op knooppunt 1 is gestopt, zodat SafeKit de replicatiemechanismen installeert en vervolgens de applicatie start in het `start_prim` -script.


![ Dwing de start af als primair van het knooppunt met de meest recente gegevens ](/wp-content/uploads/2022/07/appli-11-bis.png)


### 9. Wacht tot de overgang naar ALONE (groen) {#9-wait-for-the-transition-to-alone-green}

  * Knooppunt 1 moet de status ALONE (groen) bereiken, wat betekent dat het `start_prim` -script op knooppunt 1 is uitgevoerd.


![ Waarschuwing ](/wp-content/uploads/2022/07/warning-small.png)


Als de status ALONE (groen) is en de applicatie niet is gestart, controleer dan de uitvoerberichten van `start_prim` in het applicatielogboek van knooppunt 1.


![ Waarschuwing ](/wp-content/uploads/2022/07/warning-small.png)


Als knooppunt 1 de status ALONE (groen) niet bereikt, analyseer dan de oorzaak met behulp van het modulelogboek van knooppunt 1.


![ Waarschuwing ](/wp-content/uploads/2022/07/warning-small.png)


Als het cluster zich in de status `WAIT (red) not uptodate - STOP (red) not uptodate` bevindt, stop dan het WAIT-knooppunt en forceer de start ervan als primair knooppunt.


![ Het eerste knooppunt start als primair en wordt ALONE ](/wp-content/uploads/2022/07/appli-11-bis-bis.png)


### 10. Stop op het bureaublad van knooppunt 1, registreer vervolgens op het virtuele IP-adres en herstart de Milestone Management Server {#10-in-the-desktop-of-node-1-stop-then-register-on-the-vitual-ip-address-and-restart-the-milestone-management-server}

Voer de volgende stappen uit op knooppunt 1 volgens het menu in de afbeelding:

  * Klik met de rechtermuisknop op het pictogram ** Milestone Management Server ** in de taakbalk.
  * ** Stop Management Server Service **
  * Kies vervolgens ** Server Configurator... ** en registreer het virtuele IP-adres.
  * ** Start Management Server Service **


![ Opmerking ](/wp-content/uploads/2022/07/note.png)


Deze procedure registreert de beheerserver van knooppunt 1 in de SQL-database (die draait op knooppunt 1) via een verbinding met het virtuele adres.


![ Waarschuwing ](/wp-content/uploads/2022/07/warning-small.png)


Vóór versie Milestone 2022 R3 kan de registratie de configuratie van het virtuele IP-adres in de interne Milestone -bestanden hebben verwijderd. Herhaal in dat geval stap 7 van [ ](#milestone-files) .


![ Opmerking ](/wp-content/uploads/2022/07/note.png)


Opmerking: Om een versie van vóór Milestone 2020 R2 te registreren, gebruikt u ** Wijzig de versleutelingsinstellingen... **


![ Registreer de beheerserver in Milestone 2020+ ](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 11. Stel op het bureaublad van knooppunt 1 met Milestone Management Client het virtuele IP-adres in de URL's in voor services en netwerk {#11-in-the-desktop-of-node-1-with-milestone-management-client-set-the-virtual-ip-address-in-urls-for-services-and-network}


![ Opmerking ](/wp-content/uploads/2022/07/note.png)


Sinds Milestone 2022 R3 is deze stap niet meer nodig en wordt deze automatisch uitgevoerd met "Serverconfigurator - Servers registreren - http://virtual-IP".

Volgens de afbeelding:

  1. Start ** Milestone XProtect Management Client ** op knooppunt 1.
  2. In het menu ** Tools ** selecteert u ** Registered Services ** . 
     * In het venster ** Geregistreerde services toevoegen/verwijderen ** selecteert u een service in de lijst en klikt u op ** Bewerken ** .
     * Wijzig in het venster ** de geregistreerde service ** en vervang het URL-adres door hetzelfde URL-adres, maar dan met het virtuele IP-adres erin.
     * Herhaal deze stappen voor alle services die in het venster worden weergegeven.
  3. Klik in hetzelfde venster op ** Netwerk ** . 
     * Wijzig in het venster Netwerkconfiguratie ** ** het URL-adres van de server naar hetzelfde URL-adres, maar dan met het virtuele IP-adres erin.


![ Stel het virtuele IP-adres in de URL's en in de Milestone Management Client ](/wp-content/uploads/2022/07/milestone-url-vip.png)


### 12. Stel op het bureaublad van knooppunt 1 met Milestone Management Client de beheerdersrollen in om een correcte failover te garanderen. {#role}


![ Opmerking ](/wp-content/uploads/2022/07/note.png)


Als Milestone " Windows -authenticatie" is geconfigureerd met Active Directory, worden de gebruikersnaam/wachtwoord na een failover opgehaald uit de externe AD op het secundaire knooppunt, waardoor er geen speciale configuratie nodig is.

Wanneer u de Milestone XProtect Management Client start, moet u zich authenticeren met " Windows authenticatie" of "Basisauthenticatie" ( [ klik hier om de schermafbeelding te bekijken ](</wp-content/uploads/2022/07/milestone-management-server-connect.png>) ).

Open ** Milestone XProtect Management Client ** en in ** Beveiliging / Rollen ** (zie afbeelding)

  * Stel de groep Windows in op ** BUILTIN\Administrators ** . Hierdoor kan een beheerder op de secundaire server verbinding maken met Milestone op de secundaire server met " Windows -authenticatie".
  * Maak een gebruiker aan met "Basisverificatie" ( ** Admin ** in de afbeelding) om ervoor te zorgen dat er na een failover opnieuw wordt geverifieerd op het secundaire knooppunt. Bij "Basisverificatie" worden de gebruikersnaam en het wachtwoord opgeslagen in de SQL-database en worden deze na een failover op het secundaire knooppunt opgehaald.


![ Waarschuwing ](/wp-content/uploads/2022/07/warning-small.png)


Door de groep BUILTIN\Administrators in te stellen, kunt u zich op het secundaire knooppunt authenticeren met een lokale Windows -beheerder.

Anders is authenticatie met een lokaal Windows -account op de secundaire server na een failover niet meer mogelijk.

Dat komt doordat de groep BUILTIN\Administrators dezelfde SID heeft op beide knooppunten. Voor andere lokale groepen of lokale gebruikers is authenticatie op het secundaire knooppunt niet mogelijk, omdat de SID's op beide knooppunten verschillen, zelfs als ze dezelfde naam hebben.


![ Stel rollen in in de Milestone Management Client ](/wp-content/uploads/2022/07/milestone-management-server-roles.png)


### 13. Ga naar het bureaublad van knooppunt 2 en stel het virtuele IP-adres in de interne bestanden Milestone in. {#milestone-files-2}


![ Opmerking ](/wp-content/uploads/2022/07/note.png)


Sinds Milestone 2022 R3 is deze stap niet meer nodig en wordt deze in een volgende stap automatisch uitgevoerd met "Server Configurator - Registering servers - http://virtual-IP" ".

Voer in een PowerShell-opdrachtregel als beheerder op knooppunt 2 het volgende script uit:
    
    
    c: /safekit/modules/milestone/bin/UpdateAuthServerUri.ps1


![ Opmerking ](/wp-content/uploads/2022/07/note.png)


Dit script stelt het virtuele IP-adres in op 2 interne Milestone -bestanden:
    
    
    C:\ProgramData\ Milestone \ XProtect Management Server\ ServerConfig.xml
    
    
        <AuthorizationServerUri> /IDP</AuthorizationServerUri> http://** < virtual-ip> **
    
    
    C:\Program Files\ Milestone \ XProtect Management Server\ IIS \IDP\appsettings.json
    
    
        "Autoriteit": " http://** < virtual-ip> ** /IDP

### 14. Registreer op het bureaublad van knooppunt 2 de beheerserver op het virtuele IP-adres {#14-in-the-desktop-of-node-2-register-the-management-server-on-the-vitual-ip-address}

  * Selecteer ** Server Configurator ** in de taakbalk van knooppunt 2 en registreer deze op het virtuele IP-adres (zie afbeelding).
  * Stop vervolgens de beheerserverservice ** en stop de beheerserverservice ** .


![ Waarschuwing ](/wp-content/uploads/2022/07/warning-small.png)


Het account van de gebruiker die de registratie op knooppunt 2 uitvoert, moet de beheerdersrol hebben in Milestone op knooppunt 1.

Als de lokale beheerder op knooppunt 2 de registratie uitvoert, moet de ingebouwde groep Windows `BUILTIN\Administrators` zijn ingesteld in Management Client / Security / Roles bij [ Stap 12 ](#role) . Anders werkt de registratie niet.


![ Opmerking ](/wp-content/uploads/2022/07/note.png)


Deze procedure registreert de beheerserver van knooppunt 2 in de SQL-database (die draait op knooppunt 1) via een verbinding met het virtuele adres.


![ Waarschuwing ](/wp-content/uploads/2022/07/warning-small.png)


Bij een versie van Milestone van vóór 2022 R3 kan de registratie de configuratie van het virtuele IP-adres in de interne Milestone -bestanden hebben verwijderd. Herhaal in dat geval stap 13 [ stap 13 ](#milestone-files-2) .


![ Registreer de beheerserver met Milestone 2020+ ](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 15. Start knooppunt 2 {#15-start-node-2}

  * Start knooppunt 2 via het contextmenu.
  * Wacht op de TWEEDE (groene) status.


![ Opmerking ](/wp-content/uploads/2022/07/note.png)


Knooppunt 2 blijft in de status SECOND (magenta) terwijl de gerepliceerde mappen opnieuw worden gesynchroniseerd (kopie van knooppunt 1 naar knooppunt 2).

Dit kan even duren, afhankelijk van de grootte van de bestanden die in de gerepliceerde mappen moeten worden gesynchroniseerd en de netwerkbandbreedte.

Om de voortgang van het kopiëren te volgen, kunt u het modulelogboek van knooppunt 2 bekijken met de optie 'verbose' ingeschakeld. Vergeet daarbij niet het venster te vernieuwen.


![ Het eerste knooppunt start als primair en wordt ALONE ](/wp-content/uploads/2022/07/appli-11.png)


### 16. Controleer of het cluster operationeel is {#16-verify-that-the-cluster-is-operational}

  * Controleer of het cluster groen/groen is, met services die actief zijn op het PRIM-knooppunt en niet op het SECOND-knooppunt.


In deze modus worden alleen wijzigingen in bestanden in realtime gerepliceerd.


![ Waarschuwing ](/wp-content/uploads/2022/07/warning-small.png)


Componenten die gebruikmaken van services moeten worden geconfigureerd met het virtuele IP-adres. De configuratie kan worden uitgevoerd met een DNS-naam (indien een DNS-naam is aangemaakt en gekoppeld aan het virtuele IP-adres).


![ Het tweede knooppunt begint als SECOND ](/wp-content/uploads/2022/07/appli-12.png)


### 17. Configureer het virtuele IP-adres in de opnameservers {#17-configure-the-virtual-ip-address-in-recording-servers}

  * Installeer de opnameservers en geef daarbij het virtuele IP-adres op in de installatie-URL.
  * Of stel aan de kant van de opnameservers het virtuele IP-adres in de volgende velden in: 
        
        C:\ProgramData\ Milestone \ XProtect Opnameserver\ RecorderConfig.xml
        
            <server> <address>
        
            <server> <authorizationserveraddress>

  * Verbind de Milestone Management Client en de Milestone Smart Client met het virtuele IP-adres.


### 18. De Management Client en Smart Client functioneren niet naar behoren na de node-switch {#18-management-client-and-smart-client-are-not-functioning-properly-after-node-switch}

In een geclusterde XProtect ® Management Server-configuratie vertonen Smart Client en Management Client verschillende problemen na een node-switch. Het probleem houdt verband met tokens die op verschillende nodes worden gegenereerd vóór en na de node-switch, en met problemen bij de toegang tot bepaalde certificaten die nodig zijn voor tokenvalidatie. Er is een oplossing beschikbaar (voor versies 2022 R3 tot en met 2023 R2, zie Milestone KB).

Het probleem is opgelost in Milestone 2023 R3.

### 18. Testen van {#18-testing}

  * Stop het PRIM-knooppunt door in het contextmenu naar beneden te scrollen en op 'Stop' te klikken. ** Gebruik geen swap voor een eerste test ** (zie hieronder waarom).
  * Controleer of er een failover plaatsvindt op het TWEEDE knooppunt, dat ALONE (groen) moet worden.
  * Controleer vervolgens met Microsoft Management Console (MMC) de failover van services (gestopt op knooppunt 1 in het `stop_prim` -script en gestart op knooppunt 2 in het `start_prim` -script).


![ Waarschuwing ](/wp-content/uploads/2022/07/warning-small.png)


Als uw systeem PRIM-SECOND is en alles naar behoren functioneert, stop dan de PRIM-node en controleer of alles correct werkt op node2, die dan ALONE wordt. Als alles in orde is, start dan node1 opnieuw. Hierdoor worden de gerepliceerde mappen van node2 gesynchroniseerd.

Als er iets misgaat, stop dan node2 en forceer de start van node1 als primaire server. Deze zal dan opnieuw opstarten met de lokaal beschikbare, gezonde gegevens op het moment van de stop.

De swap houdt in dat PRIM wordt gestopt en opnieuw gestart, waardoor de gegevens van node2 direct na de stop opnieuw worden gesynchroniseerd. Hierdoor is er geen mogelijkheid tot herstarten met gezonde gegevens als er een probleem is met de replicatieconfiguratie.


![ Waarschuwing ](/wp-content/uploads/2022/07/warning-small.png)


Als de applicatie niet op knooppunt 2 wordt gestart terwijl de status ALONE (groen) is, controleer dan de uitvoerberichten van het `start_prim` -script in het applicatielogboek van knooppunt 2.


![ Waarschuwing ](/wp-content/uploads/2022/07/warning-small.png)


Als ALONE (groen) niet wordt bereikt, analyseer dan de oorzaak met behulp van het modulelogboek van knooppunt 2.


![ Opmerking ](/wp-content/uploads/2022/07/note.png)


Meer informatie over de tests vindt u in de gebruikershandleiding.


![ Stop de module op de PRIM-server ](/wp-content/uploads/2022/07/appli-19.png)