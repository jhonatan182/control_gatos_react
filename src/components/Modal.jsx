import { useEffect, useState } from 'react';
import Mensaje from './Mensaje';
import IconoCerrarModal from '../img/cerrar.svg';

const Modal = ({setModal , animarModal, setAnimarModal, guardarGasto , gastoEditar , setGastoEditar}) => {

    const [mensaje , setMensaje] =  useState('');
    const [nombre , setNombre] = useState('');
    const [cantidad , setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [id , setId] = useState('');
    const [fecha , setFecha] = useState('');

    useEffect(() => {

        if(Object.keys(gastoEditar).length > 0 ) {

            setNombre( gastoEditar.nombre );
            setCantidad( gastoEditar.cantidad );
            setCategoria( gastoEditar.categoria );
            setId( gastoEditar.id );
            setFecha( gastoEditar.fecha )
        }

    },[] )

    const ocultarModal = () => {

        setAnimarModal(false);
        setGastoEditar({});
        setTimeout(() => {
            setModal(false);
        }, 500);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if([nombre, cantidad , cantidad ,categoria ].includes('')) {
            setMensaje('Todos los datos son obligatorios');

            setTimeout(() => {
                setMensaje('');
            }, 3000);

            return;
        }




        /* guardar nuevo dato en el estate */
        guardarGasto({ nombre , cantidad , categoria , id , fecha});



    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img 
                    src={IconoCerrarModal} 
                    alt="cerrar modal" 
                    onClick={ ocultarModal }
                />
            </div>

            <form onSubmit={handleSubmit}
                className={`formulario ${animarModal ? "animar" : "cerrar" } `}>

                <legend>{gastoEditar.id ? 'Editar Gasto' : 'Nuevo Gasto' }</legend>
                    {mensaje && <Mensaje tipo='error' >{mensaje}</Mensaje>}

                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input 
                        type="text" 
                        id="nombre"
                        placeholder="Añade el nombre del gasto"
                        value={nombre}
                        onChange = {e => setNombre(e.target.value)}
                        />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input 
                        type="number" 
                        id="cantidad"
                        placeholder="Añade una cantidad emj: 300"
                        value={cantidad}
                        onChange={ e => setCantidad( Number(e.target.value)) }
                        />
                </div>

                <div className="campo">     
                    <label htmlFor="categoria">Categoria</label>
                    <select id="categoria" value={categoria} onChange={ e => setCategoria(e.target.value) } >
                        <option value="">--Seleccione--</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input type="submit" value={gastoEditar.id ? 'Guardar Cambios' : 'Añadir Gasto' }/>
            </form>

        </div>
    )
}

export default Modal