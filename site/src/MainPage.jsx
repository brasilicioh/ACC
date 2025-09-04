import { useState } from 'react'
import Ficha from './LayoutFicha'
import { BasicInformation, Habilidade, Classe, Atributos, Pericias } from './Entradas.jsx'

function CriarCharacter() {
    const [info, setInfo] = useState({nome: "", idade: "", nascimento: "", historia: ""})
    const [habilidades, setHabilidade] = useState([])
    // const [classes, setClasses] = useState({classe: [], especialidade: []})
    const [atributos, setAtributos] = useState({aparencia: "", sabedoria: "", tamanho: ""})
    const [pericias, setPericias] = useState({destreza: "", forca: "", intelecto: "", labia: "", percepcao: "", poder: "", precisao: "", psicologia: "", tecnica: "", vigor: "", sorte: ""})
    const [buffs, setBuffs] = useState({aparencia: 0, sabedoria: 0, tamanho: 0, destreza: 0, forca: 0, intelecto: 0, labia: 0, percepcao: 0, poder: 0, precisao: 0, psicologia: 0, tecnica: 0, vigor: 0, sorte: 0})
    const [concluido, setConcluido] = useState(false);

    const settarValores = (e, setter) => {
        const { name, value, type } = e.target
        setter(prev => ({ ...prev, [name]: value === "" ? "" : type === "number" ? Number(value) : value }))
    }

    const handleConcluir = () => {
        if (!info.nome || !info.idade) {
            alert("Preencha todas informações pessoais!")
            return
        }
        if (habilidades.length == 0) {
            alert("Escolha uma habilidade!")
            return
        }
        // if (!classes.classe || !classes.especialidade) {
        //     alert("Preencha toda a classe do personagem!")
        //     return
        // }
        if (atributos.aparencia === "" || !atributos.sabedoria || !atributos.tamanho) {
            alert("Preencha todos atributos antes de continuar!")
            return
        }
        if (!pericias.destreza || !pericias.forca || !pericias.intelecto || !pericias.labia || !pericias.percepcao || !pericias.poder || !pericias.precisao || !pericias.psicologia || !pericias.tecnica || !pericias.vigor || !pericias.sorte) {
            alert("Preencha todas as perícias!")
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
                    <h1>Faça o Personagem</h1>
                    <hr />
                    <BasicInformation info={info} setInfo={setInfo} settarValores={settarValores} />
                    <hr />
                    <Habilidade habilidades={habilidades} setHabilidade={setHabilidade} />
                    <hr />
                    <Classe />
                    <hr />
                    <Atributos atributos={atributos} setAtributos={setAtributos} buffs={buffs} setBuffs={setBuffs} settarValores={settarValores} />
                    <hr />
                    <Pericias pericias={pericias} setPericias={setPericias} buffs={buffs} setBuffs={setBuffs} settarValores={settarValores} definirSorte={definirSorte} />
                    <br /><br />
                    <button onClick={() => handleConcluir()}>Concluir</button>
                </>
            ) : (
                <>
                    <h1>Layout da ficha</h1>
                    <Ficha info={info} habilidades={habilidades} atributos={atributos} pericias={pericias} buffs={buffs} />
                </>
            )}
        </>
    )
}

function MainChoice({ onEscolher }) {
    return (
        <>
            <div className="container">
                <h1 className="text-center">Escolha a sua opção</h1>
                <div className="row justify-content-center">
                    <button type="button" className="btn btn-info btn-lg btn-block firtsButton" onClick={() => onEscolher('character')}>Criar Personagem</button>
                </div>
                <div className="row justify-content-center">
                    <a className="btn btn-info btn-lg btn-block firtsButton" href="https://brasilicioh.github.io/simuladorDados/" role="button">Simulador Dados</a>
                </div>
            </div>
        </>
    )
}

export default function App() {
    const [tela, setTela] = useState('menu')

    return (
        <>
            {tela === 'menu' && <MainChoice onEscolher={setTela} />}
            {tela === 'character' && <CriarCharacter />}
        </>
    )
}