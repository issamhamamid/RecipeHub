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
        // this.query.where = {}
        // if(['dessert' , 'breakfast' , 'lunch' , 'dinner' , 'snack'].includes(this.queryObj.category)){
        //     this.query.where.category = this.queryObj.category
        // }

        this.query.where = Object.fromEntries(
            Object.entries(this.queryObj).filter(([key, value]) => this.valid_attr.includes(key)
            )
        )
        return this
    }


}

module.exports = Apifeatures;