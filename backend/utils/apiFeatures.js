class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString
  }

  search() {

    const keyword = this.queryString.keyword ? {
      name: {
        $regex: this.queryString.keyword,
        $options: 'i'
      }
    } : {}

    this.query = this.query.find(keyword);
    //return this.query;
    return this
  }



  filter()
  {

    const queryStringCopy = {...this.queryString}
    //remove field from query
    const removeFields = ['keyword' , 'limit','page']
    removeFields.forEach((item) => { delete queryStringCopy[item]
    });


    let queryStr = JSON.stringify(queryStringCopy)
    const regex = /\b(gt|gte|lt|lte|in)\b/g;
    queryStr = queryStr.replace(regex, '$$' + "$1");

    queryStr  = JSON.parse(queryStr)
    //Advance filter for price ,   rating

    this.query = this.query.find(queryStr)
    return this;



  }

  pagination(resultsPerPage)
  {
    const currentPage = Number(this.queryString.page)||1;
    const skip = resultsPerPage * (currentPage - 1) //Page2 11-20
    this.query = this.query.limit(resultsPerPage).skip(skip);
    return this;
  }


}

module.exports = APIFeatures
