

// Функция для обновления счетчика в корзине
function updateCartCounter() {
    const cartItems = JSON.parse(getCookie('cart') || '[]');
    const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-counter').textContent = totalCount;
}

// Основная логика добавления товара в корзину
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-buy');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const card = button.closest('.card');
            const title = card.querySelector('.card-title').textContent;
            const price = parseInt(card.querySelector('.card-text').textContent.replace('$', ''));
            const image = card.querySelector('img').src; // Получаем путь к изображению

            // Получаем текущую корзину из куки
            let cart = JSON.parse(getCookie('cart') || '[]');

            // Проверяем, есть ли уже этот товар в корзине
            const existingItem = cart.find((item) => item.title === title);

            if (existingItem) {
                // Увеличиваем количество товара
                existingItem.quantity += 1;
            } else {
                // Добавляем новый товар с изображением
                cart.push({ title, price, quantity: 1, image });
            }

            // Сохраняем обновленную корзину в куки
            setCookie('cart', cart, 7);

            // Обновляем счетчик в шапке
            updateCartCounter();
        });
    });

    // Обновляем счётчик при загрузке страницы
    updateCartCounter();
});
