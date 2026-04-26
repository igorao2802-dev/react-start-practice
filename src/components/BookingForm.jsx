// BookingForm.jsx
// ПОЧЕМУ? Форма вынесена в отдельный компонент для соблюдения принципа
// единственной ответственности: ServiceCard отображает данные, BookingForm
// отвечает за сбор и валидацию данных бронирования.
// ПОЧЕМУ? На данном этапе практики форма упрощена — в реальном проекте
// здесь будет react-hook-form + zod для валидации, как в исходной заготовке.
import React, { useState } from "react";

// ПОЧЕМУ? Компонент принимает roomData через props — это позволяет
// передавать информацию о выбранном помещении без дублирования данных.
const BookingForm = ({ roomData }) => {
  // ПОЧЕМУ? Локальный state для полей формы — подготовка к управляемым компонентам.
  // В полноценной версии здесь будет объект состояния со всеми полями формы.
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    guests: 1
  });

  // ПОЧЕМУ? Обработчик onChange обновляет состояние формы — это основа
  // управляемого компонента, где React контролирует значения инпутов.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ПОЧЕМУ? Заглушка onSubmit — в реальном проекте здесь будет
  // валидация, отправка данных и сохранение в localStorage.
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Бронирование:', { ...formData, room: roomData?.serviceName });
    // TODO: Добавить валидацию и сохранение в localStorage
  };

  return (
    <div className="form_wrapper">
      <form onSubmit={handleSubmit} className="booking_form">
        <h3>Бронирование: {roomData?.serviceName || 'Помещение'}</h3>
        
        <label>
          Ваше имя:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Иван Иванов"
            required
            maxLength={50}
          />
        </label>

        <label>
          Дата:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Время:
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Участники:
          <input
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            min="1"
            max="20"
          />
        </label>

        <button type="submit" disabled={!formData.name || !formData.date || !formData.time}>
          Забронировать
        </button>
      </form>
    </div>
  );
};

export default BookingForm;