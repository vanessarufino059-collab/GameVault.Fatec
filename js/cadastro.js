const form = document.getElementById("register-form");

form.addEventListener("submit", async (event) => {

  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Criar usuário no Auth

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password
  });

  if (error) {
    alert(error.message);
    console.log(error);
    return;
  }

  // Criar perfil automaticamente

  if (data.user) {

    const { error: profileError } = await supabaseClient
      .from("profiles")
      .insert([
        {
          id: data.user.id,
          nome: nome
        }
      ]);

    if (profileError) {
      console.log("Erro ao criar profile:", profileError);
      alert("Usuário criado, mas houve erro ao criar o perfil.");
      return;
    }

  }

  alert("Conta criada com sucesso!");

  window.location.href = "login.html";

});
