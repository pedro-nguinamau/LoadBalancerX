

# Projeto de Escalabilidade Horizontal com Nginx e Node.js

Este projeto demonstra um modelo de **escalabilidade horizontal** utilizando um **proxy reverso** com **Nginx** e **balanceamento de carga** entre múltiplos servidores Node.js. O objetivo é mostrar como é possível distribuir as requisições entre vários servidores para melhorar a performance, a disponibilidade e a confiabilidade de uma aplicação.

---

## 🚀 Sobre o Projeto

O projeto consiste em:

1. **Proxy Reverso com Nginx**:
   - O Nginx atua como um proxy reverso, recebendo as requisições dos clientes e distribuindo-as entre os servidores Node.js.

2. **Balanceamento de Carga**:
   - O Nginx distribui as requisições entre dois ou mais servidores Node.js, demonstrando como o tráfego pode ser equilibrado para evitar sobrecarga em um único servidor.

3. **Escalabilidade Horizontal**:
   - A aplicação é projetada para ser escalável horizontalmente, ou seja, você pode adicionar mais servidores Node.js para lidar com um aumento no tráfego.

4. **Microserviço**:
   - Cada servidor Node.js atua como um pequeno microserviço, processando requisições e retornando respostas.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript usado para criar os servidores.
- **Nginx**: Servidor web e proxy reverso usado para balanceamento de carga.
- **Docker**: Plataforma de containerização usada para rodar a aplicação em contêineres isolados.
- **Docker Compose**: Ferramenta para orquestrar múltiplos contêineres.
- **TypeScript**: Linguagem usada para desenvolver a aplicação com tipagem estática.
- **Alpine Linux**: Distribuição Linux leve usada como base para as imagens Docker.

---

## 📦 Estrutura do Projeto

```
.
├── docker-compose.yml
├── nginx/
│   └── nginx.conf
├── app/
│   ├── Dockerfile
│   ├── package.json
│   |── server.ts
│   └── dist/  # Pasta gerada após a compilação do TypeScript
└── README.md
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- **Docker**: Instale o Docker em sua máquina. [Guia de instalação](https://docs.docker.com/get-docker/).
- **Docker Compose**: Geralmente vem com o Docker, mas certifique-se de que está instalado. [Guia de instalação](https://docs.docker.com/compose/install/).

### Passos para Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Construa e suba os contêineres:
   ```bash
   docker-compose up --build
   ```

3. Acesse a aplicação:
   - Abra o navegador e acesse `http://localhost`.
   - Atualize a página várias vezes para ver o balanceamento de carga em ação.

---

## 🧠 Como Funciona

1. **Nginx como Balanceador de Carga**:
   - O Nginx recebe as requisições na porta `80` e as distribui entre os servidores Node.js (`server_1` e `server_2`).

2. **Servidores Node.js**:
   - Cada servidor Node.js escuta na porta `3333` e retorna uma mensagem indicando qual servidor processou a requisição.

3. **Escalabilidade Horizontal**:
   - Você pode adicionar mais servidores Node.js ao `docker-compose.yml` e ao bloco `upstream` no `nginx.conf` para escalar horizontalmente.

---

## 🛠️ Configuração do Nginx

O arquivo `nginx.conf` define o balanceamento de carga:

```nginx
upstream backend {
    server server_1:3333;  # Servidor 1
    server server_2:3333;  # Servidor 2
}

server {
    listen 80;

    location / {
        proxy_pass http://backend;  # Encaminha as requisições para o upstream
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

---

## 🐳 Docker Compose

O arquivo `docker-compose.yml` orquestra os contêineres:

```yaml
version: '3.8'
services:
  server-load-balance:
    image: nginx:alpine
    container_name: server_load_balance_
    restart: always
    ports:
      - "80:80"  # Expõe a porta 80 para o balanceador de carga
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - server_1
    networks:
      - loadbalancing

  server_1:
    build: ./app  # Usa o Dockerfile no diretório app/
    container_name: server_1
    restart: always
    environment:
      - HOSTNAME=server_1
    volumes:
      - ./app:/app  # Monta o código da aplicação para hot-reload
      - /app/node_modules  # Evita sobrescrever o node_modules no contêiner
    networks:
      - loadbalancing

  server_2:
    build: ./app  # Usa o Dockerfile no diretório app/
    container_name: server_2
    restart: always
    environment:
      - HOSTNAME=server_2
    volumes:
      - ./app:/app  # Monta o código da aplicação para hot-reload
      - /app/node_modules  # Evita sobrescrever o node_modules no contêiner
    networks:
      - loadbalancing

networks:
  loadbalancing:
    driver: bridge

```

---

## 🧪 Testando o Balanceamento de Carga

1. Acesse `http://localhost` no navegador.
2. Atualize a página várias vezes.
3. Observe que as respostas alternam entre `server_1` e `server_2`, demonstrando o balanceamento de carga.

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

- **Pedro Nguinamau**
- GitHub: [pedro-nguinamau](https://github.com/pedro-nguinamau)

---

## 🙌 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

