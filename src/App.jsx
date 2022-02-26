import { useEffect, useState } from 'react'
import Header from './components/Header';
import Modal from './components/Modal';
import Filtros from './components/Filtros';
import ListadoGastos from './components/ListadoGastos';
import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg';


function App() {

    const [presupuesto , setPresupuesto] = useState(0);
    const [isValidPresupuesto , setIsValidPresupuesto] = useState(false);
    const [modal , setModal] = useState(false);
    const [animarModal , setAnimarModal] = useState(false);
    const [gastos , setGastos] = useState([]);
    const [gastoEditar , setGastoEditar] = useState({});
    const [filtro , setFiltro] = useState('');
    const [gastosFiltrados , setGastosFiltrados] = useState([]);

    /* cuando ya haya cambios en gastoEditar entones mostrar la modal */
    useEffect(()=> {

        if(Object.keys(gastoEditar).length > 0 ) {

            setModal(true);
    
            setTimeout(() => {
                setAnimarModal(true);
            }, 500);
        }

    }, [gastoEditar])


    /* cuando la aplicacion este lista traer el presupuesto que esta en LS */

    useEffect( () => {

        const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
        setPresupuesto( presupuestoLS );

        if(presupuestoLS > 0) {
            setIsValidPresupuesto(true);
        }

        /* almacenar los gastos a localStorage cada vex que haya cambios en el arreglo de gastos */
        const gastosLS = JSON.parse(localStorage.getItem('gastos')) ?? [];
        
        setGastos( gastosLS );

    },[]);


    
    /* almacenar el local storage  el presupuesto*/
    useEffect( () => {
        localStorage.setItem('presupuesto', presupuesto ?? 0);

    }, [presupuesto] );

    

    useEffect(() => {

        localStorage.setItem('gastos' , JSON.stringify(gastos));

    }, [gastos])


    /* filtros */

    useEffect( () => {

        if(filtro) {
            
            const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro);

            setGastosFiltrados(gastosFiltrados);

        }

    }, [filtro])
    

    const handleNuevoGasto = () => {

        setModal(true);

        setGastoEditar({});

        setTimeout(() => {
            setAnimarModal(true);
        }, 500);
    }      

    const guardarGasto = gasto => {

        if(gasto.id) {
            //editar
            const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id  ? gasto : gastoState );

            setGastos(gastosActualizados);
            setGastoEditar({});

        } else {
            //nuevo registro
            gasto.id = generarId();
            gasto.fecha = Date.now();
            setGastos([...gastos , gasto]);

        }

        setAnimarModal(false);

        setTimeout(() => {
            setModal(false);
        }, 500);
    }


    const eliminarGasto = gasto => {

        const gastosActualizados =  gastos.filter( gastoState => gastoState.id !== gasto.id );

        setGastos( gastosActualizados );
    }

    return (   
        <div className={modal ? 'fijar' : ''}>
            <Header 
                gastos = {gastos}
                setGastos= {setGastos}
                presupuesto = {presupuesto}
                setPresupuesto = {setPresupuesto}
                isValidPresupuesto = {isValidPresupuesto}
                setIsValidPresupuesto = {setIsValidPresupuesto}
            />

            {isValidPresupuesto && (

                <>
                    <main>
                        <Filtros 
                            filtro = {filtro}
                            setFiltro = {setFiltro}
                        />
                        <ListadoGastos 
                            gastos ={gastos}
                            setGastoEditar ={setGastoEditar}
                            eliminarGasto = {eliminarGasto}
                            filtro ={filtro}
                            gastosFiltrados = {gastosFiltrados}
                        />
                    </main>
                    <div className='nuevo-gasto'>
                    <img 
                        src={IconoNuevoGasto} 
                        alt="icono nuevo gasto" 
                        onClick={handleNuevoGasto}
                        />
                    </div>
                </>
            )}
                


            {modal && 
                    <Modal 
                        setModal = {setModal} 
                        animarModal = {animarModal}
                        setAnimarModal = {setAnimarModal}
                        guardarGasto = {guardarGasto}
                        gastoEditar ={gastoEditar}
                        setGastoEditar ={setGastoEditar}
                    />}
        </div>


    )
}

export default App;
