# SafeKit website: new meta descriptions (12 languages)

## Task for GitHub Copilot

This file contains a new `description:` front matter value for each of the 132 pages of the site, in English and in the 11 translated languages (fr, de, es, it, nl, pt-br, pt-pt, ja, ko, zh-hans, ar). The `description` field is used as the HTML meta description of each page.

Apply these values with the script below. **Do not edit the pages by hand, and do not translate, rephrase or "improve" any text in this file.**

1. Save the Python code from the "Apply script" section as `scripts/apply_descriptions.py` (create the file, or replace it if it exists).
2. From the repository root, run a dry run and show me its output:

       python scripts/apply_descriptions.py descriptions-update.md

   (use the actual path of this file if it is not at the repository root)
3. If the dry run reports no error, apply the changes:

       python scripts/apply_descriptions.py descriptions-update.md --write

4. Report the summary printed by the script, without modification (updated, inserted, unchanged, missing files).
5. Do not commit; I will review the diff first.

### Rules the script applies

- `en` → `content/<path>`; any other language → `content/<lang>/<path>`.
- Only the `description:` line of the front matter changes. If a page has none, it is added after the `title:` line.
- Every value is written as `description: "<text>"`. The texts contain no double quote and no backslash.
- Line endings (CRLF or LF) and all other lines stay unchanged.
- A file that does not exist is listed as missing and skipped.

## Apply script

```python
"""Apply the meta descriptions listed in descriptions-update.md to the Hugo pages.

Usage (from the repository root):
    python scripts/apply_descriptions.py descriptions-update.md          # dry run
    python scripts/apply_descriptions.py descriptions-update.md --write  # apply

For each page section "### <path>" and each line "- <lang>: <description>":
  en  -> content/<path>
  xx  -> content/<xx>/<path>
Only the "description:" line of the front matter is replaced (inserted after
"title:" if missing). Line endings (CRLF/LF) and every other line are kept.
"""
import re, sys, pathlib

LANGS = {"en", "fr", "de", "es", "it", "nl", "pt-br", "pt-pt", "ja", "ko", "zh-hans", "ar"}

def parse(md):
    data, page = {}, None
    for line in md.splitlines():
        m = re.match(r"^### (\S+\.md)\s*$", line)
        if m:
            page = m.group(1); data[page] = {}; continue
        m = re.match(r"^- (en|fr|de|es|it|nl|pt-br|pt-pt|ja|ko|zh-hans|ar): (.+?)\s*$", line)
        if m and page:
            data[page][m.group(1)] = m.group(2)
    return data

def update(path, desc, write):
    raw = path.read_bytes().decode("utf-8")
    nl = "\r\n" if "\r\n" in raw else "\n"
    lines = raw.split(nl)
    if not lines or lines[0].strip() != "---":
        return "no front matter"
    try:
        end = next(i for i in range(1, len(lines)) if lines[i].strip() == "---")
    except StopIteration:
        return "front matter not closed"
    new = f'description: "{desc}"'
    idx = next((i for i in range(1, end) if re.match(r"^description\s*:", lines[i])), None)
    if idx is None:
        t = next((i for i in range(1, end) if re.match(r"^title\s*:", lines[i])), 0)
        lines.insert(t + 1, new); status = "inserted"
    elif lines[idx] == new:
        return "unchanged"
    else:
        lines[idx] = new; status = "updated"
    if write:
        path.write_bytes(nl.join(lines).encode("utf-8"))
    return status

def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    write = "--write" in sys.argv
    data = parse(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"))
    root = pathlib.Path("content")
    stats, missing = {}, []
    for page, per_lang in data.items():
        for lang, desc in per_lang.items():
            assert lang in LANGS and '"' not in desc and "\\" not in desc, (page, lang)
            f = root / page if lang == "en" else root / lang / page
            if not f.exists():
                missing.append(str(f)); continue
            s = update(f, desc, write)
            stats[s] = stats.get(s, 0) + 1
    print(("APPLIED" if write else "DRY RUN") + f": {len(data)} pages")
    for k, v in sorted(stats.items()):
        print(f"  {k}: {v}")
    if missing:
        print(f"  missing files: {len(missing)}")
        for m in missing:
            print("    " + m)

if __name__ == "__main__":
    main()
```

## Descriptions

### _index.md

- en: SafeKit high availability software for Windows and Linux: synchronous replication, automatic failover and load balancing on two standard servers, no SAN.
- fr: Logiciel de haute disponibilité SafeKit pour Windows et Linux : réplication synchrone, basculement automatique et équilibrage de charge sur deux serveurs standard, sans SAN.
- de: SafeKit-Hochverfügbarkeitssoftware für Windows und Linux: synchrone Replikation, automatisches Failover und Lastverteilung auf zwei Standardservern, ohne SAN.
- es: Software de alta disponibilidad SafeKit para Windows y Linux: replicación síncrona, conmutación por error automática y equilibrio de carga en dos servidores estándar, sin SAN.
- it: Software di alta disponibilità SafeKit per Windows e Linux: replica sincrona, failover automatico e bilanciamento del carico su due server standard, senza SAN.
- nl: SafeKit-software voor hoge beschikbaarheid op Windows en Linux: synchrone replicatie, automatische failover en loadbalancing op twee standaardservers, zonder SAN.
- pt-br: Software de alta disponibilidade SafeKit para Windows e Linux: replicação síncrona, failover automático e balanceamento de carga em dois servidores padrão, sem SAN.
- pt-pt: Software de alta disponibilidade SafeKit para Windows e Linux: replicação síncrona, failover automático e balanceamento de carga em dois servidores padrão, sem SAN.
- ja: Windows と Linux 向け SafeKit 高可用性ソフトウェア：2 台の標準サーバーで同期レプリケーション、自動フェイルオーバー、負荷分散を実現。SAN 不要です。
- ko: Windows 및 Linux용 SafeKit 고가용성 소프트웨어: SAN 없이 표준 서버 2대에서 동기 복제, 자동 장애 조치, 부하 분산을 제공합니다.
- zh-hans: SafeKit 是适用于 Windows 和 Linux 的高可用性软件：在两台标准服务器上实现同步复制、自动故障转移和负载均衡，无需 SAN。
- ar: برنامج SafeKit للتوفر العالي على Windows و Linux: نسخ متزامن وتجاوز فشل تلقائي وموازنة أحمال على خادمين قياسيين، دون SAN.

### confirmation-safekit.md

- en: Thank you for contacting us about SafeKit. Your request has been sent and the Eviden team will reply soon.
- fr: Merci d’avoir contacté l’équipe SafeKit. Votre demande a bien été envoyée et l’équipe Eviden vous répondra rapidement.
- de: Vielen Dank für Ihre Kontaktaufnahme zu SafeKit. Ihre Anfrage wurde gesendet und das Eviden-Team wird Ihnen in Kürze antworten.
- es: Gracias por contactar con nosotros acerca de SafeKit. Su solicitud se ha enviado y el equipo de Eviden le responderá en breve.
- it: Grazie per averci contattato riguardo a SafeKit. La tua richiesta è stata inviata e il team Eviden ti risponderà a breve.
- nl: Bedankt voor uw bericht over SafeKit. Uw aanvraag is verzonden en het Eviden-team neemt binnenkort contact met u op.
- pt-br: Obrigado por entrar em contato conosco sobre o SafeKit. Sua solicitação foi enviada e a equipe Eviden responderá em breve.
- pt-pt: Obrigado por nos contactar sobre o SafeKit. O seu pedido foi enviado e a equipa Eviden responderá em breve.
- ja: SafeKit についてお問い合わせいただきありがとうございます。リクエストは送信されました。Eviden チームより折り返しご連絡いたします。
- ko: SafeKit에 관해 문의해 주셔서 감사합니다. 요청이 전송되었으며 Eviden 팀이 곧 답변드리겠습니다.
- zh-hans: 感谢您就 SafeKit 与我们联系。您的请求已发送，Eviden 团队将尽快回复。
- ar: شكرًا لتواصلك معنا بشأن SafeKit. تم إرسال طلبك وسيرد عليك فريق Eviden قريبًا.

### contact-marketo.md

- en: Contact form used to send your SafeKit request to the Eviden team.
- fr: Formulaire de contact pour envoyer votre demande SafeKit à l’équipe Eviden.
- de: Kontaktformular, mit dem Sie Ihre SafeKit-Anfrage an das Eviden-Team senden.
- es: Formulario de contacto para enviar su solicitud sobre SafeKit al equipo de Eviden.
- it: Modulo di contatto per inviare la tua richiesta su SafeKit al team Eviden.
- nl: Contactformulier waarmee u uw SafeKit-aanvraag naar het Eviden-team verstuurt.
- pt-br: Formulário de contato usado para enviar sua solicitação sobre o SafeKit à equipe Eviden.
- pt-pt: Formulário de contacto utilizado para enviar o seu pedido sobre o SafeKit à equipa Eviden.
- ja: SafeKit に関するリクエストを Eviden チームに送信するためのお問い合わせフォームです。
- ko: SafeKit 관련 요청을 Eviden 팀에 보내는 문의 양식입니다.
- zh-hans: 用于向 Eviden 团队发送 SafeKit 请求的联系表单。
- ar: نموذج اتصال يُستخدم لإرسال طلبك بشأن SafeKit إلى فريق Eviden.

### contact-safekit.md

- en: Contact the Eviden team about SafeKit high availability software: questions, quotes, partnerships or a demo.
- fr: Contactez l’équipe Eviden au sujet du logiciel de haute disponibilité SafeKit : questions, devis, partenariats ou démonstration.
- de: Kontaktieren Sie das Eviden-Team zur Hochverfügbarkeitssoftware SafeKit: Fragen, Angebote, Partnerschaften oder eine Demo.
- es: Póngase en contacto con el equipo de Eviden sobre el software de alta disponibilidad SafeKit: preguntas, presupuestos, colaboraciones o una demostración.
- it: Contatta il team Eviden sul software di alta disponibilità SafeKit: domande, preventivi, partnership o una demo.
- nl: Neem contact op met het Eviden-team over SafeKit-software voor hoge beschikbaarheid: vragen, offertes, partnerschappen of een demo.
- pt-br: Entre em contato com a equipe Eviden sobre o software de alta disponibilidade SafeKit: dúvidas, orçamentos, parcerias ou uma demonstração.
- pt-pt: Contacte a equipa Eviden sobre o software de alta disponibilidade SafeKit: perguntas, orçamentos, parcerias ou uma demonstração.
- ja: SafeKit 高可用性ソフトウェアについて Eviden チームにお問い合わせください：ご質問、お見積もり、パートナーシップ、デモ。
- ko: SafeKit 고가용성 소프트웨어에 관해 Eviden 팀에 문의하세요: 질문, 견적, 파트너십 또는 데모.
- zh-hans: 就 SafeKit 高可用性软件联系 Eviden 团队：咨询问题、获取报价、洽谈合作或申请演示。
- ar: تواصل مع فريق Eviden بشأن برنامج SafeKit للتوفر العالي: أسئلة أو عروض أسعار أو شراكات أو عرض توضيحي.

### contact-us-for-safekit.md

- en: Contact Eviden about SafeKit high availability software for Windows and Linux: pricing, technical questions, partnerships or a demo.
- fr: Contactez Eviden au sujet du logiciel de haute disponibilité SafeKit pour Windows et Linux : tarifs, questions techniques, partenariats ou démonstration.
- de: Kontaktieren Sie Eviden zur Hochverfügbarkeitssoftware SafeKit für Windows und Linux: Preise, technische Fragen, Partnerschaften oder eine Demo.
- es: Contacte con Eviden sobre el software de alta disponibilidad SafeKit para Windows y Linux: precios, preguntas técnicas, colaboraciones o una demostración.
- it: Contatta Eviden sul software di alta disponibilità SafeKit per Windows e Linux: prezzi, domande tecniche, partnership o una demo.
- nl: Neem contact op met Eviden over SafeKit-software voor hoge beschikbaarheid op Windows en Linux: prijzen, technische vragen, partnerschappen of een demo.
- pt-br: Entre em contato com a Eviden sobre o software de alta disponibilidade SafeKit para Windows e Linux: preços, dúvidas técnicas, parcerias ou uma demonstração.
- pt-pt: Contacte a Eviden sobre o software de alta disponibilidade SafeKit para Windows e Linux: preços, questões técnicas, parcerias ou uma demonstração.
- ja: Windows と Linux 向け SafeKit 高可用性ソフトウェアについて Eviden にお問い合わせください：価格、技術的なご質問、パートナーシップ、デモ。
- ko: Windows 및 Linux용 SafeKit 고가용성 소프트웨어에 관해 Eviden에 문의하세요: 가격, 기술 질문, 파트너십 또는 데모.
- zh-hans: 就适用于 Windows 和 Linux 的 SafeKit 高可用性软件联系 Eviden：价格、技术问题、合作或演示。
- ar: تواصل مع Eviden بشأن برنامج SafeKit للتوفر العالي على Windows و Linux: الأسعار أو الأسئلة التقنية أو الشراكات أو عرض توضيحي.

### safekit-pricing.md

- en: SafeKit pricing: perpetual licences per server, free application modules and no Enterprise editions needed. Request a quote for Windows or Linux clusters.
- fr: Tarifs SafeKit : licences perpétuelles par serveur, modules applicatifs gratuits, aucune édition Enterprise requise. Demandez un devis pour vos clusters Windows ou Linux.
- de: SafeKit-Preise: unbefristete Lizenzen pro Server, kostenlose Anwendungsmodule, keine Enterprise-Editionen nötig. Fordern Sie ein Angebot für Windows- oder Linux-Cluster an.
- es: Precios de SafeKit: licencias perpetuas por servidor, módulos de aplicación gratuitos, sin ediciones Enterprise. Solicite presupuesto para clústeres Windows o Linux.
- it: Prezzi SafeKit: licenze perpetue per server, moduli applicativi gratuiti e nessuna edizione Enterprise necessaria. Richiedi un preventivo per cluster Windows o Linux.
- nl: SafeKit-prijzen: eeuwigdurende licenties per server, gratis applicatiemodules en geen Enterprise-edities nodig. Vraag een offerte aan voor Windows- of Linux-clusters.
- pt-br: Preços do SafeKit: licenças perpétuas por servidor, módulos de aplicação gratuitos sem precisar de edições Enterprise. Solicite um orçamento para clusters Windows ou Linux.
- pt-pt: Preços do SafeKit: licenças perpétuas por servidor, módulos aplicacionais gratuitos e sem necessidade de edições Enterprise. Peça um orçamento para clusters Windows ou Linux.
- ja: SafeKit の価格：サーバー単位の永久ライセンス、無料のアプリケーションモジュール、Enterprise 版不要。Windows または Linux クラスターのお見積もり。
- ko: SafeKit 가격: 서버당 영구 라이선스, 무료 애플리케이션 모듈, Enterprise 에디션 불필요. Windows 또는 Linux 클러스터 견적을 요청하세요.
- zh-hans: SafeKit 定价：按服务器授予永久许可证，应用模块免费，无需企业版。可为 Windows 或 Linux 集群申请报价。
- ar: أسعار SafeKit: تراخيص دائمة لكل خادم، ووحدات تطبيقات مجانية، ولا حاجة إلى إصدارات Enterprise. اطلب عرض سعر لمجموعات Windows أو Linux.

### architectures/_index.md

- en: SafeKit cluster architectures: mirror clusters with real-time replication, farm clusters with load balancing, active-active and N-1 redundancy, with no SAN.
- fr: Architectures de cluster SafeKit : clusters mirror avec réplication en temps réel, clusters farm avec équilibrage de charge, actif-actif et redondance N-1, sans SAN.
- de: SafeKit-Clusterarchitekturen: Mirror-Cluster mit Echtzeit-Replikation, Farm-Cluster mit Lastverteilung, Aktiv-Aktiv und N-1-Redundanz, ohne SAN.
- es: Arquitecturas de clúster SafeKit: clústeres mirror con replicación en tiempo real, clústeres farm con equilibrio de carga, activo-activo y redundancia N-1, sin SAN.
- it: Architetture cluster SafeKit: cluster mirror con replica in tempo reale, cluster farm con bilanciamento del carico, attivo-attivo e ridondanza N-1, senza SAN.
- nl: SafeKit-clusterarchitecturen: mirror-clusters met realtime replicatie, farm-clusters met loadbalancing, actief-actief en N-1-redundantie, zonder SAN.
- pt-br: Arquiteturas de cluster SafeKit: clusters mirror com replicação em tempo real, clusters farm com balanceamento de carga, ativo-ativo e redundância N-1, sem SAN.
- pt-pt: Arquiteturas de cluster SafeKit: clusters mirror com replicação em tempo real, clusters farm com balanceamento de carga, ativo-ativo e redundância N-1, sem SAN.
- ja: SafeKit のクラスターアーキテクチャ：リアルタイムレプリケーションの mirror クラスター、負荷分散の farm クラスター、アクティブ/アクティブ、N-1 冗長化。SAN 不要。
- ko: SafeKit 클러스터 아키텍처: SAN 없이 실시간 복제 기반 mirror 클러스터, 부하 분산 기반 farm 클러스터, 액티브-액티브, N-1 이중화.
- zh-hans: SafeKit 集群架构：实时复制的 mirror 集群、负载均衡的 farm 集群、双活及 N-1 冗余，无需 SAN。
- ar: بنيات مجموعات SafeKit: مجموعات mirror مع النسخ في الوقت الفعلي، ومجموعات farm مع موازنة الأحمال، وبنية نشط-نشط وتكرار N-1، دون SAN.

### architectures/active-active-cluster-real-time-replication.md

- en: Active-active SafeKit cluster: two servers back each other up with several mirror modules, synchronous replication and mutual failover on Windows and Linux.
- fr: Cluster SafeKit actif-actif : deux serveurs se secourent mutuellement avec plusieurs modules mirror, réplication synchrone et basculement croisé sous Windows et Linux.
- de: Aktiv-Aktiv-SafeKit-Cluster: Zwei Server sichern sich mit mehreren Mirror-Modulen gegenseitig ab, synchrone Replikation und gegenseitiges Failover unter Windows und Linux.
- es: Clúster SafeKit activo-activo: dos servidores se respaldan mutuamente con varios módulos mirror, replicación síncrona y conmutación por error mutua en Windows y Linux.
- it: Cluster SafeKit attivo-attivo: due server si proteggono a vicenda con più moduli mirror, replica sincrona e failover reciproco su Windows e Linux.
- nl: Actief-actief SafeKit-cluster: twee servers vormen elkaars back-up met meerdere mirror-modules, synchrone replicatie en wederzijdse failover op Windows en Linux.
- pt-br: Cluster SafeKit ativo-ativo: dois servidores se protegem mutuamente com vários módulos mirror, replicação síncrona e failover mútuo no Windows e Linux.
- pt-pt: Cluster SafeKit ativo-ativo: dois servidores protegem-se mutuamente com vários módulos mirror, replicação síncrona e failover mútuo em Windows e Linux.
- ja: アクティブ/アクティブ SafeKit クラスター：複数の mirror モジュールと同期レプリケーションで 2 台が相互にバックアップ。Windows と Linux 対応。
- ko: 액티브-액티브 SafeKit 클러스터: Windows 및 Linux에서 여러 mirror 모듈, 동기 복제, 상호 장애 조치로 두 서버가 서로를 백업합니다.
- zh-hans: 双活 SafeKit 集群：两台服务器通过多个 mirror 模块互为备份，在 Windows 和 Linux 上实现同步复制与相互故障转移。
- ar: مجموعة SafeKit نشط-نشط: خادمان يدعم كل منهما الآخر بعدة وحدات mirror، مع نسخ متزامن وتجاوز فشل متبادل على Windows و Linux.

### architectures/clustering-software-load-balancing-mirroring.md

- en: Combine SafeKit farm and mirror modules: load balancing scales the front end while synchronous replication protects back-end data, on Windows and Linux.
- fr: Combinez modules farm et mirror SafeKit : l’équilibrage de charge fait évoluer le front-end, la réplication synchrone protège les données du back-end, sous Windows et Linux.
- de: Kombinieren Sie SafeKit-Farm- und Mirror-Module: Lastverteilung skaliert das Front-End, synchrone Replikation schützt die Back-End-Daten, unter Windows und Linux.
- es: Combine los módulos farm y mirror de SafeKit: el equilibrio de carga escala el front-end y la replicación síncrona protege los datos del back-end, en Windows y Linux.
- it: Combina moduli farm e mirror SafeKit: il bilanciamento del carico scala il front-end mentre la replica sincrona protegge i dati del back-end, su Windows e Linux.
- nl: Combineer SafeKit farm- en mirror-modules: loadbalancing schaalt de front-end, terwijl synchrone replicatie de back-endgegevens beschermt, op Windows en Linux.
- pt-br: Combine módulos farm e mirror do SafeKit: o balanceamento de carga escala o front-end e a replicação síncrona protege os dados do back-end, no Windows e Linux.
- pt-pt: Combine módulos farm e mirror SafeKit: o balanceamento de carga escala o front-end e a replicação síncrona protege os dados do back-end, em Windows e Linux.
- ja: SafeKit の farm と mirror を併用：負荷分散でフロントエンドを拡張し、同期レプリケーションでバックエンドデータを保護。Windows と Linux 対応。
- ko: SafeKit farm 및 mirror 모듈 결합: Windows 및 Linux에서 부하 분산은 프런트엔드를 확장하고 동기 복제는 백엔드 데이터를 보호합니다.
- zh-hans: 组合 SafeKit farm 与 mirror 模块：负载均衡扩展前端，同步复制保护后端数据，适用于 Windows 和 Linux。
- ar: الجمع بين وحدات SafeKit farm و mirror: موازنة الأحمال توسّع الواجهة الأمامية بينما يحمي النسخ المتزامن بيانات الواجهة الخلفية، على Windows و Linux.

### architectures/file-replication-byte-level-with-failover-mirror-cluster.md

- en: SafeKit mirror cluster: byte-level synchronous file replication and automatic failover between two Windows or Linux servers, with no data loss and no SAN.
- fr: Cluster mirror SafeKit : réplication synchrone de fichiers au niveau de l’octet et basculement automatique entre deux serveurs Windows ou Linux, sans perte de données ni SAN.
- de: SafeKit-Mirror-Cluster: synchrone Dateireplikation auf Byte-Ebene und automatisches Failover zwischen zwei Windows- oder Linux-Servern, ohne Datenverlust und ohne SAN.
- es: Clúster mirror SafeKit: replicación síncrona de archivos a nivel de byte y conmutación por error automática entre dos servidores Windows o Linux, sin pérdida de datos ni SAN.
- it: Cluster mirror SafeKit: replica sincrona dei file a livello di byte e failover automatico tra due server Windows o Linux, senza perdita di dati e senza SAN.
- nl: SafeKit mirror-cluster: synchrone bestandsreplicatie op byteniveau en automatische failover tussen twee Windows- of Linux-servers, zonder gegevensverlies en zonder SAN.
- pt-br: Cluster mirror SafeKit: replicação síncrona de arquivos em nível de byte e failover automático entre dois servidores Windows ou Linux, sem perda de dados e sem SAN.
- pt-pt: Cluster mirror SafeKit: replicação síncrona de ficheiros ao nível do byte e failover automático entre dois servidores Windows ou Linux, sem perda de dados e sem SAN.
- ja: SafeKit mirror クラスター：Windows または Linux サーバー 2 台間のバイトレベル同期ファイル複製と自動フェイルオーバー。データ損失なし、SAN 不要。
- ko: SafeKit mirror 클러스터: 데이터 손실과 SAN 없이 Windows 또는 Linux 서버 2대 간 바이트 수준 동기 파일 복제 및 자동 장애 조치.
- zh-hans: SafeKit mirror 集群：在两台 Windows 或 Linux 服务器间进行字节级同步文件复制和自动故障转移，零数据丢失，无需 SAN。
- ar: مجموعة SafeKit mirror: نسخ متزامن للملفات على مستوى البايت وتجاوز فشل تلقائي بين خادمين Windows أو Linux، دون فقدان للبيانات ودون SAN.

### architectures/n-1-redundancy.md

- en: N-1 redundancy with SafeKit: N applications on N+1 servers share a single backup server, with real-time replication and automatic failover, without a SAN.
- fr: Redondance N-1 avec SafeKit : N applications sur N+1 serveurs partagent un seul serveur de secours, avec réplication en temps réel et basculement automatique, sans SAN.
- de: N-1-Redundanz mit SafeKit: N Anwendungen auf N+1 Servern teilen sich einen einzigen Backup-Server, mit Echtzeit-Replikation und automatischem Failover, ohne SAN.
- es: Redundancia N-1 con SafeKit: N aplicaciones en N+1 servidores comparten un único servidor de respaldo, con replicación en tiempo real y conmutación automática, sin SAN.
- it: Ridondanza N-1 con SafeKit: N applicazioni su N+1 server condividono un unico server di backup, con replica in tempo reale e failover automatico, senza SAN.
- nl: N-1-redundantie met SafeKit: N applicaties op N+1 servers delen één back-upserver, met realtime replicatie en automatische failover, zonder SAN.
- pt-br: Redundância N-1 com SafeKit: N aplicações em N+1 servidores compartilham um único servidor de backup, com replicação em tempo real e failover automático, sem SAN.
- pt-pt: Redundância N-1 com SafeKit: N aplicações em N+1 servidores partilham um único servidor de backup, com replicação em tempo real e failover automático, sem SAN.
- ja: SafeKit の N-1 冗長化：N+1 台のサーバー上の N 個のアプリケーションが 1 台のバックアップサーバーを共有。リアルタイムレプリケーションと自動フェイルオーバー、SAN 不要。
- ko: SafeKit N-1 이중화: N+1대 서버의 N개 애플리케이션이 단일 백업 서버를 공유하며, SAN 없이 실시간 복제와 자동 장애 조치를 제공합니다.
- zh-hans: SafeKit 的 N-1 冗余：N+1 台服务器上的 N 个应用共享一台备用服务器，实时复制并自动故障转移，无需 SAN。
- ar: تكرار N-1 مع SafeKit: يتشارك N تطبيقًا على N+1 خادمًا خادمًا احتياطيًا واحدًا، مع نسخ في الوقت الفعلي وتجاوز فشل تلقائي، دون SAN.

### architectures/network-load-balancing-cluster.md

- en: SafeKit farm cluster: network load balancing on a virtual IP with automatic failover between Windows or Linux servers, with no hardware load balancer.
- fr: Cluster farm SafeKit : équilibrage de charge réseau sur une IP virtuelle avec basculement automatique entre serveurs Windows ou Linux, sans équilibreur de charge matériel.
- de: SafeKit-Farm-Cluster: Netzwerk-Lastverteilung auf einer virtuellen IP mit automatischem Failover zwischen Windows- oder Linux-Servern, ohne Hardware-Load-Balancer.
- es: Clúster farm SafeKit: equilibrio de carga de red en una IP virtual con conmutación por error automática entre servidores Windows o Linux, sin balanceador de carga de hardware.
- it: Cluster farm SafeKit: bilanciamento del carico di rete su un IP virtuale con failover automatico tra server Windows o Linux, senza bilanciatore hardware.
- nl: SafeKit farm-cluster: netwerkloadbalancing op een virtueel IP-adres met automatische failover tussen Windows- of Linux-servers, zonder hardwarematige load balancer.
- pt-br: Cluster farm SafeKit: balanceamento de carga de rede em um IP virtual com failover automático entre servidores Windows ou Linux, sem balanceador de carga de hardware.
- pt-pt: Cluster farm SafeKit: balanceamento de carga de rede num IP virtual com failover automático entre servidores Windows ou Linux, sem balanceador de carga físico.
- ja: SafeKit farm クラスター：Windows または Linux サーバー間で仮想 IP によるネットワーク負荷分散と自動フェイルオーバー。ハードウェア負荷分散装置不要。
- ko: SafeKit farm 클러스터: 하드웨어 부하 분산 장치 없이 Windows 또는 Linux 서버 간 가상 IP 기반 네트워크 부하 분산 및 자동 장애 조치.
- zh-hans: SafeKit farm 集群：基于虚拟 IP 的网络负载均衡，在 Windows 或 Linux 服务器间自动故障转移，无需硬件负载均衡器。
- ar: مجموعة SafeKit farm: موازنة أحمال الشبكة على عنوان IP افتراضي مع تجاوز فشل تلقائي بين خوادم Windows أو Linux، دون موازن أحمال مادي.

### architectures/safekit-smart-console-your-high-availability-cluster-in-your-pocket.md

- en: SafeKit Smart Console: configure and monitor your high availability clusters from a browser or a smartphone, with no code and with real-time notifications.
- fr: SafeKit Smart Console : configurez et supervisez vos clusters de haute disponibilité depuis un navigateur ou un smartphone, sans code et avec des notifications en temps réel.
- de: SafeKit Smart Console: Konfigurieren und überwachen Sie Ihre Hochverfügbarkeitscluster im Browser oder auf dem Smartphone, ohne Code und mit Echtzeit-Benachrichtigungen.
- es: SafeKit Smart Console: configure y supervise sus clústeres de alta disponibilidad desde un navegador o un smartphone, sin código y con notificaciones en tiempo real.
- it: SafeKit Smart Console: configura e monitora i tuoi cluster ad alta disponibilità da browser o smartphone, senza codice e con notifiche in tempo reale.
- nl: SafeKit Smart Console: configureer en bewaak uw clusters voor hoge beschikbaarheid vanuit een browser of smartphone, zonder code en met realtime meldingen.
- pt-br: SafeKit Smart Console: configure e monitore seus clusters de alta disponibilidade pelo navegador ou smartphone, sem código e com notificações em tempo real.
- pt-pt: SafeKit Smart Console: configure e monitorize os seus clusters de alta disponibilidade a partir de um browser ou smartphone, sem código e com notificações em tempo real.
- ja: SafeKit Smart Console：ブラウザーやスマートフォンから高可用性クラスターをコード不要で設定・監視。リアルタイム通知にも対応します。
- ko: SafeKit Smart Console: 코드 없이 브라우저나 스마트폰에서 고가용성 클러스터를 구성하고 모니터링하며 실시간 알림을 받습니다.
- zh-hans: SafeKit Smart Console：通过浏览器或智能手机配置和监控高可用性集群，无需编写代码，并提供实时通知。
- ar: SafeKit Smart Console: اضبط مجموعات التوفر العالي وراقبها من متصفح أو هاتف ذكي، دون برمجة ومع إشعارات في الوقت الفعلي.

### best-practises/_index.md

- en: High availability best practices: HA architectures, synchronous and asynchronous replication, virtual IP failover, quorum, RPO and RTO, explained with SafeKit.
- fr: Bonnes pratiques de haute disponibilité : architectures HA, réplication synchrone et asynchrone, basculement d’IP virtuelle, quorum, RPO et RTO, expliqués avec SafeKit.
- de: Best Practices für Hochverfügbarkeit: HA-Architekturen, synchrone und asynchrone Replikation, Failover der virtuellen IP, Quorum, RPO und RTO, erklärt mit SafeKit.
- es: Buenas prácticas de alta disponibilidad: arquitecturas HA, replicación síncrona y asíncrona, conmutación de IP virtual, quórum, RPO y RTO, explicados con SafeKit.
- it: Best practice di alta disponibilità: architetture HA, replica sincrona e asincrona, failover dell’IP virtuale, quorum, RPO e RTO, spiegati con SafeKit.
- nl: Best practices voor hoge beschikbaarheid: HA-architecturen, synchrone en asynchrone replicatie, failover van virtuele IP-adressen, quorum, RPO en RTO, uitgelegd met SafeKit.
- pt-br: Boas práticas de alta disponibilidade: arquiteturas HA, replicação síncrona e assíncrona, failover de IP virtual, quórum, RPO e RTO, explicados com o SafeKit.
- pt-pt: Boas práticas de alta disponibilidade: arquiteturas HA, replicação síncrona e assíncrona, failover de IP virtual, quórum, RPO e RTO, explicados com o SafeKit.
- ja: 高可用性のベストプラクティス：HA アーキテクチャ、同期・非同期レプリケーション、仮想 IP フェイルオーバー、クォーラム、RPO と RTO を SafeKit で解説します。
- ko: 고가용성 모범 사례: HA 아키텍처, 동기 및 비동기 복제, 가상 IP 장애 조치, 쿼럼, RPO와 RTO를 SafeKit으로 설명합니다.
- zh-hans: 高可用性最佳实践：HA 架构、同步与异步复制、虚拟 IP 故障转移、仲裁、RPO 和 RTO，结合 SafeKit 讲解。
- ar: أفضل ممارسات التوفر العالي: بنيات HA، والنسخ المتزامن وغير المتزامن، وتجاوز فشل IP الافتراضي، والنصاب، و RPO و RTO، مشروحة مع SafeKit.

### best-practises/alternative-always-on-sql-server-express-standard-editions.md

- en: An alternative to SQL Server Always On for Express and Standard editions: SafeKit adds synchronous replication and failover, with no SAN or Active Directory.
- fr: Alternative à SQL Server Always On pour les éditions Express et Standard : SafeKit ajoute réplication synchrone et basculement, sans SAN ni Active Directory.
- de: Eine Alternative zu SQL Server Always On für Express- und Standard-Editionen: SafeKit ergänzt synchrone Replikation und Failover, ohne SAN oder Active Directory.
- es: Una alternativa a SQL Server Always On para las ediciones Express y Standard: SafeKit añade replicación síncrona y conmutación por error, sin SAN ni Active Directory.
- it: Un’alternativa a SQL Server Always On per le edizioni Express e Standard: SafeKit aggiunge replica sincrona e failover, senza SAN né Active Directory.
- nl: Een alternatief voor SQL Server Always On voor Express- en Standard-edities: SafeKit voegt synchrone replicatie en failover toe, zonder SAN of Active Directory.
- pt-br: Uma alternativa ao SQL Server Always On para as edições Express e Standard: o SafeKit adiciona replicação síncrona e failover, sem SAN nem Active Directory.
- pt-pt: Uma alternativa ao SQL Server Always On para as edições Express e Standard: o SafeKit adiciona replicação síncrona e failover, sem SAN nem Active Directory.
- ja: Express・Standard 版向けの SQL Server Always On 代替：SafeKit で同期レプリケーションとフェイルオーバーを追加。SAN・AD 不要。
- ko: Express 및 Standard 에디션을 위한 SQL Server Always On 대안: SafeKit은 SAN이나 Active Directory 없이 동기 복제와 장애 조치를 추가합니다.
- zh-hans: SQL Server Express 和 Standard 版的 Always On 替代方案：SafeKit 同步复制和故障转移，无需 SAN 或 AD。
- ar: بديل لـ SQL Server Always On لإصداري Express و Standard: يضيف SafeKit النسخ المتزامن وتجاوز الفشل، دون SAN أو Active Directory.

### best-practises/byte-level-file-replication-vs-block-level-disk-replication.md

- en: Byte-level file replication vs block-level disk replication: how SafeKit replicates only changed data in files for zero data loss and fast failover.
- fr: Réplication de fichiers au niveau octet vs de disque au niveau bloc : SafeKit ne réplique que les données modifiées des fichiers : zéro perte de données et basculement rapide.
- de: Dateireplikation auf Byte-Ebene vs. Festplattenreplikation auf Blockebene: Wie SafeKit nur geänderte Daten in Dateien repliziert, für null Datenverlust und schnelles Failover.
- es: Replicación de archivos por bytes frente a replicación de discos por bloques: cómo SafeKit replica solo los datos modificados, sin pérdida de datos y con conmutación rápida.
- it: Replica di file a livello di byte o di dischi a livello di blocco: come SafeKit replica solo i dati modificati nei file per zero perdita di dati e failover rapido.
- nl: Bestandsreplicatie op byteniveau vs. schijfreplicatie op blokniveau: hoe SafeKit alleen gewijzigde data in bestanden repliceert, zonder dataverlies en met snelle failover.
- pt-br: Replicação de arquivos em nível de byte vs replicação de disco em nível de bloco: como o SafeKit replica só os dados alterados para zero perda de dados e failover rápido.
- pt-pt: Replicação de ficheiros ao nível do byte vs replicação de disco ao nível do bloco: como o SafeKit replica só os dados alterados, sem perda de dados e com failover rápido.
- ja: バイトレベルのファイルレプリケーションとブロックレベルのディスクレプリケーション：SafeKit はファイル内の変更データのみを複製し、データ損失ゼロと高速フェイルオーバーを実現。
- ko: 바이트 수준 파일 복제와 블록 수준 디스크 복제 비교: SafeKit이 파일의 변경 데이터만 복제해 데이터 손실 제로와 빠른 장애 조치를 실현하는 방법.
- zh-hans: 字节级文件复制与块级磁盘复制对比：SafeKit 如何仅复制文件中变更的数据，实现零数据丢失和快速故障转移。
- ar: نسخ الملفات على مستوى البايت مقابل نسخ الأقراص على مستوى الكتل: كيف ينسخ SafeKit البيانات المعدلة فقط في الملفات لصفر فقدان للبيانات وتجاوز فشل سريع.

### best-practises/clustering-software-vs-hardware-clustering.md

- en: Software clustering vs hardware clustering: why SafeKit provides high availability on standard servers with no SAN, no load balancer appliance and no HA expert.
- fr: Clustering logiciel vs clustering matériel : pourquoi SafeKit assure la haute disponibilité sur serveurs standard, sans SAN, ni boîtier d’équilibrage de charge, ni expert HA.
- de: Software- vs. Hardware-Clustering: Warum SafeKit Hochverfügbarkeit auf Standardservern bietet, ohne SAN, ohne Load-Balancer-Appliance und ohne HA-Experten.
- es: Clustering de software frente a clustering de hardware: por qué SafeKit ofrece alta disponibilidad en servidores estándar sin SAN, sin appliance de balanceo ni experto en HA.
- it: Clustering software o hardware: perché SafeKit offre alta disponibilità su server standard senza SAN, senza appliance di bilanciamento e senza esperti HA.
- nl: Softwareclustering vs. hardwareclustering: waarom SafeKit hoge beschikbaarheid biedt op standaardservers zonder SAN, zonder load balancer-appliance en zonder HA-expert.
- pt-br: Clustering de software vs clustering de hardware: por que o SafeKit garante alta disponibilidade em servidores padrão sem SAN, appliance de balanceamento ou especialista HA.
- pt-pt: Clustering de software vs clustering de hardware: porque o SafeKit oferece alta disponibilidade em servidores padrão sem SAN, sem appliance de balanceamento nem perito HA.
- ja: ソフトウェアクラスタリングとハードウェアクラスタリングの比較：SafeKit が SAN、ロードバランサー機器、HA 専門家なしで標準サーバーに高可用性を提供する理由。
- ko: 소프트웨어 클러스터링과 하드웨어 클러스터링 비교: SafeKit이 SAN, 부하 분산 어플라이언스, HA 전문가 없이 표준 서버에서 고가용성을 제공하는 이유.
- zh-hans: 软件集群与硬件集群对比：为何 SafeKit 能在标准服务器上提供高可用性，无需 SAN、负载均衡设备或 HA 专家。
- ar: التجميع البرمجي مقابل التجميع المادي: لماذا يوفر SafeKit التوفر العالي على خوادم قياسية دون SAN ودون جهاز موازنة أحمال ودون خبير HA.

### best-practises/data-replication-techniques.md

- en: Data replication techniques compared at database, disk and file level, and how SafeKit provides synchronous replication and failover without shared storage.
- fr: Techniques de réplication comparées au niveau base de données, disque et fichier, et comment SafeKit assure réplication synchrone et basculement sans stockage partagé.
- de: Datenreplikationstechniken auf Datenbank-, Festplatten- und Dateiebene im Vergleich, und wie SafeKit synchrone Replikation und Failover ohne gemeinsamen Speicher bietet.
- es: Técnicas de replicación de datos a nivel de base de datos, disco y archivo comparadas, y cómo SafeKit ofrece replicación síncrona y conmutación sin almacenamiento compartido.
- it: Tecniche di replica dei dati a confronto a livello di database, disco e file, e come SafeKit offre replica sincrona e failover senza storage condiviso.
- nl: Technieken voor gegevensreplicatie vergeleken op database-, schijf- en bestandsniveau, en hoe SafeKit synchrone replicatie en failover biedt zonder gedeelde opslag.
- pt-br: Técnicas de replicação de dados em nível de banco de dados, disco e arquivo, e como o SafeKit oferece replicação síncrona e failover sem armazenamento compartilhado.
- pt-pt: Técnicas de replicação de dados comparadas ao nível de base de dados, disco e ficheiro, e como o SafeKit oferece replicação síncrona e failover sem armazenamento partilhado.
- ja: データベース、ディスク、ファイルレベルのデータレプリケーション技術を比較し、SafeKit が共有ストレージなしで同期レプリケーションとフェイルオーバーを実現する方法を解説。
- ko: 데이터베이스, 디스크, 파일 수준의 데이터 복제 기술 비교와 SafeKit이 공유 스토리지 없이 동기 복제 및 장애 조치를 제공하는 방법.
- zh-hans: 比较数据库级、磁盘级和文件级数据复制技术，以及 SafeKit 如何在无共享存储的情况下实现同步复制和故障转移。
- ar: مقارنة تقنيات نسخ البيانات على مستوى قاعدة البيانات والقرص والملف، وكيف يوفر SafeKit النسخ المتزامن وتجاوز الفشل دون تخزين مشترك.

### best-practises/heartbeat-failover-quorum-windows-linux-cluster.md

- en: How heartbeat, failover and quorum work in Windows and Linux clusters, and how SafeKit avoids split brain without a quorum disk or a third server.
- fr: Heartbeat, basculement et quorum dans les clusters Windows et Linux, et comment SafeKit évite le split brain sans disque de quorum ni troisième serveur.
- de: Wie Heartbeat, Failover und Quorum in Windows- und Linux-Clustern funktionieren und wie SafeKit Split-Brain ohne Quorum-Disk oder dritten Server vermeidet.
- es: Cómo funcionan el heartbeat, la conmutación por error y el quórum en clústeres Windows y Linux, y cómo SafeKit evita el split brain sin disco de quórum ni tercer servidor.
- it: Come funzionano heartbeat, failover e quorum nei cluster Windows e Linux, e come SafeKit evita lo split brain senza disco di quorum né terzo server.
- nl: Hoe heartbeat, failover en quorum werken in Windows- en Linux-clusters, en hoe SafeKit split brain voorkomt zonder quorumschijf of derde server.
- pt-br: Como funcionam heartbeat, failover e quórum em clusters Windows e Linux, e como o SafeKit evita o split brain sem disco de quórum nem terceiro servidor.
- pt-pt: Como funcionam o heartbeat, o failover e o quórum em clusters Windows e Linux, e como o SafeKit evita o split brain sem disco de quórum nem terceiro servidor.
- ja: Windows と Linux クラスターのハートビート、フェイルオーバー、クォーラム。SafeKit はクォーラムディスクや第 3 サーバーなしでスプリットブレインを回避。
- ko: Windows 및 Linux 클러스터에서 하트비트, 장애 조치, 쿼럼의 작동 방식과 SafeKit이 쿼럼 디스크나 제3 서버 없이 스플릿 브레인을 방지하는 방법.
- zh-hans: Windows 和 Linux 集群中心跳、故障转移和仲裁的工作原理，以及 SafeKit 如何在无仲裁磁盘或第三台服务器的情况下避免脑裂。
- ar: كيف تعمل نبضة heartbeat وتجاوز الفشل والنصاب في مجموعات Windows و Linux، وكيف يتجنب SafeKit حالة split-brain دون قرص نصاب أو خادم ثالث.

### best-practises/high-availability-architectures-and-best-practices.md

- en: High availability architectures and best practices for application clustering: mirror and farm clusters, replication and failover, with SafeKit examples.
- fr: Architectures de haute disponibilité et bonnes pratiques du clustering applicatif : clusters mirror et farm, réplication et basculement, avec des exemples SafeKit.
- de: Hochverfügbarkeitsarchitekturen und Best Practices für Anwendungscluster: Mirror- und Farm-Cluster, Replikation und Failover, mit Beispielen aus SafeKit.
- es: Arquitecturas y buenas prácticas de alta disponibilidad para el clustering de aplicaciones: clústeres mirror y farm, replicación y conmutación por error, con ejemplos SafeKit.
- it: Architetture e best practice di alta disponibilità per il clustering applicativo: cluster mirror e farm, replica e failover, con esempi SafeKit.
- nl: Architecturen en best practices voor hoge beschikbaarheid bij applicatieclustering: mirror- en farm-clusters, replicatie en failover, met voorbeelden van SafeKit.
- pt-br: Arquiteturas e boas práticas de alta disponibilidade para clustering de aplicações: clusters mirror e farm, replicação e failover, com exemplos do SafeKit.
- pt-pt: Arquiteturas e boas práticas de alta disponibilidade para clustering de aplicações: clusters mirror e farm, replicação e failover, com exemplos SafeKit.
- ja: アプリケーションクラスタリングの高可用性アーキテクチャとベストプラクティス：mirror・farm クラスター、レプリケーション、フェイルオーバーを SafeKit の例で解説。
- ko: 애플리케이션 클러스터링을 위한 고가용성 아키텍처와 모범 사례: mirror 및 farm 클러스터, 복제와 장애 조치를 SafeKit 예시로 설명합니다.
- zh-hans: 应用集群的高可用性架构与最佳实践：mirror 和 farm 集群、复制与故障转移，附 SafeKit 示例。
- ar: بنيات التوفر العالي وأفضل الممارسات لتجميع التطبيقات: مجموعات mirror و farm، والنسخ وتجاوز الفشل، مع أمثلة من SafeKit.

### best-practises/high-availability-cluster-vs-fault-tolerant-system.md

- en: HA cluster vs fault-tolerant system: compare costs, recovery and protection against software failures, and see how SafeKit works on standard servers.
- fr: Cluster HA vs système tolérant aux pannes : comparez coûts, reprise et protection contre les pannes logicielles, et découvrez SafeKit sur des serveurs standard.
- de: HA-Cluster vs. fehlertolerantes System: Vergleichen Sie Kosten, Wiederherstellung und Schutz vor Softwarefehlern und sehen Sie, wie SafeKit auf Standardservern arbeitet.
- es: Clúster HA frente a sistema tolerante a fallos: compare costes, recuperación y protección ante fallos de software, y vea cómo funciona SafeKit en servidores estándar.
- it: Cluster HA o sistema fault-tolerant: confronta costi, ripristino e protezione dai guasti software, e scopri come SafeKit funziona su server standard.
- nl: HA-cluster vs. fouttolerant systeem: vergelijk kosten, herstel en bescherming tegen softwarestoringen, en ontdek hoe SafeKit werkt op standaardservers.
- pt-br: Cluster HA vs sistema tolerante a falhas: compare custos, recuperação e proteção contra falhas de software, e veja como o SafeKit funciona em servidores padrão.
- pt-pt: Cluster HA vs sistema tolerante a falhas: compare custos, recuperação e proteção contra falhas de software, e veja como o SafeKit funciona em servidores padrão.
- ja: HA クラスターとフォールトトレラントシステムの比較：コスト、復旧、ソフトウェア障害への保護を比べ、標準サーバーで動作する SafeKit の仕組みを紹介します。
- ko: HA 클러스터와 내결함성 시스템 비교: 비용, 복구, 소프트웨어 장애 대비 보호를 비교하고 SafeKit이 표준 서버에서 작동하는 방식을 알아보세요.
- zh-hans: HA 集群与容错系统对比：成本、恢复能力及软件故障防护，了解 SafeKit 如何在标准服务器上运行。
- ar: مجموعة HA مقابل نظام متحمل للأعطال: قارن التكاليف والاستعادة والحماية من أعطال البرمجيات، واكتشف كيف يعمل SafeKit على خوادم قياسية.

### best-practises/high-availability-disaster-recovery-hadr.md

- en: Combine SafeKit high availability (synchronous replication, RPO 0) with asynchronous backups for off-site disaster recovery on Windows and Linux.
- fr: Combinez la haute disponibilité SafeKit (réplication synchrone, RPO 0) et des sauvegardes asynchrones pour une reprise après sinistre hors site sous Windows et Linux.
- de: Kombinieren Sie SafeKit-Hochverfügbarkeit (synchrone Replikation, RPO 0) mit asynchronen Backups für externes Disaster Recovery unter Windows und Linux.
- es: Combine la alta disponibilidad de SafeKit (replicación síncrona, RPO 0) con copias de seguridad asíncronas para la recuperación ante desastres externa en Windows y Linux.
- it: Combina l’alta disponibilità SafeKit (replica sincrona, RPO 0) con backup asincroni per il disaster recovery off-site su Windows e Linux.
- nl: Combineer hoge beschikbaarheid van SafeKit (synchrone replicatie, RPO 0) met asynchrone back-ups voor disaster recovery op een externe locatie, op Windows en Linux.
- pt-br: Combine a alta disponibilidade do SafeKit (replicação síncrona, RPO 0) com backups assíncronos para recuperação de desastres externa no Windows e Linux.
- pt-pt: Combine a alta disponibilidade SafeKit (replicação síncrona, RPO 0) com backups assíncronos para recuperação de desastres fora do local em Windows e Linux.
- ja: SafeKit の高可用性（同期レプリケーション、RPO 0）と非同期バックアップを組み合わせ、Windows と Linux でオフサイトの災害復旧を実現。
- ko: Windows 및 Linux에서 SafeKit 고가용성(동기 복제, RPO 0)과 원격지 재해 복구용 비동기 백업을 결합하세요.
- zh-hans: 将 SafeKit 高可用性（同步复制，RPO 0）与异步备份结合，在 Windows 和 Linux 上实现异地灾难恢复。
- ar: اجمع بين التوفر العالي في SafeKit (نسخ متزامن، RPO 0) والنسخ الاحتياطية غير المتزامنة للتعافي من الكوارث خارج الموقع على Windows و Linux.

### best-practises/how-a-virtual-ip-address-works.md

- en: How a virtual IP address moves during failover: gratuitous ARP in one subnet, or a load balancer, cloud routes or BGP across subnets, explained with SafeKit.
- fr: Comment une IP virtuelle bascule : ARP gratuit dans un même sous-réseau, ou équilibreur de charge, routes cloud ou BGP entre sous-réseaux, expliqué avec SafeKit.
- de: Wie eine virtuelle IP beim Failover wechselt: Gratuitous ARP im selben Subnetz oder Load Balancer, Cloud-Routen oder BGP über Subnetze hinweg, erklärt mit SafeKit.
- es: Cómo se mueve una IP virtual en la conmutación por error: ARP gratuito en una subred, o balanceador de carga, rutas cloud o BGP entre subredes, explicado con SafeKit.
- it: Come si sposta un IP virtuale durante il failover: ARP gratuito nella stessa sottorete, oppure load balancer, route cloud o BGP tra sottoreti, spiegato con SafeKit.
- nl: Hoe een virtueel IP-adres verhuist bij failover: gratuitous ARP binnen één subnet, of een load balancer, cloudroutes of BGP over subnetten heen, uitgelegd met SafeKit.
- pt-br: Como um IP virtual se move no failover: ARP gratuito em uma sub-rede, ou balanceador de carga, rotas de nuvem ou BGP entre sub-redes, explicado com o SafeKit.
- pt-pt: Como um endereço IP virtual se desloca no failover: ARP gratuito numa sub-rede, ou balanceador de carga, rotas cloud ou BGP entre sub-redes, explicado com o SafeKit.
- ja: フェイルオーバー時の仮想 IP の移動：同一サブネットでは Gratuitous ARP、サブネット間ではロードバランサー、クラウドルート、BGP。SafeKit で解説。
- ko: 장애 조치 시 가상 IP 주소의 이동 방식: 단일 서브넷에서는 Gratuitous ARP, 서브넷 간에는 부하 분산 장치, 클라우드 라우트 또는 BGP. SafeKit으로 설명합니다.
- zh-hans: 故障转移时虚拟 IP 地址如何切换：同一子网内用免费 ARP，跨子网用负载均衡器、云路由或 BGP，结合 SafeKit 讲解。
- ar: كيف ينتقل عنوان IP الافتراضي أثناء تجاوز الفشل: ARP المجاني في شبكة فرعية واحدة، أو موازن أحمال أو مسارات سحابية أو BGP عبر الشبكات الفرعية، مع SafeKit.

### best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux.md

- en: How to implement redundant servers with software only: SafeKit provides real-time replication and automatic failover on Windows and Linux, with no shared disk.
- fr: Serveurs redondants par le seul logiciel : SafeKit assure réplication en temps réel et basculement automatique sous Windows et Linux, sans disque partagé.
- de: Redundante Server nur mit Software umsetzen: SafeKit bietet Echtzeit-Replikation und automatisches Failover unter Windows und Linux, ohne gemeinsame Festplatte.
- es: Cómo implementar servidores redundantes solo con software: SafeKit ofrece replicación en tiempo real y conmutación automática en Windows y Linux, sin disco compartido.
- it: Come realizzare server ridondanti solo via software: SafeKit offre replica in tempo reale e failover automatico su Windows e Linux, senza disco condiviso.
- nl: Redundante servers implementeren met alleen software: SafeKit biedt realtime replicatie en automatische failover op Windows en Linux, zonder gedeelde schijf.
- pt-br: Como implementar servidores redundantes só com software: o SafeKit oferece replicação em tempo real e failover automático no Windows e Linux, sem disco compartilhado.
- pt-pt: Como implementar servidores redundantes só com software: o SafeKit oferece replicação em tempo real e failover automático em Windows e Linux, sem disco partilhado.
- ja: ソフトウェアのみで冗長サーバーを実装する方法：SafeKit は Windows と Linux でリアルタイムレプリケーションと自動フェイルオーバーを提供。共有ディスク不要です。
- ko: 소프트웨어만으로 이중화 서버를 구현하는 방법: SafeKit은 공유 디스크 없이 Windows 및 Linux에서 실시간 복제와 자동 장애 조치를 제공합니다.
- zh-hans: 如何仅用软件实现冗余服务器：SafeKit 在 Windows 和 Linux 上提供实时复制和自动故障转移，无需共享磁盘。
- ar: كيفية تنفيذ خوادم مكررة بالبرمجيات فقط: يوفر SafeKit النسخ في الوقت الفعلي وتجاوز الفشل التلقائي على Windows و Linux، دون قرص مشترك.

### best-practises/how-to-upgrade-an-application-protected-by-safekit.md

- en: How to upgrade an application protected by SafeKit: minor and major upgrades, rolling upgrades, rollback options and the VM HA approach.
- fr: Mettre à niveau une application protégée par SafeKit : mises à jour mineures et majeures, mises à niveau progressives, options de retour arrière et approche HA de VM.
- de: So aktualisieren Sie eine durch SafeKit geschützte Anwendung: kleine und große Upgrades, Rolling Upgrades, Rollback-Optionen und der VM-HA-Ansatz.
- es: Cómo actualizar una aplicación protegida por SafeKit: actualizaciones menores y mayores, actualizaciones continuas, opciones de reversión y el enfoque HA de VM.
- it: Come aggiornare un’applicazione protetta da SafeKit: aggiornamenti minori e maggiori, rolling upgrade, opzioni di rollback e approccio HA delle VM.
- nl: Een door SafeKit beschermde applicatie upgraden: kleine en grote upgrades, rolling upgrades, rollbackopties en de VM-HA-aanpak.
- pt-br: Como atualizar uma aplicação protegida pelo SafeKit: atualizações menores e maiores, atualizações contínuas, opções de rollback e a abordagem HA de VM.
- pt-pt: Como atualizar uma aplicação protegida pelo SafeKit: atualizações menores e maiores, atualizações progressivas, opções de reversão e a abordagem HA de VM.
- ja: SafeKit で保護されたアプリケーションのアップグレード方法：マイナー・メジャーアップグレード、ローリングアップグレード、ロールバック、VM HA のアプローチ。
- ko: SafeKit으로 보호되는 애플리케이션의 업그레이드 방법: 마이너 및 메이저 업그레이드, 롤링 업그레이드, 롤백 옵션, VM HA 방식.
- zh-hans: 如何升级受 SafeKit 保护的应用：小版本与大版本升级、滚动升级、回滚选项及虚拟机级 HA 方法。
- ar: كيفية ترقية تطبيق يحميه SafeKit: الترقيات الثانوية والرئيسية، والترقيات المتتالية، وخيارات التراجع، ونهج HA على مستوى الأجهزة الافتراضية.

### best-practises/microsoft-nlb-vmware-multicast-unicast-alternative.md

- en: An alternative to Microsoft NLB on VMware: SafeKit farm clusters balance load and fail over without multicast, static ARP entries or MAC spoofing.
- fr: Alternative à Microsoft NLB sur VMware : les clusters farm SafeKit équilibrent la charge et basculent sans multicast, entrées ARP statiques ni usurpation d’adresse MAC.
- de: Eine Alternative zu Microsoft NLB auf VMware: SafeKit-Farm-Cluster verteilen Last und führen Failover aus, ohne Multicast, statische ARP-Einträge oder MAC-Spoofing.
- es: Una alternativa a Microsoft NLB en VMware: los clústeres farm SafeKit equilibran la carga y conmutan por error sin multicast, entradas ARP estáticas ni suplantación de MAC.
- it: Un’alternativa a Microsoft NLB su VMware: i cluster farm SafeKit bilanciano il carico ed eseguono il failover senza multicast, voci ARP statiche o MAC spoofing.
- nl: Een alternatief voor Microsoft NLB op VMware: SafeKit farm-clusters verdelen de belasting en voeren failover uit zonder multicast, statische ARP-vermeldingen of MAC-spoofing.
- pt-br: Uma alternativa ao Microsoft NLB no VMware: os clusters farm SafeKit balanceiam a carga e fazem failover sem multicast, entradas ARP estáticas nem MAC spoofing.
- pt-pt: Uma alternativa ao Microsoft NLB em VMware: os clusters farm SafeKit balanceiam a carga e fazem failover sem multicast, entradas ARP estáticas nem MAC spoofing.
- ja: VMware 上の Microsoft NLB の代替：SafeKit farm クラスターがマルチキャスト、静的 ARP、MAC スプーフィングなしで負荷分散・フェイルオーバー。
- ko: VMware에서 Microsoft NLB의 대안: SafeKit farm 클러스터는 멀티캐스트, 정적 ARP 항목, MAC 스푸핑 없이 부하 분산과 장애 조치를 수행합니다.
- zh-hans: VMware 上 Microsoft NLB 的替代方案：SafeKit farm 集群实现负载均衡和故障转移，无需组播、静态 ARP 条目或 MAC 欺骗。
- ar: بديل لـ Microsoft NLB على VMware: توازن مجموعات farm في SafeKit الأحمال وتتجاوز الفشل دون بث متعدد أو إدخالات ARP ثابتة أو انتحال MAC.

### best-practises/power-outage-and-network-isolation-in-a-cluster.md

- en: How a high availability cluster handles power outages and network isolation: SafeKit split-brain checker and automatic resynchronization protect your data.
- fr: Coupures de courant et isolement réseau dans un cluster de haute disponibilité : le checker split-brain et la resynchronisation automatique SafeKit protègent vos données.
- de: Wie ein Hochverfügbarkeitscluster Stromausfälle und Netzwerkisolation bewältigt: Der SafeKit Split-Brain-Checker und die automatische Resynchronisation schützen Ihre Daten.
- es: Cortes de energía y aislamiento de red en un clúster de alta disponibilidad: el checker split-brain y la resincronización automática de SafeKit protegen sus datos.
- it: Come un cluster ad alta disponibilità gestisce blackout e isolamento di rete: il checker split-brain e la risincronizzazione automatica di SafeKit proteggono i tuoi dati.
- nl: Hoe een cluster voor hoge beschikbaarheid omgaat met stroomuitval en netwerkisolatie: de SafeKit split-brain-checker en automatische hersynchronisatie beschermen uw gegevens.
- pt-br: Como um cluster de alta disponibilidade lida com quedas de energia e isolamento de rede: o checker split-brain e a ressincronização automática do SafeKit protegem seus dados.
- pt-pt: Como um cluster de alta disponibilidade gere cortes de energia e isolamento de rede: o checker split-brain e a ressincronização automática do SafeKit protegem os dados.
- ja: 高可用性クラスターでの停電とネットワーク分離への対処：SafeKit のスプリットブレインチェッカーと自動再同期がデータを保護します。
- ko: 고가용성 클러스터의 정전 및 네트워크 격리 대처 방법: SafeKit 스플릿 브레인 체커와 자동 재동기화가 데이터를 보호합니다.
- zh-hans: 高可用性集群如何应对断电和网络隔离：SafeKit 脑裂检测器和自动重新同步保护您的数据。
- ar: كيف تتعامل مجموعة التوفر العالي مع انقطاع الكهرباء وعزل الشبكة: يحمي مدقق split-brain وإعادة المزامنة التلقائية في SafeKit بياناتك.

### best-practises/san-vs-nas-shared-storage-for-a-failover-cluster.md

- en: SAN vs NAS shared storage for failover clusters: limits, costs and risks, and why SafeKit replication removes the need for shared storage.
- fr: Stockage partagé SAN vs NAS pour les clusters de basculement : limites, coûts et risques, et pourquoi la réplication SafeKit supprime le besoin de stockage partagé.
- de: SAN vs. NAS als gemeinsamer Speicher für Failover-Cluster: Grenzen, Kosten und Risiken, und warum die SafeKit-Replikation gemeinsamen Speicher überflüssig macht.
- es: Almacenamiento compartido SAN frente a NAS para clústeres de conmutación por error: límites, costes y riesgos, y por qué la replicación SafeKit lo hace innecesario.
- it: Storage condiviso SAN o NAS per i cluster di failover: limiti, costi e rischi, e perché la replica SafeKit elimina la necessità di storage condiviso.
- nl: SAN vs. NAS als gedeelde opslag voor failoverclusters: beperkingen, kosten en risico's, en waarom replicatie met SafeKit gedeelde opslag overbodig maakt.
- pt-br: Armazenamento compartilhado SAN vs NAS para clusters de failover: limites, custos e riscos, e por que a replicação SafeKit dispensa o armazenamento compartilhado.
- pt-pt: Armazenamento partilhado SAN vs NAS para clusters de failover: limites, custos e riscos, e porque a replicação SafeKit elimina a necessidade de armazenamento partilhado.
- ja: フェイルオーバークラスター向け SAN と NAS 共有ストレージの比較：制約、コスト、リスクと、SafeKit のレプリケーションで共有ストレージが不要になる理由。
- ko: 장애 조치 클러스터용 SAN과 NAS 공유 스토리지 비교: 한계, 비용, 위험, 그리고 SafeKit 복제로 공유 스토리지가 필요 없는 이유.
- zh-hans: 故障转移集群的 SAN 与 NAS 共享存储对比：局限、成本和风险，以及为何 SafeKit 复制无需共享存储。
- ar: التخزين المشترك SAN مقابل NAS لمجموعات تجاوز الفشل: الحدود والتكاليف والمخاطر، ولماذا يلغي النسخ في SafeKit الحاجة إلى التخزين المشترك.

### best-practises/shared-nothing-architecture-vs-shared-disk-architecture.md

- en: Shared-nothing vs shared-disk architecture for high availability: how SafeKit replicates data between servers to avoid SAN costs and simplify failover.
- fr: Architecture sans partage vs à disque partagé pour la haute disponibilité : SafeKit réplique les données entre serveurs pour éviter les coûts SAN et simplifier le basculement.
- de: Shared-Nothing- vs. Shared-Disk-Architektur für Hochverfügbarkeit: Wie SafeKit Daten zwischen Servern repliziert, um SAN-Kosten zu vermeiden und Failover zu vereinfachen.
- es: Arquitectura sin recursos compartidos frente a disco compartido en HA: cómo SafeKit replica los datos entre servidores para evitar costes de SAN y simplificar la conmutación.
- it: Architettura shared-nothing o a disco condiviso per l’alta disponibilità: come SafeKit replica i dati tra server per evitare i costi SAN e semplificare il failover.
- nl: Shared-nothing- vs. shared-disk-architectuur voor hoge beschikbaarheid: hoe SafeKit data tussen servers repliceert om SAN-kosten te vermijden en failover te vereenvoudigen.
- pt-br: Arquitetura sem compartilhamento vs disco compartilhado em alta disponibilidade: o SafeKit replica dados entre servidores para evitar custos de SAN e simplificar o failover.
- pt-pt: Arquitetura sem partilha vs disco partilhado para alta disponibilidade: como o SafeKit replica dados entre servidores para evitar custos de SAN e simplificar o failover.
- ja: 高可用性のためのシェアードナッシングと共有ディスクアーキテクチャの比較：SafeKit がサーバー間でデータを複製し、SAN コストを避けてフェイルオーバーを簡素化する方法。
- ko: 고가용성을 위한 비공유(shared-nothing)와 공유 디스크 아키텍처 비교: SafeKit이 서버 간 데이터를 복제해 SAN 비용을 없애고 장애 조치를 단순화하는 방법.
- zh-hans: 高可用性的无共享架构与共享磁盘架构对比：SafeKit 如何在服务器间复制数据，省去 SAN 成本并简化故障转移。
- ar: البنية بدون مشاركة مقابل بنية القرص المشترك للتوفر العالي: كيف ينسخ SafeKit البيانات بين الخوادم لتجنب تكاليف SAN وتبسيط تجاوز الفشل.

### best-practises/synchronous-replication-vs-asynchronous-replication.md

- en: Synchronous vs asynchronous replication: why synchronous replication gives zero data loss (RPO 0) in a SafeKit cluster and when asynchronous fits better.
- fr: Réplication synchrone vs asynchrone : pourquoi la synchrone garantit zéro perte de données (RPO 0) dans un cluster SafeKit et quand l’asynchrone convient mieux.
- de: Synchrone vs. asynchrone Replikation: Warum synchrone Replikation im SafeKit-Cluster null Datenverlust (RPO 0) bietet und wann asynchrone besser passt.
- es: Replicación síncrona frente a asíncrona: por qué la síncrona no ofrece pérdida de datos (RPO 0) en un clúster SafeKit y cuándo es más adecuada la asíncrona.
- it: Replica sincrona o asincrona: perché la replica sincrona garantisce zero perdita di dati (RPO 0) in un cluster SafeKit e quando l’asincrona è più adatta.
- nl: Synchrone vs. asynchrone replicatie: waarom synchrone replicatie geen gegevensverlies (RPO 0) geeft in een SafeKit-cluster en wanneer asynchrone replicatie beter past.
- pt-br: Replicação síncrona vs assíncrona: por que a síncrona garante zero perda de dados (RPO 0) em um cluster SafeKit e quando a assíncrona é mais adequada.
- pt-pt: Replicação síncrona vs assíncrona: porque a replicação síncrona garante zero perda de dados (RPO 0) num cluster SafeKit e quando a assíncrona é mais adequada.
- ja: 同期レプリケーションと非同期レプリケーションの比較：SafeKit クラスターで同期レプリケーションがデータ損失ゼロ（RPO 0）を実現する理由と、非同期が適する場面。
- ko: 동기 복제와 비동기 복제 비교: SafeKit 클러스터에서 동기 복제가 데이터 손실 제로(RPO 0)를 보장하는 이유와 비동기가 더 적합한 경우.
- zh-hans: 同步复制与异步复制对比：为何同步复制在 SafeKit 集群中实现零数据丢失（RPO 0），以及何时更适合异步复制。
- ar: النسخ المتزامن مقابل غير المتزامن: لماذا يضمن النسخ المتزامن صفر فقدان للبيانات (RPO 0) في مجموعة SafeKit ومتى يكون غير المتزامن أنسب.

### best-practises/test-load-balancing-vip-farm.md

- en: How to test the load balancing virtual IP of a SafeKit farm cluster: traffic distribution between nodes, failover, GARP rerouting and network checks.
- fr: Tester l’IP virtuelle d’équilibrage de charge d’un cluster farm SafeKit : répartition du trafic entre nœuds, basculement, réacheminement GARP et vérifications réseau.
- de: So testen Sie die virtuelle IP für Lastverteilung eines SafeKit-Farm-Clusters: Verkehrsverteilung zwischen Knoten, Failover, GARP-Umleitung und Netzwerkprüfungen.
- es: Cómo probar la IP virtual de equilibrio de carga de un clúster farm SafeKit: reparto del tráfico entre nodos, conmutación por error, redirección GARP y comprobaciones de red.
- it: Come testare l’IP virtuale di bilanciamento di un cluster farm SafeKit: distribuzione del traffico tra nodi, failover, reindirizzamento GARP e verifiche di rete.
- nl: Het virtuele IP-adres voor loadbalancing van een SafeKit farm-cluster testen: verkeersverdeling tussen nodes, failover, GARP-omleiding en netwerkcontroles.
- pt-br: Como testar o IP virtual de balanceamento de carga de um cluster farm SafeKit: distribuição do tráfego entre nós, failover, redirecionamento GARP e verificações de rede.
- pt-pt: Como testar o IP virtual de balanceamento de carga de um cluster farm SafeKit: distribuição do tráfego entre nós, failover, reencaminhamento GARP e verificações de rede.
- ja: SafeKit farm クラスターの負荷分散仮想 IP のテスト方法：ノード間のトラフィック分散、フェイルオーバー、GARP による再ルーティング、ネットワークの確認。
- ko: SafeKit farm 클러스터의 부하 분산 가상 IP 테스트 방법: 노드 간 트래픽 분배, 장애 조치, GARP 재라우팅, 네트워크 점검.
- zh-hans: 如何测试 SafeKit farm 集群的负载均衡虚拟 IP：节点间流量分配、故障转移、GARP 重路由和网络检查。
- ar: كيفية اختبار عنوان IP الافتراضي لموازنة الأحمال في مجموعة SafeKit farm: توزيع الحركة بين العقد، وتجاوز الفشل، وإعادة التوجيه عبر GARP، وفحوص الشبكة.

### best-practises/test-primary-backup-vip-mirror.md

- en: How to test the virtual IP of a SafeKit mirror cluster: availability, failover, GARP rerouting, ARP table checks and packet captures.
- fr: Tester l’IP virtuelle d’un cluster mirror SafeKit : disponibilité, basculement, réacheminement GARP, vérification des tables ARP et captures de paquets.
- de: So testen Sie die virtuelle IP eines SafeKit-Mirror-Clusters: Verfügbarkeit, Failover, GARP-Umleitung, Prüfung der ARP-Tabellen und Paketmitschnitte.
- es: Cómo probar la IP virtual de un clúster mirror SafeKit: disponibilidad, conmutación por error, redirección GARP, comprobación de tablas ARP y capturas de paquetes.
- it: Come testare l’IP virtuale di un cluster mirror SafeKit: disponibilità, failover, reindirizzamento GARP, verifica delle tabelle ARP e acquisizione dei pacchetti.
- nl: Het virtuele IP-adres van een SafeKit mirror-cluster testen: beschikbaarheid, failover, GARP-omleiding, controles van de ARP-tabel en packet captures.
- pt-br: Como testar o IP virtual de um cluster mirror SafeKit: disponibilidade, failover, redirecionamento GARP, verificação das tabelas ARP e capturas de pacotes.
- pt-pt: Como testar o IP virtual de um cluster mirror SafeKit: disponibilidade, failover, reencaminhamento GARP, verificação das tabelas ARP e capturas de pacotes.
- ja: SafeKit mirror クラスターの仮想 IP のテスト方法：可用性、フェイルオーバー、GARP による再ルーティング、ARP テーブルの確認、パケットキャプチャ。
- ko: SafeKit mirror 클러스터의 가상 IP 테스트 방법: 가용성, 장애 조치, GARP 재라우팅, ARP 테이블 확인, 패킷 캡처.
- zh-hans: 如何测试 SafeKit mirror 集群的虚拟 IP：可用性、故障转移、GARP 重路由、ARP 表检查和数据包捕获。
- ar: كيفية اختبار عنوان IP الافتراضي لمجموعة SafeKit mirror: التوفر، وتجاوز الفشل، وإعادة التوجيه عبر GARP، وفحص جداول ARP، والتقاط الحزم.

### best-practises/vm-ha-vs-application-ha.md

- en: VM HA vs application HA: SafeKit offers both, with real-time replication and failover without a shared disk. Compare them to choose the right approach.
- fr: HA de VM vs HA applicative : SafeKit propose les deux, avec réplication en temps réel et basculement sans disque partagé. Comparez-les pour choisir la bonne approche.
- de: VM-HA vs. Anwendungs-HA: SafeKit bietet beides, mit Echtzeit-Replikation und Failover ohne gemeinsame Festplatte. Vergleichen Sie beide, um den richtigen Ansatz zu wählen.
- es: HA de VM frente a HA de aplicación: SafeKit ofrece ambas, con replicación en tiempo real y conmutación por error sin disco compartido. Compárelas para elegir la adecuada.
- it: HA delle VM o HA applicativa: SafeKit offre entrambe, con replica in tempo reale e failover senza disco condiviso. Confrontale per scegliere l’approccio giusto.
- nl: VM-HA vs. applicatie-HA: SafeKit biedt beide, met realtime replicatie en failover zonder gedeelde schijf. Vergelijk ze om de juiste aanpak te kiezen.
- pt-br: HA de VM vs HA de aplicação: o SafeKit oferece ambos, com replicação em tempo real e failover sem disco compartilhado. Compare-os para escolher a abordagem certa.
- pt-pt: HA de VM vs HA de aplicação: o SafeKit oferece ambas, com replicação em tempo real e failover sem disco partilhado. Compare-as para escolher a abordagem certa.
- ja: VM HA とアプリケーション HA：SafeKit は両方を提供し、共有ディスクなしでリアルタイムレプリケーションとフェイルオーバーを実現。比較して最適な方式を選べます。
- ko: VM HA와 애플리케이션 HA: SafeKit은 공유 디스크 없이 실시간 복제와 장애 조치로 두 방식을 모두 제공합니다. 비교하여 적합한 방식을 선택하세요.
- zh-hans: 虚拟机级 HA 与应用级 HA：SafeKit 两者兼备，提供实时复制和故障转移，无需共享磁盘。比较两者以选择合适方案。
- ar: HA على مستوى الأجهزة الافتراضية مقابل HA على مستوى التطبيق: يوفر SafeKit كليهما مع نسخ في الوقت الفعلي وتجاوز فشل دون قرص مشترك. قارن لاختيار النهج المناسب.

### best-practises/what-is-rpo-and-rto-with-examples.md

- en: What RPO and RTO mean, with examples, and how SafeKit reaches zero data loss (RPO 0) and fast automatic failover for business continuity.
- fr: RPO et RTO expliqués avec des exemples, et comment SafeKit atteint zéro perte de données (RPO 0) et un basculement automatique rapide pour la continuité d’activité.
- de: Was RPO und RTO bedeuten, mit Beispielen, und wie SafeKit null Datenverlust (RPO 0) und schnelles automatisches Failover für die Geschäftskontinuität erreicht.
- es: Qué significan RPO y RTO, con ejemplos, y cómo SafeKit logra cero pérdida de datos (RPO 0) y una conmutación por error automática rápida para la continuidad del negocio.
- it: Cosa significano RPO e RTO, con esempi, e come SafeKit raggiunge zero perdita di dati (RPO 0) e un failover automatico rapido per la continuità operativa.
- nl: Wat RPO en RTO betekenen, met voorbeelden, en hoe SafeKit geen gegevensverlies (RPO 0) en snelle automatische failover bereikt voor bedrijfscontinuïteit.
- pt-br: O que significam RPO e RTO, com exemplos, e como o SafeKit alcança zero perda de dados (RPO 0) e failover automático rápido para a continuidade dos negócios.
- pt-pt: O que significam RPO e RTO, com exemplos, e como o SafeKit alcança zero perda de dados (RPO 0) e failover automático rápido para a continuidade do negócio.
- ja: RPO と RTO の意味を例で解説し、SafeKit が事業継続のためにデータ損失ゼロ（RPO 0）と迅速な自動フェイルオーバーを実現する方法を紹介します。
- ko: 예시로 보는 RPO와 RTO의 의미, 그리고 SafeKit이 비즈니스 연속성을 위해 데이터 손실 제로(RPO 0)와 빠른 자동 장애 조치를 실현하는 방법.
- zh-hans: RPO 和 RTO 的含义及示例，以及 SafeKit 如何实现零数据丢失（RPO 0）和快速自动故障转移，保障业务连续性。
- ar: معنى RPO و RTO مع أمثلة، وكيف يحقق SafeKit صفر فقدان للبيانات (RPO 0) وتجاوز فشل تلقائي سريعًا لاستمرارية الأعمال.

### product/_index.md

- en: SafeKit combines real-time replication, automatic failover and network load balancing in one software product for Windows and Linux, with no shared storage.
- fr: SafeKit réunit réplication en temps réel, basculement automatique et équilibrage de charge réseau dans un seul logiciel pour Windows et Linux, sans stockage partagé.
- de: SafeKit vereint Echtzeit-Replikation, automatisches Failover und Netzwerk-Lastverteilung in einem Softwareprodukt für Windows und Linux, ohne gemeinsamen Speicher.
- es: SafeKit combina replicación en tiempo real, conmutación por error automática y equilibrio de carga de red en un único software para Windows y Linux, sin disco compartido.
- it: SafeKit unisce replica in tempo reale, failover automatico e bilanciamento del carico di rete in un unico software per Windows e Linux, senza storage condiviso.
- nl: SafeKit combineert realtime replicatie, automatische failover en netwerkloadbalancing in één softwareproduct voor Windows en Linux, zonder gedeelde opslag.
- pt-br: O SafeKit combina replicação em tempo real, failover automático e balanceamento de carga de rede em um único software para Windows e Linux, sem armazenamento compartilhado.
- pt-pt: O SafeKit combina replicação em tempo real, failover automático e balanceamento de carga de rede num único software para Windows e Linux, sem armazenamento partilhado.
- ja: SafeKit は、リアルタイムレプリケーション、自動フェイルオーバー、ネットワーク負荷分散を 1 つの製品に統合。Windows と Linux 対応、共有ストレージ不要。
- ko: SafeKit은 공유 스토리지 없이 실시간 복제, 자동 장애 조치, 네트워크 부하 분산을 Windows 및 Linux용 단일 소프트웨어 제품에 결합합니다.
- zh-hans: SafeKit 将实时复制、自动故障转移和网络负载均衡集成于一款适用于 Windows 和 Linux 的软件产品中，无需共享存储。
- ar: يجمع SafeKit بين النسخ في الوقت الفعلي وتجاوز الفشل التلقائي وموازنة أحمال الشبكة في منتج برمجي واحد لـ Windows و Linux، دون تخزين مشترك.

### quick-install/_index.md

- en: SafeKit quick installation guides: step-by-step setup of mirror and farm modules for SQL Server, Oracle, Hyper-V, Docker, cloud and more, on Windows and Linux.
- fr: Guides d’installation rapide SafeKit : configuration pas à pas des modules mirror et farm pour SQL Server, Oracle, Hyper-V, Docker, le cloud et plus, sous Windows et Linux.
- de: SafeKit-Schnellinstallationsanleitungen: schrittweise Einrichtung von Mirror- und Farm-Modulen für SQL Server, Oracle, Hyper-V, Docker, Cloud u. a. unter Windows und Linux.
- es: Guías de instalación rápida SafeKit: configuración paso a paso de módulos mirror y farm para SQL Server, Oracle, Hyper-V, Docker, la nube y más, en Windows y Linux.
- it: Guide di installazione rapida SafeKit: configurazione passo passo dei moduli mirror e farm per SQL Server, Oracle, Hyper-V, Docker, cloud e altro, su Windows e Linux.
- nl: Snelle installatiehandleidingen voor SafeKit: stapsgewijze installatie van mirror- en farm-modules voor SQL Server, Oracle, Hyper-V, Docker, cloud enz., op Windows en Linux.
- pt-br: Guias de instalação rápida do SafeKit: configuração passo a passo de módulos mirror e farm para SQL Server, Oracle, Hyper-V, Docker, nuvem e mais, no Windows e Linux.
- pt-pt: Guias de instalação rápida SafeKit: configuração passo a passo de módulos mirror e farm para SQL Server, Oracle, Hyper-V, Docker, cloud e mais, em Windows e Linux.
- ja: SafeKit 導入ガイド：SQL Server、Oracle、Hyper-V、Docker、クラウド等の mirror・farm モジュール設定。Windows と Linux。
- ko: SafeKit 빠른 설치 가이드: Windows 및 Linux에서 SQL Server, Oracle, Hyper-V, Docker, 클라우드 등을 위한 mirror 및 farm 모듈 단계별 설정.
- zh-hans: SafeKit 快速安装指南：在 Windows 和 Linux 上分步部署 SQL Server、Oracle、Hyper-V、Docker、云等 mirror/farm 模块。
- ar: أدلة التثبيت السريع لـ SafeKit: إعداد خطوة بخطوة لوحدات mirror و farm لـ SQL Server و Oracle و Hyper-V و Docker والسحابة وغيرها، على Windows و Linux.

### quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-network-load-balancing-and-failover.md

- en: Step-by-step guide: install the SafeKit farm.safe module on Linux for network load balancing and failover of your application on a virtual IP.
- fr: Guide pas à pas : installez le module SafeKit farm.safe sous Linux pour l’équilibrage de charge réseau et le basculement de votre application sur une IP virtuelle.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul farm.safe unter Linux für Netzwerk-Lastverteilung und Failover Ihrer Anwendung auf einer virtuellen IP.
- es: Guía paso a paso: instale el módulo SafeKit farm.safe en Linux para equilibrio de carga de red y conmutación por error de su aplicación en una IP virtual.
- it: Guida passo passo: installa il modulo SafeKit farm.safe su Linux per il bilanciamento del carico di rete e il failover della tua applicazione su un IP virtuale.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module farm.safe op Linux voor netwerkloadbalancing en failover van uw applicatie op een virtueel IP-adres.
- pt-br: Guia passo a passo: instale o módulo SafeKit farm.safe no Linux para balanceamento de carga de rede e failover da sua aplicação em um IP virtual.
- pt-pt: Guia passo a passo: instale o módulo SafeKit farm.safe em Linux para balanceamento de carga de rede e failover da sua aplicação num IP virtual.
- ja: 手順ガイド：Linux に SafeKit の farm.safe モジュールを導入し、仮想 IP でアプリケーションのネットワーク負荷分散とフェイルオーバーを実現。
- ko: 단계별 가이드: 가상 IP 기반 애플리케이션의 네트워크 부하 분산 및 장애 조치를 위한 Linux용 SafeKit farm.safe 모듈 설치.
- zh-hans: 分步指南：在 Linux 上安装 SafeKit farm.safe 模块，基于虚拟 IP 为您的应用实现网络负载均衡和故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit farm.safe على Linux لموازنة أحمال الشبكة وتجاوز الفشل لتطبيقك على عنوان IP افتراضي.

### quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover.md

- en: Step-by-step guide: install the SafeKit mirror.safe module on Linux for real-time replication and automatic failover of your application on two servers.
- fr: Guide pas à pas : installez le module SafeKit mirror.safe sous Linux pour la réplication en temps réel et le basculement automatique de votre application sur deux serveurs.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul mirror.safe unter Linux für Echtzeit-Replikation und automatisches Failover Ihrer Anwendung auf zwei Servern.
- es: Guía paso a paso: instale el módulo SafeKit mirror.safe en Linux para replicación en tiempo real y conmutación por error automática de su aplicación en dos servidores.
- it: Guida passo passo: installa il modulo SafeKit mirror.safe su Linux per la replica in tempo reale e il failover automatico della tua applicazione su due server.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module mirror.safe op Linux voor realtime replicatie en automatische failover van uw applicatie op twee servers.
- pt-br: Guia passo a passo: instale o módulo SafeKit mirror.safe no Linux para replicação em tempo real e failover automático da sua aplicação em dois servidores.
- pt-pt: Guia passo a passo: instale o módulo SafeKit mirror.safe em Linux para replicação em tempo real e failover automático da sua aplicação em dois servidores.
- ja: 手順ガイド：Linux に SafeKit の mirror.safe モジュールを導入し、2 台のサーバーでアプリケーションのリアルタイムレプリケーションと自動フェイルオーバーを実現。
- ko: 단계별 가이드: 서버 2대에서 애플리케이션의 실시간 복제 및 자동 장애 조치를 위한 Linux용 SafeKit mirror.safe 모듈 설치.
- zh-hans: 分步指南：在 Linux 上安装 SafeKit mirror.safe 模块，在两台服务器上为您的应用实现实时复制和自动故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit mirror.safe على Linux للنسخ في الوقت الفعلي وتجاوز الفشل التلقائي لتطبيقك على خادمين.

### quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover.md

- en: Step-by-step guide: install the SafeKit farm.safe module on Windows for network load balancing and failover of your application on a virtual IP.
- fr: Guide pas à pas : installez le module SafeKit farm.safe sous Windows pour l’équilibrage de charge réseau et le basculement de votre application sur une IP virtuelle.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul farm.safe unter Windows für Netzwerk-Lastverteilung und Failover Ihrer Anwendung auf einer virtuellen IP.
- es: Guía paso a paso: instale el módulo SafeKit farm.safe en Windows para equilibrio de carga de red y conmutación por error de su aplicación en una IP virtual.
- it: Guida passo passo: installa il modulo SafeKit farm.safe su Windows per il bilanciamento del carico di rete e il failover della tua applicazione su un IP virtuale.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module farm.safe op Windows voor netwerkloadbalancing en failover van uw applicatie op een virtueel IP-adres.
- pt-br: Guia passo a passo: instale o módulo SafeKit farm.safe no Windows para balanceamento de carga de rede e failover da sua aplicação em um IP virtual.
- pt-pt: Guia passo a passo: instale o módulo SafeKit farm.safe em Windows para balanceamento de carga de rede e failover da sua aplicação num IP virtual.
- ja: 手順ガイド：Windows に SafeKit の farm.safe モジュールを導入し、仮想 IP でアプリケーションのネットワーク負荷分散とフェイルオーバーを実現。
- ko: 단계별 가이드: 가상 IP 기반 애플리케이션의 네트워크 부하 분산 및 장애 조치를 위한 Windows용 SafeKit farm.safe 모듈 설치.
- zh-hans: 分步指南：在 Windows 上安装 SafeKit farm.safe 模块，基于虚拟 IP 为您的应用实现网络负载均衡和故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit farm.safe على Windows لموازنة أحمال الشبكة وتجاوز الفشل لتطبيقك على عنوان IP افتراضي.

### quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover.md

- en: Step-by-step guide: install the SafeKit mirror.safe module on Windows for real-time replication and automatic failover of your application on two servers.
- fr: Guide pas à pas : installez le module SafeKit mirror.safe sous Windows pour la réplication en temps réel et le basculement automatique de votre application sur deux serveurs.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul mirror.safe unter Windows für Echtzeit-Replikation und automatisches Failover Ihrer Anwendung auf zwei Servern.
- es: Guía paso a paso: instale el módulo SafeKit mirror.safe en Windows para replicación en tiempo real y conmutación por error automática de su aplicación en dos servidores.
- it: Guida passo passo: installa il modulo SafeKit mirror.safe su Windows per la replica in tempo reale e il failover automatico della tua applicazione su due server.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module mirror.safe op Windows voor realtime replicatie en automatische failover van uw applicatie op twee servers.
- pt-br: Guia passo a passo: instale o módulo SafeKit mirror.safe no Windows para replicação em tempo real e failover automático da sua aplicação em dois servidores.
- pt-pt: Guia passo a passo: instale o módulo SafeKit mirror.safe em Windows para replicação em tempo real e failover automático da sua aplicação em dois servidores.
- ja: 手順ガイド：Windows に SafeKit の mirror.safe モジュールを導入し、2 台のサーバーでアプリケーションのリアルタイムレプリケーションと自動フェイルオーバーを実現。
- ko: 단계별 가이드: 서버 2대에서 애플리케이션의 실시간 복제 및 자동 장애 조치를 위한 Windows용 SafeKit mirror.safe 모듈 설치.
- zh-hans: 分步指南：在 Windows 上安装 SafeKit mirror.safe 模块，在两台服务器上为您的应用实现实时复制和自动故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit mirror.safe على Windows للنسخ في الوقت الفعلي وتجاوز الفشل التلقائي لتطبيقك على خادمين.

### quick-install/safekit-quick-installation-guide-in-aws-mirror-safe-module-for-real-time-replication-and-failover.md

- en: Step-by-step guide: install the SafeKit mirror.safe module in AWS for real-time replication and failover between two Windows or Linux instances.
- fr: Guide pas à pas : installez le module SafeKit mirror.safe dans AWS pour la réplication en temps réel et le basculement entre deux instances Windows ou Linux.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul mirror.safe in AWS für Echtzeit-Replikation und Failover zwischen zwei Windows- oder Linux-Instanzen.
- es: Guía paso a paso: instale el módulo SafeKit mirror.safe en AWS para replicación en tiempo real y conmutación por error entre dos instancias Windows o Linux.
- it: Guida passo passo: installa il modulo SafeKit mirror.safe in AWS per la replica in tempo reale e il failover tra due istanze Windows o Linux.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module mirror.safe in AWS voor realtime replicatie en failover tussen twee Windows- of Linux-instances.
- pt-br: Guia passo a passo: instale o módulo SafeKit mirror.safe na AWS para replicação em tempo real e failover entre duas instâncias Windows ou Linux.
- pt-pt: Guia passo a passo: instale o módulo SafeKit mirror.safe na AWS para replicação em tempo real e failover entre duas instâncias Windows ou Linux.
- ja: 手順ガイド：AWS に SafeKit の mirror.safe モジュールを導入し、Windows または Linux インスタンス 2 台間でリアルタイムレプリケーションとフェイルオーバーを実現。
- ko: 단계별 가이드: Windows 또는 Linux 인스턴스 2대 간 실시간 복제 및 장애 조치를 위한 AWS용 SafeKit mirror.safe 모듈 설치.
- zh-hans: 分步指南：在 AWS 中安装 SafeKit mirror.safe 模块，在两台 Windows 或 Linux 实例间实现实时复制和故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit mirror.safe في AWS للنسخ في الوقت الفعلي وتجاوز الفشل بين مثيلين Windows أو Linux.

### quick-install/safekit-quick-installation-guide-in-aws-with-network-load-balancing-and-failover.md

- en: Step-by-step guide: install the SafeKit farm.safe module in AWS, where it checks application health for the AWS load balancer and handles failover.
- fr: Guide pas à pas : installez le module SafeKit farm.safe dans AWS : il contrôle la santé de l’application pour l’équilibreur de charge AWS et gère le basculement.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul farm.safe in AWS: Es prüft den Anwendungszustand für den Load Balancer von AWS und steuert das Failover.
- es: Guía paso a paso: instale el módulo SafeKit farm.safe en AWS: comprueba el estado de la aplicación para el balanceador de carga de AWS y gestiona la conmutación por error.
- it: Guida passo passo: installa il modulo SafeKit farm.safe in AWS, dove verifica lo stato dell’applicazione per il bilanciatore del carico AWS e gestisce il failover.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module farm.safe in AWS, waar deze de applicatiestatus controleert voor de AWS load balancer en de failover afhandelt.
- pt-br: Guia passo a passo: instale o módulo SafeKit farm.safe na AWS, onde ele verifica a integridade da aplicação para o balanceador de carga AWS e trata o failover.
- pt-pt: Guia passo a passo: instale o módulo SafeKit farm.safe na AWS, onde verifica o estado da aplicação para o balanceador de carga AWS e gere o failover.
- ja: 手順ガイド：AWS に SafeKit の farm.safe モジュールを導入。AWS ロードバランサー向けにアプリケーションの状態を確認し、フェイルオーバーを処理。
- ko: 단계별 가이드: AWS용 SafeKit farm.safe 모듈 설치. AWS 부하 분산 장치를 위해 애플리케이션 상태를 확인하고 장애 조치를 처리합니다.
- zh-hans: 分步指南：在 AWS 中安装 SafeKit farm.safe 模块，为 AWS 负载均衡器检查应用健康状态并处理故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit farm.safe في AWS، حيث تتحقق من سلامة التطبيق لموازن أحمال AWS وتتولى تجاوز الفشل.

### quick-install/safekit-quick-installation-guide-in-azure-with-network-load-balancing-and-failover.md

- en: Step-by-step guide: install the SafeKit farm.safe module in Azure, where it checks application health for the Azure load balancer and handles failover.
- fr: Guide pas à pas : installez le module SafeKit farm.safe dans Azure : il contrôle la santé de l’application pour l’équilibreur de charge Azure et gère le basculement.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul farm.safe in Azure: Es prüft den Anwendungszustand für den Load Balancer von Azure und steuert das Failover.
- es: Guía paso a paso: instale el módulo SafeKit farm.safe en Azure: comprueba el estado de la aplicación para el balanceador de carga de Azure y gestiona la conmutación por error.
- it: Guida passo passo: installa il modulo SafeKit farm.safe in Azure, dove verifica lo stato dell’applicazione per il bilanciatore del carico Azure e gestisce il failover.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module farm.safe in Azure, waar deze de applicatiestatus controleert voor de Azure load balancer en de failover afhandelt.
- pt-br: Guia passo a passo: instale o módulo SafeKit farm.safe no Azure, onde ele verifica a integridade da aplicação para o balanceador de carga Azure e trata o failover.
- pt-pt: Guia passo a passo: instale o módulo SafeKit farm.safe no Azure, onde verifica o estado da aplicação para o balanceador de carga Azure e gere o failover.
- ja: 手順ガイド：Azure に SafeKit の farm.safe モジュールを導入。Azure ロードバランサー向けにアプリケーションの状態を確認し、フェイルオーバーを処理。
- ko: 단계별 가이드: Azure용 SafeKit farm.safe 모듈 설치. Azure 부하 분산 장치를 위해 애플리케이션 상태를 확인하고 장애 조치를 처리합니다.
- zh-hans: 分步指南：在 Azure 中安装 SafeKit farm.safe 模块，为 Azure 负载均衡器检查应用健康状态并处理故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit farm.safe في Azure، حيث تتحقق من سلامة التطبيق لموازن أحمال Azure وتتولى تجاوز الفشل.

### quick-install/safekit-quick-installation-guide-in-azure-with-real-time-replication-and-failover.md

- en: Step-by-step guide: install the SafeKit mirror.safe module in Azure for real-time replication and failover between two Windows or Linux virtual machines.
- fr: Guide pas à pas : installez le module SafeKit mirror.safe dans Azure pour la réplication en temps réel et le basculement entre deux machines virtuelles Windows ou Linux.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul mirror.safe in Azure für Echtzeit-Replikation und Failover zwischen zwei Windows- oder Linux-VMs.
- es: Guía paso a paso: instale el módulo SafeKit mirror.safe en Azure para replicación en tiempo real y conmutación por error entre dos máquinas virtuales Windows o Linux.
- it: Guida passo passo: installa il modulo SafeKit mirror.safe in Azure per la replica in tempo reale e il failover tra due macchine virtuali Windows o Linux.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module mirror.safe in Azure voor realtime replicatie en failover tussen twee virtuele Windows- of Linux-machines.
- pt-br: Guia passo a passo: instale o módulo SafeKit mirror.safe no Azure para replicação em tempo real e failover entre duas máquinas virtuais Windows ou Linux.
- pt-pt: Guia passo a passo: instale o módulo SafeKit mirror.safe no Azure para replicação em tempo real e failover entre duas máquinas virtuais Windows ou Linux.
- ja: 手順ガイド：Azure に SafeKit の mirror.safe モジュールを導入し、Windows または Linux VM 2 台間でリアルタイムレプリケーションとフェイルオーバーを実現。
- ko: 단계별 가이드: Windows 또는 Linux 가상 머신 2대 간 실시간 복제 및 장애 조치를 위한 Azure용 SafeKit mirror.safe 모듈 설치.
- zh-hans: 分步指南：在 Azure 中安装 SafeKit mirror.safe 模块，在两台 Windows 或 Linux 虚拟机间实现实时复制和故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit mirror.safe في Azure للنسخ في الوقت الفعلي وتجاوز الفشل بين جهازين افتراضيين Windows أو Linux.

### quick-install/safekit-quick-installation-guide-in-cloud-with-network-load-balancing-and-failover.md

- en: Step-by-step guide: install the SafeKit farm.safe module in any cloud, where it checks application health for the cloud load balancer and handles failover.
- fr: Guide pas à pas : installez le module SafeKit farm.safe dans tout cloud : il contrôle la santé de l’application pour l’équilibreur de charge cloud et gère le basculement.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul farm.safe in jeder Cloud: Es prüft den Anwendungszustand für den Load Balancer der Cloud und steuert das Failover.
- es: Guía paso a paso: instale el módulo SafeKit farm.safe en cualquier nube: comprueba el estado de la aplicación para el balanceador de carga cloud y gestiona la conmutación.
- it: Guida passo passo: installa il modulo SafeKit farm.safe in qualsiasi cloud, dove verifica lo stato dell’applicazione per il bilanciatore cloud e gestisce il failover.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module farm.safe in elke cloud, waar deze de applicatiestatus controleert voor de cloud-load balancer en de failover afhandelt.
- pt-br: Guia passo a passo: instale o módulo SafeKit farm.safe em qualquer nuvem, onde ele verifica a integridade da aplicação para o balanceador de carga da nuvem e trata o failover.
- pt-pt: Guia passo a passo: instale o módulo SafeKit farm.safe em qualquer cloud, onde verifica o estado da aplicação para o balanceador de carga cloud e gere o failover.
- ja: 手順ガイド：任意のクラウドに SafeKit の farm.safe モジュールを導入。ロードバランサー向けにアプリケーションの状態を確認し、フェイルオーバーを処理。
- ko: 단계별 가이드: 모든 클라우드용 SafeKit farm.safe 모듈 설치. 클라우드 부하 분산 장치를 위해 애플리케이션 상태를 확인하고 장애 조치를 처리합니다.
- zh-hans: 分步指南：在任意云中安装 SafeKit farm.safe 模块，为云负载均衡器检查应用健康状态并处理故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit farm.safe في أي سحابة، حيث تتحقق من سلامة التطبيق لموازن الأحمال السحابي وتتولى تجاوز الفشل.

### quick-install/safekit-quick-installation-guide-in-cloud-with-real-time-replication-and-failover.md

- en: Step-by-step guide: install the SafeKit mirror.safe module in any cloud for real-time replication and failover between two Windows or Linux virtual machines.
- fr: Guide pas à pas : installez le module SafeKit mirror.safe dans tout cloud pour la réplication en temps réel et le basculement entre deux VM Windows ou Linux.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul mirror.safe in jeder Cloud für Echtzeit-Replikation und Failover zwischen zwei Windows- oder Linux-VMs.
- es: Guía paso a paso: instale el módulo SafeKit mirror.safe en cualquier nube para replicación en tiempo real y conmutación por error entre dos máquinas virtuales Windows o Linux.
- it: Guida passo passo: installa il modulo SafeKit mirror.safe in qualsiasi cloud per la replica in tempo reale e il failover tra due macchine virtuali Windows o Linux.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module mirror.safe in elke cloud voor realtime replicatie en failover tussen twee virtuele Windows- of Linux-machines.
- pt-br: Guia passo a passo: instale o módulo SafeKit mirror.safe em qualquer nuvem para replicação em tempo real e failover entre duas máquinas virtuais Windows ou Linux.
- pt-pt: Guia passo a passo: instale o módulo SafeKit mirror.safe em qualquer cloud para replicação em tempo real e failover entre duas máquinas virtuais Windows ou Linux.
- ja: 手順ガイド：任意のクラウドに SafeKit の mirror.safe モジュールを導入し、Windows または Linux VM 2 台間でリアルタイムレプリケーションとフェイルオーバーを実現。
- ko: 단계별 가이드: Windows 또는 Linux 가상 머신 2대 간 실시간 복제 및 장애 조치를 위한 모든 클라우드용 SafeKit mirror.safe 모듈 설치.
- zh-hans: 分步指南：在任意云中安装 SafeKit mirror.safe 模块，在两台 Windows 或 Linux 虚拟机间实现实时复制和故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit mirror.safe في أي سحابة للنسخ في الوقت الفعلي وتجاوز الفشل بين جهازين افتراضيين Windows أو Linux.

### quick-install/safekit-quick-installation-guide-in-gcp-with-network-load-balancing-and-failover.md

- en: Step-by-step guide: install the SafeKit farm.safe module in Google Cloud, where it checks application health for the GCP load balancer and handles failover.
- fr: Guide pas à pas : installez le module SafeKit farm.safe dans Google Cloud : il contrôle la santé de l’application pour l’équilibreur de charge GCP et gère le basculement.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul farm.safe in Google Cloud: Es prüft den Anwendungszustand für den Load Balancer von GCP und steuert das Failover.
- es: Guía paso a paso: instale el módulo SafeKit farm.safe en Google Cloud: comprueba el estado de la aplicación para el balanceador de carga de GCP y gestiona la conmutación.
- it: Guida passo passo: installa il modulo SafeKit farm.safe in Google Cloud, dove verifica lo stato dell’applicazione per il bilanciatore GCP e gestisce il failover.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module farm.safe in Google Cloud, waar deze de applicatiestatus controleert voor de GCP load balancer en de failover afhandelt.
- pt-br: Guia passo a passo: instale o módulo SafeKit farm.safe no Google Cloud, onde ele verifica a integridade da aplicação para o balanceador de carga GCP e trata o failover.
- pt-pt: Guia passo a passo: instale o módulo SafeKit farm.safe no Google Cloud, onde verifica o estado da aplicação para o balanceador de carga GCP e gere o failover.
- ja: 手順ガイド：GCP に SafeKit の farm.safe モジュールを導入。GCP ロードバランサー向けにアプリケーションの状態を確認し、フェイルオーバーを処理。
- ko: 단계별 가이드: Google Cloud용 SafeKit farm.safe 모듈 설치. GCP 부하 분산 장치를 위해 애플리케이션 상태를 확인하고 장애 조치를 처리합니다.
- zh-hans: 分步指南：在 Google Cloud 中安装 SafeKit farm.safe 模块，为 GCP 负载均衡器检查应用健康状态并处理故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit farm.safe في Google Cloud، حيث تتحقق من سلامة التطبيق لموازن أحمال GCP وتتولى تجاوز الفشل.

### quick-install/safekit-quick-installation-guide-in-gcp-with-real-time-replication-and-failover.md

- en: Step-by-step guide: install the SafeKit mirror.safe module in Google Cloud for real-time replication and failover between two Windows or Linux VMs.
- fr: Guide pas à pas : installez le module SafeKit mirror.safe dans Google Cloud pour la réplication en temps réel et le basculement entre deux VM Windows ou Linux.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul mirror.safe in Google Cloud für Echtzeit-Replikation und Failover zwischen zwei Windows- oder Linux-VMs.
- es: Guía paso a paso: instale el módulo SafeKit mirror.safe en Google Cloud para replicación en tiempo real y conmutación por error entre dos VM Windows o Linux.
- it: Guida passo passo: installa il modulo SafeKit mirror.safe in Google Cloud per la replica in tempo reale e il failover tra due VM Windows o Linux.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module mirror.safe in Google Cloud voor realtime replicatie en failover tussen twee Windows- of Linux-VM's.
- pt-br: Guia passo a passo: instale o módulo SafeKit mirror.safe no Google Cloud para replicação em tempo real e failover entre duas VMs Windows ou Linux.
- pt-pt: Guia passo a passo: instale o módulo SafeKit mirror.safe no Google Cloud para replicação em tempo real e failover entre duas VMs Windows ou Linux.
- ja: 手順ガイド：GCP に SafeKit の mirror.safe モジュールを導入し、Windows または Linux VM 2 台間でリアルタイムレプリケーションとフェイルオーバーを実現。
- ko: 단계별 가이드: Windows 또는 Linux VM 2대 간 실시간 복제 및 장애 조치를 위한 Google Cloud용 SafeKit mirror.safe 모듈 설치.
- zh-hans: 分步指南：在 Google Cloud 中安装 SafeKit mirror.safe 模块，在两台 Windows 或 Linux VM 间实现实时复制和故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit mirror.safe في Google Cloud للنسخ في الوقت الفعلي وتجاوز الفشل بين جهازين VM بنظام Windows أو Linux.

### quick-install/safekit-quick-installation-guide-milestone-migration.md

- en: How to migrate a Milestone XProtect Management Server protected by SafeKit: database migration, SQL Server replication and failover configuration.
- fr: Migrer un Milestone XProtect Management Server protégé par SafeKit : migration de la base de données, réplication SQL Server et configuration du basculement.
- de: So migrieren Sie einen durch SafeKit geschützten Milestone XProtect Management Server: Datenbankmigration, SQL Server-Replikation und Failover-Konfiguration.
- es: Cómo migrar un Milestone XProtect Management Server protegido por SafeKit: migración de la base de datos, replicación de SQL Server y configuración de la conmutación.
- it: Come migrare un Milestone XProtect Management Server protetto da SafeKit: migrazione del database, replica di SQL Server e configurazione del failover.
- nl: Een door SafeKit beschermde Milestone XProtect Management Server migreren: databasemigratie, SQL Server-replicatie en configuratie van de failover.
- pt-br: Como migrar um Milestone XProtect Management Server protegido pelo SafeKit: migração do banco de dados, replicação do SQL Server e configuração do failover.
- pt-pt: Como migrar um Milestone XProtect Management Server protegido pelo SafeKit: migração da base de dados, replicação SQL Server e configuração do failover.
- ja: SafeKit で保護した Milestone XProtect Management Server の移行：データベース移行、SQL Server の複製とフェイルオーバー設定。
- ko: SafeKit으로 보호되는 Milestone XProtect Management Server의 마이그레이션 방법: 데이터베이스 마이그레이션, SQL Server 복제 및 장애 조치 구성.
- zh-hans: 如何迁移受 SafeKit 保护的 Milestone XProtect Management Server：数据库迁移、SQL Server 复制和故障转移配置。
- ar: كيفية ترحيل Milestone XProtect Management Server المحمي بـ SafeKit: ترحيل قاعدة البيانات، ونسخ SQL Server، وضبط تجاوز الفشل.

### quick-install/safekit-quick-installation-guide-old-milestone-configuration.md

- en: Previous step-by-step configuration of SafeKit for Milestone XProtect, including the virtual IP settings required for failover. Kept for reference.
- fr: Ancienne configuration pas à pas de SafeKit pour Milestone XProtect, avec les paramètres d’IP virtuelle nécessaires au basculement. Conservée pour référence.
- de: Frühere Schritt-für-Schritt-Konfiguration von SafeKit für Milestone XProtect, inklusive der für das Failover nötigen Einstellungen der virtuellen IP. Zur Referenz.
- es: Configuración anterior paso a paso de SafeKit para Milestone XProtect, con los ajustes de IP virtual necesarios para la conmutación por error. Se conserva como referencia.
- it: Precedente configurazione passo passo di SafeKit per Milestone XProtect, incluse le impostazioni dell’IP virtuale necessarie al failover. Conservata come riferimento.
- nl: Eerdere stapsgewijze configuratie van SafeKit voor Milestone XProtect, inclusief de voor failover vereiste instellingen van het virtuele IP-adres. Ter referentie bewaard.
- pt-br: Configuração passo a passo anterior do SafeKit para Milestone XProtect, incluindo as configurações de IP virtual necessárias para o failover. Mantida para referência.
- pt-pt: Configuração passo a passo anterior do SafeKit para Milestone XProtect, incluindo as definições de IP virtual necessárias ao failover. Mantida para referência.
- ja: Milestone XProtect 向け SafeKit の旧手順設定。フェイルオーバーに必要な仮想 IP の設定を含みます。参考用に保存しています。
- ko: 장애 조치에 필요한 가상 IP 설정을 포함한 Milestone XProtect용 SafeKit의 이전 단계별 구성입니다. 참고용으로 보관합니다.
- zh-hans: 旧版 SafeKit for Milestone XProtect 分步配置，包括故障转移所需的虚拟 IP 设置。仅供参考。
- ar: الإعداد السابق خطوة بخطوة لـ SafeKit مع Milestone XProtect، بما في ذلك إعدادات IP الافتراضي اللازمة لتجاوز الفشل. محفوظ للرجوع إليه.

### quick-install/safekit-quick-installation-guide-with-docker.md

- en: Step-by-step guide: install the SafeKit mirror.safe module for Docker on Linux, with real-time replication of container data and automatic failover.
- fr: Guide pas à pas : installez le module SafeKit mirror.safe pour Docker sous Linux, avec réplication en temps réel des données des conteneurs et basculement automatique.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul mirror.safe für Docker unter Linux, mit Echtzeit-Replikation der Containerdaten und automatischem Failover.
- es: Guía paso a paso: instale el módulo SafeKit mirror.safe para Docker en Linux, con replicación en tiempo real de los datos de contenedores y conmutación por error automática.
- it: Guida passo passo: installa il modulo SafeKit mirror.safe per Docker su Linux, con replica in tempo reale dei dati dei container e failover automatico.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module mirror.safe voor Docker op Linux, met realtime replicatie van containergegevens en automatische failover.
- pt-br: Guia passo a passo: instale o módulo SafeKit mirror.safe para Docker no Linux, com replicação em tempo real dos dados dos contêineres e failover automático.
- pt-pt: Guia passo a passo: instale o módulo SafeKit mirror.safe para Docker em Linux, com replicação em tempo real dos dados dos contentores e failover automático.
- ja: 手順ガイド：Linux 上の Docker 向けに SafeKit の mirror.safe モジュールを導入し、コンテナデータのリアルタイムレプリケーションと自動フェイルオーバーを実現。
- ko: 단계별 가이드: 컨테이너 데이터의 실시간 복제 및 자동 장애 조치를 위한 Linux 기반 Docker용 SafeKit mirror.safe 모듈 설치.
- zh-hans: 分步指南：在 Linux 上安装用于 Docker 的 SafeKit mirror.safe 模块，实现容器数据实时复制和自动故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit mirror.safe لـ Docker على Linux، مع النسخ في الوقت الفعلي لبيانات الحاويات وتجاوز الفشل التلقائي.

### quick-install/safekit-quick-installation-guide-with-firebird.md

- en: Step-by-step guide: install the SafeKit firebird.safe module for real-time replication and automatic failover of Firebird on Windows or Linux.
- fr: Guide pas à pas : installez le module SafeKit firebird.safe pour la réplication en temps réel et le basculement automatique de Firebird sous Windows ou Linux.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul firebird.safe für Echtzeit-Replikation und automatisches Failover von Firebird unter Windows oder Linux.
- es: Guía paso a paso: instale el módulo SafeKit firebird.safe para replicación en tiempo real y conmutación por error automática de Firebird en Windows o Linux.
- it: Guida passo passo: installa il modulo SafeKit firebird.safe per la replica in tempo reale e il failover automatico di Firebird su Windows o Linux.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module firebird.safe voor realtime replicatie en automatische failover van Firebird op Windows of Linux.
- pt-br: Guia passo a passo: instale o módulo SafeKit firebird.safe para replicação em tempo real e failover automático do Firebird no Windows ou Linux.
- pt-pt: Guia passo a passo: instale o módulo SafeKit firebird.safe para replicação em tempo real e failover automático do Firebird em Windows ou Linux.
- ja: 手順ガイド：SafeKit の firebird.safe モジュールを導入し、Windows または Linux 上の Firebird のリアルタイムレプリケーションと自動フェイルオーバーを実現。
- ko: 단계별 가이드: Windows 또는 Linux에서 Firebird의 실시간 복제 및 자동 장애 조치를 위한 SafeKit firebird.safe 모듈 설치.
- zh-hans: 分步指南：安装 SafeKit firebird.safe 模块，在 Windows 或 Linux 上实现 Firebird 的实时复制和自动故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit firebird.safe للنسخ في الوقت الفعلي وتجاوز الفشل التلقائي لـ Firebird على Windows أو Linux.

### quick-install/safekit-quick-installation-guide-with-hyper-v.md

- en: Step-by-step guide: install the SafeKit hyperv.safe module for VM-level high availability, with replication and failover of Hyper-V VMs between two servers.
- fr: Guide pas à pas : installez le module SafeKit hyperv.safe pour la haute disponibilité des VM, avec réplication et basculement des VM Hyper-V entre deux serveurs.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul hyperv.safe für Hochverfügbarkeit auf VM-Ebene, mit Replikation und Failover von Hyper-V-VMs zwischen zwei Servern.
- es: Guía paso a paso: instale el módulo SafeKit hyperv.safe para alta disponibilidad a nivel de VM, con replicación y conmutación por error de VM Hyper-V entre dos servidores.
- it: Guida passo passo: installa il modulo SafeKit hyperv.safe per l’alta disponibilità a livello di VM, con replica e failover delle VM Hyper-V tra due server.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module hyperv.safe voor hoge beschikbaarheid op VM-niveau, met replicatie en failover van Hyper-V-VM's tussen twee servers.
- pt-br: Guia passo a passo: instale o módulo SafeKit hyperv.safe para alta disponibilidade em nível de VM, com replicação e failover de VMs Hyper-V entre dois servidores.
- pt-pt: Guia passo a passo: instale o módulo SafeKit hyperv.safe para alta disponibilidade ao nível da VM, com replicação e failover de VMs Hyper-V entre dois servidores.
- ja: 手順ガイド：SafeKit の hyperv.safe モジュールを導入し、2 台のサーバー間で Hyper-V VM を複製・フェイルオーバー。VM レベルの高可用性を実現。
- ko: 단계별 가이드: 서버 2대 간 Hyper-V VM의 복제 및 장애 조치로 VM 수준 고가용성을 제공하는 SafeKit hyperv.safe 모듈 설치.
- zh-hans: 分步指南：安装 SafeKit hyperv.safe 模块实现虚拟机级高可用性，在两台服务器间复制 Hyper-V VM 并故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit hyperv.safe للتوفر العالي على مستوى الأجهزة الافتراضية، مع نسخ أجهزة Hyper-V الافتراضية وتجاوز فشلها بين خادمين.

### quick-install/safekit-quick-installation-guide-with-iis-with-network-load-balancing-and-failover.md

- en: Step-by-step guide: install the SafeKit iis_farm.safe module on Windows for network load balancing and failover of IIS web servers on a virtual IP.
- fr: Guide pas à pas : installez le module SafeKit iis_farm.safe sous Windows pour l’équilibrage de charge réseau et le basculement des serveurs web IIS sur une IP virtuelle.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul iis_farm.safe unter Windows für Netzwerk-Lastverteilung und Failover von IIS-Webservern auf einer virtuellen IP.
- es: Guía paso a paso: instale el módulo SafeKit iis_farm.safe en Windows para equilibrio de carga de red y conmutación por error de servidores web IIS en una IP virtual.
- it: Guida passo passo: installa il modulo SafeKit iis_farm.safe su Windows per il bilanciamento del carico di rete e il failover dei server web IIS su un IP virtuale.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module iis_farm.safe op Windows voor netwerkloadbalancing en failover van IIS-webservers op een virtueel IP-adres.
- pt-br: Guia passo a passo: instale o módulo SafeKit iis_farm.safe no Windows para balanceamento de carga de rede e failover de servidores web IIS em um IP virtual.
- pt-pt: Guia passo a passo: instale o módulo SafeKit iis_farm.safe em Windows para balanceamento de carga de rede e failover de servidores web IIS num IP virtual.
- ja: 手順ガイド：Windows に SafeKit の iis_farm.safe モジュールを導入し、仮想 IP で IIS Web サーバーのネットワーク負荷分散とフェイルオーバーを実現。
- ko: 단계별 가이드: 가상 IP 기반 IIS 웹 서버의 네트워크 부하 분산 및 장애 조치를 위한 Windows용 SafeKit iis_farm.safe 모듈 설치.
- zh-hans: 分步指南：在 Windows 上安装 SafeKit iis_farm.safe 模块，基于虚拟 IP 实现 IIS Web 服务器的网络负载均衡和故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit iis_farm.safe على Windows لموازنة أحمال الشبكة وتجاوز الفشل لخوادم الويب IIS على عنوان IP افتراضي.

### quick-install/safekit-quick-installation-guide-with-kubernetes.md

- en: Step-by-step guide: install the SafeKit k3s.safe module for a two-node Kubernetes K3s cluster on Linux, with real-time replication and automatic failover.
- fr: Guide pas à pas : installez le module SafeKit k3s.safe pour un cluster Kubernetes K3s à deux nœuds sous Linux, avec réplication en temps réel et basculement automatique.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul k3s.safe für Kubernetes K3s mit zwei Knoten unter Linux, mit Echtzeit-Replikation und automatischem Failover.
- es: Guía paso a paso: instale el módulo SafeKit k3s.safe para un clúster Kubernetes K3s de dos nodos en Linux, con replicación en tiempo real y conmutación por error automática.
- it: Guida passo passo: installa il modulo SafeKit k3s.safe per un cluster Kubernetes K3s a due nodi su Linux, con replica in tempo reale e failover automatico.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module k3s.safe voor een Kubernetes K3s-cluster met twee nodes op Linux, met realtime replicatie en automatische failover.
- pt-br: Guia passo a passo: instale o módulo SafeKit k3s.safe para um cluster Kubernetes K3s de dois nós no Linux, com replicação em tempo real e failover automático.
- pt-pt: Guia passo a passo: instale o módulo SafeKit k3s.safe para um cluster Kubernetes K3s de dois nós em Linux, com replicação em tempo real e failover automático.
- ja: 手順ガイド：SafeKit の k3s.safe モジュールを導入し、Linux 上の 2 ノード Kubernetes K3s クラスターでリアルタイムレプリケーションと自動フェイルオーバーを実現。
- ko: 단계별 가이드: 실시간 복제 및 자동 장애 조치를 갖춘 Linux 기반 2노드 Kubernetes K3s 클러스터용 SafeKit k3s.safe 모듈 설치.
- zh-hans: 分步指南：安装 SafeKit k3s.safe 模块，在 Linux 上构建双节点 Kubernetes K3s 集群，实现实时复制和自动故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit k3s.safe لمجموعة Kubernetes K3s من عقدتين على Linux، مع النسخ في الوقت الفعلي وتجاوز الفشل التلقائي.

### quick-install/safekit-quick-installation-guide-with-kvm.md

- en: Step-by-step guide: install the SafeKit kvm.safe module for VM-level high availability, with replication and failover of KVM virtual machines on Linux.
- fr: Guide pas à pas : installez le module SafeKit kvm.safe pour la haute disponibilité des VM, avec réplication et basculement des machines virtuelles KVM sous Linux.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul kvm.safe für Hochverfügbarkeit auf VM-Ebene, mit Replikation und Failover von KVM-VMs unter Linux.
- es: Guía paso a paso: instale el módulo SafeKit kvm.safe para alta disponibilidad a nivel de VM, con replicación y conmutación por error de máquinas virtuales KVM en Linux.
- it: Guida passo passo: installa il modulo SafeKit kvm.safe per l’alta disponibilità a livello di VM, con replica e failover delle macchine virtuali KVM su Linux.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module kvm.safe voor hoge beschikbaarheid op VM-niveau, met replicatie en failover van virtuele KVM-machines op Linux.
- pt-br: Guia passo a passo: instale o módulo SafeKit kvm.safe para alta disponibilidade em nível de VM, com replicação e failover de máquinas virtuais KVM no Linux.
- pt-pt: Guia passo a passo: instale o módulo SafeKit kvm.safe para alta disponibilidade ao nível da VM, com replicação e failover de máquinas virtuais KVM em Linux.
- ja: 手順ガイド：SafeKit の kvm.safe モジュールを導入し、Linux 上の KVM 仮想マシンを複製・フェイルオーバー。VM レベルの高可用性を実現。
- ko: 단계별 가이드: Linux에서 KVM 가상 머신의 복제 및 장애 조치로 VM 수준 고가용성을 제공하는 SafeKit kvm.safe 모듈 설치.
- zh-hans: 分步指南：安装 SafeKit kvm.safe 模块实现虚拟机级高可用性，在 Linux 上复制 KVM 虚拟机并故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit kvm.safe للتوفر العالي على مستوى الأجهزة الافتراضية، مع نسخ أجهزة KVM الافتراضية وتجاوز فشلها على Linux.

### quick-install/safekit-quick-installation-guide-with-mariadb.md

- en: Step-by-step guide: install the SafeKit mysql.safe module for real-time replication and automatic failover of MariaDB on Windows or Linux.
- fr: Guide pas à pas : installez le module SafeKit mysql.safe pour la réplication en temps réel et le basculement automatique de MariaDB sous Windows ou Linux.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul mysql.safe für Echtzeit-Replikation und automatisches Failover von MariaDB unter Windows oder Linux.
- es: Guía paso a paso: instale el módulo SafeKit mysql.safe para replicación en tiempo real y conmutación por error automática de MariaDB en Windows o Linux.
- it: Guida passo passo: installa il modulo SafeKit mysql.safe per la replica in tempo reale e il failover automatico di MariaDB su Windows o Linux.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module mysql.safe voor realtime replicatie en automatische failover van MariaDB op Windows of Linux.
- pt-br: Guia passo a passo: instale o módulo SafeKit mysql.safe para replicação em tempo real e failover automático do MariaDB no Windows ou Linux.
- pt-pt: Guia passo a passo: instale o módulo SafeKit mysql.safe para replicação em tempo real e failover automático do MariaDB em Windows ou Linux.
- ja: 手順ガイド：SafeKit の mysql.safe モジュールを導入し、Windows または Linux 上の MariaDB のリアルタイムレプリケーションと自動フェイルオーバーを実現。
- ko: 단계별 가이드: Windows 또는 Linux에서 MariaDB의 실시간 복제 및 자동 장애 조치를 위한 SafeKit mysql.safe 모듈 설치.
- zh-hans: 分步指南：安装 SafeKit mysql.safe 模块，在 Windows 或 Linux 上实现 MariaDB 的实时复制和自动故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit mysql.safe للنسخ في الوقت الفعلي وتجاوز الفشل التلقائي لـ MariaDB على Windows أو Linux.

### quick-install/safekit-quick-installation-guide-with-microsoft-sql-server.md

- en: Step-by-step guide: install the SafeKit sqlserver.safe module for real-time replication and automatic failover of Microsoft SQL Server on two servers.
- fr: Guide pas à pas : installez le module SafeKit sqlserver.safe pour la réplication en temps réel et le basculement automatique de Microsoft SQL Server sur deux serveurs.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul sqlserver.safe für Echtzeit-Replikation und automatisches Failover von Microsoft SQL Server auf zwei Servern.
- es: Guía paso a paso: instale el módulo SafeKit sqlserver.safe para replicación en tiempo real y conmutación por error automática de Microsoft SQL Server en dos servidores.
- it: Guida passo passo: installa il modulo SafeKit sqlserver.safe per la replica in tempo reale e il failover automatico di Microsoft SQL Server su due server.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module sqlserver.safe voor realtime replicatie en automatische failover van Microsoft SQL Server op twee servers.
- pt-br: Guia passo a passo: instale o módulo SafeKit sqlserver.safe para replicação em tempo real e failover automático do Microsoft SQL Server em dois servidores.
- pt-pt: Guia passo a passo: instale o módulo SafeKit sqlserver.safe para replicação em tempo real e failover automático do Microsoft SQL Server em dois servidores.
- ja: 手順ガイド：SafeKit の sqlserver.safe モジュールを導入し、2 台で Microsoft SQL Server のリアルタイムレプリケーションと自動フェイルオーバーを実現。
- ko: 단계별 가이드: 서버 2대에서 Microsoft SQL Server의 실시간 복제 및 자동 장애 조치를 위한 SafeKit sqlserver.safe 모듈 설치.
- zh-hans: 分步指南：安装 SafeKit sqlserver.safe 模块，在两台服务器上实现 Microsoft SQL Server 的实时复制和自动故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit sqlserver.safe للنسخ في الوقت الفعلي وتجاوز الفشل التلقائي لـ Microsoft SQL Server على خادمين.

### quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server.md

- en: Step-by-step guide: install the SafeKit milestone.safe module for real-time replication and failover of the Milestone XProtect Management Server.
- fr: Guide pas à pas : installez le module SafeKit milestone.safe pour la réplication en temps réel et le basculement du Milestone XProtect Management Server.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul milestone.safe für Echtzeit-Replikation und Failover des Milestone XProtect Management Server.
- es: Guía paso a paso: instale el módulo SafeKit milestone.safe para replicación en tiempo real y conmutación por error del Milestone XProtect Management Server.
- it: Guida passo passo: installa il modulo SafeKit milestone.safe per la replica in tempo reale e il failover del Milestone XProtect Management Server.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module milestone.safe voor realtime replicatie en failover van de Milestone XProtect Management Server.
- pt-br: Guia passo a passo: instale o módulo SafeKit milestone.safe para replicação em tempo real e failover do Milestone XProtect Management Server.
- pt-pt: Guia passo a passo: instale o módulo SafeKit milestone.safe para replicação em tempo real e failover do Milestone XProtect Management Server.
- ja: 手順ガイド：SafeKit の milestone.safe モジュールを導入し、Milestone XProtect Management Server のリアルタイムレプリケーションとフェイルオーバーを実現。
- ko: 단계별 가이드: Milestone XProtect Management Server의 실시간 복제 및 장애 조치를 위한 SafeKit milestone.safe 모듈 설치.
- zh-hans: 分步指南：安装 SafeKit milestone.safe 模块，实现 Milestone XProtect Management Server 的实时复制和故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit milestone.safe للنسخ في الوقت الفعلي وتجاوز الفشل لـ Milestone XProtect Management Server.

### quick-install/safekit-quick-installation-guide-with-mysql.md

- en: Step-by-step guide: install the SafeKit mysql.safe module for real-time replication and automatic failover of MySQL on Windows or Linux.
- fr: Guide pas à pas : installez le module SafeKit mysql.safe pour la réplication en temps réel et le basculement automatique de MySQL sous Windows ou Linux.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul mysql.safe für Echtzeit-Replikation und automatisches Failover von MySQL unter Windows oder Linux.
- es: Guía paso a paso: instale el módulo SafeKit mysql.safe para replicación en tiempo real y conmutación por error automática de MySQL en Windows o Linux.
- it: Guida passo passo: installa il modulo SafeKit mysql.safe per la replica in tempo reale e il failover automatico di MySQL su Windows o Linux.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module mysql.safe voor realtime replicatie en automatische failover van MySQL op Windows of Linux.
- pt-br: Guia passo a passo: instale o módulo SafeKit mysql.safe para replicação em tempo real e failover automático do MySQL no Windows ou Linux.
- pt-pt: Guia passo a passo: instale o módulo SafeKit mysql.safe para replicação em tempo real e failover automático do MySQL em Windows ou Linux.
- ja: 手順ガイド：SafeKit の mysql.safe モジュールを導入し、Windows または Linux 上の MySQL のリアルタイムレプリケーションと自動フェイルオーバーを実現。
- ko: 단계별 가이드: Windows 또는 Linux에서 MySQL의 실시간 복제 및 자동 장애 조치를 위한 SafeKit mysql.safe 모듈 설치.
- zh-hans: 分步指南：安装 SafeKit mysql.safe 模块，在 Windows 或 Linux 上实现 MySQL 的实时复制和自动故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit mysql.safe للنسخ في الوقت الفعلي وتجاوز الفشل التلقائي لـ MySQL على Windows أو Linux.

### quick-install/safekit-quick-installation-guide-with-nedap.md

- en: Step-by-step guide: install the SafeKit nedap.safe module for real-time replication and automatic failover of Nedap AEOS access control on Windows.
- fr: Guide pas à pas : installez le module SafeKit nedap.safe pour la réplication en temps réel et le basculement automatique du contrôle d’accès Nedap AEOS sous Windows.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul nedap.safe für Echtzeit-Replikation und automatisches Failover der Zutrittskontrolle Nedap AEOS unter Windows.
- es: Guía paso a paso: instale el módulo SafeKit nedap.safe para replicación en tiempo real y conmutación por error automática del control de acceso Nedap AEOS en Windows.
- it: Guida passo passo: installa il modulo SafeKit nedap.safe per la replica in tempo reale e il failover automatico del controllo accessi Nedap AEOS su Windows.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module nedap.safe voor realtime replicatie en automatische failover van Nedap AEOS-toegangscontrole op Windows.
- pt-br: Guia passo a passo: instale o módulo SafeKit nedap.safe para replicação em tempo real e failover automático do controle de acesso Nedap AEOS no Windows.
- pt-pt: Guia passo a passo: instale o módulo SafeKit nedap.safe para replicação em tempo real e failover automático do controlo de acessos Nedap AEOS em Windows.
- ja: 手順ガイド：SafeKit の nedap.safe モジュールを導入し、Windows 上の Nedap AEOS 入退室管理のリアルタイムレプリケーションと自動フェイルオーバーを実現。
- ko: 단계별 가이드: Windows에서 Nedap AEOS 출입 통제의 실시간 복제 및 자동 장애 조치를 위한 SafeKit nedap.safe 모듈 설치.
- zh-hans: 分步指南：安装 SafeKit nedap.safe 模块，在 Windows 上实现 Nedap AEOS 门禁系统的实时复制和自动故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit nedap.safe للنسخ في الوقت الفعلي وتجاوز الفشل التلقائي لنظام التحكم في الوصول Nedap AEOS على Windows.

### quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover.md

- en: Step-by-step guide: install the SafeKit apache_farm.safe module on Windows or Linux for network load balancing and failover of Apache web servers.
- fr: Guide pas à pas : installez le module SafeKit apache_farm.safe sous Windows ou Linux pour l’équilibrage de charge réseau et le basculement des serveurs web Apache.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul apache_farm.safe unter Windows oder Linux für Netzwerk-Lastverteilung und Failover von Apache-Webservern.
- es: Guía paso a paso: instale el módulo SafeKit apache_farm.safe en Windows o Linux para equilibrio de carga de red y conmutación por error de servidores web Apache.
- it: Guida passo passo: installa il modulo SafeKit apache_farm.safe su Windows o Linux per il bilanciamento del carico di rete e il failover dei server web Apache.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module apache_farm.safe op Windows of Linux voor netwerkloadbalancing en failover van Apache-webservers.
- pt-br: Guia passo a passo: instale o módulo SafeKit apache_farm.safe no Windows ou Linux para balanceamento de carga de rede e failover de servidores web Apache.
- pt-pt: Guia passo a passo: instale o módulo SafeKit apache_farm.safe em Windows ou Linux para balanceamento de carga de rede e failover de servidores web Apache.
- ja: 手順ガイド：Windows または Linux に SafeKit の apache_farm.safe モジュールを導入し、Apache サーバーの負荷分散とフェイルオーバーを実現。
- ko: 단계별 가이드: Apache 웹 서버의 네트워크 부하 분산 및 장애 조치를 위한 Windows 또는 Linux용 SafeKit apache_farm.safe 모듈 설치.
- zh-hans: 分步指南：在 Windows 或 Linux 上安装 SafeKit apache_farm.safe 模块，实现 Apache Web 服务器的网络负载均衡和故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit apache_farm.safe على Windows أو Linux لموازنة أحمال الشبكة وتجاوز الفشل لخوادم الويب Apache.

### quick-install/safekit-quick-installation-guide-with-nginx-with-network-load-balancing-and-failover.md

- en: Step-by-step guide: install the SafeKit farm.safe module on Windows or Linux for network load balancing and failover of NGINX servers.
- fr: Guide pas à pas : installez le module SafeKit farm.safe sous Windows ou Linux pour l’équilibrage de charge réseau et le basculement des serveurs NGINX.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul farm.safe unter Windows oder Linux für Netzwerk-Lastverteilung und Failover von NGINX-Servern.
- es: Guía paso a paso: instale el módulo SafeKit farm.safe en Windows o Linux para equilibrio de carga de red y conmutación por error de servidores NGINX.
- it: Guida passo passo: installa il modulo SafeKit farm.safe su Windows o Linux per il bilanciamento del carico di rete e il failover dei server NGINX.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module farm.safe op Windows of Linux voor netwerkloadbalancing en failover van NGINX-servers.
- pt-br: Guia passo a passo: instale o módulo SafeKit farm.safe no Windows ou Linux para balanceamento de carga de rede e failover de servidores NGINX.
- pt-pt: Guia passo a passo: instale o módulo SafeKit farm.safe em Windows ou Linux para balanceamento de carga de rede e failover de servidores NGINX.
- ja: 手順ガイド：Windows または Linux に SafeKit の farm.safe モジュールを導入し、NGINX サーバーのネットワーク負荷分散とフェイルオーバーを実現。
- ko: 단계별 가이드: NGINX 서버의 네트워크 부하 분산 및 장애 조치를 위한 Windows 또는 Linux용 SafeKit farm.safe 모듈 설치.
- zh-hans: 分步指南：在 Windows 或 Linux 上安装 SafeKit farm.safe 模块，实现 NGINX 服务器的网络负载均衡和故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit farm.safe على Windows أو Linux لموازنة أحمال الشبكة وتجاوز الفشل لخوادم NGINX.

### quick-install/safekit-quick-installation-guide-with-oracle.md

- en: Step-by-step guide: install the SafeKit oracle.safe module for real-time replication and automatic failover of Oracle databases on Windows or Linux.
- fr: Guide pas à pas : installez le module SafeKit oracle.safe pour la réplication en temps réel et le basculement automatique des bases Oracle sous Windows ou Linux.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul oracle.safe für Echtzeit-Replikation und automatisches Failover von Oracle-Datenbanken unter Windows oder Linux.
- es: Guía paso a paso: instale el módulo SafeKit oracle.safe para replicación en tiempo real y conmutación por error automática de bases de datos Oracle en Windows o Linux.
- it: Guida passo passo: installa il modulo SafeKit oracle.safe per la replica in tempo reale e il failover automatico dei database Oracle su Windows o Linux.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module oracle.safe voor realtime replicatie en automatische failover van Oracle-databases op Windows of Linux.
- pt-br: Guia passo a passo: instale o módulo SafeKit oracle.safe para replicação em tempo real e failover automático de bancos de dados Oracle no Windows ou Linux.
- pt-pt: Guia passo a passo: instale o módulo SafeKit oracle.safe para replicação em tempo real e failover automático de bases de dados Oracle em Windows ou Linux.
- ja: 手順ガイド：SafeKit の oracle.safe モジュールを導入し、Windows または Linux 上の Oracle のリアルタイムレプリケーションと自動フェイルオーバーを実現。
- ko: 단계별 가이드: Windows 또는 Linux에서 Oracle 데이터베이스의 실시간 복제 및 자동 장애 조치를 위한 SafeKit oracle.safe 모듈 설치.
- zh-hans: 分步指南：安装 SafeKit oracle.safe 模块，在 Windows 或 Linux 上实现 Oracle 数据库的实时复制和自动故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit oracle.safe للنسخ في الوقت الفعلي وتجاوز الفشل التلقائي لقواعد بيانات Oracle على Windows أو Linux.

### quick-install/safekit-quick-installation-guide-with-podman.md

- en: Step-by-step guide: install the SafeKit mirror.safe module for Podman on Linux, with real-time replication of container data and automatic failover.
- fr: Guide pas à pas : installez le module SafeKit mirror.safe pour Podman sous Linux, avec réplication en temps réel des données des conteneurs et basculement automatique.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul mirror.safe für Podman unter Linux, mit Echtzeit-Replikation der Containerdaten und automatischem Failover.
- es: Guía paso a paso: instale el módulo SafeKit mirror.safe para Podman en Linux, con replicación en tiempo real de los datos de contenedores y conmutación por error automática.
- it: Guida passo passo: installa il modulo SafeKit mirror.safe per Podman su Linux, con replica in tempo reale dei dati dei container e failover automatico.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module mirror.safe voor Podman op Linux, met realtime replicatie van containergegevens en automatische failover.
- pt-br: Guia passo a passo: instale o módulo SafeKit mirror.safe para Podman no Linux, com replicação em tempo real dos dados dos contêineres e failover automático.
- pt-pt: Guia passo a passo: instale o módulo SafeKit mirror.safe para Podman em Linux, com replicação em tempo real dos dados dos contentores e failover automático.
- ja: 手順ガイド：Linux 上の Podman 向けに SafeKit の mirror.safe モジュールを導入し、コンテナデータのリアルタイムレプリケーションと自動フェイルオーバーを実現。
- ko: 단계별 가이드: 컨테이너 데이터의 실시간 복제 및 자동 장애 조치를 위한 Linux 기반 Podman용 SafeKit mirror.safe 모듈 설치.
- zh-hans: 分步指南：在 Linux 上安装用于 Podman 的 SafeKit mirror.safe 模块，实现容器数据实时复制和自动故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit mirror.safe لـ Podman على Linux، مع النسخ في الوقت الفعلي لبيانات الحاويات وتجاوز الفشل التلقائي.

### quick-install/safekit-quick-installation-guide-with-postgresql.md

- en: Step-by-step guide: install the SafeKit postgresql.safe module for real-time replication and automatic failover of PostgreSQL on Windows or Linux.
- fr: Guide pas à pas : installez le module SafeKit postgresql.safe pour la réplication en temps réel et le basculement automatique de PostgreSQL sous Windows ou Linux.
- de: Schritt für Schritt: Installieren Sie das SafeKit-Modul postgresql.safe für Echtzeit-Replikation und automatisches Failover von PostgreSQL unter Windows oder Linux.
- es: Guía paso a paso: instale el módulo SafeKit postgresql.safe para replicación en tiempo real y conmutación por error automática de PostgreSQL en Windows o Linux.
- it: Guida passo passo: installa il modulo SafeKit postgresql.safe per la replica in tempo reale e il failover automatico di PostgreSQL su Windows o Linux.
- nl: Stapsgewijze handleiding: installeer de SafeKit-module postgresql.safe voor realtime replicatie en automatische failover van PostgreSQL op Windows of Linux.
- pt-br: Guia passo a passo: instale o módulo SafeKit postgresql.safe para replicação em tempo real e failover automático do PostgreSQL no Windows ou Linux.
- pt-pt: Guia passo a passo: instale o módulo SafeKit postgresql.safe para replicação em tempo real e failover automático do PostgreSQL em Windows ou Linux.
- ja: 手順ガイド：SafeKit の postgresql.safe モジュールを導入し、Windows または Linux 上の PostgreSQL のリアルタイムレプリケーションと自動フェイルオーバーを実現。
- ko: 단계별 가이드: Windows 또는 Linux에서 PostgreSQL의 실시간 복제 및 자동 장애 조치를 위한 SafeKit postgresql.safe 모듈 설치.
- zh-hans: 分步指南：安装 SafeKit postgresql.safe 模块，在 Windows 或 Linux 上实现 PostgreSQL 的实时复制和自动故障转移。
- ar: دليل خطوة بخطوة: تثبيت وحدة SafeKit postgresql.safe للنسخ في الوقت الفعلي وتجاوز الفشل التلقائي لـ PostgreSQL على Windows أو Linux.

### resources/_index.md

- en: SafeKit resources: free trial, user guide, release notes, quick installation guides, training, videos and technical reference for Windows and Linux clusters.
- fr: Ressources SafeKit : essai gratuit, guide utilisateur, notes de version, guides d’installation rapide, formation, vidéos et référence technique pour clusters Windows et Linux.
- de: SafeKit-Ressourcen: kostenlose Testversion, Benutzerhandbuch, Versionshinweise, Kurzanleitungen, Schulungen, Videos und technische Referenz für Windows- und Linux-Cluster.
- es: Recursos SafeKit: prueba gratuita, guía de usuario, notas de versión, guías de instalación rápida, formación, vídeos y referencia técnica para clústeres Windows y Linux.
- it: Risorse SafeKit: prova gratuita, guida utente, note di rilascio, guide di installazione rapida, formazione, video e riferimento tecnico per cluster Windows e Linux.
- nl: SafeKit-resources: gratis proefversie, gebruikersgids, release notes, snelle installatiegidsen, training, video's en technische referentie voor Windows- en Linux-clusters.
- pt-br: Recursos SafeKit: avaliação gratuita, guia do usuário, notas de versão, guias de instalação rápida, treinamento, vídeos e referência técnica para clusters Windows e Linux.
- pt-pt: Recursos SafeKit: avaliação gratuita, guia do utilizador, notas de versão, guias de instalação rápida, formação, vídeos e referência técnica para clusters Windows e Linux.
- ja: SafeKit リソース：無料トライアル、ユーザーガイド、リリースノート、クイックインストールガイド、トレーニング、動画、Windows・Linux クラスターの技術リファレンス。
- ko: SafeKit 자료: Windows 및 Linux 클러스터를 위한 무료 평가판, 사용자 가이드, 릴리스 노트, 빠른 설치 가이드, 교육, 동영상, 기술 참조 자료.
- zh-hans: SafeKit 资源：免费试用、用户指南、发行说明、快速安装指南、培训、视频及 Windows 和 Linux 集群技术参考。
- ar: موارد SafeKit: نسخة تجريبية مجانية، ودليل المستخدم، وملاحظات الإصدار، وأدلة التثبيت السريع، والتدريب، والفيديوهات، والمرجع التقني لمجموعات Windows و Linux.

### resources/high-availability-and-load-balancing-cluster-key.md

- en: Request a free one-month SafeKit key to test high availability, replication and load balancing clusters on Windows and Linux.
- fr: Demandez une clé SafeKit gratuite d’un mois pour tester des clusters de haute disponibilité, de réplication et d’équilibrage de charge sous Windows et Linux.
- de: Fordern Sie einen kostenlosen SafeKit-Schlüssel für einen Monat an, um Cluster für Hochverfügbarkeit, Replikation und Lastverteilung unter Windows und Linux zu testen.
- es: Solicite una clave SafeKit gratuita de un mes para probar clústeres de alta disponibilidad, replicación y equilibrio de carga en Windows y Linux.
- it: Richiedi una chiave SafeKit gratuita di un mese per testare cluster di alta disponibilità, replica e bilanciamento del carico su Windows e Linux.
- nl: Vraag een gratis SafeKit-sleutel voor één maand aan om clusters voor hoge beschikbaarheid, replicatie en loadbalancing te testen op Windows en Linux.
- pt-br: Solicite uma chave SafeKit gratuita de um mês para testar clusters de alta disponibilidade, replicação e balanceamento de carga no Windows e Linux.
- pt-pt: Peça uma chave SafeKit gratuita de um mês para testar clusters de alta disponibilidade, replicação e balanceamento de carga em Windows e Linux.
- ja: SafeKit の 1 か月無料キーをお申し込みいただき、Windows と Linux で高可用性、レプリケーション、負荷分散クラスターをお試しください。
- ko: 무료 1개월 SafeKit 키를 요청하여 Windows 및 Linux에서 고가용성, 복제, 부하 분산 클러스터를 테스트하세요.
- zh-hans: 申请为期一个月的免费 SafeKit 密钥，在 Windows 和 Linux 上测试高可用性、复制和负载均衡集群。
- ar: اطلب مفتاح SafeKit مجانيًا لمدة شهر لاختبار مجموعات التوفر العالي والنسخ وموازنة الأحمال على Windows و Linux.

### resources/high-availability-solutions-ha-solutions-videos.md

- en: SafeKit video demos: see two-node clusters with real-time replication, automatic failover and load balancing for SQL Server, Hyper-V, VMS and more.
- fr: Démos vidéo SafeKit : clusters à deux nœuds avec réplication en temps réel, basculement automatique et équilibrage de charge pour SQL Server, Hyper-V, VMS et plus.
- de: SafeKit-Videodemos: Zwei-Knoten-Cluster mit Echtzeit-Replikation, automatischem Failover und Lastverteilung für SQL Server, Hyper-V, VMS und mehr.
- es: Demos en vídeo de SafeKit: clústeres de dos nodos con replicación en tiempo real, conmutación por error automática y equilibrio de carga para SQL Server, Hyper-V, VMS y más.
- it: Video demo SafeKit: guarda cluster a due nodi con replica in tempo reale, failover automatico e bilanciamento del carico per SQL Server, Hyper-V, VMS e altro.
- nl: Videodemo's van SafeKit: bekijk clusters met twee nodes met realtime replicatie, automatische failover en loadbalancing voor SQL Server, Hyper-V, VMS en meer.
- pt-br: Demonstrações em vídeo do SafeKit: veja clusters de dois nós com replicação em tempo real, failover automático e balanceamento de carga para SQL Server, Hyper-V, VMS e mais.
- pt-pt: Demonstrações em vídeo do SafeKit: veja clusters de dois nós com replicação em tempo real, failover automático e balanceamento de carga para SQL Server, Hyper-V, VMS e mais.
- ja: SafeKit デモ動画：SQL Server、Hyper-V、VMS などでのリアルタイムレプリケーション、自動フェイルオーバー、負荷分散を備えた 2 ノードクラスター。
- ko: SafeKit 동영상 데모: SQL Server, Hyper-V, VMS 등을 위한 실시간 복제, 자동 장애 조치, 부하 분산 기반 2노드 클러스터를 확인하세요.
- zh-hans: SafeKit 视频演示：观看适用于 SQL Server、Hyper-V、VMS 等的双节点集群如何实现实时复制、自动故障转移和负载均衡。
- ar: عروض فيديو لـ SafeKit: شاهد مجموعات من عقدتين مع النسخ في الوقت الفعلي وتجاوز الفشل التلقائي وموازنة الأحمال لـ SQL Server و Hyper-V و VMS وغيرها.

### resources/high-availability-technical-reference-for-rfi-and-rfp-preparation.md

- en: SafeKit technical reference for RFI and RFP answers: supported systems, architectures, recovery times, security, licensing and support.
- fr: Référence technique SafeKit pour vos réponses aux RFI et RFP : systèmes pris en charge, architectures, temps de reprise, sécurité, licences et support.
- de: Technische Referenz zu SafeKit für RFI- und RFP-Antworten: unterstützte Systeme, Architekturen, Wiederherstellungszeiten, Sicherheit, Lizenzierung und Support.
- es: Referencia técnica de SafeKit para responder a RFI y RFP: sistemas compatibles, arquitecturas, tiempos de recuperación, seguridad, licencias y soporte.
- it: Riferimento tecnico SafeKit per rispondere a RFI e RFP: sistemi supportati, architetture, tempi di ripristino, sicurezza, licenze e supporto.
- nl: Technische referentie van SafeKit voor het beantwoorden van RFI's en RFP's: ondersteunde systemen, architecturen, hersteltijden, beveiliging, licenties en support.
- pt-br: Referência técnica do SafeKit para respostas a RFI e RFP: sistemas suportados, arquiteturas, tempos de recuperação, segurança, licenciamento e suporte.
- pt-pt: Referência técnica SafeKit para respostas a RFI e RFP: sistemas suportados, arquiteturas, tempos de recuperação, segurança, licenciamento e suporte.
- ja: RFI・RFP 回答のための SafeKit 技術リファレンス：対応システム、アーキテクチャ、復旧時間、セキュリティ、ライセンス、サポート。
- ko: RFI 및 RFP 답변을 위한 SafeKit 기술 참조 자료: 지원 시스템, 아키텍처, 복구 시간, 보안, 라이선스, 지원.
- zh-hans: 用于回复 RFI 和 RFP 的 SafeKit 技术参考：支持的系统、架构、恢复时间、安全性、许可和支持。
- ar: المرجع التقني لـ SafeKit للرد على طلبات RFI و RFP: الأنظمة المدعومة، والبنيات، وأزمنة الاستعادة، والأمان، والترخيص، والدعم.

### resources/safekit-free-trial.md

- en: Download the SafeKit free trial and test application-level or VM-level high availability on Windows and Linux, with replication and automatic failover.
- fr: Téléchargez l’essai gratuit de SafeKit et testez la haute disponibilité applicative ou de VM sous Windows et Linux, avec réplication et basculement automatique.
- de: Laden Sie die kostenlose SafeKit-Testversion herunter: Testen Sie HA auf Anwendungs- oder VM-Ebene unter Windows und Linux, mit Replikation und automatischem Failover.
- es: Descargue la prueba gratuita de SafeKit y pruebe la alta disponibilidad a nivel de aplicación o de VM en Windows y Linux, con replicación y conmutación por error automática.
- it: Scarica la prova gratuita di SafeKit e testa l’alta disponibilità a livello di applicazione o di VM su Windows e Linux, con replica e failover automatico.
- nl: Download de gratis proefversie van SafeKit en test hoge beschikbaarheid op applicatie- of VM-niveau op Windows en Linux, met replicatie en automatische failover.
- pt-br: Baixe a avaliação gratuita do SafeKit e teste a alta disponibilidade em nível de aplicação ou de VM no Windows e Linux, com replicação e failover automático.
- pt-pt: Descarregue a versão de avaliação gratuita do SafeKit e teste a alta disponibilidade aplicacional ou de VM em Windows e Linux, com replicação e failover automático.
- ja: SafeKit 無料トライアル：Windows と Linux で、レプリケーションと自動フェイルオーバーによるアプリケーションレベル／VM レベルの高可用性をお試しください。
- ko: SafeKit 무료 평가판을 다운로드하여 Windows 및 Linux에서 복제와 자동 장애 조치로 애플리케이션 수준 또는 VM 수준 고가용성을 테스트하세요.
- zh-hans: 下载 SafeKit 免费试用版，在 Windows 和 Linux 上测试应用级或虚拟机级高可用性，支持复制和自动故障转移。
- ar: نزّل النسخة التجريبية المجانية من SafeKit واختبر HA على مستوى التطبيق أو على مستوى الأجهزة الافتراضية على Windows و Linux، مع النسخ وتجاوز الفشل التلقائي.

### resources/safekit-on-line-training.md

- en: Free SafeKit online training and certification: installation, web console, command line, advanced configuration and troubleshooting of HA clusters.
- fr: Formation et certification SafeKit gratuites en ligne : installation, console web, ligne de commande, configuration avancée et dépannage des clusters HA.
- de: Kostenlose SafeKit-Online-Schulung und -Zertifizierung: Installation, Webkonsole, Befehlszeile, erweiterte Konfiguration und Fehlerbehebung von HA-Clustern.
- es: Formación y certificación en línea gratuitas de SafeKit: instalación, consola web, línea de comandos, configuración avanzada y resolución de problemas de clústeres HA.
- it: Formazione e certificazione online SafeKit gratuite: installazione, console web, riga di comando, configurazione avanzata e troubleshooting dei cluster HA.
- nl: Gratis online training en certificering voor SafeKit: installatie, webconsole, opdrachtregel, geavanceerde configuratie en probleemoplossing van HA-clusters.
- pt-br: Treinamento e certificação online gratuitos do SafeKit: instalação, console web, linha de comando, configuração avançada e solução de problemas de clusters HA.
- pt-pt: Formação e certificação online gratuitas SafeKit: instalação, consola web, linha de comandos, configuração avançada e resolução de problemas de clusters HA.
- ja: SafeKit の無料オンライントレーニングと認定：HA クラスターのインストール、Web コンソール、コマンドライン、高度な設定、トラブルシューティング。
- ko: 무료 SafeKit 온라인 교육 및 인증: HA 클러스터의 설치, 웹 콘솔, 명령줄, 고급 구성, 문제 해결.
- zh-hans: 免费 SafeKit 在线培训与认证：HA 集群的安装、Web 控制台、命令行、高级配置和故障排除。
- ar: تدريب وشهادة SafeKit المجانيان عبر الإنترنت: التثبيت، ووحدة تحكم الويب، وسطر الأوامر، والإعداد المتقدم، واستكشاف أخطاء مجموعات HA وإصلاحها.

### resources/safekit-release-notes-8-2.md

- en: SafeKit 8.2 release notes: main changes, restrictions, known problems and migration instructions for Windows and Linux.
- fr: Notes de version SafeKit 8.2 : principaux changements, restrictions, problèmes connus et instructions de migration pour Windows et Linux.
- de: SafeKit 8.2 Versionshinweise: wichtigste Änderungen, Einschränkungen, bekannte Probleme und Migrationsanweisungen für Windows und Linux.
- es: Notas de versión de SafeKit 8.2: principales cambios, restricciones, problemas conocidos e instrucciones de migración para Windows y Linux.
- it: Note di rilascio di SafeKit 8.2: principali modifiche, restrizioni, problemi noti e istruzioni di migrazione per Windows e Linux.
- nl: Release notes van SafeKit 8.2: belangrijkste wijzigingen, beperkingen, bekende problemen en migratie-instructies voor Windows en Linux.
- pt-br: Notas de versão do SafeKit 8.2: principais mudanças, restrições, problemas conhecidos e instruções de migração para Windows e Linux.
- pt-pt: Notas de versão do SafeKit 8.2: principais alterações, restrições, problemas conhecidos e instruções de migração para Windows e Linux.
- ja: SafeKit 8.2 リリースノート：Windows と Linux における主な変更点、制限事項、既知の問題、移行手順。
- ko: SafeKit 8.2 릴리스 노트: Windows 및 Linux용 주요 변경 사항, 제한 사항, 알려진 문제, 마이그레이션 지침.
- zh-hans: SafeKit 8.2 发行说明：Windows 和 Linux 版的主要变更、限制、已知问题和迁移说明。
- ar: ملاحظات إصدار SafeKit 8.2: التغييرات الرئيسية، والقيود، والمشكلات المعروفة، وتعليمات الترحيل لـ Windows و Linux.

### resources/safekit-support.md

- en: SafeKit support: contractual support with 24/7 incident reporting, free help from SafeKit AI and a free online training and certification program.
- fr: Support SafeKit : support contractuel avec déclaration d’incidents 24h/24 et 7j/7, aide gratuite de SafeKit AI et programme gratuit de formation et certification en ligne.
- de: SafeKit-Support: vertraglicher Support mit Störungsmeldung 24/7, kostenlose Hilfe durch SafeKit AI und ein kostenloses Online-Schulungs- und Zertifizierungsprogramm.
- es: Soporte SafeKit: soporte contractual con notificación de incidencias 24/7, ayuda gratuita de SafeKit AI y un programa gratuito de formación y certificación en línea.
- it: Supporto SafeKit: supporto contrattuale con segnalazione degli incidenti 24/7, assistenza gratuita da SafeKit AI e un programma gratuito di formazione e certificazione online.
- nl: SafeKit-support: contractuele ondersteuning met 24/7 melding van incidenten, gratis hulp van SafeKit AI en een gratis online trainings- en certificeringsprogramma.
- pt-br: Suporte SafeKit: suporte contratual com registro de incidentes 24/7, ajuda gratuita do SafeKit AI e um programa gratuito de treinamento e certificação online.
- pt-pt: Suporte SafeKit: suporte contratual com reporte de incidentes 24/7, ajuda gratuita do SafeKit AI e um programa gratuito de formação e certificação online.
- ja: SafeKit サポート：24 時間 365 日のインシデント報告を含む契約サポート、SafeKit AI による無料支援、無料のオンライントレーニングと認定プログラム。
- ko: SafeKit 지원: 연중무휴 24시간 장애 신고가 가능한 계약 지원, SafeKit AI의 무료 도움말, 무료 온라인 교육 및 인증 프로그램.
- zh-hans: SafeKit 支持：提供 7x24 小时事件报告的合同支持、SafeKit AI 免费帮助以及免费在线培训与认证计划。
- ar: دعم SafeKit: دعم تعاقدي مع الإبلاغ عن الحوادث على مدار الساعة طوال الأسبوع، ومساعدة مجانية من SafeKit AI، وبرنامج تدريب وشهادة مجاني عبر الإنترنت.

### resources/safekit-user-guide-82.md

- en: SafeKit 8.2 user guide: architectures, installation, tests, administration, troubleshooting, support and command line for Windows and Linux clusters.
- fr: Guide utilisateur SafeKit 8.2 : architectures, installation, tests, administration, dépannage, support et ligne de commande pour clusters Windows et Linux.
- de: SafeKit 8.2 Benutzerhandbuch: Architekturen, Installation, Tests, Administration, Fehlerbehebung, Support und Befehlszeile für Windows- und Linux-Cluster.
- es: Guía de usuario de SafeKit 8.2: arquitecturas, instalación, pruebas, administración, resolución de problemas, soporte y línea de comandos para clústeres Windows y Linux.
- it: Guida utente di SafeKit 8.2: architetture, installazione, test, amministrazione, troubleshooting, supporto e riga di comando per cluster Windows e Linux.
- nl: Gebruikershandleiding van SafeKit 8.2: architecturen, installatie, tests, beheer, probleemoplossing, support en opdrachtregel voor Windows- en Linux-clusters.
- pt-br: Guia do usuário do SafeKit 8.2: arquiteturas, instalação, testes, administração, solução de problemas, suporte e linha de comando para clusters Windows e Linux.
- pt-pt: Guia do utilizador do SafeKit 8.2: arquiteturas, instalação, testes, administração, resolução de problemas, suporte e linha de comandos para clusters Windows e Linux.
- ja: SafeKit 8.2 ユーザーガイド：Windows と Linux クラスターのアーキテクチャ、インストール、テスト、管理、トラブルシューティング、サポート、コマンドライン。
- ko: SafeKit 8.2 사용자 가이드: Windows 및 Linux 클러스터의 아키텍처, 설치, 테스트, 관리, 문제 해결, 지원, 명령줄.
- zh-hans: SafeKit 8.2 用户指南：Windows 和 Linux 集群的架构、安装、测试、管理、故障排除、支持和命令行。
- ar: دليل مستخدم SafeKit 8.2: البنيات، والتثبيت، والاختبارات، والإدارة، واستكشاف الأخطاء، والدعم، وسطر الأوامر لمجموعات Windows و Linux.

### solutions/_index.md

- en: SafeKit solutions: ready-to-use high availability modules for databases, web servers, VMs, containers, cloud and security software, on Windows and Linux.
- fr: Solutions SafeKit : modules de haute disponibilité prêts à l’emploi pour bases de données, serveurs web, VM, conteneurs, cloud et logiciels de sécurité, sous Windows et Linux.
- de: SafeKit-Lösungen: sofort einsetzbare Hochverfügbarkeitsmodule für Datenbanken, Webserver, VMs, Container, Cloud und Sicherheitssoftware, unter Windows und Linux.
- es: Soluciones SafeKit: módulos de alta disponibilidad listos para usar para bases de datos, servidores web, VM, contenedores, la nube y software de seguridad, en Windows y Linux.
- it: Soluzioni SafeKit: moduli di alta disponibilità pronti all’uso per database, server web, VM, container, cloud e software di sicurezza, su Windows e Linux.
- nl: SafeKit-oplossingen: kant-en-klare modules voor hoge beschikbaarheid voor databases, webservers, VM's, containers, cloud en beveiligingssoftware, op Windows en Linux.
- pt-br: Soluções SafeKit: módulos de alta disponibilidade prontos para uso para bancos de dados, servidores web, VMs, contêineres, nuvem e software de segurança, no Windows e Linux.
- pt-pt: Soluções SafeKit: módulos de alta disponibilidade prontos a usar para bases de dados, servidores web, VMs, contentores, cloud e software de segurança, em Windows e Linux.
- ja: SafeKit ソリューション：データベース、Web サーバー、VM、コンテナ、クラウド、セキュリティソフト向けの既製の高可用性モジュール。Windows と Linux 対応。
- ko: SafeKit 솔루션: Windows 및 Linux에서 데이터베이스, 웹 서버, VM, 컨테이너, 클라우드, 보안 소프트웨어를 위한 즉시 사용 가능한 고가용성 모듈.
- zh-hans: SafeKit 解决方案：适用于数据库、Web 服务器、虚拟机、容器、云和安防软件的即用型高可用性模块，支持 Windows 和 Linux。
- ar: حلول SafeKit: وحدات توفر عالٍ جاهزة للاستخدام لقواعد البيانات وخوادم الويب والأجهزة الافتراضية والحاويات والسحابة وبرامج الأمان، على Windows و Linux.

### solutions/apache-load-balancing-failover-2.md

- en: Apache load balancing and high availability with SafeKit: virtual IP, application monitoring and automatic failover on standard servers, with no NLB hardware.
- fr: Équilibrage de charge et haute disponibilité Apache avec SafeKit : IP virtuelle, surveillance applicative et basculement automatique sur serveurs standard, sans matériel NLB.
- de: Lastverteilung und Hochverfügbarkeit für Apache mit SafeKit: virtuelle IP, Anwendungsüberwachung und automatisches Failover auf Standardservern, ohne NLB-Hardware.
- es: Equilibrio de carga y alta disponibilidad de Apache con SafeKit: IP virtual, supervisión de aplicación y conmutación automática en servidores estándar, sin hardware NLB.
- it: Bilanciamento del carico e alta disponibilità Apache con SafeKit: IP virtuale, monitoraggio applicativo e failover automatico su server standard, senza hardware NLB.
- nl: Loadbalancing en hoge beschikbaarheid voor Apache met SafeKit: virtueel IP-adres, applicatiebewaking en automatische failover op standaardservers, zonder NLB-hardware.
- pt-br: Balanceamento de carga e alta disponibilidade do Apache com SafeKit: IP virtual, monitoramento da aplicação e failover automático em servidores padrão, sem hardware NLB.
- pt-pt: Balanceamento de carga e alta disponibilidade do Apache com SafeKit: IP virtual, monitorização da aplicação e failover automático em servidores padrão, sem hardware NLB.
- ja: SafeKit による Apache の負荷分散と高可用性：標準サーバー上で仮想 IP、アプリケーション監視、自動フェイルオーバーを実現。NLB ハードウェア不要。
- ko: SafeKit으로 구현하는 Apache 부하 분산 및 고가용성: 가상 IP, 애플리케이션 모니터링, 자동 장애 조치를 NLB 하드웨어 없이 표준 서버에서 제공합니다.
- zh-hans: 使用 SafeKit 实现 Apache 负载均衡与高可用性：虚拟 IP、应用监控和自动故障转移，基于标准服务器，无需 NLB 硬件。
- ar: موازنة أحمال Apache وتوفر عالٍ مع SafeKit: عنوان IP افتراضي، ومراقبة التطبيقات، وتجاوز فشل تلقائي على خوادم قياسية، دون أجهزة NLB.

### solutions/aws-high-availability-cluster-synchronous-replication-failover.md

- en: High availability in AWS with SafeKit: synchronous replication and automatic failover between two Windows or Linux instances, with no cloud shared disk.
- fr: Haute disponibilité dans AWS avec SafeKit : réplication synchrone et basculement automatique entre deux instances Windows ou Linux, sans disque partagé cloud.
- de: Hochverfügbarkeit in AWS mit SafeKit: synchrone Replikation und automatisches Failover zwischen zwei Windows- oder Linux-Instanzen, ohne gemeinsame Cloud-Festplatte.
- es: Alta disponibilidad en AWS con SafeKit: replicación síncrona y conmutación por error automática entre dos instancias Windows o Linux, sin disco compartido cloud.
- it: Alta disponibilità in AWS con SafeKit: replica sincrona e failover automatico tra due istanze Windows o Linux, senza disco condiviso nel cloud.
- nl: Hoge beschikbaarheid in AWS met SafeKit: synchrone replicatie en automatische failover tussen twee Windows- of Linux-instances, zonder gedeelde cloudschijf.
- pt-br: Alta disponibilidade na AWS com SafeKit: replicação síncrona e failover automático entre duas instâncias Windows ou Linux, sem disco compartilhado na nuvem.
- pt-pt: Alta disponibilidade na AWS com SafeKit: replicação síncrona e failover automático entre duas instâncias Windows ou Linux, sem disco partilhado na cloud.
- ja: SafeKit による AWS の高可用性：Windows または Linux インスタンス 2 台間で同期レプリケーションと自動フェイルオーバー。クラウド共有ディスク不要。
- ko: SafeKit으로 구현하는 AWS 고가용성: 클라우드 공유 디스크 없이 Windows 또는 Linux 인스턴스 2대 간 동기 복제 및 자동 장애 조치.
- zh-hans: 使用 SafeKit 在 AWS 中实现高可用性：在两台 Windows 或 Linux 实例间同步复制并自动故障转移，无需云共享磁盘。
- ar: التوفر العالي في AWS مع SafeKit: نسخ متزامن وتجاوز فشل تلقائي بين مثيلين Windows أو Linux، دون قرص سحابي مشترك.

### solutions/aws-load-balancing-cluster-failover.md

- en: SafeKit farm clusters in AWS: application health checks for the AWS load balancer, automatic restart and failover of your application on Windows or Linux.
- fr: Clusters farm SafeKit dans AWS : contrôle de santé applicatif pour l’équilibreur de charge AWS, redémarrage et basculement automatiques sous Windows ou Linux.
- de: SafeKit-Farm-Cluster in AWS: Zustandsprüfungen der Anwendung für den Load Balancer von AWS, automatischer Neustart und Failover Ihrer Anwendung unter Windows oder Linux.
- es: Clústeres farm SafeKit en AWS: control de estado de la aplicación para el balanceador de carga de AWS, reinicio y conmutación automáticos en Windows o Linux.
- it: Cluster farm SafeKit in AWS: controlli di stato applicativi per il bilanciatore del carico AWS, riavvio e failover automatici della tua applicazione su Windows o Linux.
- nl: SafeKit farm-clusters in AWS: health checks van de applicatie voor de AWS load balancer, automatische herstart en failover van uw applicatie op Windows of Linux.
- pt-br: Clusters farm SafeKit na AWS: checagem de integridade da aplicação para o balanceador de carga AWS, reinício e failover automáticos da sua aplicação no Windows ou Linux.
- pt-pt: Clusters farm SafeKit na AWS: verificações de estado da aplicação para o balanceador de carga AWS, reinício automático e failover da sua aplicação em Windows ou Linux.
- ja: AWS の SafeKit farm クラスター：AWS ロードバランサー向けヘルスチェック、Windows または Linux でのアプリの自動再起動とフェイルオーバー。
- ko: AWS의 SafeKit farm 클러스터: AWS 부하 분산 장치를 위한 애플리케이션 상태 확인, Windows 또는 Linux 애플리케이션의 자동 재시작 및 장애 조치.
- zh-hans: AWS 中的 SafeKit farm 集群：为 AWS 负载均衡器提供应用健康检查，在 Windows 或 Linux 上自动重启并故障转移您的应用。
- ar: مجموعات SafeKit farm في AWS: فحص سلامة التطبيقات لموازن أحمال AWS، وإعادة تشغيل تلقائية وتجاوز فشل لتطبيقك على Windows أو Linux.

### solutions/azure-high-availability-cluster-synchronous-replication-failover.md

- en: High availability in Microsoft Azure with SafeKit: synchronous replication and automatic failover between two Windows or Linux VMs, with no shared disk.
- fr: Haute disponibilité dans Microsoft Azure avec SafeKit : réplication synchrone et basculement automatique entre deux VM Windows ou Linux, sans disque partagé.
- de: Hochverfügbarkeit in Microsoft Azure mit SafeKit: synchrone Replikation und automatisches Failover zwischen zwei Windows- oder Linux-VMs, ohne gemeinsame Festplatte.
- es: Alta disponibilidad en Microsoft Azure con SafeKit: replicación síncrona y conmutación por error automática entre dos VM Windows o Linux, sin disco compartido.
- it: Alta disponibilità in Microsoft Azure con SafeKit: replica sincrona e failover automatico tra due VM Windows o Linux, senza disco condiviso.
- nl: Hoge beschikbaarheid in Microsoft Azure met SafeKit: synchrone replicatie en automatische failover tussen twee Windows- of Linux-VM's, zonder gedeelde schijf.
- pt-br: Alta disponibilidade no Microsoft Azure com SafeKit: replicação síncrona e failover automático entre duas VMs Windows ou Linux, sem disco compartilhado.
- pt-pt: Alta disponibilidade no Microsoft Azure com SafeKit: replicação síncrona e failover automático entre duas VMs Windows ou Linux, sem disco partilhado.
- ja: SafeKit による Azure の高可用性：Windows または Linux VM 2 台間の同期レプリケーションと自動フェイルオーバー。共有ディスク不要。
- ko: SafeKit으로 구현하는 Microsoft Azure 고가용성: 공유 디스크 없이 Windows 또는 Linux VM 2대 간 동기 복제 및 자동 장애 조치.
- zh-hans: 使用 SafeKit 在 Microsoft Azure 中实现高可用性：在两台 Windows 或 Linux VM 间同步复制并自动故障转移，无需共享磁盘。
- ar: التوفر العالي في Microsoft Azure مع SafeKit: نسخ متزامن وتجاوز فشل تلقائي بين جهازين افتراضيين Windows أو Linux، دون قرص مشترك.

### solutions/azure-load-balancing-cluster-failover.md

- en: SafeKit farm clusters in Azure: application health checks for the Azure load balancer, automatic restart and failover of your application on Windows or Linux.
- fr: Clusters farm SafeKit dans Azure : contrôle de santé applicatif pour l’équilibreur de charge Azure, redémarrage et basculement automatiques sous Windows ou Linux.
- de: SafeKit-Farm-Cluster in Azure: Zustandsprüfungen der Anwendung für den Load Balancer von Azure, automatischer Neustart und Failover Ihrer Anwendung unter Windows oder Linux.
- es: Clústeres farm SafeKit en Azure: control de estado de la aplicación para el balanceador de carga de Azure, reinicio y conmutación automáticos en Windows o Linux.
- it: Cluster farm SafeKit in Azure: controlli di stato applicativi per il bilanciatore del carico Azure, riavvio e failover automatici della tua applicazione su Windows o Linux.
- nl: SafeKit farm-clusters in Azure: health checks van de applicatie voor de Azure load balancer, automatische herstart en failover van uw applicatie op Windows of Linux.
- pt-br: Clusters farm SafeKit no Azure: checagem de integridade da aplicação para o balanceador de carga Azure, reinício e failover automáticos da sua aplicação no Windows ou Linux.
- pt-pt: Clusters farm SafeKit no Azure: verificações de estado da aplicação para o balanceador de carga Azure, reinício automático e failover da sua aplicação em Windows ou Linux.
- ja: Azure の SafeKit farm クラスター：Azure ロードバランサー向けヘルスチェック、Windows または Linux でのアプリの自動再起動とフェイルオーバー。
- ko: Azure의 SafeKit farm 클러스터: Azure 부하 분산 장치를 위한 애플리케이션 상태 확인, Windows 또는 Linux 애플리케이션의 자동 재시작 및 장애 조치.
- zh-hans: Azure 中的 SafeKit farm 集群：为 Azure 负载均衡器提供应用健康检查，在 Windows 或 Linux 上自动重启并故障转移您的应用。
- ar: مجموعات SafeKit farm في Azure: فحص سلامة التطبيقات لموازن أحمال Azure، وإعادة تشغيل تلقائية وتجاوز فشل لتطبيقك على Windows أو Linux.

### solutions/bosch-ams-the-simplest-high-availability-cluster-between-two-redundant-servers-without-shared-disk.md

- en: High availability for Bosch AMS access management: SafeKit replicates its Hyper-V virtual machine between two servers with automatic failover, without a SAN.
- fr: Haute disponibilité pour la gestion des accès Bosch AMS : SafeKit réplique sa machine virtuelle Hyper-V entre deux serveurs avec basculement automatique, sans SAN.
- de: Hochverfügbarkeit für das Zutrittsmanagement Bosch AMS: SafeKit repliziert dessen Hyper-V-VM zwischen zwei Servern mit automatischem Failover, ohne SAN.
- es: Alta disponibilidad para la gestión de accesos Bosch AMS: SafeKit replica su máquina virtual Hyper-V entre dos servidores con conmutación por error automática, sin SAN.
- it: Alta disponibilità per la gestione accessi Bosch AMS: SafeKit replica la sua macchina virtuale Hyper-V tra due server con failover automatico, senza SAN.
- nl: Hoge beschikbaarheid voor Bosch AMS-toegangsbeheer: SafeKit repliceert de virtuele Hyper-V-machine tussen twee servers met automatische failover, zonder SAN.
- pt-br: Alta disponibilidade para o controle de acesso Bosch AMS: o SafeKit replica sua máquina virtual Hyper-V entre dois servidores com failover automático, sem SAN.
- pt-pt: Alta disponibilidade para a gestão de acessos Bosch AMS: o SafeKit replica a sua máquina virtual Hyper-V entre dois servidores com failover automático, sem SAN.
- ja: Bosch AMS アクセス管理の高可用性：SafeKit が Hyper-V 仮想マシンを 2 台のサーバー間でレプリケートし、自動フェイルオーバー。SAN 不要。
- ko: Bosch AMS 출입 관리 고가용성: SafeKit은 SAN 없이 Hyper-V 가상 머신을 서버 2대 간에 복제하고 자동 장애 조치를 수행합니다.
- zh-hans: Bosch AMS 门禁管理高可用性：SafeKit 在两台服务器间复制其 Hyper-V 虚拟机并自动故障转移，无需 SAN。
- ar: التوفر العالي لنظام إدارة الوصول Bosch AMS: ينسخ SafeKit جهازه الافتراضي Hyper-V بين خادمين مع تجاوز فشل تلقائي، دون SAN.

### solutions/bosch-bis-the-simplest-high-availability-cluster-between-two-redundant-servers-without-shared-disk.md

- en: High availability for Bosch BIS: SafeKit replicates its Hyper-V virtual machine in real time between two servers with automatic failover, without a SAN.
- fr: Haute disponibilité pour Bosch BIS : SafeKit réplique sa machine virtuelle Hyper-V en temps réel entre deux serveurs avec basculement automatique, sans SAN.
- de: Hochverfügbarkeit für Bosch BIS: SafeKit repliziert dessen Hyper-V-VM in Echtzeit zwischen zwei Servern mit automatischem Failover, ohne SAN.
- es: Alta disponibilidad para Bosch BIS: SafeKit replica su máquina virtual Hyper-V en tiempo real entre dos servidores con conmutación por error automática, sin SAN.
- it: Alta disponibilità per Bosch BIS: SafeKit replica la sua macchina virtuale Hyper-V in tempo reale tra due server con failover automatico, senza SAN.
- nl: Hoge beschikbaarheid voor Bosch BIS: SafeKit repliceert de virtuele Hyper-V-machine in realtime tussen twee servers met automatische failover, zonder SAN.
- pt-br: Alta disponibilidade para o Bosch BIS: o SafeKit replica sua máquina virtual Hyper-V em tempo real entre dois servidores com failover automático, sem SAN.
- pt-pt: Alta disponibilidade para Bosch BIS: o SafeKit replica a sua máquina virtual Hyper-V em tempo real entre dois servidores com failover automático, sem SAN.
- ja: Bosch BIS の高可用性：SafeKit が Hyper-V 仮想マシンを 2 台のサーバー間でリアルタイムにレプリケートし、自動フェイルオーバー。SAN 不要。
- ko: Bosch BIS 고가용성: SafeKit은 SAN 없이 Hyper-V 가상 머신을 서버 2대 간에 실시간 복제하고 자동 장애 조치를 수행합니다.
- zh-hans: Bosch BIS 高可用性：SafeKit 在两台服务器间实时复制其 Hyper-V 虚拟机并自动故障转移，无需 SAN。
- ar: التوفر العالي لـ Bosch BIS: ينسخ SafeKit جهازه الافتراضي Hyper-V في الوقت الفعلي بين خادمين مع تجاوز فشل تلقائي، دون SAN.

### solutions/bosch-bvms-the-simplest-high-availability-cluster-between-two-redundant-servers-without-shared-disk.md

- en: High availability for Bosch BVMS video management: SafeKit replicates its Hyper-V virtual machine between two servers with automatic failover, without a SAN.
- fr: Haute disponibilité pour la gestion vidéo Bosch BVMS : SafeKit réplique sa machine virtuelle Hyper-V entre deux serveurs avec basculement automatique, sans SAN.
- de: Hochverfügbarkeit für das Videomanagement Bosch BVMS: SafeKit repliziert dessen Hyper-V-VM zwischen zwei Servern mit automatischem Failover, ohne SAN.
- es: Alta disponibilidad para la gestión de vídeo Bosch BVMS: SafeKit replica su máquina virtual Hyper-V entre dos servidores con conmutación por error automática, sin SAN.
- it: Alta disponibilità per la gestione video Bosch BVMS: SafeKit replica la sua macchina virtuale Hyper-V tra due server con failover automatico, senza SAN.
- nl: Hoge beschikbaarheid voor Bosch BVMS-videobeheer: SafeKit repliceert de virtuele Hyper-V-machine tussen twee servers met automatische failover, zonder SAN.
- pt-br: Alta disponibilidade para o gerenciamento de vídeo Bosch BVMS: o SafeKit replica sua máquina virtual Hyper-V entre dois servidores com failover automático, sem SAN.
- pt-pt: Alta disponibilidade para a gestão de vídeo Bosch BVMS: o SafeKit replica a sua máquina virtual Hyper-V entre dois servidores com failover automático, sem SAN.
- ja: Bosch BVMS ビデオ管理の高可用性：SafeKit が Hyper-V 仮想マシンを 2 台のサーバー間でレプリケートし、自動フェイルオーバー。SAN 不要。
- ko: Bosch BVMS 영상 관리 고가용성: SafeKit은 SAN 없이 Hyper-V 가상 머신을 서버 2대 간에 복제하고 자동 장애 조치를 수행합니다.
- zh-hans: Bosch BVMS 视频管理高可用性：SafeKit 在两台服务器间复制其 Hyper-V 虚拟机并自动故障转移，无需 SAN。
- ar: التوفر العالي لنظام إدارة الفيديو Bosch BVMS: ينسخ SafeKit جهازه الافتراضي Hyper-V بين خادمين مع تجاوز فشل تلقائي، دون SAN.

### solutions/cloud-high-availability-cluster-synchronous-replication-failover.md

- en: High availability in any cloud with SafeKit: synchronous replication and automatic failover between two Windows or Linux VMs, with no cloud shared disk.
- fr: Haute disponibilité dans tout cloud avec SafeKit : réplication synchrone et basculement automatique entre deux VM Windows ou Linux, sans disque partagé cloud.
- de: Hochverfügbarkeit in jeder Cloud mit SafeKit: synchrone Replikation und automatisches Failover zwischen zwei Windows- oder Linux-VMs, ohne gemeinsame Cloud-Festplatte.
- es: Alta disponibilidad en cualquier nube con SafeKit: replicación síncrona y conmutación por error automática entre dos VM Windows o Linux, sin disco compartido cloud.
- it: Alta disponibilità in qualsiasi cloud con SafeKit: replica sincrona e failover automatico tra due VM Windows o Linux, senza disco condiviso nel cloud.
- nl: Hoge beschikbaarheid in elke cloud met SafeKit: synchrone replicatie en automatische failover tussen twee Windows- of Linux-VM's, zonder gedeelde cloudschijf.
- pt-br: Alta disponibilidade em qualquer nuvem com SafeKit: replicação síncrona e failover automático entre duas VMs Windows ou Linux, sem disco compartilhado na nuvem.
- pt-pt: Alta disponibilidade em qualquer cloud com SafeKit: replicação síncrona e failover automático entre duas VMs Windows ou Linux, sem disco partilhado na cloud.
- ja: SafeKit によるあらゆるクラウドの高可用性：Windows または Linux VM 2 台間で同期レプリケーションと自動フェイルオーバー。クラウド共有ディスク不要。
- ko: SafeKit으로 구현하는 모든 클라우드의 고가용성: 클라우드 공유 디스크 없이 Windows 또는 Linux VM 2대 간 동기 복제 및 자동 장애 조치.
- zh-hans: 使用 SafeKit 在任意云中实现高可用性：在两台 Windows 或 Linux VM 间同步复制并自动故障转移，无需云共享磁盘。
- ar: التوفر العالي في أي سحابة مع SafeKit: نسخ متزامن وتجاوز فشل تلقائي بين جهازين افتراضيين Windows أو Linux، دون قرص سحابي مشترك.

### solutions/cloud-load-balancing-cluster-failover.md

- en: SafeKit farm clusters in any cloud: application health checks for the cloud load balancer, automatic restart and failover of your Windows or Linux application.
- fr: Clusters farm SafeKit dans tout cloud : contrôle de santé applicatif pour l’équilibreur de charge cloud, redémarrage et basculement automatiques sous Windows ou Linux.
- de: SafeKit-Farm-Cluster in jeder Cloud: Zustandsprüfungen der Anwendung für den Load Balancer der Cloud, automatischer Neustart und Failover Ihrer Windows- oder Linux-Anwendung.
- es: Clústeres farm SafeKit en cualquier nube: control de estado de la aplicación para el balanceador de carga cloud, reinicio y conmutación automáticos en Windows o Linux.
- it: Cluster farm SafeKit in qualsiasi cloud: controlli di stato applicativi per il bilanciatore cloud, riavvio e failover automatici della tua applicazione Windows o Linux.
- nl: SafeKit farm-clusters in elke cloud: health checks van de applicatie voor de cloud-load balancer, automatische herstart en failover van uw Windows- of Linux-applicatie.
- pt-br: Clusters farm SafeKit em qualquer nuvem: checagem de integridade da aplicação para o balanceador de carga da nuvem, reinício e failover automáticos no Windows ou Linux.
- pt-pt: Clusters farm SafeKit em qualquer cloud: verificações de estado da aplicação para o balanceador de carga cloud, reinício automático e failover da aplicação Windows ou Linux.
- ja: あらゆるクラウドの SafeKit farm クラスター：ロードバランサー向けヘルスチェック、Windows または Linux でのアプリの自動再起動とフェイルオーバー。
- ko: 모든 클라우드의 SafeKit farm 클러스터: 클라우드 부하 분산 장치를 위한 애플리케이션 상태 확인, Windows 또는 Linux 애플리케이션의 자동 재시작 및 장애 조치.
- zh-hans: 任意云中的 SafeKit farm 集群：为云负载均衡器提供应用健康检查，自动重启并故障转移您的 Windows 或 Linux 应用。
- ar: مجموعات SafeKit farm في أي سحابة: فحص سلامة التطبيقات لموازن الأحمال السحابي، وإعادة تشغيل تلقائية وتجاوز فشل لتطبيقك على Windows أو Linux.

### solutions/cluster-in-cloud-computing-generic-solution-amazon-aws-microsoft-azure-google-gcp-other-clouds.md

- en: Clusters in the cloud with SafeKit: one generic solution for replication, failover and load balancing in AWS, Azure, Google Cloud and other clouds.
- fr: Clusters dans le cloud avec SafeKit : une solution générique de réplication, de basculement et d’équilibrage de charge dans AWS, Azure, Google Cloud et autres clouds.
- de: Cluster in der Cloud mit SafeKit: eine generische Lösung für Replikation, Failover und Lastverteilung in AWS, Azure, Google Cloud und anderen Clouds.
- es: Clústeres en la nube con SafeKit: una solución genérica de replicación, conmutación por error y equilibrio de carga en AWS, Azure, Google Cloud y otras nubes.
- it: Cluster nel cloud con SafeKit: un’unica soluzione generica per replica, failover e bilanciamento del carico in AWS, Azure, Google Cloud e altri cloud.
- nl: Clusters in de cloud met SafeKit: één generieke oplossing voor replicatie, failover en loadbalancing in AWS, Azure, Google Cloud en andere clouds.
- pt-br: Clusters na nuvem com SafeKit: uma solução genérica para replicação, failover e balanceamento de carga na AWS, Azure, Google Cloud e outras nuvens.
- pt-pt: Clusters na cloud com SafeKit: uma solução genérica de replicação, failover e balanceamento de carga na AWS, Azure, Google Cloud e outras clouds.
- ja: SafeKit によるクラウドクラスター：AWS、Azure、Google Cloud などでレプリケーション、フェイルオーバー、負荷分散を実現する 1 つの汎用ソリューション。
- ko: SafeKit 클라우드 클러스터: AWS, Azure, Google Cloud 및 기타 클라우드에서 복제, 장애 조치, 부하 분산을 위한 하나의 범용 솔루션.
- zh-hans: 使用 SafeKit 构建云端集群：一套通用方案，在 AWS、Azure、Google Cloud 及其他云中实现复制、故障转移和负载均衡。
- ar: المجموعات في السحابة مع SafeKit: حل عام واحد للنسخ وتجاوز الفشل وموازنة الأحمال في AWS و Azure و Google Cloud وغيرها من السحابات.

### solutions/docker-container-high-availability-cluster-synchronous-replication-failover.md

- en: Docker high availability with SafeKit: synchronous replication of container data and automatic failover between two Linux servers, with no SAN.
- fr: Haute disponibilité Docker avec SafeKit : réplication synchrone des données des conteneurs et basculement automatique entre deux serveurs Linux, sans SAN.
- de: Hochverfügbarkeit für Docker mit SafeKit: synchrone Replikation der Containerdaten und automatisches Failover zwischen zwei Linux-Servern, ohne SAN.
- es: Alta disponibilidad de Docker con SafeKit: replicación síncrona de los datos de los contenedores y conmutación por error automática entre dos servidores Linux, sin SAN.
- it: Alta disponibilità Docker con SafeKit: replica sincrona dei dati dei container e failover automatico tra due server Linux, senza SAN.
- nl: Hoge beschikbaarheid voor Docker met SafeKit: synchrone replicatie van containergegevens en automatische failover tussen twee Linux-servers, zonder SAN.
- pt-br: Alta disponibilidade do Docker com SafeKit: replicação síncrona dos dados dos contêineres e failover automático entre dois servidores Linux, sem SAN.
- pt-pt: Alta disponibilidade de Docker com SafeKit: replicação síncrona dos dados dos contentores e failover automático entre dois servidores Linux, sem SAN.
- ja: SafeKit による Docker の高可用性：Linux サーバー 2 台間でコンテナデータの同期レプリケーションと自動フェイルオーバー。SAN 不要。
- ko: SafeKit으로 구현하는 Docker 고가용성: SAN 없이 Linux 서버 2대 간 컨테이너 데이터의 동기 복제 및 자동 장애 조치.
- zh-hans: 使用 SafeKit 实现 Docker 高可用性：在两台 Linux 服务器间同步复制容器数据并自动故障转移，无需 SAN。
- ar: التوفر العالي لـ Docker مع SafeKit: نسخ متزامن لبيانات الحاويات وتجاوز فشل تلقائي بين خادمين Linux، دون SAN.

### solutions/firebird-high-availability-synchronous-replication-failover.md

- en: Firebird high availability with SafeKit: two-node cluster with synchronous replication and automatic failover on Windows or Linux, with no SAN.
- fr: Haute disponibilité Firebird avec SafeKit : cluster à deux nœuds avec réplication synchrone et basculement automatique sous Windows ou Linux, sans SAN.
- de: Hochverfügbarkeit für Firebird mit SafeKit: Cluster mit zwei Knoten, synchroner Replikation und automatischem Failover unter Windows oder Linux, ohne SAN.
- es: Alta disponibilidad de Firebird con SafeKit: clúster de dos nodos con replicación síncrona y conmutación por error automática en Windows o Linux, sin SAN.
- it: Alta disponibilità Firebird con SafeKit: cluster a due nodi con replica sincrona e failover automatico su Windows o Linux, senza SAN.
- nl: Hoge beschikbaarheid voor Firebird met SafeKit: cluster met twee nodes, synchrone replicatie en automatische failover op Windows of Linux, zonder SAN.
- pt-br: Alta disponibilidade do Firebird com SafeKit: cluster de dois nós com replicação síncrona e failover automático no Windows ou Linux, sem SAN.
- pt-pt: Alta disponibilidade de Firebird com SafeKit: cluster de dois nós com replicação síncrona e failover automático em Windows ou Linux, sem SAN.
- ja: SafeKit による Firebird の高可用性：Windows または Linux で同期レプリケーションと自動フェイルオーバーを備えた 2 ノードクラスター。SAN 不要。
- ko: SafeKit으로 구현하는 Firebird 고가용성: Windows 또는 Linux에서 SAN 없이 동기 복제 및 자동 장애 조치를 제공하는 2노드 클러스터.
- zh-hans: 使用 SafeKit 实现 Firebird 高可用性：双节点集群，同步复制和自动故障转移，支持 Windows 或 Linux，无需 SAN。
- ar: التوفر العالي لـ Firebird مع SafeKit: مجموعة من عقدتين مع نسخ متزامن وتجاوز فشل تلقائي على Windows أو Linux، دون SAN.

### solutions/gcp-high-availability-cluster-synchronous-replication-failover.md

- en: High availability in Google Cloud with SafeKit: synchronous replication and automatic failover between two Windows or Linux VMs, with no shared disk.
- fr: Haute disponibilité dans Google Cloud avec SafeKit : réplication synchrone et basculement automatique entre deux VM Windows ou Linux, sans disque partagé.
- de: Hochverfügbarkeit in Google Cloud mit SafeKit: synchrone Replikation und automatisches Failover zwischen zwei Windows- oder Linux-VMs, ohne gemeinsame Festplatte.
- es: Alta disponibilidad en Google Cloud con SafeKit: replicación síncrona y conmutación por error automática entre dos VM Windows o Linux, sin disco compartido.
- it: Alta disponibilità in Google Cloud con SafeKit: replica sincrona e failover automatico tra due VM Windows o Linux, senza disco condiviso.
- nl: Hoge beschikbaarheid in Google Cloud met SafeKit: synchrone replicatie en automatische failover tussen twee Windows- of Linux-VM's, zonder gedeelde schijf.
- pt-br: Alta disponibilidade no Google Cloud com SafeKit: replicação síncrona e failover automático entre duas VMs Windows ou Linux, sem disco compartilhado.
- pt-pt: Alta disponibilidade no Google Cloud com SafeKit: replicação síncrona e failover automático entre duas VMs Windows ou Linux, sem disco partilhado.
- ja: SafeKit による Google Cloud の高可用性：Windows または Linux VM 2 台間で同期レプリケーションと自動フェイルオーバー。共有ディスク不要。
- ko: SafeKit으로 구현하는 Google Cloud 고가용성: 공유 디스크 없이 Windows 또는 Linux VM 2대 간 동기 복제 및 자동 장애 조치.
- zh-hans: 使用 SafeKit 在 Google Cloud 中实现高可用性：在两台 Windows 或 Linux VM 间同步复制并自动故障转移，无需共享磁盘。
- ar: التوفر العالي في Google Cloud مع SafeKit: نسخ متزامن وتجاوز فشل تلقائي بين جهازين افتراضيين Windows أو Linux، دون قرص مشترك.

### solutions/gcp-load-balancing-cluster-failover.md

- en: SafeKit farm clusters in Google Cloud: application health checks for the GCP load balancer, automatic restart and failover on Windows or Linux.
- fr: Clusters farm SafeKit dans Google Cloud : contrôle de santé applicatif pour l’équilibreur de charge GCP, redémarrage et basculement automatiques sous Windows ou Linux.
- de: SafeKit-Farm-Cluster in Google Cloud: Zustandsprüfungen der Anwendung für den Load Balancer von GCP, automatischer Neustart und Failover unter Windows oder Linux.
- es: Clústeres farm SafeKit en Google Cloud: control de estado de la aplicación para el balanceador de carga de GCP, reinicio y conmutación automáticos en Windows o Linux.
- it: Cluster farm SafeKit in Google Cloud: controlli di stato applicativi per il bilanciatore del carico GCP, riavvio e failover automatici su Windows o Linux.
- nl: SafeKit farm-clusters in Google Cloud: health checks van de applicatie voor de GCP load balancer, automatische herstart en failover op Windows of Linux.
- pt-br: Clusters farm SafeKit no Google Cloud: checagem de integridade da aplicação para o balanceador de carga GCP, reinício e failover automáticos no Windows ou Linux.
- pt-pt: Clusters farm SafeKit no Google Cloud: verificações de estado da aplicação para o balanceador de carga GCP, reinício automático e failover em Windows ou Linux.
- ja: Google Cloud の SafeKit farm クラスター：GCP ロードバランサー向けヘルスチェック、Windows または Linux で自動再起動とフェイルオーバー。
- ko: Google Cloud의 SafeKit farm 클러스터: GCP 부하 분산 장치를 위한 애플리케이션 상태 확인, Windows 또는 Linux에서 자동 재시작 및 장애 조치.
- zh-hans: Google Cloud 中的 SafeKit farm 集群：为 GCP 负载均衡器提供应用健康检查，在 Windows 或 Linux 上自动重启并故障转移。
- ar: مجموعات SafeKit farm في Google Cloud: فحص سلامة التطبيقات لموازن أحمال GCP، وإعادة تشغيل تلقائية وتجاوز فشل على Windows أو Linux.

### solutions/genetec-sql-server-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers.md

- en: High availability for the Genetec SQL Server database: SafeKit two-node cluster with synchronous replication and automatic failover, with no SAN.
- fr: Haute disponibilité pour la base Genetec SQL Server : cluster SafeKit à deux nœuds avec réplication synchrone et basculement automatique, sans SAN.
- de: Hochverfügbarkeit für die Genetec SQL Server-Datenbank: SafeKit-Cluster mit zwei Knoten, synchroner Replikation und automatischem Failover, ohne SAN.
- es: Alta disponibilidad para la base de datos SQL Server de Genetec: clúster SafeKit de dos nodos con replicación síncrona y conmutación por error automática, sin SAN.
- it: Alta disponibilità per il database Genetec SQL Server: cluster SafeKit a due nodi con replica sincrona e failover automatico, senza SAN.
- nl: Hoge beschikbaarheid voor de Genetec SQL Server-database: SafeKit-cluster met twee nodes, synchrone replicatie en automatische failover, zonder SAN.
- pt-br: Alta disponibilidade para o banco de dados Genetec SQL Server: cluster SafeKit de dois nós com replicação síncrona e failover automático, sem SAN.
- pt-pt: Alta disponibilidade para a base de dados Genetec SQL Server: cluster SafeKit de dois nós com replicação síncrona e failover automático, sem SAN.
- ja: Genetec SQL Server データベースの高可用性：同期レプリケーションと自動フェイルオーバーを備えた SafeKit 2 ノードクラスター。SAN 不要。
- ko: Genetec SQL Server 데이터베이스 고가용성: SAN 없이 동기 복제 및 자동 장애 조치를 제공하는 SafeKit 2노드 클러스터.
- zh-hans: Genetec SQL Server 数据库高可用性：SafeKit 双节点集群，同步复制和自动故障转移，无需 SAN。
- ar: التوفر العالي لقاعدة بيانات Genetec SQL Server: مجموعة SafeKit من عقدتين مع نسخ متزامن وتجاوز فشل تلقائي، دون SAN.

### solutions/hanwha-vision-cluster-without-shared-storage-on-a-san.md

- en: High availability for Hanwha Vision video management: SafeKit replicates its Hyper-V virtual machine between two servers with automatic failover, no SAN.
- fr: Haute disponibilité pour la gestion vidéo Hanwha Vision : SafeKit réplique sa machine virtuelle Hyper-V entre deux serveurs avec basculement automatique, sans SAN.
- de: Hochverfügbarkeit für das Videomanagement Hanwha Vision: SafeKit repliziert dessen Hyper-V-VM zwischen zwei Servern mit automatischem Failover, ohne SAN.
- es: Alta disponibilidad para la gestión de vídeo Hanwha Vision: SafeKit replica su máquina virtual Hyper-V entre dos servidores con conmutación por error automática, sin SAN.
- it: Alta disponibilità per la gestione video Hanwha Vision: SafeKit replica la sua macchina virtuale Hyper-V tra due server con failover automatico, senza SAN.
- nl: Hoge beschikbaarheid voor Hanwha Vision-videobeheer: SafeKit repliceert de virtuele Hyper-V-machine tussen twee servers met automatische failover, zonder SAN.
- pt-br: Alta disponibilidade para o gerenciamento de vídeo Hanwha Vision: o SafeKit replica sua máquina virtual Hyper-V entre dois servidores com failover automático, sem SAN.
- pt-pt: Alta disponibilidade para a gestão de vídeo Hanwha Vision: o SafeKit replica a sua máquina virtual Hyper-V entre dois servidores com failover automático, sem SAN.
- ja: Hanwha Vision ビデオ管理の高可用性：SafeKit が Hyper-V 仮想マシンを 2 台のサーバー間でレプリケートし、自動フェイルオーバー。SAN 不要。
- ko: Hanwha Vision 영상 관리 고가용성: SafeKit은 SAN 없이 Hyper-V 가상 머신을 서버 2대 간에 복제하고 자동 장애 조치를 수행합니다.
- zh-hans: Hanwha Vision 视频管理高可用性：SafeKit 在两台服务器间复制其 Hyper-V 虚拟机并自动故障转移，无需 SAN。
- ar: التوفر العالي لنظام إدارة الفيديو Hanwha Vision: ينسخ SafeKit جهازه الافتراضي Hyper-V بين خادمين مع تجاوز فشل تلقائي، دون SAN.

### solutions/hanwha-wisenet-wave-the-simplest-high-availability-cluster-between-two-redundant-servers-without-shared-disk.md

- en: High availability for Hanwha Wisenet WAVE: SafeKit replicates its Hyper-V virtual machine between two servers with automatic failover, without a SAN.
- fr: Haute disponibilité pour Hanwha Wisenet WAVE : SafeKit réplique sa machine virtuelle Hyper-V entre deux serveurs avec basculement automatique, sans SAN.
- de: Hochverfügbarkeit für Hanwha Wisenet WAVE: SafeKit repliziert dessen Hyper-V-VM zwischen zwei Servern mit automatischem Failover, ohne SAN.
- es: Alta disponibilidad para Hanwha Wisenet WAVE: SafeKit replica su máquina virtual Hyper-V entre dos servidores con conmutación por error automática, sin SAN.
- it: Alta disponibilità per Hanwha Wisenet WAVE: SafeKit replica la sua macchina virtuale Hyper-V tra due server con failover automatico, senza SAN.
- nl: Hoge beschikbaarheid voor Hanwha Wisenet WAVE: SafeKit repliceert de virtuele Hyper-V-machine tussen twee servers met automatische failover, zonder SAN.
- pt-br: Alta disponibilidade para o Hanwha Wisenet WAVE: o SafeKit replica sua máquina virtual Hyper-V entre dois servidores com failover automático, sem SAN.
- pt-pt: Alta disponibilidade para Hanwha Wisenet WAVE: o SafeKit replica a sua máquina virtual Hyper-V entre dois servidores com failover automático, sem SAN.
- ja: Hanwha Wisenet WAVE の高可用性：SafeKit が Hyper-V 仮想マシンを 2 台のサーバー間でレプリケートし、自動フェイルオーバー。SAN 不要。
- ko: Hanwha Wisenet WAVE 고가용성: SafeKit은 SAN 없이 Hyper-V 가상 머신을 서버 2대 간에 복제하고 자동 장애 조치를 수행합니다.
- zh-hans: Hanwha Wisenet WAVE 高可用性：SafeKit 在两台服务器间复制其 Hyper-V 虚拟机并自动故障转移，无需 SAN。
- ar: التوفر العالي لـ Hanwha Wisenet WAVE: ينسخ SafeKit جهازه الافتراضي Hyper-V بين خادمين مع تجاوز فشل تلقائي، دون SAN.

### solutions/hyper-v-replication-automatic-failover-load-balancing.md

- en: Hyper-V high availability without a SAN: SafeKit replicates virtual machines in real time between two servers and restarts them automatically on failure.
- fr: Haute disponibilité Hyper-V sans SAN : SafeKit réplique les machines virtuelles en temps réel entre deux serveurs et les redémarre automatiquement en cas de panne.
- de: Hochverfügbarkeit für Hyper-V ohne SAN: SafeKit repliziert virtuelle Maschinen in Echtzeit zwischen zwei Servern und startet sie bei einem Ausfall automatisch neu.
- es: Alta disponibilidad de Hyper-V sin SAN: SafeKit replica las máquinas virtuales en tiempo real entre dos servidores y las reinicia automáticamente en caso de fallo.
- it: Alta disponibilità Hyper-V senza SAN: SafeKit replica le macchine virtuali in tempo reale tra due server e le riavvia automaticamente in caso di guasto.
- nl: Hoge beschikbaarheid voor Hyper-V zonder SAN: SafeKit repliceert virtuele machines in realtime tussen twee servers en herstart ze automatisch bij een storing.
- pt-br: Alta disponibilidade do Hyper-V sem SAN: o SafeKit replica máquinas virtuais em tempo real entre dois servidores e as reinicia automaticamente em caso de falha.
- pt-pt: Alta disponibilidade de Hyper-V sem SAN: o SafeKit replica máquinas virtuais em tempo real entre dois servidores e reinicia-as automaticamente em caso de falha.
- ja: SAN 不要の Hyper-V 高可用性：SafeKit が 2 台のサーバー間で仮想マシンをリアルタイムにレプリケートし、障害時に自動で再起動します。
- ko: SAN 없는 Hyper-V 고가용성: SafeKit은 서버 2대 간에 가상 머신을 실시간 복제하고 장애 시 자동으로 재시작합니다.
- zh-hans: 无需 SAN 的 Hyper-V 高可用性：SafeKit 在两台服务器间实时复制虚拟机，并在故障时自动重启。
- ar: التوفر العالي لـ Hyper-V دون SAN: ينسخ SafeKit الأجهزة الافتراضية في الوقت الفعلي بين خادمين ويعيد تشغيلها تلقائيًا عند حدوث عطل.

### solutions/iis-load-balancing-failover.md

- en: IIS load balancing and high availability with SafeKit: virtual IP, application monitoring and automatic failover on standard Windows servers.
- fr: Équilibrage de charge et haute disponibilité IIS avec SafeKit : IP virtuelle, surveillance applicative et basculement automatique sur serveurs Windows standard.
- de: Lastverteilung und Hochverfügbarkeit für IIS mit SafeKit: virtuelle IP, Anwendungsüberwachung und automatisches Failover auf Windows-Standardservern.
- es: Equilibrio de carga y alta disponibilidad de IIS con SafeKit: IP virtual, supervisión de la aplicación y conmutación por error automática en servidores Windows estándar.
- it: Bilanciamento del carico e alta disponibilità IIS con SafeKit: IP virtuale, monitoraggio applicativo e failover automatico su server Windows standard.
- nl: Loadbalancing en hoge beschikbaarheid voor IIS met SafeKit: virtueel IP-adres, applicatiebewaking en automatische failover op standaard Windows-servers.
- pt-br: Balanceamento de carga e alta disponibilidade do IIS com SafeKit: IP virtual, monitoramento da aplicação e failover automático em servidores Windows padrão.
- pt-pt: Balanceamento de carga e alta disponibilidade do IIS com SafeKit: IP virtual, monitorização da aplicação e failover automático em servidores Windows padrão.
- ja: SafeKit による IIS の負荷分散と高可用性：標準 Windows サーバー上で仮想 IP、アプリケーション監視、自動フェイルオーバーを実現。
- ko: SafeKit으로 구현하는 IIS 부하 분산 및 고가용성: 가상 IP, 애플리케이션 모니터링, 자동 장애 조치를 표준 Windows 서버에서 제공합니다.
- zh-hans: 使用 SafeKit 实现 IIS 负载均衡与高可用性：虚拟 IP、应用监控和自动故障转移，基于标准 Windows 服务器。
- ar: موازنة أحمال IIS وتوفر عالٍ مع SafeKit: عنوان IP افتراضي، ومراقبة التطبيقات، وتجاوز فشل تلقائي على خوادم Windows قياسية.

### solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers.md

- en: Kubernetes K3s high availability on two nodes with SafeKit: synchronous replication and automatic failover, without external storage or an etcd quorum.
- fr: Haute disponibilité Kubernetes K3s sur deux nœuds avec SafeKit : réplication synchrone et basculement automatique, sans stockage externe ni quorum etcd.
- de: Hochverfügbarkeit für Kubernetes K3s auf zwei Knoten mit SafeKit: synchrone Replikation und automatisches Failover, ohne externen Speicher oder etcd-Quorum.
- es: Alta disponibilidad de Kubernetes K3s en dos nodos con SafeKit: replicación síncrona y conmutación por error automática, sin almacenamiento externo ni quórum etcd.
- it: Alta disponibilità Kubernetes K3s su due nodi con SafeKit: replica sincrona e failover automatico, senza storage esterno né quorum etcd.
- nl: Hoge beschikbaarheid voor Kubernetes K3s op twee nodes met SafeKit: synchrone replicatie en automatische failover, zonder externe opslag of etcd-quorum.
- pt-br: Alta disponibilidade do Kubernetes K3s em dois nós com SafeKit: replicação síncrona e failover automático, sem armazenamento externo nem quórum etcd.
- pt-pt: Alta disponibilidade de Kubernetes K3s em dois nós com SafeKit: replicação síncrona e failover automático, sem armazenamento externo nem quórum etcd.
- ja: SafeKit による 2 ノードの Kubernetes K3s 高可用性：同期レプリケーションと自動フェイルオーバー。外部ストレージも etcd クォーラムも不要。
- ko: SafeKit으로 구현하는 2노드 Kubernetes K3s 고가용성: 외부 스토리지나 etcd 쿼럼 없이 동기 복제 및 자동 장애 조치.
- zh-hans: 使用 SafeKit 在双节点上实现 Kubernetes K3s 高可用性：同步复制和自动故障转移，无需外部存储或 etcd 仲裁。
- ar: التوفر العالي لـ Kubernetes K3s على عقدتين مع SafeKit: نسخ متزامن وتجاوز فشل تلقائي، دون تخزين خارجي أو نصاب etcd.

### solutions/linux-high-availability-software-synchronous-replication-failover.md

- en: Linux high availability with SafeKit: two-node cluster with synchronous replication and automatic failover of your application, with no SAN.
- fr: Haute disponibilité Linux avec SafeKit : cluster à deux nœuds avec réplication synchrone et basculement automatique de votre application, sans SAN.
- de: Hochverfügbarkeit für Linux mit SafeKit: Cluster mit zwei Knoten, synchroner Replikation und automatischem Failover Ihrer Anwendung, ohne SAN.
- es: Alta disponibilidad de Linux con SafeKit: clúster de dos nodos con replicación síncrona y conmutación por error automática de su aplicación, sin SAN.
- it: Alta disponibilità Linux con SafeKit: cluster a due nodi con replica sincrona e failover automatico della tua applicazione, senza SAN.
- nl: Hoge beschikbaarheid voor Linux met SafeKit: cluster met twee nodes, synchrone replicatie en automatische failover van uw applicatie, zonder SAN.
- pt-br: Alta disponibilidade do Linux com SafeKit: cluster de dois nós com replicação síncrona e failover automático da sua aplicação, sem SAN.
- pt-pt: Alta disponibilidade Linux com SafeKit: cluster de dois nós com replicação síncrona e failover automático da sua aplicação, sem SAN.
- ja: SafeKit による Linux の高可用性：アプリケーションの同期レプリケーションと自動フェイルオーバーを備えた 2 ノードクラスター。SAN 不要。
- ko: SafeKit으로 구현하는 Linux 고가용성: 애플리케이션을 위해 SAN 없이 동기 복제 및 자동 장애 조치를 제공하는 2노드 클러스터.
- zh-hans: 使用 SafeKit 实现 Linux 高可用性：双节点集群，同步复制并自动故障转移您的应用，无需 SAN。
- ar: التوفر العالي على Linux مع SafeKit: مجموعة من عقدتين مع نسخ متزامن وتجاوز فشل تلقائي لتطبيقك، دون SAN.

### solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing.md

- en: KVM high availability without a SAN: SafeKit replicates Linux virtual machines in real time between two servers and restarts them automatically on failure.
- fr: Haute disponibilité KVM sans SAN : SafeKit réplique les machines virtuelles Linux en temps réel entre deux serveurs et les redémarre automatiquement en cas de panne.
- de: Hochverfügbarkeit für KVM ohne SAN: SafeKit repliziert virtuelle Linux-Maschinen in Echtzeit zwischen zwei Servern und startet sie bei einem Ausfall automatisch neu.
- es: Alta disponibilidad de KVM sin SAN: SafeKit replica las máquinas virtuales Linux en tiempo real entre dos servidores y las reinicia automáticamente en caso de fallo.
- it: Alta disponibilità KVM senza SAN: SafeKit replica le macchine virtuali Linux in tempo reale tra due server e le riavvia automaticamente in caso di guasto.
- nl: Hoge beschikbaarheid voor KVM zonder SAN: SafeKit repliceert virtuele Linux-machines in realtime tussen twee servers en herstart ze automatisch bij een storing.
- pt-br: Alta disponibilidade do KVM sem SAN: o SafeKit replica máquinas virtuais Linux em tempo real entre dois servidores e as reinicia automaticamente em caso de falha.
- pt-pt: Alta disponibilidade de KVM sem SAN: o SafeKit replica máquinas virtuais Linux em tempo real entre dois servidores e reinicia-as automaticamente em caso de falha.
- ja: SAN 不要の KVM 高可用性：SafeKit が 2 台のサーバー間で Linux 仮想マシンをリアルタイムにレプリケートし、障害時に自動で再起動します。
- ko: SAN 없는 KVM 고가용성: SafeKit은 서버 2대 간에 Linux 가상 머신을 실시간 복제하고 장애 시 자동으로 재시작합니다.
- zh-hans: 无需 SAN 的 KVM 高可用性：SafeKit 在两台服务器间实时复制 Linux 虚拟机，并在故障时自动重启。
- ar: التوفر العالي لـ KVM دون SAN: ينسخ SafeKit أجهزة Linux الافتراضية في الوقت الفعلي بين خادمين ويعيد تشغيلها تلقائيًا عند حدوث عطل.

### solutions/linux-load-balancing-failover.md

- en: Linux load balancing and high availability with SafeKit: virtual IP, application monitoring and automatic failover on standard Linux servers.
- fr: Équilibrage de charge et haute disponibilité Linux avec SafeKit : IP virtuelle, surveillance applicative et basculement automatique sur serveurs Linux standard.
- de: Lastverteilung und Hochverfügbarkeit für Linux mit SafeKit: virtuelle IP, Anwendungsüberwachung und automatisches Failover auf Linux-Standardservern.
- es: Equilibrio de carga y alta disponibilidad de Linux con SafeKit: IP virtual, supervisión de la aplicación y conmutación por error automática en servidores Linux estándar.
- it: Bilanciamento del carico e alta disponibilità Linux con SafeKit: IP virtuale, monitoraggio applicativo e failover automatico su server Linux standard.
- nl: Loadbalancing en hoge beschikbaarheid voor Linux met SafeKit: virtueel IP-adres, applicatiebewaking en automatische failover op standaard Linux-servers.
- pt-br: Balanceamento de carga e alta disponibilidade do Linux com SafeKit: IP virtual, monitoramento da aplicação e failover automático em servidores Linux padrão.
- pt-pt: Balanceamento de carga e alta disponibilidade Linux com SafeKit: IP virtual, monitorização da aplicação e failover automático em servidores Linux padrão.
- ja: SafeKit による Linux の負荷分散と高可用性：標準 Linux サーバー上で仮想 IP、アプリケーション監視、自動フェイルオーバーを実現。
- ko: SafeKit으로 구현하는 Linux 부하 분산 및 고가용성: 가상 IP, 애플리케이션 모니터링, 자동 장애 조치를 표준 Linux 서버에서 제공합니다.
- zh-hans: 使用 SafeKit 实现 Linux 负载均衡与高可用性：虚拟 IP、应用监控和自动故障转移，基于标准 Linux 服务器。
- ar: موازنة الأحمال على Linux وتوفر عالٍ مع SafeKit: عنوان IP افتراضي، ومراقبة التطبيقات، وتجاوز فشل تلقائي على خوادم Linux قياسية.

### solutions/mariadb-simplest-high-availability-cluster-synchronous-replication-failover-redundant-servers.md

- en: MariaDB high availability with SafeKit: two-node cluster with synchronous replication and automatic failover on Windows or Linux, with no SAN.
- fr: Haute disponibilité MariaDB avec SafeKit : cluster à deux nœuds avec réplication synchrone et basculement automatique sous Windows ou Linux, sans SAN.
- de: Hochverfügbarkeit für MariaDB mit SafeKit: Cluster mit zwei Knoten, synchroner Replikation und automatischem Failover unter Windows oder Linux, ohne SAN.
- es: Alta disponibilidad de MariaDB con SafeKit: clúster de dos nodos con replicación síncrona y conmutación por error automática en Windows o Linux, sin SAN.
- it: Alta disponibilità MariaDB con SafeKit: cluster a due nodi con replica sincrona e failover automatico su Windows o Linux, senza SAN.
- nl: Hoge beschikbaarheid voor MariaDB met SafeKit: cluster met twee nodes, synchrone replicatie en automatische failover op Windows of Linux, zonder SAN.
- pt-br: Alta disponibilidade do MariaDB com SafeKit: cluster de dois nós com replicação síncrona e failover automático no Windows ou Linux, sem SAN.
- pt-pt: Alta disponibilidade de MariaDB com SafeKit: cluster de dois nós com replicação síncrona e failover automático em Windows ou Linux, sem SAN.
- ja: SafeKit による MariaDB の高可用性：Windows または Linux で同期レプリケーションと自動フェイルオーバーを備えた 2 ノードクラスター。SAN 不要。
- ko: SafeKit으로 구현하는 MariaDB 고가용성: Windows 또는 Linux에서 SAN 없이 동기 복제 및 자동 장애 조치를 제공하는 2노드 클러스터.
- zh-hans: 使用 SafeKit 实现 MariaDB 高可用性：双节点集群，同步复制和自动故障转移，支持 Windows 或 Linux，无需 SAN。
- ar: التوفر العالي لـ MariaDB مع SafeKit: مجموعة من عقدتين مع نسخ متزامن وتجاوز فشل تلقائي على Windows أو Linux، دون SAN.

### solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover.md

- en: Milestone XProtect high availability with SafeKit: synchronous replication and automatic failover of the Management Server and its SQL database.
- fr: Haute disponibilité Milestone XProtect avec SafeKit : réplication synchrone et basculement automatique du Management Server et de sa base SQL.
- de: Hochverfügbarkeit für Milestone XProtect mit SafeKit: synchrone Replikation und automatisches Failover des Management Server und seiner SQL-Datenbank.
- es: Alta disponibilidad de Milestone XProtect con SafeKit: replicación síncrona y conmutación por error automática del Management Server y su base de datos SQL.
- it: Alta disponibilità Milestone XProtect con SafeKit: replica sincrona e failover automatico del Management Server e del suo database SQL.
- nl: Hoge beschikbaarheid voor Milestone XProtect met SafeKit: synchrone replicatie en automatische failover van de Management Server en de SQL-database.
- pt-br: Alta disponibilidade do Milestone XProtect com SafeKit: replicação síncrona e failover automático do Management Server e do seu banco de dados SQL.
- pt-pt: Alta disponibilidade de Milestone XProtect com SafeKit: replicação síncrona e failover automático do Management Server e da sua base de dados SQL.
- ja: SafeKit による Milestone XProtect の高可用性：Management Server と SQL データベースの同期レプリケーションと自動フェイルオーバー。
- ko: SafeKit으로 구현하는 Milestone XProtect 고가용성: Management Server와 SQL 데이터베이스의 동기 복제 및 자동 장애 조치.
- zh-hans: 使用 SafeKit 实现 Milestone XProtect 高可用性：Management Server 及其 SQL 数据库的同步复制和自动故障转移。
- ar: التوفر العالي لـ Milestone XProtect مع SafeKit: نسخ متزامن وتجاوز فشل تلقائي لـ Management Server وقاعدة بيانات SQL الخاصة به.

### solutions/mysql-high-availability-synchronous-replication-failover.md

- en: MySQL high availability with SafeKit: two-node cluster with synchronous replication and automatic failover on Windows or Linux, with no SAN.
- fr: Haute disponibilité MySQL avec SafeKit : cluster à deux nœuds avec réplication synchrone et basculement automatique sous Windows ou Linux, sans SAN.
- de: Hochverfügbarkeit für MySQL mit SafeKit: Cluster mit zwei Knoten, synchroner Replikation und automatischem Failover unter Windows oder Linux, ohne SAN.
- es: Alta disponibilidad de MySQL con SafeKit: clúster de dos nodos con replicación síncrona y conmutación por error automática en Windows o Linux, sin SAN.
- it: Alta disponibilità MySQL con SafeKit: cluster a due nodi con replica sincrona e failover automatico su Windows o Linux, senza SAN.
- nl: Hoge beschikbaarheid voor MySQL met SafeKit: cluster met twee nodes, synchrone replicatie en automatische failover op Windows of Linux, zonder SAN.
- pt-br: Alta disponibilidade do MySQL com SafeKit: cluster de dois nós com replicação síncrona e failover automático no Windows ou Linux, sem SAN.
- pt-pt: Alta disponibilidade de MySQL com SafeKit: cluster de dois nós com replicação síncrona e failover automático em Windows ou Linux, sem SAN.
- ja: SafeKit による MySQL の高可用性：Windows または Linux で同期レプリケーションと自動フェイルオーバーを備えた 2 ノードクラスター。SAN 不要。
- ko: SafeKit으로 구현하는 MySQL 고가용성: Windows 또는 Linux에서 SAN 없이 동기 복제 및 자동 장애 조치를 제공하는 2노드 클러스터.
- zh-hans: 使用 SafeKit 实现 MySQL 高可用性：双节点集群，同步复制和自动故障转移，支持 Windows 或 Linux，无需 SAN。
- ar: التوفر العالي لـ MySQL مع SafeKit: مجموعة من عقدتين مع نسخ متزامن وتجاوز فشل تلقائي على Windows أو Linux، دون SAN.

### solutions/nedap-high-availability-synchronous-replication-failover.md

- en: Nedap AEOS high availability with SafeKit: two-node cluster with synchronous replication and automatic failover of access control, with no SAN.
- fr: Haute disponibilité Nedap AEOS avec SafeKit : cluster à deux nœuds avec réplication synchrone et basculement automatique du contrôle d’accès, sans SAN.
- de: Hochverfügbarkeit für Nedap AEOS mit SafeKit: Cluster mit zwei Knoten, synchroner Replikation und automatischem Failover der Zutrittskontrolle, ohne SAN.
- es: Alta disponibilidad de Nedap AEOS con SafeKit: clúster de dos nodos con replicación síncrona y conmutación por error automática del control de acceso, sin SAN.
- it: Alta disponibilità Nedap AEOS con SafeKit: cluster a due nodi con replica sincrona e failover automatico del controllo accessi, senza SAN.
- nl: Hoge beschikbaarheid voor Nedap AEOS met SafeKit: cluster met twee nodes, synchrone replicatie en automatische failover van de toegangscontrole, zonder SAN.
- pt-br: Alta disponibilidade do Nedap AEOS com SafeKit: cluster de dois nós com replicação síncrona e failover automático do controle de acesso, sem SAN.
- pt-pt: Alta disponibilidade de Nedap AEOS com SafeKit: cluster de dois nós com replicação síncrona e failover automático do controlo de acessos, sem SAN.
- ja: SafeKit による Nedap AEOS の高可用性：入退室管理の同期レプリケーションと自動フェイルオーバーを備えた 2 ノードクラスター。SAN 不要。
- ko: SafeKit으로 구현하는 Nedap AEOS 고가용성: SAN 없이 출입 통제의 동기 복제 및 자동 장애 조치를 제공하는 2노드 클러스터.
- zh-hans: 使用 SafeKit 实现 Nedap AEOS 高可用性：双节点集群，门禁系统的同步复制和自动故障转移，无需 SAN。
- ar: التوفر العالي لـ Nedap AEOS مع SafeKit: مجموعة من عقدتين مع نسخ متزامن وتجاوز فشل تلقائي للتحكم في الوصول، دون SAN.

### solutions/nginx-the-simplest-load-balancing-cluster-with-failover.md

- en: NGINX load balancing and high availability with SafeKit: virtual IP, application monitoring and automatic failover on standard servers.
- fr: Équilibrage de charge et haute disponibilité NGINX avec SafeKit : IP virtuelle, surveillance applicative et basculement automatique sur serveurs standard.
- de: Lastverteilung und Hochverfügbarkeit für NGINX mit SafeKit: virtuelle IP, Anwendungsüberwachung und automatisches Failover auf Standardservern.
- es: Equilibrio de carga y alta disponibilidad de NGINX con SafeKit: IP virtual, supervisión de la aplicación y conmutación por error automática en servidores estándar.
- it: Bilanciamento del carico e alta disponibilità NGINX con SafeKit: IP virtuale, monitoraggio applicativo e failover automatico su server standard.
- nl: Loadbalancing en hoge beschikbaarheid voor NGINX met SafeKit: virtueel IP-adres, applicatiebewaking en automatische failover op standaardservers.
- pt-br: Balanceamento de carga e alta disponibilidade do NGINX com SafeKit: IP virtual, monitoramento da aplicação e failover automático em servidores padrão.
- pt-pt: Balanceamento de carga e alta disponibilidade do NGINX com SafeKit: IP virtual, monitorização da aplicação e failover automático em servidores padrão.
- ja: SafeKit による NGINX の負荷分散と高可用性：標準サーバー上で仮想 IP、アプリケーション監視、自動フェイルオーバーを実現。
- ko: SafeKit으로 구현하는 NGINX 부하 분산 및 고가용성: 가상 IP, 애플리케이션 모니터링, 자동 장애 조치를 표준 서버에서 제공합니다.
- zh-hans: 使用 SafeKit 实现 NGINX 负载均衡与高可用性：虚拟 IP、应用监控和自动故障转移，基于标准服务器。
- ar: موازنة أحمال NGINX وتوفر عالٍ مع SafeKit: عنوان IP افتراضي، ومراقبة التطبيقات، وتجاوز فشل تلقائي على خوادم قياسية.

### solutions/oracle-high-availability-synchronous-replication-failover.md

- en: Oracle high availability with SafeKit: two-node cluster with synchronous replication and automatic failover on Windows or Linux, with no SAN.
- fr: Haute disponibilité Oracle avec SafeKit : cluster à deux nœuds avec réplication synchrone et basculement automatique sous Windows ou Linux, sans SAN.
- de: Hochverfügbarkeit für Oracle mit SafeKit: Cluster mit zwei Knoten, synchroner Replikation und automatischem Failover unter Windows oder Linux, ohne SAN.
- es: Alta disponibilidad de Oracle con SafeKit: clúster de dos nodos con replicación síncrona y conmutación por error automática en Windows o Linux, sin SAN.
- it: Alta disponibilità Oracle con SafeKit: cluster a due nodi con replica sincrona e failover automatico su Windows o Linux, senza SAN.
- nl: Hoge beschikbaarheid voor Oracle met SafeKit: cluster met twee nodes, synchrone replicatie en automatische failover op Windows of Linux, zonder SAN.
- pt-br: Alta disponibilidade do Oracle com SafeKit: cluster de dois nós com replicação síncrona e failover automático no Windows ou Linux, sem SAN.
- pt-pt: Alta disponibilidade de Oracle com SafeKit: cluster de dois nós com replicação síncrona e failover automático em Windows ou Linux, sem SAN.
- ja: SafeKit による Oracle の高可用性：Windows または Linux で同期レプリケーションと自動フェイルオーバーを備えた 2 ノードクラスター。SAN 不要。
- ko: SafeKit으로 구현하는 Oracle 고가용성: Windows 또는 Linux에서 SAN 없이 동기 복제 및 자동 장애 조치를 제공하는 2노드 클러스터.
- zh-hans: 使用 SafeKit 实现 Oracle 高可用性：双节点集群，同步复制和自动故障转移，支持 Windows 或 Linux，无需 SAN。
- ar: التوفر العالي لـ Oracle مع SafeKit: مجموعة من عقدتين مع نسخ متزامن وتجاوز فشل تلقائي على Windows أو Linux، دون SAN.

### solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers.md

- en: Podman high availability with SafeKit: synchronous replication of container data and automatic failover between two Linux servers, with no SAN.
- fr: Haute disponibilité Podman avec SafeKit : réplication synchrone des données des conteneurs et basculement automatique entre deux serveurs Linux, sans SAN.
- de: Hochverfügbarkeit für Podman mit SafeKit: synchrone Replikation der Containerdaten und automatisches Failover zwischen zwei Linux-Servern, ohne SAN.
- es: Alta disponibilidad de Podman con SafeKit: replicación síncrona de los datos de los contenedores y conmutación por error automática entre dos servidores Linux, sin SAN.
- it: Alta disponibilità Podman con SafeKit: replica sincrona dei dati dei container e failover automatico tra due server Linux, senza SAN.
- nl: Hoge beschikbaarheid voor Podman met SafeKit: synchrone replicatie van containergegevens en automatische failover tussen twee Linux-servers, zonder SAN.
- pt-br: Alta disponibilidade do Podman com SafeKit: replicação síncrona dos dados dos contêineres e failover automático entre dois servidores Linux, sem SAN.
- pt-pt: Alta disponibilidade de Podman com SafeKit: replicação síncrona dos dados dos contentores e failover automático entre dois servidores Linux, sem SAN.
- ja: SafeKit による Podman の高可用性：Linux サーバー 2 台間でコンテナデータの同期レプリケーションと自動フェイルオーバー。SAN 不要。
- ko: SafeKit으로 구현하는 Podman 고가용성: SAN 없이 Linux 서버 2대 간 컨테이너 데이터의 동기 복제 및 자동 장애 조치.
- zh-hans: 使用 SafeKit 实现 Podman 高可用性：在两台 Linux 服务器间同步复制容器数据并自动故障转移，无需 SAN。
- ar: التوفر العالي لـ Podman مع SafeKit: نسخ متزامن لبيانات الحاويات وتجاوز فشل تلقائي بين خادمين Linux، دون SAN.

### solutions/postgresql-high-availability-synchronous-replication-failover.md

- en: PostgreSQL high availability with SafeKit: two-node cluster with synchronous replication and automatic failover on Windows or Linux, with no SAN.
- fr: Haute disponibilité PostgreSQL avec SafeKit : cluster à deux nœuds avec réplication synchrone et basculement automatique sous Windows ou Linux, sans SAN.
- de: Hochverfügbarkeit für PostgreSQL mit SafeKit: Cluster mit zwei Knoten, synchroner Replikation und automatischem Failover unter Windows oder Linux, ohne SAN.
- es: Alta disponibilidad de PostgreSQL con SafeKit: clúster de dos nodos con replicación síncrona y conmutación por error automática en Windows o Linux, sin SAN.
- it: Alta disponibilità PostgreSQL con SafeKit: cluster a due nodi con replica sincrona e failover automatico su Windows o Linux, senza SAN.
- nl: Hoge beschikbaarheid voor PostgreSQL met SafeKit: cluster met twee nodes, synchrone replicatie en automatische failover op Windows of Linux, zonder SAN.
- pt-br: Alta disponibilidade do PostgreSQL com SafeKit: cluster de dois nós com replicação síncrona e failover automático no Windows ou Linux, sem SAN.
- pt-pt: Alta disponibilidade de PostgreSQL com SafeKit: cluster de dois nós com replicação síncrona e failover automático em Windows ou Linux, sem SAN.
- ja: SafeKit による PostgreSQL の高可用性：Windows または Linux で同期レプリケーションと自動フェイルオーバーの 2 ノードクラスター。SAN 不要。
- ko: SafeKit으로 구현하는 PostgreSQL 고가용성: Windows 또는 Linux에서 SAN 없이 동기 복제 및 자동 장애 조치를 제공하는 2노드 클러스터.
- zh-hans: 使用 SafeKit 实现 PostgreSQL 高可用性：双节点集群，同步复制和自动故障转移，支持 Windows 或 Linux，无需 SAN。
- ar: التوفر العالي لـ PostgreSQL مع SafeKit: مجموعة من عقدتين مع نسخ متزامن وتجاوز فشل تلقائي على Windows أو Linux، دون SAN.

### solutions/siemens-desigo-cc-redundancy-high-availability-cluster-active-active.md

- en: High availability for Siemens Desigo CC: SafeKit replicates its Hyper-V virtual machine in real time between two servers with automatic failover, no SAN.
- fr: Haute disponibilité pour Siemens Desigo CC : SafeKit réplique sa machine virtuelle Hyper-V en temps réel entre deux serveurs avec basculement automatique, sans SAN.
- de: Hochverfügbarkeit für Siemens Desigo CC: SafeKit repliziert dessen Hyper-V-VM in Echtzeit zwischen zwei Servern mit automatischem Failover, ohne SAN.
- es: Alta disponibilidad para Siemens Desigo CC: SafeKit replica su máquina virtual Hyper-V en tiempo real entre dos servidores con conmutación por error automática, sin SAN.
- it: Alta disponibilità per Siemens Desigo CC: SafeKit replica la sua macchina virtuale Hyper-V in tempo reale tra due server con failover automatico, senza SAN.
- nl: Hoge beschikbaarheid voor Siemens Desigo CC: SafeKit repliceert de virtuele Hyper-V-machine in realtime tussen twee servers met automatische failover, zonder SAN.
- pt-br: Alta disponibilidade para o Siemens Desigo CC: o SafeKit replica sua máquina virtual Hyper-V em tempo real entre dois servidores com failover automático, sem SAN.
- pt-pt: Alta disponibilidade para Siemens Desigo CC: o SafeKit replica a sua máquina virtual Hyper-V em tempo real entre dois servidores com failover automático, sem SAN.
- ja: Siemens Desigo CC の高可用性：SafeKit が Hyper-V 仮想マシンを 2 台のサーバー間でリアルタイムに複製し、自動フェイルオーバー。SAN 不要。
- ko: Siemens Desigo CC 고가용성: SafeKit은 SAN 없이 Hyper-V 가상 머신을 서버 2대 간에 실시간 복제하고 자동 장애 조치를 수행합니다.
- zh-hans: Siemens Desigo CC 高可用性：SafeKit 在两台服务器间实时复制其 Hyper-V 虚拟机并自动故障转移，无需 SAN。
- ar: التوفر العالي لـ Siemens Desigo CC: ينسخ SafeKit جهازه الافتراضي Hyper-V في الوقت الفعلي بين خادمين مع تجاوز فشل تلقائي، دون SAN.

### solutions/siemens-simatic-pcs-7-redundancy-high-availability-cluster-active-active.md

- en: High availability for Siemens SIMATIC PCS 7: SafeKit replicates its Hyper-V virtual machine between two servers with automatic failover and no SAN.
- fr: Haute disponibilité pour Siemens SIMATIC PCS 7 : SafeKit réplique sa machine virtuelle Hyper-V entre deux serveurs avec basculement automatique, sans SAN.
- de: Hochverfügbarkeit für Siemens SIMATIC PCS 7: SafeKit repliziert dessen Hyper-V-VM zwischen zwei Servern mit automatischem Failover, ohne SAN.
- es: Alta disponibilidad para Siemens SIMATIC PCS 7: SafeKit replica su máquina virtual Hyper-V entre dos servidores con conmutación por error automática, sin SAN.
- it: Alta disponibilità per Siemens SIMATIC PCS 7: SafeKit replica la sua macchina virtuale Hyper-V tra due server con failover automatico, senza SAN.
- nl: Hoge beschikbaarheid voor Siemens SIMATIC PCS 7: SafeKit repliceert de virtuele Hyper-V-machine tussen twee servers met automatische failover, zonder SAN.
- pt-br: Alta disponibilidade para o Siemens SIMATIC PCS 7: o SafeKit replica sua máquina virtual Hyper-V entre dois servidores com failover automático, sem SAN.
- pt-pt: Alta disponibilidade para Siemens SIMATIC PCS 7: o SafeKit replica a sua máquina virtual Hyper-V entre dois servidores com failover automático, sem SAN.
- ja: Siemens SIMATIC PCS 7 の高可用性：SafeKit が Hyper-V 仮想マシンを 2 台のサーバー間でレプリケートし、自動フェイルオーバー。SAN 不要。
- ko: Siemens SIMATIC PCS 7 고가용성: SafeKit은 SAN 없이 Hyper-V 가상 머신을 서버 2대 간에 복제하고 자동 장애 조치를 수행합니다.
- zh-hans: Siemens SIMATIC PCS 7 高可用性：SafeKit 在两台服务器间复制其 Hyper-V 虚拟机并自动故障转移，无需 SAN。
- ar: التوفر العالي لـ Siemens SIMATIC PCS 7: ينسخ SafeKit جهازه الافتراضي Hyper-V بين خادمين مع تجاوز فشل تلقائي ودون SAN.

### solutions/siemens-simatic-wincc-redundancy-high-availability-cluster-active-active.md

- en: High availability for Siemens SIMATIC WinCC SCADA: SafeKit replicates its Hyper-V virtual machine between two servers with automatic failover, no SAN.
- fr: Haute disponibilité pour le SCADA Siemens SIMATIC WinCC : SafeKit réplique sa machine virtuelle Hyper-V entre deux serveurs avec basculement automatique, sans SAN.
- de: Hochverfügbarkeit für das SCADA-System Siemens SIMATIC WinCC: SafeKit repliziert dessen Hyper-V-VM zwischen zwei Servern mit automatischem Failover, ohne SAN.
- es: Alta disponibilidad para el SCADA Siemens SIMATIC WinCC: SafeKit replica su máquina virtual Hyper-V entre dos servidores con conmutación por error automática, sin SAN.
- it: Alta disponibilità per Siemens SIMATIC WinCC SCADA: SafeKit replica la sua macchina virtuale Hyper-V tra due server con failover automatico, senza SAN.
- nl: Hoge beschikbaarheid voor Siemens SIMATIC WinCC SCADA: SafeKit repliceert de virtuele Hyper-V-machine tussen twee servers met automatische failover, zonder SAN.
- pt-br: Alta disponibilidade para o SCADA Siemens SIMATIC WinCC: o SafeKit replica sua máquina virtual Hyper-V entre dois servidores com failover automático, sem SAN.
- pt-pt: Alta disponibilidade para o SCADA Siemens SIMATIC WinCC: o SafeKit replica a sua máquina virtual Hyper-V entre dois servidores com failover automático, sem SAN.
- ja: Siemens SIMATIC WinCC SCADA の高可用性：SafeKit が Hyper-V 仮想マシンを 2 台のサーバー間で複製し自動フェイルオーバー。SAN 不要。
- ko: Siemens SIMATIC WinCC SCADA 고가용성: SafeKit은 SAN 없이 Hyper-V 가상 머신을 서버 2대 간에 복제하고 자동 장애 조치를 수행합니다.
- zh-hans: Siemens SIMATIC WinCC SCADA 高可用性：SafeKit 在两台服务器间复制其 Hyper-V 虚拟机并自动故障转移，无需 SAN。
- ar: التوفر العالي لنظام SCADA Siemens SIMATIC WinCC: ينسخ SafeKit جهازه الافتراضي Hyper-V بين خادمين مع تجاوز فشل تلقائي، دون SAN.

### solutions/siemens-sipass-redundancy-high-availability-cluster-active-active.md

- en: High availability for Siemens SiPass access control: SafeKit replicates its Hyper-V virtual machine between two servers with automatic failover, no SAN.
- fr: Haute disponibilité pour le contrôle d’accès Siemens SiPass : SafeKit réplique sa machine virtuelle Hyper-V entre deux serveurs avec basculement automatique, sans SAN.
- de: Hochverfügbarkeit für die Zutrittskontrolle Siemens SiPass: SafeKit repliziert deren Hyper-V-VM zwischen zwei Servern mit automatischem Failover, ohne SAN.
- es: Alta disponibilidad para el control de acceso Siemens SiPass: SafeKit replica su máquina virtual Hyper-V entre dos servidores con conmutación por error automática, sin SAN.
- it: Alta disponibilità per il controllo accessi Siemens SiPass: SafeKit replica la sua macchina virtuale Hyper-V tra due server con failover automatico, senza SAN.
- nl: Hoge beschikbaarheid voor Siemens SiPass-toegangscontrole: SafeKit repliceert de virtuele Hyper-V-machine tussen twee servers met automatische failover, zonder SAN.
- pt-br: Alta disponibilidade para o controle de acesso Siemens SiPass: o SafeKit replica sua máquina virtual Hyper-V entre dois servidores com failover automático, sem SAN.
- pt-pt: Alta disponibilidade para o controlo de acessos Siemens SiPass: o SafeKit replica a sua máquina virtual Hyper-V entre dois servidores com failover automático, sem SAN.
- ja: Siemens SiPass 入退室管理の高可用性：SafeKit が Hyper-V 仮想マシンを 2 台のサーバー間でレプリケートし、自動フェイルオーバー。SAN 不要。
- ko: Siemens SiPass 출입 통제 고가용성: SafeKit은 SAN 없이 Hyper-V 가상 머신을 서버 2대 간에 복제하고 자동 장애 조치를 수행합니다.
- zh-hans: Siemens SiPass 门禁系统高可用性：SafeKit 在两台服务器间复制其 Hyper-V 虚拟机并自动故障转移，无需 SAN。
- ar: التوفر العالي لنظام التحكم في الوصول Siemens SiPass: ينسخ SafeKit جهازه الافتراضي Hyper-V بين خادمين مع تجاوز فشل تلقائي، دون SAN.

### solutions/siemens-siport-redundancy-high-availability-cluster-active-active.md

- en: High availability for Siemens SIPORT access control: SafeKit replicates its Hyper-V virtual machine between two servers with automatic failover, no SAN.
- fr: Haute disponibilité pour le contrôle d’accès Siemens SIPORT : SafeKit réplique sa machine virtuelle Hyper-V entre deux serveurs avec basculement automatique, sans SAN.
- de: Hochverfügbarkeit für die Zutrittskontrolle Siemens SIPORT: SafeKit repliziert deren Hyper-V-VM zwischen zwei Servern mit automatischem Failover, ohne SAN.
- es: Alta disponibilidad para el control de acceso Siemens SIPORT: SafeKit replica su máquina virtual Hyper-V entre dos servidores con conmutación por error automática, sin SAN.
- it: Alta disponibilità per il controllo accessi Siemens SIPORT: SafeKit replica la sua macchina virtuale Hyper-V tra due server con failover automatico, senza SAN.
- nl: Hoge beschikbaarheid voor Siemens SIPORT-toegangscontrole: SafeKit repliceert de virtuele Hyper-V-machine tussen twee servers met automatische failover, zonder SAN.
- pt-br: Alta disponibilidade para o controle de acesso Siemens SIPORT: o SafeKit replica sua máquina virtual Hyper-V entre dois servidores com failover automático, sem SAN.
- pt-pt: Alta disponibilidade para o controlo de acessos Siemens SIPORT: o SafeKit replica a sua máquina virtual Hyper-V entre dois servidores com failover automático, sem SAN.
- ja: Siemens SIPORT 入退室管理の高可用性：SafeKit が Hyper-V 仮想マシンを 2 台のサーバー間でレプリケートし、自動フェイルオーバー。SAN 不要。
- ko: Siemens SIPORT 출입 통제 고가용성: SafeKit은 SAN 없이 Hyper-V 가상 머신을 서버 2대 간에 복제하고 자동 장애 조치를 수행합니다.
- zh-hans: Siemens SIPORT 门禁系统高可用性：SafeKit 在两台服务器间复制其 Hyper-V 虚拟机并自动故障转移，无需 SAN。
- ar: التوفر العالي لنظام التحكم في الوصول Siemens SIPORT: ينسخ SafeKit جهازه الافتراضي Hyper-V بين خادمين مع تجاوز فشل تلقائي، دون SAN.

### solutions/siemens-siveillance-redundancy-high-availability-cluster-active-active.md

- en: High availability for the Siemens Siveillance suite: SafeKit replicates Hyper-V virtual machines between two active servers with automatic failover.
- fr: Haute disponibilité pour la suite Siemens Siveillance : SafeKit réplique les machines virtuelles Hyper-V entre deux serveurs actifs avec basculement automatique.
- de: Hochverfügbarkeit für die Siemens Siveillance Suite: SafeKit repliziert Hyper-V-VMs zwischen zwei aktiven Servern mit automatischem Failover.
- es: Alta disponibilidad para la suite Siemens Siveillance: SafeKit replica máquinas virtuales Hyper-V entre dos servidores activos con conmutación por error automática.
- it: Alta disponibilità per la suite Siemens Siveillance: SafeKit replica le macchine virtuali Hyper-V tra due server attivi con failover automatico.
- nl: Hoge beschikbaarheid voor de Siemens Siveillance-suite: SafeKit repliceert virtuele Hyper-V-machines tussen twee actieve servers met automatische failover.
- pt-br: Alta disponibilidade para a suíte Siemens Siveillance: o SafeKit replica máquinas virtuais Hyper-V entre dois servidores ativos com failover automático.
- pt-pt: Alta disponibilidade para a suite Siemens Siveillance: o SafeKit replica máquinas virtuais Hyper-V entre dois servidores ativos com failover automático.
- ja: Siemens Siveillance スイートの高可用性：SafeKit が Hyper-V 仮想マシンを 2 台のアクティブサーバー間でレプリケートし、自動フェイルオーバー。
- ko: Siemens Siveillance 제품군 고가용성: SafeKit은 Hyper-V 가상 머신을 액티브 서버 2대 간에 복제하고 자동 장애 조치를 수행합니다.
- zh-hans: Siemens Siveillance 套件高可用性：SafeKit 在两台活动服务器间复制 Hyper-V 虚拟机并自动故障转移。
- ar: التوفر العالي لمجموعة Siemens Siveillance: ينسخ SafeKit أجهزة Hyper-V الافتراضية بين خادمين نشطين مع تجاوز فشل تلقائي.

### solutions/siemens-siveillance-vms-the-simplest-high-availability-cluster-between-two-redundant-servers.md

- en: Siemens Siveillance VMS high availability with SafeKit: the SiveillanceVMS.safe module provides real-time replication and failover on two servers.
- fr: Haute disponibilité Siemens Siveillance VMS avec SafeKit : le module SiveillanceVMS.safe assure réplication en temps réel et basculement sur deux serveurs.
- de: Hochverfügbarkeit für Siemens Siveillance VMS mit SafeKit: Das Modul SiveillanceVMS.safe bietet Echtzeit-Replikation und Failover auf zwei Servern.
- es: Alta disponibilidad de Siemens Siveillance VMS con SafeKit: el módulo SiveillanceVMS.safe ofrece replicación en tiempo real y conmutación por error en dos servidores.
- it: Alta disponibilità Siemens Siveillance VMS con SafeKit: il modulo SiveillanceVMS.safe offre replica in tempo reale e failover su due server.
- nl: Hoge beschikbaarheid voor Siemens Siveillance VMS met SafeKit: de module SiveillanceVMS.safe biedt realtime replicatie en failover op twee servers.
- pt-br: Alta disponibilidade do Siemens Siveillance VMS com SafeKit: o módulo SiveillanceVMS.safe oferece replicação em tempo real e failover em dois servidores.
- pt-pt: Alta disponibilidade de Siemens Siveillance VMS com SafeKit: o módulo SiveillanceVMS.safe oferece replicação em tempo real e failover em dois servidores.
- ja: Siemens Siveillance VMS の高可用性：SafeKit の SiveillanceVMS.safe モジュールで 2 台間のリアルタイムレプリケーションとフェイルオーバー。
- ko: SafeKit으로 구현하는 Siemens Siveillance VMS 고가용성: SiveillanceVMS.safe 모듈이 서버 2대에서 실시간 복제 및 장애 조치를 제공합니다.
- zh-hans: 使用 SafeKit 实现 Siemens Siveillance VMS 高可用性：SiveillanceVMS.safe 模块在两台服务器上提供实时复制和故障转移。
- ar: التوفر العالي لـ Siemens Siveillance VMS مع SafeKit: توفر وحدة SiveillanceVMS.safe النسخ في الوقت الفعلي وتجاوز الفشل على خادمين.

### solutions/sql-server-high-availability-synchronous-replication-failover.md

- en: SQL Server high availability with SafeKit: two-node cluster with synchronous replication and automatic failover, for all editions, with no SAN.
- fr: Haute disponibilité SQL Server avec SafeKit : cluster à deux nœuds avec réplication synchrone et basculement automatique, pour toutes les éditions, sans SAN.
- de: Hochverfügbarkeit für SQL Server mit SafeKit: Cluster mit zwei Knoten, synchroner Replikation und automatischem Failover, für alle Editionen, ohne SAN.
- es: Alta disponibilidad de SQL Server con SafeKit: clúster de dos nodos con replicación síncrona y conmutación por error automática, para todas las ediciones, sin SAN.
- it: Alta disponibilità SQL Server con SafeKit: cluster a due nodi con replica sincrona e failover automatico, per tutte le edizioni, senza SAN.
- nl: Hoge beschikbaarheid voor SQL Server met SafeKit: cluster met twee nodes, synchrone replicatie en automatische failover voor alle edities, zonder SAN.
- pt-br: Alta disponibilidade do SQL Server com SafeKit: cluster de dois nós com replicação síncrona e failover automático, para todas as edições, sem SAN.
- pt-pt: Alta disponibilidade de SQL Server com SafeKit: cluster de dois nós com replicação síncrona e failover automático, para todas as edições, sem SAN.
- ja: SafeKit による SQL Server の高可用性：同期レプリケーションと自動フェイルオーバーを備えた 2 ノードクラスター。全エディション対応、SAN 不要。
- ko: SafeKit으로 구현하는 SQL Server 고가용성: 모든 에디션에서 SAN 없이 동기 복제 및 자동 장애 조치를 제공하는 2노드 클러스터.
- zh-hans: 使用 SafeKit 实现 SQL Server 高可用性：双节点集群，同步复制和自动故障转移，适用于所有版本，无需 SAN。
- ar: التوفر العالي لـ SQL Server مع SafeKit: مجموعة من عقدتين مع نسخ متزامن وتجاوز فشل تلقائي، لجميع الإصدارات، دون SAN.

### solutions/windows-high-availability-software-synchronous-replication-failover.md

- en: Windows high availability with SafeKit: two-node cluster with synchronous replication and automatic failover of your application, with no SAN.
- fr: Haute disponibilité Windows avec SafeKit : cluster à deux nœuds avec réplication synchrone et basculement automatique de votre application, sans SAN.
- de: Hochverfügbarkeit für Windows mit SafeKit: Cluster mit zwei Knoten, synchroner Replikation und automatischem Failover Ihrer Anwendung, ohne SAN.
- es: Alta disponibilidad de Windows con SafeKit: clúster de dos nodos con replicación síncrona y conmutación por error automática de su aplicación, sin SAN.
- it: Alta disponibilità Windows con SafeKit: cluster a due nodi con replica sincrona e failover automatico della tua applicazione, senza SAN.
- nl: Hoge beschikbaarheid voor Windows met SafeKit: cluster met twee nodes, synchrone replicatie en automatische failover van uw applicatie, zonder SAN.
- pt-br: Alta disponibilidade do Windows com SafeKit: cluster de dois nós com replicação síncrona e failover automático da sua aplicação, sem SAN.
- pt-pt: Alta disponibilidade Windows com SafeKit: cluster de dois nós com replicação síncrona e failover automático da sua aplicação, sem SAN.
- ja: SafeKit による Windows の高可用性：アプリケーションの同期レプリケーションと自動フェイルオーバーを備えた 2 ノードクラスター。SAN 不要。
- ko: SafeKit으로 구현하는 Windows 고가용성: 애플리케이션을 위해 SAN 없이 동기 복제 및 자동 장애 조치를 제공하는 2노드 클러스터.
- zh-hans: 使用 SafeKit 实现 Windows 高可用性：双节点集群，同步复制并自动故障转移您的应用，无需 SAN。
- ar: التوفر العالي على Windows مع SafeKit: مجموعة من عقدتين مع نسخ متزامن وتجاوز فشل تلقائي لتطبيقك، دون SAN.

### solutions/windows-load-balancing-failover.md

- en: Windows load balancing and high availability with SafeKit: virtual IP, application monitoring and automatic failover on standard Windows servers.
- fr: Équilibrage de charge et haute disponibilité Windows avec SafeKit : IP virtuelle, surveillance applicative et basculement automatique sur serveurs Windows standard.
- de: Lastverteilung und Hochverfügbarkeit für Windows mit SafeKit: virtuelle IP, Anwendungsüberwachung und automatisches Failover auf Windows-Standardservern.
- es: Equilibrio de carga y alta disponibilidad de Windows con SafeKit: IP virtual, supervisión de la aplicación y conmutación por error automática en servidores Windows estándar.
- it: Bilanciamento del carico e alta disponibilità Windows con SafeKit: IP virtuale, monitoraggio applicativo e failover automatico su server Windows standard.
- nl: Loadbalancing en hoge beschikbaarheid voor Windows met SafeKit: virtueel IP-adres, applicatiebewaking en automatische failover op standaard Windows-servers.
- pt-br: Balanceamento de carga e alta disponibilidade do Windows com SafeKit: IP virtual, monitoramento da aplicação e failover automático em servidores Windows padrão.
- pt-pt: Balanceamento de carga e alta disponibilidade Windows com SafeKit: IP virtual, monitorização da aplicação e failover automático em servidores Windows padrão.
- ja: SafeKit による Windows の負荷分散と高可用性：標準 Windows サーバー上で仮想 IP、アプリケーション監視、自動フェイルオーバーを実現。
- ko: SafeKit으로 구현하는 Windows 부하 분산 및 고가용성: 가상 IP, 애플리케이션 모니터링, 자동 장애 조치를 표준 Windows 서버에서 제공합니다.
- zh-hans: 使用 SafeKit 实现 Windows 负载均衡与高可用性：虚拟 IP、应用监控和自动故障转移，基于标准 Windows 服务器。
- ar: موازنة الأحمال على Windows وتوفر عالٍ مع SafeKit: عنوان IP افتراضي، ومراقبة التطبيقات، وتجاوز فشل تلقائي على خوادم Windows قياسية.

### use-cases/_index.md

- en: SafeKit customer use cases: high availability for OEM software, edge sites, VMS, access control, SCADA, building management, air traffic and metro control.
- fr: Cas clients SafeKit : haute disponibilité pour logiciels OEM, sites edge, VMS, contrôle d’accès, SCADA, gestion technique du bâtiment, trafic aérien et métro.
- de: SafeKit-Anwendungsfälle von Kunden: Hochverfügbarkeit für OEM-Software, Edge-Standorte, VMS, Zutrittskontrolle, SCADA, Gebäudemanagement, Flugverkehrs- und U-Bahn-Steuerung.
- es: Casos de uso de clientes SafeKit: alta disponibilidad para software OEM, sitios edge, VMS, control de acceso, SCADA, gestión de edificios, tráfico aéreo y control de metro.
- it: Casi d’uso dei clienti SafeKit: alta disponibilità per software OEM, siti edge, VMS, controllo accessi, SCADA, gestione edifici, traffico aereo e controllo metro.
- nl: Klantcases van SafeKit: hoge beschikbaarheid voor OEM-software, edge-locaties, VMS, toegangscontrole, SCADA, gebouwbeheer, luchtverkeersleiding en metrobesturing.
- pt-br: Casos de uso de clientes SafeKit: alta disponibilidade para software OEM, sites de borda, VMS, controle de acesso, SCADA, gestão predial, tráfego aéreo e controle de metrô.
- pt-pt: Casos de utilização de clientes SafeKit: alta disponibilidade para software OEM, sites edge, VMS, controlo de acessos, SCADA, gestão de edifícios, tráfego aéreo e metro.
- ja: SafeKit の導入事例：OEM ソフトウェア、エッジサイト、VMS、入退室管理、SCADA、ビル管理、航空管制、地下鉄管制の高可用性。
- ko: SafeKit 고객 사례: OEM 소프트웨어, 엣지 사이트, VMS, 출입 통제, SCADA, 빌딩 관리, 항공 교통 관제, 지하철 관제를 위한 고가용성.
- zh-hans: SafeKit 客户用例：为 OEM 软件、边缘站点、VMS、门禁、SCADA、楼宇管理、空中交通和地铁控制提供高可用性。
- ar: حالات استخدام عملاء SafeKit: التوفر العالي لبرامج OEM، والمواقع الطرفية، و VMS، والتحكم في الوصول، و SCADA، وإدارة المباني، والملاحة الجوية، والمترو.

### use-cases/application-clustering-software.md

- en: OEM high availability: embed SafeKit replication and failover in your software and offer your customers a Windows or Linux cluster without HA expertise.
- fr: HA pour OEM : intégrez la réplication et le basculement SafeKit à votre logiciel et offrez à vos clients un cluster Windows ou Linux sans expertise HA.
- de: OEM-Hochverfügbarkeit: Integrieren Sie SafeKit-Replikation und -Failover in Ihre Software und bieten Sie Ihren Kunden einen Windows- oder Linux-Cluster ohne HA-Know-how.
- es: Alta disponibilidad OEM: integre la replicación y la conmutación por error de SafeKit en su software y ofrezca a sus clientes un clúster Windows o Linux sin experiencia en HA.
- it: HA per OEM: integra replica e failover SafeKit nel tuo software e offri ai tuoi clienti un cluster Windows o Linux senza competenze HA.
- nl: OEM-hoge beschikbaarheid: integreer replicatie en failover van SafeKit in uw software en bied uw klanten een Windows- of Linux-cluster zonder HA-expertise.
- pt-br: Alta disponibilidade OEM: integre a replicação e o failover do SafeKit ao seu software e ofereça aos seus clientes um cluster Windows ou Linux sem expertise em HA.
- pt-pt: Alta disponibilidade OEM: integre a replicação e o failover SafeKit no seu software e ofereça aos seus clientes um cluster Windows ou Linux sem conhecimentos de HA.
- ja: OEM 向け高可用性：SafeKit のレプリケーションとフェイルオーバーを自社ソフトに組み込み、HA の専門知識不要の Windows または Linux クラスターを提供。
- ko: OEM 고가용성: SafeKit 복제 및 장애 조치를 소프트웨어에 내장하여 HA 전문 지식 없이 고객에게 Windows 또는 Linux 클러스터를 제공하세요.
- zh-hans: OEM 高可用性：将 SafeKit 复制和故障转移嵌入您的软件，为客户提供无需 HA 专业知识的 Windows 或 Linux 集群。
- ar: التوفر العالي لمصنّعي OEM: ادمج نسخ SafeKit وتجاوز الفشل في برنامجك وقدّم لعملائك مجموعة Windows أو Linux دون الحاجة إلى خبرة HA.

### use-cases/best-worst-use-cases-high-availability.md

- en: Best and worst use cases for SafeKit: where software clustering on Windows and Linux fits well, and when shared storage or another approach is better.
- fr: Meilleurs et pires cas d’usage de SafeKit : quand le clustering logiciel sous Windows et Linux est adapté, et quand un stockage partagé ou une autre approche est préférable.
- de: Beste und schlechteste Anwendungsfälle für SafeKit: wo Software-Clustering unter Windows und Linux gut passt und wann gemeinsamer Speicher oder ein anderer Ansatz besser ist.
- es: Mejores y peores casos de uso de SafeKit: dónde encaja bien el clustering de software en Windows y Linux, y cuándo es mejor el almacenamiento compartido u otro enfoque.
- it: Casi d’uso migliori e peggiori per SafeKit: dove il clustering software su Windows e Linux è adatto e quando è meglio lo storage condiviso o un altro approccio.
- nl: Beste en slechtste use cases voor SafeKit: waar softwareclustering op Windows en Linux goed past, en wanneer gedeelde opslag of een andere aanpak beter is.
- pt-br: Melhores e piores casos de uso do SafeKit: onde o clustering de software no Windows e Linux se encaixa bem e quando o armazenamento compartilhado ou outra abordagem é melhor.
- pt-pt: Melhores e piores casos de utilização do SafeKit: onde o clustering de software em Windows e Linux é adequado e quando o armazenamento partilhado ou outra abordagem é melhor.
- ja: SafeKit の最適・不適なユースケース：Windows と Linux のソフトウェアクラスタリングが適する場面と、共有ストレージや別の方式が適する場面。
- ko: SafeKit의 최적 및 부적합 사용 사례: Windows 및 Linux 소프트웨어 클러스터링이 적합한 경우와 공유 스토리지 등 다른 방식이 나은 경우.
- zh-hans: SafeKit 的最佳与最差用例：Windows 和 Linux 上的软件集群适用于哪些场景，何时共享存储或其他方法更合适。
- ar: أفضل وأسوأ حالات استخدام SafeKit: متى يناسب التجميع البرمجي على Windows و Linux، ومتى يكون التخزين المشترك أو نهج آخر أفضل.

### use-cases/building-management-system-software-bms-redundancy.md

- en: BMS redundancy with SafeKit: two-node cluster with synchronous replication and failover for Siemens, Honeywell, Schneider and other building systems.
- fr: Redondance BMS avec SafeKit : cluster à deux nœuds avec réplication synchrone et basculement pour Siemens, Honeywell, Schneider et autres systèmes de gestion de bâtiment.
- de: BMS-Redundanz mit SafeKit: Cluster mit zwei Knoten, synchroner Replikation und Failover für Siemens, Honeywell, Schneider und andere Gebäudesysteme.
- es: Redundancia BMS con SafeKit: clúster de dos nodos con replicación síncrona y conmutación por error para Siemens, Honeywell, Schneider y otros sistemas de edificios.
- it: Ridondanza BMS con SafeKit: cluster a due nodi con replica sincrona e failover per Siemens, Honeywell, Schneider e altri sistemi di gestione degli edifici.
- nl: BMS-redundantie met SafeKit: cluster met twee nodes, synchrone replicatie en failover voor Siemens, Honeywell, Schneider en andere gebouwbeheersystemen.
- pt-br: Redundância de BMS com SafeKit: cluster de dois nós com replicação síncrona e failover para Siemens, Honeywell, Schneider e outros sistemas prediais.
- pt-pt: Redundância BMS com SafeKit: cluster de dois nós com replicação síncrona e failover para Siemens, Honeywell, Schneider e outros sistemas de gestão de edifícios.
- ja: SafeKit による BMS 冗長化：Siemens、Honeywell、Schneider 等のビル設備向け、同期レプリケーションとフェイルオーバーの 2 ノードクラスター。
- ko: SafeKit으로 구현하는 BMS 이중화: Siemens, Honeywell, Schneider 등 빌딩 시스템를 위한 동기 복제 및 장애 조치 기반 2노드 클러스터.
- zh-hans: 使用 SafeKit 实现 BMS 冗余：双节点集群，同步复制和故障转移，适用于 Siemens、Honeywell、Schneider 等楼宇系统。
- ar: تكرار أنظمة BMS مع SafeKit: مجموعة من عقدتين مع نسخ متزامن وتجاوز فشل لـ Siemens و Honeywell و Schneider وغيرها من أنظمة المباني.

### use-cases/business-continuity-and-disaster-recovery-software.md

- en: Business continuity and disaster recovery with SafeKit: a two-node cluster across two server rooms, with synchronous replication and automatic failover.
- fr: Continuité d’activité et reprise après sinistre avec SafeKit : un cluster à deux nœuds réparti sur deux salles serveurs, avec réplication synchrone et basculement automatique.
- de: Geschäftskontinuität und Disaster Recovery mit SafeKit: ein Cluster mit zwei Knoten über zwei Serverräume, mit synchroner Replikation und automatischem Failover.
- es: Continuidad del negocio y recuperación ante desastres con SafeKit: clúster de dos nodos en dos salas de servidores, con replicación síncrona y conmutación automática.
- it: Continuità operativa e disaster recovery con SafeKit: un cluster a due nodi su due sale server, con replica sincrona e failover automatico.
- nl: Bedrijfscontinuïteit en disaster recovery met SafeKit: een cluster met twee nodes verdeeld over twee serverruimtes, met synchrone replicatie en automatische failover.
- pt-br: Continuidade dos negócios e recuperação de desastres com SafeKit: um cluster de dois nós em duas salas de servidores, com replicação síncrona e failover automático.
- pt-pt: Continuidade de negócio e recuperação de desastres com SafeKit: um cluster de dois nós em duas salas de servidores, com replicação síncrona e failover automático.
- ja: SafeKit による事業継続と災害復旧：2 つのサーバールームにまたがる 2 ノードクラスターで、同期レプリケーションと自動フェイルオーバーを実現。
- ko: SafeKit을 활용한 비즈니스 연속성 및 재해 복구: 두 서버실에 걸친 2노드 클러스터로 동기 복제 및 자동 장애 조치를 제공합니다.
- zh-hans: 使用 SafeKit 实现业务连续性和灾难恢复：跨两个机房的双节点集群，同步复制和自动故障转移。
- ar: استمرارية الأعمال والتعافي من الكوارث مع SafeKit: مجموعة من عقدتين عبر غرفتي خوادم، مع نسخ متزامن وتجاوز فشل تلقائي.

### use-cases/business-continuity-software.md

- en: High availability for distributed enterprises: deploy the same SafeKit cluster in every branch, with no SAN and no IT staff on site, on Windows or Linux.
- fr: Haute disponibilité pour entreprises multisites : déployez le même cluster SafeKit dans chaque agence, sans SAN ni informaticien sur place, sous Windows ou Linux.
- de: Hochverfügbarkeit für verteilte Unternehmen: Setzen Sie in jeder Filiale denselben SafeKit-Cluster ein, ohne SAN und ohne IT-Personal vor Ort, unter Windows oder Linux.
- es: Alta disponibilidad para empresas distribuidas: despliegue el mismo clúster SafeKit en cada sucursal, sin SAN ni personal de TI in situ, en Windows o Linux.
- it: Alta disponibilità per aziende distribuite: implementa lo stesso cluster SafeKit in ogni filiale, senza SAN né personale IT in loco, su Windows o Linux.
- nl: Hoge beschikbaarheid voor gedistribueerde ondernemingen: implementeer hetzelfde SafeKit-cluster in elke vestiging, zonder SAN of IT-personeel ter plaatse, op Windows of Linux.
- pt-br: Alta disponibilidade para empresas distribuídas: implante o mesmo cluster SafeKit em cada filial, sem SAN e sem equipe de TI no local, no Windows ou Linux.
- pt-pt: Alta disponibilidade para empresas distribuídas: implemente o mesmo cluster SafeKit em cada filial, sem SAN e sem equipa de TI no local, em Windows ou Linux.
- ja: 分散型企業の高可用性：すべての拠点に同じ SafeKit クラスターを展開。SAN も現地の IT スタッフも不要。Windows または Linux 対応。
- ko: 분산 기업을 위한 고가용성: SAN과 현장 IT 인력 없이 모든 지사에 동일한 SafeKit 클러스터를 Windows 또는 Linux로 배포하세요.
- zh-hans: 分布式企业的高可用性：在每个分支机构部署相同的 SafeKit 集群，无需 SAN 和现场 IT 人员，支持 Windows 或 Linux。
- ar: التوفر العالي للمؤسسات الموزعة: انشر مجموعة SafeKit نفسها في كل فرع، دون SAN ودون موظفي تقنية معلومات في الموقع، على Windows أو Linux.

### use-cases/edge-high-availability-without-a-data-center-safekit-for-ot-distributed-sites.md

- en: Edge high availability without a data center: SafeKit turns two standard servers into a plug-and-play cluster for OT and distributed sites, with no SAN.
- fr: Haute disponibilité edge sans data center : SafeKit transforme deux serveurs standard en cluster prêt à l’emploi pour l’OT et les sites distribués, sans SAN.
- de: Edge-Hochverfügbarkeit ohne Rechenzentrum: SafeKit macht zwei Standardserver zu einem Plug-and-Play-Cluster für OT und verteilte Standorte, ohne SAN.
- es: Alta disponibilidad edge sin centro de datos: SafeKit convierte dos servidores estándar en un clúster plug-and-play para entornos OT y sitios distribuidos, sin SAN.
- it: Alta disponibilità edge senza data center: SafeKit trasforma due server standard in un cluster plug-and-play per siti OT e distribuiti, senza SAN.
- nl: Hoge beschikbaarheid aan de edge zonder datacenter: SafeKit maakt van twee standaardservers een plug-and-play-cluster voor OT en verspreide locaties, zonder SAN.
- pt-br: Alta disponibilidade na borda sem data center: o SafeKit transforma dois servidores padrão em um cluster plug-and-play para OT e sites distribuídos, sem SAN.
- pt-pt: Alta disponibilidade edge sem centro de dados: o SafeKit transforma dois servidores padrão num cluster plug-and-play para OT e sites distribuídos, sem SAN.
- ja: データセンター不要のエッジ高可用性：SafeKit が 2 台の標準サーバーを OT・分散拠点向けのプラグアンドプレイクラスターに変えます。SAN 不要。
- ko: 데이터 센터 없는 엣지 고가용성: SafeKit은 SAN 없이 표준 서버 2대를 OT 및 분산 사이트용 플러그 앤 플레이 클러스터로 바꿉니다.
- zh-hans: 无需数据中心的边缘高可用性：SafeKit 将两台标准服务器变为即插即用集群，适用于 OT 和分布式站点，无需 SAN。
- ar: التوفر العالي على الحافة دون مركز بيانات: يحوّل SafeKit خادمين قياسيين إلى مجموعة جاهزة للتشغيل الفوري لبيئات OT والمواقع الموزعة، دون SAN.

### use-cases/electronic-access-control-software-eacs-redundancy.md

- en: Access control (EACS) redundancy with SafeKit: two-node cluster with synchronous replication and failover for Nedap, Siemens, HID and other systems.
- fr: Redondance du contrôle d’accès (EACS) avec SafeKit : cluster à deux nœuds avec réplication synchrone et basculement pour Nedap, Siemens, HID et autres systèmes.
- de: Redundanz für Zutrittskontrolle (EACS) mit SafeKit: Cluster mit zwei Knoten, synchroner Replikation und Failover für Nedap, Siemens, HID und andere Systeme.
- es: Redundancia del control de acceso (EACS) con SafeKit: clúster de dos nodos con replicación síncrona y conmutación por error para Nedap, Siemens, HID y otros sistemas.
- it: Ridondanza del controllo accessi (EACS) con SafeKit: cluster a due nodi con replica sincrona e failover per Nedap, Siemens, HID e altri sistemi.
- nl: Redundantie voor toegangscontrole (EACS) met SafeKit: cluster met twee nodes, synchrone replicatie en failover voor Nedap, Siemens, HID en andere systemen.
- pt-br: Redundância de controle de acesso (EACS) com SafeKit: cluster de dois nós com replicação síncrona e failover para Nedap, Siemens, HID e outros sistemas.
- pt-pt: Redundância do controlo de acessos (EACS) com SafeKit: cluster de dois nós com replicação síncrona e failover para Nedap, Siemens, HID e outros sistemas.
- ja: SafeKit による入退室管理（EACS）冗長化：Nedap、Siemens、HID 等のシステム向け、同期レプリケーションとフェイルオーバーの 2 ノードクラスター。
- ko: SafeKit으로 구현하는 출입 통제(EACS) 이중화: Nedap, Siemens, HID 등 시스템를 위한 동기 복제 및 장애 조치 기반 2노드 클러스터.
- zh-hans: 使用 SafeKit 实现门禁系统（EACS）冗余：双节点集群，同步复制和故障转移，适用于 Nedap、Siemens、HID 等系统。
- ar: تكرار أنظمة التحكم في الوصول (EACS) مع SafeKit: مجموعة من عقدتين مع نسخ متزامن وتجاوز فشل لـ Nedap و Siemens و HID وغيرها من الأنظمة.

### use-cases/high-availability-air-traffic-control-system.md

- en: High availability for air traffic control: ADB SafeGate uses SafeKit in airports worldwide for real-time replication and automatic failover on Windows.
- fr: Haute disponibilité du contrôle aérien : ADB SafeGate utilise SafeKit dans des aéroports du monde entier pour la réplication en temps réel et le basculement sous Windows.
- de: Hochverfügbarkeit für die Flugverkehrskontrolle: ADB SafeGate nutzt SafeKit weltweit in Flughäfen für Echtzeit-Replikation und automatisches Failover unter Windows.
- es: Alta disponibilidad en control de tráfico aéreo: ADB SafeGate usa SafeKit en aeropuertos de todo el mundo para replicación en tiempo real y conmutación automática en Windows.
- it: Alta disponibilità per il controllo del traffico aereo: ADB SafeGate usa SafeKit negli aeroporti di tutto il mondo per replica in tempo reale e failover automatico su Windows.
- nl: Hoge beschikbaarheid voor luchtverkeersleiding: ADB SafeGate gebruikt SafeKit op luchthavens wereldwijd voor realtime replicatie en automatische failover op Windows.
- pt-br: Alta disponibilidade para controle de tráfego aéreo: a ADB SafeGate usa o SafeKit em aeroportos do mundo todo para replicação em tempo real e failover automático no Windows.
- pt-pt: Alta disponibilidade para o controlo de tráfego aéreo: a ADB SafeGate usa o SafeKit em aeroportos mundiais para replicação em tempo real e failover automático em Windows.
- ja: 航空管制の高可用性：ADB SafeGate は世界中の空港で SafeKit を採用し、Windows 上でリアルタイムレプリケーションと自動フェイルオーバーを実現しています。
- ko: 항공 교통 관제 고가용성: ADB SafeGate는 전 세계 공항에서 Windows 기반 실시간 복제 및 자동 장애 조치에 SafeKit을 사용합니다.
- zh-hans: 空中交通管制高可用性：ADB SafeGate 在全球机场使用 SafeKit，在 Windows 上实现实时复制和自动故障转移。
- ar: التوفر العالي لمراقبة الحركة الجوية: تستخدم ADB SafeGate برنامج SafeKit في مطارات حول العالم للنسخ في الوقت الفعلي وتجاوز الفشل التلقائي على Windows.

### use-cases/high-availability-public-transport-centralized-control-room.md

- en: High availability for public transport control rooms: RATP uses SafeKit for driverless Paris Metro line 1, with replication, failover and load balancing.
- fr: Haute disponibilité des salles de contrôle : la RATP utilise SafeKit pour la ligne 1 sans conducteur du métro parisien, avec réplication, basculement et équilibrage de charge.
- de: Hochverfügbarkeit für ÖPNV-Leitstellen: RATP nutzt SafeKit für die fahrerlose Pariser Metrolinie 1, mit Replikation, Failover und Lastverteilung.
- es: Alta disponibilidad en salas de control de transporte: RATP usa SafeKit en la línea 1 sin conductor del metro de París, con replicación, conmutación y equilibrio de carga.
- it: Alta disponibilità per le sale di controllo dei trasporti: RATP usa SafeKit per la linea 1 senza conducente della metro di Parigi, con replica, failover e bilanciamento.
- nl: Hoge beschikbaarheid voor controlekamers van het openbaar vervoer: RATP gebruikt SafeKit voor de bestuurderloze Parijse metrolijn 1, met replicatie, failover en loadbalancing.
- pt-br: Alta disponibilidade para salas de controle de transporte público: a RATP usa o SafeKit na linha 1 automática do Metrô de Paris, com replicação, failover e balanceamento.
- pt-pt: Alta disponibilidade em salas de controlo de transportes: a RATP usa o SafeKit na linha 1 automática do Metro de Paris, com replicação, failover e balanceamento de carga.
- ja: 公共交通管制室の高可用性：RATP は無人運転のパリメトロ 1 号線に SafeKit を採用し、レプリケーション、フェイルオーバー、負荷分散を実現しています。
- ko: 대중교통 관제실 고가용성: RATP는 무인 파리 지하철 1호선에 복제, 장애 조치, 부하 분산을 위해 SafeKit을 사용합니다.
- zh-hans: 公共交通控制室高可用性：RATP 在巴黎地铁 1 号无人驾驶线路使用 SafeKit，实现复制、故障转移和负载均衡。
- ar: التوفر العالي لغرف التحكم في النقل العام: تستخدم RATP برنامج SafeKit للخط 1 الآلي من مترو باريس، مع النسخ وتجاوز الفشل وموازنة الأحمال.

### use-cases/high-availability-software-ha-cluster-windows-linux.md

- en: High availability software for Windows and Linux: SafeKit clusters provide real-time replication, failover and load balancing with no shared storage.
- fr: Logiciel de haute disponibilité pour Windows et Linux : les clusters SafeKit assurent réplication en temps réel, basculement et équilibrage de charge sans stockage partagé.
- de: Hochverfügbarkeitssoftware für Windows und Linux: SafeKit-Cluster bieten Echtzeit-Replikation, Failover und Lastverteilung ohne gemeinsamen Speicher.
- es: Software de alta disponibilidad para Windows y Linux: los clústeres SafeKit ofrecen replicación en tiempo real, conmutación y equilibrio de carga sin disco compartido.
- it: Software di alta disponibilità per Windows e Linux: i cluster SafeKit offrono replica in tempo reale, failover e bilanciamento del carico senza storage condiviso.
- nl: Software voor hoge beschikbaarheid op Windows en Linux: SafeKit-clusters bieden realtime replicatie, failover en loadbalancing zonder gedeelde opslag.
- pt-br: Software de alta disponibilidade para Windows e Linux: clusters SafeKit com replicação em tempo real, failover e balanceamento de carga sem armazenamento compartilhado.
- pt-pt: Software de alta disponibilidade para Windows e Linux: os clusters SafeKit oferecem replicação em tempo real, failover e balanceamento de carga sem armazenamento partilhado.
- ja: Windows と Linux 向け高可用性ソフトウェア：SafeKit クラスターは共有ストレージなしでリアルタイムレプリケーション、フェイルオーバー、負荷分散を提供します。
- ko: Windows 및 Linux용 고가용성 소프트웨어: SafeKit 클러스터는 공유 스토리지 없이 실시간 복제, 장애 조치, 부하 분산을 제공합니다.
- zh-hans: 适用于 Windows 和 Linux 的高可用性软件：SafeKit 集群提供实时复制、故障转移和负载均衡，无需共享存储。
- ar: برنامج التوفر العالي لـ Windows و Linux: توفر مجموعات SafeKit النسخ في الوقت الفعلي وتجاوز الفشل وموازنة الأحمال دون تخزين مشترك.

### use-cases/physical-security-software-redundancy.md

- en: Physical security redundancy with SafeKit: two-node cluster with synchronous replication and failover for video management, access control and SCADA.
- fr: Redondance de la sécurité physique avec SafeKit : cluster à deux nœuds avec réplication synchrone et basculement pour la gestion vidéo, le contrôle d’accès et le SCADA.
- de: Redundanz für physische Sicherheit mit SafeKit: Cluster mit zwei Knoten, synchroner Replikation und Failover für Videomanagement, Zutrittskontrolle und SCADA.
- es: Redundancia de la seguridad física con SafeKit: clúster de dos nodos con replicación síncrona y conmutación por error para gestión de vídeo, control de acceso y SCADA.
- it: Ridondanza della sicurezza fisica con SafeKit: cluster a due nodi con replica sincrona e failover per gestione video, controllo accessi e SCADA.
- nl: Redundantie voor fysieke beveiliging met SafeKit: cluster met twee nodes, synchrone replicatie en failover voor videobeheer, toegangscontrole en SCADA.
- pt-br: Redundância de segurança física com SafeKit: cluster de dois nós com replicação síncrona e failover para gerenciamento de vídeo, controle de acesso e SCADA.
- pt-pt: Redundância de segurança física com SafeKit: cluster de dois nós com replicação síncrona e failover para gestão de vídeo, controlo de acessos e SCADA.
- ja: SafeKit による物理セキュリティ冗長化：ビデオ管理、入退室管理、SCADA 向け、同期レプリケーションとフェイルオーバーの 2 ノードクラスター。
- ko: SafeKit으로 구현하는 물리 보안 이중화: 영상 관리, 출입 통제, SCADA를 위한 동기 복제 및 장애 조치 기반 2노드 클러스터.
- zh-hans: 使用 SafeKit 实现物理安防冗余：双节点集群，同步复制和故障转移，适用于视频管理、门禁和 SCADA。
- ar: تكرار أنظمة الأمن المادي مع SafeKit: مجموعة من عقدتين مع نسخ متزامن وتجاوز فشل لإدارة الفيديو والتحكم في الوصول و SCADA.

### use-cases/scada-software-redundancy-high-availability.md

- en: SCADA redundancy with SafeKit: two-node cluster with synchronous replication and failover for WinCC, Wonderware, iFix and other industrial systems.
- fr: Redondance SCADA avec SafeKit : cluster à deux nœuds avec réplication synchrone et basculement pour WinCC, Wonderware, iFix et autres systèmes industriels.
- de: SCADA-Redundanz mit SafeKit: Cluster mit zwei Knoten, synchroner Replikation und Failover für WinCC, Wonderware, iFix und andere Industriesysteme.
- es: Redundancia SCADA con SafeKit: clúster de dos nodos con replicación síncrona y conmutación por error para WinCC, Wonderware, iFix y otros sistemas industriales.
- it: Ridondanza SCADA con SafeKit: cluster a due nodi con replica sincrona e failover per WinCC, Wonderware, iFix e altri sistemi industriali.
- nl: SCADA-redundantie met SafeKit: cluster met twee nodes, synchrone replicatie en failover voor WinCC, Wonderware, iFix en andere industriële systemen.
- pt-br: Redundância de SCADA com SafeKit: cluster de dois nós com replicação síncrona e failover para WinCC, Wonderware, iFix e outros sistemas industriais.
- pt-pt: Redundância SCADA com SafeKit: cluster de dois nós com replicação síncrona e failover para WinCC, Wonderware, iFix e outros sistemas industriais.
- ja: SafeKit による SCADA 冗長化：WinCC、Wonderware、iFix 等の産業システム向け、同期レプリケーションとフェイルオーバーの 2 ノードクラスター。
- ko: SafeKit으로 구현하는 SCADA 이중화: WinCC, Wonderware, iFix 등 산업 시스템를 위한 동기 복제 및 장애 조치 기반 2노드 클러스터.
- zh-hans: 使用 SafeKit 实现 SCADA 冗余：双节点集群，同步复制和故障转移，适用于 WinCC、Wonderware、iFix 等工业系统。
- ar: تكرار أنظمة SCADA مع SafeKit: مجموعة من عقدتين مع نسخ متزامن وتجاوز فشل لـ WinCC و Wonderware و iFix وغيرها من الأنظمة الصناعية.

### use-cases/video-management-software-vms-redundancy.md

- en: VMS redundancy with SafeKit: two-node cluster with synchronous replication and failover for Milestone, Genetec, Bosch and other video management systems.
- fr: Redondance VMS avec SafeKit : cluster à deux nœuds avec réplication synchrone et basculement pour Milestone, Genetec, Bosch et autres systèmes de gestion vidéo.
- de: VMS-Redundanz mit SafeKit: Cluster mit zwei Knoten, synchroner Replikation und Failover für Milestone, Genetec, Bosch und andere Videomanagementsysteme.
- es: Redundancia VMS con SafeKit: clúster de dos nodos con replicación síncrona y conmutación por error para Milestone, Genetec, Bosch y otros sistemas de gestión de vídeo.
- it: Ridondanza VMS con SafeKit: cluster a due nodi con replica sincrona e failover per Milestone, Genetec, Bosch e altri sistemi di gestione video.
- nl: VMS-redundantie met SafeKit: cluster met twee nodes, synchrone replicatie en failover voor Milestone, Genetec, Bosch en andere videobeheersystemen.
- pt-br: Redundância de VMS com SafeKit: cluster de dois nós com replicação síncrona e failover para Milestone, Genetec, Bosch e outros sistemas de gerenciamento de vídeo.
- pt-pt: Redundância VMS com SafeKit: cluster de dois nós com replicação síncrona e failover para Milestone, Genetec, Bosch e outros sistemas de gestão de vídeo.
- ja: SafeKit による VMS 冗長化：Milestone、Genetec、Bosch 等のビデオ管理システム向け、同期レプリケーションとフェイルオーバーの 2 ノードクラスター。
- ko: SafeKit으로 구현하는 VMS 이중화: Milestone, Genetec, Bosch 등 영상 관리 시스템를 위한 동기 복제 및 장애 조치 기반 2노드 클러스터.
- zh-hans: 使用 SafeKit 实现 VMS 冗余：双节点集群，同步复制和故障转移，适用于 Milestone、Genetec、Bosch 等视频管理系统。
- ar: تكرار أنظمة VMS مع SafeKit: مجموعة من عقدتين مع نسخ متزامن وتجاوز فشل لـ Milestone و Genetec و Bosch وغيرها من أنظمة إدارة الفيديو.

