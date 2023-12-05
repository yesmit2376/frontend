interface Register {
    nombres: string;
    apellidos: string;
    eps: string;
    genero: string;
    tipo_doc: string;
    n_doc: string;
    correo_inst: string;
    fecha_nacimiento: string;
    correo_pers?: string;
    rol: string;
    telefono: string;
    ficha?: string;
    rh?: string;
    direccion: string;
    pps: boolean;
    token?: string;
    contrasena: string;
    activacion: boolean;
}

export const register = async (usuario: Register) => {
    try {
        console.log('Datos enviados:', JSON.stringify(usuario));

        const response = await fetch('https://proyecto-backend-sgbienestar.onrender.com/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Respuesta del servidor:', data);

            // Handle the response data or return it, as needed
            return data;
        } else {
            const errorData = await response.json();
            console.error('Error en la respuesta del servidor:', errorData);
            throw new Error('Error en la solicitud');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
