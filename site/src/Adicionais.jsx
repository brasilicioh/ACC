import buffs from "./adicionais.json";
import { useState } from "react";

function addAdicional(isClasseHabili, nome, adicionais, setAdicionais, setMensagem, setEspecialidade) {
  let condicao, adicionarAdicional, removerAdicional, mensagemAdd, mensagemRemove;

  switch (isClasseHabili) {
    case "Classe":
      condicao = adicionais != nome;
      adicionarAdicional = nome;
      removerAdicional = "";
      mensagemAdd = "✓ Classe escolhida! Clique novamente para retirar.";
      mensagemRemove = "☓ Classe retirada! Clique novamente para escolher.";
      setEspecialidade([]);
      break;
    case "Especialidade":
      condicao = !adicionais.includes(nome);
      adicionarAdicional = (prev) => [...prev, nome];
      removerAdicional = (prev) => prev.filter((h) => h !== nome);
      mensagemAdd = "✓ Especialidade adicionada! Clique novamente para remover.";
      mensagemRemove = "☓ Especialidade removida! Clique novamente para adicionar.";
      break;
    case "Habilidade":
      condicao = !adicionais.includes(nome);
      adicionarAdicional = (prev) => [...prev, nome];
      removerAdicional = (prev) => prev.filter((h) => h !== nome);
      mensagemAdd = "✓ Habilidade adicionada! Clique novamente para remover.";
      mensagemRemove = "☓ Habilidade removida! Clique novamente para adicionar.";
      break;
  }

  if (condicao) {
    setAdicionais(adicionarAdicional);
    setMensagem({ nome, message: mensagemAdd });
  } else {
    setAdicionais(removerAdicional);
    setMensagem({ nome, message: mensagemRemove });
  }
}

export function MostrarAdicional({ isClasseHabili, adicionais, setAdicionais, classeEspeci, setEspeci }) {
  const [mensagem, setMensagem] = useState({ name: "", message: "" });

  let caminhoJson, nameAdd, funcaoSet;

  switch (isClasseHabili) {
    case "Classe":
      caminhoJson = buffs["classes"];
      nameAdd = "Classe";
      funcaoSet = setEspeci;
      break;
    case "Especialidade":
      caminhoJson = buffs["especialidades"][classeEspeci];
      nameAdd = "Especialidade";
      funcaoSet = null;
      break;
    case "Habilidade":
      caminhoJson = buffs["habilidades"];
      nameAdd = "Habilidade";
      funcaoSet = null;
      break;
  }

  return (
    <>
      {Object.entries(caminhoJson).map(([key, value]) => (
        <div key={key}>
          <span className="addHabilidade"
            onClick={() =>
              addAdicional(nameAdd, key, adicionais, setAdicionais, setMensagem, funcaoSet)
            }
          >
            &#x0229E;
          </span>
          {mensagem.nome == key && <span>{mensagem.message}</span>}
          <h3>{key}</h3>
          <p className="quebraLinha">{value}</p>
        </div>
      ))}
    </>
  );
}

export function ExibirHabilidade({ habilidades }) {
  return (
    <>
      {habilidades.map((key) => (
        <p>{key}: {buffs["habilidades"][key]}</p>
      ))}
    </>
  );
}