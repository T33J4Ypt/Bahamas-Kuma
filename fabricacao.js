const receitas = [
  {
    nome: "Lanterna",
    producao: 2,
    ingredientes: {
      "Chapa de Aluminio": 1,
      "Eletronicos": 1,
      "Parafuso": 2,
      "Plastico": 2
    }
  },
  {
    nome: "Silenciador",
    producao: 2,
    ingredientes: {
      "Barra de Ferro": 1,
      "Borracha": 1,
      "Plastico": 1,
      "Parafuso": 2
    }
  },
  {
    nome: "Silenciador Tático",
    producao: 2,
    ingredientes: {
      "Chapa de Aluminio": 1,
      "Parafuso": 2,
      "Barra de Ferro": 2,
      "Borracha": 2
    }
  },
  {
    nome: "Grip",
    producao: 2,
    ingredientes: {
      "Parafuso": 2,
      "Barra de Ferro": 2,
      "Borracha": 2,
      "Plastico": 2
    }
  },
  {
    nome: "Cano Pesado",
    producao: 2,
    ingredientes: {
      "Chapa de Aluminio": 1,
      "Parafuso": 2,
      "Barra de Ferro": 2
      }
  },
  {
    nome: "Tambor de Rifle",
    producao: 2,
    ingredientes: {
      "Barra de Cobre": 1,
      "Aço": 1,
      "Borracha": 2,
      "Barra de Ferro": 2
      }
  },
  {
    nome: "Tambor de SMG",
    producao: 2,
    ingredientes: {
      "Aço": 1,
      "Parafuso": 2,
      "Barra de Ferro": 2
      }
  },
  {
    nome: "Carregador Ext. Rifle",
    producao: 2,
    ingredientes: {
      "Barra de Cobre": 1,
      "Aço": 1,
      "Borracha": 2,
      "Barra de Ferro": 2
      }
  },
  {
    nome: "Carregador Ext. SMG",
    producao: 2,
    ingredientes: {
      "Barra de Ferro": 1,
      "Aço": 1,
      "Parafuso": 2,
      }
  },
  {
    nome: "Carregador Ext. Pistola",
    producao: 2,
    ingredientes: {
      "Barra de Ferro": 1,
      "Plastico": 2,
      "Parafuso": 2,
      }
  },
  {
    nome: "Mira Média",
    producao: 2,
    ingredientes: {
      "Barra de Ferro": 1,
      "Chapa de Aluminio": 1,
      "Eletronicos": 1,
      "Parafuso": 2,
      "Plastico": 2
      }
  },
  {
    nome: "Mira Grande",
    producao: 2,
    ingredientes: {
      "Eletronicos": 1,
      "Parafuso": 2,
      "Plastico": 2,
      "Barra de Ferro": 2,
      "Chapa de Aluminio": 2
      }
  },
  {
    nome: "Boca de Precisao",
    producao: 2,
    ingredientes: {
      "Aço": 1,
      "Chapa de Aluminio": 1,
      "Parafuso": 2,
      }
  },
  {
    nome: "Boca Tática",
    producao: 2,
    ingredientes: {
      "Aço": 1,
      "Chapa de Aluminio": 1,
      "Parafuso": 2,
    }
  }
];

const tabela = document.getElementById("tabela-fabricacao");

receitas.forEach((r, i) => {
  const tr = document.createElement("tr");

  const tdNome = document.createElement("td");
  tdNome.textContent = r.nome;

  const tdInput = document.createElement("td");
  const input = document.createElement("input");
  input.type = "number";
  input.min = 0;
  input.value = 0;
  input.dataset.index = i;
  tdInput.appendChild(input);

  const tdResultado = document.createElement("td");
  tdResultado.id = "res-" + i;
  tdResultado.innerHTML = "-";

  tr.appendChild(tdNome);
  tr.appendChild(tdInput);
  tr.appendChild(tdResultado);
  tabela.appendChild(tr);

  input.addEventListener("input", () => atualizarResultados(i, input.value));
});

function atualizarResultados(index, qtdDesejada) {
  const receita = receitas[index];
  const resultado = {};

const multiplicador = Math.ceil(qtdDesejada / receita.producao);

  for (const ingrediente in receita.ingredientes) {
    resultado[ingrediente] = Math.ceil(
      receita.ingredientes[ingrediente] * multiplicador
    );
  }

  document.getElementById("res-" + index).innerHTML =
    Object.entries(resultado)
      .map(([ing, qtd]) => `${qtd} ${ing}`)
      .join("<br>");

  atualizarTotais();
}
function atualizarTotais() {

  const totais = {};

  document.querySelectorAll("input").forEach((input, index) => {

    const quantidade = Number(input.value);

    if (quantidade <= 0) return;

    const receita = receitas[index];

const multiplicador = Math.ceil(quantidade / receita.producao);

    for (const ingrediente in receita.ingredientes) {

      const qtd = Math.ceil(
        receita.ingredientes[ingrediente] * multiplicador
      );

      totais[ingrediente] = (totais[ingrediente] || 0) + qtd;
    }

  });

  const tabela = document.getElementById("tabela-totais");

  tabela.innerHTML = "";

  Object.entries(totais)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([ingrediente, qtd]) => {

      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${ingrediente}</td>
        <td><strong>${qtd}</strong></td>
      `;

      tabela.appendChild(tr);

    });

}
