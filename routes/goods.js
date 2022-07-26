// const { request } = require("express");
const express = require("express");
const Goods = require("../schemas/goods");
const Cart = require("../schemas/cart");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("this is root page");
});

/*
const goods = [
    {
      goodsId: 4,
      name: "상품 4",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
      category: "drink",
      price: 0.1,
    },
    {
      goodsId: 3,
      name: "상품 3",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
      category: "drink",
      price: 2.2,
    },
    {
      goodsId: 2,
      name: "상품 2",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
      category: "drink",
      price: 0.11,
    },
    {
      goodsId: 1,
      name: "상품 1",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
      category: "drink",
      price: 6.2,
    },
  ];
  */

router.get("/goods", async (req, res) => {
  const { category } = req.query;

  const goods = await Goods.find({ category });

  res.json({ goods });
});

router.get("/goods/:goodsId", async (req, res) => {
  const { goodsId } = req.params;

  const [detail] = await Goods.find({ goodsId: Number(goodsId) });

  // const [detail] = goods.filter((item) => item.goodsId === Number(goodsId)); 변수에서 필터링하던 코드

  res.json({
    detail,
  });
});


router.post("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existCarts = await Cart.find({ goodsId: Number(goodsId) });
  if (existCarts.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 장바구니에 들어있는 상품입니다. "});
  }

  await Cart.create({ goodsId: Number(goodsId), quantity });
  res.json({ success: true });
});

router.delete("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;

  const existCarts = await Cart.find({ goodsId: Number(goodsId) });
  if (existCarts.length) {
    await Cart.deleteOne({ goodsId: Number(goodsId) });
  }

  res.json({ success: true });

});

router.put("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  if ( quantity < 1) {
    return res.status(400).json({
      errorMessage: "1 이상의 값만 입력할 수 있습니다.",
    });
  }

  const existCarts = await Cart.find({ goodsId: Number(goodsId) });
  if (!existCarts.length) {
    return res.status(400).json({ success: false, errorMessage: "장바구니에 해당 상품이 없습니다. "});
  }

  await Cart.updateOne({ goodsId: Number(goodsId) }, { $set: { quantity }});

  res.json({ success: true });
});

router.post("/goods", async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body;

  const goods = await Goods.find({ goodsId });

  if (goods.length) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "이미 있는 데이터입니다." });
  }

  const createdGoods = await Goods.create({
    goodsId,
    name,
    thumbnailUrl,
    category,
    price,
  });
  console.log(createdGoods);

  res.json({ goods: createdGoods });
});

module.exports = router;
