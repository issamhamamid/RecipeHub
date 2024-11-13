const { EntitySchema } = require("typeorm");

const Recipe = new EntitySchema({
    name: "Recipe",
    tableName: "recipe",
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
        description: {
            type: "text",
        },
        instructions: {
            type: "text",
        },
        image_url: {
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
        created_at: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
        },
        user_id: {
            type: "int",
        },
        isVegan: {
            type: "boolean",
        },
        prep_time: {
            type: "int",
        },
        cookTime: {
            type: "int",
        },
        number_of_servings: {
            type: "int",
        },
    },
    relations: {
        user: {
            type: "many-to-one",
            target: "User",
            joinColumn: {
                name: "user_id",
            },
        },
    },
});

module.exports = Recipe;
