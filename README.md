# 💱 Conversor de Moedas

Aplicação web de **conversão de moedas** desenvolvida com React e Vite. O projeto permite selecionar uma moeda de origem e uma moeda de destino, informar um valor e realizar a conversão utilizando as taxas disponibilizadas pela API do **Frankfurter**.

O projeto também possui uma interface moderna e responsiva desenvolvida com **Tailwind CSS**.

---

## 🚀 Funcionalidades

* 🔄 Conversão entre diferentes moedas
* 🌎 Lista de moedas carregada diretamente da API
* 🔁 Botão para inverter as moedas de origem e destino
* ⏳ Indicador de carregamento das moedas
* 🔄 Indicador durante a conversão
* 💰 Exibição do valor convertido com duas casas decimais
* 🚫 Desabilitação do botão durante o carregamento ou conversão
* 📱 Interface responsiva
* 🎨 Interface moderna utilizando gradientes e Tailwind CSS
* ⚡ Atualização dos dados através da API do Frankfurter

---

## 🖥️ Demonstração

A aplicação possui uma interface simples e intuitiva:

<img width="711" height="485" alt="{DB74847B-7F8D-40F6-AEBC-8648C99504A5}" src="https://github.com/user-attachments/assets/5b20fe46-5019-44a2-a989-fdd7297b1630" />


## 🛠️ Tecnologias utilizadas

### React

Biblioteca JavaScript utilizada para construção da interface e gerenciamento dos componentes.

### Vite

Ferramenta utilizada para criação e execução do ambiente de desenvolvimento React.

### Tailwind CSS

Framework CSS utilizado para estilização da aplicação.

### JavaScript

Linguagem utilizada para implementação da lógica da aplicação.

### Frankfurter API

API utilizada para obter as moedas disponíveis e as taxas de conversão.

---

## 🌐 API

O projeto utiliza a API do **Frankfurter**:

```text
https://api.frankfurter.dev/v2/
```

### Buscar moedas

```text
GET /currencies
```

Exemplo:

```text
https://api.frankfurter.dev/v2/currencies
```

Essa requisição é utilizada para carregar as moedas disponíveis nos campos de seleção.

### Buscar taxa de conversão

```text
GET /rate/{moedaOrigem}/{moedaDestino}
```

Exemplo:

```text
https://api.frankfurter.dev/v2/rate/USD/BRL
```

A taxa retornada é utilizada para calcular o valor convertido.

---

## 📦 Instalação

### 1. Clone o repositório

```bash
git clone URL_DO_SEU_REPOSITORIO
```

### 2. Acesse a pasta do projeto

```bash
cd Conversor-de-Moedas
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute o projeto

```bash
npm run dev
```

### 5. Acesse no navegador

O Vite exibirá no terminal o endereço local da aplicação, normalmente:

```text
http://localhost:5173
```

---

## 📂 Estrutura do projeto

Uma estrutura básica do projeto pode ser organizada da seguinte maneira:

```text
Conversor-de-Moedas/
│
├── public/
│
├── src/
│   ├── components/
│   │
│   ├── ConversorMoedas.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tailwind.config.js
└── README.md
```

---

## 🔄 Como funciona

### 1. Carregamento das moedas

Quando o componente é carregado, o `useEffect` executa a função `fetchMoedas()`:

```jsx
useEffect(() => {
    fetchMoedas();
}, []);
```

A função realiza uma requisição para a API e armazena as moedas no estado:

```jsx
const [moedas, setMoedas] = useState([]);
```

---

### 2. Seleção das moedas

O usuário pode escolher:

* Moeda de origem
* Moeda de destino

As opções são geradas dinamicamente através do método `.map()`:

```jsx
{moedas.map((dados) => (
    <option key={dados.iso_code} value={dados.iso_code}>
        {dados.iso_code} - {dados.name}
    </option>
))}
```

---

### 3. Inversão das moedas

O botão `⇄` permite trocar rapidamente as moedas.

Por exemplo:

```text
USD → BRL
```

Ao clicar:

```text
BRL → USD
```

Essa funcionalidade é implementada através da função:

```jsx
const handleInverter = () => {
    const moedaTemporaria = moedaOrigem;

    setMoedaOrigem(moedaDestino);
    setMoedaDestino(moedaTemporaria);

    setValorConvertido(null);
};
```

---

### 4. Conversão

Ao clicar em **Converter**, a aplicação consulta a taxa atual disponível na API:

```jsx
const response = await fetch(
    `https://api.frankfurter.dev/v2/rate/${moedaOrigem}/${moedaDestino}`
);
```

Depois, o resultado é calculado:

```jsx
const resultado = valor * data.rate;
```

E armazenado:

```jsx
setValorConvertido(resultado);
```

---

## ⏳ Estados de carregamento

O projeto possui dois estados para melhorar a experiência do usuário.

### Carregamento das moedas

```jsx
const [carregando, setCarregando] = useState(true);
```

Enquanto as moedas estão sendo carregadas, a aplicação exibe:

```text
carregando…
```

### Conversão

Durante uma conversão:

```jsx
const [convertendo, setConvertendo] = useState(false);
```

O botão muda de:

```text
Converter
```

para:

```text
Convertendo...
```

Além disso, o botão fica temporariamente desabilitado.

---

## 🎨 Interface

A interface foi construída utilizando classes do Tailwind CSS.

O projeto utiliza:

* Gradientes
* Bordas arredondadas
* Sombras
* Estados de hover
* Estados de foco
* Feedback visual durante carregamentos
* Layout responsivo

A combinação principal da interface utiliza tons de:

* 🟣 Indigo
* 🟢 Teal
* ⚪ Branco
* ⚫ Slate

---

## 📚 Conceitos praticados

Este projeto foi desenvolvido com o objetivo de praticar conceitos importantes do desenvolvimento frontend:

* React Hooks
* `useState`
* `useEffect`
* Componentização
* Eventos
* Formulários
* `<select>`
* `<input>`
* Funções assíncronas
* `async/await`
* `fetch`
* Consumo de API REST
* Tratamento de erros
* Estados de carregamento
* Renderização de listas
* Operador ternário
* Tailwind CSS
* JavaScript moderno

---

## 🔮 Possíveis melhorias

Algumas funcionalidades podem ser adicionadas futuramente:

* [ ] Histórico de conversões
* [ ] Botão para limpar os campos
* [ ] Exibição da taxa utilizada
* [ ] Formatação de valores conforme a moeda
* [ ] Mais informações sobre cada moeda
* [ ] Modo escuro
* [ ] Histórico das últimas conversões
* [ ] Gráfico de variação das taxas
* [ ] Melhor tratamento de erros para problemas de conexão
* [ ] Responsividade aprimorada para telas muito pequenas

---

## 👨‍💻 Autor

**Lauro Viana Figueiredo**

Estudante de **Ciência da Computação**, interessado em desenvolvimento web, React e tecnologias frontend.

---

## 📄 Licença

Este projeto foi desenvolvido para fins de **estudo e prática de desenvolvimento web**.
