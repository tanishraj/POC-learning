var cartBody = document.querySelector('.cart-body');

cartBody.addEventListener('click', function(evt){
	var element = evt.target.classList[0];
	var productQuantity = event.target.parentNode.parentNode.previousElementSibling;

	var totalPrice  = $('.cart-footer .total-amount').text();
	var currentItemPrice = $(event.target).closest('.product-items').find('.product-amount').text();


	console.log("Total price is  = ", currentItemPrice);

	if(element == "increment"){
		var incrementInput = event.target.previousElementSibling;
		currentValue = ++incrementInput.value;
		totalPrice = parseInt(totalPrice) + parseInt(currentItemPrice);

		productQuantity.querySelector('.product-quantity').textContent = currentValue;
		
	} else if(element == "decrement"){
		var decrementInput = event.target.nextElementSibling;
		currentValue = --decrementInput.value;
		
		productQuantity.querySelector('.product-quantity').textContent = currentValue;

		totalPrice = parseInt(totalPrice) - parseInt(currentItemPrice);
	}

	$('.cart-footer .total-amount').text(totalPrice);
})

$('.remove').click(function(){
	$(this).closest('.product-items').remove();
})