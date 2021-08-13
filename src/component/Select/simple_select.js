import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



const useStyles = makeStyles((theme) => ({
    simpleFormControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        '& .MuiOutlinedInput-root' : {
          height: 24,
          fontSize: 10,
        },
        '& .MuiMenu-paper' : {
          top:0,
        }
      },
      list :{
        fontSize: 10,
        padding:1,
        marginTop:-12,
      }
  }))

function SimpleDropDownList({data}){
const classes = useStyles();
    return (
     <FormControl variant="outlined" className={classes.simpleFormControl}>
     <Select
       value={data}
       defaultValue={data}
       inputProps={{
         id: 'outlined-age-native-simple',
       }}
       MenuProps={{
         classes:{paper: classes.list},
         getContentAnchorEl: null,
         anchorOrigin: {
           vertical: "bottom",
           horizontal: "left"
         }
       }}
     >
       <option value={data}>{data}</option>
     </Select>
     </FormControl>
     )}
export default SimpleDropDownList;