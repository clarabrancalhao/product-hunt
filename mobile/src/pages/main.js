import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import url from '../services/url';

const Main = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [productInfo, setProductInfo] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts(page = 1) {
    const response = await fetch(`${url}/products?page=${page}`);
    const { docs, ...productInfo } = await response.json();
    setProducts([...products, ...docs]);
    setProductInfo(productInfo);
    setPage(page);
  }

  const loadMore = () => {
    if (page === productInfo.pages) return;
    const pageNumber = page + 1;

    loadProducts(pageNumber);
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <TouchableOpacity
        style={styles.productButton}
        onPress={() => {
          navigation.navigate('Product', { product: item });
        }}>
        <Text style={styles.productButtonText}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    flex: 1,
  },

  list: {
    padding: 20,
  },

  productContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },

  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  productDescription: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24,
  },

  productButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: '#da552f',
  },

  productButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Main;

/* Criar um produto
fetch(`${url}/products`, requestOptions)

const requestOptions = {
  method: "post",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title,
    description,
    url
  })
}
*/
