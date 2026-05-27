const form = document.getElementById("login-form");

form.addEventListener("submit", async (event) => {

  event.preventDefault();

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert("Email ou senha inválidos!");
    return;
  }

  alert("Login realizado com sucesso!");

  window.location.href = "dashboard.html";

});