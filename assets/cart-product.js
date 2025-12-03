function changeVariantProductCart() {
    const cartContainer = document.querySelector('cart-form');

    if (!cartContainer) return;

    cartContainer.addEventListener('change', function(event) {
        if (event.target && event.target.matches('.variant-option-select')) {
            const cartItem = event.target.closest('.cart-item'); 
            if (!cartItem) return;

            const variantsDataElement = cartItem.querySelector('.product-variants-data');
            if (!variantsDataElement) return;

            const currentVariantId = cartItem.dataset.idCurrent;
            const productVariants = JSON.parse(variantsDataElement.textContent);
            const selects = cartItem.querySelectorAll('.variant-option-select');
            
            const selectedValues = Array.from(selects).map(select => select.value);

            const matchedVariant = productVariants.find(variant => {
                return selectedValues.every((value, i) => variant[`option${i + 1}`] === value);
            });

            if (!matchedVariant) {
                console.warn('No matching variant found.');
                return;
            }

            const formData = {
                items: [{
                    id: matchedVariant.id,
                    quantity: 1 
                }]
            };
            

            let updates = {
                [currentVariantId]: 0
            };
            
            fetch(window.Shopify.routes.root + 'cart/update.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ updates })
            })
                .then(response => {
                    if (!response.ok) throw new Error('Update failed');
                    return response.json();
                })
                .then(() => {
                    fetch(window.Shopify.routes.root + 'cart/add.js', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    })
                        .then(res => {
                            if (!res.ok) throw new Error('Add failed');
                            return res.json();
                        })
                        .then(data => console.log('Variant changed successfully:', data))
                        .catch(error => console.error('Error add to cart:', error))
                        .finally(() => {
                            window.refreshCart(); 
                        });
                })
                .catch((error) => {
                    console.error('Error updating cart:', error);
                });
                
        }
    });
};

changeVariantProductCart();