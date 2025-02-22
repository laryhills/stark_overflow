# Stark Overflow

**Stark Overflow** is a decentralized application (dApp) inspired by the concept of Stack Overflow, but with a financial incentive system. Using Starknet technology, this project allows users to ask questions and offer cryptocurrency rewards for the best answers.

## 🚀 Features

- Gamified question-and-answer system.
- Cryptocurrency deposits linked to each question.
- Additional contributions from other users to increase the reward.
- Automatic payment for the answer selected as the solution.
- Frontend built with **React** and **Typescript**.
- Smart Contracts written in **Cairo** for execution on Starknet.

## 📂 Project Structure

```
/stark_overflow
│
├── frontend/              # User interface in React
│   └── README.md          # Specific frontend instructions
│
├── smartcontract/         # Smart contracts written in Cairo
│   ├── src/               # Contract source code
│   │   ├── events.cairo
│   │   ├── lib.cairo
│   │   ├── StarkOverflow.cairo
│   │   ├── structs.cairo
│   │   └── utils.cairo
│   ├── tests/             # Contract tests
│   └── Scarb.toml         # Scarb project configuration
│
└── README.md              # General project documentation
```

## ⚙️ Installation

### Prerequisites

- [Node.js](https://nodejs.org/) v16+
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Scarb](https://docs.swmansion.com/scarb/) (for working with Cairo contracts)
- [Starknet CLI](https://book.starknet.io/)

### 1. Clone the repository
```bash
 git clone https://github.com/your-username/stark-overflow.git
 cd stark-overflow
```

### 2. Frontend Setup
```bash
cd frontend
npm install
# or
yarn install
```

### 3. Smart Contracts Setup
```bash
cd smartcontract
scarb build
```

## 🔍 How to Use

### Starting the Frontend
```bash
cd frontend
npm start
# or
yarn start
```

### Running Smart Contract Tests
```bash
cd smartcontract
scarb test
```

### Deploying Contracts
Make sure you are authenticated on Starknet:
```bash
starknet deploy --contract target/dev/stark_overflow_tests_StarkOverflow.test.contract_class.json
```

## 🛠️ Technologies Used

- **React.js**
- **Typescript**
- **Styled-Components**
- **Cairo** (Starknet Language)
- **Scarb** (Package manager for Cairo projects)

## 🤝 Contribution

1. Fork the project
2. Create a branch (`git checkout -b feature/MyFeature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/MyFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the [MIT License](LICENSE).

## 📧 Contact

Müller Esposito Nunes  
[LinkedIn](https://linkedin.com/in/mulleresposito) | [Email](mailto:mulleresposito@hotmail.com)

