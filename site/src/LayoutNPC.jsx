export default function FichaNPC({ info, atributos, pericias }) {
    return (
        <>
            <p>Nome: {info.nome}</p>
            <p>Aparencia: {atributos.aparencia}</p>
            <p>Destreza: {pericias.destreza}</p>
        </>
    )
}