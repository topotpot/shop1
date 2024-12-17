// Функция для обновления общей суммы
function updateTotalPrice() {
    const cartItems = JSON.parse(getCookie('cart') || '[]');
    let total = 0;

    cartItems.forEach(item => {
        total += item.price * item.quantity;
    });

    document.querySelector('.total_money_amount h5:last-child').textContent = `${total}$`;
}

// Функция для рендеринга товаров корзины
function renderCart() {
    const cartItems = JSON.parse(getCookie('cart') || '[]');
    const cartContainer = document.querySelector('.row.pt-5 > .col-12 > .row'); // Контейнер для товаров

    cartContainer.innerHTML = ''; // Очищаем старые элементы

    cartItems.forEach(item => {
        // Создаем строки для каждого товара
        const row = document.createElement('div');
        row.className = 'row mb-3 align-items-center pb-3 border-bottom'; // Добавляем класс для рамки

        // Название товара с изображением
        const titleCol = document.createElement('div');
        titleCol.className = 'col-7 d-flex align-items-center';

        // Изображение товара
        const img = document.createElement('img');
        img.src = item.image; // Путь к изображению из объекта товара
        img.alt = item.title;
        img.className = 'img-fluid me-3';
        img.style.width = '50px'; // Размер изображения
        img.style.height = '50px'; // Размер изображения

        // Название товара
        const title = document.createElement('span');
        title.textContent = item.title;

        titleCol.appendChild(img);
        titleCol.appendChild(title);

        // Поле ввода количества
        const quantityCol = document.createElement('div');
        quantityCol.className = 'col-2';
        const input = document.createElement('input');
        input.className = 'form-control quantity-input';
        input.type = 'number';
        input.min = '1';
        input.value = item.quantity;
        input.dataset.itemTitle = item.title;

        // Обновляем количество в куки при изменении
        input.addEventListener('input', (e) => {
            const newQuantity = parseInt(e.target.value);
            if (newQuantity >= 1) {
                const updatedCart = cartItems.map(cartItem => {
                    if (cartItem.title === item.title) {
                        cartItem.quantity = newQuantity;
                    }
                    return cartItem;
                });

                setCookie('cart', updatedCart, 7);
                renderCart(); // Обновляем интерфейс
            }
        });

        quantityCol.appendChild(input);

        // Цена за товар
        const priceCol = document.createElement('div');
        priceCol.className = 'col-2 fs-5 fw-medium';
        priceCol.textContent = `${item.price * item.quantity}$`;

        // Колонка с кнопкой удаления
        const removeCol = document.createElement('div');
        removeCol.className = 'col-1 text-center';
        const removeButton = document.createElement('button');
        removeButton.className = 'btn btn-sm fs-2 border border-0';
        removeButton.innerHTML = '&times;'; // Крестик

        // Удаление товара из корзины
        removeButton.addEventListener('click', () => {
            const updatedCart = cartItems.filter(cartItem => cartItem.title !== item.title);
            setCookie('cart', updatedCart, 7);
            renderCart(); // Обновляем интерфейс
        });

        removeCol.appendChild(removeButton);

        // Добавляем все элементы в строку
        row.appendChild(titleCol);
        row.appendChild(quantityCol);
        row.appendChild(priceCol);
        row.appendChild(removeCol);

        // Добавляем строку в контейнер
        cartContainer.appendChild(row);
    });

    // Обновляем общую стоимость
    updateTotalPrice();
    updateCartCounter();
}

// Запускаем рендеринг товаров при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});










