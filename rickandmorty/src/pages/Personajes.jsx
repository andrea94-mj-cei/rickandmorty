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
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        status: '',
        species: '',
        type: '',
        gender: ''
    });

    useEffect(() => {
        getPersonajes('https://rickandmortyapi.com/api/character');
    }, []);

    const getPersonajes = async (url) => {
        try {
            const respuesta = await fetch(url);
            if (!respuesta.ok) {
                throw new Error('Algo ha ido mal');
            }
            const objeto = await respuesta.json();
            setPersonajes(objeto.results);
            setInfo(objeto.info);
            const urlParams = new URLSearchParams(url.split('?')[1]);
            const page = urlParams.get('page') ? parseInt(urlParams.get('page')) : 1;
            setCurrentPage(page);
        } catch (error) {
            console.error('Error en el fetch:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: value
        }));
        const queryParams = new URLSearchParams({
            ...filters,
            [filterType]: value
        }).toString();
        getPersonajes(`https://rickandmortyapi.com/api/character?${queryParams}`);
    };

    const filteredPersonajes = personajes.filter(personaje =>
        personaje.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                <input
                    type="text"
                    placeholder=" 🔍 Busca un personaje"
                    value={searchTerm}
                    onChange={handleSearch}
                    className='personajes-input'
                />
                <div className='filter-buttons'>
                    <button onClick={() => handleFilterChange('status', 'alive')}>Alive</button>
                    <button onClick={() => handleFilterChange('status', 'dead')}>Dead</button>
                    <button onClick={() => handleFilterChange('status', 'unknown')}>Unknown</button>
                    <button onClick={() => handleFilterChange('gender', 'female')}>Female</button>
                    <button onClick={() => handleFilterChange('gender', 'male')}>Male</button>
                    <button onClick={() => handleFilterChange('gender', 'genderless')}>Genderless</button>
                    <button onClick={() => handleFilterChange('gender', 'unknown')}>Unknown</button>
                    
                </div>
                <div className='personajes-grid'>
                    {filteredPersonajes.map((personaje, id) => (
                        <PersonajeCard key={id} {...personaje} />
                    ))}
                </div>
            </section>
        </>
    );
};

export default Personajes;