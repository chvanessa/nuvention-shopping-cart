import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import styled from 'styled-components'
import { Image, Column, Button } from 'rbx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import './App.css';

import Sidebar from "react-sidebar";

const ProductInfo = styled.div
`
  text-align: center;
  font-size: 15px;
  padding: 10px;
`

const PageTitle = styled.div
`
  text-align: center;
  font-size: 20px;
  padding: 20px;
`

const CartContainer = styled.div
`
  float: right;
  height: 100%;
`

const handlePrices = (price) => {
  return price.toFixed(2);
}

const incrementCount = (p, cart) => {
  console.log("increment count called")
  cart.filter(y => y !== p);
  for (var i in cart) {
    if (cart[i].sku == p.sku) {
       cart[i].ct += 1;
       break; //Stop this loop, we found it!
    }
  }
}

const ProductList = ({products, inCart, addToCart, onSetSidebarOpen}) => {
  const sizes = ['S', 'M', 'L','XL']
  return (
    <Column.Group multiline>
    {products.map(product => <Column size="one-quarter" key={"display" + product.sku}>
        <Card>
          <CardContent>
          <img src={'./static/products/'+ product.sku + '_1.jpg'}/>
          <ProductInfo>
            {product.title}
            <br/>
            <h6>${handlePrices(product.price)}</h6>
            <br/>
            {sizes.map(size => <Button>{size}</Button>)}
            <Button onClick={() => {
              addToCart(
                // fix this part so that it updates count if product is already in the count, adds new item if it isn't
                inCart.includes(product.sku) ?  incrementCount(product, inCart):
                inCart.concat({sku:product.sku, ct:0, price:product.price, title:product.title})); onSetSidebarOpen(true)}}>Add to Cart</Button>
            </ProductInfo>
          </CardContent>
        </Card>
      </Column>)}
  </Column.Group>
  )
}

const App = () => {
  const [data, setData] = useState({});
  const [sidebarOpen, onSetSidebarOpen] = useState(false);
  const products = Object.values(data);
  const [inCart, addToCart] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <Container>
      <PageTitle>my jank shopping cart</PageTitle>
      <Sidebar
        sidebar={<PageTitle>Shopping Cart
          <br/>
          {Object.values(inCart).map(item => <Column key={item.sku}>
        <Card>
          <CardContent>
          <img src={'./static/products/'+ item.sku + '_1.jpg'}/>
          <ProductInfo>
            {item.title}
            <br/>
            <h6>${handlePrices(item.price)}</h6>
            <br/>
            count:{item.ct}
            </ProductInfo>
          </CardContent>
        </Card>
      </Column>)}
        </PageTitle>}
        open={sidebarOpen}
        sidebarClassName={"sidebarStyle"}
        onSetOpen={onSetSidebarOpen}
        pullRight={true}
        touchHandleWidth={50}
        styles={{ sidebar: { background: "white" } }}
      >
        <CartContainer>
        <Button onClick={() => onSetSidebarOpen(true)}>
          Open sidebar
        </Button>
        </CartContainer>
      </Sidebar>
      <ProductList products={products} inCart={inCart} addToCart={addToCart} onSetSidebarOpen={onSetSidebarOpen}></ProductList>
    </Container>
  );
};

export default App;