# GoBarber API

## BrainStorm

### Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve reveber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para envio de e-mails em ambiente de desenvolvimento;
- Utilizar Amanzon SES para envios de e-mails em abiente de produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**

- O link enviado por e-mail para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

### Atualização do perfil

**RF**

- O usuário deve poder atualizar nome, e-mail e senha;

**RN**

- O usuário não pode alterar seu e-mail para ume e-mail já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

### Painel do prestador

**RF**

- O usuário deve poder lista seus agendamentos de um dia específico;
- O prestador deve poder receber uma notificação sempre que hover um novo agendameto;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenadas em cache;
- As notificações do prestador devem ser armazenas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando socket.io;

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

### Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores se serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário de um prestador;
- O usuário deve poder listar horarios disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenados em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendaentos devem estar disponíveis entre as 8h ás 18h (Primeiro às 8h, útimo às 17h);
- O usuário não pode agendar em um horário já oculpado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
