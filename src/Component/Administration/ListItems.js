import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DisplayAllStores from './DisplayAllStores';
import DisplayAllCategories from './DisplayAllCategories';
import DisplayAllFrames from './DisplayAllFrames';
import DisplayAllShapes from './DisplayAllShapes';
import DisplayAllColors from './DisplayAllColors';
import DisplayAllMaterials from './DisplayAllMaterials';
import DisplayAllPrice from './DisplayAllPrice';
import DisplayAllProducts from './DisplayAllProducts';
import DisplayAllFinalProducts from './DisplayAllFinalProducts';
import ProductPictures from './ProductPictures';
import EditProductPictures from './EditProductPictures';
import DisplayMainPage from './DisplayMainPage';
import OrderDetail from './orderdetail';
import DisplayInvoice from './DisplayInvoice';

const useStyles = makeStyles((theme) => ({
  root: {
    display:"flex",
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function ListItems(props) {

const classes = useStyles();

const handleClick=(v)=>{
  props.setComponent(v)
}
    return(
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

    <ListItem button onClick={()=>handleClick(<OrderDetail  setComponent={props.setComponent}/>)}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>

    <ListItem button onClick={()=>handleClick(<DisplayInvoice  setComponent={props.setComponent}/>)}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Invoices" />
    </ListItem>


    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        ><ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
          <Typography className={classes.heading}>Stores</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>

    <ListItem button onClick={()=>handleClick(<DisplayAllStores  setComponent={props.setComponent}/>)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Stores" />
    </ListItem>

    </Typography>
        </AccordionDetails>
      </Accordion>


      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        ><ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
          <Typography className={classes.heading}>Specifications</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>


    <ListItem button onClick={()=>handleClick(<DisplayAllCategories setComponent={props.setComponent}/>)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Category" />
    </ListItem>

    <ListItem button onClick={()=>handleClick(<DisplayAllFrames setComponent={props.setComponent}/>)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Frame Type" />
    </ListItem>

    <ListItem button onClick={()=>handleClick(<DisplayAllShapes setComponent={props.setComponent}/>)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Shape" />
    </ListItem>

    <ListItem button onClick={()=>handleClick(<DisplayAllColors setComponent={props.setComponent}/>)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Color" />
    </ListItem>

    <ListItem button onClick={()=>handleClick(<DisplayAllMaterials setComponent={props.setComponent}/>)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Material" />
    </ListItem>

    <ListItem button onClick={()=>handleClick(<DisplayAllPrice setComponent={props.setComponent}/>)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Price" />
    </ListItem>

    </Typography>
        </AccordionDetails>
      </Accordion>


      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        ><ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
          <Typography className={classes.heading}>Products</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>

    <ListItem button onClick={()=>handleClick(<DisplayAllProducts setComponent={props.setComponent}/>)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Products" />
    </ListItem>

    <ListItem button onClick={()=>handleClick(<DisplayAllFinalProducts setComponent={props.setComponent}/>)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Final Products" />
    </ListItem>

    <ListItem button onClick={()=>handleClick(<ProductPictures setComponent={props.setComponent}/>)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Add Product Pictures" />
    </ListItem>

    <ListItem button onClick={()=>handleClick(<EditProductPictures setComponent={props.setComponent}/>)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Edit Product Pictures" />
    </ListItem>

    <ListItem button onClick={()=>handleClick(<DisplayMainPage setComponent={props.setComponent}/>)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Main Page" />
    </ListItem>

    </Typography>
        </AccordionDetails>
      </Accordion>


</div>
)
}