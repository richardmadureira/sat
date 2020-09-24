import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './styles';

export default function Login() {
    const classes = useStyles();

    const handleSubmit = e => {
        e.preventDefault();
        console.log(e.target);
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar>
                <Typography component="h1" variant="h5" color="secondary">Entrada no Sistema</Typography>
                <form id="form-login" className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email" name="email" autoComplete="email" autoFocus />
                    <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Senha" type="password" id="password" autoComplete="current-password" />
                    <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Lembrar me" />
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Entrar</Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2" color="secondary">Esqueceu a senha?</Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2" color="secondary">Não possui uma conta? Crie uma aqui</Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}