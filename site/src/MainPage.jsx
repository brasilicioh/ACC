import { useState } from 'react'
import Ficha from './LayoutFicha'
import { BasicInformation, OtherInformation, Habilidade, Classe, Atributos, Pericias } from './Entradas.jsx'

function CriarCharacter({ tipo }) {
    const [info, setInfo] = useState({nome: "", idade: "", nascimento: "", historia: ""})
    // const [habilidades, setHabilidade] = useState([])
    // const [classes, setClasses] = useState({classe: [], especialidade: []})
    const [atributos, setAtributos] = useState({aparencia: "", sabedoria: "", tamanho: ""})
    const [pericias, setPericias] = useState({destreza: "", forca: "", intelecto: "", labia: "", percepcao: "", poder: "", precisao: "", psicologia: "", tecnica: "", vigor: "", sorte: ""})
    const [buffs, setBuffs] = useState({aparencia: 0, sabedoria: 0, tamanho: 0, destreza: 0, forca: 0, intelecto: 0, labia: 0, percepcao: 0, poder: 0, precisao: 0, psicologia: 0, tecnica: 0, vigor: 0, sorte: 0})
    const [concluido, setConcluido] = useState(false);

    const settarValores = (e, setter) => {
        const { name, value, type } = e.target
        setter(prev => ({ ...prev, [name]: value === "" ? "" : type === "number" ? Number(value) : value }))
    }

    const handleConcluir = (tipo) => {
        if (!info.nome || !info.idade) {
            alert("Preencha todas informações pessoais!")
            return
        }
        if (tipo === "player" && (!info.nascimento || !info.historia)) {
            alert("Preencha todas informações pessoais!")
            return
        }
        // if (!habilidades) {
        //     alert("Preencha a habilidade!")
        //     return
        // }
        // if (tipo === "player" && (!classes.classe || classes.especialidade)) {
        //     alert("Preencha toda a classe do personagem!")
        //     return
        // }
        if (!atributos.aparencia || !atributos.sabedoria || !atributos.tamanho) {
            alert("Preencha todos atributos antes de continuar!")
            return
        }
        if (!pericias.destreza || !pericias.forca || !pericias.intelecto || !pericias.labia || !pericias.percepcao || !pericias.poder || !pericias.precisao || !pericias.psicologia || !pericias.tecnica || !pericias.vigor || !pericias.sorte) {
            alert("Preencha todas as pericias")
            return
        }
        setConcluido(true);
    }

    const definirSorte = () => {
        const numeroAleatorio = (Math.floor(Math.random() * 4) + 1) + (Math.floor(Math.random() * 4) + 1) + (Math.floor(Math.random() * 4) + 1) + 2
        setPericias(prev => ({ ...prev, sorte: numeroAleatorio}))
    }
    
    return (
        <>
            {!concluido ? (
                <>
                    <h1>Faça o NPC</h1>
                    <BasicInformation info={info} setInfo={setInfo} settarValores={settarValores} />
                    {tipo === "player" ? <OtherInformation info={info} setInfo={setInfo} settarValores={settarValores} /> : null}
                    <hr />
                    <Habilidade />
                    {tipo === "player" ? <Classe /> : null}
                    <hr />
                    <Atributos atributos={atributos} setAtributos={setAtributos} buffs={buffs} setBuffs={setBuffs} settarValores={settarValores} />
                    <hr />
                    <Pericias pericias={pericias} setPericias={setPericias} buffs={buffs} setBuffs={setBuffs} settarValores={settarValores} definirSorte={definirSorte} />
                    <br /><br />
                    <button onClick={() => handleConcluir("npc")}>Concluir</button>
                </>
            ) : (
                <>
                    <h1>Layout da ficha do NPC</h1>
                    <Ficha info={info} atributos={atributos} pericias={pericias} buffs={buffs} tipo={tipo} />
                </>
            )}
        </>
    )
}

function MainChoice({ onEscolher }) {
    return (
        <>
            <h1>Escolha a sua opção</h1>
            <button onClick={() => onEscolher('npc')}>Criar NPC</button>
            <button onClick={() => onEscolher('player')}>Criar Jogador</button>
            <a href="https://brasilicioh.github.io/simuladorDados"><button>Simulador Dados</button></a>
        </>
    )
}

export default function App() {
    const [tela, setTela] = useState('menu')

    return (
        <>
            {tela === 'menu' && <MainChoice onEscolher={setTela} />}
            {tela === 'npc' && <CriarCharacter tipo="npc" />}
            {tela === 'player' && <CriarCharacter tipo="player" />}
        </>
    )
}