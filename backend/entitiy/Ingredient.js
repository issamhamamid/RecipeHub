const { EntitySchema } = require("typeorm");

const Ingredient = new EntitySchema({
    name: "Ingredient",
    tableName: "ingredient",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
            length: 255,
        },

        calories: {
            type: "int",
        },
        protein: {
            type: "int",
        },
        fat: {
            type: "int",
        },
        carbs: {
            type: "int",
        },

    },

});

module.exports = Ingredient;
