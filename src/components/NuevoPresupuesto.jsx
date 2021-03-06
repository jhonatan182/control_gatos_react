import { useState } from "react";
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({presupuesto,setPresupuesto , setIsValidPresupuesto}) => {

    const [mensaje , setMensaje] = useState('');

    const handleFormulario = e => {
        e.preventDefault();

        if( !presupuesto || presupuesto < 0 ) {
            setMensaje('El presupuesto no es valido');
            setIsValidPresupuesto(false);
            return;
        }

        setMensaje('');
        setIsValidPresupuesto(true);
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form  onSubmit={handleFormulario} className="formulario" >
                <div className="campo">
                    <label htmlFor="">Definir Presupesto</label>
                    <input 
                        className="nuevo-presupuesto"
                        type="number"
                        placeholder="Añade tu presupuesto"
                        value={presupuesto}
                        onChange = { e => setPresupuesto(Number(e.target.value)) }
                        />
                    <input type="submit" value="Añadir"/>
                </div>
                
                {mensaje && <Mensaje tipo='error'> {mensaje} </Mensaje>}
            </form>

            
        </div>
    )
}

export default NuevoPresupuesto;