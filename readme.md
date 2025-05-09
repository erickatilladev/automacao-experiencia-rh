# 🤖 Automação de Notificação de Período de Experiência (Google Apps Script)

Este projeto é um script desenvolvido em **Google Apps Script** para automatizar notificações sobre o fim do período de experiência de colaboradores, com base em uma **planilha do Google Sheets** que centraliza os dados de múltiplas unidades de uma escola.



## 📋 Funcionalidades

* ✅ **Leitura automática** das datas de admissão em múltiplas abas (ex: `Lagoa`, `Calu`, `Jacira`), cada uma representando uma unidade.
* 📅 **Cálculo dinâmico** do fim do período de experiência (60 ou 90 dias, com suporte para prorrogação).
* 🔔 **Envio automático de e-mails** para o RH quando o término da experiência estiver a 7 dias ou menos.
* ⏰ **Execução agendada diariamente** com **gatilhos (triggers)** nativos do Google Apps Script.



## 🚀 Como usar

1. **Crie uma planilha no Google Sheets**
   Estruture cada aba com o nome das unidades (ex: `Lagoa`, `Calu`, `Jacira`). As colunas devem incluir:

   * Nome do colaborador
   * Data de admissão
   * Status da prorrogação (opcional)

2. **Abra o Apps Script:**
   No menu do Sheets, clique em `Extensões > Apps Script`.

3. **Cole o código do script** (disponível no arquivo `script.gs` deste repositório).

4. **Configure o acionador de tempo (trigger):**
   No Apps Script, vá em `Gatilhos` e adicione uma nova execução agendada para rodar diariamente.

5. **Pronto!** Agora o RH vai receber os avisos no tempo certo, sem dor de cabeça.


## ✉️ Exemplo de E-mail Enviado

> Assunto: \[Alerta] Fim do Período de Experiência – Fulano da unidade Jacira
>
> O colaborador **Fulano da Silva**, da unidade **Jacira**, está a 7 dias do fim do período de experiência.
>
> Verifique necessidade de prorrogação ou efetivação.


## 💡 Possíveis melhorias futuras

* [ ] Integração com banco de dados externo ou API
* [ ] Interface de configuração personalizada por unidade
* [ ] Envio de resumo semanal com status de todos os colaboradores

