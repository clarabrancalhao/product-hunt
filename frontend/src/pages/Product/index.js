import React, { useEffect, useState } from 'react';
import axios from 'axios';
import url from '../../services/url';

import './styles.css';

const Product = (props) => {
  const [product, setProduct] = useState({});
  const { id } = props.match.params;

  useEffect(() => {
    async function loadProduct() {
      const response = await axios.get(`${url}/products/${id}`);
      setProduct(response.data);
    }
    loadProduct();
  }, [id]);

  return (
    <div className="product-info">
      <h1>{product.title}</h1>
      <p>{product.description}</p>

      <p>
        URL:{' '}
        <a target="_blank" rel="noopener noreferrer" href={product.url}>
          {product.url}
        </a>
      </p>
    </div>
  );
};

export default Product;
