import connectDb from "../../../middleware/db";
import Users from "../../../models/UserSchema";

const handler = async (req, res) => {
  try {
    let email = req.query.email;
    const user = await Users.findOne({ email: email });
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};

export default connectDb(handler);
