import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert
} from 'react-native';
import {
  Text,
  Card,
  Title,
  Paragraph,
  Button,
  Avatar,
  Divider,
  List,
  IconButton,
  Chip,
  Surface
} from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { user, logout, loading, checkAuthState } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await checkAuthState();
    setRefreshing(false);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout }
      ]
    );
  };

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return null; // This shouldn't happen as AuthProvider handles navigation
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header Card */}
      <Card style={styles.headerCard}>
        <Card.Content style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <Avatar.Text
              size={80}
              label={getInitials(user.fullName)}
              style={styles.avatar}
            />
            <IconButton
              icon="account-edit"
              size={24}
              onPress={() => navigation.navigate('Profile')}
              style={styles.editButton}
            />
          </View>
          
          <Title style={styles.userName}>{user.fullName}</Title>
          <Paragraph style={styles.userEmail}>{user.email}</Paragraph>
          
          <View style={styles.statsContainer}>
            <Surface style={styles.statItem}>
              <Text style={styles.statValue}>
                {new Date(user.createdAt).toLocaleDateString()}
              </Text>
              <Text style={styles.statLabel}>Member Since</Text>
            </Surface>
            
            <Surface style={styles.statItem}>
              <Text style={styles.statValue}>
                {user.phone ? 'Verified' : 'Pending'}
              </Text>
              <Text style={styles.statLabel}>Status</Text>
            </Surface>
          </View>
        </Card.Content>
      </Card>

      {/* Profile Information */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Personal Information</Title>
          
          <List.Item
            title="Full Name"
            description={user.fullName}
            left={() => <List.Icon icon="account" />}
            style={styles.listItem}
          />
          <Divider />
          
          <List.Item
            title="Email"
            description={user.email}
            left={() => <List.Icon icon="email" />}
            style={styles.listItem}
          />
          <Divider />
          
          <List.Item
            title="Phone"
            description={user.phone || 'Not provided'}
            left={() => <List.Icon icon="phone" />}
            style={styles.listItem}
          />
          <Divider />
          
          <List.Item
            title="Date of Birth"
            description={formatDate(user.dateOfBirth)}
            left={() => <List.Icon icon="calendar" />}
            style={styles.listItem}
          />
          <Divider />
          
          <List.Item
            title="Address"
            description={user.address || 'Not provided'}
            left={() => <List.Icon icon="map-marker" />}
            style={styles.listItem}
          />
        </Card.Content>
      </Card>

      {/* Account Actions */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Account</Title>
          
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Profile')}
            style={styles.actionButton}
            icon="account-edit"
          >
            Edit Profile
          </Button>
          
          <Button
            mode="outlined"
            onPress={onRefresh}
            style={styles.actionButton}
            icon="refresh"
            loading={refreshing}
          >
            Refresh Data
          </Button>
          
          <Button
            mode="contained"
            onPress={handleLogout}
            style={[styles.actionButton, styles.logoutButton]}
            icon="logout"
            loading={loading}
          >
            Logout
          </Button>
        </Card.Content>
      </Card>

      {/* App Information */}
      <Card style={[styles.card, styles.lastCard]}>
        <Card.Content>
          <Title style={styles.sectionTitle}>App Information</Title>
          <Paragraph style={styles.appInfo}>
            Lab 07 - Authentication System
          </Paragraph>
          <Paragraph style={styles.appInfo}>
            Built with React Native & MongoDB
          </Paragraph>
          <View style={styles.chipContainer}>
            <Chip icon="shield-check" style={styles.chip}>JWT Authentication</Chip>
            <Chip icon="database" style={styles.chip}>MongoDB</Chip>
            <Chip icon="react" style={styles.chip}>React Native</Chip>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerCard: {
    margin: 16,
    marginBottom: 8,
    elevation: 4,
    borderRadius: 12,
  },
  headerContent: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: '#6200ee',
  },
  editButton: {
    position: 'absolute',
    right: -8,
    top: -8,
    backgroundColor: 'white',
    elevation: 2,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 16,
  },
  statItem: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 1,
    minWidth: 120,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  card: {
    margin: 16,
    marginTop: 8,
    elevation: 2,
    borderRadius: 8,
  },
  lastCard: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  listItem: {
    paddingVertical: 8,
  },
  actionButton: {
    marginBottom: 12,
    borderRadius: 8,
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
  },
  appInfo: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
  },
  chip: {
    margin: 4,
  },
});

export default HomeScreen;
