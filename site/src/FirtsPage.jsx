import { useState } from 'react'
import LayoutNPC from './LayoutNPC'

function CriaNpc() {
    const [nome, setNome] = useState("")
    const [atributos, setAtributos] = useState({aparencia: "", sabedoria: "", tamanho: ""})
    const [pericias, setPericias] = useState({destreza: "", forca: "", intelecto: "", labia: "", percepcao: "", poder: "", precisao: "", psicologia: "", tecnica: "", vigor: ""})
    const [sorte, setSorte] = useState("")
    const [concluido, setConcluido] = useState(false);

    const definirAtributo = (e) => {
        const { name, value } = e.target;
        setAtributos(prev => ({ ...prev, [name]: value }));
    };

    const definirPericia = (e) => {
        const { name, value } = e.target;
        setPericias(prev => ({ ...prev, [name]: value }));
    };

    const handleConcluir = () => {
        if (!atributos.aparencia || !atributos.sabedoria || !atributos.tamanho) {
            alert("Preencha todos atributos antes de continuar!")
            return
        }
        if (!pericias.destreza || !pericias.forca || !pericias.intelecto || !pericias.labia || !pericias.percepcao || !pericias.poder || !pericias.precisao || !pericias.psicologia || !pericias.tecnica || !pericias.vigor || !sorte) {
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

    const numAleatorio = () => {
        const numeroAleatorio = (Math.floor(Math.random() * 4) + 1) + (Math.floor(Math.random() * 4) + 1) + (Math.floor(Math.random() * 4) + 1) + 2
        setSorte(numeroAleatorio)
    }

    return (
        <>
            {!concluido ? (
                <>
                    <h1>Faça o NPC</h1>
                    <div id="infoPessoal">
                        <h4>Informações</h4>
                        <label>Nome: <input name='nome' value={nome} onChange={setNome(e => e.target.value)} type='text' /></label>
                    </div>

                    <hr />

                    <div id='habilidade'>
                        <h4>Habilidade</h4>
                        <p>tem que fazer</p>
                    </div>

                    <hr />

                    <div id='atributos'>
                        <h4>Atributos</h4>
                        <label>Aparência: <input name='aparencia' value={atributos.aparencia} onChange={definirAtributo} type='number' /></label><br />
                        <label>Sabedoria: <input name='sabedoria' value={atributos.sabedoria} onChange={definirAtributo} type='number' /></label><br />
                        <label>Tamanho: <input name='tamanho' value={atributos.tamanho} onChange={definirAtributo} type='number' /></label><br />
                        {atributos.tamanho && <span>{exibirDF()}</span>}
                    </div>

                    <hr />

                    <div id='periciais'>
                        <h4>Perícias</h4>
                        <label>Destreza: <input name='destreza' value={pericias.destreza} onChange={definirPericia} type='number' /></label><br />
                        <label>Força: <input name='forca' value={pericias.forca} onChange={definirPericia} type='number' /></label><br />
                        <label>Intelecto: <input name='intelecto' value={pericias.intelecto} onChange={definirPericia} type='number' /></label><br />
                        <label>Lábia: <input name='labia' value={pericias.labia} onChange={definirPericia} type='number' /></label><br />
                        <label>Percepção: <input name='percepcao' value={pericias.percepcao} onChange={definirPericia} type='number' /></label><br />
                        <label>Poder: <input name='poder' value={pericias.poder} onChange={definirPericia} type='number' /></label><br />
                        <label>Precisão: <input name='precisao' value={pericias.precisao} onChange={definirPericia} type='number' /></label><br />
                        <label>Psicologia: <input name='psicologia' value={pericias.psicologia} onChange={definirPericia} type='number' /></label><br />
                        <label>Técnica: <input name='tecnica' value={pericias.tecnica} onChange={definirPericia} type='number' /></label><br />
                        <label>Vigor: <input name='vigor' value={pericias.vigor} onChange={definirPericia} type='number' /></label><br />
                        <label>Sorte: <span>{sorte !== null ? sorte : ""} </span><button onClick={numAleatorio}>3d4+2</button></label><br />
                    </div>
                    <br /><br />
                    <button onClick={handleConcluir}>Concluir</button>
                </>
            ) : (
                <PaginaResultado nome={nome} atributos={atributos} pericias={pericias} />
            )}
        </>
    )
}

function CriaPlayer() {
    return (
        <h1>Eguee</h1>
    )
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

    if (tela === 'npc') return <CriaNpc />
    if (tela === 'player') return <CriaPlayer />
    return <MainChoice onEscolher={setTela} />
}