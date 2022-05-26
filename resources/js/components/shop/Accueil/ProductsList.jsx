import styled from "styled-components";
import { popularProducts } from "../data";
import ProductShopCard from "./ProductShopCard";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const ProductsList = () => {
    return (
        <Container className="h-full bg-white-background">
            {popularProducts.map((item) => (
                <ProductShopCard item={item} key={item.id} />
            ))}
        </Container>
    );
};

export default ProductsList;
