// App.js
// ПОЧЕМУ? Импортируем useState для управления состоянием поиска в родителе.
// Это позволяет централизованно фильтровать список услуг и передавать
// отфильтрованные данные вниз через props (one-way data flow).
import { useState } from "react";
import "./App.css";

// ПОЧЕМУ? Импортируем адаптивные компоненты под тему «бронирование помещений»,
// а не учебные примеры с курсами. Это обеспечивает соответствие ТЗ курсового проекта.
import ServiceCard from "./components/ServiceCard";
import GuestSelector from "./components/GuestSelector";
import ServiceSearch from "./components/ServiceSearch";

// ПОЧЕМУ? Данные вынесены в константу внутри App — в реальном проекте
// они будут загружаться из API или localStorage. Для учебной практики
// достаточно мок-данных, чтобы отработать работу с props и map().
// ПОЧЕМУ? Каждому объекту присвоен уникальный id — это требование React
// для корректной работы key при рендеринге списков через map().
const SERVICES = [
  {
    id: 1,
    serviceName: "Большой конференц-зал",
    specialist: "Администратор",
    price: "5000 BYN",
    status: "Популярно",
    address: "Минск, ул. Притыцкого, 60",
    capacity: 50,
  },
  {
    id: 2,
    serviceName: "Переговорная №2",
    specialist: "ИТ-отдел",
    price: "1000 BYN",
    status: "Свободно",
    address: "Минск, ул. Кульман, 5",
    capacity: 10,
  },
  {
    id: 3,
    serviceName: "Коворкинг-зона",
    specialist: "Общий доступ",
    price: "500 BYN",
    status: null, // null — для проверки условного рендеринга бейджа
    address: "Минск, пр. Независимости, 95",
    capacity: 20,
  },
  {
    id: 4,
    serviceName: "VIP-кабинет",
    specialist: "Персональный менеджер",
    price: "3000 BYN",
    status: "Новинка",
    address: "Минск, ул. Мельникайте, 2",
    capacity: 5,
  },
  {
    id: 5,
    serviceName: "Учебный класс",
    specialist: "Образовательный центр",
    price: "1500 BYN",
    status: "Свободно",
    address: "Минск, ул. Сурганова, 43",
    capacity: 30,
  },
];

// ПОЧЕМУ? Корневой компонент назван App — это конвенция Create React App.
// Он отвечает за композицию дочерних компонентов и управление глобальным
// состоянием (поиск, список услуг), но не за детали их отображения.
function App() {
  // ПОЧЕМУ? useState('') — начальное значение поиска пустая строка.
  // query — текущий текст, setQuery — функция обновления.
  // Хранение состояния в родителе позволяет синхронизировать поиск
  // с отображением списка (фильтрация) и другими компонентами.
  const [query, setQuery] = useState("");

  // ПОЧЕМУ? Фильтрация через .filter() + .toLowerCase() + .includes() —
  // безопасный способ поиска без учёта регистра. В реальном проекте
  // здесь может быть дебаунс или запрос к API.
  // ПОЧЕМУ? Проверка query.trim() предотвращает поиск по пустым пробелам.
  const filteredServices = SERVICES.filter(
    (service) =>
      query.trim() === "" ||
      service.serviceName.toLowerCase().includes(query.toLowerCase()) ||
      service.address.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="app">
      {/* Шапка приложения */}
      <header className="app-header">
        <h1>🏢 Система онлайн-бронирования помещений</h1>
        <p>
          Курсовой проект: Осадчий Игорь | Тема: бронирование залов и
          переговорных
        </p>
      </header>

      <main className="app-main">
        {/* Блок 1: Выбор количества гостей */}
        <section className="section">
          <h2>👥 Количество участников</h2>
          {/* ПОЧЕМУ? Гостевой селектор вынесен в отдельный компонент —
              он инкапсулирует логику +/- и не засоряет App. */}
          <GuestSelector />
        </section>

        {/* Блок 2: Поиск помещений */}
        <section className="section">
          <h2>🔍 Поиск помещения</h2>
          {/* ПОЧЕМУ? ServiceSearch — управляемый компонент: value и onChange
              передаются из App, чтобы состояние поиска было единым источником правды. */}
          <ServiceSearch value={query} onChange={setQuery} />
        </section>

        {/* Блок 3: Каталог помещений */}
        <section className="section">
          <h2>📋 Доступные помещения</h2>

          {/* ПОЧЕМУ? Условный рендеринг: если после фильтрации список пуст,
              показываем сообщение вместо пустой сетки — это улучшает UX. */}
          {filteredServices.length === 0 ? (
            <p>😔 Помещения по запросу «{query}» не найдены</p>
          ) : (
            <div className="course-grid">
              {/* ПОЧЕМУ? .map() с key={service.id} — обязательное требование React
                  для эффективного обновления списка. key должен быть уникальным
                  и стабильным (не индекс массива!). */}
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  serviceName={service.serviceName}
                  specialist={service.specialist}
                  price={service.price}
                  badge={service.status} // PRO: бейдж статуса
                  address={service.address}
                  capacity={service.capacity}
                />
              ))}
            </div>
          )}
        </section>

        {/* Блок 4: Список броней (заглушка для будущей работы с localStorage) */}
        <section className="section">
          <h2>📅 Ваши бронирования</h2>
          {/* ПОЧЕМУ? Заглушка с комментарием — подготовка к следующему этапу,
              когда будем реализовывать сохранение в localStorage. */}
          <p>
            <em>Здесь будет отображаться список броней из localStorage</em>
          </p>
          <ul className="student-list">
            <li>
              <strong>Демо-бронь:</strong> Переговорная №2, 15.10.2026, 14:00
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
