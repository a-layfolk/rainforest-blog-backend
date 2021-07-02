const xss = require("xss");
const { exec, escape } = require("../db/mysql");

/**
 * @param {Number} current
 * @param {Number} size
 * @param {String} keyword
 * @returns
 */
const getList = async (current, size, keyword) => {
    let sql = `select * from notebooks where 1 = 1 `;
    if (keyword) {
      sql += `and name like '%${keyword}%' `;
    }
    sql += `order by updated_time desc `;
    if (current && size) {
        current *= size;
        sql += `limit ${current}, ${size}`;
    }
    return await exec(sql);
};

const getDetail = async (id) => {
  let sql = `select * from notebooks where id = ${id}`;
  const rows = await exec(sql);
  return rows[0];
}

module.exports = {
  getList,
  getDetail,
};