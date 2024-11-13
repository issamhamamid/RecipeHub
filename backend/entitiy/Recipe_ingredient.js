const { EntitySchema } = require("typeorm");

const Recipe_ingredient = new EntitySchema({
    name: "Recipe_ingredient",
    tableName: "recipe_ingredient",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        recipe_id : {
            type: "int"
        },
        quantity : {
            type : "int"
        }

    },
    relations: {
        Recipe: {
            type: "many-to-one",
            target: "Recipe",
            joinColumn: {
                name: "recipe_id",
            },
        },

        ingredient: {
            type: "many-to-one",
            target: "Ingredient",
            joinColumn: {
                name: "ingredient_id",
            },
        },
    },
});

module.exports = Recipe_ingredient;
