import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  Linking,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  FAB,
  IconButton,
  Dialog,
  Portal,
  TextInput,
  ActivityIndicator,
  Snackbar,
  Surface,
  Avatar,
  Chip,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadContacts,
  saveContacts,
  addContact,
  updateContact,
  deleteContact,
} from '../store/slices/contactSlice';

export default function ContactScreen() {
  const dispatch = useDispatch();
  const { items: contacts, loading } = useSelector(state => state.contacts);
  
  const [dialogVisible, setDialogVisible] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    notes: '',
  });
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    dispatch(loadContacts());
  }, [dispatch]);

  useEffect(() => {
    // Save contacts to AsyncStorage whenever contacts change
    if (contacts.length > 0) {
      dispatch(saveContacts(contacts));
    }
  }, [contacts, dispatch]);

  const resetForm = () => {
    setContactForm({
      name: '',
      phone: '',
      email: '',
      company: '',
      notes: '',
    });
    setEditingContact(null);
  };

  const handleAddContact = () => {
    if (contactForm.name.trim() && contactForm.phone.trim()) {
      if (editingContact) {
        dispatch(updateContact({ ...editingContact, ...contactForm }));
        showSnackbar('Đã cập nhật liên hệ!');
      } else {
        dispatch(addContact(contactForm));
        showSnackbar('Đã thêm liên hệ mới!');
      }
      
      resetForm();
      setDialogVisible(false);
    } else {
      Alert.alert('Lỗi', 'Vui lòng nhập tên và số điện thoại');
    }
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setContactForm({
      name: contact.name,
      phone: contact.phone,
      email: contact.email || '',
      company: contact.company || '',
      notes: contact.notes || '',
    });
    setDialogVisible(true);
  };

  const handleDeleteContact = (id) => {
    Alert.alert(
      'Xóa liên hệ',
      'Bạn có chắc chắn muốn xóa liên hệ này?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteContact(id));
            showSnackbar('Đã xóa liên hệ!');
          },
        },
      ]
    );
  };

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = (email) => {
    if (email) {
      Linking.openURL(`mailto:${email}`);
    }
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  };

  const getAvatarColor = (name) => {
    const colors = ['#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#00bcd4', '#009688', '#4caf50', '#ff9800', '#ff5722'];
    const hash = name.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return colors[Math.abs(hash) % colors.length];
  };

  const renderContactItem = ({ item }) => (
    <Card style={styles.contactCard} elevation={2}>
      <Card.Content>
        <View style={styles.contactRow}>
          <Avatar.Text
            size={50}
            label={getInitials(item.name)}
            style={{
              backgroundColor: getAvatarColor(item.name),
            }}
          />
          <View style={styles.contactInfo}>
            <Title style={styles.contactName}>{item.name}</Title>
            <Paragraph style={styles.contactPhone}>{item.phone}</Paragraph>
            {item.email && (
              <Paragraph style={styles.contactEmail}>{item.email}</Paragraph>
            )}
            {item.company && (
              <Chip style={styles.companyChip} textStyle={styles.chipText}>
                {item.company}
              </Chip>
            )}
          </View>
          <View style={styles.actions}>
            <IconButton
              icon="phone"
              size={24}
              iconColor="#4caf50"
              onPress={() => handleCall(item.phone)}
            />
            <IconButton
              icon="pencil"
              size={24}
              iconColor="#2196f3"
              onPress={() => handleEditContact(item)}
            />
            <IconButton
              icon="delete"
              size={24}
              iconColor="#e53e3e"
              onPress={() => handleDeleteContact(item.id)}
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Paragraph style={styles.loadingText}>Đang tải danh bạ...</Paragraph>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Surface style={styles.header} elevation={1}>
        <Title style={styles.headerTitle}>
          Danh bạ liên hệ ({contacts.length})
        </Title>
      </Surface>

      {contacts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Paragraph style={styles.emptyText}>
            Chưa có liên hệ nào. Thêm liên hệ đầu tiên!
          </Paragraph>
        </View>
      ) : (
        <FlatList
          data={contacts}
          renderItem={renderContactItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
          resetForm();
          setDialogVisible(true);
        }}
        label="Thêm"
      />

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>
            {editingContact ? 'Chỉnh sửa liên hệ' : 'Thêm liên hệ mới'}
          </Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Tên *"
              value={contactForm.name}
              onChangeText={(text) => setContactForm({...contactForm, name: text})}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Số điện thoại *"
              value={contactForm.phone}
              onChangeText={(text) => setContactForm({...contactForm, phone: text})}
              mode="outlined"
              keyboardType="phone-pad"
              style={styles.input}
            />
            <TextInput
              label="Email"
              value={contactForm.email}
              onChangeText={(text) => setContactForm({...contactForm, email: text})}
              mode="outlined"
              keyboardType="email-address"
              style={styles.input}
            />
            <TextInput
              label="Công ty"
              value={contactForm.company}
              onChangeText={(text) => setContactForm({...contactForm, company: text})}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Ghi chú"
              value={contactForm.notes}
              onChangeText={(text) => setContactForm({...contactForm, notes: text})}
              mode="outlined"
              multiline
              numberOfLines={3}
              style={styles.input}
            />
          </Dialog.Content>          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>
              <Text>Hủy</Text>
            </Button>
            <Button mode="contained" onPress={handleAddContact}>
              <Text>{editingContact ? 'Cập nhật' : 'Thêm'}</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
  },
  loadingText: {
    marginTop: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  contactCard: {
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 16,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  contactEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  companyChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#e3f2fd',
  },
  chipText: {
    fontSize: 12,
    color: '#1976d2',
  },
  actions: {
    flexDirection: 'column',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ee',
  },
  input: {
    marginBottom: 12,
  },
});
