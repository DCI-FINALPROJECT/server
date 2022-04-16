const Capacity = require("../Model/Capacity.model");

const addNewCapacity = async (req, res) => {
  try {
    const body = req.body;

    const capacity = {
      capacity: body.capacity,
      capacityName: body.capacity + " GB",
    };

    const newCapacity = await Capacity.create(capacity);

    res.status(200).json(newCapacity);
  } catch (err) {
    res.status(404).json({
      status: 404,
      message: err,
    });
  }
};

const getAllCapacities = async(req, res) => {
  try {

    const foundedCapacities = await Capacity.find({});

    res.status(200).json(foundedCapacities);

  } catch (err) {
    res.status(404).json({
      status: 404,
      message: err,
    });
  }
};

module.exports = { addNewCapacity,getAllCapacities };
