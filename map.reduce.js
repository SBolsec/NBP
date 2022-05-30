
db.dvdrent.mapReduce (
    `function() {
        const value = {
            categories: this.film.categories.map(c => c.name).sort(),
            films: [this.film.title],
        };
    
        if (value.categories.length > 1 && this.film.actors) {
            this.film.actors.forEach(actor => {
                emit({ 
                    id: actor.actor_id,
                    fullname: [actor.first_name, actor.last_name].join(" "),
                }, value);
            });
        }
    };`,
    `function(key, values) {
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }
    
        let result = {
            categories: [],
            films: [],
        };
    
        values.forEach((value) => {
            result = {
                categories: [...result.categories, ...value.categories].sort().filter(onlyUnique),
                films: [...result.films, ...value.films].sort().filter(onlyUnique),
            };
        });
    
        return result;
    };`
);
