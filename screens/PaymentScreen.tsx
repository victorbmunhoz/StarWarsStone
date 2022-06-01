import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import CreditCardForm, { Button, FormModel } from 'rn-credit-card';

export default function PaymentScreen({ navigation }:any) {
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
  const { handleSubmit, formState } = formMethods;

  function onSubmit(model: FormModel) {
    console.log(`Success: ${JSON.stringify(model, null, 2)}`);
    navigation.navigate('Root');
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
              regular: 'roboto',
              bold: 'roboto',
            }}
            LottieView={LottieView}
            horizontalStart
            overrides={{
              labelText: {
                marginTop: 16,
              },
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
