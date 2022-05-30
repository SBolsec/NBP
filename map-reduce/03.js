const map = function () {
    if (this.year >= 1900 && this.year <= 1915 && this.category !== "peace") {
        const value = {
            prizes: [{ year: this.year, category: this.category }],
        };

        this.laureates.forEach((laureat) => {
            const key = {
                firstname: laureat.firstname,
                surname: laureat.surname,
            };

            emit(key, value);
        });
    }
}

const reduce = function (key, values) {
    let rv = {
        prizes: [],
    };

    values.forEach((value) => {
        rv.prizes = rv.prizes.concat(value.prizes);
    });

    return rv;
}

const finalize = function (key, reducedValue) {
    reducedValue.prizes.sort((a, b) => parseInt(a.year) < parseInt(b.year));
    return reducedValue;    
}

db.nobelprizes.mapReduce(
    `function () {
        if (this.year >= 1900 && this.year <= 1915 && this.category !== "peace") {
            const value = {
                prizes: [{ year: this.year, category: this.category }],
            };
    
            this.laureates.forEach((laureat) => {
                const key = {
                    firstname: laureat.firstname,
                    surname: laureat.surname,
                };
    
                emit(key, value);
            });
        }
    }`,
    `function (key, values) {
        let rv = {
            prizes: [],
        };
    
        values.forEach((value) => {
            rv.prizes.concat(value.prizes);
        });
    
        return rv;
    }`,
    {
        finalize: `function (key, reducedValue) {
            reducedValue.prizes.sort((a, b) => a.year < b.year);
            return reducedValue;
        }`
    }
);