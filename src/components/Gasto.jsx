import { formatearFecha, formatearCantidad } from "../helpers";
import IconoAhorro from '../img/icono_ahorro.svg';
import IconoCasa from '../img/icono_casa.svg';
import IconoComida from '../img/icono_comida.svg';
import IconoGastos from '../img/icono_gastos.svg';
import IconoOcio from '../img/icono_ocio.svg';
import IconoSalud from '../img/icono_salud.svg';
import IconoSuscripciones from '../img/icono_suscripciones.svg';

const Gasto = ({gasto}) => {

    const {nombre , cantidad , categoria , id , fecha} = gasto;

    const diccionarioInconos = {
        ahorro : IconoAhorro,
        comida: IconoComida,
        casa: IconoCasa,
        gastos: IconoGastos,
        ocio: IconoOcio,   
        salud: IconoSalud,     
        suscripcionesnes: IconoSuscripciones,
    }

    return (
        <div className="gasto sombra">
            <div className="contenido-gasto">
                <img 
                    src={diccionarioInconos[categoria]} 
                    alt="Icono de categoria" 
                />
                <div className="descripcion-gasto">
                    <p className="categoria">{categoria}</p>
                    <p className="nombre-gasto">{nombre}</p>
                    <p className="fecha-gasto">
                        Agregado el: {''}
                        <span>{ formatearFecha(fecha) }</span>
                    </p>
                </div>
            </div>
            <p className="cantidad-gasto">{ formatearCantidad(cantidad) }</p>
        </div>
    )
}

export default Gasto;