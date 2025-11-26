// import MongoDB, { ReturnDocument } from "mongodb";
import * as UserRepository from "./auth.mjs";
// import { getPosts } from "../db/database.mjs";
import mongoose from "mongoose";
import { userVirtualId } from "../db/database.mjs";

// const ObjectID = MongoDB.ObjectId;
const postSchema = new mongoose.Schema(
  {
    text: { type: String, require: true },
    userIdx: { type: String, require: true },
    name: { type: String, require: true },
    userid: { type: String, require: true },
    url: String,
  },
  { timestamps: true }
);

userVirtualId(postSchema);
const Post = mongoose.model("Post", postSchema);

// 모든 포스트를 리턴
export async function getALL() {
  return Post.find().sort({ createdAt: -1 });
}

// 사용자 아이디에 대한 포스트를 리턴
export async function getALLByUserid(userid) {
  return Post.find({ userid }).sort({ createdAt: -1 });
}

// 글번호에 대한 포스트를 리턴
export async function getById(id) {
  return Post.findById(id);
}

// 포스트 작성
export async function create(text, id) {
  return UserRepository.findById(id).then((user) =>
    new Post({
      text,
      userIdx: id,
      name: user.name,
      userid: user.userid,
      url: user.url,
    }).save()
  );
}

// 포스트를 변경
export async function update(id, text) {
  return Post.findByIdAndUpdate(id, { text }, { returnDocument: "after" });
}

//포스트 삭제하기
export async function remove(id) {
  return Post.findByIdAndDelete(id);
}

// function mapOptionalPost(post) {
//   return post ? { ...post, id: post._id.toString() } : post;
// }
