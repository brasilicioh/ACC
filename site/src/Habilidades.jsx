import itens from "./habilidades.json"
import { useState } from "react";

function addHabilidade(habilidade, habilidades, setHabilidade, setMensagem) {
    if (!habilidades.includes(habilidade)) {
        setHabilidade(prev => [...prev, habilidade])
        setMensagem({ habilidade, message: "Habilidade adicionada! Clique novamente para remover." })
    } else {
        setHabilidade(prev => prev.filter(h => h !== habilidade))
        setMensagem({ habilidade, message: "Habilidade removida! Clique novamente para adicionar." })
    }
}

export default function MostrarHabilidade({ habilidades, setHabilidade }) {
    const [mensagem, setMensagem] = useState({ habilidade: "", message: ""})

    return (
        <>
            {Object.entries(itens).map(([key, value]) => (
                <div key={key}>
                    <span onClick={() => addHabilidade(key, habilidades, setHabilidade, setMensagem)} className={"addHabilidade"}>&#x0229E;</span>
                    {mensagem.habilidade == key && (<span>{mensagem.message}</span>)}
                    <h3>{key}</h3>
                    <p>{value[0]}</p>
                </div>
            ))}
        </>
    )
}