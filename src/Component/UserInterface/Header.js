import React,{ useState,useEffect } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import  {getData} from "../FetchNodeServices"
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


const useStyles = makeStyles((theme) => ({
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
    border:'solid 1px #dfe6e9'
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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
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
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
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
    </Menu>
  );

  /////////////////////////////////////My Work////////////////////////////////////////////
    const [listCategories,setListCategories] = useState([])
    const [myAnchorEl, setMyAnchorEl] = React.useState(null);
    const [menuName, setMenuName] = React.useState('')

  const handleMyMenuClick = (event) => {
    setMyAnchorEl(event.currentTarget);
    setMenuName(event.currentTarget.value);
  };

  const handleMyMenuClose = () => {
    setMyAnchorEl(null);
  };

  const subMenu = () => {
    if(menuName === "Eyeglasses"){
    return  <MenuItem disableGutters={true}>
            <div 
            style={{display: 'flex', flexDirection: 'row', width: '1200',background: "#F5F3F8",}}
            onMouseLeave={()=>setMyAnchorEl(null)}
            >
              <div onClick={()=>props.history.push({pathname: '/productlist'},{gender:'Men',categoryid:2})}>
              <img src='/Meneye.jpg' width='600' />
              </div>
          <div onClick={()=>props.history.push({pathname: '/productlist'},{gender:'Women',categoryid:2})}>
          <img src='/Womeneye.jpg' width='600' />
          </div>
            </div>
    </MenuItem>
    }
    else if(menuName === "Sunglasses"){
      return  <MenuItem disableGutters={true}>
            <div 
            style={{display: 'flex', flexDirection: 'row', width: '1200',background: "#F5F3F8",}}
            onMouseLeave={()=>setMyAnchorEl(null)}
            >
              <div onClick={()=>props.history.push({pathname: '/productlist'},{gender:'Men',categoryid:1})}>
              <img src='/Mensun.jpg' width='600' />
              </div>
          <div onClick={()=>props.history.push({pathname: '/productlist'},{gender:'Women',categoryid:1})}>
          <img src='/Womensun.jpg' width='600' />
          </div>
            </div>
    </MenuItem>
    }
  }

  const fetchAllCategories = async()=>{
    var list = await getData('product/fetchallcategories')
    setListCategories(list.data)
  }

  useEffect(function(){
      fetchAllCategories()
  },[])

  const mainMenu=()=>{
    return listCategories.map((item)=>{
      return(<Button 
              //onClick={(event)=>handleMyMenuClick(event)}
              onMouseEnter={(event) => handleMyMenuClick(event)}
              value={item.categoryname}
              style={{textTransform: "capitalize",fontSize: "1.2rem",height:100,padding:20}}
              endIcon={<ArrowDropDownIcon />}
              aria-controls="simple-menu" 
              aria-haspopup="true" 
              
              >
      
      {item.categoryname}

    </Button>)
    })
  }


  ///////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="transparent">
        <Toolbar>
         
        <div style={{ padding: 5 }} >
            <img src="/glasskart.png" width="150" />
          </div>

            {mainMenu()}

            <Menu
        id="simple-menu"
        anchorEl={myAnchorEl}
        open={Boolean(myAnchorEl)}
        onClose={handleMyMenuClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {myAnchorEl?subMenu():<></>}
      </Menu>

          
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
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
    </div>
  );
}
