// Sample music data for the music player
export const musicTracks = [
  {
    id: 1,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    duration: 355, // in seconds
    artwork: "https://i.imgur.com/6jCHb5j.jpg",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Imagine",
    artist: "John Lennon",
    album: "Imagine",
    duration: 183,
    artwork: "https://i.imgur.com/8JeKkVK.jpg", 
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "Hotel California",
    artist: "Eagles",
    album: "Hotel California",
    duration: 391,
    artwork: "https://i.imgur.com/rKzMxTd.jpg",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    id: 4,
    title: "Sweet Child O' Mine",
    artist: "Guns N' Roses", 
    album: "Appetite for Destruction",
    duration: 356,
    artwork: "https://i.imgur.com/vLqKSFE.jpg",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    id: 5,
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller",
    duration: 294,
    artwork: "https://i.imgur.com/zNdHXmP.jpg",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  }
];

export const getRandomTrack = () => {
  return musicTracks[Math.floor(Math.random() * musicTracks.length)];
};

export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
