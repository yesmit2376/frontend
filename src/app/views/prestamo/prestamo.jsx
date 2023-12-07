import React, { useState, useEffect } from 'react';
import {
    Grid,   
    TextField,
    InputLabel,
    Stack,
    MenuItem,
    Button,
    Select,
} from '@mui/material';
import { obtener_inplemeto } from '../../api/obtener_implemento.ts';
import { crearPrestamo } from '../../api/prestamo.ts';

const Prestar = () => {

    function obtenerFechaActual() {
        const fechaActual = new Date();
        const dia = fechaActual.getDate();
        const mes = fechaActual.getMonth() + 1; 
        const anio = fechaActual.getFullYear();
        const horas = '00';
        const minutos = '00';
        const segundos = '00';
    
        const fechaFormateada = `${anio}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia} ${horas}:${minutos}:${segundos}`;
    
        return fechaFormateada;
    }
    
    const fechaActual = obtenerFechaActual();
    
      
    const token = localStorage.getItem('token');

    let usuario = '';

    try {
        const tokenData = token ? JSON.parse(atob(token.split('.')[1])) : {};
        usuario = tokenData.id || '';
    } catch (error) {
        console.error('Error al parsear el token:', error);
    }

    const [formData, setFormData] = useState({
    usuario: usuario,
    implementos: [''],
    cantidad_implementos: [0],
    estado: '65372a7d48191d49b7466fda',
    fecha_inicio: fechaActual,
    fecha_fin: fechaActual
});


    const [implementoData, setN_iData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const n_i = await obtener_inplemeto();
                setN_iData(n_i);
            } catch (error) {
                console.error('Error al obtener los nombres de los implementos', error);
            }
        }
        fetchData();
    }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
        ...prevData,
        [name]: name === 'implementos' ? [value] : [parseInt(value, 10)] // Ensure it's an array
    }));
};


    const handleSubmit = async () => {
        try {
            const response = await crearPrestamo(formData);
            console.log('Response from API:', response);
        } catch (error) {
            console.error('Error creating loan:', error);
        }
        // console.log(formData);
    };


    return (
        <>
            <form>
                    <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                        <Grid item xs={12} md={1}></Grid>
                        <Grid item xs={12} md={5}>
                            <Stack spacing={0}>
                                <InputLabel htmlFor={`implemento-`}>Nombre del implemento</InputLabel>
                                <Select
                                    id={`implemento`}
                                    name={`implementos`}
                                    fullWidth
                                    value={formData.implementos}
                                    onChange={(e) => handleChange(e)}
                                >
                                    {implementoData.map((option) => (
                                        <MenuItem key={option._id} value={option._id}>
                                            {option.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <Stack spacing={0}>
                                <InputLabel htmlFor={`cantidad-`}>Cantidad de implementos</InputLabel>
                                <TextField
                                    fullWidth
                                    type="string"
                                    name={`cantidad_implementos`}
                                    value={formData.cantidad_implementos}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={1}></Grid>
                    </Grid>
                <br />
                <br />
                <br />
                                        
                <Grid container spacing={2}>
                    <Grid item xs={12} md={1}></Grid>
                    <Grid item xs={12} md={10}>
                        <center>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Prestar
                            </Button>
                        </center>
                    </Grid>
                    <Grid item xs={12} md={1}></Grid>
                </Grid>
            </form>
            <br />
            <br />
        </>
    );
};

export default Prestar;
