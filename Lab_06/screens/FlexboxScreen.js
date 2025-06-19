import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const FlexboxScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Flexbox Practice</Text>
        <Text style={styles.headerSubtext}>Thực hành các thuộc tính Flexbox</Text>
      </View>
      
      {/* Flexbox Practice Section */}
      <View style={styles.section}>
        {/* flexDirection example */}
        <View style={styles.flexContainer}>
          <Text style={styles.label}>flexDirection: 'row'</Text>
          <View style={[styles.flexBox, { flexDirection: 'row' }]}>
            <View style={[styles.box, { backgroundColor: '#FF6B6B' }]}>
              <Text style={styles.boxText}>1</Text>
            </View>
            <View style={[styles.box, { backgroundColor: '#4ECDC4' }]}>
              <Text style={styles.boxText}>2</Text>
            </View>
            <View style={[styles.box, { backgroundColor: '#45B7D1' }]}>
              <Text style={styles.boxText}>3</Text>
            </View>
          </View>
        </View>

        <View style={styles.flexContainer}>
          <Text style={styles.label}>flexDirection: 'column'</Text>
          <View style={[styles.flexBox, { flexDirection: 'column' }]}>
            <View style={[styles.box, { backgroundColor: '#96CEB4' }]}>
              <Text style={styles.boxText}>1</Text>
            </View>
            <View style={[styles.box, { backgroundColor: '#FECA57' }]}>
              <Text style={styles.boxText}>2</Text>
            </View>
            <View style={[styles.box, { backgroundColor: '#FF9FF3' }]}>
              <Text style={styles.boxText}>3</Text>
            </View>
          </View>
        </View>

        {/* flexWrap example */}
        <View style={styles.flexContainer}>
          <Text style={styles.label}>flexWrap: 'wrap'</Text>
          <Text style={styles.description}>Các phần tử sẽ xuống dòng khi không đủ không gian</Text>
          <View style={[styles.flexBox, { flexDirection: 'row', flexWrap: 'wrap' }]}>
            <View style={[styles.box, { backgroundColor: '#74B9FF' }]}>
              <Text style={styles.boxText}>1</Text>
            </View>
            <View style={[styles.box, { backgroundColor: '#E17055' }]}>
              <Text style={styles.boxText}>2</Text>
            </View>
            <View style={[styles.box, { backgroundColor: '#00B894' }]}>
              <Text style={styles.boxText}>3</Text>
            </View>
            <View style={[styles.box, { backgroundColor: '#FDCB6E' }]}>
              <Text style={styles.boxText}>4</Text>
            </View>
            <View style={[styles.box, { backgroundColor: '#6C5CE7' }]}>
              <Text style={styles.boxText}>5</Text>
            </View>
          </View>
        </View>

        {/* flexGrow example */}
        <View style={styles.flexContainer}>
          <Text style={styles.label}>flexGrow example</Text>
          <Text style={styles.description}>Box 1: flexGrow: 1, Box 2: flexGrow: 2, Box 3: no flexGrow</Text>
          <View style={[styles.flexBox, { flexDirection: 'row' }]}>
            <View style={[styles.box, { backgroundColor: '#A29BFE', flexGrow: 1 }]}>
              <Text style={styles.boxText}>Grow 1</Text>
            </View>
            <View style={[styles.box, { backgroundColor: '#FD79A8', flexGrow: 2 }]}>
              <Text style={styles.boxText}>Grow 2</Text>
            </View>
            <View style={[styles.box, { backgroundColor: '#00CEC9' }]}>
              <Text style={styles.boxText}>Fixed</Text>
            </View>
          </View>
        </View>

        {/* flexShrink example */}
        <View style={styles.flexContainer}>
          <Text style={styles.label}>flexShrink example</Text>
          <Text style={styles.description}>Khi không gian hạn chế, các box sẽ co lại theo tỉ lệ</Text>
          <View style={[styles.flexBox, { flexDirection: 'row', width: 250 }]}>
            <View style={[styles.box, { backgroundColor: '#55A3FF', flexShrink: 1, width: 120 }]}>
              <Text style={styles.boxText}>Shrink 1</Text>
            </View>
            <View style={[styles.box, { backgroundColor: '#26DE81', flexShrink: 2, width: 120 }]}>
              <Text style={styles.boxText}>Shrink 2</Text>
            </View>
            <View style={[styles.box, { backgroundColor: '#FD79A8', width: 120 }]}>
              <Text style={styles.boxText}>No Shrink</Text>
            </View>
          </View>
        </View>

        {/* justifyContent examples */}
        <View style={styles.flexContainer}>
          <Text style={styles.label}>justifyContent: 'space-between'</Text>
          <View style={[styles.flexBox, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <View style={[styles.box, { backgroundColor: '#FF7675' }]}>
              <Text style={styles.boxText}>1</Text>
            </View>
            <View style={[styles.box, { backgroundColor: '#74B9FF' }]}>
              <Text style={styles.boxText}>2</Text>
            </View>
            <View style={[styles.box, { backgroundColor: '#00B894' }]}>
              <Text style={styles.boxText}>3</Text>
            </View>
          </View>
        </View>

        <View style={styles.flexContainer}>
          <Text style={styles.label}>justifyContent: 'center'</Text>
          <View style={[styles.flexBox, { flexDirection: 'row', justifyContent: 'center' }]}>
            <View style={[styles.box, { backgroundColor: '#FDCB6E' }]}>
              <Text style={styles.boxText}>1</Text>
            </View>
            <View style={[styles.box, { backgroundColor: '#E17055' }]}>
              <Text style={styles.boxText}>2</Text>
            </View>
          </View>
        </View>

        {/* alignItems examples */}
        <View style={styles.flexContainer}>
          <Text style={styles.label}>alignItems: 'center'</Text>
          <View style={[styles.flexBox, { flexDirection: 'row', alignItems: 'center', height: 120 }]}>
            <View style={[styles.box, { backgroundColor: '#6C5CE7', height: 40 }]}>
              <Text style={styles.boxText}>1</Text>
            </View>
            <View style={[styles.box, { backgroundColor: '#A29BFE', height: 60 }]}>
              <Text style={styles.boxText}>2</Text>
            </View>
            <View style={[styles.box, { backgroundColor: '#FD79A8', height: 80 }]}>
              <Text style={styles.boxText}>3</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#28A745',
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
  section: {
    padding: 20,
  },
  flexContainer: {
    marginBottom: 25,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  flexBox: {
    backgroundColor: '#e9ecef',
    padding: 10,
    borderRadius: 8,
    minHeight: 80,
  },
  box: {
    width: 60,
    height: 60,
    margin: 5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FlexboxScreen;
