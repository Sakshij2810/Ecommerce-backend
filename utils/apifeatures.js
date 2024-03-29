// class ApiFeatures {
//   constructor(query, queryStr) {
//     this.query = query;
//     this.queryStr = queryStr;
//   }

//   search() {
//     const keyword = this.queryStr.keyword
//       ? {
//           name: {
//             $regex: this.queryStr.keyword,
//             $options: "i", //case-insensitive
//           },
//         }
//       : {};

//     //changing class query to search query with searching feature using keyword,
//     //because in product controller we are passing query as Product.find()
//     this.query = this.query.find({ ...keyword });

//     return this; //this = class ApiFeature , returning whole class
//   }

//   filter() {
//     // 1. CATEGORY FILTER

//     // copyping all queryStr
//     const queryCopy = { ...this.queryStr };

//     //Removing some fields for category
//     const removeFileds = ["keyword", "page", "limit"];
//     removeFileds.forEach((key) => delete queryCopy[key]); //deleting the keys from queryCopy

//     // 2. PRICE & RATING FILTER

//     let qureyStr = JSON.stringify(queryCopy);
//     qureyStr = qureyStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

//     this.query = this.query.find(JSON.parse(qureyStr));
//     // this.query = this.query.find(queryCopy)//queryCopy is already object so no need of curly brackets

//     return this;
//   }

//   pagination(resultPerPage) {
//     const currentPage = Number(this.queryStr.page) || 1;
//     const skip = (currentPage - 1) * resultPerPage;

//     this.query = this.query.limit(resultPerPage).skip(skip);

//     return this;
//   }
// }

// module.exports = ApiFeatures;
export default class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", //case-insensitive
          },
        }
      : {};

    //changing class query to search query with searching feature using keyword,
    //because in product controller we are passing query as Product.find()
    this.query = this.query.find({ ...keyword });

    return this; //this = class ApiFeature , returning whole class
  }

  filter() {
    // 1. CATEGORY FILTER

    // copyping all queryStr
    const queryCopy = { ...this.queryStr };

    //Removing some fields for category
    const removeFileds = ["keyword", "page", "limit"];
    removeFileds.forEach((key) => delete queryCopy[key]); //deleting the keys from queryCopy

    // 2. PRICE & RATING FILTER

    let qureyStr = JSON.stringify(queryCopy);
    qureyStr = qureyStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(qureyStr));
    // this.query = this.query.find(queryCopy)//queryCopy is already object so no need of curly brackets

    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = (currentPage - 1) * resultPerPage;

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}
