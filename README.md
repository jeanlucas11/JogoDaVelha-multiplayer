# 🕹️ Jogo da Velha Multiplayer (WebSocket)

Esse projeto é um **Jogo da Velha online multiplayer** feito com **Node.js**, **WebSocket**, **HTML**, **CSS** e **JavaScript puro**. A parada roda em tempo real entre dois jogadores, usando sockets pra garantir a comunicação de boa sem precisar ficar recarregando a página.

## 📌 Objetivo

Criar um joguinho simples e divertido pra jogar entre **amigos e colegas de sala**, direto pela mesma rede Wi-Fi (LAN). O foco aqui não é botar na internet pro mundo todo, mas sim aprender os conceitos de comunicação em tempo real e curtir com a galera mais próxima.

## 🚀 Funcionalidades

- Conexão de dois jogadores pela mesma rede
- Atualização em tempo real das jogadas com WebSocket
- Indicação de vez de cada jogador
- Detecção de vitória ou empate
- Botão de reinício de jogo
- Mensagem de "Aguardando o oponente conectar..." até os dois entrarem

## 🛠️ Tecnologias Usadas

- Node.js
- Express
- WebSocket (`ws`)
- HTML, CSS, JS

## 📡 Como rodar

1. Clona o repositório:
```bash
git clone https://github.com/jeanlucas11/jogoDaVelha-multiplayer.git
cd jogo-da-velha-multiplayer
```
2. Instala as Dependências:
```b
npm install
```
3. Inicia o Servidor:
```b
npm start
```
4. Acessa nno navegador de dois dispositivos conectados na mesma rede:
```b
http://(IP_LOCAL):3000
```
