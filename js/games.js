const form = document.getElementById("game-form");

form.addEventListener("submit", async (event) => {

  event.preventDefault();

  const { data: userData } = await supabaseClient.auth.getUser();

  const nome = document.getElementById("nome").value;

  const genero = document.getElementById("genero").value;

  const plataforma = document.getElementById("plataforma").value;

  const preco = document.getElementById("preco").value;

  const descricao = document.getElementById("descricao").value;

  // IMAGEM

  const imagemFile =
    document.getElementById("imagem").files[0];

  const nomeArquivo =
    Date.now() + "-" + imagemFile.name;

  // UPLOAD STORAGE

  const { error: uploadError } = await supabaseClient
    .storage
    .from("games")
    .upload(nomeArquivo, imagemFile);

  if (uploadError) {
    alert("Erro no upload da imagem!");
    console.log(uploadError);
    return;
  }

  // PEGAR URL

  const { data: imageData } = supabaseClient
    .storage
    .from("games")
    .getPublicUrl(nomeArquivo);

  const imagem_url = imageData.publicUrl;

  // SALVAR NO BANCO

  const { error } = await supabaseClient
    .from("games")
    .insert([
      {
        nome,
        genero,
        plataforma,
        preco,
        descricao,
        imagem_url,
        usuario_id: userData.user.id
      }
    ]);

  if (error) {
    alert(error.message);
    console.log(error);
    return;
  }

  alert("Game salvo com sucesso!");

  window.location.href = "dashboard.html";

});