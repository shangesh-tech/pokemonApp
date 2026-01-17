import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchPokemonList } from '../services/api';
import { PokemonCard } from '../components/PokemonCard';
import { Text } from '@react-navigation/elements';

export default function HomeScreen() {
  const [list, setList] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemonList().then((data) => {
      setList(data);
      setLoading(false);
    });
  }, []);

  const filteredData = list.filter((p: any) => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <ActivityIndicator size="large" color="#ff4444" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          placeholder="Search by name..."
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.name}
        numColumns={2}
        renderItem={({ item }) => <PokemonCard name={item.name} url={item.url} />}
        contentContainerStyle={styles.list}
      />
      <View style={styles.footer}>
        <Text style={{ fontWeight: 'bold' }}>Total Pokemon: {filteredData.length}</Text>
        <Text style={{ marginTop: 6 , color: 'red' , fontWeight: 'bold'}}>Build By Shangesh S</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 15,
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 3,
  },
  input: { flex: 1, marginLeft: 10, fontSize: 16 },
  list: { paddingHorizontal: 10 },
  footer: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
});