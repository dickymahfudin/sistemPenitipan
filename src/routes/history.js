var express = require("express");
var router = express.Router();
const { user, kartu, history } = require("../models");

router.get("/", async (req, res, next) => {
  const tempHistorys = await history.findAll({
    include: [{ model: user, as: "user" }],
  });

  const historys = tempHistorys.map((history) => {
    return {
      name: history.user.name,
      expired: history.user.expired,
      loker: history.loker,
      status: !history.status ? "process" : "done",
      tanggal_masuk: history.createdAt,
      tanggal_keluar: history.updatedAt,
    };
  });
  console.log(historys);
  res.json({
    data: historys,
  });
});

router.get("/user", async (req, res, next) => {
  const { uid } = req.query;
  if (!uid) {
    res.json({
      status: "error",
      message: "harap isi UID",
    });
  }

  const findUsers = await user.findOne({ where: { uid } });
  if (!findUsers) {
    const findkartu = await kartu.findByPk(1);
    await findkartu.update({ name: uid });
    return res.status(404).json({
      status: "error",
      message: "UID Berasil Ditambhkan",
    });
  }

  const findHistory = await history.findOne({
    where: { user_id: findUsers.id, status: false },
  });
  const date = new Date().getTime() >= new Date(findUsers.expired).getTime();
  if (date) {
    return res.status(404).json({
      status: "error",
      message: "User Expired",
    });
  }
  const loker = findHistory ? findHistory.loker : 0;
  const loker_id = findHistory ? findHistory.id : 0;
  return res.status(200).json({
    status: "success",
    data: { id: findUsers.id, loker, loker_id },
  });
});

router.post("/", async (req, res, next) => {
  const { user_id, loker } = req.body;

  const create = await history.create({ user_id, loker });

  res.status(200).json({
    status: "success",
    data: create,
  });
});

router.put("/", async (req, res, next) => {
  const { id } = req.body;
  const findHistory = await history.findByPk(id);
  await findHistory.update({ status: true });

  res.status(200).json({
    status: "success",
  });
});

module.exports = router;
