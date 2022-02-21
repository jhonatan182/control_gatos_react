export const generarId = () => {
    const fecha = Date.now().toString(36);
    const numero = Math .random().toString(36).substring(2);

    return fecha + numero;

}

export const formatearFecha = fecha => {

    const fechaFormateada = new Date(fecha);

    const opciones = {year : 'numeric' , month: 'long', day : '2-digit'}

    return fechaFormateada.toLocaleDateString('es-ES', opciones);
}

export const formatearCantidad = cantidad => (
    cantidad.toLocaleString('HNL' , {
        style : 'currency' , 
        currency : 'HNL'
    })
);
