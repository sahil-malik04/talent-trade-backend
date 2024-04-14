const { verifyAuthToken } = require("../utils/common");
const {
  getWorshopsUser,
  addWorshopUser,
} = require("../services/workshopService");

module.exports = {
  getWorshops,
  addWorshop,
};

async function getWorshops(req, res) {
  try {
    const authData = await verifyAuthToken(req.headers?.authorization);
    const result = await getWorshopsUser(authData);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function addWorshop(req, res) {
  try {
    const authData = await verifyAuthToken(req.headers?.authorization);
    const payload = req.body;
    const result = await addWorshopUser(authData, payload);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
}
