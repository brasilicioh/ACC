import "./Style.css";
import { MostrarAdicional } from "./Adicionais.jsx";
import { useEffect, useState } from "react";
import buffs from "./adicionais.json";

function useOverflowBlock(isActive) {
  useEffect(() => {
    document.body.style.overflow = isActive ? "hidden" : "auto";
  }, [isActive]);
}

function EntradaInputs({ name, label, value, setValue, valueBuff, setValueBuff, settarValores, type = "number" }) {
  return (
    <div className="col-12 col-md-3 mb-3">
      <label htmlFor={name} className="form-label fw-bold">{label}</label>
      <div className="input-group input-group-sm">
        {name == "historia" ? (
          <textarea
            className="form-control" name={name}
            onChange={(e) => settarValores(e, setValue)}
            value={value} rows={3}
          />
        ) : name == "sorte" ? (
          <>
            <p>{value}</p><button onClick={setValue}>3d4+2</button>
          </>
        ) : (
          <input
            className="form-control" name={name} value={value}
            onChange={(e) => settarValores(e, setValue)}
            type={type} min="0" step="1"
          />
        )}
        {valueBuff == undefined ? null : (
          <input
            className="form-control" name={name} value={valueBuff}
            onChange={(e) => settarValores(e, setValueBuff)}
            type="number" step="1"
          />
        )}
      </div>
    </div>
  );
}

export function BasicInformation({ info, setInfo, settarValores }) {
  return (
    <div className="card p-2 shadow-sm">
      <h4 className="mb-3">Informações</h4>
      <div className="row justify-content-center">
        <EntradaInputs
          name={"nome"}
          label={"Nome"}
          value={info.nome}
          setValue={setInfo}
          settarValores={settarValores}
          type={"text"}
        />
        <EntradaInputs
          name={"idade"}
          label={"Idade"}
          value={info.idade}
          setValue={setInfo}
          settarValores={settarValores}
        />
        <EntradaInputs
          name={"nascimento"}
          label={"Data de Nascimento"}
          value={info.nascimento}
          setValue={setInfo}
          settarValores={settarValores}
          type={"date"}
        />
        <EntradaInputs
          name={"historia"}
          label={"História"}
          value={info.historia}
          setValue={setInfo}
          settarValores={settarValores}
        />
      </div>
    </div>
  );
}

export function Classe({ classe, setClasse, especialidades, setEspecialidade }) {
  const [showClasse, setShowClasse] = useState(false);
  const [showEspecialidade, setShowEspecialidade] = useState(false);

  useOverflowBlock(showClasse || showEspecialidade);

  return (
    <>
      <div id="classes">
        <h4>Classes</h4>
        <button onClick={() => setShowClasse(true)}>Escolher Classe</button>
        {showClasse ? (
          <div className="popUp">
            <div className="container">
              <div className="sticky-top d-flex justify-content-between align-items-center">
                {classe != "" ? (
                  <h4>Classe escolhida: {classe.concat(".")}</h4>
                ) : (
                  <h4>Nenhuma Classe escolhida</h4>
                )}
                <span onClick={() => setShowClasse(false)} className="close">&times;</span>
              </div>
              <MostrarAdicional
                strName={"Classe"}
                adicionais={classe}
                setAdicionais={setClasse}
                setEspeci={setEspecialidade}
              />
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
      {classe === "" || classe === "Sem Classe" || showClasse ? null : (
        <div id="especialidades">
          <h4>Especialidades</h4>
          <button onClick={() => setShowEspecialidade(true)}>Escolher Especialidade</button>
          {showEspecialidade ? (
            <div className="popUp">
              <div className="container">
                <div className="sticky-top d-flex justify-content-between align-items-center">
                  {especialidades.length > 0 ? (
                    <h4>Habilidades escolhidas: {especialidades.join(", ")}</h4>
                  ) : (
                    <h4>Nenhuma Especialidade Escolhida</h4>
                  )}
                  <span onClick={() => setShowEspecialidade(false)} className="close" >&times;</span>
                </div>
                <MostrarAdicional
                  strName={"Especialidade"}
                  adicionais={especialidades}
                  setAdicionais={setEspecialidade}
                  classeEspeci={classe}
                />
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

export function Habilidade({ habilidades, setHabilidade }) {
  const [showHabilidade, setShowHabilidade] = useState(false);

  useOverflowBlock(showHabilidade);

  return (
    <div id="habilidade">
      <h4>Habilidades</h4>
      <button onClick={() => setShowHabilidade(true)}>Escolher Habilidades</button>
      {showHabilidade ? (
        <div className="popUp">
          <div className="container">
            <div className="sticky-top d-flex justify-content-between align-items-center">
              {habilidades.length > 0 ? (
                <h4>Habilidades escolhidas: {habilidades.join(", ")}</h4>
              ) : (
                <h4>Nenhuma Habilidade escolhida</h4>
              )}
              <span onClick={() => setShowHabilidade(false)} className="close">&times;</span>
            </div>
            <MostrarAdicional
              strName={"Habilidade"}
              adicionais={habilidades}
              setAdicionais={setHabilidade}
            />
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

export function Atributos({ atributos, setAtributos, buffs, setBuffs, settarValores }) {
  return (
    <div className="card p-2 shadow-sm">
      <h4 className="mb-3">Atributos</h4>
      <div className="row justify-content-center">
        <EntradaInputs
          name="aparencia"
          label="Aparência"
          value={atributos.aparencia}
          setValue={setAtributos}
          valueBuff={buffs.aparencia}
          setValueBuff={setBuffs}
          settarValores={settarValores}
        />
        <EntradaInputs
          name="sabedoria"
          label="Sabedoria"
          value={atributos.sabedoria}
          setValue={setAtributos}
          valueBuff={buffs.sabedoria}
          setValueBuff={setBuffs}
          settarValores={settarValores}
        />
        <EntradaInputs
          name="tamanho"
          label="Tamanho"
          value={atributos.tamanho}
          setValue={setAtributos}
          valueBuff={buffs.tamanho}
          setValueBuff={setBuffs}
          settarValores={settarValores}
        />
        {atributos.tamanho.toString() !== "" && (
          <p>{`1d${4 + 2 * (Number(atributos.tamanho) + Number(buffs.tamanho))}`}</p>
        )}
      </div>
    </div>
  );
}

export function Pericias({ pericias, setPericias, buffs, setBuffs, settarValores, definirSorte }) {
  return (
    <div className="card p-2 shadow-sm">
      <h4 className="mb-3">Perícias</h4>
      <div className="row justify-content-center">
        <EntradaInputs
          name="destreza"
          label="Destreza"
          value={pericias.destreza}
          setValue={setPericias}
          valueBuff={buffs.destreza}
          setValueBuff={setBuffs}
          settarValores={settarValores}
        />
        <EntradaInputs
          name="forca"
          label="Força"
          value={pericias.forca}
          setValue={setPericias}
          valueBuff={buffs.forca}
          setValueBuff={setBuffs}
          settarValores={settarValores}
        />
        <EntradaInputs
          name="intelecto"
          label="Intelecto"
          value={pericias.intelecto}
          setValue={setPericias}
          valueBuff={buffs.intelecto}
          setValueBuff={setBuffs}
          settarValores={settarValores}
        />
        <EntradaInputs
          name="labia"
          label="Lábia"
          value={pericias.labia}
          setValue={setPericias}
          valueBuff={buffs.labia}
          setValueBuff={setBuffs}
          settarValores={settarValores}
        />
        <EntradaInputs
          name="percepcao"
          label="Percepção"
          value={pericias.percepcao}
          setValue={setPericias}
          valueBuff={buffs.percepcao}
          setValueBuff={setBuffs}
          settarValores={settarValores}
        />
        <EntradaInputs
          name="poder"
          label="Poder"
          value={pericias.poder}
          setValue={setPericias}
          valueBuff={buffs.poder}
          setValueBuff={setBuffs}
          settarValores={settarValores}
        />
        <EntradaInputs
          name="precisao"
          label="Precisão"
          value={pericias.precisao}
          setValue={setPericias}
          valueBuff={buffs.precisao}
          setValueBuff={setBuffs}
          settarValores={settarValores}
        />
        <EntradaInputs
          name="psicologia"
          label="Psicologia"
          value={pericias.psicologia}
          setValue={setPericias}
          valueBuff={buffs.psicologia}
          setValueBuff={setBuffs}
          settarValores={settarValores}
        />
        <EntradaInputs
          name="tecnica"
          label="Técnica"
          value={pericias.tecnica}
          setValue={setPericias}
          valueBuff={buffs.tecnica}
          setValueBuff={setBuffs}
          settarValores={settarValores}
        />
        <EntradaInputs
          name="vigor"
          label="Vigor"
          value={pericias.vigor}
          setValue={setPericias}
          valueBuff={buffs.vigor}
          setValueBuff={setBuffs}
          settarValores={settarValores}
        />
        <EntradaInputs
          name="sorte"
          label="Sorte"
          value={pericias.sorte}
          setValue={definirSorte}
          valueBuff={buffs.sorte}
          setValueBuff={setBuffs}
        />
      </div>
    </div>
  );
}