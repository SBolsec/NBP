const map = () => {
	if (this.payment && this.payment.payment_date && this.payment.amount && this.payment.amount > 3 && this.customer && this.customer.address && this.customer.address.country && this.film && this.film.length && this.film.length > 120 && this.film.rental_rate && this.film.rental_rate > 3) {
		const key = { country: this.customer.address.country };
		const value = {
			count: 1,
			amount: this.payment.amount,
		};

		emit(key, value);
	}
}

const reduce = (key, values) => {
	let newValue = {
		count: 0,
		amount: 0,
	};

	values.forEach((value) => {
		newValue.count += value.count;
		newValue.amount += value.amount;
	});

	return newValue;
}

const finalize = (key, reduced) => {
	return {
		...reduced,
		amount = reduced.amount.toFixed(2),
	}
}

db.dvdrent.mapReduce(
	`function() {
		if (this.payment && this.payment.amount > 3 && this.customer && this.customer.address && this.customer.address.country 
          && this.film && this.film.length > 120 && this.film.rental_rate > 3) {
			const key = { country: this.customer.address.country };
			const value = {
				count: 1,
				amount: this.payment.amount,
			};
	
			emit(key, value);
		}
	}`,
	`function(key, values) {
		let newValue = {
			count: 0,
			amount: 0,
		};
	
		values.forEach((value) => {
			newValue.count += value.count;
			newValue.amount += value.amount;
		});
	
		newValue.amount = Math.round(newValue.amount * 1000) / 1000;
		return newValue;
	}`
);