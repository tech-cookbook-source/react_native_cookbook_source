import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  SafeAreaView,
  StatusBar,
  Alert,
  PanResponder,
} from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import PlaylistModal from './components/PlaylistModal';

const { width: screenWidth } = Dimensions.get('window');

// Sample music data
const musicTracks = [
  {
    id: 1,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    duration: 355,
    artwork: "https://picsum.photos/300/300?random=1",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Imagine",
    artist: "John Lennon", 
    album: "Imagine",
    duration: 183,
    artwork: "https://picsum.photos/300/300?random=2",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "Hotel California",
    artist: "Eagles",
    album: "Hotel California", 
    duration: 391,
    artwork: "https://picsum.photos/300/300?random=3",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    id: 4,
    title: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    album: "Appetite for Destruction",
    duration: 356,
    artwork: "https://picsum.photos/300/300?random=4",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    id: 5,
    title: "Billie Jean", 
    artist: "Michael Jackson",
    album: "Thriller",
    duration: 294,
    artwork: "https://picsum.photos/300/300?random=5",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  }
];

// Helper functions
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function App() {
  // Audio state
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [playlist, setPlaylist] = useState(musicTracks);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // Player state
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // 'off', 'one', 'all'
  const [showPlaylist, setShowPlaylist] = useState(false);

  // Animations
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Current track
  const currentTrack = playlist[currentTrackIndex];

  // Initialize audio
  useEffect(() => {
    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      } catch (error) {
        console.log('Audio setup error:', error);
      }
    };

    setupAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  // Rotation animation for album cover
  useEffect(() => {
    let rotationAnimation;
    
    if (isPlaying) {
      rotationAnimation = Animated.loop(
        Animated.timing(rotationAnim, {
          toValue: 1,
          duration: 10000,
          useNativeDriver: true,
        })
      );
      rotationAnimation.start();
    } else {
      if (rotationAnimation) {
        rotationAnimation.stop();
      }
    }

    return () => {
      if (rotationAnimation) {
        rotationAnimation.stop();
      }
    };
  }, [isPlaying]);

  // Progress animation
  useEffect(() => {
    if (duration > 0) {
      const progress = currentTime / duration;
      Animated.timing(progressAnim, {
        toValue: progress,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  }, [currentTime, duration]);

  // Load and play track
  const loadTrack = async (trackIndex) => {
    try {
      setIsLoading(true);
      
      // Fade out current track
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: playlist[trackIndex].url },
        { shouldPlay: false, isLooping: repeatMode === 'one' }
      );

      setSound(newSound);
      setCurrentTrackIndex(trackIndex);

      // Set up playback status update
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setCurrentTime(status.positionMillis / 1000);
          setDuration(status.durationMillis / 1000);
          setIsPlaying(status.isPlaying);
          
          if (status.didJustFinish && repeatMode !== 'one') {
            handleTrackEnd();
          }
        }
      });

      // Fade in new track
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      setIsLoading(false);
    } catch (error) {
      console.error('Error loading track:', error);
      Alert.alert('Error', 'Could not load track. Please check your internet connection.');
      setIsLoading(false);
    }
  };

  // Handle track end
  const handleTrackEnd = () => {
    if (repeatMode === 'all' || currentTrackIndex < playlist.length - 1) {
      playNext();
    } else {
      setIsPlaying(false);
    }
  };

  // Play/Pause functionality
  const togglePlayPause = async () => {
    try {
      if (!sound) {
        await loadTrack(currentTrackIndex);
        return;
      }

      if (isPlaying) {
        await sound.pauseAsync();
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }).start();
      } else {
        await sound.playAsync();
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 0.95,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
        ]).start();
      }
    } catch (error) {
      console.error('Playback error:', error);
      Alert.alert('Error', 'Playback failed. Please try again.');
    }
  };

  // Play next track
  const playNext = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(nextIndex);
  };

  // Play previous track
  const playPrevious = () => {
    const prevIndex = currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1;
    loadTrack(prevIndex);
  };

  // Toggle shuffle
  const toggleShuffle = () => {
    if (isShuffled) {
      setPlaylist(musicTracks);
      setIsShuffled(false);
    } else {
      const currentTrack = playlist[currentTrackIndex];
      const shuffledTracks = shuffleArray(musicTracks);
      const newIndex = shuffledTracks.findIndex(track => track.id === currentTrack.id);
      setPlaylist(shuffledTracks);
      setCurrentTrackIndex(newIndex);
      setIsShuffled(true);
    }
  };

  // Toggle repeat mode
  const toggleRepeat = () => {
    const modes = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeatMode(modes[nextIndex]);
    
    // Update current sound loop setting
    if (sound && repeatMode === 'one') {
      sound.setIsLoopingAsync(true);
    } else if (sound) {
      sound.setIsLoopingAsync(false);
    }
  };

  // Create pan responder for progress bar
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      const { locationX } = evt.nativeEvent;
      const progressBarWidth = screenWidth - 40; // Account for horizontal padding
      const progress = Math.max(0, Math.min(1, locationX / progressBarWidth));
      const newPosition = progress * duration;
      seekToPosition(newPosition);
    },
    onPanResponderMove: (evt) => {
      const { locationX } = evt.nativeEvent;
      const progressBarWidth = screenWidth - 40;
      const progress = Math.max(0, Math.min(1, locationX / progressBarWidth));
      const newPosition = progress * duration;
      seekToPosition(newPosition);
    },
  });

  // Seek to position
  const seekToPosition = async (position) => {
    if (sound && duration > 0) {
      const seekPosition = Math.max(0, Math.min(duration, position));
      await sound.setPositionAsync(seekPosition * 1000);
    }
  };

  // Handle playlist track selection
  const handleTrackSelect = (trackIndex) => {
    setShowPlaylist(false);
    loadTrack(trackIndex);
  };

  const rotation = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  // Load initial track
  useEffect(() => {
    loadTrack(0);
  }, []);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
        <LinearGradient
          colors={['#1a1a2e', '#16213e', '#0f3460']}
          style={styles.gradient}
        >        <View style={styles.header}>
            <TouchableOpacity
              style={styles.playlistButton}
              onPress={() => setShowPlaylist(true)}
            >
              <Ionicons name="list" size={24} color="#ffffff80" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Now Playing</Text>
            <View style={styles.placeholderButton} />
          </View>

          {/* Album Cover */}
          <Animated.View style={[styles.albumContainer, { opacity: fadeAnim }]}>
            <Animated.View
              style={[
                styles.albumCover,
                {
                  transform: [
                    { rotate: rotation },
                    { scale: scaleAnim }
                  ]
                }
              ]}
            >
              <Image
                source={{ uri: currentTrack.artwork }}
                style={styles.albumImage}
                resizeMode="cover"
              />
            </Animated.View>
            <View style={styles.vinylHole} />
          </Animated.View>

          {/* Track Info */}
          <Animated.View style={[styles.trackInfo, { opacity: fadeAnim }]}>
            <Text style={styles.trackTitle} numberOfLines={1}>
              {currentTrack.title}
            </Text>
            <Text style={styles.trackArtist} numberOfLines={1}>
              {currentTrack.artist}
            </Text>
            <Text style={styles.trackAlbum} numberOfLines={1}>
              {currentTrack.album}
            </Text>
          </Animated.View>        {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View
              style={styles.progressBar}
              {...panResponder.panHandlers}
            >
              <Animated.View
                style={[
                  styles.progressFill,
                  { width: progressWidth }
                ]}
              />
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controlsContainer}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={toggleShuffle}
            >
              <Ionicons
                name="shuffle"
                size={24}
                color={isShuffled ? '#e94560' : '#ffffff80'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={playPrevious}
            >
              <Ionicons name="play-skip-back" size={32} color="#ffffff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.playButton, isLoading && styles.playButtonLoading]}
              onPress={togglePlayPause}
              disabled={isLoading}
            >
              {isLoading ? (
                <Animated.View
                  style={[
                    styles.loadingSpinner,
                    {
                      transform: [{ rotate: rotation }]
                    }
                  ]}
                >
                  <Ionicons name="refresh" size={32} color="#ffffff" />
                </Animated.View>
              ) : (
                <Ionicons
                  name={isPlaying ? "pause" : "play"}
                  size={32}
                  color="#ffffff"
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={playNext}
            >
              <Ionicons name="play-skip-forward" size={32} color="#ffffff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={toggleRepeat}
            >
              <Ionicons
                name="repeat"
                size={24}
                color={repeatMode !== 'off' ? '#e94560' : '#ffffff80'}
              />
              {repeatMode === 'one' && (
                <View style={styles.repeatOneBadge}>
                  <Text style={styles.repeatOneText}>1</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>        {/* Track List Indicator */}
          <View style={styles.trackIndicator}>
            <Text style={styles.trackIndicatorText}>
              {currentTrackIndex + 1} of {playlist.length}
            </Text>
          </View>
        </LinearGradient>
      </SafeAreaView>

      {/* Playlist Modal - Rendered outside main container */}
      <PlaylistModal
        visible={showPlaylist}
        tracks={playlist}
        currentTrackIndex={currentTrackIndex}
        onSelectTrack={handleTrackSelect}
        onClose={() => setShowPlaylist(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
  },  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  playlistButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderButton: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    opacity: 0.8,
  },
  albumContainer: {
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  albumCover: {
    width: screenWidth * 0.7,
    height: screenWidth * 0.7,
    borderRadius: (screenWidth * 0.7) / 2,
    backgroundColor: '#ffffff10',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  albumImage: {
    width: '90%',
    height: '90%',
    borderRadius: (screenWidth * 0.7 * 0.9) / 2,
  },
  vinylHole: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1a1a2e',
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -20,
    elevation: 15,
  },
  trackInfo: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  trackTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  trackArtist: {
    fontSize: 18,
    color: '#ffffff80',
    marginBottom: 4,
    textAlign: 'center',
  },
  trackAlbum: {
    fontSize: 14,
    color: '#ffffff60',
    textAlign: 'center',
  },
  progressContainer: {
    marginBottom: 40,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#ffffff20',
    borderRadius: 2,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#e94560',
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 12,
    color: '#ffffff60',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 30,
  },
  controlButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#e94560',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  playButtonLoading: {
    backgroundColor: '#e9456060',
  },
  loadingSpinner: {
    width: 32,
    height: 32,
  },
  repeatOneBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#e94560',
    justifyContent: 'center',
    alignItems: 'center',
  },
  repeatOneText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  trackIndicator: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  trackIndicatorText: {
    fontSize: 12,
    color: '#ffffff40',
  },
});
