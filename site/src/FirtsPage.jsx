import { useState } from 'react'
import FichaNPC from './LayoutNPC'

function CriarCharacter({ tipo }) {
    const [info, setInfo] = useState({nome: "", idade: "", nascimento: "", historia: ""})
    // const [habilidades, setHabilidade] = useState([])
    // const [classes, setClasses] = useState({classe: [], especialidade: []})
    const [atributos, setAtributos] = useState({aparencia: "", sabedoria: "", tamanho: ""})
    const [pericias, setPericias] = useState({destreza: "", forca: "", intelecto: "", labia: "", percepcao: "", poder: "", precisao: "", psicologia: "", tecnica: "", vigor: "", sorte: ""})
    const [concluido, setConcluido] = useState(false);

    const settarValores = (e, setter) => {
        const { name, value } = e.target
        setter(prev => ({ ...prev, [name]: value }))
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
    };

    const exibirDF = () => {
        if (!atributos.tamanho) return ""
        const danoFisico = 4+2*Number(atributos.tamanho)
        return "1d" + danoFisico
    };

    const definirSorte = () => {
        const numeroAleatorio = (Math.floor(Math.random() * 4) + 1) + (Math.floor(Math.random() * 4) + 1) + (Math.floor(Math.random() * 4) + 1) + 2
        setPericias(prev => ({ ...prev, sorte: numeroAleatorio}))
    }

    function BasicInformation() {
        return (
            <div id="infoPessoal">
                <h4>Informações</h4>
                <label>Nome: <input name='nome' value={info.nome} onChange={e => settarValores(e, setInfo)} type='text' /></label><br />
                <label>Idade: <input name='idade' value={info.idade} onChange={e => settarValores(e, setInfo)} type='text' /></label><br />
            </div>
        )
    }

    function OtherInformation() {
        return (
            <div id="infoPessoal">
                <label>Data de Nascimento: <input name='nascimento' value={info.nascimento} onChange={e => settarValores(e, setInfo)} type='date' /></label><br />
                <label>História: <input name='historia' value={info.historia} onChange={e => settarValores(e, setInfo)} type='textarea' /></label><br />
            </div>
        )
    }

    function Habilidade() {
        return (
            <div id='habilidade'>
                <h4>Habilidade</h4>
                <p>tem que fazer</p>
            </div>
        )
    }

    function Classe() {
        return (
            <div id='classe'>
                <h4>Classe</h4>
                <p>tem que fazer</p>
                <h4>Especialidade</h4>
                <p>tem que fazer</p>
            </div>
        )
    }

    function Atributos() {
        return (
            <div id='atributos'>
                <h4>Atributos</h4>
                <label>Aparência: <input name='aparencia' value={atributos.aparencia} onChange={e => settarValores(e, setAtributos)} type='number' /></label><br />
                <label>Sabedoria: <input name='sabedoria' value={atributos.sabedoria} onChange={e => settarValores(e, setAtributos)} type='number' /></label><br />
                <label>Tamanho: <input name='tamanho' value={atributos.tamanho} onChange={e => settarValores(e, setAtributos)} type='number' /></label><br />
                {atributos.tamanho && <span>{exibirDF()}</span>}<br />
            </div>
        )
    }

    function Pericias() {
        return (
            <div id='periciais'>
                <h4>Perícias</h4>
                <label>Destreza: <input name='destreza' value={pericias.destreza} onChange={e => settarValores(e, setPericias)} type='number' /></label><br />
                <label>Força: <input name='forca' value={pericias.forca} onChange={e => settarValores(e, setPericias)} type='number' /></label><br />
                <label>Intelecto: <input name='intelecto' value={pericias.intelecto} onChange={e => settarValores(e, setPericias)} type='number' /></label><br />
                <label>Lábia: <input name='labia' value={pericias.labia} onChange={e => settarValores(e, setPericias)} type='number' /></label><br />
                <label>Percepção: <input name='percepcao' value={pericias.percepcao} onChange={e => settarValores(e, setPericias)} type='number' /></label><br />
                <label>Poder: <input name='poder' value={pericias.poder} onChange={e => settarValores(e, setPericias)} type='number' /></label><br />
                <label>Precisão: <input name='precisao' value={pericias.precisao} onChange={e => settarValores(e, setPericias)} type='number' /></label><br />
                <label>Psicologia: <input name='psicologia' value={pericias.psicologia} onChange={e => settarValores(e, setPericias)} type='number' /></label><br />
                <label>Técnica: <input name='tecnica' value={pericias.tecnica} onChange={e => settarValores(e, setPericias)} type='number' /></label><br />
                <label>Vigor: <input name='vigor' value={pericias.vigor} onChange={e => settarValores(e, setPericias)} type='number' /></label><br />
                <label>Sorte: <span name='sorte' value={pericias.sorte}>{pericias.sorte !== null ? pericias.sorte : ""} </span><button onClick={definirSorte}>3d4+2</button></label><br />
            </div>
        )
    }
    
    if (tipo === "npc") {
        return (
            <>
                {!concluido ? (
                    <>
                        <h1>Faça o NPC</h1>
                        <BasicInformation />
                        <hr />
                        <Habilidade />
                        <hr />
                        <Atributos />
                        <hr />
                        <Pericias />
                        <br /><br />
                        <button onClick={() => handleConcluir("npc")}>Concluir</button>
                    </>
                ) : (
                    <>
                        <h1>Layout da ficha do NPC</h1>
                        <FichaNPC info={info} atributos={atributos} pericias={pericias} />
                    </>
                )}
            </>
        )
    } else {
        return (
            <>
                {!concluido ? (
                    <>
                        <h1>Faça o Personagem</h1>
                        <BasicInformation />
                        <OtherInformation />
                        <hr />
                        <Habilidade />
                        <Classe />
                        <hr />
                        <Atributos />
                        <hr />
                        <Pericias />
                        <br /><br />
                        <button onChange={handleConcluir("player")}>Concluir</button>
                    </>
                ) : (
                    <>
                        <h1>funfa personagem</h1>
                    </>
                )}
            </>
        )
    }
}

function MainChoice({ onEscolher }) {
    return (
        <>
            <h1>Escolha a sua opção</h1>
            <button onClick={() => onEscolher('npc')}>Criar NPC</button>
            <button onClick={() => onEscolher('player')}>Criar Jogador</button>
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