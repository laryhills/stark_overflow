# Stark Overflow

**Stark Overflow** é uma aplicação descentralizada (dApp) inspirada no conceito do Stack Overflow, porém com um sistema de incentivos financeiros. Utilizando a tecnologia da Starknet, este projeto permite que usuários façam perguntas e ofereçam recompensas financeiras em criptomoedas para quem fornecer as melhores respostas.

## 🚀 Funcionalidades

- Sistema de perguntas e respostas gamificado.
- Depósito de criptomoedas atrelado a cada pergunta.
- Contribuição adicional por outros usuários para aumentar a recompensa.
- Pagamento automático para a resposta escolhida como solução.
- Frontend construído com **React** e **Typescript**.
- Smart Contracts escritos em **Cairo** para execução na Starknet.

## 📂 Estrutura do Projeto

```
/stark_overflow
│
├── frontend/              # Interface do usuário em React
│   └── README.md          # Instruções específicas do frontend
│
├── smartcontract/         # Smart contracts escritos em Cairo
│   ├── src/               # Códigos-fonte dos contratos
│   │   ├── events.cairo
│   │   ├── lib.cairo
│   │   ├── StarkOverflow.cairo
│   │   ├── structs.cairo
│   │   └── utils.cairo
│   ├── tests/             # Testes para os contratos
│   └── Scarb.toml         # Configuração do projeto Scarb
│
└── README.md              # Documentação geral do projeto
```

## ⚙️ Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) v16+
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)
- [Scarb](https://docs.swmansion.com/scarb/) (para trabalhar com contratos em Cairo)
- [Starknet CLI](https://book.starknet.io/)

### 1. Clone o repositório
```bash
 git clone https://github.com/seu-usuario/stark-overflow.git
 cd stark-overflow
```

### 2. Configuração do Frontend
```bash
cd frontend
npm install
# ou
yarn install
```

### 3. Configuração dos Smart Contracts
```bash
cd smartcontract
scarb build
```

## 🔍 Como Usar

### Iniciando o Frontend
```bash
cd frontend
npm start
# ou
yarn start
```

### Executando Testes dos Smart Contracts
```bash
cd smartcontract
scarb test
```

### Implantação dos Contratos
Certifique-se de estar autenticado na Starknet:
```bash
starknet deploy --contract target/dev/stark_overflow_tests_StarkOverflow.test.contract_class.json
```

## 🛠️ Tecnologias Utilizadas

- **React.js**
- **Typescript**
- **Styled-Components**
- **Cairo** (Linguagem da Starknet)
- **Scarb** (Gerenciador de pacotes para projetos Cairo)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas alterações (`git commit -m 'Adiciona minha feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📜 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## 📧 Contato

Müller Esposito Nunes  
[LinkedIn](https://linkedin.com/in/mulleresposito) | [E-mail](mailto:mulleresposito@hotmail.com)

