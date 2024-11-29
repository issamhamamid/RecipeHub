const {Op} = require("sequelize");

class Apifeatures{
    constructor(queryObj , query , valid_attr) {
        this.queryObj = queryObj
        this.query = query
        this.valid_attr = valid_attr
        }

    pagination(){
        if(Number(this.queryObj.page)){
            this.query.offset = (this.queryObj.page - 1) * 5
            this.query.limit = 5;
        }
        return this
    }

    filtering(){

        this.query.where = Object.assign( this.query.where ,Object.fromEntries(
            Object.entries(this.queryObj).filter(([key, value]) => this.valid_attr.includes(key)
            )
        ) )

        return this
    }

    search(){

        this.query.where = {}
        if(this.queryObj.search){
            this.query.where.name  = {
                [Op.iLike]: `%${this.queryObj.search}%`
            }
        }
        return this
    }


    nutritions() {
        const nutritionFields = ['calories', 'carbs', 'protein', 'fat'];

        nutritionFields.forEach(field => {
            if (this.queryObj[field]) {
                this.query.where[field] = {
                    [Op.between]: this.queryObj[field].split(",")
                };
            }
        });

        return this;
    }



}

module.exports = Apifeatures;