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

- en: Apache load balancing and failover
- fr: Équilibrage de charge et basculement Apache
- de: Lastverteilung und Failover für Apache
- es: Balanceo de carga y failover de Apache
- it: Bilanciamento del carico e failover per Apache
- nl: Apache: load balancing en failover
- pt-br: Apache: balanceamento de carga e failover
- pt-pt: Apache: balanceamento de carga e failover
- ja: Apache の負荷分散とフェイルオーバー
- ko: Apache 부하 분산 및 장애 조치
- zh-hans: Apache 负载均衡与故障转移
- ar: موازنة الحمل وتجاوز الفشل لـ Apache

### solutions/aws-high-availability-cluster-synchronous-replication-failover.md

- en: AWS high availability and replication
- fr: Haute disponibilité et réplication AWS
- de: Hochverfügbarkeit und Replikation für AWS
- es: Alta disponibilidad y replicación de AWS
- it: Alta disponibilità e replica per AWS
- nl: AWS: hoge beschikbaarheid en replicatie
- pt-br: AWS: alta disponibilidade e replicação
- pt-pt: AWS: alta disponibilidade e replicação
- ja: AWS の高可用性とレプリケーション
- ko: AWS 고가용성 및 복제
- zh-hans: AWS 高可用与复制
- ar: التوافر العالي والنسخ المتماثل لـ AWS

### solutions/aws-load-balancing-cluster-failover.md

- en: AWS load balancing and failover
- fr: Équilibrage de charge et basculement AWS
- de: Lastverteilung und Failover für AWS
- es: Balanceo de carga y failover de AWS
- it: Bilanciamento del carico e failover per AWS
- nl: AWS: load balancing en failover
- pt-br: AWS: balanceamento de carga e failover
- pt-pt: AWS: balanceamento de carga e failover
- ja: AWS の負荷分散とフェイルオーバー
- ko: AWS 부하 분산 및 장애 조치
- zh-hans: AWS 负载均衡与故障转移
- ar: موازنة الحمل وتجاوز الفشل لـ AWS

### solutions/azure-high-availability-cluster-synchronous-replication-failover.md

- en: Azure high availability and replication
- fr: Haute disponibilité et réplication Azure
- de: Hochverfügbarkeit und Replikation für Azure
- es: Alta disponibilidad y replicación de Azure
- it: Alta disponibilità e replica per Azure
- nl: Azure: hoge beschikbaarheid en replicatie
- pt-br: Azure: alta disponibilidade e replicação
- pt-pt: Azure: alta disponibilidade e replicação
- ja: Azure の高可用性とレプリケーション
- ko: Azure 고가용성 및 복제
- zh-hans: Azure 高可用与复制
- ar: التوافر العالي والنسخ المتماثل لـ Azure

### solutions/azure-load-balancing-cluster-failover.md

- en: Azure load balancing and failover
- fr: Équilibrage de charge et basculement Azure
- de: Lastverteilung und Failover für Azure
- es: Balanceo de carga y failover de Azure
- it: Bilanciamento del carico e failover per Azure
- nl: Azure: load balancing en failover
- pt-br: Azure: balanceamento de carga e failover
- pt-pt: Azure: balanceamento de carga e failover
- ja: Azure の負荷分散とフェイルオーバー
- ko: Azure 부하 분산 및 장애 조치
- zh-hans: Azure 负载均衡与故障转移
- ar: موازنة الحمل وتجاوز الفشل لـ Azure

### solutions/bosch-ams-the-simplest-high-availability-cluster-between-two-redundant-servers-without-shared-disk.md

- en: Bosch AMS high availability without a SAN
- fr: Haute disponibilité Bosch AMS sans SAN
- de: Hochverfügbarkeit für Bosch AMS ohne SAN
- es: Alta disponibilidad de Bosch AMS sin SAN
- it: Alta disponibilità per Bosch AMS senza SAN
- nl: Bosch AMS: hoge beschikbaarheid zonder SAN
- pt-br: Bosch AMS: alta disponibilidade sem SAN
- pt-pt: Bosch AMS: alta disponibilidade sem SAN
- ja: Bosch AMS の高可用性（SAN 不要）
- ko: SAN 없는 Bosch AMS 고가용성
- zh-hans: Bosch AMS 无 SAN 高可用
- ar: التوافر العالي لـ Bosch AMS بدون SAN

### solutions/bosch-bis-the-simplest-high-availability-cluster-between-two-redundant-servers-without-shared-disk.md

- en: Bosch BIS high availability without a SAN
- fr: Haute disponibilité Bosch BIS sans SAN
- de: Hochverfügbarkeit für Bosch BIS ohne SAN
- es: Alta disponibilidad de Bosch BIS sin SAN
- it: Alta disponibilità per Bosch BIS senza SAN
- nl: Bosch BIS: hoge beschikbaarheid zonder SAN
- pt-br: Bosch BIS: alta disponibilidade sem SAN
- pt-pt: Bosch BIS: alta disponibilidade sem SAN
- ja: Bosch BIS の高可用性（SAN 不要）
- ko: SAN 없는 Bosch BIS 고가용성
- zh-hans: Bosch BIS 无 SAN 高可用
- ar: التوافر العالي لـ Bosch BIS بدون SAN

### solutions/bosch-bvms-the-simplest-high-availability-cluster-between-two-redundant-servers-without-shared-disk.md

- en: Bosch BVMS high availability without a SAN
- fr: Haute disponibilité Bosch BVMS sans SAN
- de: Hochverfügbarkeit für Bosch BVMS ohne SAN
- es: Alta disponibilidad de Bosch BVMS sin SAN
- it: Alta disponibilità per Bosch BVMS senza SAN
- nl: Bosch BVMS: hoge beschikbaarheid zonder SAN
- pt-br: Bosch BVMS: alta disponibilidade sem SAN
- pt-pt: Bosch BVMS: alta disponibilidade sem SAN
- ja: Bosch BVMS の高可用性（SAN 不要）
- ko: SAN 없는 Bosch BVMS 고가용성
- zh-hans: Bosch BVMS 无 SAN 高可用
- ar: التوافر العالي لـ Bosch BVMS بدون SAN

### solutions/cloud-high-availability-cluster-synchronous-replication-failover.md

- en: Cloud high availability and replication
- fr: Haute disponibilité et réplication dans le cloud
- de: Hochverfügbarkeit und Replikation in der Cloud
- es: Alta disponibilidad y replicación en la nube
- it: Alta disponibilità e replica nel cloud
- nl: Cloud: hoge beschikbaarheid en replicatie
- pt-br: Nuvem: alta disponibilidade e replicação
- pt-pt: Cloud: alta disponibilidade e replicação
- ja: クラウドの高可用性とレプリケーション
- ko: 클라우드 고가용성 및 복제
- zh-hans: 云高可用与复制
- ar: التوافر العالي والنسخ المتماثل للسحابة

### solutions/cloud-load-balancing-cluster-failover.md

- en: Cloud load balancing and failover
- fr: Équilibrage de charge et basculement dans le cloud
- de: Lastverteilung und Failover in der Cloud
- es: Balanceo de carga y failover en la nube
- it: Bilanciamento del carico e failover nel cloud
- nl: Cloud: load balancing en failover
- pt-br: Nuvem: balanceamento de carga e failover
- pt-pt: Cloud: balanceamento de carga e failover
- ja: クラウドの負荷分散とフェイルオーバー
- ko: 클라우드 부하 분산 및 장애 조치
- zh-hans: 云负载均衡与故障转移
- ar: موازنة الحمل وتجاوز الفشل للسحابة

### solutions/cluster-in-cloud-computing-generic-solution-amazon-aws-microsoft-azure-google-gcp-other-clouds.md

- en: HA cluster in AWS, Azure and Google Cloud
- fr: Cluster HA dans AWS, Azure et Google Cloud
- de: HA-Cluster in AWS, Azure und Google Cloud
- es: Clúster HA en AWS, Azure y Google Cloud
- it: Cluster HA in AWS, Azure e Google Cloud
- nl: HA-cluster in AWS, Azure en Google Cloud
- pt-br: Cluster HA na AWS, Azure e Google Cloud
- pt-pt: Cluster HA em AWS, Azure e Google Cloud
- ja: AWS、Azure、Google Cloud の HA クラスター
- ko: AWS, Azure 및 Google Cloud의 HA 클러스터
- zh-hans: AWS、Azure 和 Google Cloud 中的 HA 集群
- ar: مجموعة HA في AWS و Azure و Google Cloud

### solutions/docker-container-high-availability-cluster-synchronous-replication-failover.md

- en: Docker high availability and replication
- fr: Haute disponibilité et réplication Docker
- de: Hochverfügbarkeit und Replikation für Docker
- es: Alta disponibilidad y replicación de Docker
- it: Alta disponibilità e replica per Docker
- nl: Docker: hoge beschikbaarheid en replicatie
- pt-br: Docker: alta disponibilidade e replicação
- pt-pt: Docker: alta disponibilidade e replicação
- ja: Docker の高可用性とレプリケーション
- ko: Docker 고가용성 및 복제
- zh-hans: Docker 高可用与复制
- ar: التوافر العالي والنسخ المتماثل لـ Docker

### solutions/firebird-high-availability-synchronous-replication-failover.md

- en: Firebird high availability and replication
- fr: Haute disponibilité et réplication Firebird
- de: Hochverfügbarkeit und Replikation für Firebird
- es: Alta disponibilidad y replicación de Firebird
- it: Alta disponibilità e replica per Firebird
- nl: Firebird: hoge beschikbaarheid en replicatie
- pt-br: Firebird: alta disponibilidade e replicação
- pt-pt: Firebird: alta disponibilidade e replicação
- ja: Firebird の高可用性とレプリケーション
- ko: Firebird 고가용성 및 복제
- zh-hans: Firebird 高可用与复制
- ar: التوافر العالي والنسخ المتماثل لـ Firebird

### solutions/gcp-high-availability-cluster-synchronous-replication-failover.md

- en: Google Cloud high availability and replication
- fr: Haute disponibilité et réplication Google Cloud
- de: Hochverfügbarkeit und Replikation für Google Cloud
- es: Alta disponibilidad y replicación de Google Cloud
- it: Alta disponibilità e replica per Google Cloud
- nl: Google Cloud: hoge beschikbaarheid en replicatie
- pt-br: Google Cloud: alta disponibilidade e replicação
- pt-pt: Google Cloud: alta disponibilidade e replicação
- ja: Google Cloud の高可用性とレプリケーション
- ko: Google Cloud 고가용성 및 복제
- zh-hans: Google Cloud 高可用与复制
- ar: التوافر العالي والنسخ المتماثل لـ Google Cloud

### solutions/gcp-load-balancing-cluster-failover.md

- en: Google Cloud load balancing and failover
- fr: Équilibrage de charge et basculement Google Cloud
- de: Lastverteilung und Failover für Google Cloud
- es: Balanceo de carga y failover de Google Cloud
- it: Bilanciamento del carico e failover per Google Cloud
- nl: Google Cloud: load balancing en failover
- pt-br: Google Cloud: balanceamento de carga e failover
- pt-pt: Google Cloud: balanceamento de carga e failover
- ja: Google Cloud の負荷分散とフェイルオーバー
- ko: Google Cloud 부하 분산 및 장애 조치
- zh-hans: Google Cloud 负载均衡与故障转移
- ar: موازنة الحمل وتجاوز الفشل لـ Google Cloud

### solutions/genetec-sql-server-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers.md

- en: Genetec SQL Server high availability
- fr: Haute disponibilité Genetec SQL Server
- de: Hochverfügbarkeit für Genetec SQL Server
- es: Alta disponibilidad de Genetec SQL Server
- it: Alta disponibilità per Genetec SQL Server
- nl: Genetec SQL Server: hoge beschikbaarheid
- pt-br: Genetec SQL Server: alta disponibilidade
- pt-pt: Genetec SQL Server: alta disponibilidade
- ja: Genetec SQL Server の高可用性
- ko: Genetec SQL Server 고가용성
- zh-hans: Genetec SQL Server 高可用
- ar: التوافر العالي لـ Genetec SQL Server

### solutions/hanwha-vision-cluster-without-shared-storage-on-a-san.md

- en: Hanwha Vision VMS high availability without a SAN
- fr: Haute disponibilité Hanwha Vision VMS sans SAN
- de: Hochverfügbarkeit für Hanwha Vision VMS ohne SAN
- es: Alta disponibilidad de Hanwha Vision VMS sin SAN
- it: Alta disponibilità per Hanwha Vision VMS senza SAN
- nl: Hanwha Vision VMS: hoge beschikbaarheid zonder SAN
- pt-br: Hanwha Vision VMS: alta disponibilidade sem SAN
- pt-pt: Hanwha Vision VMS: alta disponibilidade sem SAN
- ja: Hanwha Vision VMS の高可用性（SAN 不要）
- ko: SAN 없는 Hanwha Vision VMS 고가용성
- zh-hans: Hanwha Vision VMS 无 SAN 高可用
- ar: التوافر العالي لـ Hanwha Vision VMS بدون SAN

### solutions/hanwha-wisenet-wave-the-simplest-high-availability-cluster-between-two-redundant-servers-without-shared-disk.md

- en: Hanwha Wisenet WAVE high availability
- fr: Haute disponibilité Hanwha Wisenet WAVE
- de: Hochverfügbarkeit für Hanwha Wisenet WAVE
- es: Alta disponibilidad de Hanwha Wisenet WAVE
- it: Alta disponibilità per Hanwha Wisenet WAVE
- nl: Hanwha Wisenet WAVE: hoge beschikbaarheid
- pt-br: Hanwha Wisenet WAVE: alta disponibilidade
- pt-pt: Hanwha Wisenet WAVE: alta disponibilidade
- ja: Hanwha Wisenet WAVE の高可用性
- ko: Hanwha Wisenet WAVE 고가용성
- zh-hans: Hanwha Wisenet WAVE 高可用
- ar: التوافر العالي لـ Hanwha Wisenet WAVE

### solutions/hyper-v-replication-automatic-failover-load-balancing.md

- en: Hyper-V high availability without shared storage
- fr: Haute disponibilité Hyper-V sans disque partagé
- de: Hyper-V: Hochverfügbarkeit ohne Shared Storage
- es: Alta disponibilidad de Hyper-V sin disco compartido
- it: Alta disponibilità Hyper-V senza storage condiviso
- nl: Hyper-V: hoge beschikbaarheid zonder gedeelde opslag
- pt-br: Hyper-V: alta disponibilidade sem disco compartilhado
- pt-pt: Hyper-V: alta disponibilidade sem disco partilhado
- ja: Hyper-V の高可用性（共有ストレージ不要）
- ko: 공유 스토리지 없는 Hyper-V 고가용성
- zh-hans: 无共享存储的 Hyper-V 高可用
- ar: التوافر العالي لـ Hyper-V بدون تخزين مشترك

### solutions/iis-load-balancing-failover.md

- en: IIS load balancing and failover
- fr: Équilibrage de charge et basculement IIS
- de: Lastverteilung und Failover für IIS
- es: Balanceo de carga y failover de IIS
- it: Bilanciamento del carico e failover per IIS
- nl: IIS: load balancing en failover
- pt-br: IIS: balanceamento de carga e failover
- pt-pt: IIS: balanceamento de carga e failover
- ja: IIS の負荷分散とフェイルオーバー
- ko: IIS 부하 분산 및 장애 조치
- zh-hans: IIS 负载均衡与故障转移
- ar: موازنة الحمل وتجاوز الفشل لـ IIS

### solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers.md

- en: Kubernetes K3s high availability on two nodes
- fr: Haute disponibilité Kubernetes K3s sur deux nœuds
- de: Kubernetes K3s: Hochverfügbarkeit auf zwei Knoten
- es: Alta disponibilidad de Kubernetes K3s en dos nodos
- it: Alta disponibilità per Kubernetes K3s su due nodi
- nl: Kubernetes K3s: hoge beschikbaarheid op twee nodes
- pt-br: Kubernetes K3s: alta disponibilidade em dois nós
- pt-pt: Kubernetes K3s: alta disponibilidade em dois nós
- ja: 2 ノードでの Kubernetes K3s の高可用性
- ko: 2노드 Kubernetes K3s 고가용성
- zh-hans: 双节点 Kubernetes K3s 高可用
- ar: التوافر العالي لـ Kubernetes K3s على عقدتين

### solutions/linux-high-availability-software-synchronous-replication-failover.md

- en: Linux high availability and replication
- fr: Haute disponibilité et réplication Linux
- de: Hochverfügbarkeit und Replikation für Linux
- es: Alta disponibilidad y replicación de Linux
- it: Alta disponibilità e replica per Linux
- nl: Linux: hoge beschikbaarheid en replicatie
- pt-br: Linux: alta disponibilidade e replicação
- pt-pt: Linux: alta disponibilidade e replicação
- ja: Linux の高可用性とレプリケーション
- ko: Linux 고가용성 및 복제
- zh-hans: Linux 高可用与复制
- ar: التوافر العالي والنسخ المتماثل لـ Linux

### solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing.md

- en: Linux KVM high availability without shared storage
- fr: Haute disponibilité Linux KVM sans disque partagé
- de: Linux KVM: Hochverfügbarkeit ohne Shared Storage
- es: Alta disponibilidad de Linux KVM sin disco compartido
- it: Alta disponibilità Linux KVM senza storage condiviso
- nl: Linux KVM: hoge beschikbaarheid zonder gedeelde opslag
- pt-br: Linux KVM: alta disponibilidade sem disco compartilhado
- pt-pt: Linux KVM: alta disponibilidade sem disco partilhado
- ja: Linux KVM の高可用性（共有ストレージ不要）
- ko: 공유 스토리지 없는 Linux KVM 고가용성
- zh-hans: 无共享存储的 Linux KVM 高可用
- ar: التوافر العالي لـ Linux KVM بدون تخزين مشترك

### solutions/linux-load-balancing-failover.md

- en: Linux load balancing and failover
- fr: Équilibrage de charge et basculement Linux
- de: Lastverteilung und Failover für Linux
- es: Balanceo de carga y failover de Linux
- it: Bilanciamento del carico e failover per Linux
- nl: Linux: load balancing en failover
- pt-br: Linux: balanceamento de carga e failover
- pt-pt: Linux: balanceamento de carga e failover
- ja: Linux の負荷分散とフェイルオーバー
- ko: Linux 부하 분산 및 장애 조치
- zh-hans: Linux 负载均衡与故障转移
- ar: موازنة الحمل وتجاوز الفشل لـ Linux

### solutions/mariadb-simplest-high-availability-cluster-synchronous-replication-failover-redundant-servers.md

- en: MariaDB high availability and replication
- fr: Haute disponibilité et réplication MariaDB
- de: Hochverfügbarkeit und Replikation für MariaDB
- es: Alta disponibilidad y replicación de MariaDB
- it: Alta disponibilità e replica per MariaDB
- nl: MariaDB: hoge beschikbaarheid en replicatie
- pt-br: MariaDB: alta disponibilidade e replicação
- pt-pt: MariaDB: alta disponibilidade e replicação
- ja: MariaDB の高可用性とレプリケーション
- ko: MariaDB 고가용성 및 복제
- zh-hans: MariaDB 高可用与复制
- ar: التوافر العالي والنسخ المتماثل لـ MariaDB

### solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover.md

- en: Milestone XProtect high availability
- fr: Haute disponibilité Milestone XProtect
- de: Hochverfügbarkeit für Milestone XProtect
- es: Alta disponibilidad de Milestone XProtect
- it: Alta disponibilità per Milestone XProtect
- nl: Milestone XProtect: hoge beschikbaarheid
- pt-br: Milestone XProtect: alta disponibilidade
- pt-pt: Milestone XProtect: alta disponibilidade
- ja: Milestone XProtect の高可用性
- ko: Milestone XProtect 고가용성
- zh-hans: Milestone XProtect 高可用
- ar: التوافر العالي لـ Milestone XProtect

### solutions/mysql-high-availability-synchronous-replication-failover.md

- en: MySQL high availability and replication
- fr: Haute disponibilité et réplication MySQL
- de: Hochverfügbarkeit und Replikation für MySQL
- es: Alta disponibilidad y replicación de MySQL
- it: Alta disponibilità e replica per MySQL
- nl: MySQL: hoge beschikbaarheid en replicatie
- pt-br: MySQL: alta disponibilidade e replicação
- pt-pt: MySQL: alta disponibilidade e replicação
- ja: MySQL の高可用性とレプリケーション
- ko: MySQL 고가용성 및 복제
- zh-hans: MySQL 高可用与复制
- ar: التوافر العالي والنسخ المتماثل لـ MySQL

### solutions/nedap-high-availability-synchronous-replication-failover.md

- en: Nedap AEOS high availability
- fr: Haute disponibilité Nedap AEOS
- de: Hochverfügbarkeit für Nedap AEOS
- es: Alta disponibilidad de Nedap AEOS
- it: Alta disponibilità per Nedap AEOS
- nl: Nedap AEOS: hoge beschikbaarheid
- pt-br: Nedap AEOS: alta disponibilidade
- pt-pt: Nedap AEOS: alta disponibilidade
- ja: Nedap AEOS の高可用性
- ko: Nedap AEOS 고가용성
- zh-hans: Nedap AEOS 高可用
- ar: التوافر العالي لـ Nedap AEOS

### solutions/nginx-the-simplest-load-balancing-cluster-with-failover.md

- en: NGINX load balancing and failover
- fr: Équilibrage de charge et basculement NGINX
- de: Lastverteilung und Failover für NGINX
- es: Balanceo de carga y failover de NGINX
- it: Bilanciamento del carico e failover per NGINX
- nl: NGINX: load balancing en failover
- pt-br: NGINX: balanceamento de carga e failover
- pt-pt: NGINX: balanceamento de carga e failover
- ja: NGINX の負荷分散とフェイルオーバー
- ko: NGINX 부하 분산 및 장애 조치
- zh-hans: NGINX 负载均衡与故障转移
- ar: موازنة الحمل وتجاوز الفشل لـ NGINX

### solutions/oracle-high-availability-synchronous-replication-failover.md

- en: Oracle high availability and replication
- fr: Haute disponibilité et réplication Oracle
- de: Hochverfügbarkeit und Replikation für Oracle
- es: Alta disponibilidad y replicación de Oracle
- it: Alta disponibilità e replica per Oracle
- nl: Oracle: hoge beschikbaarheid en replicatie
- pt-br: Oracle: alta disponibilidade e replicação
- pt-pt: Oracle: alta disponibilidade e replicação
- ja: Oracle の高可用性とレプリケーション
- ko: Oracle 고가용성 및 복제
- zh-hans: Oracle 高可用与复制
- ar: التوافر العالي والنسخ المتماثل لـ Oracle

### solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers.md

- en: Podman high availability and replication
- fr: Haute disponibilité et réplication Podman
- de: Hochverfügbarkeit und Replikation für Podman
- es: Alta disponibilidad y replicación de Podman
- it: Alta disponibilità e replica per Podman
- nl: Podman: hoge beschikbaarheid en replicatie
- pt-br: Podman: alta disponibilidade e replicação
- pt-pt: Podman: alta disponibilidade e replicação
- ja: Podman の高可用性とレプリケーション
- ko: Podman 고가용성 및 복제
- zh-hans: Podman 高可用与复制
- ar: التوافر العالي والنسخ المتماثل لـ Podman

### solutions/postgresql-high-availability-synchronous-replication-failover.md

- en: PostgreSQL high availability and replication
- fr: Haute disponibilité et réplication PostgreSQL
- de: Hochverfügbarkeit und Replikation für PostgreSQL
- es: Alta disponibilidad y replicación de PostgreSQL
- it: Alta disponibilità e replica per PostgreSQL
- nl: PostgreSQL: hoge beschikbaarheid en replicatie
- pt-br: PostgreSQL: alta disponibilidade e replicação
- pt-pt: PostgreSQL: alta disponibilidade e replicação
- ja: PostgreSQL の高可用性とレプリケーション
- ko: PostgreSQL 고가용성 및 복제
- zh-hans: PostgreSQL 高可用与复制
- ar: التوافر العالي والنسخ المتماثل لـ PostgreSQL

### solutions/siemens-desigo-cc-redundancy-high-availability-cluster-active-active.md

- en: Siemens Desigo CC high availability without a SAN
- fr: Haute disponibilité Siemens Desigo CC sans SAN
- de: Hochverfügbarkeit für Siemens Desigo CC ohne SAN
- es: Alta disponibilidad de Siemens Desigo CC sin SAN
- it: Alta disponibilità per Siemens Desigo CC senza SAN
- nl: Siemens Desigo CC: hoge beschikbaarheid zonder SAN
- pt-br: Siemens Desigo CC: alta disponibilidade sem SAN
- pt-pt: Siemens Desigo CC: alta disponibilidade sem SAN
- ja: Siemens Desigo CC の高可用性（SAN 不要）
- ko: SAN 없는 Siemens Desigo CC 고가용성
- zh-hans: Siemens Desigo CC 无 SAN 高可用
- ar: التوافر العالي لـ Siemens Desigo CC بدون SAN

### solutions/siemens-simatic-pcs-7-redundancy-high-availability-cluster-active-active.md

- en: Siemens SIMATIC PCS 7 high availability
- fr: Haute disponibilité Siemens SIMATIC PCS 7
- de: Hochverfügbarkeit für Siemens SIMATIC PCS 7
- es: Alta disponibilidad de Siemens SIMATIC PCS 7
- it: Alta disponibilità per Siemens SIMATIC PCS 7
- nl: Siemens SIMATIC PCS 7: hoge beschikbaarheid
- pt-br: Siemens SIMATIC PCS 7: alta disponibilidade
- pt-pt: Siemens SIMATIC PCS 7: alta disponibilidade
- ja: Siemens SIMATIC PCS 7 の高可用性
- ko: Siemens SIMATIC PCS 7 고가용성
- zh-hans: Siemens SIMATIC PCS 7 高可用
- ar: التوافر العالي لـ Siemens SIMATIC PCS 7

### solutions/siemens-simatic-wincc-redundancy-high-availability-cluster-active-active.md

- en: Siemens SIMATIC WinCC high availability
- fr: Haute disponibilité Siemens SIMATIC WinCC
- de: Hochverfügbarkeit für Siemens SIMATIC WinCC
- es: Alta disponibilidad de Siemens SIMATIC WinCC
- it: Alta disponibilità per Siemens SIMATIC WinCC
- nl: Siemens SIMATIC WinCC: hoge beschikbaarheid
- pt-br: Siemens SIMATIC WinCC: alta disponibilidade
- pt-pt: Siemens SIMATIC WinCC: alta disponibilidade
- ja: Siemens SIMATIC WinCC の高可用性
- ko: Siemens SIMATIC WinCC 고가용성
- zh-hans: Siemens SIMATIC WinCC 高可用
- ar: التوافر العالي لـ Siemens SIMATIC WinCC

### solutions/siemens-sipass-redundancy-high-availability-cluster-active-active.md

- en: Siemens SiPass high availability
- fr: Haute disponibilité Siemens SiPass
- de: Hochverfügbarkeit für Siemens SiPass
- es: Alta disponibilidad de Siemens SiPass
- it: Alta disponibilità per Siemens SiPass
- nl: Siemens SiPass: hoge beschikbaarheid
- pt-br: Siemens SiPass: alta disponibilidade
- pt-pt: Siemens SiPass: alta disponibilidade
- ja: Siemens SiPass の高可用性
- ko: Siemens SiPass 고가용성
- zh-hans: Siemens SiPass 高可用
- ar: التوافر العالي لـ Siemens SiPass

### solutions/siemens-siport-redundancy-high-availability-cluster-active-active.md

- en: Siemens SIPORT high availability
- fr: Haute disponibilité Siemens SIPORT
- de: Hochverfügbarkeit für Siemens SIPORT
- es: Alta disponibilidad de Siemens SIPORT
- it: Alta disponibilità per Siemens SIPORT
- nl: Siemens SIPORT: hoge beschikbaarheid
- pt-br: Siemens SIPORT: alta disponibilidade
- pt-pt: Siemens SIPORT: alta disponibilidade
- ja: Siemens SIPORT の高可用性
- ko: Siemens SIPORT 고가용성
- zh-hans: Siemens SIPORT 高可用
- ar: التوافر العالي لـ Siemens SIPORT

### solutions/siemens-siveillance-redundancy-high-availability-cluster-active-active.md

- en: Siemens Siveillance Suite high availability
- fr: Haute disponibilité Siemens Siveillance Suite
- de: Hochverfügbarkeit für Siemens Siveillance Suite
- es: Alta disponibilidad de Siemens Siveillance Suite
- it: Alta disponibilità per Siemens Siveillance Suite
- nl: Siemens Siveillance Suite: hoge beschikbaarheid
- pt-br: Siemens Siveillance Suite: alta disponibilidade
- pt-pt: Siemens Siveillance Suite: alta disponibilidade
- ja: Siemens Siveillance Suite の高可用性
- ko: Siemens Siveillance Suite 고가용성
- zh-hans: Siemens Siveillance Suite 高可用
- ar: التوافر العالي لـ Siemens Siveillance Suite

### solutions/siemens-siveillance-vms-the-simplest-high-availability-cluster-between-two-redundant-servers.md

- en: Siemens Siveillance VMS high availability
- fr: Haute disponibilité Siemens Siveillance VMS
- de: Hochverfügbarkeit für Siemens Siveillance VMS
- es: Alta disponibilidad de Siemens Siveillance VMS
- it: Alta disponibilità per Siemens Siveillance VMS
- nl: Siemens Siveillance VMS: hoge beschikbaarheid
- pt-br: Siemens Siveillance VMS: alta disponibilidade
- pt-pt: Siemens Siveillance VMS: alta disponibilidade
- ja: Siemens Siveillance VMS の高可用性
- ko: Siemens Siveillance VMS 고가용성
- zh-hans: Siemens Siveillance VMS 高可用
- ar: التوافر العالي لـ Siemens Siveillance VMS

### solutions/sql-server-high-availability-synchronous-replication-failover.md

- en: SQL Server high availability and replication
- fr: Haute disponibilité et réplication SQL Server
- de: Hochverfügbarkeit und Replikation für SQL Server
- es: Alta disponibilidad y replicación de SQL Server
- it: Alta disponibilità e replica per SQL Server
- nl: SQL Server: hoge beschikbaarheid en replicatie
- pt-br: SQL Server: alta disponibilidade e replicação
- pt-pt: SQL Server: alta disponibilidade e replicação
- ja: SQL Server の高可用性とレプリケーション
- ko: SQL Server 고가용성 및 복제
- zh-hans: SQL Server 高可用与复制
- ar: التوافر العالي والنسخ المتماثل لـ SQL Server

### solutions/windows-high-availability-software-synchronous-replication-failover.md

- en: Windows high availability and replication
- fr: Haute disponibilité et réplication Windows
- de: Hochverfügbarkeit und Replikation für Windows
- es: Alta disponibilidad y replicación de Windows
- it: Alta disponibilità e replica per Windows
- nl: Windows: hoge beschikbaarheid en replicatie
- pt-br: Windows: alta disponibilidade e replicação
- pt-pt: Windows: alta disponibilidade e replicação
- ja: Windows の高可用性とレプリケーション
- ko: Windows 고가용성 및 복제
- zh-hans: Windows 高可用与复制
- ar: التوافر العالي والنسخ المتماثل لـ Windows

### solutions/windows-load-balancing-failover.md

- en: Windows load balancing and failover
- fr: Équilibrage de charge et basculement Windows
- de: Lastverteilung und Failover für Windows
- es: Balanceo de carga y failover de Windows
- it: Bilanciamento del carico e failover per Windows
- nl: Windows: load balancing en failover
- pt-br: Windows: balanceamento de carga e failover
- pt-pt: Windows: balanceamento de carga e failover
- ja: Windows の負荷分散とフェイルオーバー
- ko: Windows 부하 분산 및 장애 조치
- zh-hans: Windows 负载均衡与故障转移
- ar: موازنة الحمل وتجاوز الفشل لـ Windows

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

- en: Install SafeKit for Linux load balancing
- fr: Installer SafeKit pour l’équilibrage de charge Linux
- de: SafeKit installieren: Lastverteilung für Linux
- es: Instalar SafeKit: balanceo de carga de Linux
- it: Installa SafeKit per il bilanciamento del carico di Linux
- nl: Linux: SafeKit installeren voor load balancing
- pt-br: Instalar SafeKit para balanceamento de carga de Linux
- pt-pt: Instalar SafeKit: balanceamento de carga de Linux
- ja: SafeKit のインストール：Linux の負荷分散
- ko: SafeKit 설치: Linux 부하 분산
- zh-hans: 安装 SafeKit：Linux 负载均衡
- ar: تثبيت SafeKit لموازنة الحمل لـ Linux

### quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover.md

- en: Install SafeKit for Linux high availability
- fr: Installer SafeKit pour la haute disponibilité Linux
- de: SafeKit installieren: Hochverfügbarkeit für Linux
- es: Instalar SafeKit: alta disponibilidad de Linux
- it: Installa SafeKit per l’alta disponibilità di Linux
- nl: Linux: SafeKit installeren voor hoge beschikbaarheid
- pt-br: Instalar SafeKit para alta disponibilidade de Linux
- pt-pt: Instalar SafeKit: alta disponibilidade de Linux
- ja: SafeKit のインストール：Linux の高可用性
- ko: SafeKit 설치: Linux 고가용성
- zh-hans: 安装 SafeKit：Linux 高可用
- ar: تثبيت SafeKit للتوافر العالي لـ Linux

### quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover.md

- en: Install SafeKit for Windows load balancing
- fr: Installer SafeKit pour l’équilibrage de charge Windows
- de: SafeKit installieren: Lastverteilung für Windows
- es: Instalar SafeKit: balanceo de carga de Windows
- it: Installa SafeKit per il bilanciamento del carico di Windows
- nl: Windows: SafeKit installeren voor load balancing
- pt-br: Instalar SafeKit para balanceamento de carga de Windows
- pt-pt: Instalar SafeKit: balanceamento de carga de Windows
- ja: SafeKit のインストール：Windows の負荷分散
- ko: SafeKit 설치: Windows 부하 분산
- zh-hans: 安装 SafeKit：Windows 负载均衡
- ar: تثبيت SafeKit لموازنة الحمل لـ Windows

### quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover.md

- en: Install SafeKit for Windows high availability
- fr: Installer SafeKit pour la haute disponibilité Windows
- de: SafeKit installieren: Hochverfügbarkeit für Windows
- es: Instalar SafeKit: alta disponibilidad de Windows
- it: Installa SafeKit per l’alta disponibilità di Windows
- nl: Windows: SafeKit installeren voor hoge beschikbaarheid
- pt-br: Instalar SafeKit para alta disponibilidade de Windows
- pt-pt: Instalar SafeKit: alta disponibilidade de Windows
- ja: SafeKit のインストール：Windows の高可用性
- ko: SafeKit 설치: Windows 고가용성
- zh-hans: 安装 SafeKit：Windows 高可用
- ar: تثبيت SafeKit للتوافر العالي لـ Windows

### quick-install/safekit-quick-installation-guide-in-aws-mirror-safe-module-for-real-time-replication-and-failover.md

- en: Install SafeKit for AWS high availability
- fr: Installer SafeKit pour la haute disponibilité AWS
- de: SafeKit installieren: Hochverfügbarkeit für AWS
- es: Instalar SafeKit: alta disponibilidad de AWS
- it: Installa SafeKit per l’alta disponibilità di AWS
- nl: AWS: SafeKit installeren voor hoge beschikbaarheid
- pt-br: Instalar SafeKit para alta disponibilidade de AWS
- pt-pt: Instalar SafeKit: alta disponibilidade de AWS
- ja: SafeKit のインストール：AWS の高可用性
- ko: SafeKit 설치: AWS 고가용성
- zh-hans: 安装 SafeKit：AWS 高可用
- ar: تثبيت SafeKit للتوافر العالي لـ AWS

### quick-install/safekit-quick-installation-guide-in-aws-with-network-load-balancing-and-failover.md

- en: Install SafeKit for AWS load balancing
- fr: Installer SafeKit pour l’équilibrage de charge AWS
- de: SafeKit installieren: Lastverteilung für AWS
- es: Instalar SafeKit: balanceo de carga de AWS
- it: Installa SafeKit per il bilanciamento del carico di AWS
- nl: AWS: SafeKit installeren voor load balancing
- pt-br: Instalar SafeKit para balanceamento de carga de AWS
- pt-pt: Instalar SafeKit: balanceamento de carga de AWS
- ja: SafeKit のインストール：AWS の負荷分散
- ko: SafeKit 설치: AWS 부하 분산
- zh-hans: 安装 SafeKit：AWS 负载均衡
- ar: تثبيت SafeKit لموازنة الحمل لـ AWS

### quick-install/safekit-quick-installation-guide-in-azure-with-network-load-balancing-and-failover.md

- en: Install SafeKit for Azure load balancing
- fr: Installer SafeKit pour l’équilibrage de charge Azure
- de: SafeKit installieren: Lastverteilung für Azure
- es: Instalar SafeKit: balanceo de carga de Azure
- it: Installa SafeKit per il bilanciamento del carico di Azure
- nl: Azure: SafeKit installeren voor load balancing
- pt-br: Instalar SafeKit para balanceamento de carga de Azure
- pt-pt: Instalar SafeKit: balanceamento de carga de Azure
- ja: SafeKit のインストール：Azure の負荷分散
- ko: SafeKit 설치: Azure 부하 분산
- zh-hans: 安装 SafeKit：Azure 负载均衡
- ar: تثبيت SafeKit لموازنة الحمل لـ Azure

### quick-install/safekit-quick-installation-guide-in-azure-with-real-time-replication-and-failover.md

- en: Install SafeKit for Azure high availability
- fr: Installer SafeKit pour la haute disponibilité Azure
- de: SafeKit installieren: Hochverfügbarkeit für Azure
- es: Instalar SafeKit: alta disponibilidad de Azure
- it: Installa SafeKit per l’alta disponibilità di Azure
- nl: Azure: SafeKit installeren voor hoge beschikbaarheid
- pt-br: Instalar SafeKit para alta disponibilidade de Azure
- pt-pt: Instalar SafeKit: alta disponibilidade de Azure
- ja: SafeKit のインストール：Azure の高可用性
- ko: SafeKit 설치: Azure 고가용성
- zh-hans: 安装 SafeKit：Azure 高可用
- ar: تثبيت SafeKit للتوافر العالي لـ Azure

### quick-install/safekit-quick-installation-guide-in-cloud-with-network-load-balancing-and-failover.md

- en: Install SafeKit for cloud load balancing
- fr: Installer SafeKit pour l’équilibrage de charge dans le cloud
- de: SafeKit installieren: Lastverteilung in der Cloud
- es: Instalar SafeKit: balanceo de carga en la nube
- it: Installa SafeKit per il bilanciamento del carico nel cloud
- nl: Cloud: SafeKit installeren voor load balancing
- pt-br: Instalar SafeKit para balanceamento de carga na nuvem
- pt-pt: Instalar SafeKit: balanceamento de carga na cloud
- ja: SafeKit のインストール：クラウドの負荷分散
- ko: SafeKit 설치: 클라우드 부하 분산
- zh-hans: 安装 SafeKit：云负载均衡
- ar: تثبيت SafeKit لموازنة الحمل في السحابة

### quick-install/safekit-quick-installation-guide-in-cloud-with-real-time-replication-and-failover.md

- en: Install SafeKit for cloud high availability
- fr: Installer SafeKit pour la haute disponibilité dans le cloud
- de: SafeKit installieren: Hochverfügbarkeit in der Cloud
- es: Instalar SafeKit: alta disponibilidad en la nube
- it: Installa SafeKit per l’alta disponibilità nel cloud
- nl: Cloud: SafeKit installeren voor hoge beschikbaarheid
- pt-br: Instalar SafeKit para alta disponibilidade na nuvem
- pt-pt: Instalar SafeKit: alta disponibilidade na cloud
- ja: SafeKit のインストール：クラウドの高可用性
- ko: SafeKit 설치: 클라우드 고가용성
- zh-hans: 安装 SafeKit：云高可用
- ar: تثبيت SafeKit للتوافر العالي في السحابة

### quick-install/safekit-quick-installation-guide-in-gcp-with-network-load-balancing-and-failover.md

- en: Install SafeKit for Google Cloud load balancing
- fr: Installer SafeKit pour l’équilibrage de charge Google Cloud
- de: SafeKit installieren: Lastverteilung für Google Cloud
- es: Instalar SafeKit: balanceo de carga de Google Cloud
- it: Installa SafeKit per il bilanciamento del carico di Google Cloud
- nl: Google Cloud: SafeKit installeren voor load balancing
- pt-br: Instalar SafeKit para balanceamento de carga de Google Cloud
- pt-pt: Instalar SafeKit: balanceamento de carga de Google Cloud
- ja: SafeKit のインストール：Google Cloud の負荷分散
- ko: SafeKit 설치: Google Cloud 부하 분산
- zh-hans: 安装 SafeKit：Google Cloud 负载均衡
- ar: تثبيت SafeKit لموازنة الحمل لـ Google Cloud

### quick-install/safekit-quick-installation-guide-in-gcp-with-real-time-replication-and-failover.md

- en: Install SafeKit for Google Cloud high availability
- fr: Installer SafeKit pour la haute disponibilité Google Cloud
- de: SafeKit installieren: Hochverfügbarkeit für Google Cloud
- es: Instalar SafeKit: alta disponibilidad de Google Cloud
- it: Installa SafeKit per l’alta disponibilità di Google Cloud
- nl: Google Cloud: SafeKit installeren voor hoge beschikbaarheid
- pt-br: Instalar SafeKit para alta disponibilidade de Google Cloud
- pt-pt: Instalar SafeKit: alta disponibilidade de Google Cloud
- ja: SafeKit のインストール：Google Cloud の高可用性
- ko: SafeKit 설치: Google Cloud 고가용성
- zh-hans: 安装 SafeKit：Google Cloud 高可用
- ar: تثبيت SafeKit للتوافر العالي لـ Google Cloud

### quick-install/safekit-quick-installation-guide-with-docker.md

- en: Install SafeKit for Docker high availability
- fr: Installer SafeKit pour la haute disponibilité Docker
- de: SafeKit installieren: Hochverfügbarkeit für Docker
- es: Instalar SafeKit: alta disponibilidad de Docker
- it: Installa SafeKit per l’alta disponibilità di Docker
- nl: Docker: SafeKit installeren voor hoge beschikbaarheid
- pt-br: Instalar SafeKit para alta disponibilidade de Docker
- pt-pt: Instalar SafeKit: alta disponibilidade de Docker
- ja: SafeKit のインストール：Docker の高可用性
- ko: SafeKit 설치: Docker 고가용성
- zh-hans: 安装 SafeKit：Docker 高可用
- ar: تثبيت SafeKit للتوافر العالي لـ Docker

### quick-install/safekit-quick-installation-guide-with-firebird.md

- en: Install SafeKit for Firebird high availability
- fr: Installer SafeKit pour la haute disponibilité Firebird
- de: SafeKit installieren: Hochverfügbarkeit für Firebird
- es: Instalar SafeKit: alta disponibilidad de Firebird
- it: Installa SafeKit per l’alta disponibilità di Firebird
- nl: Firebird: SafeKit installeren voor hoge beschikbaarheid
- pt-br: Instalar SafeKit para alta disponibilidade de Firebird
- pt-pt: Instalar SafeKit: alta disponibilidade de Firebird
- ja: SafeKit のインストール：Firebird の高可用性
- ko: SafeKit 설치: Firebird 고가용성
- zh-hans: 安装 SafeKit：Firebird 高可用
- ar: تثبيت SafeKit للتوافر العالي لـ Firebird

### quick-install/safekit-quick-installation-guide-with-hyper-v.md

- en: Install SafeKit for Hyper-V high availability
- fr: Installer SafeKit pour la haute disponibilité Hyper-V
- de: SafeKit installieren: Hochverfügbarkeit für Hyper-V
- es: Instalar SafeKit: alta disponibilidad de Hyper-V
- it: Installa SafeKit per l’alta disponibilità di Hyper-V
- nl: Hyper-V: SafeKit installeren voor hoge beschikbaarheid
- pt-br: Instalar SafeKit para alta disponibilidade de Hyper-V
- pt-pt: Instalar SafeKit: alta disponibilidade de Hyper-V
- ja: SafeKit のインストール：Hyper-V の高可用性
- ko: SafeKit 설치: Hyper-V 고가용성
- zh-hans: 安装 SafeKit：Hyper-V 高可用
- ar: تثبيت SafeKit للتوافر العالي لـ Hyper-V

### quick-install/safekit-quick-installation-guide-with-iis-with-network-load-balancing-and-failover.md

- en: Install SafeKit for IIS load balancing
- fr: Installer SafeKit pour l’équilibrage de charge IIS
- de: SafeKit installieren: Lastverteilung für IIS
- es: Instalar SafeKit: balanceo de carga de IIS
- it: Installa SafeKit per il bilanciamento del carico di IIS
- nl: IIS: SafeKit installeren voor load balancing
- pt-br: Instalar SafeKit para balanceamento de carga de IIS
- pt-pt: Instalar SafeKit: balanceamento de carga de IIS
- ja: SafeKit のインストール：IIS の負荷分散
- ko: SafeKit 설치: IIS 부하 분산
- zh-hans: 安装 SafeKit：IIS 负载均衡
- ar: تثبيت SafeKit لموازنة الحمل لـ IIS

### quick-install/safekit-quick-installation-guide-with-kubernetes.md

- en: Install SafeKit for Kubernetes K3s high availability
- fr: Installer SafeKit pour la haute disponibilité Kubernetes K3s
- de: SafeKit installieren: Hochverfügbarkeit für Kubernetes K3s
- es: Instalar SafeKit: alta disponibilidad de Kubernetes K3s
- it: Installa SafeKit per l’alta disponibilità di Kubernetes K3s
- nl: Kubernetes K3s: SafeKit installeren voor hoge beschikbaarheid
- pt-br: Instalar SafeKit para alta disponibilidade de Kubernetes K3s
- pt-pt: Instalar SafeKit: alta disponibilidade de Kubernetes K3s
- ja: SafeKit のインストール：Kubernetes K3s の高可用性
- ko: SafeKit 설치: Kubernetes K3s 고가용성
- zh-hans: 安装 SafeKit：Kubernetes K3s 高可用
- ar: تثبيت SafeKit للتوافر العالي لـ Kubernetes K3s

### quick-install/safekit-quick-installation-guide-with-kvm.md

- en: Install SafeKit for KVM high availability
- fr: Installer SafeKit pour la haute disponibilité KVM
- de: SafeKit installieren: Hochverfügbarkeit für KVM
- es: Instalar SafeKit: alta disponibilidad de KVM
- it: Installa SafeKit per l’alta disponibilità di KVM
- nl: KVM: SafeKit installeren voor hoge beschikbaarheid
- pt-br: Instalar SafeKit para alta disponibilidade de KVM
- pt-pt: Instalar SafeKit: alta disponibilidade de KVM
- ja: SafeKit のインストール：KVM の高可用性
- ko: SafeKit 설치: KVM 고가용성
- zh-hans: 安装 SafeKit：KVM 高可用
- ar: تثبيت SafeKit للتوافر العالي لـ KVM

### quick-install/safekit-quick-installation-guide-with-mariadb.md

- en: Install SafeKit for MariaDB high availability
- fr: Installer SafeKit pour la haute disponibilité MariaDB
- de: SafeKit installieren: Hochverfügbarkeit für MariaDB
- es: Instalar SafeKit: alta disponibilidad de MariaDB
- it: Installa SafeKit per l’alta disponibilità di MariaDB
- nl: MariaDB: SafeKit installeren voor hoge beschikbaarheid
- pt-br: Instalar SafeKit para alta disponibilidade de MariaDB
- pt-pt: Instalar SafeKit: alta disponibilidade de MariaDB
- ja: SafeKit のインストール：MariaDB の高可用性
- ko: SafeKit 설치: MariaDB 고가용성
- zh-hans: 安装 SafeKit：MariaDB 高可用
- ar: تثبيت SafeKit للتوافر العالي لـ MariaDB

### quick-install/safekit-quick-installation-guide-with-microsoft-sql-server.md

- en: Install SafeKit for SQL Server high availability
- fr: Installer SafeKit pour la haute disponibilité SQL Server
- de: SafeKit installieren: Hochverfügbarkeit für SQL Server
- es: Instalar SafeKit: alta disponibilidad de SQL Server
- it: Installa SafeKit per l’alta disponibilità di SQL Server
- nl: SQL Server: SafeKit installeren voor hoge beschikbaarheid
- pt-br: Instalar SafeKit para alta disponibilidade de SQL Server
- pt-pt: Instalar SafeKit: alta disponibilidade de SQL Server
- ja: SafeKit のインストール：SQL Server の高可用性
- ko: SafeKit 설치: SQL Server 고가용성
- zh-hans: 安装 SafeKit：SQL Server 高可用
- ar: تثبيت SafeKit للتوافر العالي لـ SQL Server

### quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server.md

- en: Install SafeKit for Milestone XProtect high availability
- fr: Installer SafeKit pour la haute disponibilité Milestone XProtect
- de: SafeKit installieren: Hochverfügbarkeit für Milestone XProtect
- es: Instalar SafeKit: alta disponibilidad de Milestone XProtect
- it: Installa SafeKit per l’alta disponibilità di Milestone XProtect
- nl: Milestone XProtect: SafeKit installeren voor hoge beschikbaarheid
- pt-br: Instalar SafeKit para alta disponibilidade de Milestone XProtect
- pt-pt: Instalar SafeKit: alta disponibilidade de Milestone XProtect
- ja: SafeKit のインストール：Milestone XProtect の高可用性
- ko: SafeKit 설치: Milestone XProtect 고가용성
- zh-hans: 安装 SafeKit：Milestone XProtect 高可用
- ar: تثبيت SafeKit للتوافر العالي لـ Milestone XProtect

### quick-install/safekit-quick-installation-guide-with-mysql.md

- en: Install SafeKit for MySQL high availability
- fr: Installer SafeKit pour la haute disponibilité MySQL
- de: SafeKit installieren: Hochverfügbarkeit für MySQL
- es: Instalar SafeKit: alta disponibilidad de MySQL
- it: Installa SafeKit per l’alta disponibilità di MySQL
- nl: MySQL: SafeKit installeren voor hoge beschikbaarheid
- pt-br: Instalar SafeKit para alta disponibilidade de MySQL
- pt-pt: Instalar SafeKit: alta disponibilidade de MySQL
- ja: SafeKit のインストール：MySQL の高可用性
- ko: SafeKit 설치: MySQL 고가용성
- zh-hans: 安装 SafeKit：MySQL 高可用
- ar: تثبيت SafeKit للتوافر العالي لـ MySQL

### quick-install/safekit-quick-installation-guide-with-nedap.md

- en: Install SafeKit for Nedap AEOS high availability
- fr: Installer SafeKit pour la haute disponibilité Nedap AEOS
- de: SafeKit installieren: Hochverfügbarkeit für Nedap AEOS
- es: Instalar SafeKit: alta disponibilidad de Nedap AEOS
- it: Installa SafeKit per l’alta disponibilità di Nedap AEOS
- nl: Nedap AEOS: SafeKit installeren voor hoge beschikbaarheid
- pt-br: Instalar SafeKit para alta disponibilidade de Nedap AEOS
- pt-pt: Instalar SafeKit: alta disponibilidade de Nedap AEOS
- ja: SafeKit のインストール：Nedap AEOS の高可用性
- ko: SafeKit 설치: Nedap AEOS 고가용성
- zh-hans: 安装 SafeKit：Nedap AEOS 高可用
- ar: تثبيت SafeKit للتوافر العالي لـ Nedap AEOS

### quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover.md

- en: Install SafeKit for Apache load balancing
- fr: Installer SafeKit pour l’équilibrage de charge Apache
- de: SafeKit installieren: Lastverteilung für Apache
- es: Instalar SafeKit: balanceo de carga de Apache
- it: Installa SafeKit per il bilanciamento del carico di Apache
- nl: Apache: SafeKit installeren voor load balancing
- pt-br: Instalar SafeKit para balanceamento de carga de Apache
- pt-pt: Instalar SafeKit: balanceamento de carga de Apache
- ja: SafeKit のインストール：Apache の負荷分散
- ko: SafeKit 설치: Apache 부하 분산
- zh-hans: 安装 SafeKit：Apache 负载均衡
- ar: تثبيت SafeKit لموازنة الحمل لـ Apache

### quick-install/safekit-quick-installation-guide-with-nginx-with-network-load-balancing-and-failover.md

- en: Install SafeKit for NGINX load balancing
- fr: Installer SafeKit pour l’équilibrage de charge NGINX
- de: SafeKit installieren: Lastverteilung für NGINX
- es: Instalar SafeKit: balanceo de carga de NGINX
- it: Installa SafeKit per il bilanciamento del carico di NGINX
- nl: NGINX: SafeKit installeren voor load balancing
- pt-br: Instalar SafeKit para balanceamento de carga de NGINX
- pt-pt: Instalar SafeKit: balanceamento de carga de NGINX
- ja: SafeKit のインストール：NGINX の負荷分散
- ko: SafeKit 설치: NGINX 부하 분산
- zh-hans: 安装 SafeKit：NGINX 负载均衡
- ar: تثبيت SafeKit لموازنة الحمل لـ NGINX

### quick-install/safekit-quick-installation-guide-with-oracle.md

- en: Install SafeKit for Oracle high availability
- fr: Installer SafeKit pour la haute disponibilité Oracle
- de: SafeKit installieren: Hochverfügbarkeit für Oracle
- es: Instalar SafeKit: alta disponibilidad de Oracle
- it: Installa SafeKit per l’alta disponibilità di Oracle
- nl: Oracle: SafeKit installeren voor hoge beschikbaarheid
- pt-br: Instalar SafeKit para alta disponibilidade de Oracle
- pt-pt: Instalar SafeKit: alta disponibilidade de Oracle
- ja: SafeKit のインストール：Oracle の高可用性
- ko: SafeKit 설치: Oracle 고가용성
- zh-hans: 安装 SafeKit：Oracle 高可用
- ar: تثبيت SafeKit للتوافر العالي لـ Oracle

### quick-install/safekit-quick-installation-guide-with-podman.md

- en: Install SafeKit for Podman high availability
- fr: Installer SafeKit pour la haute disponibilité Podman
- de: SafeKit installieren: Hochverfügbarkeit für Podman
- es: Instalar SafeKit: alta disponibilidad de Podman
- it: Installa SafeKit per l’alta disponibilità di Podman
- nl: Podman: SafeKit installeren voor hoge beschikbaarheid
- pt-br: Instalar SafeKit para alta disponibilidade de Podman
- pt-pt: Instalar SafeKit: alta disponibilidade de Podman
- ja: SafeKit のインストール：Podman の高可用性
- ko: SafeKit 설치: Podman 고가용성
- zh-hans: 安装 SafeKit：Podman 高可用
- ar: تثبيت SafeKit للتوافر العالي لـ Podman

### quick-install/safekit-quick-installation-guide-with-postgresql.md

- en: Install SafeKit for PostgreSQL high availability
- fr: Installer SafeKit pour la haute disponibilité PostgreSQL
- de: SafeKit installieren: Hochverfügbarkeit für PostgreSQL
- es: Instalar SafeKit: alta disponibilidad de PostgreSQL
- it: Installa SafeKit per l’alta disponibilità di PostgreSQL
- nl: PostgreSQL: SafeKit installeren voor hoge beschikbaarheid
- pt-br: Instalar SafeKit para alta disponibilidade de PostgreSQL
- pt-pt: Instalar SafeKit: alta disponibilidade de PostgreSQL
- ja: SafeKit のインストール：PostgreSQL の高可用性
- ko: SafeKit 설치: PostgreSQL 고가용성
- zh-hans: 安装 SafeKit：PostgreSQL 高可用
- ar: تثبيت SafeKit للتوافر العالي لـ PostgreSQL
