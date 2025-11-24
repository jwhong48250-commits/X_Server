// 회원 가입 정보
import { db } from "../db/database.mjs";

// 사용자 아이디에 대한 사용자를 리턴
export async function createUser(user) {
  const { userid, password, name, email, url } = user;
  // const user = {
  //   id: Date.now().toString(),
  //   userid,
  //   password,
  //   name,
  //   email,
  //   url: "https://randomuser.me/api/portraits/men/29.jpg",
  // };
  // users = [user, ...users];
  return db
    .execute(
      "insert into users (userid, password, name, email, url) values (?, ?, ?, ?, ?)",
      [userid, password, name, email, url]
    )
    .then((result) => result[0].insertId);
}

// // 로그인
// export async function login(userid, password) {
//   const user = users.find(
//     (user) => user.userid === userid && user.password === password
//   );
//   return user;
// }

export async function findByUserid(userid) {
  return db
    .execute("select idx,password from users where userid=?", [userid])
    .then((result) => {
      console.log(result);
      return result[0][0];
    });
}

// id
export async function findById(idx) {
  return db
    .execute("select idx, userid from users where idx=?", [idx])
    .then((result) => result[0][0]);
}
