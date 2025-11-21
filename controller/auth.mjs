import express from "express";
import * as authRepository from "../data/auth.mjs";

// 회원 정보 가져오기
// export async function getAuth(req, res, next) {
//   const userid = req.query.userid;
//   const data = await (userid
//     ? authRepository.getALLByUserid(userid)
//     : authRepository.getALL());
//   res.status(200).json(data);
// }

// 회원 가입
export async function signup(req, res, next) {
  const { userid, password, name, email } = req.body;
  const user = await authRepository.createUser(userid, password, name, email);
  if (user) {
    res.status(201).json(user);
  }
}

// 로그인
export async function login(req, res, next) {
  const { userid, password } = req.body;
  const user = await authRepository.login(userid, password);
  if (user) {
    res.status(200).json({ message: `${userid}님 로그인 완료!` });
  } else {
    res
      .status(404)
      .json({ message: `${userid}님 아이디 또는 비밀번호를 확인하세요` });
  }
}
