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

// returns updated cart
const addToCart = (p, cart) => {
  if (cart === undefined || cart.length === 0) {
    console.log("nothing in cart");
    return cart.concat({sku:p.sku, ct:1, price:p.price, title:p.title}); 
  }
  else {
    console.log("trying to modify cart");
    var newobj = {sku:p.sku, ct:1, price:p.price, title:p.title};
    

    for (var i in cart) {
      console.log("cart[i]", cart[i]);
      if (cart[i].sku == p.sku) {
        // Increase quantity of existing item
        var newcount = cart[i].ct + 1;
        console.log("newcount", newcount);
        var updatedobj = {sku:p.sku, ct:newcount, price:p.price, title:p.title};
        var tempcart = cart.filter(y => y.sku !== p.sku);
        console.log("cart with removed item:", tempcart)
        return tempcart.concat(updatedobj);
      }
    }

    // If item does not exist in cart yet
    console.log("item not in cart yet!");
    return cart.concat(newobj); 
}
}

const removeFromCart = (p, cart) => {
  if (cart === undefined || cart.length === 0) {
    console.log("nothing in cart, this should not be possible >:(");
    return cart; 
  }
  else {
    console.log("trying to modify cart");
    
    for (var i in cart) {
      console.log("cart[i]", cart[i]);
      if (cart[i].sku == p.sku) {
        // Decrease quantity of existing item
        var newcount = cart[i].ct - 1;
        var tempcart = cart.filter(y => y.sku !== p.sku);
        console.log("cart with removed item:", tempcart)

        // Remove item completely if count becomes 0
        if (newcount === 0) {
          return tempcart;
        }
        // Otherwise just decrement the count
        else {
          console.log("newcount", newcount);
          var updatedobj = {sku:p.sku, ct:newcount, price:p.price, title:p.title};
          return tempcart.concat(updatedobj);
        }
        
      }
    }
}
}

const ProductList = ({products, inCart, updateCart, onSetSidebarOpen}) => {
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
              updateCart(addToCart(product, inCart)); onSetSidebarOpen(true)}}>
              Add to Cart</Button>
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
  const [inCart, updateCart] = useState([]);
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
            <Button onClick={() => {
              updateCart(removeFromCart(item, inCart)); onSetSidebarOpen(true)}}>
              X</Button>
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
      <ProductList products={products} inCart={inCart} updateCart={updateCart} onSetSidebarOpen={onSetSidebarOpen}></ProductList>
    </Container>
  );
};

export default App;