import React, { useState, useEffect } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShopCart from '@material-ui/icons/ShoppingCart';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import MoreIcon from '@material-ui/icons/MoreVert';
import { getData } from "../FetchNodeServices"
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Popper, Avatar } from '@material-ui/core';
import clsx from 'clsx';
import { ServerURL } from '../FetchNodeServices';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
  list: {
    width: 350,
  },
  fullList: {
    width: 'auto',
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    border: 'solid 1px #dfe6e9'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  /////////////////////////////////////////////////CART///////////////////////////////////////////////////
  var cart = useSelector(state => state.cart)
  var user = useSelector(state => state.user)
  var dispatch = useDispatch()
  var key = Object.keys(cart)
  var ukey = Object.keys(user)
  var products = Object.values(cart)
  const [refresh, setRefresh] = useState(false)

  var totalAmt = products.reduce(calculateAmount, 0)
  var actualAmt = products.reduce(calculateActualAmount, 0)
  var savingAmt = products.reduce(calculateSavingAmount, 0)

  function calculateAmount(a, b) {
    var actualPrice = b.offerprice > 0 ? b.offerprice * b.qty : b.price * b.qty
    return (a + actualPrice)
  }
  function calculateActualAmount(a, b) {
    return (a + (b.price * b.qty))
  }
  function calculateSavingAmount(a, b) {
    var savingPrice = b.offerprice > 0 ? (b.price - b.offerprice) * b.qty : 0
    return (a + savingPrice)
  }

  const displayCartItems = () => {
    return products.map((item) => {
      return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }} >
          <div style={{ padding: 10, margin: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {/* <Avatar variant='square' src={`${ServerURL}/images/${item.productpicture}`} className={classes.large} /> */}
            <img alt={item.productname} src={`${ServerURL}/images/${item.productpicture}`} width='100px' />
            <div style={{ width: 20, height: 20, display: 'flex', justifyContent: 'center', marginTop: 10, }}>
              <IconButton
                aria-label="reduce"
                onClick={() => {
                  item.qty--
                  setRefresh(!refresh)
                  props.setRefresh(!refresh)
                  if (item.qty == 0) {
                    dispatch({ type: "REMOVE_CART", payload: [item.finalproductid] })
                  }
                }}
                size="small"
                //disabled={item.qty==1?true:false}
                disableTouchRipple
              >
                <RemoveIcon style={{ width: 15, }} fontSize="small" />
              </IconButton>
              <label style={{ paddingInline: 10 }}>{item.qty}</label>
              <IconButton
                aria-label="increase"
                onClick={() => {
                  item.qty++
                  setRefresh(!refresh)
                  props.setRefresh(!refresh)
                }}
                size="small"
                disableTouchRipple
              >
                <AddIcon style={{ width: 15 }} fontSize="small" />
              </IconButton>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', padding: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, margin: 2, letterSpacing: 1 }}>
              {item.productname}
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, margin: 2 }}>
              <span> {item.colorname}</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>{item.offerprice > 0 ? <span>&#8377; {item.offerprice} × {item.qty}</span> : <span>&#8377; {item.price} × {item.qty}</span>}</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, margin: 2 }}>
              {item.offerprice > 0 ? <span><s>&#8377; {item.price}</s></span> : <></>}
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, margin: 2 }}>
              {item.offerprice > 0 ? <span style={{ color: 'green' }}>You save &#8377; {(item.price - item.offerprice) * item.qty}</span> : <span>No offer</span>}
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 10, fontSize: 13, fontWeight: 500, margin: 2 }} >
            {item.offerprice > 0 ? <span>&#8377; {item.offerprice * item.qty}
            </span> : <span>&#8377; {item.price * item.qty}</span>}



          </div>



        </div>


      )



    })


  }


  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (

    <div
      className={classes.list}
      onKeyDown={() => toggleDrawer(anchor, false)}

    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
        <img src="/glasskart.png" width="40%" />
      </div>
      {key.length == 0 ? <div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
          <img src="/emptycart.png" width="90%" />
        </div>
      </div> :
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 15 }}>
            <span style={{ fontWeight: 600, padding: 10 }}><Badge color="secondary" overlap="circular" badgeContent={key.length}><img width="35px" src="/cart.png" /></Badge></span>
            <span style={{ fontWeight: 600, float: 'right', padding: 10 }}>&#8377; {totalAmt}</span>

          </div>
          {displayCartItems()}
          <Divider />
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 15 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
              <span style={{ fontWeight: 600, padding: 10 }}>Payable:</span>
              <span style={{ fontWeight: 600, float: 'right', padding: 10 }}>&#8377; {actualAmt}</span>

            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
              <span style={{ fontWeight: 600, padding: 10 }}>Savings:</span>
              <span style={{ fontWeight: 600, float: 'right', padding: 10, color: 'green' }}>&#8377; -{savingAmt}</span>

            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
              <span style={{ fontWeight: 600, padding: 10 }}>Delivery Charges:</span>
              <span style={{ fontWeight: 600, float: 'right', padding: 10 }}>&#8377; {0}</span>

            </div>

            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
              <span style={{ fontWeight: 600, padding: 10 }}>Net Amount:</span>
              <span style={{ fontWeight: 600, float: 'right', padding: 10 }}>&#8377; {totalAmt}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
              {ukey.length > 0 ? <li
                onClick={() => props.history.push({ pathname: '/maincart' })}
                style={{ listStyle: 'none', display: 'block', background: '#50526e', color: '#fff', padding: 20, textAlign: 'center', marginTop: 15, fontSize: 16, letterSpacing: 0.5, cursor: 'pointer', width: 280, fontWeight: 700 }}>
                Make Payment
              </li> : <li
                onClick={() => props.history.push({ pathname: '/login' })}
                style={{ listStyle: 'none', display: 'block', background: '#50526e', color: '#fff', padding: 20, textAlign: 'center', marginTop: 15, fontSize: 16, letterSpacing: 0.5, cursor: 'pointer', width: 280, fontWeight: 700 }}>
                Proceed To Payment
              </li>}
            </div>
          </div>
        </>}

    </div>
  );

  const showCart = () => {
    return (
      <div>
        <React.Fragment key={'right'}>
          <Drawer anchor={'right'} open={state['right']} onClose={() => toggleDrawer('right', false)}>
            {list('right')}
          </Drawer>
        </React.Fragment>
      </div>
    )
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {ukey.length == 0 ? <MenuItem onClick={()=>props.history.push({ pathname: '/login' })}>Sign In</MenuItem> :
        <><MenuItem onClick={handleMenuClose}>My account</MenuItem>
          <MenuItem onClick={handleMenuClose}>Log out</MenuItem></>}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >


      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={()=>props.history.push({pathname:'/maincart'})}
        >
          <AccountCircle />
        </IconButton>
        <p>Cart</p>
      </MenuItem>
    </Menu>
  );

  /////////////////////////////////////My Work////////////////////////////////////////////
  const [listCategories, setListCategories] = useState([])
  const [myAnchorEl, setMyAnchorEl] = React.useState(null);
  const [menuName, setMenuName] = React.useState('')


  const handleMyMenuClick = (event) => {
    setMyAnchorEl(event.currentTarget);
    setMenuName(event.currentTarget.value);
  };

  const handleMyMenuClose = () => {
    setMyAnchorEl(null);
  };

  const open = Boolean(myAnchorEl);

  const subMenu = () => {
    if (menuName === "Eyeglasses") {
      return <Popper open={open} anchorEl={myAnchorEl} placement="bottom">
        <div
          style={{ display: 'flex', flexDirection: 'row', width: '100%', background: "#F5F3F8", }}
          onMouseLeave={() => setMyAnchorEl(null)}
        >
          <div onClick={() => props.history.push({ pathname: '/productlist' }, { gender: 'Men', categoryid: 2 })}>
            <img src='/Meneye.jpg' width='100%' />
          </div>
          <div onClick={() => props.history.push({ pathname: '/productlist' }, { gender: 'Women', categoryid: 2 })}>
            <img src='/Womeneye.jpg' width='100%' />
          </div>
        </div>
      </Popper>
    }
    else if (menuName === "Sunglasses") {
      return <Popper open={open} anchorEl={myAnchorEl} placement="bottom">
        <div
          style={{ display: 'flex', flexDirection: 'row', width: '100%', background: "#F5F3F8", }}
          onMouseLeave={() => setMyAnchorEl(null)}
        >
          <div onClick={() => props.history.push({ pathname: '/productlist' }, { gender: 'Men', categoryid: 1 })}>
            <img src='/Mensun.jpg' width='100%' />
          </div>
          <div onClick={() => props.history.push({ pathname: '/productlist' }, { gender: 'Women', categoryid: 1 })}>
            <img src='/Womensun.jpg' width='100%' />
          </div>
        </div>
      </Popper>
    }
  }

  const fetchAllCategories = async () => {
    var list = await getData('product/fetchallcategories')
    setListCategories(list.data)
  }

  useEffect(function () {
    fetchAllCategories()
  }, [])

  const mainMenu = () => {
    return listCategories.map((item) => {
      return (<Button
        //onClick={(event)=>handleMyMenuClick(event)}
        onMouseEnter={(event) => handleMyMenuClick(event)}
        value={item.categoryname}
        style={{ background: 'none', textTransform: "capitalize", fontSize: "1.2rem", marginTop: 40, marginBottom: 40, paddingInline: 20 }}
        endIcon={<ArrowDropDownIcon />}

      >

        {item.categoryname}

      </Button>)
    })
  }


  ///////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="transparent" elevation='0'>
        <Toolbar>

          <div style={{ padding: 5 }} >
            <img src="/glasskart.png" width="150" />
          </div>

          {mainMenu()}


          {myAnchorEl ? subMenu() : <></>}



          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton onClick={() => toggleDrawer('right', true)}
              color="inherit">
              <Badge badgeContent={key.length} color="secondary">
                <ShopCart />
              </Badge>
            </IconButton>

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >

              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {showCart()}
    </div>
  );
}
