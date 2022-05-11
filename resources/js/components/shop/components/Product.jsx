import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { NavLink } from 'react-router-dom'

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`

  flex: 1;
  margin: 5px;
  border-radius:10px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F9F9F9;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }

`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {

  console.warn(item)

  return (
    <div className="h-full bg-white-background mb-4">
      <Container className="pb-12" key={item.id}>
        <Circle />
          <Image src={item.img} />
            <Info>
                <Icon>
                  <ShoppingCartOutlined />
                </Icon>
              <NavLink to={`/products/${item.id}`}>
                <Icon>
                  <SearchOutlined />
                </Icon>
              </NavLink>
            </Info>
      </Container>

      <h2 className="font-bold uppercase text-base pl-2 pt-2"> Data product </h2>
      <p className="pl-2"> 50.00 € </p>
    </div>

  );
};

export default Product;
