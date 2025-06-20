import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const PlaylistModal = ({ visible, tracks, currentTrackIndex, onSelectTrack, onClose }) => {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    if (visible) {
      scaleAnim.setValue(0);
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    } else {
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, scaleAnim]);

  const renderTrackItem = ({ item, index }) => {
    const isCurrentTrack = index === currentTrackIndex;
    
    return (
      <TouchableOpacity
        style={[styles.trackItem, isCurrentTrack && styles.currentTrackItem]}
        onPress={() => onSelectTrack(index)}
      >
        <Image source={{ uri: item.artwork }} style={styles.trackArtwork} />
        <View style={styles.trackDetails}>
          <Text
            style={[styles.trackTitle, isCurrentTrack && styles.currentTrackText]}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <Text style={styles.trackArtist} numberOfLines={1}>
            {item.artist}
          </Text>
        </View>
        {isCurrentTrack && (
          <Ionicons name="musical-notes" size={20} color="#e94560" />
        )}
      </TouchableOpacity>
    );  };
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1}>
          <Animated.View
            style={[
              styles.modal,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
          <LinearGradient
            colors={['#1a1a2e', '#16213e']}
            style={styles.modalGradient}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Playlist</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={tracks}
              renderItem={renderTrackItem}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              style={styles.trackList}
            />          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    </TouchableOpacity>
  </Modal>
);
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalGradient: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff20',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  closeButton: {
    padding: 5,
  },
  trackList: {
    flex: 1,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff10',
  },
  currentTrackItem: {
    backgroundColor: '#ffffff10',
  },
  trackArtwork: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  trackDetails: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  currentTrackText: {
    color: '#e94560',
  },
  trackArtist: {
    fontSize: 14,
    color: '#ffffff80',
  },
});

export default PlaylistModal;
