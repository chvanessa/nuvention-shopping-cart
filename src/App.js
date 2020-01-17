import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import styled from 'styled-components'
import { Image, Column, Button } from 'rbx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';

const ProductInfo = styled.div
`
  text-align: center;
`

const PageTitle = styled.div
`
  text-align: center;
  font-size: 20px;
  padding: 20px;
`

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
      <Column.Group multiline>
        {products.map(product => <Column size="one-quarter" key={product.sku}>
            <Card>
              <CardContent>
              <ProductInfo>
              <img src={'./static/products/'+ product.sku + '_1.jpg'}/>
                {product.title}
                <br/>
                ${product.price}
                <br/>
                <Button>S</Button>
                <Button>M</Button>
                <Button>L</Button>
                </ProductInfo>
              </CardContent>
            </Card>
          </Column>)}
      </Column.Group>
    </Container>
  );
};

export default App;