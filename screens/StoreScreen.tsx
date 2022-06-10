import React from 'react';
import {
  StyleSheet, FlatList, ActivityIndicator, Platform,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Text, View } from '../components/Themed';
import StoreCard from '../components/StoreCard';

export default function StoreList() {
  const { products, loading } = useSelector((state:any) => state.products);

  if (loading === true) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 80} color="#ffe81f" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Os melhores produtos da galáxia!</Text>

      <FlatList
        data={products}
        style={styles.productList}
        renderItem={({ item, index }) => <StoreCard product={item} key={`${item.zipcode}-${index}`} />}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    color: '#fff',
  },
  productList: {
    marginTop: 15,
  },
});
