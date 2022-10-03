$("#botao-frase").click(geraFraseAleatoria);
$("#botao-frase-id").click(buscaFrase);


function geraFraseAleatoria() {
  $("#spinner").fadeIn();
  $.get("http://localhost:3000/frases", trocaFraseAleatorio)
    .fail(function () {
      $("#erro").fadeIn();

      setTimeout(() => {
        $("#erro").fadeOut();
      }, 2000);

    })
    .always(() => {
      $("#spinner").fadeOut();
    });
}

function trocaFraseAleatorio(data) {
  const randomNumber = Math.floor(Math.random() * data.length);
  const frase = data[randomNumber].texto;
  $(".frase").text(frase);
  atualizaTamanhoFrase();
  atualizaTempoInicial(data[randomNumber].tempo);
}

function buscaFrase() {
  const fraseId = $("#frase-id").val();
  const dados = {
    id: fraseId
  };

  $("#spinner").fadeIn();

  $.get("http://localhost:3000/frases", dados, trocaFrase)
    .fail(function () {
      $("#erro").fadeIn();

      setTimeout(() => {
        $("#erro").fadeOut();
      }, 2000);

    })
    .always(() => {
      $("#spinner").fadeOut();
    });
}

function trocaFrase(data) {
  const frase = $(".frase");

  frase.text(data.texto);
  atualizaTamanhoFrase();
  atualizaTempoInicial(data.tempo);
}