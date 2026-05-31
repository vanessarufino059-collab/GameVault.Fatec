const form = document.getElementById("register-form");

form.addEventListener("submit", async (event) => {

  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password
  });

  if (error) {

    console.error(error);

    alert("Erro ao criar conta:\n\n" + error.message);

    return;

  }

  // tenta salvar perfil
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
      console.error(profileError);
    }

  }

  alert(
    "Conta criada com sucesso!\n\nSe a confirmação de e-mail estiver habilitada no Supabase, confirme seu e-mail antes de fazer login."
  );

  window.location.href = "login.html";

});