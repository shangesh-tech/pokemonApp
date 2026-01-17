import { fetchPokemonImageUrl } from '@/services/api';
import { Link } from 'expo-router';
import { Text, Image, StyleSheet, Pressable } from 'react-native';
import { useState, useEffect } from 'react';

export function PokemonCard({ name , url }: { name: string, url: string }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchPokemonImageUrl(url).then((fetchedUrl) => {
      setImageUrl(fetchedUrl);
    });
  }, [url]);

  return (
    <Link href={`/pokemon/${name}`} asChild>
      <Pressable style={styles.card}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <Text style={styles.placeholder}>🔍</Text>
        )}
        <Text style={styles.name}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 8,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowOpacity: 0.1,
    elevation: 2,
  },
  image: { width: 80, height: 80 },
  placeholder: { width: 80, height: 80, fontSize: 40, textAlign: 'center', lineHeight: 80 },
  name: { marginTop: 10, fontWeight: '600', color: '#333' }
});