$("#botao-frase").click(geraFraseAleatoria);

function geraFraseAleatoria() {
  $.get("http://localhost:3000/frases", trocaFrase);
}

function trocaFrase(data) {
  const randomNumber = Math.floor(Math.random() * data.length);
  const frase = data[randomNumber].texto;
  $(".frase").text(frase);
  atualizaTamanhoFrase();
  atualizaTempoInicial(data[randomNumber].tempo);
}