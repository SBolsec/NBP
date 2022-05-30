const map = function() {
    if (this.staff && this.payment && this.film && this.film.categories) {
        if (!this.staff.address || this.staff.address.country !== "United Kingdom") return;

        const key = {
            name: this.staff.first_name,
            lastname: this.staff.last_name,
        };

        let value = {};

        this.film.categories.forEach((category) => {
            value[category.name] = {
                count: 1,
                amount: this.payment.amount,
            };
        });

        emit(key, value);
    }
}

const reduce = function(key, values) {
    let newValues = {};

    values.forEach((value) => {
        for (category in value) {
            newValues[category] = {
                count: newValues[category] ? newValues[category].count + value[category].count : value[category].count,
                amount: newValues[category] ? newValues[category].amount + value[category].amount : value[category].amount,
            };
        }
    });

    return newValues;
}

const finalize = function(key, reducedValue) {
    let result = {
        totalAmount: 0,
    };

    for (category in reducedValue) {
        result[category] = {
            count: reducedValue[category].count,
            amount: Math.round(reducedValue[category].amount * 1000) / 1000,
        };
        result.totalAmount += reducedValue[category].amount;
    }

    result.totalAmount = Math.round(result.totalAmount * 1000) / 1000;

    return result;
}

db.dvdrent.mapReduce(
    `function() {
        if (this.staff && this.payment && this.film && this.film.categories) {
            if (!this.staff.address || this.staff.address.country !== "United Kingdom") return;

            const key = {
                name: this.staff.first_name,
                lastname: this.staff.last_name,
            };
    
            let value = {};
    
            this.film.categories.forEach((category) => {
                value[category.name] = {
                    count: 1,
                    amount: this.payment.amount,
                };
            });
    
            emit(key, value);
        }
    }`,
    `function(key, values) {
        let newValues = {};
    
        values.forEach((value) => {
            for (category in value) {
                newValues[category] = {
                    count: newValues[category] ? newValues[category].count + value[category].count : value[category].count,
                    amount: newValues[category] ? newValues[category].amount + value[category].amount : value[category].amount,
                };
            }
        });
    
        return newValues;
    }`,
    {
        finalize: `function(key, reducedValue) {
            let result = {};
        
            for (category in reducedValue) {
                result[category] = {
                    count: reducedValue[category].count,
                    amount: Math.round(reducedValue[category].amount * 1000) / 1000;
                };
                result.totalAmount += reducedValue[category].amount;
            }
        
            result.totalAmount = Math.round(result.totalAmount * 1000) / 1000;
        
            return result;
        }`,
    }
);
