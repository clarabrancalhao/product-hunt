import React, { useEffect, useState } from 'react';
import axios from 'axios';
import url from '../../services/url';
import './styles.css';
import { Link } from 'react-router-dom';

const Main = () => {
  const [products, setProducts] = useState([]);
  const [productsInfo, setProductsInfo] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadProducts() {
      const response = await axios.get(`${url}/products?page=${page}`);
      const { docs, ...infos } = response.data;
      setProducts(docs);
      setProductsInfo(infos);
    }

    loadProducts();
  }, [page]);

  function nextPage() {
    if (page === productsInfo.pages) return;
    setPage((page) => page + 1);
  }
  function prevPage() {
    if (page === 1) return;
    setPage((page) => page - 1);
  }

  return (
    <div className="productList">
      {products.map((product) => (
        <article key={product._id}>
          <strong>{product.title}</strong>
          <p>{product.description}</p>

          <Link to={`/products/${product._id}`}>Acessar</Link>
        </article>
      ))}
      <div className="actions">
        <button disabled={page === 1} onClick={() => prevPage()}>
          Anterior
        </button>
        <button
          disabled={page === productsInfo.pages}
          onClick={() => nextPage()}>
          Próxima
        </button>
      </div>
    </div>
  );
};

export default Main;
