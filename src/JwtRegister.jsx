import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  TextField,
  Button,
  Autocomplete,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { Box, styled } from '@mui/material';
import useAuth from 'app/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { obtenerEPS } from '../../api/eps.ts';
import { obtenerRol } from '../../api/rol.ts';
import { obtenerFichas } from '../../api/fichas.ts';
import { register } from '../../api/register.ts';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));
const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));
const ContentBox = styled(JustifyBox)(() => ({
  height: '100%',
  padding: '32px',
  background: 'rgba(0, 0, 0, 0.01)',
}));
const JWTRegister = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 1000,
    minHeight: 800,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
  },
}));

const JwtRegister = () => {
  const theme = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [epsOptions, setEpsOptions] = useState([]);
  const [rolOptions, setRolOptions] = useState([]);
  const [fichaOptions, setFichaOptions] = useState([]);

  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    eps: '',
    genero: '',
    tipo_doc: '',
    n_doc: '',
    correo_inst: '',
    fecha_nacimiento: '',
    correo_pers: '',
    rol: '',
    telefono: '',
    ficha: '',
    rh: '',
    direccion: '',
    pps: false,
    contrasena: '',
    activacion: false,
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const epsData = await obtenerEPS();
        const rolData = await obtenerRol();
        const fichaData = await obtenerFichas();

        setEpsOptions(epsData);
        setRolOptions(rolData);
        setFichaOptions(fichaData);
      } catch (error) {
        console.error('Error al obtener datos iniciales:', error);
      }
    };

    fetchInitialData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    try {
      const response = await register(formData);
      console.log(response);
    } catch (error) {
      console.error('Error al registrar:', error);
    }
  };

  const generoOptions = [
    { value: 'seleccion', label: 'Seleccione' },
    { value: 'masculino', label: 'Masculino' },
    { value: 'femenino', label: 'Femenino' },
    { value: 'no_aporta', label: 'No aporta' },
  ];

  const tipoDocumentoOptions = [
 { value: 'Seleccione', label: 'Seleccione' },
    { value: 'T.I', label: 'Tarjeta de identidad' },
    { value: 'C.C', label: 'Cédula' },
    { value: 'dni', label: 'DNI (Documento Nacional de Identidad)' },
    { value: 'licencia', label: 'Licencia de Conducir' },
    { value: 'rut', label: 'RUT (Registro Único Tributario)' },
    { value: 'paspextranjero', label: 'Pasaporte de Extranjería' },
    { value: 'otro', label: 'Otro documento' },
  ];

  const tipoSangreOptions = [
    { value: 'Seleccione', label: 'Seleccione' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' },
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'no_sabe', label: 'No sabe/no está seguro' },
  ];

  return (
    <JWTRegister>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              <img
                width="100%"
                alt="Register"
                src="/assets/images/illustrations/posting_photo.svg"
              />
            </ContentBox>
          </Grid>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Nombres"
                  fullWidth
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  label="Apellidos"
                  fullWidth
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="eps">EPS</InputLabel>
                  <Select
                    id="eps"
                    name="eps"
                    value={formData.eps}
                    onChange={(event) => handleChange(event)}
                  >
                    {epsOptions.map((eps) => (
                      <MenuItem key={eps._id} value={eps._id}>
                        {eps.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <InputLabel htmlFor="genero">Género</InputLabel>
                <Select
                  id="genero"
                  name="genero"
                  fullWidth
                  value={formData.genero}
                  onChange={handleChange}
                >
                  {generoOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <InputLabel htmlFor="tipo_doc">Tipo de Documento</InputLabel>
                <Select
                  id="tipo_doc"
                  name="tipo_doc"
                  fullWidth
                  value={formData.tipo_doc}
                  onChange={handleChange}
                >
                  {tipoDocumentoOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  label="Número de Documento"
                  fullWidth
                  name="n_doc"
                  value={formData.n_doc}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  label="Correo Institucional"
                  fullWidth
                  name="correo_inst"
                  value={formData.correo_inst}
                  onChange={handleChange}
                  margin="normal"
                />
                <InputLabel htmlFor="fecha">Fecha nacimiento</InputLabel>
                <TextField
                  fullWidth
                  name="fecha_nacimiento"
                  type="date"
                  value={formData.fecha_nacimiento}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  label="Correo Personal"
                  fullWidth
                  name="correo_pers"
                  value={formData.correo_pers}
                  onChange={handleChange}
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="rol">Rol</InputLabel>
                  <Select
                    id="rol"
                    name="rol"
                    value={formData.rol}
                    onChange={(event) => handleChange(event)}
                  >
                    {rolOptions.map((rol) => (
                      <MenuItem key={rol._id} value={rol._id}>
                        {rol.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Teléfono"
                  fullWidth
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="ficha">Ficha</InputLabel>
                  <Autocomplete
                    id="ficha"
                    name="ficha"
                    label="Numero de Ficha"
                    options={fichaOptions.map((option) => ({
                      value: option._id,
                      label: option.codigo,
                      key: `ficha-option-${option._id}`,
                    }))}
                    onChange={(_, value) => setFormData((prevData) => ({ ...prevData, ficha: value }))}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth margin="normal" />
                    )}
                  />
                </FormControl>  

                <InputLabel htmlFor="rh">Tipo de Sangre</InputLabel>
                <Select
                  id="rh"
                  name="rh"
                  fullWidth
                  value={formData.rh}
                  onChange={handleChange}
                >
                  {tipoSangreOptions.map((option) => (
                    <MenuItem key={`tipo_sangre-option-${option.value}`} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  label="Dirección"
                  fullWidth
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  label="Contraseña"
                  fullWidth
                  type="password"
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleChange}
                  margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                  Registrar
                </Button>
              </form>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </JWTRegister>
  );
};

export default JwtRegister;