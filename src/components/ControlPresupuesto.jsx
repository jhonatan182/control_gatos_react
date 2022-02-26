
import { useEffect, useState } from 'react';
import { formatearCantidad } from '../helpers';
import { CircularProgressbar , buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({presupuesto , gastos , setGastos , setPresupuesto , setIsValidPresupuesto}) => {

    const [disponible , setDisponible] = useState(0);
    const [gastado , setGastado] = useState(0);
    const [procentaje , setPorcentaje] = useState(0);

    useEffect( () => {

        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total , 0);
        setGastado(totalGastado);

        const totalDisponible = presupuesto - totalGastado;
        setDisponible(totalDisponible);

        const nuevoPorcentaje = ( ((presupuesto -totalDisponible) / presupuesto ) * 100 ).toFixed(2);

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje);
        }, 1500);

    },[gastos]);


    const hadleResetApp = () => {

        const resultado = confirm('Quieres eliminar el presupuesto y gastos?');

        if(resultado) {
            setGastos([]);
            setPresupuesto(0);
            setIsValidPresupuesto(false);

        }

    }

 

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={ buildStyles({
                        pathColor : disponible < 0 ? '#DC2626' :'#3B82F6',
                        trailColor : '#F5F5F5',
                        textColor : disponible < 0 ? '#DC2626' :'#3B82F6'
                        
                    })}
                    value={ procentaje }
                    text={`${procentaje}% gastado`}
                >

                </CircularProgressbar>
            </div>

            <div className="contenido-presupuesto">
                <button 
                    className="reset-app"
                    type="button"
                    onClick={hadleResetApp}    
                >
                    Resetear App
                </button>

                <p>
                    <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`} >
                    <span>Disponible: </span> {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado: </span> {formatearCantidad(gastado)}
                </p>
            </div>

            

        </div>
    )
}

export default ControlPresupuesto;