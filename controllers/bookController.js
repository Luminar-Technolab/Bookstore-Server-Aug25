const books = require('../models/bookModel')

//add book
exports.addBookController = async (req,res)=>{
    console.log("Inside addBookController");
    //get data from  req body
    const {title,author,pages,imageURL,price,discountPrice,abstract,publisher,language,isbn,category} = req.body
    const uploadImg = req.files.map(item=>item.filename)
    const sellerMail = req.payload
    console.log(title,author,pages,imageURL,price,discountPrice,abstract,publisher,language,isbn,category,uploadImg,sellerMail);

    try{
        const existingBook  = await books.findOne({title,sellerMail})
        if(existingBook){
            res.status(401).json("Book Already exists!!! Request failed...")
        }else{
            const newBook = await books.create({
                title,author,pages,imageURL,price,discountPrice,abstract,publisher,language,isbn,category,uploadImg,sellerMail
            })
            res.status(200).json(newBook)
        }
    }catch(error){
        console.log(error);
        res.status(500).json(error)        
    }
}