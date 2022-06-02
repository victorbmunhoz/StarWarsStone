import React from 'react';
import {
  StyleSheet, Image, View, TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Text } from './Themed';

interface Product {
  product: {
    title: string,
    price: number,
    zipcode: string,
    seller: string,
    thumbnailHd: string,
    date: string,
  }
}

export default function CartCard({ product }: Product) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: product.thumbnailHd }} resizeMode="contain" />

      <View style={styles.cardMain}>
        <View style={styles.cardTop}>
          <Text style={styles.title}>{product.title}</Text>

          <Text style={styles.price}>
            R$
            {product.price}
            ,00
          </Text>
        </View>

        <View style={styles.cardBottom}>
          <View style={styles.quantity}>
            <TouchableOpacity onPress={() => {}}>
              <FontAwesome name="minus-circle" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>
              Qntd: 1
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <FontAwesome name="plus-circle" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => {}}>
            <FontAwesome name="trash" size={32} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  cardTop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  cardBottom: {
    flex: 1,
    width: '100%',
    maxWidth: 250,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantity: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 20,
    color: '#000',
    marginHorizontal: 10,
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
});
