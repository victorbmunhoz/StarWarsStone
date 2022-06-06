import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { Text, View } from '../components/Themed';
import StoreCard from '../components/StoreCard';
import { setProducts } from '../redux/productsSlice';

interface Product {
    title: string,
    price: number,
    zipcode: string,
    seller: string,
    thumbnailHd: string,
    date: string,
}

export default function StoreList({ navigation }:any) {
  const [products, setProduct] = useState<Product[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/stone-pagamentos/desafio-mobile/master/store/products.json')
      .then((res) => res.json())
      .then(setProduct);
    dispatch(setProducts(products));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Os melhores produtos da galáxia!</Text>

      <FlatList
        data={products}
        style={styles.productList}
        renderItem={({ item, index }) => <StoreCard product={item} navigation={navigation} key={`${item.zipcode}-${index}`} />}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  },
  productList: {
    marginTop: 15,
  },
});
