import { useState } from "react";
import Ficha from "./LayoutFicha.jsx";
import { BasicInformation, Habilidade, Classe, Atributos, Pericias } from "./Entradas.jsx";

function CriarCharacter() {
  const [info, setInfo] = useState({
    nome: "",
    idade: "",
    nascimento: "",
    historia: "",
  });

  const [atributos, setAtributos] = useState({
    aparencia: "",
    sabedoria: "",
    tamanho: "",
  });

  const [pericias, setPericias] = useState({
    destreza: "",
    forca: "",
    intelecto: "",
    labia: "",
    percepcao: "",
    poder: "",
    precisao: "",
    psicologia: "",
    tecnica: "",
    vigor: "",
    sorte: "",
  });

  const [buffs, setBuffs] = useState({
    aparencia: 0,
    sabedoria: 0,
    tamanho: 0,
    destreza: 0,
    forca: 0,
    intelecto: 0,
    labia: 0,
    percepcao: 0,
    poder: 0,
    precisao: 0,
    psicologia: 0,
    tecnica: 0,
    vigor: 0,
    sorte: 0,
  });

  const [classe, setClasse] = useState("");
  const [especialidades, setEspecialidade] = useState([]);
  const [habilidades, setHabilidade] = useState([]);
  const [concluido, setConcluido] = useState(false);

  const settarValores = (element, setter) => {
    const { name, value, type, min } = element.target;
    let finalValue = value;

    if (type === "number" && value !== "") {
      finalValue = Number(value) - (Number(value) % 1);
      if (min !== undefined && finalValue < Number(min)) {
        finalValue = Number(min);
      }
    }

    setter((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleConcluir = () => {
    if (classe === "") {
      alert("Escolha uma classe!");
      return;
    } else if (classe != "Sem Classe" && especialidades.length === 0) {
      alert("Escolha uma especialidade");
    }
    if (habilidades.length == 0) {
      alert("Escolha uma habilidade!");
      return;
    }
    if (Object.values(atributos).some((val) => val === "")) {
      alert("Preencha todos atributos!");
      return;
    }
    if (Object.values(pericias).some((val) => val === "")) {
      alert("Preencha todas perícias!");
      return;
    }
    setConcluido(true);
  };

  const definirSorte = () => {
    const numeroAleatorio = (Math.floor(Math.random() * 4) + 1) + (Math.floor(Math.random() * 4) + 1) + (Math.floor(Math.random() * 4) + 1) + 2;
    setPericias((prev) => ({ ...prev, sorte: numeroAleatorio }));
  };

  return (
    <>
      {!concluido ? (
        <>
          <h1>Faça o Personagem</h1>
          <hr />
          <BasicInformation
            info={info}
            setInfo={setInfo}
            settarValores={settarValores}
          />
          <hr />
          <Classe
            classe={classe}
            setClasse={setClasse}
            especialidades={especialidades}
            setEspecialidade={setEspecialidade}
          />
          <hr />
          <Habilidade
            habilidades={habilidades}
            setHabilidade={setHabilidade}
          />
          <hr />
          <Atributos
            atributos={atributos}
            setAtributos={setAtributos}
            buffs={buffs}
            setBuffs={setBuffs}
            settarValores={settarValores}
          />
          <hr />
          <Pericias
            pericias={pericias}
            setPericias={setPericias}
            buffs={buffs}
            setBuffs={setBuffs}
            settarValores={settarValores}
            definirSorte={definirSorte}
          />
          <br />
          <br />
          <button onClick={() => handleConcluir()}>Concluir</button>
        </>
      ) : (
        <>
          <h1>Layout da ficha</h1>
          <Ficha
            info={info}
            habilidades={habilidades}
            atributos={atributos}
            pericias={pericias}
            buffs={buffs}
          />
        </>
      )}
    </>
  );
}

function MainChoice({ onEscolher }) {
  return (
    <>
      <div className="container">
        <h1 className="text-center">Escolha a sua opção</h1>
        <div className="row justify-content-center">
          <button type="button" className="btn btn-info btn-lg btn-block firtsButton" onClick={() => onEscolher("character")}>Criar Personagem</button>
        </div>
        <div className="row justify-content-center">
          <a className="btn btn-info btn-lg btn-block firtsButton" href="https://brasilicioh.github.io/simuladorDados/" role="button">Simulador Dados</a>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [tela, setTela] = useState("menu");

  return (
    <>
      {tela === "menu" && <MainChoice onEscolher={setTela} />}
      {tela === "character" && <CriarCharacter />}
    </>
  );
}
