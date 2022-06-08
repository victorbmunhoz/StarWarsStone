import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { Text, View } from '../components/Themed';
import StoreCard from '../components/StoreCard';

export default function StoreList({ navigation }:any) {
  const { products } = useSelector((state:any) => state.products);

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
