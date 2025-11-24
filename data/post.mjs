import { db } from "../db/database.mjs";
// "select p.id, p.tpext, p.createAt, u.userid, u.name, url from users as
//  u join posts as p on u.idx = p.useridx odder by p.createdAt desc"
const SELECT_JOIN =
  "select p.id, p.text, p.createAt, u.userid, u.name, u.url from users as u join posts as p on u.idx = p.useridx";
const ORDER_DESC = "order by p.createAt desc";
const ORDER_ASC = "order by p.createAt asc";

// // 모든 포스트를 리턴
export async function getALL() {
  return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0]);
}

// // 사용자 아이디에 대한 포스트를 리턴
export async function getALLByUserid(userid) {
  return db
    .execite(`${SELECT_JOIN} where userid.userid=? ${ORDER_DESC}`, [userid])
    .then((result) => result[0]);
}

// // 글번호에 대한 포스트를 리턴
export async function getById(id) {
  return db
    .execute(`${SELECT_JOIN} where p.id=?`, [id])
    .then((result) => result[0][0]);
}

// 포스트 작성
export async function create(text, idx) {
  return db
    .execute("insert into posts (useridx, text) values (?, ?)", [idx, text])
    .then((result) => getById(result[0].insertId));
}

// 포스트를 변경
export async function update(id, text) {
  return db
    .execute("update posts set text=? where id=?", [text, id])
    .then(() => getById(id));
}

// //포스트 삭제하기
export async function remove(id) {
  return db.execute("delete from posts where id=?", [id]);
}
