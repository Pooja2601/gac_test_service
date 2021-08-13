import React, { useState , useEffect } from 'react';
import { loadCSS } from 'fg-loadcss';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '../Input/index';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DropDownList  from '../Select/customized_select';
import SimpleDropDownList from '../Select/simple_select';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';
import './style.css';



const useStyles = makeStyles((theme) => ({
  root: {
    '& > .fa': {
      margin: theme.spacing(2),
    },
  },
  chip:{
    fontSize: 10,
    borderRadius: 0,
    height: 25,
    color: 'black',
  }
}))


function ChildComponent({el, childIndex, parentIndex}){
  return (
  <tr>
    <td>{parentIndex + 1}.{childIndex + 1}</td>
    <td><CloseRoundedIcon fontSize="small" style={{color:'gray', fontSize: 18}}/></td>
    <td></td>
    <td></td>
    <td>{el.Name}</td>
    <td></td>
    <td></td>
    <td></td>
    <td><TextField value={el.EstimatedQuantity}/></td>
    <td><SimpleDropDownList data={el.EstimatedUomCode}/></td>
    <td><TextField value={el.EstimatedUnitCost}/></td>
    <td>{el.CostCurrencyCode}</td>
    <td>{el.EstimatedTotalCost}</td>
    <td><SimpleDropDownList data={el.TaxTypeName}/></td>
    <td>{el.TaxRate}</td>
    <td>{el.TaxAmount}</td>
    <td>{el.EstimatedTotalCostIncTax}</td>
    <td><TextField value={el.ActualTotalCost}/></td>
  </tr>
  )
}
function TableDataRow({ row , key, srNumber}) { 
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);
  console.log(srNumber, 'key mila');
  React.useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);
  const showChildComponent = (arg) =>{
    setIsExpanded(!isExpanded);
   }
  const onCollapse = (arg) => {
    setIsExpanded(arg);
  }
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };
  return (
    <>
    <tr>
        <td>{srNumber + 1}</td>
        <td><CloseRoundedIcon fontSize="small" style={{color:'red', fontSize: 18}}/></td>
        <td>{isExpanded ? <KeyboardArrowUpIcon fontSize="small" onClick={()=>{onCollapse(false)}}/> : <KeyboardArrowDownIcon fontSize="small" onClick={() => { showChildComponent(row.charges)}}/>}</td>
         <td>{row.OperationalProcessName}</td>
         <td>{row.Name}</td>
         <td>
              <div className={classes.root}>
              <Icon className="fa fa-plus-circle" color="primary" style={{ fontSize: 13 }}/>
              </div>
         </td>
         <td>
             {row.RequestedBy.map((item, index) => <DropDownList data={item} key={index} />)}
         </td>
          <td>    
             <>  
              <Chip
                className={classes.chip}
                deleteIcon={<CloseRoundedIcon  style={{height: 15, color: '#1515c4', fontWeight: 400}}/>}
                label={row.SupplierName}
                onClick={handleClick}
                onDelete={handleDelete}
              />
              </>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td><SimpleDropDownList data={row.CostCurrencyCode}/></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        {isExpanded ? row.charges.map((el, index) => <ChildComponent el={el} key={index} childIndex={index} parentIndex={srNumber}/>) : null}
        </>
  )
}
function Table() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const headers = {
      'Appian-API-Key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjMmVmOTYwNi0xNGFlLTQ5NDMtOTQyNy0xMDVmN2RlZmZmYzAifQ.tV_aC4B-Nbkp_5Oquq3o9RAgri75ir5kW75nyl5bYNU'
    };
    // GET request using axios inside useEffect React hook
    axios.get('https://dev-pegasus.gac.com/suite/webapi/jobService-getAllJobServiceV3?jobId=5011', { headers })
        .then(response => 
           {
            console.log(response.data.Services);
            setData(response.data.Services);
           });
  
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
  return (
    <div>
    <table>
      <thead>
         <tr>
           <th>#</th>
           <th></th>
           <th></th>
           <th>Operation Process</th>
           <th>Service/Charge Name</th>
           <th></th>
           <th>Requested By</th>
           <th>Supplier</th>
           <th>Quantity</th>
           <th>UOM</th>
           <th>Unit Cost</th>
           <th>Cost Currency</th>
           <th>Est. Total Cost</th>
           <th>Tax Type</th>
           <th>Tax Rate %</th>
           <th>Tax Amount</th>
           <th>Est. Total Cost (incl. Tax)</th>
           <th>Actual Cost</th>
         </tr>
      </thead>
      <tbody>
      {data.map((row, index) => <TableDataRow row={row} key={index} srNumber={index}/>)}
      </tbody>
    </table>
    </div>
  )
}
export default Table;