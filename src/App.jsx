import './App.css';
import Catalog from'./Catalog.jsx';
import Header from'./Header.jsx';
import Hero from './Hero.jsx';
export default function App() {

    return(
        <> 
        <div className='contenedor-layout'>
            <header className='layout-header' id='inicio'>
                <Header />
            </header>
            <div className='layout-hero'>
                <Hero />
            </div>
            <main className='layout-main' id='catalogo'>
                <Catalog />
            </main>
        
        </div>
        </>
    )
}