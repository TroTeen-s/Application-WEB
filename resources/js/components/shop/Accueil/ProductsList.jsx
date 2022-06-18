import styled from "styled-components";
import ProductShopCard from "./ProductShopCard";
import { useEffect, useState } from "react";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const ProductsList = () => {

    const [products, setProducts] = useState([]);

    const retrieveProducts = async () => {
        let response = await axios.get(`/api/product-list/`);

        if (response.data.success) {
            setProducts(response.data.data);
        }
    };

    useEffect(() => {

        retrieveProducts();
    }, []);


    if (products) {
        return (
            <Container className="h-full bg-white-background">
                {products.map((item) => (
                    <ProductShopCard item={item} key={item.id} />
                ))}
            </Container>
        );

    } else {
        return (
            <Container className="h-full bg-white-background">
                <div>Aucun produit à afficher</div>
            </Container>
        );

    }
};

export default ProductsList;
