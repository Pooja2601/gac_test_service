import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';



const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      '& .MuiOutlinedInput-root' : {
        height: 24,
        fontSize: 10,
        width: 195,
      },
    },
    list :{
      fontSize: 10,
      padding: 1,
      width: '15%',
      marginTop: -12,
    }
  }))
function DropDownList({data}){
  const classes = useStyles();
  const newIcon = (props) => {
  return (
       <>
       <CancelIcon style={{fontSize: 15}} color="primary"/>
       <ArrowDropDownIcon style={{fontSize: 15}}/>
       </>
      )
  };
  return (
    <FormControl variant="outlined" className={classes.formControl}>
    <Select
      IconComponent={newIcon}
      value={data.name}
      defaultValue={data.name}
      inputProps={{
        id: 'outlined-age-native-simple',
      }}
      MenuProps={{
        classes:{paper: classes.list},
        getContentAnchorEl: null,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "left"
        },
      }}
    >
      <option value={data.name}>{data.name}</option>
    </Select>
    </FormControl>
    )}
    
export default DropDownList;
    
