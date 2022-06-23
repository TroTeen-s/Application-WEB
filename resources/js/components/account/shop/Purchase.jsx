import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { DateTime } from "luxon";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

import './style.css'


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
                <Grid container spacing={2}>
                    <Grid item alignItems={"center"} sx={{ m: 2 }}>
                        <Typography variant="h3"
                                    component={"span"}>{"Les informations de votre achat n°" + purchaseID}</Typography>
                    </Grid>

                    <Grid container item xs={12} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12} md={3}>
                            <div>Nombre d'articles achetés: {purchaseInfo?.itemNumber}</div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div>Montant payé : {purchaseInfo?.payment[0].amount.toFixed(2)}€</div>
                        </Grid>
                        <Grid item xs={12} md={3}>
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
                        <Grid item xs={12} md={3}>
                            <div>Points cumulés sur l'abonnement : 674</div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div>
                                <Button variant="outlined" onClick={handleClickOpen}>
                                    Retourner des articles
                                </Button>
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>Subscribe</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>Sélectionnez les articels que vous voulez
                                            renvoyer</DialogContentText>
                                        {purchaseInfo?.items ? <Container className="h-full bg-white-background">
                                            {purchaseInfo.items.map((item) => (
                                                <Container style={{ color: "black" }}>
                                                    <Typography
                                                        variant="h5">{item["product"].name + ", " + item.pivot.item_price + "€"}</Typography>
                                                    <Checkbox
                                                        color="primary"
                                                        name={item.id.toString()}
                                                        onChange={handleChecbox}
                                                    />
                                                </Container>
                                            ))}
                                        </Container> : null}
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Annuler</Button>
                                        <Button onClick={handleSubmit}>Retournez les articles</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container item xs={12}>
                        <h1>Liste des produits achetés : </h1>
                        <Grid container direction="row">
                            {purchaseInfo?.items ? <Container className="h-full bg-white-background">
                                {purchaseInfo.items.map((item) => (
                                    <Grid item><ProductCard infos={item} /></Grid>
                                ))}
                            </Container> : null}

                        </Grid>
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
        <Card sx={{ maxWidth: 200 }}>
            <CardMedia
                component="img"
                height="50"
                image={"/" + product?.image_path}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Prix acheté : {pivot?.item_price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => navigate(`/products/${product.id}`)}>Racheter</Button>
                <Button size="small">Retourner</Button>
            </CardActions>
        </Card>
    );
};
