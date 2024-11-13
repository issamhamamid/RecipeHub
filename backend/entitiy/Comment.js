const { EntitySchema } = require("typeorm");

const Comment = new EntitySchema({
    name: "Comment",
    tableName: "comment",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        content : {
            type : "varchar",
        },

        created_at : {
          type : "datetime",
            default: () => "CURRENT_TIMESTAMP",
        },

        user_id : {
            type : "int",
        },

        recipe_id : {
            type : "int",
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

        User: {
            type: "many-to-one",
            target: "User",
            joinColumn: {
                name: "user_id",
            },
        },
    },
});

module.exports = Comment;
