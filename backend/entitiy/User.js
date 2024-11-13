const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "User", // Will use table name `category` as default behaviour.
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        username: {
            type: "varchar",
        },
        email: {
            type: "varchar",
        },
        password : {
            type: "varchar",
        },
        role: {
            type: "enum",
            enum: ["user", "admin"],
            default: "user",
        },
        updatedAt: {
            type: "datetime",
            default: () => "CURRENT_TIMESTAMP",
        },


    },
})

