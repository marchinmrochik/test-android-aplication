import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import { ProductValues } from "../types";

const AddProduct = ({ navigation }: { navigation: any }) => {
  const initialValues: ProductValues = { title: '', price: '', description: '' };
  const [image, setImage] = useState<string | null>(null);

  const validationSchema = yup.object().shape({
    title: yup.string().required('Enter product name'),
    price: yup.number().required('Enter the price of the item'),
    description: yup.string().required('Enter product description'),
  });

  const handleAddProduct = async (values: ProductValues) => {
    try {
      const storedProducts = await AsyncStorage.getItem('products');
      const products = storedProducts ? JSON.parse(storedProducts) : [];

      const newProduct = {
        id: Date.now().toString(),
        title: values.title,
        price: values.price,
        description: values.description,
        image: image || null,
      };

      products.push(newProduct);

      await AsyncStorage.setItem('products', JSON.stringify(products));

      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleAddProduct,
  });

  const handleSelectImage = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
    }).then((response) => {
      setImage(response.path);
    })
    .catch((error) => {
      console.error('ImagePicker Error: ', error);
     });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Product name"
        onChangeText={formik.handleChange('title')}
        onBlur={formik.handleBlur('title')}
        value={formik.values.title}
      />
      {formik.touched.title && formik.errors.title && (
        <Text style={styles.errorText}>{formik.errors.title}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Product price"
        onChangeText={formik.handleChange('price')}
        onBlur={formik.handleBlur('price')}
        value={formik.values.price}
        keyboardType="numeric"
      />
      {formik.touched.price && formik.errors.price && (
        <Text style={styles.errorText}>{formik.errors.price}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Product description"
        onChangeText={formik.handleChange('description')}
        onBlur={formik.handleBlur('description')}
        value={formik.values.description}
        multiline
      />
      {formik.touched.description && formik.errors.description && (
        <Text style={styles.errorText}>{formik.errors.description}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSelectImage}>
        <Text style={styles.buttonText}>Select image</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <Button title="Add item" onPress={() => formik.handleSubmit()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});

export default AddProduct;
