import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image,
  Dimensions,
  Modal,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const CartoonScreen = () => {
  const [cartoons, setCartoons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedCartoon, setSelectedCartoon] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadCartoons();
    loadFavorites();
  }, []);

  const loadCartoons = async () => {
    // Demo cartoon data
    const cartoonData = [
      {
        id: '1',
        title: 'Tom và Jerry',
        description: 'Cuộc chiến bất tận giữa chú mèo Tom và chú chuột Jerry',
        image: 'https://via.placeholder.com/200x300/FF6B6B/FFFFFF?text=Tom+%26+Jerry',
        year: '1940',
        genre: 'Comedy, Animation',
        rating: 4.8,
        episodes: 164,
        studio: 'MGM',
      },
      {
        id: '2',
        title: 'Doraemon',
        description: 'Chú mèo máy đến từ tương lai giúp đỡ Nobita',
        image: 'https://via.placeholder.com/200x300/4ECDC4/FFFFFF?text=Doraemon',
        year: '1979',
        genre: 'Adventure, Comedy',
        rating: 4.9,
        episodes: 1787,
        studio: 'Shin-Ei Animation',
      },
      {
        id: '3',
        title: 'Dragon Ball',
        description: 'Cuộc phiêu lưu tìm kiếm 7 viên ngọc rồng',
        image: 'https://via.placeholder.com/200x300/45B7D1/FFFFFF?text=Dragon+Ball',
        year: '1986',
        genre: 'Action, Adventure',
        rating: 4.7,
        episodes: 153,
        studio: 'Toei Animation',
      },
      {
        id: '4',
        title: 'One Piece',
        description: 'Cuộc phiêu lưu tìm kho báu One Piece',
        image: 'https://via.placeholder.com/200x300/96CEB4/FFFFFF?text=One+Piece',
        year: '1999',
        genre: 'Adventure, Comedy',
        rating: 4.8,
        episodes: 1000,
        studio: 'Toei Animation',
      },
      {
        id: '5',
        title: 'Naruto',
        description: 'Hành trình của ninja trẻ tuổi Naruto',
        image: 'https://via.placeholder.com/200x300/FECA57/FFFFFF?text=Naruto',
        year: '2002',
        genre: 'Action, Adventure',
        rating: 4.6,
        episodes: 720,
        studio: 'Pierrot',
      },
      {
        id: '6',
        title: 'Conan',
        description: 'Thám tử nhí giải quyết những vụ án bí ẩn',
        image: 'https://via.placeholder.com/200x300/FF9FF3/FFFFFF?text=Conan',
        year: '1996',
        genre: 'Mystery, Adventure',
        rating: 4.5,
        episodes: 1000,
        studio: 'TMS Entertainment',
      },
    ];
    setCartoons(cartoonData);
  };

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('cartoonFavorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const toggleFavorite = async (cartoonId) => {
    try {
      let updatedFavorites;
      if (favorites.includes(cartoonId)) {
        updatedFavorites = favorites.filter(id => id !== cartoonId);
      } else {
        updatedFavorites = [...favorites, cartoonId];
      }
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('cartoonFavorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const showCartoonDetails = (cartoon) => {
    setSelectedCartoon(cartoon);
    setModalVisible(true);
  };

  const renderCartoonItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.cartoonCard}
      onPress={() => showCartoonDetails(item)}
    >
      <Image source={{ uri: item.image }} style={styles.cartoonImage} />
      <View style={styles.cartoonInfo}>
        <Text style={styles.cartoonTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.cartoonYear}>{item.year}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item.id)}
      >
        <Ionicons 
          name={favorites.includes(item.id) ? "heart" : "heart-outline"} 
          size={20} 
          color={favorites.includes(item.id) ? "#FF6B6B" : "#ccc"} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          
          {selectedCartoon && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Image source={{ uri: selectedCartoon.image }} style={styles.modalImage} />
              <Text style={styles.modalTitle}>{selectedCartoon.title}</Text>
              <Text style={styles.modalDescription}>{selectedCartoon.description}</Text>
              
              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Năm:</Text>
                  <Text style={styles.detailValue}>{selectedCartoon.year}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Thể loại:</Text>
                  <Text style={styles.detailValue}>{selectedCartoon.genre}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Số tập:</Text>
                  <Text style={styles.detailValue}>{selectedCartoon.episodes}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Studio:</Text>
                  <Text style={styles.detailValue}>{selectedCartoon.studio}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Đánh giá:</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.detailValue}>{selectedCartoon.rating}</Text>
                  </View>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.favoriteModalButton}
                onPress={() => toggleFavorite(selectedCartoon.id)}
              >
                <Ionicons 
                  name={favorites.includes(selectedCartoon.id) ? "heart" : "heart-outline"} 
                  size={20} 
                  color="white" 
                />
                <Text style={styles.favoriteModalText}>
                  {favorites.includes(selectedCartoon.id) ? 'Bỏ yêu thích' : 'Yêu thích'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Cartoon Collection</Text>
        <Text style={styles.headerSubtext}>Bộ sưu tập phim hoạt hình</Text>
      </View>
      
      <FlatList
        data={cartoons}
        keyExtractor={(item) => item.id}
        renderItem={renderCartoonItem}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      
      {renderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#6C5CE7',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtext: {
    fontSize: 14,
    color: '#E0E0E0',
    marginTop: 5,
  },
  listContainer: {
    padding: 10,
  },
  cartoonCard: {
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 10,
    width: (width - 30) / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cartoonImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cartoonInfo: {
    padding: 10,
  },
  cartoonTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cartoonYear: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 3,
    fontSize: 12,
    color: '#666',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 15,
    padding: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: width * 0.9,
    maxHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  detailsContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  detailValue: {
    fontSize: 14,
    color: '#666',
  },
  favoriteModalButton: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  favoriteModalText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CartoonScreen;
