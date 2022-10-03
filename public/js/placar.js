$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);


function inserePlacar() {
  const corpoTabela = $(".placar").find("tbody");
  const nomeUsuario = $("#jogadores").val();
  const numPalavras = $("#contador-palavras").text();

  const linha = novaLinha(nomeUsuario, numPalavras);

  linha.find(".botao-remover").click(removeLinha);

  // adiciona depois
  // corpoTabela.append(linha);

  // add antes
  corpoTabela.prepend(linha);

  $(".placar").slideDown(500);
  scrollPlacar();
}

function novaLinha(usuario, numPalavras) {

  const linha = $("<tr>");
  const colunaUsuario = $("<td>").text(usuario);
  const colunaPalavras = $("<td>").text(numPalavras + " palavras");
  const colunaRemover = $("<td>");

  const link = $("<a>").attr("href", "#").addClass("botao-remover");
  const icone = $("<i>").addClass("small").addClass("material-icons").addClass("icone-excluir").text("delete");

  link.append(icone);

  colunaRemover.append(link);

  linha.append(colunaUsuario);
  linha.append(colunaPalavras);
  linha.append(colunaRemover);

  return linha;
}


function removeLinha() {
  event.preventDefault();

  const linha = $(this).parent().parent();

  linha.fadeOut();

  setTimeout(() => {
    linha.remove();

  }, 1000);
}


function mostraPlacar() {
  $(".placar").stop().slideToggle(650);
}


function scrollPlacar() {
  const posicaoPlacar = $(".placar").offset().top;

  $("html").animate({
    scrollTop: posicaoPlacar + "px"
  }, 1000);
}

function sincronizaPlacar() {
  const placar = [];
  const linhas = $("tbody>tr");
  linhas.each(function () {
    const usuario = $(this).find("td:nth-child(1)").text();
    const numPalavras = $(this).find("td:nth-child(2)").text().split(" ")[0];

    const score = {
      usuario: usuario,
      pontos: numPalavras
    };

    placar.push(score);
  });

  dados = {
    placar: placar
  };


  $.post("http://localhost:3000/placar", dados, function () {
    console.log("salvou");
  });
}

function atualizaPlacar() {
  $.get("http://localhost:3000/placar", function (data) {
    $(data).each(function () {
      const linha = novaLinha(this.usuario, this.pontos);

      linha.find(".botao-remover").click(removeLinha);

      $("tbody").append(linha);
    });

  })
}