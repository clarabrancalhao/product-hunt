import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import url from '../services/url';
import axios from 'axios';

const Main = () => {
  const [docs, setDocs] = useState({});

  useEffect(() => {
    async function loadProducts() {
      const response = await axios.get(`${url}/products`);
      const { docs } = response.data;
      setDocs(docs);
      console.log(docs);
    }
    loadProducts();
  }, []);

  return (
    <View>
      <Text>Página Maiasdoksadoksadn</Text>
    </View>
  );
};

export default Main;
