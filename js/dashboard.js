async function verificarUsuario() {

  const { data } = await supabaseClient.auth.getUser();

  if (!data.user) {

    window.location.href = "login.html";

    return;

  }

  document.getElementById("user-email").textContent =
    data.user.email;

  await carregarGames(data.user.id);

  document
    .getElementById("loading")
    .classList.add("hidden");

}

verificarUsuario();


// LOGOUT

const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", async () => {

  await supabaseClient.auth.signOut();

  window.location.href = "login.html";

});


// CARREGAR GAMES

async function carregarGames(userId) {

  const { data: games, error } = await supabaseClient
    .from("games")
    .select("*")
    .eq("usuario_id", userId);

  if (error) {

    console.log(error);

    return;

  }

  const searchInput = document
    .getElementById("search-input")
    .value
    .toLowerCase();

  const genreFilter =
    document.getElementById("genre-filter").value;

  const filteredGames = games.filter(game => {

    const matchesSearch =
      game.nome.toLowerCase().includes(searchInput);

    const matchesGenre =
      genreFilter === "" ||
      game.genero === genreFilter;

    return matchesSearch && matchesGenre;

  });

  const container = document.getElementById("games-container");

  container.innerHTML = "";

  filteredGames.forEach(game => {

    container.innerHTML += `

      <div class="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-blue-500 hover:scale-105 transition-all duration-300">

        <img
          src="${game.imagem_url}"
          class="w-full h-60 object-cover"
        >

        <div class="p-5">

          <h3 class="text-2xl font-bold mb-2">
            ${game.nome}
          </h3>

          <p class="text-zinc-400 mb-2">
            ${game.genero}
          </p>

          <p class="text-zinc-500 text-sm mb-4">
            ${game.plataforma}
          </p>

          <div class="flex items-center justify-between mt-4">

            <p class="text-blue-500 text-2xl font-bold">
              R$ ${game.preco}
            </p>

            <div class="flex gap-2">

              <button
                onclick="editarGame('${game.id}')"
                class="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg text-black font-bold"
              >
                Editar
              </button>

              <button
                onclick="deletarGame('${game.id}')"
                class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
              >
                Excluir
              </button>

            </div>

          </div>

        </div>

      </div>

    `;

  });

}


// DELETAR GAME

async function deletarGame(id) {

  const confirmar = confirm("Deseja excluir este game?");

  if (!confirmar) return;

  const { error } = await supabaseClient
    .from("games")
    .delete()
    .eq("id", id);

  if (error) {

    mostrarToast("Erro ao excluir!");

    console.log(error);

    return;

  }

  mostrarToast("Game excluído!");

  setTimeout(() => {

    location.reload();

  }, 1000);

}


// EDITAR GAME

function editarGame(id) {

  localStorage.setItem("gameId", id);

  window.location.href = "editar_games.html";

}


// PESQUISA

document
  .getElementById("search-input")
  .addEventListener("input", async () => {

    const { data } = await supabaseClient.auth.getUser();

    carregarGames(data.user.id);

});


// FILTRO

document
  .getElementById("genre-filter")
  .addEventListener("change", async () => {

    const { data } = await supabaseClient.auth.getUser();

    carregarGames(data.user.id);

});


// TOAST

function mostrarToast(mensagem) {

  const toast = document.getElementById("toast");

  toast.textContent = mensagem;

  toast.classList.remove("hidden");

  setTimeout(() => {

    toast.classList.add("hidden");

  }, 3000);

}