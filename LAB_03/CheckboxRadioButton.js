import React, { useState } from 'react'; // Nhập React và useState để quản lý trạng thái
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'; // Nhập các thành phần cần thiết từ React Native
import { Checkbox, RadioButton } from 'react-native-paper'; // Nhập Checkbox và RadioButton từ react-native-paper

const CheckboxRadioImageScreen = () => {
  const [checked, setChecked] = useState(false); // Trạng thái cho Checkbox
  const [selectedValue, setSelectedValue] = useState('option1'); // Trạng thái cho RadioButton

  const handleImagePress = () => {
    alert('Bạn đã nhấn vào hình ảnh!'); // Hiển thị thông báo khi nhấn vào hình ảnh
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Checkbox và RadioButton</Text> 

      <View style={styles.checkboxContainer}> 
        <Checkbox
          status={checked ? 'checked' : 'unchecked'} // Trạng thái của Checkbox
          onPress={() => setChecked(!checked)} // Hàm gọi khi nhấn vào Checkbox
        />
        <Text style={styles.label}>Chọn tùy chọn này</Text> 
      </View>

      <View style={styles.radioContainer}> 
        <RadioButton
          value="option1"
          status={selectedValue === 'option1' ? 'checked' : 'unchecked'} // Trạng thái của RadioButton
          onPress={() => setSelectedValue('option1')} // Hàm gọi khi nhấn vào RadioButton
        />
        <Text style={styles.label}>Tùy chọn này</Text> 
      </View>
      <View style={styles.radioContainer}> 
        <RadioButton
          value="option2"
          status={selectedValue === 'option2' ? 'checked' : 'unchecked'} // Trạng thái của RadioButton
          onPress={() => setSelectedValue('option2')} // Hàm gọi khi nhấn vào RadioButton
        />
        <Text style={styles.label}>Tùy chọn 2</Text> 
      </View>

      <Text style={styles.header}>ImageButton và ImageView</Text> 

      <TouchableOpacity onPress={handleImagePress}> 
        <Image
          source={{ uri: 'https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg' }} // URL hình ảnh
          style={styles.image} // Áp dụng kiểu dáng cho hình ảnh
        />
      </TouchableOpacity>
    </View>
  );
};

// Các kiểu dáng cho thành phần
const styles = StyleSheet.create({
  container: {
    flex: 1, // Chiếm toàn bộ không gian
    padding: 16, // Khoảng cách bên trong cho container
  },
  header: {
    fontSize: 18, // Kích thước chữ cho tiêu đề
    fontWeight: 'bold', // Đậm cho tiêu đề
    marginTop: 16, // Khoảng cách trên cho tiêu đề
    marginBottom: 8, // Khoảng cách dưới cho tiêu đề
  },
  checkboxContainer: {
    flexDirection: 'row', // Sắp xếp theo hàng
    alignItems: 'center', // Căn giữa theo chiều dọc
    marginBottom: 16, // Khoảng cách dưới cho container Checkbox
  },
  radioContainer: {
    flexDirection: 'row', // Sắp xếp theo hàng
    alignItems: 'center', // Căn giữa theo chiều dọc
    marginBottom: 8, // Khoảng cách dưới cho container RadioButton
  },
  label: {
    marginLeft: 8, // Khoảng cách bên trái cho nhãn
  },
  image: {
    width: 150, // Chiều rộng cho hình ảnh
    height: 150, // Chiều cao cho hình ảnh
    marginTop: 16, // Khoảng cách trên cho hình ảnh
  },
});

// Xuất thành phần chính
export default CheckboxRadioImageScreen;
