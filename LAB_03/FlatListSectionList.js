import React from 'react'; // Nhập React để sử dụng
import { View, Text, FlatList, SectionList, Pressable, TouchableOpacity, StyleSheet } from 'react-native';

// Nhập các thành phần cần thiết từ React Native

// Dữ liệu cho FlatList
const DATA = [
  { id: '1', title: 'Item 1' }, // Mục đầu tiên
  { id: '2', title: 'Item 2' }, // Mục thứ hai  
  { id: '3', title: 'Item 3' }, // Mục thứ ba
];

// Dữ liệu cho SectionList
const SECTION_DATA = [
  {
    title: 'Món chính', // Tiêu đề của phần đầu 1
    data: ['Phở', 'Bún chả', 'Cơm tấm'], // Dữ liệu các mục trong phần đầu 1
  },
  {
    title: 'Món tráng miệng', // Tiêu đề của phần đầu 2
    data: ['Chè', 'Bánh flan', 'Kem'], // Dữ liệu các mục trong phần đầu 2
  },
];

export default function FlatListSectionList() {
  // Component để render mỗi item trong FlatList
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  // Component để render mỗi item trong SectionList
  const renderSectionItem = ({ item }) => (
    <View style={styles.sectionItem}>
      <Text style={styles.sectionItemText}>{item}</Text>
    </View>
  );

  // Component để render header của mỗi section
  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>FlatList và SectionList Demo</Text>
      
      {/* FlatList Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>FlatList:</Text>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
        />
      </View>

      {/* SectionList Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SectionList:</Text>
        <SectionList
          sections={SECTION_DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={renderSectionItem}
          renderSectionHeader={renderSectionHeader}
          style={styles.sectionList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    flex: 1,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  flatList: {
    flex: 1,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    color: '#333',
  },
  sectionList: {
    flex: 1,
  },
  sectionHeader: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionItem: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 2,
    marginLeft: 10,
    borderRadius: 5,
    borderLeftWidth: 3,
    borderLeftColor: '#007AFF',
  },
  sectionItemText: {
    fontSize: 14,
    color: '#333',
  },
});
