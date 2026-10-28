---
title: "Replicação de arquivos em nível de byte versus replicação de disco em nível de bloco para alta disponibilidade."
canonical: "https://safekit.eviden.com/pt-br/best-practises/byte-level-file-replication-vs-block-level-disk-replication/"
description: "Compare a replicação de arquivos em nível de byte com a replicação de disco em nível de bloco. Saiba por que SafeKit propõe uma arquitetura sem SAN que replica apenas os dados modificados dentro dos arquivos, garantindo zero perda de dados (RPO 0), recuperação mais rápida (RTO) e configuração simples no Windows e Linux ."
category: "best-practises"
lang: "pt-br"
topics: "Replicação de arquivos em nível de byte versus replicação de disco em nível de bloco em um cluster de alta disponibilidade, Prós e contras da replicação de arquivos em nível de byte versus replicação de disco em nível de bloco, 🔍 SafeKit Hub de Navegação de Alta Disponibilidade"
---

# Replicação de arquivos em nível de byte versus replicação de disco em nível de bloco para alta disponibilidade (HA) {#byte-level-file-replication-vs-block-level-disk-replication-for-ha}

## Replicação de arquivos em nível de byte versus replicação de disco em nível de bloco em um cluster de alta disponibilidade {#byte-level-file-replication-vs-block-level-disk-replication-in-a-high-availability-cluster}

### Visão geral {#overview}

Este artigo explora as vantagens e desvantagens da replicação de arquivos em nível de byte versus a replicação de disco em nível de bloco em um cluster de alta disponibilidade. Analisamos o volume de dados replicados, o impacto na organização dos dados da aplicação, o tempo de recuperação e a simplicidade de implementação.


![ Replicação de arquivos em nível de byte versus replicação de disco em nível de bloco ](/wp-content/uploads/2023/02/file-replication-vs-disk-replication.png "w:200")


As tabelas comparativas a seguir explicam detalhadamente a replicação de arquivos em nível de byte implementada pelo SafeKit , um produto de software de alta disponibilidade.

### O que é replicação de arquivos em nível de byte? {#what-is-byte-level-file-replication}

A replicação de arquivos em nível de byte (como em [ SafeKit ](</>) ) significa que apenas as modificações dentro dos arquivos são replicadas. 

A replicação síncrona [ ](</pt-br/best-practises/synchronous-replication-vs-asynchronous-replication/>) é necessária em um cluster de alta disponibilidade para garantir zero perda de dados em caso de falha. A replicação assíncrona é destinada a soluções de backup.

O volume de dados replicados é reduzido às informações modificadas pelos aplicativos dentro de seus arquivos. Nenhum dado extra é replicado.

Não há impacto na organização dos dados de um aplicativo. Por exemplo, se um aplicativo tiver seus dados no disco do sistema, a replicação de arquivos em nível de byte funcionará normalmente.

O tempo de recuperação (RTO) em caso de falha é reduzido ao tempo de reinicialização do aplicativo nos arquivos replicados do servidor secundário.

Por fim, a solução é muito simples de configurar, pois apenas os caminhos dos diretórios a serem replicados precisam ser definidos.

### O que é replicação de disco em nível de bloco? {#what-is-block-level-disk-replication}

A replicação de disco em nível de bloco (como em [ DRBD ](<https://linbit.com/drbd/>) ) significa que apenas as modificações dentro de um disco são replicadas.

O volume de dados replicados não se limita às informações modificadas pelos aplicativos. Dados adicionais, como metadados para gerenciamento do disco (lista de blocos livres, informações internas do sistema de arquivos), também são replicados.

Há um forte impacto na organização dos dados da aplicação. Todos os dados devem ser localizados no disco replicado. No mínimo, isso exige uma reconfiguração da aplicação. Ou, torna-se impossível se alguns dados a serem replicados estiverem no disco do sistema, pois este disco deve permanecer específico para cada servidor.

O tempo de recuperação (RTO) aumenta com o procedimento de recuperação do sistema de arquivos no disco replicado após uma falha.

Por fim, a solução não é fácil de configurar, pois exige habilidades específicas para configurar um disco especial com um sistema de arquivos. Além disso, são necessários conhecimentos de aplicação para configurar os dados da aplicação no disco replicado.

## Prós e contras da replicação de arquivos em nível de byte versus replicação de disco em nível de bloco {#pros-and-cons-of-byte-level-file-replication-vs-block-level-disk-replication}

Critérios | **Cluster com replicação de arquivos em nível de byte** | **Cluster com replicação de disco em nível de bloco**  
---|---|---  
Produto | • [ SafeKit em Windows e Linux ](/) | • Produtos de replicação de discos como [ DRBD ](https://linbit.com/drbd/)   
Organização de dados do aplicativo | • 0 impacto na organização de dados do aplicativo com SafeKit . <br> • [ Basta definir os diretórios a serem replicados em tempo real ](/pt-br/architectures/file-replication-byte-level-with-failover-mirror-cluster/) . <br> • Até mesmo diretórios dentro do disco do sistema podem ser replicados. | • Impacto na organização de dados do aplicativo. <br> • Configuração especial do aplicativo para colocar seus dados em um disco replicado. <br> • Os dados no disco do sistema não podem ser replicados.   
Replicação de dados | • Replicação síncrona de arquivos em nível de byte. <br> • Replica operações de modificação de arquivos geradas pela atividade do aplicativo. <br> • Nenhum metadado é replicado. Somente os dados modificados nos arquivos são replicados, não os arquivos inteiros (replicação de arquivos em nível de byte). <br> • Replicação [ para evitar perda de dados em <br> ](/pt-br/best-practises/synchronous-replication-vs-asynchronous-replication/) | <br> , o horário do último acesso a um arquivo é replicado (o horário do último acesso é modificado cada vez que o arquivo é lido).   
Complexidade de implantação | • Não - instalar um software em 2 servidores | • Sim - requer habilidades específicas de TI para configurar o sistema operacional e o disco replicado   
Failover | • Basta reiniciar o aplicativo no segundo servidor. | • Remonte o sistema de arquivos no disco replicado. <br> • Execute o procedimento de recuperação no sistema de arquivos. <br> • E então reinicie o aplicativo.   
Failback | • Retorno automático em caso de falha. <br> • Ressincronização de dados no servidor secundário sem interromper o aplicativo no servidor primário. <br> • Sem failover do aplicativo enquanto os dados não forem ressincronizados. | • Nem todos os produtos possuem o mesmo nível de recursos.   
Quorum e split brain | • Aplicativo executado em um único servidor após um isolamento de rede (split brain). <br> • Coerência dos dados após um split brain. <br> • Não há necessidade de uma terceira máquina, um disco de quorum ou uma linha de heartbeat especial para split brain. <br> • [ Mais informações sobre heartbeat, failover e quorum ](/pt-br/best-practises/heartbeat-failover-quorum-windows-linux-cluster/) | • Requerem um disco de quorum especial ou um terceiro servidor de quorum para gerenciar split brain.   
Indicado para: | • [ Editores de software que desejam adicionar uma opção simples de alta disponibilidade ao seu aplicativo; ](/pt-br/use-cases/application-clustering-software/) | • Empresas com habilidades de TI em clustering.   
  

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}