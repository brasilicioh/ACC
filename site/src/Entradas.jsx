import "./Style.css"
import MostrarHabilidade from "./Habilidades"
import { useEffect, useState } from "react"

export function BasicInformation({ info, setInfo, settarValores }) {
    return (
        <div id="infoPessoal">
            <h4>Informações</h4>
            <label>Nome: <input name='nome' value={info.nome} onChange={e => settarValores(e, setInfo)} type='text' /></label><br />
            <label>Idade: <input name='idade' value={info.idade} onChange={e => settarValores(e, setInfo)} type='number' /></label><br />
            <label>Data de Nascimento: <input name='nascimento' value={info.nascimento} onChange={e => settarValores(e, setInfo)} type='date' /></label><br />
            <label>História: <input name='historia' value={info.historia} onChange={e => settarValores(e, setInfo)} type='textarea' /></label><br />
        </div>
    )
}

export function Habilidade({ habilidades, setHabilidade }) {
    const [showHabilidade, setShowHabilidade] = useState(false);

    useEffect(() => {
        document.body.style.overflow = showHabilidade ? "hidden" : "auto"
    }, [showHabilidade])

    return (
        <div id='habilidade'>
            <button onClick={() => setShowHabilidade(true)}>Escolher Habilidades</button>
            {showHabilidade && (
                <div id="popUp" className={"popUp"}>
                    <div className={"container"}>
                        <span onClick={() => setShowHabilidade(false)} className={"close"}>&times;</span>
                        <MostrarHabilidade habilidades={habilidades} setHabilidade={setHabilidade} />
                    </div>
                </div>
            )}
        </div>
    )
}

export function Classe() {
    return (
        <div id='classe'>
            <h4>Classe</h4>
            <p>tem que fazer</p>
            <h4>Especialidade</h4>
            <p>tem que fazer</p>
        </div>
    )
}

export function Atributos({ atributos, setAtributos, buffs, setBuffs, settarValores }) {
    return (
        <div id='atributos'>
            <h4>Atributos</h4>
            <label>Aparência: <input name='aparencia' value={atributos.aparencia} onChange={e => settarValores(e, setAtributos)} type='number' />
            <input name='aparencia' value={buffs.aparencia} onChange={e => settarValores(e, setBuffs)} type='number' /></label><br /> 
            <label>Sabedoria: <input name='sabedoria' value={atributos.sabedoria} onChange={e => settarValores(e, setAtributos)} type='number' />
            <input name='sabedoria' value={buffs.sabedoria} onChange={e => settarValores(e, setBuffs)} type='number' /></label><br /> 
            <label>Tamanho: <input name='tamanho' value={atributos.tamanho} onChange={e => settarValores(e, setAtributos)} type='number' />
            <input name='tamanho' value={buffs.tamanho} onChange={e => settarValores(e, setBuffs)} type='number' /></label><br /> 
            {atributos.tamanho && <span>{`1d${4+2*(Number(atributos.tamanho)+Number(buffs.tamanho))}`}</span>}<br />
        </div>
    )
}

export function Pericias({ pericias, setPericias, buffs, setBuffs, settarValores, definirSorte }) {
    return (
        <div id='periciais'>
            <h4>Perícias</h4>
            <label>Destreza: <input name='destreza' value={pericias.destreza} onChange={e => settarValores(e, setPericias)} type='number' />
            <input name='destreza' value={buffs.destreza} onChange={e => settarValores(e, setBuffs)} type='number' /></label><br /> 
            <label>Força: <input name='forca' value={pericias.forca} onChange={e => settarValores(e, setPericias)} type='number' />
            <input name='forca' value={buffs.forca} onChange={e => settarValores(e, setBuffs)} type='number' /></label><br /> 
            <label>Intelecto: <input name='intelecto' value={pericias.intelecto} onChange={e => settarValores(e, setPericias)} type='number' />
            <input name='intelecto' value={buffs.intelecto} onChange={e => settarValores(e, setBuffs)} type='number' /></label><br /> 
            <label>Lábia: <input name='labia' value={pericias.labia} onChange={e => settarValores(e, setPericias)} type='number' />
            <input name='labia' value={buffs.labia} onChange={e => settarValores(e, setBuffs)} type='number' /></label><br /> 
            <label>Percepção: <input name='percepcao' value={pericias.percepcao} onChange={e => settarValores(e, setPericias)} type='number' />
            <input name='percepcao' value={buffs.percepcao} onChange={e => settarValores(e, setBuffs)} type='number' /></label><br /> 
            <label>Poder: <input name='poder' value={pericias.poder} onChange={e => settarValores(e, setPericias)} type='number' />
            <input name='poder' value={buffs.poder} onChange={e => settarValores(e, setBuffs)} type='number' /></label><br /> 
            <label>Precisão: <input name='precisao' value={pericias.precisao} onChange={e => settarValores(e, setPericias)} type='number' />
            <input name='precisao' value={buffs.precisao} onChange={e => settarValores(e, setBuffs)} type='number' /></label><br /> 
            <label>Psicologia: <input name='psicologia' value={pericias.psicologia} onChange={e => settarValores(e, setPericias)} type='number' />
            <input name='psicologia' value={buffs.psicologia} onChange={e => settarValores(e, setBuffs)} type='number' /></label><br /> 
            <label>Técnica: <input name='tecnica' value={pericias.tecnica} onChange={e => settarValores(e, setPericias)} type='number' />
            <input name='tecnica' value={buffs.tecnica} onChange={e => settarValores(e, setBuffs)} type='number' /></label><br /> 
            <label>Vigor: <input name='vigor' value={pericias.vigor} onChange={e => settarValores(e, setPericias)} type='number' />
            <input name='vigor' value={buffs.vigor} onChange={e => settarValores(e, setBuffs)} type='number' /></label><br /> 
            <label>Sorte: <span>{pericias.sorte !== "" ? pericias.sorte : ""} </span><button id='btnSorte' onClick={definirSorte}>3d4+2</button>
            <input name='sorte' value={buffs.sorte} onChange={e => settarValores(e, setBuffs)} type='number' /></label><br /> 
        </div>
    )
}