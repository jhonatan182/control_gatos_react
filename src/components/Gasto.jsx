import React from "react";

import { formatearFecha, formatearCantidad } from "../helpers";

import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
  } from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import IconoAhorro from '../img/icono_ahorro.svg';
import IconoCasa from '../img/icono_casa.svg';
import IconoComida from '../img/icono_comida.svg';
import IconoGastos from '../img/icono_gastos.svg';
import IconoOcio from '../img/icono_ocio.svg';
import IconoSalud from '../img/icono_salud.svg';
import IconoSuscripciones from '../img/icono_suscripciones.svg';

const Gasto = ({gasto , setGastoEditar , eliminarGasto}) => {

    const {nombre , cantidad , categoria , id , fecha} = gasto;

    const diccionarioInconos = {
        ahorro : IconoAhorro,
        comida: IconoComida,
        casa: IconoCasa,
        gastos: IconoGastos,
        ocio: IconoOcio,   
        salud: IconoSalud,     
        suscripciones: IconoSuscripciones,
    }

    /* deben de retornar por eso usar ()  en lugar de {}*/
    const leadingActions = () => (

        <LeadingActions>
            <SwipeAction onClick={ () => setGastoEditar(gasto) }>
                Editar
            </SwipeAction>
        </LeadingActions>
    )
    
    /* deben de retornar por eso usar ()  en lugar de {}*/
    const trailingActions = () => (

        <TrailingActions>
            <SwipeAction 
                onClick={ () => eliminarGasto(gasto) }
                destructive ={true}
                >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem 
                leadingActions={leadingActions()} /*acccion cuando deslice para adelante */
                trailingActions ={trailingActions()} /*acccion cuando deslice para atras */
            >
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
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Gasto;