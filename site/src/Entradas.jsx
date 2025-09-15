import "./Style.css";
import { MostrarAdicional } from "./Adicionais.jsx";
import { useEffect, useState } from "react";
import buffs from "./adicionais.json";

export function BasicInformation({ info, setInfo, settarValores }) {
    return (
        <div>
            <h4>Informações</h4>
            <div className="row">
                <div className="col">
                    <label>Nome:</label>
                    <input className="form-control" name="nome" value={info.nome} onChange={e => settarValores(e, setInfo)} type="text" />
                </div>
                <div className="col">
                    <label>Idade:</label>
                    <input className="form-control" name="idade" value={info.idade} onChange={e => settarValores(e, setInfo)} type="number" />
                </div>
                <div className="col">
                    <label>Data de Nascimento:</label>
                    <input className="form-control" name="nascimento" value={info.nascimento} onChange={e => settarValores(e, setInfo)} type="date" />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label>História:</label>
                    <textarea className="form-control" name="historia" value={info.historia} onChange={e => settarValores(e, setInfo)} rows={3} />
                </div>
            </div>
        </div>
    );
}

export function Habilidade({ habilidades, setHabilidade }) {
    const [showHabilidade, setShowHabilidade] = useState(false);

    useEffect(() => {
        document.body.style.overflow = showHabilidade ? "hidden" : "auto"
    });

    return (
        <div id="habilidade">
            <h4>Habilidades</h4>
            <button onClick={() => setShowHabilidade(true)}>Escolher Habilidades</button>
            {showHabilidade ? (
                <div className="popUp">
                    <div className="container">
                        <div className="sticky-top d-flex justify-content-between align-items-center">
                            {habilidades.length > 0 ? <h4>Habilidades escolhidas: {habilidades.join(", ")}</h4> : <h4>Nenhuma Habilidade escolhida</h4>}
                            <span onClick={() => setShowHabilidade(false)} className="close">&times;</span>
                        </div>
                        <MostrarAdicional isClasseHabili={"Habilidade"} adicionais={habilidades} setAdicionais={setHabilidade} />
                    </div>
                </div>
            ) : (
                <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-0">
                    {habilidades.map((key) => (
                        <div className="col" key={key}>
                            <small className="d-block p-2 border rounded h-100">
                                <h4>{key}</h4>
                                <p>{buffs["habilidades"][key]}</p>
                            </small>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export function Classe({ classe, setClasse, especialidades, setEspecialidade }) {
    const [showClasse, setShowClasse] = useState(false);
    const [showEspecialidade, setShowEspecialidade] = useState(false);

    useEffect(() => {
        document.body.style.overflow = (showClasse || showEspecialidade) ? "hidden" : "auto"
    });

    return (
        <>
            <div id="classes">
                <h4>Classes</h4>
                <button onClick={() => setShowClasse(true)}>Escolher Classe</button>
                {showClasse ? (
                    <div className="popUp">
                        <div className="container">
                            <div className="sticky-top d-flex justify-content-between align-items-center">
                                {classe != "" ? <h4>Classe escolhida: {classe.concat(".")}</h4> : <h4>Nenhuma Classe escolhida</h4>}
                                <span onClick={() => setShowClasse(false)} className="close">&times;</span>
                            </div>
                            <MostrarAdicional isClasseHabili={"Classe"} adicionais={classe} setAdicionais={setClasse} setEspeci={setEspecialidade} />
                        </div>
                    </div>
                ) : classe == "" ? null : (
                    <div className="row g-0">
                        <div className="col" key={classe}>
                            <small className="d-block p-2 border rounded h-100">
                                <h4>{classe}</h4>
                                <p className="quebraLinha">{buffs["classes"][classe]}</p>
                            </small>
                        </div>
                    </div>
                )}
            </div>
            {classe === "" ? (
                null
            ) : (
                <div id="especialidades">
                    <h4>Especialidades</h4>
                    <button onClick={() => setShowEspecialidade(true)}>Escolher Especialidade</button>
                    {showEspecialidade ? (
                        <div className="popUp">
                            <div className="container">
                                <div className="sticky-top d-flex justify-content-between align-items-center">
                                    {especialidades.length > 0 ? <h4>Habilidades escolhidas: {especialidades.join(", ")}</h4> : <h4>Nenhuma Especialidade Escolhida</h4>}
                                    <span onClick={() => setShowEspecialidade(false)} className="close">&times;</span>
                                </div>
                                <MostrarAdicional isClasseHabili={"Especialidade"} adicionais={especialidades} setAdicionais={setEspecialidade} classeEspeci={classe} />
                            </div>
                        </div>
                    ) : (
                        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-0">
                            {especialidades.map((key) => (
                                <div className="col" key={key}>
                                    <small className="d-block p-2 border rounded h-100">
                                        <h4>{key}</h4>
                                        <p>{buffs["especialidades"][classe][key]}</p>
                                    </small>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export function Atributos({ atributos, setAtributos, buffs, setBuffs, settarValores }) {
    return (
        <div className="form-group">
            <h4>Atributos</h4>

            <label>Aparência: <input className="form-control" name="aparencia" value={atributos.aparencia} onChange={e => settarValores(e, setAtributos)} type="number" />
            <input className="form-control" name="aparencia" value={buffs.aparencia} onChange={e => settarValores(e, setBuffs)} type="number" /></label><br /> 

            <label>Sabedoria: <input className="form-control" name="sabedoria" value={atributos.sabedoria} onChange={e => settarValores(e, setAtributos)} type="number" />
            <input className="form-control" name="sabedoria" value={buffs.sabedoria} onChange={e => settarValores(e, setBuffs)} type="number" /></label><br /> 

            <label>Tamanho: <input className="form-control" name="tamanho" value={atributos.tamanho} onChange={e => settarValores(e, setAtributos)} type="number" />
            <input className="form-control" name="tamanho" value={buffs.tamanho} onChange={e => settarValores(e, setBuffs)} type="number" /></label><br /> 
            {atributos.tamanho && <span>{`1d${4+2*(Number(atributos.tamanho)+Number(buffs.tamanho))}`}</span>}<br />
        </div>
    );
}

export function Pericias({ pericias, setPericias, buffs, setBuffs, settarValores, definirSorte }) {
    return (
        <div className="form-group">
            <h4>Perícias</h4>

            <label>Destreza: <input className="form-control" name="destreza" value={pericias.destreza} onChange={e => settarValores(e, setPericias)} type="number" />
            <input className="form-control" name="destreza" value={buffs.destreza} onChange={e => settarValores(e, setBuffs)} type="number" /></label><br /> 

            <label>Força: <input className="form-control" name="forca" value={pericias.forca} onChange={e => settarValores(e, setPericias)} type="number" />
            <input className="form-control" name="forca" value={buffs.forca} onChange={e => settarValores(e, setBuffs)} type="number" /></label><br /> 

            <label>Intelecto: <input className="form-control" name="intelecto" value={pericias.intelecto} onChange={e => settarValores(e, setPericias)} type="number" />
            <input className="form-control" name="intelecto" value={buffs.intelecto} onChange={e => settarValores(e, setBuffs)} type="number" /></label><br /> 

            <label>Lábia: <input className="form-control" name="labia" value={pericias.labia} onChange={e => settarValores(e, setPericias)} type="number" />
            <input className="form-control" name="labia" value={buffs.labia} onChange={e => settarValores(e, setBuffs)} type="number" /></label><br /> 

            <label>Percepção: <input className="form-control" name="percepcao" value={pericias.percepcao} onChange={e => settarValores(e, setPericias)} type="number" />
            <input className="form-control" name="percepcao" value={buffs.percepcao} onChange={e => settarValores(e, setBuffs)} type="number" /></label><br /> 

            <label>Poder: <input className="form-control" name="poder" value={pericias.poder} onChange={e => settarValores(e, setPericias)} type="number" />
            <input className="form-control" name="poder" value={buffs.poder} onChange={e => settarValores(e, setBuffs)} type="number" /></label><br /> 

            <label>Precisão: <input className="form-control" name="precisao" value={pericias.precisao} onChange={e => settarValores(e, setPericias)} type="number" />
            <input className="form-control" name="precisao" value={buffs.precisao} onChange={e => settarValores(e, setBuffs)} type="number" /></label><br /> 

            <label>Psicologia: <input className="form-control" name="psicologia" value={pericias.psicologia} onChange={e => settarValores(e, setPericias)} type="number" />
            <input className="form-control" name="psicologia" value={buffs.psicologia} onChange={e => settarValores(e, setBuffs)} type="number" /></label><br /> 

            <label>Técnica: <input className="form-control" name="tecnica" value={pericias.tecnica} onChange={e => settarValores(e, setPericias)} type="number" />
            <input className="form-control" name="tecnica" value={buffs.tecnica} onChange={e => settarValores(e, setBuffs)} type="number" /></label><br /> 

            <label>Vigor: <input className="form-control" name="vigor" value={pericias.vigor} onChange={e => settarValores(e, setPericias)} type="number" />
            <input className="form-control" name="vigor" value={buffs.vigor} onChange={e => settarValores(e, setBuffs)} type="number" /></label><br /> 

            <label>Sorte: <span>{pericias.sorte} </span><button id="btnSorte" onClick={definirSorte}>3d4+2</button>
            <input className="form-control" name="sorte" value={buffs.sorte} onChange={e => settarValores(e, setBuffs)} type="number" /></label><br /> 
        </div>
    );
}