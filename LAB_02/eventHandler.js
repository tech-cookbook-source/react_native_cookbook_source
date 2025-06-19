import { useState } from 'react';

export const useEventHandlers = () => {
  const [inputValue, setInputValue] = useState(''); // Trạng thái cho textInput
  const [textValue, setTextValue] = useState(''); // Trạng thái cho textView

  const handleButtonClick = () => {
    alert('Button clicked!'); // Hiển thị thông báo khi button được nhấn
  };

  const handleTextClick = () => {
    alert('Text clicked!'); // Hiển thị thông báo khi Text được nhấn
  };

  const handleInputChange = (text) => {
    setInputValue(text); // Cập nhật giá trị cho textInput
  };

  const handleTextViewClick = () => {
    setTextValue(inputValue); // Cập nhật giá trị cho TextView từ textInput
    alert(textValue)
  };

  return {
    inputValue,
    textValue,
    handleButtonClick,
    handleTextClick,
    handleInputChange,
    handleTextViewClick,
  };
};
