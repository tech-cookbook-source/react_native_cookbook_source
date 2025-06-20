import { useState } from 'react';

// Hàm xử lý logic cho appointment
const AppointmentLogic = () => {
    const [appointments, setAppointments] = useState([]);
    const [date, setDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [appointmentText, setAppointmentText] = useState('');

    const addAppointment = (selectedDate) => {
        setAppointments((prev) => [
            ...prev,
            {
                id: Date.now(),
                date: selectedDate,
                text: appointmentText
            }
        ])
    };

    const handleConfirm = (selectedDate) => {
        setDatePickerVisibility(false); // Ẩn trình chọn ngày
        if (selectedAppointment) {
            // Nếu có lịch hẹn đang được chỉnh sửa
            const updatedAppointments = appointments.map(appointment =>
            appointment.id === selectedAppointment.id
                ? { ...appointment, date: selectedDate, text: appointmentText }
                : appointment
            );
            setAppointments(updatedAppointments); // Cập nhật danh sách lịch hẹn
            setSelectedAppointment(null); // Đặt lại lịch hẹn đang chọn
        } else {
            // Nếu không, thêm lịch hẹn mới
            addAppointment(selectedDate);
        }
        setDate(selectedDate); // Cập nhật ngày đã chọn
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const editAppointment = (appointment) => {
        setSelectedAppointment(appointment);
        setDate(appointment.date);
        setAppointmentText(appointment.text);
        showDatePicker();
    };

    const deleteAppointment = (id) => {
        setAppointments((prev) => 
            prev.filter(appointment => appointment.id !== id)
        )
    };

    return {
        appointments,
        date,
        isDatePickerVisible,
        handleConfirm,
        showDatePicker,
        appointmentText,
        setAppointmentText,
        editAppointment,
        deleteAppointment,
        setDatePickerVisibility
    }

};

export default AppointmentLogic;
