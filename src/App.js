import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import styled from 'styled-components'
import { Image, Column, Button } from 'rbx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import './App.css';

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

const handlePrices = (price) => {
  return price.toFixed(2);
}


const ProductList = ({products}) => {
  const sizes = ['S', 'M', 'L','XL']
  return (
    <Column.Group multiline>
    {products.map(product => <Column size="one-quarter" key={product.sku}>
        <Card>
          <CardContent>
          <img src={'./static/products/'+ product.sku + '_1.jpg'}/>
          <ProductInfo>
            {product.title}
            <br/>
            <h6>${handlePrices(product.price)}</h6>
            <br/>
            {sizes.map(size => <Button>{size}</Button>)}
            </ProductInfo>
          </CardContent>
        </Card>
      </Column>)}
  </Column.Group>
  )
}

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
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
      <ProductList products={products}></ProductList>
    </Container>
  );
};

export default App;