import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import LoadingScreen from './LoadingScreen';
import ProductDetailsScreen from './ProductDetailsScreen'; 

const HomeScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null); 
  
    useEffect(() => {
      fetchProducts('');
    }, []);
  
    useEffect(() => {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProducts(filtered);
    }, [searchText, products]);
  
    const fetchProducts = async searchTerm => {
      try {
        const response = await fetch(`https://dummyapi.online/api/products?q=${searchTerm}`);
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    const handleBackButton = () => {
      setSelectedProduct(null); 
    };
  
    const renderProductItem = ({ item }) => (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() => setSelectedProduct(item)}
      >
        <View style={styles.productImageContainer}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
        </View>
        <Text style={styles.productName}>{item.name.replace(/Product /g, '')}</Text>
      </TouchableOpacity>
    );
  
    return (
      <View style={styles.container}>
        {!selectedProduct && ( 
          <TextInput
            style={styles.searchInput}
            placeholder="Search for products"
            value={searchText}
            onChangeText={text => setSearchText(text)}
          />
        )}
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {selectedProduct ? (
              <ProductDetailsScreen product={selectedProduct} onBackButtonPress={handleBackButton} />
            ) : (
              // Display the product list
              <FlatList
                data={filteredProducts}
                renderItem={renderProductItem}
                keyExtractor={item => item.id.toString()}
                numColumns={3}
              />
            )}
          </>
        )}
      </View>
    );
  };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f4f4',
  },
  searchInput: {
    marginTop: 55,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  productContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 5,
    elevation: 3,
  },
  productImageContainer: {
    flex: 1,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  productDetailsContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
  },
  productDetailsText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  backButton: {
    marginTop: 10,
    backgroundColor: '#3c3c3c',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
