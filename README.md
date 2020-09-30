# Recuperação de Senha

**RF**

- O usuário deve poder recuperar sua senha informando seu email;
- O usuário deve receber um email con instruções de recuperação de senha;
- O usuário deve porder resetar sua senha;

**RNF**

- Utilizar o Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar o Amazon SES para envios em produção;
- O envio de emails deve acontecer em segundo plano (background job);

**RN**

- O link enviado por email para resetar a senha deve expirar em 2h;
- O usuário deve confirmar a nova senha depois de resetá-la;

# Atualização do Perfil

**RF**

- O usuário deve por atualizar seu nome, email e senha;

**RNF**

**RN**

- O usuário não pode alterar seu email para um email já cadastrado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário deve confirmar a senha antiga;

# Painel do Prestador

**RF**

- O prestador deve poder listar os seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;

# Agendamento de Serviços

**RF**

- O usuário deve poder listar todos os prestadores registrados;
- O usuário deve poder listar os dias de um mês de um prestador com pelo menos um horário disponível;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
