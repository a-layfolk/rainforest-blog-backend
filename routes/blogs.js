const router = require('koa-router')()
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require("../controller/blogs")
const { SuccessModel, ErrorModel } = require('../model/resModel')
router.prefix('/api/blogs')

router.get('/list', async (ctx, next) => {
  const author = ctx.query.author
  const keyword = ctx.query.keyword
  const listData = await getList(author, keyword)
  ctx.body = new SuccessModel(listData)
})

router.get('/detail', async (ctx, next) => {
  const id = ctx.query.id
  const data = await getDetail(id)
  ctx.body = new SuccessModel(data)
})

router.post('/new', async (ctx, next) => {
  const body = ctx.request.body
  body.author = ctx.session.username
  const data = await newBlog(body)
  ctx.body = new SuccessModel(data)
})

router.post('/update', async (ctx, next) => {
  const val = await updateBlog(ctx.query.id, ctx.request.body)
  if (val) {
      ctx.body = new SuccessModel()
  } else {
      ctx.body = new ErrorModel('更新博客失败')
  }
})

router.post('/del', async (ctx, next) => {
  const id = ctx.query.id
  const author = ctx.session.username
  const val = await delBlog(id, author)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('删除博客失败')
  }
})

module.exports = router
