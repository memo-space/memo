
export default function (app) {
  app.get('/', function (req, res) {
    res.sendFile('index.html')
  })
  app.get('/upload.html', function (req, res) {
    res.sendFile('upload.html')
  })
  app.get('/init.html', function (req, res) {
    res.sendFile('init.html')
  })
  app.get('/login.html', function (req, res) {
    res.sendFile('login.html')
  })
  app.get('/memo.html', function (req, res) {
    res.sendFile('memo.html')
  })
  app.get('/memo-list.html', function (req, res) {
    res.sendFile('memo-list.html')
  })
  app.get('/comment.html', function (req, res) {
    res.sendFile('comment.html')
  })

  app.get('/assets/favicon.png', function (req, res) {
    res.sendFile('/assets/favicon.png')
  })
  app.get('/assets/style.css', function (req, res) {
    res.sendFile('/assets/style.css')
  })
  app.get('/assets/main.js', function (req, res) {
    res.sendFile('/assets/main.js')
  })
  app.get('/memo.js', function (req, res) {
    res.sendFile('/memo.js')
  })
  app.get('/assets/comment.js', function (req, res) {
    res.sendFile('/assets/comment.js')
  })
  app.get('/assets/comment.css', function (req, res) {
    res.sendFile('/assets/comment.css')
  })

}