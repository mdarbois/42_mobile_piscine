import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { City } from '../utils/types';

export default function ResultsList({ results, loading, onSelect }: any) {
  return (
    <View style={{ padding: 10, maxHeight: 200 }}>
      {loading && <Text>Loading...</Text>}

      <FlatList
        data={results}
        keyExtractor={(item: City) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelect(item)}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
              <Text>{item.admin1}</Text>
              <Text>{item.country}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}