function verificarExperienciaTodasAbas() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var abas = ["Lagoa", "Calu", "Jacira"];
  var hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  var emailsEnviados = 0;
  
  Logger.log("Iniciando verificação em: " + hoje);

  abas.forEach(function(nomeAba) {
    var sheet = ss.getSheetByName(nomeAba);
    if (!sheet) {
      Logger.log("Aba não encontrada: " + nomeAba);
      return;
    }

    var dados = sheet.getDataRange().getValues();

    for (var i = 1; i < dados.length; i++) {
      var nome = dados[i][1]; // Coluna B
      var vencimento60 = dados[i][5]; // Coluna F
      var prorrogacao90 = dados[i][6]; // Coluna G
      
      // Pular linha se não tiver nome ou se for cabeçalho
      if (!nome || nome.includes("📅") || nome.includes("Nome do Colaborador")) continue;
      
      // Determinar qual data usar e o tipo de período
      var dataAlvo, tipoPeriodo;
      if (prorrogacao90 && Object.prototype.toString.call(prorrogacao90) === '[object Date]' && !isNaN(prorrogacao90.getTime())) {
        dataAlvo = new Date(prorrogacao90);
        tipoPeriodo = "FINAL (90 dias)";
      } else if (vencimento60 && Object.prototype.toString.call(vencimento60) === '[object Date]' && !isNaN(vencimento60.getTime())) {
        dataAlvo = new Date(vencimento60);
        tipoPeriodo = "INICIAL (60 dias) - ainda pode prorrogar";
      } else {
        Logger.log("Data inválida ou não definida para: " + nome);
        continue;
      }
      
      dataAlvo.setHours(0, 0, 0, 0);
      var diffDias = Math.floor((dataAlvo - hoje) / (1000 * 60 * 60 * 24));
      
      Logger.log("Verificando: " + nome + " | Data alvo: " + dataAlvo + " (" + tipoPeriodo + ") | Diferença: " + diffDias + " dias");
      
      if (diffDias >= 0 && diffDias <= 7) {
        var assunto = `⚠️ Período de experiência acabando: ${nome}`;
        var mensagem = `Oi chefinha 👋\n\nO(a) colaborador(a) *${nome}* está encerrando o período de experiência *${tipoPeriodo}* no dia *${formatarData(dataAlvo)}*, Unidade *${nomeAba}*.\n\n`;
        
        if (tipoPeriodo.includes("INICIAL")) {
          mensagem += `Este é o período inicial de 60 dias. Você tem até esta data para decidir sobre uma possível prorrogação para 90 dias.\n\n`;
        } else {
          mensagem += `Este é o período FINAL de 90 dias. Você deve tomar a decisão final sobre o destino da(o) abençoada(o).\n\n`;
        }
        
        mensagem += `Att,\nSeu robôzinho RH`;

        try {
          MailApp.sendEmail("atillagrh@gmail.com,raquellatilla2@gmail.com", assunto, mensagem);
          Logger.log("E-mail enviado para: " + nome);
          emailsEnviados++;
        } catch (e) {
          Logger.log("Erro ao enviar e-mail: " + e.toString());
        }
      }
    }
  });

  Logger.log(`Total de e-mails enviados: ${emailsEnviados}`);
}

function formatarData(data) {
  return Utilities.formatDate(data, Session.getScriptTimeZone(), "dd/MM/yyyy");
}