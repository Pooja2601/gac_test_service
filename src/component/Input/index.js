import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    textroot: {
      '& > *': {
        margin: theme.spacing(1),
        height: 24,
        width: 45,
        '& .MuiOutlinedInput-root': {
         height: 24,
         fontSize: 10,
        }
      },
    }
  }))
  
function Input({value}){
 const classes = useStyles();
  return (
    <form className={classes.textroot} noValidate autoComplete="off">
        <TextField id="outlined-basic" variant="outlined" value={value}/>
    </form>
 )
}
export default Input;
