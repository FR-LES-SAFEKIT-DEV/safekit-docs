# SafeKit website: new page titles (H1) in 12 languages

## Task for GitHub Copilot

This file contains a new title for each of the 132 pages of the site, in English and in the 11 translated languages (fr, de, es, it, nl, pt-br, pt-pt, ja, ko, zh-hans, ar). Each title is used as the page H1 and as the HTML `<title>`. The site template appends ` - SafeKit` to `<title>` when the title does not contain SafeKit; the titles below were written to stay around 60 characters with that suffix.

Apply these values with the script below. **Do not edit the pages by hand, and do not translate, rephrase or "improve" any text in this file.**

1. Save the Python code from the "Apply script" section as `scripts/apply_titles.py` (create the file, or replace it if it exists).
2. From the repository root, run a dry run (preview, no file changed) and show me its output:

       python scripts/apply_titles.py titles-update.md --dry-run

   (use the actual path of this file if it is not at the repository root)
3. If the dry run reports no error, apply the changes (writing is the default):

       python scripts/apply_titles.py titles-update.md

4. Report the summary printed by the script, without modification.
5. Do not commit; I will review the diff first.

### Rules the script applies

- `en` → `content/<path>`; any other language → `content/<lang>/<path>`.
- The `title:` line of the front matter becomes `title: "<text>"`.
- The first Markdown H1 (`# ...`) of the body, outside code blocks, gets the same text. Its `{#anchor}` is regenerated from the new **English** title (same anchor in every language; lower case, HTML tags and punctuation removed, spaces replaced by `-`). An H1 without anchor gets one. If the old H1 wrapped *farm* or *mirror* in a `<span class="notranslate ...">` tag, the tag is put back around that word.
- Pages without a Markdown H1 only get the title line. Line endings (CRLF or LF) and all other lines stay unchanged.
- A file that does not exist is listed as missing and skipped.

## Apply script

```python
"""Apply the page titles (H1) listed in titles-update.md to the Hugo pages.

Usage (from the repository root):
    python scripts/apply_titles.py titles-update.md --dry-run  # preview only
    python scripts/apply_titles.py titles-update.md            # apply (default)

For each page section "### <path>" and each line "- <lang>: <title>":
  en  -> content/<path>
  xx  -> content/<xx>/<path>
Two things change in each file, nothing else:
  1. the "title:" line of the front matter  -> title: "<title>"
  2. the first Markdown H1 of the body ("# ...") outside code blocks: its text is
     replaced and its {#anchor} is regenerated from the new ENGLISH title, the
     same anchor in every language (Hugo "github" style: lower case, HTML tags
     and punctuation removed, each space -> "-"). An H1 without anchor gets one.
     If the old H1 wrapped the word farm/mirror in a <span class="notranslate ...">
     tag, the same tag is put around that word in the new H1.
Pages without a Markdown H1 only get the title line. Line endings are kept.
"""
import re, sys, pathlib

LANGS = {"en", "fr", "de", "es", "it", "nl", "pt-br", "pt-pt", "ja", "ko", "zh-hans", "ar"}
SPAN = re.compile(r'<span class="notranslate (\w+)-term" translate="no">([^<]*)</span>')

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

def wrap_terms(old_h1, new_text):
    for kind, word in SPAN.findall(old_h1):
        pat = re.compile(r"(?<![\w-])(" + re.escape(word) + r")(?![\w.-])", re.I)
        tag = f'<span class="notranslate {kind}-term" translate="no">' + r"\1" + "</span>"
        new_text = pat.sub(tag, new_text, count=1)
    return new_text

def update(path, title, anc, write):
    raw = path.read_bytes().decode("utf-8")
    nl = "\r\n" if "\r\n" in raw else "\n"
    lines = raw.split(nl)
    if not lines or lines[0].strip() != "---":
        return ["no front matter"]
    try:
        end = next(i for i in range(1, len(lines)) if lines[i].strip() == "---")
    except StopIteration:
        return ["front matter not closed"]
    res = []
    new_t = f'title: "{title}"'
    idx = next((i for i in range(1, end) if re.match(r"^title\s*:", lines[i])), None)
    if idx is None:
        lines.insert(1, new_t); end += 1; res.append("title inserted")
    elif lines[idx] == new_t:
        res.append("title unchanged")
    else:
        lines[idx] = new_t; res.append("title updated")
    fence = False
    for i in range(end + 1, len(lines)):
        s = lines[i]
        if re.match(r"^\s*(```|~~~)", s):
            fence = not fence; continue
        if fence:
            continue
        m = re.match(r"^# (.+?)(\s*\{#[^}]*\})?\s*$", s)
        if m:
            new_h = "# " + wrap_terms(m.group(1), title) + " {#" + anc + "}"
            if new_h == s:
                res.append("h1 unchanged")
            else:
                lines[i] = new_h; res.append("h1 updated")
            break
    else:
        res.append("no h1")
    if write and any(r.endswith(("updated", "inserted")) for r in res):
        path.write_bytes(nl.join(lines).encode("utf-8"))
    return res

def anchor(en_title):
    t = re.sub(r"<[^>]+>", "", en_title).lower()
    t = re.sub(r"[^\w\- ]", "", t)
    return t.replace(" ", "-")

def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    write = "--dry-run" not in sys.argv
    data = parse(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"))
    root = pathlib.Path("content")
    stats, missing = {}, []
    for page, per_lang in data.items():
        assert "en" in per_lang, (page, "no en title")
        anc = anchor(per_lang["en"])
        for lang, title in per_lang.items():
            assert lang in LANGS and '"' not in title and "\\" not in title, (page, lang)
            f = root / page if lang == "en" else root / lang / page
            if not f.exists():
                missing.append(str(f)); continue
            for s in update(f, title, anc, write):
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

## Titles

### _index.md

- en: SafeKit: high availability software for Windows and Linux
- fr: SafeKit : logiciel de haute disponibilité Windows et Linux
- de: SafeKit: Hochverfügbarkeitssoftware für Windows und Linux
- es: SafeKit: software de alta disponibilidad para Windows y Linux
- it: SafeKit: software di alta disponibilità per Windows e Linux
- nl: SafeKit: software voor hoge beschikbaarheid op Windows en Linux
- pt-br: SafeKit: software de alta disponibilidade para Windows e Linux
- pt-pt: SafeKit: software de alta disponibilidade Windows e Linux
- ja: SafeKit：Windows と Linux 向け高可用性ソフトウェア
- ko: SafeKit: Windows 및 Linux용 고가용성 소프트웨어
- zh-hans: SafeKit：Windows 与 Linux 高可用性软件
- ar: SafeKit: برنامج التوافر العالي لـ Windows و Linux

### product/_index.md

- en: SafeKit: all-in-one high availability software without a SAN
- fr: SafeKit, logiciel tout-en-un de haute disponibilité sans SAN
- de: SafeKit: All-in-One-Hochverfügbarkeitssoftware ohne SAN
- es: SafeKit: software de alta disponibilidad todo en uno sin SAN
- it: SafeKit: software HA tutto in uno senza SAN
- nl: SafeKit: alles-in-één HA-software zonder SAN
- pt-br: SafeKit: software de alta disponibilidade completo sem SAN
- pt-pt: SafeKit: software de alta disponibilidade integrado sem SAN
- ja: SafeKit：SAN 不要のオールインワン高可用性ソフトウェア
- ko: SafeKit: SAN 없는 올인원 고가용성 소프트웨어
- zh-hans: SafeKit：无需 SAN 的一体化高可用性软件
- ar: SafeKit: برنامج متكامل للتوافر العالي بدون SAN

### safekit-pricing.md

- en: SafeKit pricing
- fr: Tarifs SafeKit
- de: SafeKit-Preise
- es: Precios de SafeKit
- it: Prezzi di SafeKit
- nl: SafeKit-prijzen
- pt-br: Preços do SafeKit
- pt-pt: Preços SafeKit
- ja: SafeKit の価格
- ko: SafeKit 가격
- zh-hans: SafeKit 定价
- ar: أسعار SafeKit

### confirmation-safekit.md

- en: Thank you for contacting us
- fr: Merci de nous avoir contactés
- de: Vielen Dank für Ihre Kontaktaufnahme
- es: Gracias por contactarnos
- it: Grazie per averci contattato
- nl: Bedankt voor uw bericht
- pt-br: Obrigado por entrar em contato
- pt-pt: Agradecemos o seu contacto
- ja: お問い合わせいただきありがとうございます
- ko: 문의해 주셔서 감사합니다
- zh-hans: 感谢您联系我们
- ar: شكرًا لتواصلكم معنا

### contact-marketo.md

- en: Contact form
- fr: Formulaire de contact
- de: Kontaktformular
- es: Formulario de contacto
- it: Modulo di contatto
- nl: Contactformulier
- pt-br: Formulário de contato
- pt-pt: Formulário de contacto
- ja: お問い合わせフォーム
- ko: 문의 양식
- zh-hans: 联系表单
- ar: نموذج الاتصال

### contact-safekit.md

- en: SafeKit contact form
- fr: Formulaire de contact SafeKit
- de: SafeKit-Kontaktformular
- es: Formulario de contacto de SafeKit
- it: Modulo di contatto SafeKit
- nl: SafeKit-contactformulier
- pt-br: Formulário de contato SafeKit
- pt-pt: Formulário de contacto SafeKit
- ja: SafeKit お問い合わせフォーム
- ko: SafeKit 문의 양식
- zh-hans: SafeKit 联系表单
- ar: نموذج الاتصال الخاص بـ SafeKit

### contact-us-for-safekit.md

- en: Contact us about SafeKit
- fr: Contactez-nous à propos de SafeKit
- de: Kontaktieren Sie uns zu SafeKit
- es: Contáctenos sobre SafeKit
- it: Contattaci per SafeKit
- nl: Neem contact met ons op over SafeKit
- pt-br: Fale conosco sobre o SafeKit
- pt-pt: Contacte-nos sobre SafeKit
- ja: SafeKit に関するお問い合わせ
- ko: SafeKit 관련 문의하기
- zh-hans: 联系我们，了解 SafeKit
- ar: تواصلوا معنا بشأن SafeKit

### architectures/_index.md

- en: SafeKit cluster architectures
- fr: Architectures de cluster SafeKit
- de: SafeKit-Clusterarchitekturen
- es: Arquitecturas de clúster SafeKit
- it: Architetture dei cluster SafeKit
- nl: SafeKit-clusterarchitecturen
- pt-br: Arquiteturas de cluster SafeKit
- pt-pt: Arquiteturas de cluster SafeKit
- ja: SafeKit クラスターのアーキテクチャ
- ko: SafeKit 클러스터 아키텍처
- zh-hans: SafeKit 集群架构
- ar: بنيات مجموعات SafeKit

### architectures/active-active-cluster-real-time-replication.md

- en: Active-active cluster with real-time replication
- fr: Cluster actif-actif avec réplication en temps réel
- de: Aktiv-Aktiv-Cluster mit Echtzeitreplikation
- es: Clúster activo-activo con replicación en tiempo real
- it: Cluster attivo-attivo con replica in tempo reale
- nl: Actief-actief cluster met realtime replicatie
- pt-br: Cluster ativo-ativo com replicação em tempo real
- pt-pt: Cluster ativo-ativo com replicação em tempo real
- ja: リアルタイムレプリケーションによるアクティブ/アクティブクラスター
- ko: 실시간 복제를 지원하는 액티브-액티브 클러스터
- zh-hans: 具有实时复制的双活集群
- ar: مجموعة نشطة-نشطة مع نسخ متماثل في الوقت الفعلي

### architectures/clustering-software-load-balancing-mirroring.md

- en: Cluster with load balancing and mirroring
- fr: Cluster à équilibrage de charge et mise en miroir
- de: Cluster mit Lastverteilung und Spiegelung
- es: Clúster con balanceo de carga y mirroring
- it: Cluster con bilanciamento del carico e mirroring
- nl: Cluster met load balancing en mirroring
- pt-br: Cluster com balanceamento de carga e espelhamento
- pt-pt: Cluster com balanceamento de carga e espelhamento
- ja: 負荷分散とミラーリングを備えたクラスター
- ko: 부하 분산 및 미러링을 갖춘 클러스터
- zh-hans: 兼具负载均衡与镜像的集群
- ar: مجموعة مع موازنة الحمل والنسخ المتطابق

### architectures/file-replication-byte-level-with-failover-mirror-cluster.md

- en: SafeKit mirror cluster: real-time replication and failover
- fr: Cluster mirror SafeKit : réplication temps réel, basculement
- de: SafeKit-Mirror-Cluster: Echtzeitreplikation und Failover
- es: Clúster mirror SafeKit: replicación en tiempo real y failover
- it: Cluster mirror SafeKit: replica in tempo reale e failover
- nl: SafeKit mirror-cluster: realtime replicatie en failover
- pt-br: Cluster mirror SafeKit: replicação em tempo real e failover
- pt-pt: Cluster mirror SafeKit: replicação em tempo real e failover
- ja: SafeKit mirror クラスター：リアルタイムレプリケーションとフェイルオーバー
- ko: SafeKit mirror 클러스터: 실시간 복제 및 장애 조치
- zh-hans: SafeKit mirror 集群：实时复制与故障转移
- ar: مجموعة SafeKit mirror: نسخ متماثل فوري وتجاوز الفشل

### architectures/n-1-redundancy.md

- en: N-1 redundancy: one backup for N servers
- fr: Redondance N-1 : un secours pour N serveurs
- de: N-1-Redundanz: ein Backup-Server für N Server
- es: Redundancia N-1: un respaldo para N servidores
- it: Ridondanza N-1: un backup per N server
- nl: N-1-redundantie: één back-up voor N servers
- pt-br: Redundância N-1: um backup para N servidores
- pt-pt: Redundância N-1: um backup para N servidores
- ja: N-1 冗長構成：N 台のサーバーに 1 台のバックアップ
- ko: N-1 이중화: N대 서버에 백업 서버 1대
- zh-hans: N-1 冗余：一台备机保护 N 台服务器
- ar: تكرار N-1: خادم احتياطي واحد لـ N خوادم

### architectures/network-load-balancing-cluster.md

- en: SafeKit farm cluster: network load balancing and failover
- fr: Cluster farm SafeKit : équilibrage de charge et basculement
- de: SafeKit-Farm-Cluster: Netzwerk-Lastverteilung und Failover
- es: Clúster farm SafeKit: balanceo de carga de red y failover
- it: Cluster farm SafeKit: bilanciamento del carico e failover
- nl: SafeKit farm-cluster: netwerk-load balancing en failover
- pt-br: Cluster farm SafeKit: balanceamento de carga de rede e failover
- pt-pt: Cluster farm SafeKit: balanceamento de carga e failover
- ja: SafeKit farm クラスター：ネットワーク負荷分散とフェイルオーバー
- ko: SafeKit farm 클러스터: 네트워크 부하 분산 및 장애 조치
- zh-hans: SafeKit farm 集群：网络负载均衡与故障转移
- ar: مجموعة SafeKit farm: موازنة حمل الشبكة وتجاوز الفشل

### architectures/safekit-smart-console-your-high-availability-cluster-in-your-pocket.md

- en: SafeKit Smart Console: manage your cluster from your phone
- fr: SafeKit Smart Console : gérez votre cluster depuis un mobile
- de: SafeKit Smart Console: Cluster per Smartphone verwalten
- es: SafeKit Smart Console: gestione su clúster desde el móvil
- it: SafeKit Smart Console: gestisci il cluster dal telefono
- nl: SafeKit Smart Console: beheer uw cluster met uw telefoon
- pt-br: SafeKit Smart Console: gerencie seu cluster pelo celular
- pt-pt: SafeKit Smart Console: gerir o cluster no telemóvel
- ja: SafeKit Smart Console：スマートフォンでクラスターを管理
- ko: SafeKit Smart Console: 휴대폰으로 클러스터 관리
- zh-hans: SafeKit Smart Console：用手机管理集群
- ar: SafeKit Smart Console: إدارة مجموعتك من هاتفك

### best-practises/_index.md

- en: High availability best practices
- fr: Bonnes pratiques de haute disponibilité
- de: Best Practices für Hochverfügbarkeit
- es: Buenas prácticas de alta disponibilidad
- it: Best practice di alta disponibilità
- nl: Best practices voor hoge beschikbaarheid
- pt-br: Boas práticas de alta disponibilidade
- pt-pt: Boas práticas de alta disponibilidade
- ja: 高可用性のベストプラクティス
- ko: 고가용성 모범 사례
- zh-hans: 高可用最佳实践
- ar: أفضل ممارسات التوافر العالي

### best-practises/alternative-always-on-sql-server-express-standard-editions.md

- en: Always On alternative for SQL Server Standard
- fr: Alternative à Always On pour SQL Server Standard
- de: Always-On-Alternative für SQL Server Standard
- es: Alternativa a Always On para SQL Server Standard
- it: Alternativa ad Always On per SQL Server Standard
- nl: Always On-alternatief voor SQL Server Standard
- pt-br: Alternativa ao Always On para SQL Server Standard
- pt-pt: Alternativa ao Always On para SQL Server Standard
- ja: SQL Server Standard の Always On 代替
- ko: SQL Server Standard용 Always On 대안
- zh-hans: SQL Server Standard 的 Always On 替代方案
- ar: بديل Always On لـ SQL Server Standard

### best-practises/byte-level-file-replication-vs-block-level-disk-replication.md

- en: File replication vs. disk replication for HA
- fr: Réplication de fichiers ou de disques pour la HA
- de: Dateireplikation vs. Festplattenreplikation für HA
- es: Replicación de archivos vs. de discos para HA
- it: Replica di file vs. replica di dischi per l’HA
- nl: Bestandsreplicatie versus schijfreplicatie voor HA
- pt-br: Replicação de arquivos vs. de disco para HA
- pt-pt: Replicação de ficheiros vs. de disco para HA
- ja: HA のファイルレプリケーションとディスクレプリケーションの比較
- ko: HA용 파일 복제 vs. 디스크 복제
- zh-hans: HA 文件复制与磁盘复制对比
- ar: نسخ الملفات مقابل نسخ الأقراص لـ HA

### best-practises/clustering-software-vs-hardware-clustering.md

- en: Software clustering vs. hardware clustering
- fr: Clustering logiciel ou clustering matériel
- de: Software-Clustering vs. Hardware-Clustering
- es: Clustering de software vs. clustering de hardware
- it: Clustering software vs. clustering hardware
- nl: Softwareclustering versus hardwareclustering
- pt-br: Clustering de software vs. clustering de hardware
- pt-pt: Clustering de software vs. clustering de hardware
- ja: ソフトウェアクラスタリングとハードウェアクラスタリングの比較
- ko: 소프트웨어 vs. 하드웨어 클러스터링
- zh-hans: 软件集群与硬件集群对比
- ar: التجميع البرمجي مقابل التجميع المادي

### best-practises/data-replication-techniques.md

- en: Data replication techniques for high availability
- fr: Techniques de réplication des données pour la HA
- de: Datenreplikationstechniken für Hochverfügbarkeit
- es: Técnicas de replicación de datos para HA
- it: Tecniche di replica dei dati per l’HA
- nl: Datareplicatietechnieken voor hoge beschikbaarheid
- pt-br: Técnicas de replicação de dados para HA
- pt-pt: Técnicas de replicação para alta disponibilidade
- ja: 高可用性のためのデータレプリケーション技術
- ko: 고가용성을 위한 데이터 복제 기술
- zh-hans: 高可用数据复制技术
- ar: تقنيات نسخ البيانات للتوافر العالي

### best-practises/heartbeat-failover-quorum-windows-linux-cluster.md

- en: Heartbeat, failover and quorum in a cluster
- fr: Heartbeat, basculement et quorum dans un cluster
- de: Heartbeat, Failover und Quorum in einem Cluster
- es: Heartbeat, failover y quórum en un clúster
- it: Heartbeat, failover e quorum in un cluster
- nl: Heartbeat, failover en quorum in een cluster
- pt-br: Heartbeat, failover e quórum em um cluster
- pt-pt: Heartbeat, failover e quórum num cluster
- ja: クラスターのハートビート、フェイルオーバー、クォーラム
- ko: 클러스터의 하트비트, 장애 조치 및 쿼럼
- zh-hans: 集群中的心跳、故障转移与仲裁
- ar: نبضة heartbeat وتجاوز الفشل والنصاب في مجموعة

### best-practises/high-availability-architectures-and-best-practices.md

- en: High availability architectures and best practices
- fr: Architectures et bonnes pratiques pour la HA
- de: Hochverfügbarkeitsarchitekturen und Best Practices
- es: Arquitecturas y buenas prácticas de HA
- it: Architetture e best practice di alta disponibilità
- nl: HA-architecturen en best practices
- pt-br: Arquiteturas e boas práticas de alta disponibilidade
- pt-pt: Alta disponibilidade: arquiteturas e boas práticas
- ja: 高可用性アーキテクチャとベストプラクティス
- ko: 고가용성 아키텍처 및 모범 사례
- zh-hans: 高可用架构与最佳实践
- ar: بنيات التوافر العالي وأفضل الممارسات

### best-practises/high-availability-cluster-vs-fault-tolerant-system.md

- en: HA cluster vs. fault-tolerant system
- fr: Cluster HA ou système tolérant aux pannes
- de: HA-Cluster vs. fehlertolerantes System
- es: Clúster HA vs. sistema tolerante a fallos
- it: Cluster HA vs. sistema fault-tolerant
- nl: HA-cluster versus fouttolerant systeem
- pt-br: Cluster HA vs. sistema tolerante a falhas
- pt-pt: Cluster HA vs. sistema tolerante a falhas
- ja: HA クラスターとフォールトトレラントシステムの比較
- ko: HA 클러스터 vs. 내결함성 시스템
- zh-hans: HA 集群与容错系统对比
- ar: مجموعة HA مقابل نظام متسامح مع الأعطال

### best-practises/high-availability-disaster-recovery-hadr.md

- en: High availability and disaster recovery with SafeKit
- fr: Haute disponibilité et reprise après sinistre avec SafeKit
- de: Hochverfügbarkeit und Disaster Recovery mit SafeKit
- es: Alta disponibilidad y recuperación de desastres con SafeKit
- it: Alta disponibilità e disaster recovery con SafeKit
- nl: Hoge beschikbaarheid en noodherstel met SafeKit
- pt-br: Alta disponibilidade e recuperação de desastres com SafeKit
- pt-pt: Alta disponibilidade e recuperação de desastres com SafeKit
- ja: SafeKit による高可用性とディザスタリカバリ
- ko: SafeKit을 활용한 고가용성 및 재해 복구
- zh-hans: 使用 SafeKit 实现高可用与灾难恢复
- ar: التوافر العالي والتعافي من الكوارث مع SafeKit

### best-practises/how-a-virtual-ip-address-works.md

- en: How does a virtual IP address work in a cluster?
- fr: Comment fonctionne une IP virtuelle en cluster ?
- de: Wie funktioniert eine virtuelle IP im Cluster?
- es: ¿Cómo funciona una IP virtual en un clúster?
- it: Come funziona un IP virtuale in un cluster?
- nl: Hoe werkt een virtueel IP-adres in een cluster?
- pt-br: Como funciona um endereço IP virtual em um cluster?
- pt-pt: Como funciona um endereço IP virtual num cluster?
- ja: クラスターで仮想 IP アドレスはどのように機能しますか？
- ko: 클러스터의 가상 IP 주소 작동 방식은?
- zh-hans: 集群中的虚拟 IP 地址如何工作？
- ar: كيف يعمل عنوان IP الافتراضي في مجموعة؟

### best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux.md

- en: How to set up redundant servers with software only
- fr: Comment créer des serveurs redondants par logiciel
- de: Redundante Server allein per Software einrichten
- es: Cómo crear servidores redundantes solo con software
- it: Come creare server ridondanti solo via software
- nl: Redundante servers opzetten met alleen software
- pt-br: Como criar servidores redundantes só com software
- pt-pt: Como criar servidores redundantes só com software
- ja: ソフトウェアだけで冗長サーバーを構築する方法
- ko: 소프트웨어만으로 이중화 서버 구축하기
- zh-hans: 如何仅用软件搭建冗余服务器
- ar: كيفية إعداد خوادم مكررة ببرنامج فقط

### best-practises/how-to-upgrade-an-application-protected-by-safekit.md

- en: How to upgrade an application protected by SafeKit
- fr: Comment mettre à niveau une application protégée par SafeKit
- de: Upgrade einer mit SafeKit geschützten Anwendung
- es: Cómo actualizar una aplicación protegida por SafeKit
- it: Come aggiornare un’applicazione protetta da SafeKit
- nl: Een door SafeKit beschermde applicatie upgraden
- pt-br: Como atualizar uma aplicação protegida pelo SafeKit
- pt-pt: Como atualizar uma aplicação protegida pelo SafeKit
- ja: SafeKit で保護されたアプリケーションのアップグレード方法
- ko: SafeKit으로 보호된 애플리케이션 업그레이드 방법
- zh-hans: 如何升级受 SafeKit 保护的应用
- ar: كيفية ترقية تطبيق محمي بواسطة SafeKit

### best-practises/microsoft-nlb-vmware-multicast-unicast-alternative.md

- en: Microsoft NLB alternative for VMware
- fr: Alternative à Microsoft NLB pour VMware
- de: Microsoft-NLB-Alternative für VMware
- es: Alternativa a Microsoft NLB para VMware
- it: Alternativa a Microsoft NLB per VMware
- nl: Alternatief voor Microsoft NLB op VMware
- pt-br: Alternativa ao Microsoft NLB para VMware
- pt-pt: Alternativa ao Microsoft NLB para VMware
- ja: VMware 向け Microsoft NLB の代替
- ko: VMware용 Microsoft NLB 대안
- zh-hans: VMware 上的 Microsoft NLB 替代方案
- ar: بديل Microsoft NLB لـ VMware

### best-practises/power-outage-and-network-isolation-in-a-cluster.md

- en: Power outages and network isolation in a cluster
- fr: Pannes de courant et isolement réseau en cluster
- de: Stromausfälle und Netzwerkisolierung im Cluster
- es: Cortes de energía y aislamiento de red en un clúster
- it: Blackout e isolamento di rete in un cluster
- nl: Stroomuitval en netwerkisolatie in een cluster
- pt-br: Quedas de energia e isolamento de rede no cluster
- pt-pt: Falhas de energia e isolamento de rede num cluster
- ja: クラスターにおける停電とネットワーク分離
- ko: 클러스터의 정전 및 네트워크 격리
- zh-hans: 集群中的断电与网络隔离
- ar: انقطاع الكهرباء وعزل الشبكة في مجموعة

### best-practises/san-vs-nas-shared-storage-for-a-failover-cluster.md

- en: SAN vs. NAS for a failover cluster
- fr: SAN ou NAS pour un cluster de basculement
- de: SAN vs. NAS für einen Failover-Cluster
- es: SAN vs. NAS para un clúster de failover
- it: SAN vs. NAS per un cluster di failover
- nl: SAN versus NAS voor een failovercluster
- pt-br: SAN vs. NAS para um cluster de failover
- pt-pt: SAN vs. NAS para um cluster de failover
- ja: フェイルオーバークラスターにおける SAN と NAS の比較
- ko: 장애 조치 클러스터용 SAN vs. NAS
- zh-hans: 故障转移集群：SAN 与 NAS 对比
- ar: SAN مقابل NAS لمجموعة تجاوز الفشل

### best-practises/shared-nothing-architecture-vs-shared-disk-architecture.md

- en: Shared-nothing vs. shared-disk architecture
- fr: Architecture sans partage ou à disque partagé
- de: Shared-Nothing- vs. Shared-Disk-Architektur
- es: Sin recursos compartidos vs. disco compartido
- it: Architettura shared-nothing vs. a disco condiviso
- nl: Shared-nothing- versus shared-disk-architectuur
- pt-br: Arquitetura sem compartilhamento vs. disco compartilhado
- pt-pt: Arquitetura sem partilha vs. disco partilhado
- ja: シェアードナッシングと共有ディスクアーキテクチャの比較
- ko: 비공유(shared-nothing) vs. 공유 디스크 아키텍처
- zh-hans: 无共享与共享磁盘架构对比
- ar: البنية بدون مشاركة مقابل بنية القرص المشترك

### best-practises/synchronous-replication-vs-asynchronous-replication.md

- en: Synchronous vs. asynchronous replication
- fr: Réplication synchrone ou asynchrone
- de: Synchrone vs. asynchrone Replikation
- es: Replicación síncrona vs. asíncrona
- it: Replica sincrona vs. replica asincrona
- nl: Synchrone versus asynchrone replicatie
- pt-br: Replicação síncrona vs. assíncrona
- pt-pt: Replicação síncrona vs. assíncrona
- ja: 同期レプリケーションと非同期レプリケーションの比較
- ko: 동기식 vs. 비동기식 복제
- zh-hans: 同步复制与异步复制对比
- ar: النسخ المتماثل المتزامن مقابل غير المتزامن

### best-practises/test-load-balancing-vip-farm.md

- en: Testing the virtual IP address of a SafeKit farm cluster
- fr: Tester l’adresse IP virtuelle d’un cluster farm SafeKit
- de: Virtuelle IP-Adresse eines SafeKit-Farm-Clusters testen
- es: Probar la dirección IP virtual de un clúster farm SafeKit
- it: Test dell’indirizzo IP virtuale di un cluster farm SafeKit
- nl: Het virtuele IP-adres van een SafeKit farm-cluster testen
- pt-br: Testar o endereço IP virtual de um cluster farm SafeKit
- pt-pt: Testar o endereço IP virtual de um cluster farm SafeKit
- ja: SafeKit farm クラスターの仮想 IP アドレスのテスト
- ko: SafeKit farm 클러스터의 가상 IP 주소 테스트
- zh-hans: 测试 SafeKit farm 集群的虚拟 IP 地址
- ar: اختبار عنوان IP الافتراضي لمجموعة SafeKit farm

### best-practises/test-primary-backup-vip-mirror.md

- en: Testing the virtual IP address of a SafeKit mirror cluster
- fr: Tester l’adresse IP virtuelle d’un cluster mirror SafeKit
- de: Virtuelle IP-Adresse eines SafeKit-Mirror-Clusters testen
- es: Probar la dirección IP virtual de un clúster mirror SafeKit
- it: Test dell’indirizzo IP virtuale di un cluster mirror SafeKit
- nl: Het virtuele IP-adres van een SafeKit mirror-cluster testen
- pt-br: Testar o endereço IP virtual de um cluster mirror SafeKit
- pt-pt: Testar o endereço IP virtual de um cluster mirror SafeKit
- ja: SafeKit mirror クラスターの仮想 IP アドレスのテスト
- ko: SafeKit mirror 클러스터의 가상 IP 주소 테스트
- zh-hans: 测试 SafeKit mirror 集群的虚拟 IP 地址
- ar: اختبار عنوان IP الافتراضي لمجموعة SafeKit mirror

### best-practises/vm-ha-vs-application-ha.md

- en: VM HA vs. application HA
- fr: HA de VM ou HA applicative
- de: VM-HA vs. Anwendungs-HA
- es: HA de VM vs. HA de aplicación
- it: HA delle VM vs. HA applicativa
- nl: VM-HA versus applicatie-HA
- pt-br: HA de VM vs. HA de aplicação
- pt-pt: HA de VM vs. HA de aplicação
- ja: VM HA とアプリケーション HA の比較
- ko: VM HA vs. 애플리케이션 HA
- zh-hans: 虚拟机级 HA 与应用级 HA 对比
- ar: HA على مستوى VM مقابل HA على مستوى التطبيق

### best-practises/what-is-rpo-and-rto-with-examples.md

- en: What are RPO and RTO? Definitions and examples
- fr: Que sont RPO et RTO ? Définitions et exemples
- de: Was sind RPO und RTO? Definitionen und Beispiele
- es: ¿Qué son RPO y RTO? Definiciones y ejemplos
- it: Cosa sono RPO e RTO? Definizioni ed esempi
- nl: Wat zijn RPO en RTO? Definities en voorbeelden
- pt-br: O que são RPO e RTO? Definições e exemplos
- pt-pt: O que são RPO e RTO? Definições e exemplos
- ja: RPO と RTO とは？定義と例
- ko: RPO와 RTO란? 정의 및 예시
- zh-hans: 什么是 RPO 和 RTO？定义与示例
- ar: ما هما RPO و RTO؟ تعريفات وأمثلة

### quick-install/_index.md

- en: SafeKit quick installation guides
- fr: Guides d’installation rapide de SafeKit
- de: SafeKit-Kurzanleitungen zur Installation
- es: Guías de instalación rápida de SafeKit
- it: Guide di installazione rapida di SafeKit
- nl: SafeKit-snelinstallatiegidsen
- pt-br: Guias de instalação rápida do SafeKit
- pt-pt: Guias de instalação rápida do SafeKit
- ja: SafeKit クイックインストールガイド
- ko: SafeKit 빠른 설치 가이드
- zh-hans: SafeKit 快速安装指南
- ar: أدلة التثبيت السريع لـ SafeKit

### quick-install/safekit-quick-installation-guide-milestone-migration.md

- en: Migrating the Milestone management server with SafeKit
- fr: Migrer le serveur de gestion Milestone avec SafeKit
- de: Migration des Milestone-Management-Servers mit SafeKit
- es: Migrar el servidor de gestión de Milestone con SafeKit
- it: Migrazione del management server Milestone con SafeKit
- nl: De Milestone-managementserver migreren met SafeKit
- pt-br: Migrar o servidor de gerenciamento Milestone com SafeKit
- pt-pt: Migrar o servidor de gestão Milestone com SafeKit
- ja: SafeKit による Milestone 管理サーバーの移行
- ko: SafeKit으로 Milestone 관리 서버 마이그레이션
- zh-hans: 使用 SafeKit 迁移 Milestone 管理服务器
- ar: ترحيل خادم إدارة Milestone باستخدام SafeKit

### quick-install/safekit-quick-installation-guide-old-milestone-configuration.md

- en: Legacy SafeKit configuration for Milestone
- fr: Ancienne configuration SafeKit pour Milestone
- de: Ältere SafeKit-Konfiguration für Milestone
- es: Configuración antigua de SafeKit para Milestone
- it: Configurazione SafeKit legacy per Milestone
- nl: Verouderde SafeKit-configuratie voor Milestone
- pt-br: Configuração legada do SafeKit para Milestone
- pt-pt: Configuração SafeKit antiga para Milestone
- ja: Milestone 向けの旧 SafeKit 構成
- ko: Milestone용 레거시 SafeKit 구성
- zh-hans: Milestone 的旧版 SafeKit 配置
- ar: إعداد SafeKit القديم لـ Milestone

### resources/_index.md

- en: SafeKit resources
- fr: Ressources SafeKit
- de: SafeKit-Ressourcen
- es: Recursos de SafeKit
- it: Risorse SafeKit
- nl: SafeKit-resources
- pt-br: Recursos do SafeKit
- pt-pt: Recursos SafeKit
- ja: SafeKit リソース
- ko: SafeKit 리소스
- zh-hans: SafeKit 资源
- ar: موارد SafeKit

### resources/high-availability-and-load-balancing-cluster-key.md

- en: SafeKit free one-month trial key
- fr: Clé d’essai SafeKit gratuite d’un mois
- de: Kostenloser SafeKit-Testschlüssel für einen Monat
- es: Clave de prueba gratuita de SafeKit por un mes
- it: Chiave di prova gratuita di un mese di SafeKit
- nl: Gratis SafeKit-proefsleutel voor één maand
- pt-br: Chave de avaliação gratuita do SafeKit por um mês
- pt-pt: Chave de avaliação gratuita SafeKit de um mês
- ja: SafeKit の 1 か月無料試用キー
- ko: SafeKit 1개월 무료 평가판 키
- zh-hans: SafeKit 一个月免费试用密钥
- ar: مفتاح تجربة SafeKit المجانية لمدة شهر

### resources/high-availability-solutions-ha-solutions-videos.md

- en: SafeKit video demos: high availability and failover
- fr: Démos vidéo SafeKit : haute disponibilité et basculement
- de: SafeKit-Videodemos: Hochverfügbarkeit und Failover
- es: Demos en vídeo de SafeKit: alta disponibilidad y failover
- it: Demo video di SafeKit: alta disponibilità e failover
- nl: SafeKit-videodemo's: hoge beschikbaarheid en failover
- pt-br: Demos em vídeo do SafeKit: alta disponibilidade e failover
- pt-pt: Demos em vídeo SafeKit: alta disponibilidade e failover
- ja: SafeKit デモ動画：高可用性とフェイルオーバー
- ko: SafeKit 데모 영상: 고가용성 및 장애 조치
- zh-hans: SafeKit 视频演示：高可用与故障转移
- ar: عروض فيديو SafeKit: التوافر العالي وتجاوز الفشل

### resources/high-availability-technical-reference-for-rfi-and-rfp-preparation.md

- en: SafeKit technical reference for RFI and RFP documents
- fr: Référence technique SafeKit pour les documents RFI et RFP
- de: Technische SafeKit-Referenz für RFI- und RFP-Dokumente
- es: Referencia técnica de SafeKit para documentos RFI y RFP
- it: Riferimento tecnico SafeKit per documenti RFI e RFP
- nl: Technische referentie SafeKit voor RFI- en RFP-documenten
- pt-br: Referência técnica do SafeKit para documentos RFI e RFP
- pt-pt: Referência técnica SafeKit para documentos RFI e RFP
- ja: RFI および RFP 文書向け SafeKit 技術リファレンス
- ko: RFI 및 RFP 문서용 SafeKit 기술 참조
- zh-hans: SafeKit RFI 和 RFP 文档技术参考
- ar: مرجع SafeKit التقني لمستندات RFI و RFP

### resources/safekit-free-trial.md

- en: SafeKit free trial
- fr: Essai gratuit de SafeKit
- de: Kostenlose SafeKit-Testversion
- es: Prueba gratuita de SafeKit
- it: Prova gratuita di SafeKit
- nl: Gratis proefversie van SafeKit
- pt-br: Avaliação gratuita do SafeKit
- pt-pt: Avaliação gratuita SafeKit
- ja: SafeKit 無料トライアル
- ko: SafeKit 무료 체험
- zh-hans: SafeKit 免费试用
- ar: تجربة SafeKit المجانية

### resources/safekit-on-line-training.md

- en: SafeKit training: free online certification
- fr: Formation SafeKit : certification en ligne gratuite
- de: SafeKit-Schulung: kostenlose Online-Zertifizierung
- es: Formación SafeKit: certificación en línea gratuita
- it: Formazione SafeKit: certificazione online gratuita
- nl: SafeKit-training: gratis online certificering
- pt-br: Treinamento SafeKit: certificação online gratuita
- pt-pt: Formação SafeKit: certificação online gratuita
- ja: SafeKit トレーニング：無料オンライン認定
- ko: SafeKit 교육: 무료 온라인 인증
- zh-hans: SafeKit 培训：免费在线认证
- ar: تدريب SafeKit: شهادة مجانية عبر الإنترنت

### resources/safekit-release-notes-8-2.md

- en: SafeKit 8.2 release notes
- fr: Notes de version de SafeKit 8.2
- de: SafeKit 8.2 Versionshinweise
- es: Notas de la versión 8.2 de SafeKit
- it: Note di rilascio di SafeKit 8.2
- nl: Release notes van SafeKit 8.2
- pt-br: Notas de versão do SafeKit 8.2
- pt-pt: Notas de versão SafeKit 8.2
- ja: SafeKit 8.2 リリースノート
- ko: SafeKit 8.2 릴리스 노트
- zh-hans: SafeKit 8.2 发行说明
- ar: ملاحظات إصدار SafeKit 8.2

### resources/safekit-support.md

- en: SafeKit support and AI assistant
- fr: Support SafeKit et assistant IA
- de: SafeKit-Support und KI-Assistent
- es: Soporte de SafeKit y asistente de IA
- it: Supporto SafeKit e assistente AI
- nl: SafeKit-support en AI-assistent
- pt-br: Suporte do SafeKit e assistente de AI
- pt-pt: Suporte SafeKit e assistente de AI
- ja: SafeKit サポートと AI アシスタント
- ko: SafeKit 지원 및 AI 어시스턴트
- zh-hans: SafeKit 支持与 AI 助手
- ar: دعم SafeKit ومساعد AI

### resources/safekit-user-guide-82.md

- en: SafeKit 8.2 user guide
- fr: Guide de l’utilisateur de SafeKit 8.2
- de: SafeKit 8.2 Benutzerhandbuch
- es: Guía del usuario de SafeKit 8.2
- it: Guida utente di SafeKit 8.2
- nl: Gebruikershandleiding SafeKit 8.2
- pt-br: Guia do usuário do SafeKit 8.2
- pt-pt: Guia do utilizador SafeKit 8.2
- ja: SafeKit 8.2 ユーザーガイド
- ko: SafeKit 8.2 사용자 가이드
- zh-hans: SafeKit 8.2 用户指南
- ar: دليل مستخدم SafeKit 8.2

### solutions/_index.md

- en: SafeKit solutions
- fr: Solutions SafeKit
- de: SafeKit-Lösungen
- es: Soluciones SafeKit
- it: Soluzioni SafeKit
- nl: SafeKit-oplossingen
- pt-br: Soluções SafeKit
- pt-pt: Soluções SafeKit
- ja: SafeKit ソリューション
- ko: SafeKit 솔루션
- zh-hans: SafeKit 解决方案
- ar: حلول SafeKit

### solutions/apache-load-balancing-failover-2.md

- en: Built-in load balancing and failover for Apache
- fr: Équilibrage de charge et basculement intégrés pour Apache
- de: Apache: integrierte Lastverteilung und Failover
- es: Balanceo de carga y failover integrados para Apache
- it: Bilanciamento del carico e failover integrati per Apache
- nl: Apache: ingebouwde load balancing en failover
- pt-br: Apache: balanceamento de carga e failover integrados
- pt-pt: Apache: balanceamento de carga e failover integrados
- ja: Apache 向け組み込み型の負荷分散とフェイルオーバー
- ko: Apache용 내장 부하 분산 및 장애 조치
- zh-hans: 面向 Apache 的内置负载均衡与故障转移
- ar: موازنة حمل وتجاوز فشل مدمجان لـ Apache

### solutions/aws-high-availability-cluster-synchronous-replication-failover.md

- en: AWS high availability with zero data loss
- fr: Haute disponibilité AWS sans perte de données
- de: AWS: Hochverfügbarkeit ohne Datenverlust
- es: Alta disponibilidad de AWS sin pérdida de datos
- it: Alta disponibilità per AWS senza perdita di dati
- nl: AWS: hoge beschikbaarheid zonder dataverlies
- pt-br: AWS: alta disponibilidade sem perda de dados
- pt-pt: AWS: alta disponibilidade sem perda de dados
- ja: AWS の高可用性（データ損失ゼロ）
- ko: 데이터 손실 없는 AWS 고가용성
- zh-hans: AWS 零数据丢失高可用
- ar: التوافر العالي لـ AWS دون فقدان البيانات

### solutions/aws-load-balancing-cluster-failover.md

- en: AWS load balancing with automatic failover
- fr: Équilibrage de charge AWS avec basculement automatique
- de: AWS: Lastverteilung mit automatischem Failover
- es: Balanceo de carga de AWS con failover automático
- it: Bilanciamento del carico per AWS con failover automatico
- nl: AWS: load balancing met automatische failover
- pt-br: AWS: balanceamento de carga com failover automático
- pt-pt: AWS: balanceamento de carga com failover automático
- ja: AWS の負荷分散と自動フェイルオーバー
- ko: AWS 부하 분산 및 자동 장애 조치
- zh-hans: AWS 负载均衡与自动故障转移
- ar: موازنة الحمل لـ AWS مع تجاوز الفشل التلقائي

### solutions/azure-high-availability-cluster-synchronous-replication-failover.md

- en: Azure high availability with zero data loss
- fr: Haute disponibilité Azure sans perte de données
- de: Azure: Hochverfügbarkeit ohne Datenverlust
- es: Alta disponibilidad de Azure sin pérdida de datos
- it: Alta disponibilità per Azure senza perdita di dati
- nl: Azure: hoge beschikbaarheid zonder dataverlies
- pt-br: Azure: alta disponibilidade sem perda de dados
- pt-pt: Azure: alta disponibilidade sem perda de dados
- ja: Azure の高可用性（データ損失ゼロ）
- ko: 데이터 손실 없는 Azure 고가용성
- zh-hans: Azure 零数据丢失高可用
- ar: التوافر العالي لـ Azure دون فقدان البيانات

### solutions/azure-load-balancing-cluster-failover.md

- en: Azure load balancing with automatic failover
- fr: Équilibrage de charge Azure avec basculement automatique
- de: Azure: Lastverteilung mit automatischem Failover
- es: Balanceo de carga de Azure con failover automático
- it: Bilanciamento del carico per Azure con failover automatico
- nl: Azure: load balancing met automatische failover
- pt-br: Azure: balanceamento de carga com failover automático
- pt-pt: Azure: balanceamento de carga com failover automático
- ja: Azure の負荷分散と自動フェイルオーバー
- ko: Azure 부하 분산 및 자동 장애 조치
- zh-hans: Azure 负载均衡与自动故障转移
- ar: موازنة الحمل لـ Azure مع تجاوز الفشل التلقائي

### solutions/bosch-ams-the-simplest-high-availability-cluster-between-two-redundant-servers-without-shared-disk.md

- en: Bosch AMS redundancy with automatic failover
- fr: Redondance Bosch AMS avec basculement automatique
- de: Bosch AMS: Redundanz mit automatischem Failover
- es: Redundancia de Bosch AMS con failover automático
- it: Ridondanza per Bosch AMS con failover automatico
- nl: Bosch AMS: redundantie met automatische failover
- pt-br: Bosch AMS: redundância com failover automático
- pt-pt: Bosch AMS: redundância com failover automático
- ja: Bosch AMS の冗長化（自動フェイルオーバー）
- ko: 자동 장애 조치를 지원하는 Bosch AMS 이중화
- zh-hans: Bosch AMS 冗余与自动故障转移
- ar: التكرار لـ Bosch AMS مع تجاوز الفشل التلقائي

### solutions/bosch-bis-the-simplest-high-availability-cluster-between-two-redundant-servers-without-shared-disk.md

- en: Bosch BIS redundancy with automatic failover
- fr: Redondance Bosch BIS avec basculement automatique
- de: Bosch BIS: Redundanz mit automatischem Failover
- es: Redundancia de Bosch BIS con failover automático
- it: Ridondanza per Bosch BIS con failover automatico
- nl: Bosch BIS: redundantie met automatische failover
- pt-br: Bosch BIS: redundância com failover automático
- pt-pt: Bosch BIS: redundância com failover automático
- ja: Bosch BIS の冗長化（自動フェイルオーバー）
- ko: 자동 장애 조치를 지원하는 Bosch BIS 이중화
- zh-hans: Bosch BIS 冗余与自动故障转移
- ar: التكرار لـ Bosch BIS مع تجاوز الفشل التلقائي

### solutions/bosch-bvms-the-simplest-high-availability-cluster-between-two-redundant-servers-without-shared-disk.md

- en: Bosch BVMS redundancy with automatic failover
- fr: Redondance Bosch BVMS avec basculement automatique
- de: Bosch BVMS: Redundanz mit automatischem Failover
- es: Redundancia de Bosch BVMS con failover automático
- it: Ridondanza per Bosch BVMS con failover automatico
- nl: Bosch BVMS: redundantie met automatische failover
- pt-br: Bosch BVMS: redundância com failover automático
- pt-pt: Bosch BVMS: redundância com failover automático
- ja: Bosch BVMS の冗長化（自動フェイルオーバー）
- ko: 자동 장애 조치를 지원하는 Bosch BVMS 이중화
- zh-hans: Bosch BVMS 冗余与自动故障转移
- ar: التكرار لـ Bosch BVMS مع تجاوز الفشل التلقائي

### solutions/cloud-high-availability-cluster-synchronous-replication-failover.md

- en: Cloud high availability with zero data loss
- fr: Haute disponibilité dans le cloud sans perte de données
- de: Cloud: Hochverfügbarkeit ohne Datenverlust
- es: Alta disponibilidad en la nube sin pérdida de datos
- it: Alta disponibilità nel cloud senza perdita di dati
- nl: Cloud: hoge beschikbaarheid zonder dataverlies
- pt-br: Alta disponibilidade na nuvem sem perda de dados
- pt-pt: Alta disponibilidade na cloud sem perda de dados
- ja: クラウドの高可用性（データ損失ゼロ）
- ko: 데이터 손실 없는 클라우드 고가용성
- zh-hans: 云端零数据丢失高可用
- ar: التوافر العالي في السحابة دون فقدان البيانات

### solutions/cloud-load-balancing-cluster-failover.md

- en: Cloud load balancing with automatic failover
- fr: Équilibrage de charge dans le cloud avec basculement automatique
- de: Cloud: Lastverteilung mit automatischem Failover
- es: Balanceo de carga en la nube con failover automático
- it: Bilanciamento del carico nel cloud con failover automatico
- nl: Cloud: load balancing met automatische failover
- pt-br: Balanceamento de carga na nuvem com failover automático
- pt-pt: Balanceamento de carga na cloud com failover automático
- ja: クラウドの負荷分散と自動フェイルオーバー
- ko: 클라우드 부하 분산 및 자동 장애 조치
- zh-hans: 云负载均衡与自动故障转移
- ar: موازنة الحمل في السحابة مع تجاوز الفشل التلقائي

### solutions/cluster-in-cloud-computing-generic-solution-amazon-aws-microsoft-azure-google-gcp-other-clouds.md

- en: One HA cluster for AWS, Azure and Google Cloud
- fr: Un seul cluster HA pour AWS, Azure et Google Cloud
- de: Ein HA-Cluster für AWS, Azure und Google Cloud
- es: Un único clúster HA para AWS, Azure y Google Cloud
- it: Un unico cluster HA per AWS, Azure e Google Cloud
- nl: Eén HA-cluster voor AWS, Azure en Google Cloud
- pt-br: Um único cluster HA para AWS, Azure e Google Cloud
- pt-pt: Um único cluster HA para AWS, Azure e Google Cloud
- ja: AWS、Azure、Google Cloud に共通の HA クラスター
- ko: AWS, Azure, Google Cloud를 위한 단일 HA 클러스터
- zh-hans: 适用于 AWS、Azure 和 Google Cloud 的统一 HA 集群
- ar: مجموعة HA واحدة لـ AWS و Azure و Google Cloud

### solutions/docker-container-high-availability-cluster-synchronous-replication-failover.md

- en: Docker high availability with zero data loss
- fr: Haute disponibilité Docker sans perte de données
- de: Docker: Hochverfügbarkeit ohne Datenverlust
- es: Alta disponibilidad de Docker sin pérdida de datos
- it: Alta disponibilità per Docker senza perdita di dati
- nl: Docker: hoge beschikbaarheid zonder dataverlies
- pt-br: Docker: alta disponibilidade sem perda de dados
- pt-pt: Docker: alta disponibilidade sem perda de dados
- ja: Docker の高可用性（データ損失ゼロ）
- ko: 데이터 손실 없는 Docker 고가용성
- zh-hans: Docker 零数据丢失高可用
- ar: التوافر العالي لـ Docker دون فقدان البيانات

### solutions/firebird-high-availability-synchronous-replication-failover.md

- en: Firebird high availability with zero data loss
- fr: Haute disponibilité Firebird sans perte de données
- de: Firebird: Hochverfügbarkeit ohne Datenverlust
- es: Alta disponibilidad de Firebird sin pérdida de datos
- it: Alta disponibilità per Firebird senza perdita di dati
- nl: Firebird: hoge beschikbaarheid zonder dataverlies
- pt-br: Firebird: alta disponibilidade sem perda de dados
- pt-pt: Firebird: alta disponibilidade sem perda de dados
- ja: Firebird の高可用性（データ損失ゼロ）
- ko: 데이터 손실 없는 Firebird 고가용성
- zh-hans: Firebird 零数据丢失高可用
- ar: التوافر العالي لـ Firebird دون فقدان البيانات

### solutions/gcp-high-availability-cluster-synchronous-replication-failover.md

- en: Google Cloud high availability with zero data loss
- fr: Haute disponibilité Google Cloud sans perte de données
- de: Google Cloud: Hochverfügbarkeit ohne Datenverlust
- es: Alta disponibilidad de Google Cloud sin pérdida de datos
- it: Alta disponibilità per Google Cloud senza perdita di dati
- nl: Google Cloud: hoge beschikbaarheid zonder dataverlies
- pt-br: Google Cloud: alta disponibilidade sem perda de dados
- pt-pt: Google Cloud: alta disponibilidade sem perda de dados
- ja: Google Cloud の高可用性（データ損失ゼロ）
- ko: 데이터 손실 없는 Google Cloud 고가용성
- zh-hans: Google Cloud 零数据丢失高可用
- ar: التوافر العالي لـ Google Cloud دون فقدان البيانات

### solutions/gcp-load-balancing-cluster-failover.md

- en: Google Cloud load balancing with automatic failover
- fr: Équilibrage de charge Google Cloud avec basculement automatique
- de: Google Cloud: Lastverteilung mit automatischem Failover
- es: Balanceo de carga de Google Cloud con failover automático
- it: Bilanciamento del carico per Google Cloud con failover automatico
- nl: Google Cloud: load balancing met automatische failover
- pt-br: Google Cloud: balanceamento de carga com failover automático
- pt-pt: Google Cloud: balanceamento de carga com failover automático
- ja: Google Cloud の負荷分散と自動フェイルオーバー
- ko: Google Cloud 부하 분산 및 자동 장애 조치
- zh-hans: Google Cloud 负载均衡与自动故障转移
- ar: موازنة الحمل لـ Google Cloud مع تجاوز الفشل التلقائي

### solutions/genetec-sql-server-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers.md

- en: Genetec SQL Server high availability with zero data loss
- fr: Haute disponibilité Genetec SQL Server sans perte de données
- de: Genetec SQL Server: Hochverfügbarkeit ohne Datenverlust
- es: Alta disponibilidad de Genetec SQL Server sin pérdida de datos
- it: Alta disponibilità per Genetec SQL Server senza perdita di dati
- nl: Genetec SQL Server: hoge beschikbaarheid zonder dataverlies
- pt-br: Genetec SQL Server: alta disponibilidade sem perda de dados
- pt-pt: Genetec SQL Server: alta disponibilidade sem perda de dados
- ja: Genetec SQL Server の高可用性（データ損失ゼロ）
- ko: 데이터 손실 없는 Genetec SQL Server 고가용성
- zh-hans: Genetec SQL Server 零数据丢失高可用
- ar: التوافر العالي لـ Genetec SQL Server دون فقدان البيانات

### solutions/hanwha-vision-cluster-without-shared-storage-on-a-san.md

- en: Hanwha Vision VMS redundancy with automatic failover
- fr: Redondance Hanwha Vision VMS avec basculement automatique
- de: Hanwha Vision VMS: Redundanz mit automatischem Failover
- es: Redundancia de Hanwha Vision VMS con failover automático
- it: Ridondanza per Hanwha Vision VMS con failover automatico
- nl: Hanwha Vision VMS: redundantie met automatische failover
- pt-br: Hanwha Vision VMS: redundância com failover automático
- pt-pt: Hanwha Vision VMS: redundância com failover automático
- ja: Hanwha Vision VMS の冗長化（自動フェイルオーバー）
- ko: 자동 장애 조치를 지원하는 Hanwha Vision VMS 이중화
- zh-hans: Hanwha Vision VMS 冗余与自动故障转移
- ar: التكرار لـ Hanwha Vision VMS مع تجاوز الفشل التلقائي

### solutions/hanwha-wisenet-wave-the-simplest-high-availability-cluster-between-two-redundant-servers-without-shared-disk.md

- en: Hanwha Wisenet WAVE redundancy with automatic failover
- fr: Redondance Hanwha Wisenet WAVE avec basculement automatique
- de: Hanwha Wisenet WAVE: Redundanz mit automatischem Failover
- es: Redundancia de Hanwha Wisenet WAVE con failover automático
- it: Ridondanza per Hanwha Wisenet WAVE con failover automatico
- nl: Hanwha Wisenet WAVE: redundantie met automatische failover
- pt-br: Hanwha Wisenet WAVE: redundância com failover automático
- pt-pt: Hanwha Wisenet WAVE: redundância com failover automático
- ja: Hanwha Wisenet WAVE の冗長化（自動フェイルオーバー）
- ko: 자동 장애 조치를 지원하는 Hanwha Wisenet WAVE 이중화
- zh-hans: Hanwha Wisenet WAVE 冗余与自动故障转移
- ar: التكرار لـ Hanwha Wisenet WAVE مع تجاوز الفشل التلقائي

### solutions/hyper-v-replication-automatic-failover-load-balancing.md

- en: Hyper-V failover cluster without shared storage
- fr: Cluster de basculement Hyper-V sans disque partagé
- de: Hyper-V-Failover-Cluster ohne Shared Storage
- es: Clúster de failover Hyper-V sin disco compartido
- it: Cluster di failover Hyper-V senza storage condiviso
- nl: Hyper-V-failovercluster zonder gedeelde opslag
- pt-br: Cluster de failover Hyper-V sem disco compartilhado
- pt-pt: Cluster de failover Hyper-V sem disco partilhado
- ja: 共有ストレージ不要の Hyper-V フェイルオーバークラスター
- ko: 공유 스토리지 없는 Hyper-V 장애 조치 클러스터
- zh-hans: 无共享存储的 Hyper-V 故障转移集群
- ar: مجموعة تجاوز الفشل لـ Hyper-V بدون تخزين مشترك

### solutions/iis-load-balancing-failover.md

- en: Built-in load balancing and failover for IIS
- fr: Équilibrage de charge et basculement intégrés pour IIS
- de: IIS: integrierte Lastverteilung und Failover
- es: Balanceo de carga y failover integrados para IIS
- it: Bilanciamento del carico e failover integrati per IIS
- nl: IIS: ingebouwde load balancing en failover
- pt-br: IIS: balanceamento de carga e failover integrados
- pt-pt: IIS: balanceamento de carga e failover integrados
- ja: IIS 向け組み込み型の負荷分散とフェイルオーバー
- ko: IIS용 내장 부하 분산 및 장애 조치
- zh-hans: 面向 IIS 的内置负载均衡与故障转移
- ar: موازنة حمل وتجاوز فشل مدمجان لـ IIS

### solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers.md

- en: Kubernetes K3s high availability with just two nodes
- fr: Haute disponibilité Kubernetes K3s avec seulement deux nœuds
- de: Kubernetes K3s: Hochverfügbarkeit mit nur zwei Knoten
- es: Alta disponibilidad de Kubernetes K3s con solo dos nodos
- it: Alta disponibilità per Kubernetes K3s con soli due nodi
- nl: Kubernetes K3s: hoge beschikbaarheid met slechts twee nodes
- pt-br: Kubernetes K3s: alta disponibilidade com apenas dois nós
- pt-pt: Kubernetes K3s: alta disponibilidade com apenas dois nós
- ja: 2 ノードだけで実現する Kubernetes K3s の高可用性
- ko: 단 2개 노드로 구현하는 Kubernetes K3s 고가용성
- zh-hans: 仅需双节点的 Kubernetes K3s 高可用
- ar: التوافر العالي لـ Kubernetes K3s بعقدتين فقط

### solutions/linux-high-availability-software-synchronous-replication-failover.md

- en: Linux high availability with zero data loss
- fr: Haute disponibilité Linux sans perte de données
- de: Linux: Hochverfügbarkeit ohne Datenverlust
- es: Alta disponibilidad de Linux sin pérdida de datos
- it: Alta disponibilità per Linux senza perdita di dati
- nl: Linux: hoge beschikbaarheid zonder dataverlies
- pt-br: Linux: alta disponibilidade sem perda de dados
- pt-pt: Linux: alta disponibilidade sem perda de dados
- ja: Linux の高可用性（データ損失ゼロ）
- ko: 데이터 손실 없는 Linux 고가용성
- zh-hans: Linux 零数据丢失高可用
- ar: التوافر العالي لـ Linux دون فقدان البيانات

### solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing.md

- en: Linux KVM failover cluster without shared storage
- fr: Cluster de basculement Linux KVM sans disque partagé
- de: Linux-KVM-Failover-Cluster ohne Shared Storage
- es: Clúster de failover Linux KVM sin disco compartido
- it: Cluster di failover Linux KVM senza storage condiviso
- nl: Linux KVM-failovercluster zonder gedeelde opslag
- pt-br: Cluster de failover Linux KVM sem disco compartilhado
- pt-pt: Cluster de failover Linux KVM sem disco partilhado
- ja: 共有ストレージ不要の Linux KVM フェイルオーバークラスター
- ko: 공유 스토리지 없는 Linux KVM 장애 조치 클러스터
- zh-hans: 无共享存储的 Linux KVM 故障转移集群
- ar: مجموعة تجاوز الفشل لـ Linux KVM بدون تخزين مشترك

### solutions/linux-load-balancing-failover.md

- en: Built-in load balancing and failover for Linux
- fr: Équilibrage de charge et basculement intégrés pour Linux
- de: Linux: integrierte Lastverteilung und Failover
- es: Balanceo de carga y failover integrados para Linux
- it: Bilanciamento del carico e failover integrati per Linux
- nl: Linux: ingebouwde load balancing en failover
- pt-br: Linux: balanceamento de carga e failover integrados
- pt-pt: Linux: balanceamento de carga e failover integrados
- ja: Linux 向け組み込み型の負荷分散とフェイルオーバー
- ko: Linux용 내장 부하 분산 및 장애 조치
- zh-hans: 面向 Linux 的内置负载均衡与故障转移
- ar: موازنة حمل وتجاوز فشل مدمجان لـ Linux

### solutions/mariadb-simplest-high-availability-cluster-synchronous-replication-failover-redundant-servers.md

- en: MariaDB high availability with zero data loss
- fr: Haute disponibilité MariaDB sans perte de données
- de: MariaDB: Hochverfügbarkeit ohne Datenverlust
- es: Alta disponibilidad de MariaDB sin pérdida de datos
- it: Alta disponibilità per MariaDB senza perdita di dati
- nl: MariaDB: hoge beschikbaarheid zonder dataverlies
- pt-br: MariaDB: alta disponibilidade sem perda de dados
- pt-pt: MariaDB: alta disponibilidade sem perda de dados
- ja: MariaDB の高可用性（データ損失ゼロ）
- ko: 데이터 손실 없는 MariaDB 고가용성
- zh-hans: MariaDB 零数据丢失高可用
- ar: التوافر العالي لـ MariaDB دون فقدان البيانات

### solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover.md

- en: Milestone XProtect redundancy with automatic failover
- fr: Redondance Milestone XProtect avec basculement automatique
- de: Milestone XProtect: Redundanz mit automatischem Failover
- es: Redundancia de Milestone XProtect con failover automático
- it: Ridondanza per Milestone XProtect con failover automatico
- nl: Milestone XProtect: redundantie met automatische failover
- pt-br: Milestone XProtect: redundância com failover automático
- pt-pt: Milestone XProtect: redundância com failover automático
- ja: Milestone XProtect の冗長化（自動フェイルオーバー）
- ko: 자동 장애 조치를 지원하는 Milestone XProtect 이중화
- zh-hans: Milestone XProtect 冗余与自动故障转移
- ar: التكرار لـ Milestone XProtect مع تجاوز الفشل التلقائي

### solutions/mysql-high-availability-synchronous-replication-failover.md

- en: MySQL high availability with zero data loss
- fr: Haute disponibilité MySQL sans perte de données
- de: MySQL: Hochverfügbarkeit ohne Datenverlust
- es: Alta disponibilidad de MySQL sin pérdida de datos
- it: Alta disponibilità per MySQL senza perdita di dati
- nl: MySQL: hoge beschikbaarheid zonder dataverlies
- pt-br: MySQL: alta disponibilidade sem perda de dados
- pt-pt: MySQL: alta disponibilidade sem perda de dados
- ja: MySQL の高可用性（データ損失ゼロ）
- ko: 데이터 손실 없는 MySQL 고가용성
- zh-hans: MySQL 零数据丢失高可用
- ar: التوافر العالي لـ MySQL دون فقدان البيانات

### solutions/nedap-high-availability-synchronous-replication-failover.md

- en: Nedap AEOS redundancy with automatic failover
- fr: Redondance Nedap AEOS avec basculement automatique
- de: Nedap AEOS: Redundanz mit automatischem Failover
- es: Redundancia de Nedap AEOS con failover automático
- it: Ridondanza per Nedap AEOS con failover automatico
- nl: Nedap AEOS: redundantie met automatische failover
- pt-br: Nedap AEOS: redundância com failover automático
- pt-pt: Nedap AEOS: redundância com failover automático
- ja: Nedap AEOS の冗長化（自動フェイルオーバー）
- ko: 자동 장애 조치를 지원하는 Nedap AEOS 이중화
- zh-hans: Nedap AEOS 冗余与自动故障转移
- ar: التكرار لـ Nedap AEOS مع تجاوز الفشل التلقائي

### solutions/nginx-the-simplest-load-balancing-cluster-with-failover.md

- en: Built-in load balancing and failover for NGINX
- fr: Équilibrage de charge et basculement intégrés pour NGINX
- de: NGINX: integrierte Lastverteilung und Failover
- es: Balanceo de carga y failover integrados para NGINX
- it: Bilanciamento del carico e failover integrati per NGINX
- nl: NGINX: ingebouwde load balancing en failover
- pt-br: NGINX: balanceamento de carga e failover integrados
- pt-pt: NGINX: balanceamento de carga e failover integrados
- ja: NGINX 向け組み込み型の負荷分散とフェイルオーバー
- ko: NGINX용 내장 부하 분산 및 장애 조치
- zh-hans: 面向 NGINX 的内置负载均衡与故障转移
- ar: موازنة حمل وتجاوز فشل مدمجان لـ NGINX

### solutions/oracle-high-availability-synchronous-replication-failover.md

- en: Oracle high availability with zero data loss
- fr: Haute disponibilité Oracle sans perte de données
- de: Oracle: Hochverfügbarkeit ohne Datenverlust
- es: Alta disponibilidad de Oracle sin pérdida de datos
- it: Alta disponibilità per Oracle senza perdita di dati
- nl: Oracle: hoge beschikbaarheid zonder dataverlies
- pt-br: Oracle: alta disponibilidade sem perda de dados
- pt-pt: Oracle: alta disponibilidade sem perda de dados
- ja: Oracle の高可用性（データ損失ゼロ）
- ko: 데이터 손실 없는 Oracle 고가용성
- zh-hans: Oracle 零数据丢失高可用
- ar: التوافر العالي لـ Oracle دون فقدان البيانات

### solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers.md

- en: Podman high availability with zero data loss
- fr: Haute disponibilité Podman sans perte de données
- de: Podman: Hochverfügbarkeit ohne Datenverlust
- es: Alta disponibilidad de Podman sin pérdida de datos
- it: Alta disponibilità per Podman senza perdita di dati
- nl: Podman: hoge beschikbaarheid zonder dataverlies
- pt-br: Podman: alta disponibilidade sem perda de dados
- pt-pt: Podman: alta disponibilidade sem perda de dados
- ja: Podman の高可用性（データ損失ゼロ）
- ko: 데이터 손실 없는 Podman 고가용성
- zh-hans: Podman 零数据丢失高可用
- ar: التوافر العالي لـ Podman دون فقدان البيانات

### solutions/postgresql-high-availability-synchronous-replication-failover.md

- en: PostgreSQL high availability with zero data loss
- fr: Haute disponibilité PostgreSQL sans perte de données
- de: PostgreSQL: Hochverfügbarkeit ohne Datenverlust
- es: Alta disponibilidad de PostgreSQL sin pérdida de datos
- it: Alta disponibilità per PostgreSQL senza perdita di dati
- nl: PostgreSQL: hoge beschikbaarheid zonder dataverlies
- pt-br: PostgreSQL: alta disponibilidade sem perda de dados
- pt-pt: PostgreSQL: alta disponibilidade sem perda de dados
- ja: PostgreSQL の高可用性（データ損失ゼロ）
- ko: 데이터 손실 없는 PostgreSQL 고가용성
- zh-hans: PostgreSQL 零数据丢失高可用
- ar: التوافر العالي لـ PostgreSQL دون فقدان البيانات

### solutions/siemens-desigo-cc-redundancy-high-availability-cluster-active-active.md

- en: Siemens Desigo CC redundancy with automatic failover
- fr: Redondance Siemens Desigo CC avec basculement automatique
- de: Siemens Desigo CC: Redundanz mit automatischem Failover
- es: Redundancia de Siemens Desigo CC con failover automático
- it: Ridondanza per Siemens Desigo CC con failover automatico
- nl: Siemens Desigo CC: redundantie met automatische failover
- pt-br: Siemens Desigo CC: redundância com failover automático
- pt-pt: Siemens Desigo CC: redundância com failover automático
- ja: Siemens Desigo CC の冗長化（自動フェイルオーバー）
- ko: 자동 장애 조치를 지원하는 Siemens Desigo CC 이중화
- zh-hans: Siemens Desigo CC 冗余与自动故障转移
- ar: التكرار لـ Siemens Desigo CC مع تجاوز الفشل التلقائي

### solutions/siemens-simatic-pcs-7-redundancy-high-availability-cluster-active-active.md

- en: Siemens SIMATIC PCS 7 redundancy with automatic failover
- fr: Redondance Siemens SIMATIC PCS 7 avec basculement automatique
- de: Siemens SIMATIC PCS 7: Redundanz mit automatischem Failover
- es: Redundancia de Siemens SIMATIC PCS 7 con failover automático
- it: Ridondanza per Siemens SIMATIC PCS 7 con failover automatico
- nl: Siemens SIMATIC PCS 7: redundantie met automatische failover
- pt-br: Siemens SIMATIC PCS 7: redundância com failover automático
- pt-pt: Siemens SIMATIC PCS 7: redundância com failover automático
- ja: Siemens SIMATIC PCS 7 の冗長化（自動フェイルオーバー）
- ko: 자동 장애 조치를 지원하는 Siemens SIMATIC PCS 7 이중화
- zh-hans: Siemens SIMATIC PCS 7 冗余与自动故障转移
- ar: التكرار لـ Siemens SIMATIC PCS 7 مع تجاوز الفشل التلقائي

### solutions/siemens-simatic-wincc-redundancy-high-availability-cluster-active-active.md

- en: Siemens SIMATIC WinCC redundancy with automatic failover
- fr: Redondance Siemens SIMATIC WinCC avec basculement automatique
- de: Siemens SIMATIC WinCC: Redundanz mit automatischem Failover
- es: Redundancia de Siemens SIMATIC WinCC con failover automático
- it: Ridondanza per Siemens SIMATIC WinCC con failover automatico
- nl: Siemens SIMATIC WinCC: redundantie met automatische failover
- pt-br: Siemens SIMATIC WinCC: redundância com failover automático
- pt-pt: Siemens SIMATIC WinCC: redundância com failover automático
- ja: Siemens SIMATIC WinCC の冗長化（自動フェイルオーバー）
- ko: 자동 장애 조치를 지원하는 Siemens SIMATIC WinCC 이중화
- zh-hans: Siemens SIMATIC WinCC 冗余与自动故障转移
- ar: التكرار لـ Siemens SIMATIC WinCC مع تجاوز الفشل التلقائي

### solutions/siemens-sipass-redundancy-high-availability-cluster-active-active.md

- en: Siemens SiPass redundancy with automatic failover
- fr: Redondance Siemens SiPass avec basculement automatique
- de: Siemens SiPass: Redundanz mit automatischem Failover
- es: Redundancia de Siemens SiPass con failover automático
- it: Ridondanza per Siemens SiPass con failover automatico
- nl: Siemens SiPass: redundantie met automatische failover
- pt-br: Siemens SiPass: redundância com failover automático
- pt-pt: Siemens SiPass: redundância com failover automático
- ja: Siemens SiPass の冗長化（自動フェイルオーバー）
- ko: 자동 장애 조치를 지원하는 Siemens SiPass 이중화
- zh-hans: Siemens SiPass 冗余与自动故障转移
- ar: التكرار لـ Siemens SiPass مع تجاوز الفشل التلقائي

### solutions/siemens-siport-redundancy-high-availability-cluster-active-active.md

- en: Siemens SIPORT redundancy with automatic failover
- fr: Redondance Siemens SIPORT avec basculement automatique
- de: Siemens SIPORT: Redundanz mit automatischem Failover
- es: Redundancia de Siemens SIPORT con failover automático
- it: Ridondanza per Siemens SIPORT con failover automatico
- nl: Siemens SIPORT: redundantie met automatische failover
- pt-br: Siemens SIPORT: redundância com failover automático
- pt-pt: Siemens SIPORT: redundância com failover automático
- ja: Siemens SIPORT の冗長化（自動フェイルオーバー）
- ko: 자동 장애 조치를 지원하는 Siemens SIPORT 이중화
- zh-hans: Siemens SIPORT 冗余与自动故障转移
- ar: التكرار لـ Siemens SIPORT مع تجاوز الفشل التلقائي

### solutions/siemens-siveillance-redundancy-high-availability-cluster-active-active.md

- en: Siemens Siveillance Suite redundancy with automatic failover
- fr: Redondance Siemens Siveillance Suite avec basculement automatique
- de: Siemens Siveillance Suite: Redundanz mit automatischem Failover
- es: Redundancia de Siemens Siveillance Suite con failover automático
- it: Ridondanza per Siemens Siveillance Suite con failover automatico
- nl: Siemens Siveillance Suite: redundantie met automatische failover
- pt-br: Siemens Siveillance Suite: redundância com failover automático
- pt-pt: Siemens Siveillance Suite: redundância com failover automático
- ja: Siemens Siveillance Suite の冗長化（自動フェイルオーバー）
- ko: 자동 장애 조치를 지원하는 Siemens Siveillance Suite 이중화
- zh-hans: Siemens Siveillance Suite 冗余与自动故障转移
- ar: التكرار لـ Siemens Siveillance Suite مع تجاوز الفشل التلقائي

### solutions/siemens-siveillance-vms-the-simplest-high-availability-cluster-between-two-redundant-servers.md

- en: Siemens Siveillance VMS redundancy with automatic failover
- fr: Redondance Siemens Siveillance VMS avec basculement automatique
- de: Siemens Siveillance VMS: Redundanz mit automatischem Failover
- es: Redundancia de Siemens Siveillance VMS con failover automático
- it: Ridondanza per Siemens Siveillance VMS con failover automatico
- nl: Siemens Siveillance VMS: redundantie met automatische failover
- pt-br: Siemens Siveillance VMS: redundância com failover automático
- pt-pt: Siemens Siveillance VMS: redundância com failover automático
- ja: Siemens Siveillance VMS の冗長化（自動フェイルオーバー）
- ko: 자동 장애 조치를 지원하는 Siemens Siveillance VMS 이중화
- zh-hans: Siemens Siveillance VMS 冗余与自动故障转移
- ar: التكرار لـ Siemens Siveillance VMS مع تجاوز الفشل التلقائي

### solutions/sql-server-high-availability-synchronous-replication-failover.md

- en: SQL Server high availability with zero data loss
- fr: Haute disponibilité SQL Server sans perte de données
- de: SQL Server: Hochverfügbarkeit ohne Datenverlust
- es: Alta disponibilidad de SQL Server sin pérdida de datos
- it: Alta disponibilità per SQL Server senza perdita di dati
- nl: SQL Server: hoge beschikbaarheid zonder dataverlies
- pt-br: SQL Server: alta disponibilidade sem perda de dados
- pt-pt: SQL Server: alta disponibilidade sem perda de dados
- ja: SQL Server の高可用性（データ損失ゼロ）
- ko: 데이터 손실 없는 SQL Server 고가용성
- zh-hans: SQL Server 零数据丢失高可用
- ar: التوافر العالي لـ SQL Server دون فقدان البيانات

### solutions/windows-high-availability-software-synchronous-replication-failover.md

- en: Windows high availability with zero data loss
- fr: Haute disponibilité Windows sans perte de données
- de: Windows: Hochverfügbarkeit ohne Datenverlust
- es: Alta disponibilidad de Windows sin pérdida de datos
- it: Alta disponibilità per Windows senza perdita di dati
- nl: Windows: hoge beschikbaarheid zonder dataverlies
- pt-br: Windows: alta disponibilidade sem perda de dados
- pt-pt: Windows: alta disponibilidade sem perda de dados
- ja: Windows の高可用性（データ損失ゼロ）
- ko: 데이터 손실 없는 Windows 고가용성
- zh-hans: Windows 零数据丢失高可用
- ar: التوافر العالي لـ Windows دون فقدان البيانات

### solutions/windows-load-balancing-failover.md

- en: Built-in load balancing and failover for Windows
- fr: Équilibrage de charge et basculement intégrés pour Windows
- de: Windows: integrierte Lastverteilung und Failover
- es: Balanceo de carga y failover integrados para Windows
- it: Bilanciamento del carico e failover integrati per Windows
- nl: Windows: ingebouwde load balancing en failover
- pt-br: Windows: balanceamento de carga e failover integrados
- pt-pt: Windows: balanceamento de carga e failover integrados
- ja: Windows 向け組み込み型の負荷分散とフェイルオーバー
- ko: Windows용 내장 부하 분산 및 장애 조치
- zh-hans: 面向 Windows 的内置负载均衡与故障转移
- ar: موازنة حمل وتجاوز فشل مدمجان لـ Windows

### use-cases/_index.md

- en: SafeKit customer use cases
- fr: Cas d’usage clients SafeKit
- de: SafeKit-Anwendungsfälle von Kunden
- es: Casos de uso de clientes de SafeKit
- it: Casi d’uso dei clienti SafeKit
- nl: Gebruiksscenario's van SafeKit-klanten
- pt-br: Casos de uso de clientes SafeKit
- pt-pt: Casos de utilização de clientes SafeKit
- ja: SafeKit 顧客導入事例
- ko: SafeKit 고객 사용 사례
- zh-hans: SafeKit 客户用例
- ar: حالات استخدام عملاء SafeKit

### use-cases/application-clustering-software.md

- en: OEM high availability: embed SafeKit in your software
- fr: Haute disponibilité OEM : intégrez SafeKit à votre logiciel
- de: OEM-Hochverfügbarkeit: SafeKit in Ihre Software einbetten
- es: Alta disponibilidad OEM: integre SafeKit en su software
- it: Alta disponibilità OEM: integra SafeKit nel tuo software
- nl: OEM-hoge beschikbaarheid: integreer SafeKit in uw software
- pt-br: Alta disponibilidade OEM: integre o SafeKit ao seu software
- pt-pt: Alta disponibilidade OEM: integre o SafeKit no seu software
- ja: OEM 高可用性：SafeKit を自社ソフトウェアに組み込む
- ko: OEM 고가용성: 소프트웨어에 SafeKit 내장
- zh-hans: OEM 高可用：将 SafeKit 嵌入您的软件
- ar: التوافر العالي لـ OEM: دمج SafeKit في برنامجك

### use-cases/best-worst-use-cases-high-availability.md

- en: Best and worst use cases for high availability
- fr: Meilleurs et pires cas d’usage de la HA
- de: Beste und schlechteste Anwendungsfälle für HA
- es: Mejores y peores usos de la alta disponibilidad
- it: Migliori e peggiori casi d’uso dell’HA
- nl: Beste en slechtste toepassingen van HA
- pt-br: Melhores e piores casos de uso da alta disponibilidade
- pt-pt: Melhores e piores casos de alta disponibilidade
- ja: 高可用性のベストユースケースとワーストユースケース
- ko: 고가용성의 최적 및 최악 사용 사례
- zh-hans: 高可用的最佳与最差用例
- ar: أفضل وأسوأ حالات استخدام التوافر العالي

### use-cases/building-management-system-software-bms-redundancy.md

- en: High availability for building management (BMS)
- fr: Haute disponibilité pour la GTB (BMS)
- de: Hochverfügbarkeit für Gebäudemanagement (BMS)
- es: Alta disponibilidad para gestión de edificios (BMS)
- it: Alta disponibilità per la gestione edifici (BMS)
- nl: Hoge beschikbaarheid voor gebouwbeheer (BMS)
- pt-br: Alta disponibilidade para gestão predial (BMS)
- pt-pt: Alta disponibilidade para gestão de edifícios (BMS)
- ja: ビル管理（BMS）の高可用性
- ko: 건물 관리(BMS)의 고가용성
- zh-hans: 楼宇管理（BMS）的高可用
- ar: التوافر العالي لإدارة المباني (BMS)

### use-cases/business-continuity-and-disaster-recovery-software.md

- en: Business continuity and disaster recovery software
- fr: Logiciel de continuité et de reprise d’activité
- de: Business-Continuity- und Disaster-Recovery-Software
- es: Software de continuidad y recuperación ante desastres
- it: Software di business continuity e disaster recovery
- nl: Software voor bedrijfscontinuïteit en noodherstel
- pt-br: Software de continuidade e recuperação de desastres
- pt-pt: Software de continuidade e recuperação de desastres
- ja: 事業継続とディザスタリカバリのソフトウェア
- ko: 비즈니스 연속성 및 재해 복구 소프트웨어
- zh-hans: 业务连续性与灾难恢复软件
- ar: برنامج استمرارية الأعمال والتعافي من الكوارث

### use-cases/business-continuity-software.md

- en: High availability for companies with many branches
- fr: Haute disponibilité pour les réseaux d’agences
- de: Hochverfügbarkeit für Firmen mit vielen Filialen
- es: Alta disponibilidad para empresas multisede
- it: Alta disponibilità per aziende con molte filiali
- nl: Hoge beschikbaarheid voor bedrijven met filialen
- pt-br: Alta disponibilidade para empresas com muitas filiais
- pt-pt: Alta disponibilidade para empresas com filiais
- ja: 多数の拠点を持つ企業の高可用性
- ko: 지점이 많은 기업의 고가용성
- zh-hans: 多分支机构企业的高可用
- ar: التوافر العالي للشركات متعددة الفروع

### use-cases/edge-high-availability-without-a-data-center-safekit-for-ot-distributed-sites.md

- en: Edge high availability without a data center
- fr: Haute disponibilité en périphérie sans datacenter
- de: Edge-Hochverfügbarkeit ohne Rechenzentrum
- es: Alta disponibilidad en el edge sin centro de datos
- it: Alta disponibilità edge senza data center
- nl: Hoge beschikbaarheid aan de edge zonder datacenter
- pt-br: Alta disponibilidade no edge sem data center
- pt-pt: Alta disponibilidade no edge sem centro de dados
- ja: データセンター不要のエッジ高可用性
- ko: 데이터 센터 없는 엣지 고가용성
- zh-hans: 无数据中心的边缘高可用
- ar: التوافر العالي على الحافة بدون مركز بيانات

### use-cases/electronic-access-control-software-eacs-redundancy.md

- en: High availability for access control (EACS)
- fr: Haute disponibilité pour le contrôle d’accès (EACS)
- de: Hochverfügbarkeit für Zutrittskontrolle (EACS)
- es: Alta disponibilidad para control de acceso (EACS)
- it: Alta disponibilità per il controllo accessi (EACS)
- nl: Hoge beschikbaarheid voor toegangscontrole (EACS)
- pt-br: Alta disponibilidade para controle de acesso (EACS)
- pt-pt: Alta disponibilidade para controlo de acessos (EACS)
- ja: アクセス制御（EACS）の高可用性
- ko: 출입 통제(EACS)의 고가용성
- zh-hans: 门禁控制（EACS）的高可用
- ar: التوافر العالي للتحكم في الوصول (EACS)

### use-cases/high-availability-air-traffic-control-system.md

- en: High availability for air traffic control systems
- fr: Haute disponibilité pour le contrôle aérien
- de: Hochverfügbarkeit für Flugsicherungssysteme
- es: Alta disponibilidad para control de tráfico aéreo
- it: Alta disponibilità per il controllo traffico aereo
- nl: Hoge beschikbaarheid voor luchtverkeersleiding
- pt-br: Alta disponibilidade para controle de tráfego aéreo
- pt-pt: Alta disponibilidade para controlo de tráfego aéreo
- ja: 航空管制システムの高可用性
- ko: 항공 교통 관제 시스템의 고가용성
- zh-hans: 空中交通管制系统的高可用
- ar: التوافر العالي لأنظمة مراقبة الحركة الجوية

### use-cases/high-availability-public-transport-centralized-control-room.md

- en: High availability for transport control rooms
- fr: Haute disponibilité pour les PCC de transport
- de: Hochverfügbarkeit für Verkehrsleitstellen
- es: Alta disponibilidad para salas de control de transporte
- it: Alta disponibilità per sale operative di trasporto
- nl: Hoge beschikbaarheid voor vervoersmeldkamers
- pt-br: Alta disponibilidade para controle de transporte
- pt-pt: Alta disponibilidade para controlo de transportes
- ja: 交通管制室の高可用性
- ko: 교통 관제실의 고가용성
- zh-hans: 交通控制室的高可用
- ar: التوافر العالي لغرف التحكم في النقل

### use-cases/high-availability-software-ha-cluster-windows-linux.md

- en: High availability software for Windows and Linux
- fr: Logiciel de haute disponibilité Windows et Linux
- de: Hochverfügbarkeitssoftware für Windows und Linux
- es: Software de alta disponibilidad para Windows y Linux
- it: Software di alta disponibilità per Windows e Linux
- nl: Software voor hoge beschikbaarheid: Windows en Linux
- pt-br: Software de alta disponibilidade para Windows e Linux
- pt-pt: Software de alta disponibilidade Windows e Linux
- ja: Windows と Linux 向け高可用性ソフトウェア
- ko: Windows 및 Linux용 고가용성 소프트웨어
- zh-hans: Windows/Linux 高可用性软件
- ar: برنامج التوافر العالي لـ Windows و Linux

### use-cases/physical-security-software-redundancy.md

- en: High availability for physical security software
- fr: Haute disponibilité pour la sécurité physique
- de: Hochverfügbarkeit für physische Sicherheitssysteme
- es: Alta disponibilidad para software de seguridad física
- it: Alta disponibilità per software di sicurezza fisica
- nl: Hoge beschikbaarheid voor fysieke beveiligingssoftware
- pt-br: Alta disponibilidade para software de segurança física
- pt-pt: Alta disponibilidade para segurança física
- ja: 物理セキュリティソフトウェアの高可用性
- ko: 물리적 보안 소프트웨어의 고가용성
- zh-hans: 物理安防软件的高可用
- ar: التوافر العالي لبرامج الأمن المادي

### use-cases/scada-software-redundancy-high-availability.md

- en: High availability for SCADA and ICS
- fr: Haute disponibilité pour SCADA et ICS
- de: Hochverfügbarkeit für SCADA und ICS
- es: Alta disponibilidad para SCADA e ICS
- it: Alta disponibilità per SCADA e ICS
- nl: Hoge beschikbaarheid voor SCADA en ICS
- pt-br: Alta disponibilidade para SCADA e ICS
- pt-pt: Alta disponibilidade para SCADA e ICS
- ja: SCADA と ICS の高可用性
- ko: SCADA 및 ICS의 고가용성
- zh-hans: SCADA 和 ICS 的高可用
- ar: التوافر العالي لـ SCADA و ICS

### use-cases/video-management-software-vms-redundancy.md

- en: High availability for video management (VMS)
- fr: Haute disponibilité pour la gestion vidéo (VMS)
- de: Hochverfügbarkeit für Videomanagement (VMS)
- es: Alta disponibilidad para gestión de vídeo (VMS)
- it: Alta disponibilità per la gestione video (VMS)
- nl: Hoge beschikbaarheid voor videobeheer (VMS)
- pt-br: Alta disponibilidade para gerenciamento de vídeo (VMS)
- pt-pt: Alta disponibilidade para gestão de vídeo (VMS)
- ja: ビデオ管理（VMS）の高可用性
- ko: 비디오 관리(VMS)의 고가용성
- zh-hans: 视频管理（VMS）的高可用
- ar: التوافر العالي لإدارة الفيديو (VMS)

### quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-network-load-balancing-and-failover.md

- en: Install SafeKit for Linux load balancing (farm.safe)
- fr: Installer SafeKit pour l’équilibrage de charge Linux (farm.safe)
- de: SafeKit installieren: Lastverteilung für Linux (farm.safe)
- es: Instalar SafeKit: balanceo de carga de Linux (farm.safe)
- it: Installa SafeKit per il bilanciamento del carico di Linux (farm.safe)
- nl: Linux: SafeKit installeren voor load balancing (farm.safe)
- pt-br: Instalar SafeKit para balanceamento de carga de Linux (farm.safe)
- pt-pt: Instalar SafeKit: balanceamento de carga de Linux (farm.safe)
- ja: SafeKit のインストール：Linux の負荷分散（farm.safe）
- ko: SafeKit 설치: Linux 부하 분산 (farm.safe)
- zh-hans: 安装 SafeKit：Linux 负载均衡（farm.safe）
- ar: تثبيت SafeKit لموازنة الحمل لـ Linux (farm.safe)

### quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover.md

- en: Install SafeKit for Linux high availability (mirror.safe)
- fr: Installer SafeKit pour la haute disponibilité Linux (mirror.safe)
- de: SafeKit installieren: Hochverfügbarkeit für Linux (mirror.safe)
- es: Instalar SafeKit: alta disponibilidad de Linux (mirror.safe)
- it: Installa SafeKit per l’alta disponibilità di Linux (mirror.safe)
- nl: Linux: SafeKit installeren voor hoge beschikbaarheid (mirror.safe)
- pt-br: Instalar SafeKit para alta disponibilidade de Linux (mirror.safe)
- pt-pt: Instalar SafeKit: alta disponibilidade de Linux (mirror.safe)
- ja: SafeKit のインストール：Linux の高可用性（mirror.safe）
- ko: SafeKit 설치: Linux 고가용성 (mirror.safe)
- zh-hans: 安装 SafeKit：Linux 高可用（mirror.safe）
- ar: تثبيت SafeKit للتوافر العالي لـ Linux (mirror.safe)

### quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover.md

- en: Install SafeKit for Windows load balancing (farm.safe)
- fr: Installer SafeKit pour l’équilibrage de charge Windows (farm.safe)
- de: SafeKit installieren: Lastverteilung für Windows (farm.safe)
- es: Instalar SafeKit: balanceo de carga de Windows (farm.safe)
- it: Installa SafeKit per il bilanciamento del carico di Windows (farm.safe)
- nl: Windows: SafeKit installeren voor load balancing (farm.safe)
- pt-br: Instalar SafeKit para balanceamento de carga de Windows (farm.safe)
- pt-pt: Instalar SafeKit: balanceamento de carga de Windows (farm.safe)
- ja: SafeKit のインストール：Windows の負荷分散（farm.safe）
- ko: SafeKit 설치: Windows 부하 분산 (farm.safe)
- zh-hans: 安装 SafeKit：Windows 负载均衡（farm.safe）
- ar: تثبيت SafeKit لموازنة الحمل لـ Windows (farm.safe)

### quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover.md

- en: Install SafeKit for Windows high availability (mirror.safe)
- fr: Installer SafeKit pour la haute disponibilité Windows (mirror.safe)
- de: SafeKit installieren: Hochverfügbarkeit für Windows (mirror.safe)
- es: Instalar SafeKit: alta disponibilidad de Windows (mirror.safe)
- it: Installa SafeKit per l’alta disponibilità di Windows (mirror.safe)
- nl: Windows: SafeKit installeren voor hoge beschikbaarheid (mirror.safe)
- pt-br: Instalar SafeKit para alta disponibilidade de Windows (mirror.safe)
- pt-pt: Instalar SafeKit: alta disponibilidade de Windows (mirror.safe)
- ja: SafeKit のインストール：Windows の高可用性（mirror.safe）
- ko: SafeKit 설치: Windows 고가용성 (mirror.safe)
- zh-hans: 安装 SafeKit：Windows 高可用（mirror.safe）
- ar: تثبيت SafeKit للتوافر العالي لـ Windows (mirror.safe)

### quick-install/safekit-quick-installation-guide-in-aws-mirror-safe-module-for-real-time-replication-and-failover.md

- en: Install SafeKit for AWS high availability (mirror.safe)
- fr: Installer SafeKit pour la haute disponibilité AWS (mirror.safe)
- de: SafeKit installieren: Hochverfügbarkeit für AWS (mirror.safe)
- es: Instalar SafeKit: alta disponibilidad de AWS (mirror.safe)
- it: Installa SafeKit per l’alta disponibilità di AWS (mirror.safe)
- nl: AWS: SafeKit installeren voor hoge beschikbaarheid (mirror.safe)
- pt-br: Instalar SafeKit para alta disponibilidade de AWS (mirror.safe)
- pt-pt: Instalar SafeKit: alta disponibilidade de AWS (mirror.safe)
- ja: SafeKit のインストール：AWS の高可用性（mirror.safe）
- ko: SafeKit 설치: AWS 고가용성 (mirror.safe)
- zh-hans: 安装 SafeKit：AWS 高可用（mirror.safe）
- ar: تثبيت SafeKit للتوافر العالي لـ AWS (mirror.safe)

### quick-install/safekit-quick-installation-guide-in-aws-with-network-load-balancing-and-failover.md

- en: Install SafeKit for AWS load balancing (farm.safe)
- fr: Installer SafeKit pour l’équilibrage de charge AWS (farm.safe)
- de: SafeKit installieren: Lastverteilung für AWS (farm.safe)
- es: Instalar SafeKit: balanceo de carga de AWS (farm.safe)
- it: Installa SafeKit per il bilanciamento del carico di AWS (farm.safe)
- nl: AWS: SafeKit installeren voor load balancing (farm.safe)
- pt-br: Instalar SafeKit para balanceamento de carga de AWS (farm.safe)
- pt-pt: Instalar SafeKit: balanceamento de carga de AWS (farm.safe)
- ja: SafeKit のインストール：AWS の負荷分散（farm.safe）
- ko: SafeKit 설치: AWS 부하 분산 (farm.safe)
- zh-hans: 安装 SafeKit：AWS 负载均衡（farm.safe）
- ar: تثبيت SafeKit لموازنة الحمل لـ AWS (farm.safe)

### quick-install/safekit-quick-installation-guide-in-azure-with-network-load-balancing-and-failover.md

- en: Install SafeKit for Azure load balancing (farm.safe)
- fr: Installer SafeKit pour l’équilibrage de charge Azure (farm.safe)
- de: SafeKit installieren: Lastverteilung für Azure (farm.safe)
- es: Instalar SafeKit: balanceo de carga de Azure (farm.safe)
- it: Installa SafeKit per il bilanciamento del carico di Azure (farm.safe)
- nl: Azure: SafeKit installeren voor load balancing (farm.safe)
- pt-br: Instalar SafeKit para balanceamento de carga de Azure (farm.safe)
- pt-pt: Instalar SafeKit: balanceamento de carga de Azure (farm.safe)
- ja: SafeKit のインストール：Azure の負荷分散（farm.safe）
- ko: SafeKit 설치: Azure 부하 분산 (farm.safe)
- zh-hans: 安装 SafeKit：Azure 负载均衡（farm.safe）
- ar: تثبيت SafeKit لموازنة الحمل لـ Azure (farm.safe)

### quick-install/safekit-quick-installation-guide-in-azure-with-real-time-replication-and-failover.md

- en: Install SafeKit for Azure high availability (mirror.safe)
- fr: Installer SafeKit pour la haute disponibilité Azure (mirror.safe)
- de: SafeKit installieren: Hochverfügbarkeit für Azure (mirror.safe)
- es: Instalar SafeKit: alta disponibilidad de Azure (mirror.safe)
- it: Installa SafeKit per l’alta disponibilità di Azure (mirror.safe)
- nl: Azure: SafeKit installeren voor hoge beschikbaarheid (mirror.safe)
- pt-br: Instalar SafeKit para alta disponibilidade de Azure (mirror.safe)
- pt-pt: Instalar SafeKit: alta disponibilidade de Azure (mirror.safe)
- ja: SafeKit のインストール：Azure の高可用性（mirror.safe）
- ko: SafeKit 설치: Azure 고가용성 (mirror.safe)
- zh-hans: 安装 SafeKit：Azure 高可用（mirror.safe）
- ar: تثبيت SafeKit للتوافر العالي لـ Azure (mirror.safe)

### quick-install/safekit-quick-installation-guide-in-cloud-with-network-load-balancing-and-failover.md

- en: Install SafeKit for cloud load balancing (farm.safe)
- fr: Installer SafeKit pour l’équilibrage de charge dans le cloud (farm.safe)
- de: SafeKit installieren: Lastverteilung in der Cloud (farm.safe)
- es: Instalar SafeKit: balanceo de carga en la nube (farm.safe)
- it: Installa SafeKit per il bilanciamento del carico nel cloud (farm.safe)
- nl: Cloud: SafeKit installeren voor load balancing (farm.safe)
- pt-br: Instalar SafeKit para balanceamento de carga na nuvem (farm.safe)
- pt-pt: Instalar SafeKit: balanceamento de carga na cloud (farm.safe)
- ja: SafeKit のインストール：クラウドの負荷分散（farm.safe）
- ko: SafeKit 설치: 클라우드 부하 분산 (farm.safe)
- zh-hans: 安装 SafeKit：云负载均衡（farm.safe）
- ar: تثبيت SafeKit لموازنة الحمل في السحابة (farm.safe)

### quick-install/safekit-quick-installation-guide-in-cloud-with-real-time-replication-and-failover.md

- en: Install SafeKit for cloud high availability (mirror.safe)
- fr: Installer SafeKit pour la haute disponibilité dans le cloud (mirror.safe)
- de: SafeKit installieren: Hochverfügbarkeit in der Cloud (mirror.safe)
- es: Instalar SafeKit: alta disponibilidad en la nube (mirror.safe)
- it: Installa SafeKit per l’alta disponibilità nel cloud (mirror.safe)
- nl: Cloud: SafeKit installeren voor hoge beschikbaarheid (mirror.safe)
- pt-br: Instalar SafeKit para alta disponibilidade na nuvem (mirror.safe)
- pt-pt: Instalar SafeKit: alta disponibilidade na cloud (mirror.safe)
- ja: SafeKit のインストール：クラウドの高可用性（mirror.safe）
- ko: SafeKit 설치: 클라우드 고가용성 (mirror.safe)
- zh-hans: 安装 SafeKit：云高可用（mirror.safe）
- ar: تثبيت SafeKit للتوافر العالي في السحابة (mirror.safe)

### quick-install/safekit-quick-installation-guide-in-gcp-with-network-load-balancing-and-failover.md

- en: Install SafeKit for Google Cloud load balancing (farm.safe)
- fr: Installer SafeKit pour l’équilibrage de charge Google Cloud (farm.safe)
- de: SafeKit installieren: Lastverteilung für Google Cloud (farm.safe)
- es: Instalar SafeKit: balanceo de carga de Google Cloud (farm.safe)
- it: Installa SafeKit per il bilanciamento del carico di Google Cloud (farm.safe)
- nl: Google Cloud: SafeKit installeren voor load balancing (farm.safe)
- pt-br: Instalar SafeKit para balanceamento de carga de Google Cloud (farm.safe)
- pt-pt: Instalar SafeKit: balanceamento de carga de Google Cloud (farm.safe)
- ja: SafeKit のインストール：Google Cloud の負荷分散（farm.safe）
- ko: SafeKit 설치: Google Cloud 부하 분산 (farm.safe)
- zh-hans: 安装 SafeKit：Google Cloud 负载均衡（farm.safe）
- ar: تثبيت SafeKit لموازنة الحمل لـ Google Cloud (farm.safe)

### quick-install/safekit-quick-installation-guide-in-gcp-with-real-time-replication-and-failover.md

- en: Install SafeKit for Google Cloud high availability (mirror.safe)
- fr: Installer SafeKit pour la haute disponibilité Google Cloud (mirror.safe)
- de: SafeKit installieren: Hochverfügbarkeit für Google Cloud (mirror.safe)
- es: Instalar SafeKit: alta disponibilidad de Google Cloud (mirror.safe)
- it: Installa SafeKit per l’alta disponibilità di Google Cloud (mirror.safe)
- nl: Google Cloud: SafeKit installeren voor hoge beschikbaarheid (mirror.safe)
- pt-br: Instalar SafeKit para alta disponibilidade de Google Cloud (mirror.safe)
- pt-pt: Instalar SafeKit: alta disponibilidade de Google Cloud (mirror.safe)
- ja: SafeKit のインストール：Google Cloud の高可用性（mirror.safe）
- ko: SafeKit 설치: Google Cloud 고가용성 (mirror.safe)
- zh-hans: 安装 SafeKit：Google Cloud 高可用（mirror.safe）
- ar: تثبيت SafeKit للتوافر العالي لـ Google Cloud (mirror.safe)

### quick-install/safekit-quick-installation-guide-with-docker.md

- en: Install SafeKit for Docker high availability (mirror.safe)
- fr: Installer SafeKit pour la haute disponibilité Docker (mirror.safe)
- de: SafeKit installieren: Hochverfügbarkeit für Docker (mirror.safe)
- es: Instalar SafeKit: alta disponibilidad de Docker (mirror.safe)
- it: Installa SafeKit per l’alta disponibilità di Docker (mirror.safe)
- nl: Docker: SafeKit installeren voor hoge beschikbaarheid (mirror.safe)
- pt-br: Instalar SafeKit para alta disponibilidade de Docker (mirror.safe)
- pt-pt: Instalar SafeKit: alta disponibilidade de Docker (mirror.safe)
- ja: SafeKit のインストール：Docker の高可用性（mirror.safe）
- ko: SafeKit 설치: Docker 고가용성 (mirror.safe)
- zh-hans: 安装 SafeKit：Docker 高可用（mirror.safe）
- ar: تثبيت SafeKit للتوافر العالي لـ Docker (mirror.safe)

### quick-install/safekit-quick-installation-guide-with-firebird.md

- en: Install SafeKit for Firebird high availability (firebird.safe)
- fr: Installer SafeKit pour la haute disponibilité Firebird (firebird.safe)
- de: SafeKit installieren: Hochverfügbarkeit für Firebird (firebird.safe)
- es: Instalar SafeKit: alta disponibilidad de Firebird (firebird.safe)
- it: Installa SafeKit per l’alta disponibilità di Firebird (firebird.safe)
- nl: Firebird: SafeKit installeren voor hoge beschikbaarheid (firebird.safe)
- pt-br: Instalar SafeKit para alta disponibilidade de Firebird (firebird.safe)
- pt-pt: Instalar SafeKit: alta disponibilidade de Firebird (firebird.safe)
- ja: SafeKit のインストール：Firebird の高可用性（firebird.safe）
- ko: SafeKit 설치: Firebird 고가용성 (firebird.safe)
- zh-hans: 安装 SafeKit：Firebird 高可用（firebird.safe）
- ar: تثبيت SafeKit للتوافر العالي لـ Firebird (firebird.safe)

### quick-install/safekit-quick-installation-guide-with-hyper-v.md

- en: Install SafeKit for Hyper-V high availability (hyperv.safe)
- fr: Installer SafeKit pour la haute disponibilité Hyper-V (hyperv.safe)
- de: SafeKit installieren: Hochverfügbarkeit für Hyper-V (hyperv.safe)
- es: Instalar SafeKit: alta disponibilidad de Hyper-V (hyperv.safe)
- it: Installa SafeKit per l’alta disponibilità di Hyper-V (hyperv.safe)
- nl: Hyper-V: SafeKit installeren voor hoge beschikbaarheid (hyperv.safe)
- pt-br: Instalar SafeKit para alta disponibilidade de Hyper-V (hyperv.safe)
- pt-pt: Instalar SafeKit: alta disponibilidade de Hyper-V (hyperv.safe)
- ja: SafeKit のインストール：Hyper-V の高可用性（hyperv.safe）
- ko: SafeKit 설치: Hyper-V 고가용성 (hyperv.safe)
- zh-hans: 安装 SafeKit：Hyper-V 高可用（hyperv.safe）
- ar: تثبيت SafeKit للتوافر العالي لـ Hyper-V (hyperv.safe)

### quick-install/safekit-quick-installation-guide-with-iis-with-network-load-balancing-and-failover.md

- en: Install SafeKit for IIS load balancing (iis_farm.safe)
- fr: Installer SafeKit pour l’équilibrage de charge IIS (iis_farm.safe)
- de: SafeKit installieren: Lastverteilung für IIS (iis_farm.safe)
- es: Instalar SafeKit: balanceo de carga de IIS (iis_farm.safe)
- it: Installa SafeKit per il bilanciamento del carico di IIS (iis_farm.safe)
- nl: IIS: SafeKit installeren voor load balancing (iis_farm.safe)
- pt-br: Instalar SafeKit para balanceamento de carga de IIS (iis_farm.safe)
- pt-pt: Instalar SafeKit: balanceamento de carga de IIS (iis_farm.safe)
- ja: SafeKit のインストール：IIS の負荷分散（iis_farm.safe）
- ko: SafeKit 설치: IIS 부하 분산 (iis_farm.safe)
- zh-hans: 安装 SafeKit：IIS 负载均衡（iis_farm.safe）
- ar: تثبيت SafeKit لموازنة الحمل لـ IIS (iis_farm.safe)

### quick-install/safekit-quick-installation-guide-with-kubernetes.md

- en: Install SafeKit for Kubernetes K3s high availability (k3s.safe)
- fr: Installer SafeKit pour la haute disponibilité Kubernetes K3s (k3s.safe)
- de: SafeKit installieren: Hochverfügbarkeit für Kubernetes K3s (k3s.safe)
- es: Instalar SafeKit: alta disponibilidad de Kubernetes K3s (k3s.safe)
- it: Installa SafeKit per l’alta disponibilità di Kubernetes K3s (k3s.safe)
- nl: Kubernetes K3s: SafeKit installeren voor hoge beschikbaarheid (k3s.safe)
- pt-br: Instalar SafeKit para alta disponibilidade de Kubernetes K3s (k3s.safe)
- pt-pt: Instalar SafeKit: alta disponibilidade de Kubernetes K3s (k3s.safe)
- ja: SafeKit のインストール：Kubernetes K3s の高可用性（k3s.safe）
- ko: SafeKit 설치: Kubernetes K3s 고가용성 (k3s.safe)
- zh-hans: 安装 SafeKit：Kubernetes K3s 高可用（k3s.safe）
- ar: تثبيت SafeKit للتوافر العالي لـ Kubernetes K3s (k3s.safe)

### quick-install/safekit-quick-installation-guide-with-kvm.md

- en: Install SafeKit for KVM high availability (kvm.safe)
- fr: Installer SafeKit pour la haute disponibilité KVM (kvm.safe)
- de: SafeKit installieren: Hochverfügbarkeit für KVM (kvm.safe)
- es: Instalar SafeKit: alta disponibilidad de KVM (kvm.safe)
- it: Installa SafeKit per l’alta disponibilità di KVM (kvm.safe)
- nl: KVM: SafeKit installeren voor hoge beschikbaarheid (kvm.safe)
- pt-br: Instalar SafeKit para alta disponibilidade de KVM (kvm.safe)
- pt-pt: Instalar SafeKit: alta disponibilidade de KVM (kvm.safe)
- ja: SafeKit のインストール：KVM の高可用性（kvm.safe）
- ko: SafeKit 설치: KVM 고가용성 (kvm.safe)
- zh-hans: 安装 SafeKit：KVM 高可用（kvm.safe）
- ar: تثبيت SafeKit للتوافر العالي لـ KVM (kvm.safe)

### quick-install/safekit-quick-installation-guide-with-mariadb.md

- en: Install SafeKit for MariaDB high availability (mysql.safe)
- fr: Installer SafeKit pour la haute disponibilité MariaDB (mysql.safe)
- de: SafeKit installieren: Hochverfügbarkeit für MariaDB (mysql.safe)
- es: Instalar SafeKit: alta disponibilidad de MariaDB (mysql.safe)
- it: Installa SafeKit per l’alta disponibilità di MariaDB (mysql.safe)
- nl: MariaDB: SafeKit installeren voor hoge beschikbaarheid (mysql.safe)
- pt-br: Instalar SafeKit para alta disponibilidade de MariaDB (mysql.safe)
- pt-pt: Instalar SafeKit: alta disponibilidade de MariaDB (mysql.safe)
- ja: SafeKit のインストール：MariaDB の高可用性（mysql.safe）
- ko: SafeKit 설치: MariaDB 고가용성 (mysql.safe)
- zh-hans: 安装 SafeKit：MariaDB 高可用（mysql.safe）
- ar: تثبيت SafeKit للتوافر العالي لـ MariaDB (mysql.safe)

### quick-install/safekit-quick-installation-guide-with-microsoft-sql-server.md

- en: Install SafeKit for SQL Server high availability (sqlserver.safe)
- fr: Installer SafeKit pour la haute disponibilité SQL Server (sqlserver.safe)
- de: SafeKit installieren: Hochverfügbarkeit für SQL Server (sqlserver.safe)
- es: Instalar SafeKit: alta disponibilidad de SQL Server (sqlserver.safe)
- it: Installa SafeKit per l’alta disponibilità di SQL Server (sqlserver.safe)
- nl: SQL Server: SafeKit installeren voor hoge beschikbaarheid (sqlserver.safe)
- pt-br: Instalar SafeKit para alta disponibilidade de SQL Server (sqlserver.safe)
- pt-pt: Instalar SafeKit: alta disponibilidade de SQL Server (sqlserver.safe)
- ja: SafeKit のインストール：SQL Server の高可用性（sqlserver.safe）
- ko: SafeKit 설치: SQL Server 고가용성 (sqlserver.safe)
- zh-hans: 安装 SafeKit：SQL Server 高可用（sqlserver.safe）
- ar: تثبيت SafeKit للتوافر العالي لـ SQL Server (sqlserver.safe)

### quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server.md

- en: Install SafeKit for Milestone XProtect HA (milestone.safe)
- fr: Installer SafeKit : HA pour Milestone XProtect (milestone.safe)
- de: SafeKit installieren: HA für Milestone XProtect (milestone.safe)
- es: Instalar SafeKit: HA de Milestone XProtect (milestone.safe)
- it: Installa SafeKit per l’HA di Milestone XProtect (milestone.safe)
- nl: Milestone XProtect: SafeKit installeren voor HA (milestone.safe)
- pt-br: Instalar SafeKit para HA de Milestone XProtect (milestone.safe)
- pt-pt: Instalar SafeKit: HA de Milestone XProtect (milestone.safe)
- ja: SafeKit のインストール：Milestone XProtect の高可用性（milestone.safe）
- ko: SafeKit 설치: Milestone XProtect 고가용성 (milestone.safe)
- zh-hans: 安装 SafeKit：Milestone XProtect 高可用（milestone.safe）
- ar: تثبيت SafeKit للتوافر العالي لـ Milestone XProtect (milestone.safe)

### quick-install/safekit-quick-installation-guide-with-mysql.md

- en: Install SafeKit for MySQL high availability (mysql.safe)
- fr: Installer SafeKit pour la haute disponibilité MySQL (mysql.safe)
- de: SafeKit installieren: Hochverfügbarkeit für MySQL (mysql.safe)
- es: Instalar SafeKit: alta disponibilidad de MySQL (mysql.safe)
- it: Installa SafeKit per l’alta disponibilità di MySQL (mysql.safe)
- nl: MySQL: SafeKit installeren voor hoge beschikbaarheid (mysql.safe)
- pt-br: Instalar SafeKit para alta disponibilidade de MySQL (mysql.safe)
- pt-pt: Instalar SafeKit: alta disponibilidade de MySQL (mysql.safe)
- ja: SafeKit のインストール：MySQL の高可用性（mysql.safe）
- ko: SafeKit 설치: MySQL 고가용성 (mysql.safe)
- zh-hans: 安装 SafeKit：MySQL 高可用（mysql.safe）
- ar: تثبيت SafeKit للتوافر العالي لـ MySQL (mysql.safe)

### quick-install/safekit-quick-installation-guide-with-nedap.md

- en: Install SafeKit for Nedap AEOS high availability (nedap.safe)
- fr: Installer SafeKit pour la haute disponibilité Nedap AEOS (nedap.safe)
- de: SafeKit installieren: Hochverfügbarkeit für Nedap AEOS (nedap.safe)
- es: Instalar SafeKit: alta disponibilidad de Nedap AEOS (nedap.safe)
- it: Installa SafeKit per l’alta disponibilità di Nedap AEOS (nedap.safe)
- nl: Nedap AEOS: SafeKit installeren voor hoge beschikbaarheid (nedap.safe)
- pt-br: Instalar SafeKit para alta disponibilidade de Nedap AEOS (nedap.safe)
- pt-pt: Instalar SafeKit: alta disponibilidade de Nedap AEOS (nedap.safe)
- ja: SafeKit のインストール：Nedap AEOS の高可用性（nedap.safe）
- ko: SafeKit 설치: Nedap AEOS 고가용성 (nedap.safe)
- zh-hans: 安装 SafeKit：Nedap AEOS 高可用（nedap.safe）
- ar: تثبيت SafeKit للتوافر العالي لـ Nedap AEOS (nedap.safe)

### quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover.md

- en: Install SafeKit for Apache load balancing (apache_farm.safe)
- fr: Installer SafeKit pour l’équilibrage de charge Apache (apache_farm.safe)
- de: SafeKit installieren: Lastverteilung für Apache (apache_farm.safe)
- es: Instalar SafeKit: balanceo de carga de Apache (apache_farm.safe)
- it: Installa SafeKit per il bilanciamento del carico di Apache (apache_farm.safe)
- nl: Apache: SafeKit installeren voor load balancing (apache_farm.safe)
- pt-br: Instalar SafeKit para balanceamento de carga de Apache (apache_farm.safe)
- pt-pt: Instalar SafeKit: balanceamento de carga de Apache (apache_farm.safe)
- ja: SafeKit のインストール：Apache の負荷分散（apache_farm.safe）
- ko: SafeKit 설치: Apache 부하 분산 (apache_farm.safe)
- zh-hans: 安装 SafeKit：Apache 负载均衡（apache_farm.safe）
- ar: تثبيت SafeKit لموازنة الحمل لـ Apache (apache_farm.safe)

### quick-install/safekit-quick-installation-guide-with-nginx-with-network-load-balancing-and-failover.md

- en: Install SafeKit for NGINX load balancing (farm.safe)
- fr: Installer SafeKit pour l’équilibrage de charge NGINX (farm.safe)
- de: SafeKit installieren: Lastverteilung für NGINX (farm.safe)
- es: Instalar SafeKit: balanceo de carga de NGINX (farm.safe)
- it: Installa SafeKit per il bilanciamento del carico di NGINX (farm.safe)
- nl: NGINX: SafeKit installeren voor load balancing (farm.safe)
- pt-br: Instalar SafeKit para balanceamento de carga de NGINX (farm.safe)
- pt-pt: Instalar SafeKit: balanceamento de carga de NGINX (farm.safe)
- ja: SafeKit のインストール：NGINX の負荷分散（farm.safe）
- ko: SafeKit 설치: NGINX 부하 분산 (farm.safe)
- zh-hans: 安装 SafeKit：NGINX 负载均衡（farm.safe）
- ar: تثبيت SafeKit لموازنة الحمل لـ NGINX (farm.safe)

### quick-install/safekit-quick-installation-guide-with-oracle.md

- en: Install SafeKit for Oracle high availability (oracle.safe)
- fr: Installer SafeKit pour la haute disponibilité Oracle (oracle.safe)
- de: SafeKit installieren: Hochverfügbarkeit für Oracle (oracle.safe)
- es: Instalar SafeKit: alta disponibilidad de Oracle (oracle.safe)
- it: Installa SafeKit per l’alta disponibilità di Oracle (oracle.safe)
- nl: Oracle: SafeKit installeren voor hoge beschikbaarheid (oracle.safe)
- pt-br: Instalar SafeKit para alta disponibilidade de Oracle (oracle.safe)
- pt-pt: Instalar SafeKit: alta disponibilidade de Oracle (oracle.safe)
- ja: SafeKit のインストール：Oracle の高可用性（oracle.safe）
- ko: SafeKit 설치: Oracle 고가용성 (oracle.safe)
- zh-hans: 安装 SafeKit：Oracle 高可用（oracle.safe）
- ar: تثبيت SafeKit للتوافر العالي لـ Oracle (oracle.safe)

### quick-install/safekit-quick-installation-guide-with-podman.md

- en: Install SafeKit for Podman high availability (mirror.safe)
- fr: Installer SafeKit pour la haute disponibilité Podman (mirror.safe)
- de: SafeKit installieren: Hochverfügbarkeit für Podman (mirror.safe)
- es: Instalar SafeKit: alta disponibilidad de Podman (mirror.safe)
- it: Installa SafeKit per l’alta disponibilità di Podman (mirror.safe)
- nl: Podman: SafeKit installeren voor hoge beschikbaarheid (mirror.safe)
- pt-br: Instalar SafeKit para alta disponibilidade de Podman (mirror.safe)
- pt-pt: Instalar SafeKit: alta disponibilidade de Podman (mirror.safe)
- ja: SafeKit のインストール：Podman の高可用性（mirror.safe）
- ko: SafeKit 설치: Podman 고가용성 (mirror.safe)
- zh-hans: 安装 SafeKit：Podman 高可用（mirror.safe）
- ar: تثبيت SafeKit للتوافر العالي لـ Podman (mirror.safe)

### quick-install/safekit-quick-installation-guide-with-postgresql.md

- en: Install SafeKit for PostgreSQL high availability (postgresql.safe)
- fr: Installer SafeKit pour la haute disponibilité PostgreSQL (postgresql.safe)
- de: SafeKit installieren: Hochverfügbarkeit für PostgreSQL (postgresql.safe)
- es: Instalar SafeKit: alta disponibilidad de PostgreSQL (postgresql.safe)
- it: Installa SafeKit per l’alta disponibilità di PostgreSQL (postgresql.safe)
- nl: PostgreSQL: SafeKit installeren voor hoge beschikbaarheid (postgresql.safe)
- pt-br: Instalar SafeKit para alta disponibilidade de PostgreSQL (postgresql.safe)
- pt-pt: Instalar SafeKit: alta disponibilidade de PostgreSQL (postgresql.safe)
- ja: SafeKit のインストール：PostgreSQL の高可用性（postgresql.safe）
- ko: SafeKit 설치: PostgreSQL 고가용성 (postgresql.safe)
- zh-hans: 安装 SafeKit：PostgreSQL 高可用（postgresql.safe）
- ar: تثبيت SafeKit للتوافر العالي لـ PostgreSQL (postgresql.safe)
