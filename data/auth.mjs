// 회원 가입 정보
import MongoDB from "mongodb";
// import { getUsers } from "../db/database.mjs";
import { userVirtualId } from "../db/database.mjs";
import mongoose from "mongoose";

// const ObjectID = MongoDB.ObjectId;

// versionKey: mongoose 가 문서를 저장할때 자동으로 추가하는 -v라는 필드를 설정
/*
  {
    "_id": "3124546",
    "userid:"apple
    _v
  }
*/
const userSchema = new mongoose.Schema(
  {
    userid: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    url: String,
  },
  { versionKey: false }
);

userVirtualId(userSchema);
const User = mongoose.model("User", userSchema);

// 사용자 아이디에 대한 사용자를 리턴
export async function createUser(user) {
  return new User(user).save().then((data) => data.id); // 데이터를 저장 후
}

// 로그인
// export async function login(userid, password) {
//   const user = users.find(
//     (user) => user.userid === userid && user.password === password
//   );
//   return user;
// }

export async function findByUserid(userid) {
  return User.findOne({ userid });
}

export async function findById(id) {
  return User.findById(id);
}

// function mapOptionalUser(user) {
//   return user ? { ...user, id: user._id.toString() } : user;
// }
