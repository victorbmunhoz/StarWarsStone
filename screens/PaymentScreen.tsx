import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  DevSettings,
} from 'react-native';
import LottieView from 'lottie-react-native';
import CreditCardForm, { Button, FormModel } from 'rn-credit-card';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeAll } from '../redux/cartSlice';
import { Purchase } from '../types';

export default function PaymentScreen({ navigation }:any) {
  const { cartItems, cartTotalAmount, cartTotalQuantity } = useSelector((state:any) => state.cart);

  const dispatch = useDispatch();

  const formMethods = useForm<FormModel>({
    // to trigger the validation on the blur event
    mode: 'onBlur',
    defaultValues: {
      holderName: '',
      cardNumber: '',
      expiration: '',
      cvv: '',
    },
  });

  const storeData = async (value: Purchase) => {
    await AsyncStorage.getItem('purchaseHistory', (err, result: any) => {
      const nextHistory = [
        ...JSON.parse(result || '[]'),
        value,
      ];

      AsyncStorage.setItem('purchaseHistory', JSON.stringify(nextHistory));
    });
  };

  const { handleSubmit, formState } = formMethods;

  function onSubmit(model: FormModel) {
    const formModel = {
      purchase: {
        products: cartItems,
        totalValue: cartTotalAmount,
        totalQuantity: cartTotalQuantity,
        checkoutInfo: {
          holderName: model.holderName,
          cardNumber: model.cardNumber,
          expiration: model.expiration,
          cvv: model.cvv,
        },
      },
    };

    storeData(formModel);

    dispatch(removeAll());

    navigation.navigate('StoreScreen');
  }

  return (
    <FormProvider {...formMethods}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.avoider}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <CreditCardForm
            fonts={{
              regular: 'Roboto',
              bold: 'Roboto',
            }}
            LottieView={LottieView}
            horizontalStart
            overrides={{
              labelText: {
                marginTop: 16,
              },
            }}
            translations={{
              cardNumber: 'N??mero do cart??o',
              cardHolderName: 'Nome do titular',
              nameSurname: 'Nome Sobrenome',
              mmYY: 'MM/YY',
              expiration: 'Data de expira????o',
              securityCode: 'C??digo (CVV)',
              next: 'Pr??ximo',
              done: 'Conclu??do',
              cardNumberRequired: 'N??mero do cart??o ?? obrigat??rio.',
              cardNumberInvalid: 'N??mero do cart??o ?? inv??lido.',
              cardHolderNameRequired: 'Nome do titular ?? obrigat??rio.',
              expirationRequired: 'Data de expira????o ?? obrigat??rio.',
              securityCodeRequired: 'C??digo de seguran??a ?? obrigat??rio',
            }}
          />
        </KeyboardAvoidingView>

        {formState.isValid && (
          <Button
            style={styles.button}
            title="CONFIRMAR PAGAMENTO"
            onPress={handleSubmit(onSubmit)}
          />
        )}
      </SafeAreaView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  avoider: {
    flex: 1,
    padding: 25,
  },
  button: {
    margin: 36,
    marginTop: -10,
    backgroundColor: '#000',
  },
});
