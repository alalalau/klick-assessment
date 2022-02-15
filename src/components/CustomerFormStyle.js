import * as Constants from '../constants';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const styles = {
    formContainer: {
        backgroundColor: Constants.LITEPURPLE,
        display: 'flex',
        width: '40%',
        height: '100%',
        position: 'absolute',
        left: 0,
    },
    box: {
        backgroundColor: 'white',
        padding: '100px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        position: 'absolute',
        justifyContent: 'center',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '250px',
        height: '300px',
        borderRadius: 5
    },
    textField: {
        marginBottom: '20px'

    },
}

export const useStyles = makeStyles({
    root: {
        '& label.Mui-focused': {
            color: Constants.PURPLE,
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: Constants.PURPLE,
            },
        }
    }
});

export const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(Constants.PURPLE),
    backgroundColor: Constants.PURPLE,
    '&:hover': {
        backgroundColor: Constants.PURPLE,
    },
}));