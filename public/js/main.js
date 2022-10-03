let tempoInicial = $("#tempo-digitacao").text();
const campo = $(".campo-digitacao");


// igual a $(document).ready()
$(() => {
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaConometro();
  inicializaMarcadores();
  $("#botao-reiniciar").click(reiniciaJogo);
  atualizaPlacar();
});


function atualizaTempoInicial(novoTempo) {
  tempoInicial = novoTempo;
  $("#tempo-digitacao").text(novoTempo);
}


function atualizaTamanhoFrase() {
  const numeroFrase = $(".frase").text().split(/\S+/).length;
  $("#tamanho-frase").text(numeroFrase - 1);
}


function inicializaContadores() {
  campo.on("input", () => {
    const numerosCaracteres = campo.val().length;

    $("#contador-caracteres").text(numerosCaracteres);
    $("#contador-palavras").text(campo.val().split(/\S+/).length - 1);
  });
}


function inicializaMarcadores() {
  campo.on("input", function () {
    const frase = $(".frase").text();
    const digitado = campo.val();
    const comparavel = frase.substr(0, digitado.length);

    if (digitado == comparavel) {
      campo.removeClass("borda-vermelho");
      campo.addClass("borda-verde");
    }
    else {
      campo.removeClass("borda-verde");
      campo.addClass("borda-vermelho");

    }

  });
}


function inicializaConometro() {
  campo.one("focus", () => {
    let tempoRestante = $("#tempo-digitacao").text();
    const cronometro = setInterval(() => {
      if (tempoRestante <= 1) {
        clearInterval(cronometro);
        finalizaJogo();
      }

      tempoRestante--;

      $("#tempo-digitacao").text(tempoRestante);

    }, 1000);
  });
}


function finalizaJogo() {
  campo.attr("disabled", true);
  campo.toggleClass("campo-desativado");

  inserePlacar();
}


function reiniciaJogo() {
  campo.val("");
  campo.attr("disabled", false);
  campo.removeClass("campo-desativado");
  campo.removeClass("borda-vermelho");
  campo.removeClass("borda-verde");

  $("#tempo-digitacao").text(tempoInicial);
  $("#contador-caracteres").text("0");
  $("#contador-palavras").text("0");
  inicializaConometro();
}
