import { useState } from "react";
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({presupuesto,setPresupuesto}) => {

    const [mensaje , setMensaje] = useState('');

    const handleFormulario = e => {
        e.preventDefault();

        if( !Number(presupuesto) || Number(presupuesto) < 0 ) {
            setMensaje('El presupuesto no es valido');

        } else {
            setMensaje('Es un presupuesto valido');
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form  onSubmit={handleFormulario} className="formulario" >
                <div className="campo">
                    <label htmlFor="">Definir Presupesto</label>
                    <input 
                        className="nuevo-presupuesto"
                        type="text"
                        placeholder="Añade tu presupuesto"
                        value={presupuesto}
                        onChange = { e => setPresupuesto(e.target.value) }
                        />
                    <input type="submit" value="Añadir"/>
                </div>
                
                {mensaje && <Mensaje tipo='error'> {mensaje} </Mensaje>}
            </form>

            
        </div>
    )
}

export default NuevoPresupuesto;