class Apifeatures{
    constructor(queryObj , query) {
        this.queryObj = queryObj
        this.query = query

        }

    pagination(){
        if(Number(this.queryObj.page)){
            this.query.offset = (this.queryObj.page - 1) * 5
            this.query.limit = 5;
        }
        return this
    }
}

module.exports = Apifeatures;