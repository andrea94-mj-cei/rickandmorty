import { useState, useEffect } from 'react';
import { PersonajeCard } from '@/components/PersonajeCard.jsx';

const Personajes = () => {
    const [personajes, setPersonajes] = useState([]);
    const [info, setInfo] = useState({
        count: 0,
        next: null,
        prev: null,
        pages: 0
    });
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getPersonajes('https://rickandmortyapi.com/api/character');
    }, []);

    const getPersonajes = async (url) => {
        const respuesta = await fetch(url);
        const objeto = await respuesta.json();
        setPersonajes(objeto.results);
        setInfo(objeto.info);
        const urlParams = new URLSearchParams(url.split('?')[1]);
        const page = urlParams.get('page') ? parseInt(urlParams.get('page')) : 1;
        setCurrentPage(page);
    };

    return (
        <>
            <section className='personajes-container'>
                <img className='personajes-img' src="/nombre.svg" alt="cabecera" />
                <h1 className='personajes-h1'>Total de personajes: {info.count}</h1>
                <div className='personajes-buttons'>
                    <button disabled={!info.prev} onClick={() => { getPersonajes(info.prev) }}>Anterior</button>
                    <p>Página {currentPage} de {info.pages}</p>
                    <button disabled={!info.next} onClick={() => { getPersonajes(info.next) }}>Siguiente</button>
                </div>
                <div className='personajes-grid'>
                    {personajes.map((personaje, id) => (
                        <PersonajeCard key={id} {...personaje} />
                    ))}
                </div>
            </section>
        </>
    );
};

export default Personajes;