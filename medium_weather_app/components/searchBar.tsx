import Ionicons from '@expo/vector-icons/Ionicons';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function SearchBar({ input, setInput, onSubmit, onGeo }: any) {
  return (
    <View style={styles.topBar}>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#888" />
        <TextInput
          value={input}
          placeholder="Search..."
          placeholderTextColor="#888"
          style={styles.input}
          onChangeText={setInput}
          onSubmitEditing={onSubmit}
          returnKeyType="search"
        />
      </View>

      <TouchableOpacity style={styles.geoBtn} onPress={onGeo}>
        <Ionicons name="location-outline" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#6200ee',
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    height: 40,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: '#000',
  },
  geoBtn: {
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4a00c8',
    justifyContent: 'center',
    alignItems: 'center',
  },
});