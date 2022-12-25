const messageModel = require("../models/messageModel");

module.exports.addMsg = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;

    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) return res.json({ msg: "msg added succesfully" });
    return res.json({ msg: "msg failed" });
  } catch (error) {
    next(error);
  }
};
module.exports.getAllMsg = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });
      console.log("messages box ",messages);
    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    res.json(projectMessages);

  } catch (error) {
    next(error);
    console.log(error);
  }
};
