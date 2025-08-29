import itens from "./habilidades.json"

export default function MostrarHabilidade() {
    return (
        <>
            {Object.entries(itens).map(([key, value]) => (
                <div key={key}>
                    <h3>{key}</h3>
                    <p>{value[0]}</p>
                </div>
            ))}
        </>
    )
}