import { config } from "../config.mjs";
// import MongoDB from "mongodb";
import Mongoose from "mongoose";

export async function connectDB() {
  return Mongoose.connect(config.db.host, {
    dbName: "aidetect",
  });
}

// export function getUsers() {
//   return db.collection("users");
// }
// export function getPosts() {
//   return db.collection("posts");
// }

// 스키마에 기능을 추가
// _id 값을 문자열로 변환한 id 라는 가상 필드 생서
// JSON 또는 객체 변환시(응답 보낼떄 ) virtual 필드도 포함하도록 설정
export function userVirtualId(schema) {
  schema.virtual("id").get(function () {
    return this._id.toString();
  });
  schema.set("toJSON", { Virtual: true });
  schema.set("toObject", { Virtual: true });
}
