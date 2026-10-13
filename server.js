// 로컬 확인용 정적 파일 서버 — Node.js 기본 모듈만 쓴다(설치할 패키지 없음).
// 실행: npm start  →  http://localhost:3000
// 배포(Vercel)에서는 이 파일을 쓰지 않고 public 폴더를 그대로 올린다(vercel.json).
const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

const PORT = Number(process.env.PORT) || 3000
const ROOT = path.join(__dirname, 'public')

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
}

function send(res, status, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type })
  res.end(body)
}

const server = http.createServer((req, res) => {
  let urlPath
  try {
    urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
  } catch {
    return send(res, 400, '잘못된 주소입니다')
  }
  // public 폴더 밖으로 나가는 경로(../)는 막는다
  let file = path.normalize(path.join(ROOT, urlPath))
  if (file !== ROOT && !file.startsWith(ROOT + path.sep)) return send(res, 403, '접근할 수 없습니다')

  fs.stat(file, (err, st) => {
    if (!err && st.isDirectory()) file = path.join(file, 'index.html')
    fs.readFile(file, (err2, data) => {
      if (err2) return send(res, 404, '페이지를 찾을 수 없습니다')
      send(res, 200, data, TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream')
    })
  })
})

server.listen(PORT, () => {
  console.log(`로컬 서버 실행 중: http://localhost:${PORT}`)
})
