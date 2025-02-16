import '@/css/Rickandmorty.css';

export const PersonajeCard = ({ name, image, status, species, location }) => {

    const getStatusStyle = (status) => {
        if (status === "Alive") {
            return { color: "green", icon: "✔️" };
        } else if (status === "Dead") {
            return { color: "red", icon: "❌" };
        } else {
            return {icon: "❓" };
        }
    };

    const statusStyle = getStatusStyle(status);

    return (
        <article className='card'>
            <div>
                <h2 className="card-h2">{name}</h2>
                <img className="card-img" src={image} alt={name} />
                <h3 className="card-h3">Especie: {species}</h3>
                <h3 className="card-h3" style={{ color: statusStyle.color }}>
                    {statusStyle.icon} {status === "Alive" && "Vivo"} {status === "Dead" && "Muerto"}
                </h3>
                <h3 className="card-h3">¿Donde vive?:{location.name} </h3>
            </div>
        </article>
    )
}