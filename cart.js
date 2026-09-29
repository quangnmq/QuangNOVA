(() => {
    const storageKey = 'ketAnYenCart';
    const products = {
        'moonlight': {
            name: 'Vòng tay Nguyệt Quang',
            detail: 'Đá tự nhiên / Handmade',
            price: 690000,
            image: 'https://images.unsplash.com/photo-1744189178734-0f8dee037c59?auto=format&fit=crop&w=900&q=85',
            alt: 'Vòng tay Nguyệt Quang kết từ hạt sáng màu'
        },
        'silver-line': {
            name: 'Vòng tay Silver Line',
            detail: 'Bạc 925 / 2 kích thước',
            price: 1190000,
            image: 'https://images.unsplash.com/photo-1581522723372-e1a239e7ed2d?auto=format&fit=crop&w=900&q=85',
            alt: 'Vòng tay Silver Line bằng bạc trên nền sáng'
        },
        'lucky-clover': {
            name: 'Vòng tay Lucky Clover',
            detail: 'Charm men đen / Mạ vàng 18K',
            price: 1490000,
            image: 'https://images.unsplash.com/photo-1770907759900-04bffc7aaec9?auto=format&fit=crop&w=900&q=85',
            alt: 'Vòng tay Lucky Clover với charm cỏ bốn lá đen'
        },
        'dragon-scale': {
            name: 'Vòng tay Dragon Scale',
            detail: 'Bạc cổ / Unisex',
            price: 1890000,
            image: 'https://images.unsplash.com/photo-1681091639096-a7b2eb1d4990?auto=format&fit=crop&w=900&q=85',
            alt: 'Vòng tay Dragon Scale chạm khắc tinh xảo'
        }
        'thach-anh-trang': { name: 'Vòng tay Thạch Anh Trắng', detail: 'Thạch anh trắng tự nhiên / Trong sáng', price: 1290000, image: 'https://images.pexels.com/photos/9660452/pexels-photo-9660452.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Vòng tay đá Thạch Anh Trắng' },
        'thach-anh-hong': { name: 'Vòng tay Thạch Anh Hồng', detail: 'Thạch anh hồng / Dịu dàng', price: 1490000, image: 'https://images.pexels.com/photos/11352700/pexels-photo-11352700.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Vòng tay đá Thạch Anh Hồng' },
        'thach-anh-tim': { name: 'Vòng tay Thạch Anh Tím', detail: 'Amethyst tự nhiên / Sắc tím sâu', price: 1690000, image: 'https://images.pexels.com/photos/11126194/pexels-photo-11126194.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Vòng tay đá Thạch Anh Tím' },
        'ngoc-bich': { name: 'Vòng tay Ngọc Bích', detail: 'Ngọc bích thiên nhiên / Xanh thanh nhã', price: 2490000, image: 'https://images.pexels.com/photos/10973403/pexels-photo-10973403.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Vòng tay đá Ngọc Bích' },
        'ma-nao-do': { name: 'Vòng tay Mã Não Đỏ', detail: 'Mã não nguyên khối / Đỏ trầm ấm', price: 1390000, image: 'https://images.pexels.com/photos/6850295/pexels-photo-6850295.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Vòng tay đá Mã Não Đỏ' },
        'mat-ho': { name: 'Vòng tay Mắt Hổ Vàng Nâu', detail: 'Mắt hổ tự nhiên / Vân ánh kim', price: 1590000, image: 'https://images.pexels.com/photos/11335154/pexels-photo-11335154.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Vòng tay đá Mắt Hổ Vàng Nâu' },
        'lapis-lazuli': { name: 'Vòng tay Lapis Lazuli', detail: 'Lapis lazuli / Xanh lam điểm vàng', price: 2190000, image: 'https://images.pexels.com/photos/10835528/pexels-photo-10835528.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Vòng tay đá Lapis Lazuli' },
        'obsidian-den': { name: 'Vòng tay Obsidian Đen', detail: 'Obsidian tự nhiên / Đen bóng', price: 1290000, image: 'https://images.pexels.com/photos/6850295/pexels-photo-6850295.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Vòng tay đá Obsidian Đen' },
        'aquamarine': { name: 'Vòng tay Aquamarine', detail: 'Aquamarine / Xanh biển trong mát', price: 2890000, image: 'https://images.pexels.com/photos/11126194/pexels-photo-11126194.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Vòng tay đá Aquamarine' },
        'tourmaline-xanh': { name: 'Vòng tay Tourmaline Xanh', detail: 'Tourmaline tự nhiên / Xanh lục tuyển chọn', price: 3290000, image: 'https://images.pexels.com/photos/10973403/pexels-photo-10973403.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Vòng tay đá Tourmaline Xanh' }
    };

    const readCart = () => {
        try {
            const cart = JSON.parse(localStorage.getItem(storageKey) || '{}');
            return cart && typeof cart === 'object' ? cart : {};
        } catch {
            return {};
        }
    };

    const writeCart = (cart) => {
        localStorage.setItem(storageKey, JSON.stringify(cart));
        render();
    };

    const formatPrice = (price) => `${price.toLocaleString('vi-VN')}đ`;

    const render = () => {
        const cart = readCart();
        const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
        document.querySelectorAll('[data-cart-count]').forEach((badge) => {
            badge.textContent = count;
            badge.closest('a')?.setAttribute('aria-label', `Giỏ hàng có ${count} sản phẩm`);
        });

        const list = document.querySelector('[data-cart-items]');
        if (!list) return;

        const entries = Object.entries(cart).filter(([id, quantity]) => products[id] && quantity > 0);
        const empty = document.querySelector('[data-cart-empty]');
        const layout = document.querySelector('[data-cart-layout]');
        const checkoutNote = document.querySelector('[data-cart-checkout-note]');
        const subtotalElement = document.querySelector('[data-cart-subtotal]');
        const totalElement = document.querySelector('[data-cart-total]');
        list.replaceChildren();
        let subtotal = 0;

        entries.forEach(([id, quantity]) => {
            const product = products[id];
            const lineTotal = product.price * quantity;
            subtotal += lineTotal;
            const item = document.createElement('article');
            item.className = 'cart-item';
            item.innerHTML = `
                <img src="${product.image}" alt="${product.alt}">
                <div class="cart-item-info">
                    <h2>${product.name}</h2>
                    <p>${product.detail}</p>
                    <strong>${formatPrice(product.price)}</strong>
                </div>
                <div class="cart-item-controls" aria-label="Số lượng ${product.name}">
                    <button type="button" data-quantity="-1" data-id="${id}" aria-label="Giảm số lượng">−</button>
                    <span>${quantity}</span>
                    <button type="button" data-quantity="1" data-id="${id}" aria-label="Tăng số lượng">+</button>
                </div>
                <strong class="cart-line-total">${formatPrice(lineTotal)}</strong>
                <button class="cart-remove" type="button" data-remove="${id}" aria-label="Xóa ${product.name}"><i class="bi bi-trash3" aria-hidden="true"></i></button>`;
            list.append(item);
        });

        if (empty) empty.hidden = entries.length > 0;
        if (layout) layout.hidden = entries.length === 0;
        if (checkoutNote) checkoutNote.hidden = entries.length === 0;
        if (subtotalElement) subtotalElement.textContent = formatPrice(subtotal);
        if (totalElement) totalElement.textContent = formatPrice(subtotal);
    };

    document.addEventListener('click', (event) => {
        const addButton = event.target.closest('[data-add-to-cart]');
        const quantityButton = event.target.closest('[data-quantity]');
        const removeButton = event.target.closest('[data-remove]');
        const cart = readCart();

        if (addButton) {
            const id = addButton.dataset.addToCart;
            cart[id] = (cart[id] || 0) + 1;
            writeCart(cart);
            const previous = addButton.innerHTML;
            addButton.innerHTML = 'Đã thêm <i class="bi bi-check2" aria-hidden="true"></i>';
            window.setTimeout(() => { addButton.innerHTML = previous; }, 1200);
        } else if (quantityButton) {
            const id = quantityButton.dataset.id;
            cart[id] = (cart[id] || 0) + Number(quantityButton.dataset.quantity);
            if (cart[id] <= 0) delete cart[id];
            writeCart(cart);
        } else if (removeButton) {
            delete cart[removeButton.dataset.remove];
            writeCart(cart);
        }
    });

    window.addEventListener('storage', render);
    render();
})();
