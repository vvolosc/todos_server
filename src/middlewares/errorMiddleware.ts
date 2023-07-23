export default (err, req, res, _) => {
  console.error(err)
  return res.sendStatus(500)
}
