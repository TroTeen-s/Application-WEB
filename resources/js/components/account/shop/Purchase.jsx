import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { DateTime } from "luxon";
import styled from "styled-components";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Checkbox,
    Dialog,
    Paper,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

import './style.css'

const Image = styled.img`
    width: 150px;
    object-fit: cover;
    padding-left: 50px;
    padding-top: 10px;
`;

const Purchase = () => {


    const { purchaseID } = useParams();

    let [purchaseInfo, setPurchaseInfos] = useState();

    const [open, setOpen] = React.useState(false);
    const [toReturn, setToReturn] = React.useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        let response = await axios.post(`/api/refund/`, { item_ids: toReturn, cart_id: purchaseID });

        if (response.data.success) {
            console.log(response.data.data);
            setPurchaseInfos(response.data.data);
        }
    };

    const handleChecbox = (event) => {
        console.log(event.target);
        if (!toReturn.includes(event.target.name)) {
            console.log("ninclue pas");
            setToReturn([...toReturn, event.target.name]);
        } else {
            console.log("does pas");
            const index = toReturn.indexOf(event.target.name);
            if (index > -1) {
                setToReturn(toReturn.splice(index, 1));
            }

        }
        console.log(toReturn);
    };


    const retrieveData = async () => {
        let response = await axios.get(`/api/cart/${purchaseID}`);

        if (response.data.success) {
            console.log(response.data.data);
            setPurchaseInfos(response.data.data);
        }
    };

    useEffect(() => {
        retrieveData();

    }, []);


    return (
        <Container>
            <div>
                <Grid>
                    <Grid item alignItems={"center"} sx={{ mb: 4 }}>
                        <Typography variant="h4"
                                    component={"span"} className="text-black-trot" >{"Les informations de votre achat n°" + purchaseID}</Typography>
                    </Grid>

                    <Grid container item xs={12} rowSpacing={1}>
                        <Grid item xs={12} md={12}>
                            <div>Nombre d'articles achetés: {purchaseInfo?.itemNumber}</div>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <div>Montant payé : {purchaseInfo?.payment[0].amount.toFixed(2)}€</div>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <div>
                                Date de paiment
                                : {DateTime.fromSQL(purchaseInfo?.payment[0].payment_date).setLocale("fr-FR").toLocaleString({
                                weekday: "short",
                                month: "short",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                            </div>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <div>Points cumulés sur l'abonnement : 674</div>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <div className="bg-white-background pt-2">
                                <Button variant="outlined" onClick={handleClickOpen}>
                                    Retourner des articles
                                </Button>
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle className="bg-white-background text-black-trot">Selectionnez les articles à retourner</DialogTitle>
                                    <DialogContent className="bg-white-background">
                                    {purchaseInfo?.items ? purchaseInfo.items.map((item) => (
                                                 <div className="bg-white-background mt-2 flex" container spacing={0}>
                                                     <Checkbox
                                                        style ={{
                                                            color: "#FF9900",
                                                        }}
                                                        name={item.id.toString()}
                                                        onChange={handleChecbox}
                                                    />
                                                    <Typography className="pt-1"
                                                        variant="h6">{item["product"].name + ", " + item.pivot.item_price + "€"}</Typography>
 
                                                </div>
                                            )) : null}
                                    </DialogContent>
                                    <DialogActions className="bg-white-background">
                                        <Button onClick={handleClose}>Annuler</Button>
                                        <Button onClick={handleSubmit}>Retournez les articles</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </Grid>
                    </Grid>


                    <h1 className="text-black-trot mt-5">Liste des produits achetés : </h1>

                    <Grid className="bg-white-background mt-2" container spacing={3}>

                            {purchaseInfo?.items ? purchaseInfo.items.map((item) => (
                                    <Grid  className="bg-white-background" item xl={4} lg={4} sm={4} xs={4}><ProductCard  className="bg-white-background" infos={item} /></Grid>
                                )  )
                                : null}

                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Purchase;

const ProductCard = (props) => {
    const navigate = useNavigate();
    const { infos } = props;
    const { product, pivot } = infos;

    return (
        <Paper elevation={3} sx={{ maxWidth: 250, backgroundColor:"white"}} className="bg-white-background">
            <Image
                src={"/" + product?.image_path}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" className="text-black-trot" component="div">
                    {product?.name}
                </Typography>
                <Typography variant="body2" className="black-trot">
                    Prix acheté : {pivot?.item_price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => navigate(`/products/${product.id}`)}>Racheter</Button>
                <Button size="small">Retourner</Button>
            </CardActions>
        </Paper>
    );
};
