import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { fetchPokemonDetails } from '../../services/api';

export default function Details() {
  const { name } = useLocalSearchParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (name) fetchPokemonDetails(name as string).then(setData);
  }, [name]);

  if (!data) return <Text>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: data.sprites.other['official-artwork'].front_default }} 
          style={styles.image} 
        />
        <Text style={styles.name}>{data.name.toUpperCase()}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.sectionTitle}>Stats</Text>
        {data.stats.map((s: any) => (
          <View key={s.stat.name} style={styles.statRow}>
            <Text style={styles.statLabel}>{s.stat.name}</Text>
            <Text style={styles.statValue}>{s.base_stat}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { alignItems: 'center', padding: 30, backgroundColor: '#f8f8f8' },
  image: { width: 200, height: 200 },
  name: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  body: { padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#eee' },
  statLabel: { color: '#666', textTransform: 'capitalize' },
  statValue: { fontWeight: '700' }
});