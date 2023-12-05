import { Box, Button, Card, Grid, styled, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { restablecer } from '../../api/rest_pasword.ts';

const FlexBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: 'center',
}));

const ContentBox = styled(Box)(({ theme }) => ({
  padding: 32,
  background: theme.palette.background.default,
}));

const ForgotPasswordRoot = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 800,
    margin: '1rem',
    borderRadius: 12,
  },
}));

const Activation = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await restablecer({ codigo: email });
      console.log(response);
      navigate('/'); 
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
    }
  };

  return (
    <ForgotPasswordRoot>
      <Card className="card">
        <Grid container>
          <Grid item xs={12}>
            <JustifyBox p={4}>
              <img width="300" src="/assets/images/illustrations/dreamer.svg" alt="" />
            </JustifyBox>

            <ContentBox>
              <form onSubmit={handleFormSubmit}>
                <TextField
                  type="string"
                  name="email"
                  size="small"
                  label="Ingresa el codigo que llego al correo sena"
                  variant="outlined"
                  sx={{ mb: 3, width: '100%' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Button fullWidth variant="contained" color="primary" type="submit">
                  Activar cuenta
                </Button>

                <Button
                  fullWidth
                  color="primary"
                  variant="outlined"
                  onClick={() => navigate("/session/signin")}
                  sx={{ mt: 2 }}
                >
                  Login
                </Button>
              </form>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </ForgotPasswordRoot>
  );
};

export default Activation;
