# GameVault.Fatec

Uma plataforma moderna para gerenciamento de coleção de games, inspirada em serviços como Steam e PlayStation.

---

# Sobre o Projeto

O GameVault foi desenvolvido como projeto acadêmico utilizando tecnologias modernas de desenvolvimento web.

A aplicação permite que usuários realizem o gerenciamento completo de sua biblioteca de jogos, incluindo cadastro, autenticação, upload de imagens e organização da coleção de forma prática e intuitiva.

---

# Funcionalidades

## Autenticação
- Cadastro de usuários
- Login e logout seguros
- Controle de sessão

## Gerenciamento de Games
- Adicionar games
- Editar informações
- Excluir jogos
- Upload de capas
- Busca em tempo real
- Filtro por gênero

## Interface
- Dashboard moderno
- Dark mode
- Cards dinâmicos
- Toast notifications
- Modal de confirmação
- Loading spinner
- Animações e efeitos visuais

---

# Tecnologias Utilizadas

## Frontend
- HTML5
- TailwindCSS
- JavaScript

## Backend
- Supabase
  - Authentication
  - Database
  - Storage

---

# Estrutura do Projeto

```bash
GameVault/
│
├── index.html
├── login.html
├── cadastro.html
├── dashboard.html
├── adicionar-game.html
├── editar_games.html
│
├── js/
│   ├── supabase.js
│   ├── auth.js
│   ├── cadastro.js
│   ├── dashboard.js
│   ├── games.js
│   └── edit.js
│
└── README.md
