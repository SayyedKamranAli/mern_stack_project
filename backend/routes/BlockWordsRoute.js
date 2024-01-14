const express = require('express')
const { createBlockWords, getAllBlockWords,updateBlockWords } = require('../controllers/blockWordsController')
const { isAuthenticatedUser } = require('../middleware/auth')
const router = express.Router()

console.log("category route page working")

router.route('/createBlockWords').post(isAuthenticatedUser, createBlockWords)
router.route("/getAllBlockWords").get(isAuthenticatedUser, getAllBlockWords)
router.route('/updateBlockWordst/:id').put(isAuthenticatedUser, updateBlockWords)

//router.route('/getcategoryenumValues').get(isAuthenticatedUser, getCategoryEnumValues)


module.exports = router





// const express = require("express")
// const BlockWords = require("../models/BlockWords")


// const router = express.Router()

// router.post("/", async(req,res)=>{
//     try{

//         var data = BlockWords(req.body)
//         await data.save()
//         res.send({result:"Done",message:"Record is Created Successfully !!"})

//     }catch(error){
//         if(error.errors.words)
//         res.status(400).send({result:"Fial",message:error.errors.words.message})
//     else
//         res.status(500).send({result:"Done",message:"Internal Server Error!!"})
//     }
// })


// router.get("/",async(req,res)=>{
//     try{
//        var data = await BlockWords.find().sort({_id:-1})
//        res.send({result:"Done", total:data.length, data:data})
//     }catch(error){
//         res.status(500).send({result:"Fail",message:"Internal Server Error !!"})

//     }
// })


// router.put("/:_id",async(req,res)=>{
//     try{
//        var data = await BlockWords.findOne({_id:req.params._id})
//        if(data){
//        data.words = req.body.words??data.words
//        data.status = req.body.status??data.status
//        await data.save()
//        res.status(404).send({result:"Done",message:"Record is Update SuccessFully !!"})
//        }
//        else
//        res.status(404).send({result:"Fail",message:"No Record Found !!"})
       
//     }catch(error){
//         res.status(500).send({result:"Fail",message:"Internal Server Error !!"})

//     }
// })

// module.exports = router;