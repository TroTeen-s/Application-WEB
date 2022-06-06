import "../../../css/app.css";
import React, { useContext, useEffect, useState } from "react";
import "./style.css";


import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { ACTIONS, CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";


function Header() {

    let [total, setTotal] = useState(0);

    let { cart, dispatch } = useContext(CartContext);

    const [products, setProducts] = useState([]);

    const retrieveProducts = async (productIDs) => {
        let response = await axios.get(`/api/products`, { params: { productIDs } });

        if (response.data.success) {
            let productsReceived = response.data.data;
            let totalCalculus = 0;
            productsReceived.forEach(product => totalCalculus = totalCalculus + product.price);
            if (total !== totalCalculus) {
                setTotal(totalCalculus);
            }
            let cartFiltered = cart.map((productInCart) => {
                let result = productsReceived.filter(product => product.id === productInCart.id);
                console.log(result);
                if (result.length > 0) {
                    return productInCart;
                }
            });
            cartFiltered = cartFiltered.filter((element) => {
                return element !== undefined;
            });

            if (cartFiltered.length !== cart.length) {
                dispatch({ type: ACTIONS.CART_INIT, payload: { intialCart: cartFiltered } });
            }
            setProducts(response.data.data);
        }
    };

    useEffect(() => {
        if (cart) {
            if (cart.length <= 0) {
                setProducts([]);
                return;
            }
            let productIDs = cart.map((carProduct) => {
                return carProduct.id;
            });
            retrieveProducts(productIDs);
        }
    }, [cart]);


    const readCart = () => {
        console.log(cart);
        console.log(products);
        console.log("Le total est " + total);

        let response = axios.get("/api/shop/buy-cart", { params: { products: cart } });
    };

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [state, setState] = React.useState({
        right: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (


        <Box sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 500 }}
             role="presentation"
             className="fixed inset-0 bg-opacity-10 transition-opacity">

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">

                        <div className=" w-screen max-w-md">
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping
                                            cart</h2>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button type="button"
                                                    className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                                                <span className="sr-only">Close panel</span>

                                                <svg onClick={toggleDrawer(anchor, false)} className="h-6 w-6"
                                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth="2" stroke="currentColor" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                <List>
                                                    {products.map((product) => (
                                                        <ListItem key={product.id}>

                                                            <li className="flex py-6">
                                                                <div
                                                                    className="h-36 w-36 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                    <img
                                                                        src={"/" + product.image_path}
                                                                        alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                                                        className="h-full w-full object-cover object-center" />
                                                                </div>

                                                                <div className="ml-4 flex flex-col">
                                                                    <div>
                                                                        <div
                                                                            className="flex justify-between text-base font-medium text-gray-900">
                                                                            <h3>
                                                                                <ListItemText primary={product.name} />
                                                                            </h3>
                                                                        </div>
                                                                        <p className="text-gray-900">{product.price}€</p>
                                                                        <a type="button"
                                                                           onClick={() => dispatch({
                                                                               type: ACTIONS.CART_REMOVE_UNIQUE,
                                                                               payload: { id: product.id }
                                                                           })}
                                                                           className="text-orange-300 no-underline">Remove</a>
                                                                    </div>

                                                                </div>
                                                            </li>


                                                        </ListItem>
                                                    ))}
                                                </List>

                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Prix Total</p>
                                        <p>{total}€</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">TVA et taxes comprises</p>
                                    <div className="mt-6">
                                        <Button
                                            onClick={readCart}
                                            className="flex items-center justify-center rounded-md border border-transparent bg-orange-300 px-6 py-3 text-base font-medium shadow-sm hover:bg-orange-400">Acheter
                                        </Button>
                                    </div>
                                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                        <p>
                                            or <button onClick={toggleDrawer(anchor, false)} type="button"
                                                       className="no-underline font-medium text-orange-300 hover:text-orange-400">Continue
                                            Shopping<span aria-hidden="true"> &rarr;</span></button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* <List>
             {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
             <ListItem key={text} disablePadding>

             <ListItemText primary={text} />

             </ListItem>
             ))}
             </List>
             <Divider />
             <List>
             {['All mail', 'Trash', 'Spam'].map((text, index) => (
             <ListItem key={text} disablePadding>
             <ListItemButton>
             <ListItemIcon>
             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
             </ListItemIcon>
             <ListItemText primary={text} />
             </ListItemButton>
             </ListItem>
             ))}
             </List> */}
        </Box>
    );


    let { auth, setAuth } = useContext(AuthContext);

    let doLogout = async () => {
        try {
            let response = await axios.post("/api/auth/logout");
            if (response.status === 204) {
                setAuth(false);
            }
        } catch (e) {
            console.log("logout error");
        }
    };

    let loggedOut = <>

        <NavLink
            className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white"
            to="/auth/login">
            <MenuItem className="mr-5">
                <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                <Typography className="ml-2">Connexion</Typography>
            </MenuItem>
        </NavLink>


        <NavLink
            className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white"
            to="/auth/register">
            <MenuItem>
                <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                <Typography className="ml-2">Inscription</Typography>
            </MenuItem>
        </NavLink>

    </>;

    let loggedIn = <>
        <NavLink
            className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white"
            to="/Dashboard">
            <MenuItem>
                <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                <Typography
                    className="ml-2">
                    Dashboard
                </Typography>
            </MenuItem>
        </NavLink>

        <NavLink
            className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white"
            to="/account">
            <MenuItem>
                <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                <Typography
                    className="ml-2">
                    Mon Compte
                </Typography>
            </MenuItem>
        </NavLink>

        <NavLink
            className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white"
            to="#">
            <MenuItem>
                <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                <Typography
                    className="ml-2"
                    onClick={doLogout}>
                    Déconnexion
                </Typography>
            </MenuItem>
        </NavLink>

    </>;

    return (
        <>
            <header className="bg-black-trot">

                <nav id="header" className="w-full top-0">

                    <div className="w-full flex pl-10 pr-10 flex-wrap items-center justify-between mt-0 py-3">

                        <label htmlFor="menu-toggle" className="cursor-pointer md:hidden block">
                            <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="20"
                                 height="20" viewBox="0 0 20 20">
                                <title>menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                            </svg>
                        </label>


                        <input className="hidden" type="checkbox" id="menu-toggle" />

                        <div className="hidden md:flex md:items-center md:w-auto w-full order-2 md:order-1" id="menu">
                            <nav>
                                <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
                                    <NavLink
                                        className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white"
                                        to="/shop">
                                        <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                                        <span className="ml-2">Notre Boutique</span>
                                    </NavLink>

                                    <NavLink
                                        className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white"
                                        to="/store">
                                        <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                                        <span className="ml-2">Nos abonnements</span>
                                    </NavLink>

                                    <NavLink
                                        className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white"
                                        to="/sponsors">
                                        <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                                        <span className="ml-2">Nos partenaires</span>
                                    </NavLink>


                                </ul>
                            </nav>
                        </div>

                        <div className="order-1 md:order-2">
                            <div className="uppercase font-black no-underline pt-2 pl-5">

                                <NavLink
                                    className="uppercase text-white font-black text-3xl no-underline"
                                    to="/Main">
                                    Easy
                                </NavLink>

                                <NavLink
                                    className="uppercase text-orange-300 hover:text-white text-3xl no-underline"
                                    to="/Main">
                                    Scooter
                                </NavLink>

                            </div>
                        </div>

                        <div className="order-3 md:order-3 flex items-center pt-2" id="nav-content">
                            <a className="uppercase text-white font-black text-3xl no-underline pr-3">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <svg className="fill-current hover:text-orange-300"
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <circle fill="none" cx="12" cy="7" r="3" />
                                        <path
                                            d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" />
                                    </svg>
                                </IconButton>
                            </a>
                            <Menu
                                sx={{ ml: "50px", mt: "60px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <div onClick={handleCloseUserMenu}>
                                    {auth ? loggedIn : loggedOut}
                                </div>

                            </Menu>

                            {["right"].map((anchor) => (

                                <React.Fragment key={anchor}>

                                    <Drawer
                                        anchor={anchor}
                                        open={state[anchor]}
                                        onClose={toggleDrawer(anchor, false)}
                                    >
                                        {list(anchor)}
                                    </Drawer>


                                    <a className="cart-icon uppercase text-white font-black no-underline flex"
                                       onClick={toggleDrawer(anchor, true)}>
                                        <span> 0 </span>
                                        <svg className="fill-current hover:text-orange-300"
                                             xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                             viewBox="0 0 24 24">
                                            <path
                                                d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z" />
                                            <circle cx="10.5" cy="18.5" r="1.5" />
                                            <circle cx="17.5" cy="18.5" r="1.5" />
                                        </svg>
                                    </a>
                                </React.Fragment>
                            ))}
                        </div>

                        <div>
                        </div>


                    </div>
                </nav>
            </header>


        </>

    );
}


export default Header;
