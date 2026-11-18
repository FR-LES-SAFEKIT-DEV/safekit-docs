---
title: "Preços SafeKit"
canonical: "https://safekit.eviden.com/pt-br/safekit-pricing/"
description: "Entenda o modelo de licenciamento SafeKit e solicite um orçamento personalizado para alta disponibilidade, replicação, failover e balanceamento de carga em Windows e Linux."
category: "home"
lang: "pt-br"
topics: "Modelo de licenciamento e preços, Suporte e manutenção padrão, Solicite um orçamento"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-18.3 | Translation LLM | 50 expressions"
---

# Preços SafeKit {#safekit-pricing}

## Modelo de licenciamento e preços {#licensing-model-and-pricing}

SafeKit utiliza um **modelo de licenciamento perpétuo**: a licença é adquirida uma única vez. Ela é baseada nos nomes de host dos servidores protegidos. É necessária uma licença para cada servidor (físico ou virtual). Um cluster SafeKit padrão normalmente usa 2 servidores.

O preço não depende do número de CPUs ou soquetes. Também não depende da edição Windows ou Linux.

Os módulos de aplicação `.safe` pré-configurados são fornecidos gratuitamente.

SafeKit permite a ativação de licenças offline, portanto, não é necessária uma conexão com a internet para ativar uma chave de licença.

Uma versão de avaliação gratuita com todos os recursos está disponível para avaliação.

## Suporte e manutenção padrão {#standard-support-and-maintenance}

O primeiro ano de suporte e manutenção padrão é obrigatório na compra da licença. Os anos subsequentes podem ser renovados opcionalmente.

Com um contrato de suporte ativo, o suporte padrão inclui o seguinte sem custo adicional:

  * Acesso ao portal de suporte da web 24 horas por dia, 7 dias por semana, 365 dias por ano. Até quatro contatos técnicos nomeados podem usá-lo.
  * Acesso à Base de Conhecimento.
  * Todos os pacotes de serviços, atualizações e upgrades.

O suporte ao vivo está disponível no Centro de Suporte Europeu, de segunda a sexta-feira, das 9h às 17h. Os incidentes são reconhecidos em até quatro horas úteis do Centro de Suporte.

## Solicite um orçamento {#information-to-include-in-your-quote-request}

  * Especifique o número de nós. Um cluster SafeKit padrão geralmente tem 2 nós.
  * Especifique se os nós executam Windows ou Linux.
  * Especifique o aplicativo para HA no nível do aplicativo ou o hipervisor para HA no nível da VM.


**Observação:** Para HA em nível de VM, `hyperv.safe` e `kvm.safe` exigem apenas duas licenças SafeKit para os dois hosts de hipervisor, independentemente do número de máquinas virtuais replicadas e reiniciadas.

{{< contact-marketo-form preferredLanguage="Brazilian Portuguese" interestedIn="High Availability" enquiryType="Price Quote" visibleFields="enquiryType" destination="/pt-br/confirmation-safekit/" programMemberField01="Contact EN (REQUIRES AN ANSWER)" Country="Brazil" businessPhone="0123456789" visibleFields="" >}}
