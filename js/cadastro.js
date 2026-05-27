const form = document.getElementById("register-form");

form.addEventListener("submit", async (event) => {

  event.preventDefault();

  const nome = document.getElementById("nome").value;

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  // CRIAR USUÁRIO

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password
  });

  if (error) {

    alert(error.message);

    return;

  }

  // SALVAR PROFILE

  const { error: profileError } = await supabaseClient
    .from("profiles")
    .insert([
      {
        id: data.user.id,
        nome: nome
      }
    ]);

  if (profileError) {

    console.log(profileError);

  }

  alert("Conta criada com sucesso!");

  window.location.href = "login.html";

});