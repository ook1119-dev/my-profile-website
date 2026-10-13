# my-profile-website

개인 프로필 웹사이트 실습입니다. (바이브 코딩 실습 · Week 7)
사이트의 인물(한도윤)·회사(Lantern Cue)·프로젝트는 **실습용 가상 예시**입니다.

- **구성**: Home · About · Projects · Contact 한 페이지 + 프로젝트 상세 페이지 3개
- **만든 방법**: HTML · CSS · JavaScript (프레임워크 없음)
- **로컬 확인**: Node.js 기본 모듈로 만든 정적 서버
- **배포**: Vercel (`public` 폴더를 그대로 올림)

## 로컬에서 실행

```bash
npm start
```

브라우저에서 http://localhost:3000 을 엽니다. 설치할 패키지는 없습니다.

## 폴더 구조

```
my-profile/
├── public/             ← 배포되는 파일
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── images/
│   └── projects/       ← 프로젝트 카드에서 여는 상세 페이지
├── server.js           ← 로컬 확인용 서버
├── package.json
└── vercel.json         ← 배포 설정 (출력 폴더 public)
```
