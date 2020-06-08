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

//get customer data by adminId
router.post("/getcustomer/:adminId", (req, res, next) => {
  const adminId = req.params.adminId;
  Customer.find({ adminId: adminId })
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        customer_info: docs.map((doc) => {
          return {
            fullname: doc.fullname,
            phone: doc.phone,
            address: doc.address,
            updated: doc.updated,
            adminId: doc.adminId,
            _id: doc._id,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//get all results
// router.get("/get", (req, res) => {
//   const creatorId = req.params.userId;
//   Customer.find({ creator: creatorId })
//     .exec()
//     .then((docs) => {
//       const response = {
//         count: docs.length,
//         customerinfo: docs.map((doc) => {
//           return {
//             fullname: doc.fullname,
//             phone: doc.phone,
//             address: doc.address,
//             dateofbirth: doc.dateofbirth,
//             adminid: doc.adminid,
//             _id: doc._id,
//           };
//         }),
//       };
//       if (docs.length >= 0) {
//         res.status(200).json(response);
//       } else {
//         res.status(404).json({
//           message: "No entries found",
//         });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

module.exports = router;
