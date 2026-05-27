const gameId = localStorage.getItem("gameId");

const form = document.getElementById("edit-form");

async function carregarGame() {

  const { data, error } = await supabaseClient
    .from("games")
    .select("*")
    .eq("id", gameId)
    .single();

  if (error) {
    console.log(error);
    return;
  }

  document.getElementById("nome").value = data.nome;
  document.getElementById("genero").value = data.genero;
  document.getElementById("plataforma").value = data.plataforma;
  document.getElementById("preco").value = data.preco;
  document.getElementById("descricao").value = data.descricao;
  document.getElementById("imagem_url").value = data.imagem_url;

}

carregarGame();


// UPDATE

form.addEventListener("submit", async (event) => {

  event.preventDefault();

  const { error } = await supabaseClient
    .from("games")
    .update({
      nome: document.getElementById("nome").value,
      genero: document.getElementById("genero").value,
      plataforma: document.getElementById("plataforma").value,
      preco: document.getElementById("preco").value,
      descricao: document.getElementById("descricao").value,
      imagem_url: document.getElementById("imagem_url").value
    })
    .eq("id", gameId);

  if (error) {
    alert("Erro ao atualizar!");
    console.log(error);
    return;
  }

  alert("Game atualizado!");

  window.location.href = "dashboard.html";

});