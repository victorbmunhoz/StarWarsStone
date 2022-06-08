import React from 'react';
import {
  StyleSheet, Image, View, TouchableOpacity, Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Text } from './Themed';
import { addToCart } from '../redux/cartSlice';

interface StoreCardProps {
  product: {
    title: string,
    price: number,
    zipcode: string,
    seller: string,
    thumbnailHd: string,
    date: string,
  },
}

interface Product {
  title: string,
  price: number,
  zipcode: string,
  seller: string,
  thumbnailHd: string,
  date: string,
}

export default function StoreCard({ product }: StoreCardProps) {
  const dispatch = useDispatch();

  const handleAddToCart = (item: Product) => {
    dispatch(addToCart(item));

    Alert.alert(`${product.title} adicionado ao carrinho!`);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: product.thumbnailHd }} resizeMode="contain" />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{product.title}</Text>

        <Text style={styles.seller}>
          Vendedor:
          {' '}
          {product.seller}
        </Text>

        <Text style={styles.title}>
          R$
          {product.price}
          ,00
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAddToCart(product)}
        >
          <Text style={styles.buttonText}>COMPRAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    width: '100%',
    height: 'auto',
    marginVertical: 20,
    borderRadius: 10,
    shadowColor: '#fff',
    shadowOffset: {
      width: 7,
      height: 7,
    },
    shadowOpacity: 0.71,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#fff',
  },
  image: {
    width: 350,
    height: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    justifyContent: 'center',
    width: '100%',
    height: 'auto',
    padding: 10,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    flexShrink: 1,
    marginBottom: 10,
  },
  seller: {
    fontSize: 16,
    fontWeight: 'normal',
    color: 'gray',
    flexShrink: 1,
    marginBottom: 10,
  },
  price: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 15,
    width: 200,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: '#ffe81f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
});
