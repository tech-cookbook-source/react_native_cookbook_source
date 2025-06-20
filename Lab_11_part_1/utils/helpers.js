// Utility functions for the music player
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const getProgressPercentage = (currentTime, duration) => {
  return duration > 0 ? (currentTime / duration) * 100 : 0;
};

export const calculateSeekPosition = (gestureX, screenWidth, duration) => {
  const progress = Math.max(0, Math.min(1, gestureX / screenWidth));
  return progress * duration;
};
