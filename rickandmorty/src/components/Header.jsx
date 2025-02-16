import { BrowserRouter as Link, Routes, NavLink } from 'react-router-dom';

export const Header = () => {
    return (
        <>
            <main className='header'>
                <header>
                <nav className='header-nav'>
                    <ul className='header-ul'>
                        <li className='header-li'>
                            <NavLink to="/">Inicio</NavLink>
                        </li>
                        <li className='header-li'>
                            <NavLink to="/personajes">Personajes</NavLink>
                        </li>
                        <li className='header-li'>
                            <NavLink to="/episodios">Episodios</NavLink>
                        </li>
                        <li className='header-li'>
                            <NavLink to="/lugares">Lugares</NavLink>
                        </li>
                    </ul>
                </nav>
                </header>
            </main>
        </>
    );
}