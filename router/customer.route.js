const express = require("express");
const Customer = require("../model/customer.model");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/add", (req, res, next) => {
  const customer = new Customer({
    _id: new mongoose.Types.ObjectId(),
    fullname: req.body.fullname,
    phone: req.body.phone,
    address: req.body.address,
    // dateofbirth: req.body.dateofbirth,
    adminId: req.body.adminId,
  });
  customer
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Customer info added successfully",
        createdDictionary: {
          fullname: result.fullname,
          phone: result.phone,
          address: result.address,
          dateofbirth: result.dateofbirth,
          adminId: result.adminid,
          _id: result._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//get all results
router.get("/get", (req, res) => {
  const creatorId = req.params.userId;
  Customer.find({ creator: creatorId })
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        customerinfo: docs.map((doc) => {
          return {
            fullname: doc.fullname,
            phone: doc.phone,
            address: doc.address,
            dateofbirth: doc.dateofbirth,
            adminid: doc.adminid,
            _id: doc._id,
          };
        }),
      };
      if (docs.length >= 0) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: "No entries found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/deleteword/:cardId", (req, res, next) => {
  const id = req.params.cardId;
  Customer.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Card deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// // router.get("/:productId", (req, res, next) => {
// //   const id = req.params.productId;
// //   Product.findById(id)
// //     .select("name price _id")
// //     .exec()
// //     .then((doc) => {
// //       console.log("From database", doc);
// //       if (doc) {
// //         res.status(200).json({
// //           product: doc,
// //           request: {
// //             type: "GET",
// //             url: "http://localhost:5000/dictionary/",
// //           },
// //         });
// //       } else {
// //         res
// //           .status(404)
// //           .json({ message: "No valid entry found for provided ID" });
// //       }
// //     })
// //     .catch((err) => {
// //       console.log(err);
// //       res.status(500).json({ error: err });
// //     });
// // });

// // router.patch("/:productId", (req, res, next) => {
// //   const id = req.params.productId;
// //   const updateOps = {};
// //   for (const ops of req.body) {
// //     updateOps[ops.propName] = ops.value;
// //   }
// //   Product.update({ _id: id }, { $set: updateOps })
// //     .exec()
// //     .then((result) => {
// //       res.status(200).json({
// //         message: "Product updated",
// //         request: {
// //           type: "GET",
// //           url: "http://localhost:5000/dictionary/" + id,
// //         },
// //       });
// //     })
// //     .catch((err) => {
// //       console.log(err);
// //       res.status(500).json({
// //         error: err,
// //       });
// //     });
// // });

// router.post("/auth/dictionary", (req, res) => {
//   const dictionary = new Dictionary(req.body);
//   req.session.dictionary = dictionary._id;
//   dictionary
//     .save()
//     .then((result) => {
//       res.json({
//         message: "Succesfully added data",
//         auth: true,
//       });
//     })
//     .catch((err) => {
//       res.json({
//         message: "Unable to add data",
//         auth: false,
//       });
//     });
// });

//deletes data
// router.delete("/auth/dictionary/:productId", (req, res) => {
//   const id = req.params.productId;
//   Dictionary.remove({ _id: id })
//     .exec()
//     .then((result) => {
//       res.status(200).json({
//         message: "Data deleted",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

//gets user data and words
// Handle incoming GET requests to /orders
// router.get("/auth/dictionary/all", (req, res) => {
//   User.find()
//     .select("email dictionaries _id")
//     .populate("dictionaries", "word meaning example language")
//     .exec()
//     .then((docs) => {
//       res.status(200).json({
//         count: docs.length,
//         data: docs.map((doc) => {
//           return {
//             _id: doc._id,
//             email: doc.email,
//             dictionaries: doc.dictionaries,
//           };
//         }),
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

//this is for JWT -install bcrypt
// router.post("/auth/signup", (req, res, next) => {
//   User.find({ email: req.body.email })
//     .exec()
//     .then((user) => {
//       if (user.length >= 1) {
//         return res.status(409).json({
//           message: "email exists",
//         });
//       } else {
//         bcrypt.hash(req.body.password, 10, (err, hash) => {
//           if (err) {
//             return res.status(500).json({
//               error: err,
//             });
//           } else {
//             const user = new User({
//               _id: new mongoose.Types.ObjectId(),
//               email: req.body.email,
//               password: hash,
//             });
//             user
//               .save()
//               .then((result) => {
//                 res.status(201).json({
//                   message: "User Created",
//                 });
//               })
//               .catch((err) => {
//                 res.status(500).json({
//                   error: err,
//                 });
//               });
//           }
//         });
//       }
//     });
// });

module.exports = router;
