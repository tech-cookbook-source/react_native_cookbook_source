// Mock MongoDB service for demonstration
// In a real app, you would connect to actual MongoDB database

class FriendsService {
  constructor() {
    // Mock data - in real app this would be MongoDB connection
    this.friends = [
      {
        id: '1',
        name: 'Nguyễn Văn An',
        phone: '0912345678',
        email: 'nguyen.van.an@email.com',
        createdAt: new Date(),
      },
      {
        id: '2',
        name: 'Trần Thị Bình',
        phone: '0987654321',
        email: 'tran.thi.binh@email.com',
        createdAt: new Date(),
      },
      {
        id: '3',
        name: 'Lê Minh Cường',
        phone: '0901234567',
        email: 'le.minh.cuong@email.com',
        createdAt: new Date(),
      },
    ];
    this.nextId = 4;
  }

  // Simulate async operations like real MongoDB
  async getAllFriends() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('📋 Fetched all friends from MongoDB');
        resolve([...this.friends]);
      }, 500);
    });
  }

  async getFriendById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const friend = this.friends.find(f => f.id === id);
        if (friend) {
          console.log(`👤 Fetched friend ${id} from MongoDB`);
          resolve(friend);
        } else {
          reject(new Error('Friend not found'));
        }
      }, 300);
    });
  }

  async addFriend(friendData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newFriend = {
          id: this.nextId.toString(),
          ...friendData,
          createdAt: new Date(),
        };
        this.friends.push(newFriend);
        this.nextId++;
        console.log('➕ Added new friend to MongoDB:', newFriend.name);
        resolve(newFriend);
      }, 300);
    });
  }

  async updateFriend(id, updatedData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.friends.findIndex(f => f.id === id);
        if (index !== -1) {
          this.friends[index] = {
            ...this.friends[index],
            ...updatedData,
            updatedAt: new Date(),
          };
          console.log('✏️ Updated friend in MongoDB:', this.friends[index].name);
          resolve(this.friends[index]);
        } else {
          reject(new Error('Friend not found'));
        }
      }, 300);
    });
  }

  async deleteFriend(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.friends.findIndex(f => f.id === id);
        if (index !== -1) {
          const deletedFriend = this.friends.splice(index, 1)[0];
          console.log('🗑️ Deleted friend from MongoDB:', deletedFriend.name);
          resolve(deletedFriend);
        } else {
          reject(new Error('Friend not found'));
        }
      }, 300);
    });
  }

  async searchFriends(query) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowercaseQuery = query.toLowerCase();
        const results = this.friends.filter(friend =>
          friend.name.toLowerCase().includes(lowercaseQuery) ||
          friend.phone.includes(query) ||
          friend.email.toLowerCase().includes(lowercaseQuery)
        );
        console.log(`🔍 Searched MongoDB for "${query}":`, results.length, 'results');
        resolve(results);
      }, 400);
    });
  }

  // Simulate MongoDB connection status
  async checkConnection() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('🔗 MongoDB connection status: Connected');
        resolve(true);
      }, 100);
    });
  }
}

export default new FriendsService();
