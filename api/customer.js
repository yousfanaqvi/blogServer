const express = require("express");
const router = express.Router();

/**
 * GET product list.
 *
 * @return product list | empty.
 */
 router.get("/", async (req, res) => {
    res.send("home");
  });
  
router.get("/product", async (req, res) => {
  try {
    res.json({
      status: 200,
      message: "product",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

router.get("/customer", async (req, res) => {
    try {
      res.json({
        status: 200,
        message: "customer",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server error");
    }
  });
  
module.exports = router;
