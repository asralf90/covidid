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
    .sort({ updated: "descending" })
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

const start = new Date();
start.setHours(0, 0, 0, 0);
const end = new Date();
end.setHours(23, 59, 59, 999);

//if use moment()
// const start = moment().startOf("day");
// const end = moment().endOf("day");

//get chart info
router.post("/getcustomerchart/:adminId", (req, res, next) => {
  const adminId = req.params.adminId;
  Customer.aggregate([
    {
      $facet: {
        today: [
          {
            $match: {
              $and: [
                { adminId: adminId },
                { updated: { $gte: start, $lte: end } },
              ],
            },
          },
          { $count: "count" },
        ],
        // lastMonth: [
        //   { $match: { updated: { $gte: lastMonthFromToday, $lte: today } } },
        //   { $count: "count" },
        // ],
        all: [{ $match: { adminId: adminId } }, { $count: "count" }],
      },
    },
  ])
    // .sort({ updated: "descending" })
    // .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        customer_info: docs.map((doc) => {
          return {
            today: doc.today,
            all: doc.all,
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

module.exports = router;
