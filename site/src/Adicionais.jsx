import buffs from "./adicionais.json";
import { useState } from "react";

function addAdicional(isClasseHabili, nome, adicionais, setAdicionais, setMensagem, setEspecialidade) {
    let condicao, adicionalArray, mensagemArray;

    switch (isClasseHabili) {
        case "Classe":
            condicao = adicionais != nome;
            adicionalArray = [nome, ""];
            mensagemArray = ["✓ Classe escolhida! Clique novamente para retirar.", "☓ Classe retirada! Clique novamente para escolher."];
            setEspecialidade([]);
            break;
        case "Especialidade":
            condicao = !adicionais.includes(nome);
            adicionalArray = [prev => [...prev, nome], prev => prev.filter(h => h !== nome)];
            mensagemArray = ["✓ Especialidade adicionada! Clique novamente para remover.", "☓ Especialidade removida! Clique novamente para adicionar."];
            break;
        case "Habilidade":
            condicao = !adicionais.includes(nome);
            adicionalArray = [prev => [...prev, nome], prev => prev.filter(h => h !== nome)];
            mensagemArray = ["✓ Habilidade adicionada! Clique novamente para remover.", "☓ Habilidade removida! Clique novamente para adicionar."];
            break;
        default:
            return;
    }

    if (condicao) {
        setAdicionais(adicionalArray[0]);
        setMensagem({ nome, message: mensagemArray[0] });
    } else {
        setAdicionais(adicionalArray[1]);
        setMensagem({ nome, message: mensagemArray[1] });
    }
}

export function MostrarAdicional({ isClasseHabili, adicionais, setAdicionais, classeEspeci, setEspeci }) {
    const [mensagem, setMensagem] = useState({ name: "", message: ""});

    let especificArray;
    // 0 -> caminho do json; 
    // 1 -> nome para usar na funcao addAdicional; 
    // 2 -> funcao de definir especialidade (usado sempre que altera classe)

    switch (isClasseHabili) {
        case "Classe":
            especificArray = [buffs["classes"], "Classe", setEspeci];
            break;
        case "Especialidade":
            especificArray = [buffs["especialidades"][classeEspeci], "Especialidade", null];
            break;
        case "Habilidade":
            especificArray = [buffs["habilidades"], "Habilidade", null];
            break;
        default:
            alert("erro")
            return;
    }

    return (
        <>
            {Object.entries(especificArray[0]).map(([key, value]) => (
                <div key={key}>
                    <span onClick={() => addAdicional(especificArray[1], key, adicionais, setAdicionais, setMensagem, especificArray[2])} className="addHabilidade">&#x0229E;</span>
                    {mensagem.nome == key && (<span>{mensagem.message}</span>)}
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