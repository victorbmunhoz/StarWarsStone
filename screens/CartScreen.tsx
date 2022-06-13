import React, { useEffect } from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CartCard from '../components/CartCard';
import { Text, View } from '../components/Themed';
import { removeAll, getTotal } from '../redux/cartSlice';

export default function CartScreen({ navigation }:any) {
  const { cartItems, cartTotalAmount, cartTotalQuantity } = useSelector((state:any) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotal());
  }, [cartItems, dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seu carrinho:</Text>

      {cartItems.length > 0 ? (
        <>
          <Text style={styles.title}>
            Total de itens:
            {' '}
            {cartTotalQuantity}
          </Text>

          <Text style={styles.title}>
            Valor total: R$
            {cartTotalAmount}
            ,00
          </Text>

          <FlatList
            data={cartItems}
            style={styles.productList}
            renderItem={({ item }) => <CartCard product={item} />}
            keyExtractor={(item, index) => (item.price * index).toString()}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />

          {cartItems.length > 1 && (
            <TouchableOpacity style={styles.buttonRemove} onPress={() => dispatch(removeAll())}>
              <Text style={styles.buttonBackText}>Remover Todos</Text>
            </TouchableOpacity>
          ) }

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Pagamento')}>
            <Text style={styles.buttonText}>FINALIZAR COMPRA</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>
            Você ainda não adicionou nada aqui!
          </Text>

          <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.navigate('StoreScreen')}>
            <Text style={styles.buttonText}>VOLTAR PARA A LOJA</Text>
          </TouchableOpacity>
        </>
      )}

    </View>

  );
}

const styles = StyleSheet.create({
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
    maxHeight: 460,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ffe81f',
    padding: 10,
    width: 350,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: '#fff',
    marginBottom: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 24,
  },
  buttonBack: {
    alignItems: 'center',
    padding: 10,
    width: 350,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginTop: 30,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#ffe81f',
  },
  buttonBackText: {
    color: '#fff',
    fontSize: 18,
  },
  buttonRemove: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 15,
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
});
