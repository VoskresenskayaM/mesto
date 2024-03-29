# Проект: Mesto

## Описание
Mesto: интерактивная страница, куда можно добавлять фотографии, удалять их и ставить лайки

## Применяемые технологии 
1. Для построения сеток и размещения элементов в соответствии с макетом
использованы технологии Flex и Grid

2. Для работы использовался дизайн макет, выполненный в Фигма. Для проверки 
расхождений верстки с макетом и приведение в соответсвие, использовался плагин PerfectPixel

3. Для корректного отображения на различных устройствах использовались медиазапросы. Точки перелома 1280px, 1024px, 768px, 320px
Строились запросы по принципу Mobile First.

4. Файловая структура проекта выполнена по БЭМ

5. При загрузке страницы карточки подгружаются средсвами JavaScript

6. Разработан функционал добавления и удаления карточек, также добавлена возможность лайкать карточку

7. На странице выполенно 3 попапа: редактирования данных профиля, добавления карточки и просмотра фотографий

8. JS код разбит на два класса Card и FormValidator.
Класс Card создаёт карточку с текстом и ссылкой на изображение:
принимает в конструктор её данные и селектор её template-элемента;
содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
содержит приватные методы для каждого обработчика;
содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки
Класс FormValidator настраивает валидацию полей формы:
принимает в конструктор объект настроек с селекторами и классами формы;
принимает вторым параметром элемент той формы, которая валидируется;
имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
имеет публичный метод enableValidation, который включает валидацию формы.

9. Выполнен рефакторинг кода: код разбит на классы и настроены связи между ними.
Section отвечает за отрисовку элементов на странице.
Popup  отвечает за открытие и закрытие попапа.
PopupWithImage наследуется  от Popup и отвечает за работу попапов с изображением.
PopupWithImage наследуется  от Popup и отвечает за работу попапов с формами.
UserInfo отвечает за управление отображением информации о пользователе на странице.

11. Настроенна сборка Вебпаком

12. https://voskresenskayam.github.io/mesto/


