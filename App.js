import {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Pressable, ActivityIndicator, FlatList } from 'react-native';

export default function App() {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch('https://www.autotec.cl/json/productos.php');
      const json = await response.json();
      setData(json.productos);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  
  return (
    <>
    <View style={styles.container}>
      <Pressable 
        onPress={() => alert('presionado')} 
        // Alert.alert('Hemos tocado el texto')
      >
        <Text>Prueba seba2</Text>
      </Pressable>
      <Text>Open up App.js to start working seba on your app!</Text>
    </View>
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({prod_id}) => prod_id}
          renderItem={({item}) => (
            <Text>
              {item.prod_id}, {item.prod_nombre}
            </Text>
          )}
        />
      )}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
