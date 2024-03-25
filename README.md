# 🍋 망고테일(Mangotale)

![image](https://github.com/Mango-Jelly/Frontend/assets/79207743/71f0c51d-cbbb-4e53-b8da-99d4ef5f0fab)

```
선생님과 아이들이 함께 하는 webRTC 아동 연극 서비스 "MangoTail"
```

연극이 아동들에게 주는 교육적 효과에 대해 누구나 들어본 적이 있고, 또한 관련 연구 결과를 쉽게 찾아볼 수 있다. 이러한 이유로 많은 유치원, 초등학교 등 교육기관에서 연극 놀이를 통한 교육을 실시하고 있다. 팬데믹이 시작된 후 비대면 교육이 늘어났지만 시중의 화상 채팅 서비스로 연극을 진행하기에는 불편하고 아쉬운 점이 많았다.

따라서 선생님과 아이들이 간편하게 연극 놀이를 할 수 있으며 이 진행을 도와줄 수 있는 서비스가 있으면 좋을 것 같다고 생각했다. 더 나아가 신체적, 환경적 제약이 있는 아동들도 또래 아이들과의 연극 놀이를 쉽게 경험할 수 있도록 해당 서비스를 기획하였다.

<br />

## 🖥 Application Structure / User Flow

![메뉴구조도](https://github.com/Mango-Jelly/Frontend/assets/69416561/40953a76-0b0a-456f-b953-0ecc4307bcfe)

1. 인솔자(호스트)는 메인페이지에 입장 후 회원가입 - 로그인 절차를 거친 뒤, openvidu 라이브러리를 통한 N:M 화상채팅 세션(연극페이지)을 생성 후 이동한다.
2. 인솔자가 세션내의 링크 공유 버튼을 클릭해 게스트 입장 링크를 생성 & 복사하고, 이를 학생들에게 공유한다.
3. 인솔자의 링크를 통해 입장한 학생(게스트)는 게스트 대기실 페이지에서 닉네임과 카메라 설정 후 세션에 입장한다.
4. 인솔자가 학생들에게 역할을 부여하고, 소켓통신을 통해 게스트의 준비상황을 실시간으로 확인 후 연극을 진행한다.

<br />

## 🎈 Features

- 다대다 화상 채팅방 생성/초대/게스트 입장
  - 호스트는 방 제목과 소속 입력 후 방 생성
  - 게스트는 닉네임, 카메라/마이크 설정 후 방 입장
- 연극 상세 정보 조회
  - 대본을 씬 별로 나누어서 아코디언 형식으로 제공
  - 호스트가 연극 대본 선택하면 해당 대본으로 연극 진행
- 비대면 연극(화상 채팅) 기능
  - 호스트는 게스트의 역할을 지정, 게스트는 부여된 각자의 역할을 실시간으로 확인
  - 게스트는 호스트에게 4가지 버튼(할 말 있어요, 준비됐어요, 화장실에 가고 싶어요, 응급 상황이에요)으로 상태 전달 가능
  - 연극이 시작되면 각 씬 별 배경 전환 및 필요한 배역들의 카메라만 표시
  - 호스트는 화면 하단의 씬 진행 버튼을 통해 대사를 넘길 수 있고, 현재 대사가 하이라이팅되어 모든 참여자들에게 동기화
  - 연극의 진행 상황이 동기화되고 연극의 상태(연극 대기/시작)가 유지
- 진행한 연극 녹화/재생/공개 범위 설정/다운로드 기능

<br />

## ⚙ Tech Stack

<table align="center">
    <tr align="center">
        <td style="min-width: 150px;">
            <a href="https://nextjs.org/">
              <img src="https://cdn.worldvectorlogo.com/logos/next-js.svg" width="100">
              <br />
            </a> 
        </td>
        <td style="min-width: 150px;">
            <a href="https://www.typescriptlang.org/">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" width="100">
              <br />
            </a>
        </td>
        <td style="min-width: 150px;">
            <a href="https://tailwindcss.com/">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2560px-Tailwind_CSS_Logo.svg.png" width="100">
              <br />
            </a>
        </td>
        <td style="min-width: 150px;">
            <a href="https://openvidu.io/">
              <img src="https://avatars.githubusercontent.com/u/22744124?s=280&v=4" width="100">
              <br />
            </a>
        </td>
    </tr>
    <tr align="center">
        <td>
            Meta Framework
        </td>
        <td>
            Programming<br />
            Language
        </td>
        <td>
            CSS Library
        </td>
        <td>
            Web RTC Framework
        </td>
</tr>
</table>

### 도입 이유

- Next.Js v14 : app router, server action 등 안정화된 기능과 react v18의 기능들을 활용할 수 있음
- TypeScript : 타입 안정성을 고려한 개발이 가능하여 도입
- Tailwind css : 다른 css 라이브러리들이 app router 에서 사용이 불가능한 이슈가 있어 도입
- Openvidu : Kurento 미디어 서버를 한 번 더 래핑하여 클라이언트 코드를 커스터마이징하여 간단하게 구현할 수 있다는 장점이 있음
- 기타 : NextAuth / sockjs / axios 등

### 기능 구현

- 메인 페이지
  - 모든 모달 UI는 **Intercepting Route**를 통한 별도의 URL을 보유한 페이지로, 유저의 페이지 이동에 따른 명시적인 경로 표기 가능
  - 로그인 / 회원가입 : nextAuth 라이브러리를 를 통한 유저 인증 & 인가 / 토큰 및 유저정보 관리
  - **공통 : server Action, useFormState, useFormStatus 를 통한 폼 구조 개선 및 렌더링 효율 개선**
- 연극 페이지
  - 호스트(인솔자)는 연극 대본 및 게스트(학생)의 역할을 지정할 수 있고, 게스트는 부여된 각자의 역할을 Socket 통신으로 실시간으로 확인 가능
  - 연극의 진행상황이 동기화되고, 장면에 따라 배역의 카메라들이 Socket으로 동기화되어 연극의 상태(연극 대기 / 연극 시작)가 유지되는 기능

### 이슈 해결

1. 씬 영상을 합쳐서 하나의 영상으로 만들어줄 때 여러 화면을 동시에 녹화할 수 없는 이슈
   - 씬별로 영상을 녹화하고, 녹화 영상들을 합쳐 하나의 작품으로 만드는 기능
   - 원인
     ![image](https://github.com/Mango-Jelly/Frontend/assets/79207743/6f111b19-201a-46fe-8103-8ff9d738893b)
     ![1](https://github.com/Mango-Jelly/Frontend/assets/79207743/50d40641-b970-43c0-98f4-cc60987974ec)
     ![2](https://github.com/Mango-Jelly/Frontend/assets/79207743/6de74417-a0a7-478e-b998-1f194d78aec4)
   - 해결
     ![3](https://github.com/Mango-Jelly/Frontend/assets/79207743/6afa7ec1-6c0e-4ba5-91b6-14d802b7722a)
2. 영상의 확장자 기준을 `.mp4`로 했지만 `webm` 형식의 영상으로만 녹화가 가능한 이슈
   - 원인: `htmlElement`의 `canvas`는 영상 소스만을 입력으로 받는데 `.webm` 확장자로만 가능 → 하지만 `ffmpeg`(씬 영상을 합치는 기능)는 `.webm` 파일 해석이 불가능
   - 해결: 씬 영상을 합치기 전 .mp4로 변환하는 기능을 추가
     - Frontend 측에서 .webm 영상을 .mp4로 변환하여 서버에 전달

<br />

## 📄 Screenshot

### 📗 메인페이지 (/)

- 학생들의 인솔자가 회원가입 및 로그인을 진행 후, 연극 페이지를 생성할 수 있는 세션

![mainpage](https://github.com/Mango-Jelly/Frontend/assets/69416561/a49c14b8-881a-4b38-a05a-53814a9b991f)

#### 📗 로그인(/login) / 회원가입(/signup) / 방생성(/newroom) 모달

![로그인](https://github.com/Mango-Jelly/Frontend/assets/69416561/fb877076-ed2d-4b74-99a8-9f4b9319be8f)
![GIF 2024-02-21 오전 11-07-38](https://github.com/Mango-Jelly/Frontend/assets/69416561/623f834f-f387-4857-81b6-52ce60bac147)
![방생성](https://github.com/Mango-Jelly/Frontend/assets/69416561/28e08c45-7fe5-4387-b9bd-239f3b6ed534)

#### 📗 내가 나온 비디오(video/[id]) / 대본 정보 (/scenarios/[id]) 모달

- 내가 등장한 영상과 사이트에서 제공하는 연극의 대본을 조회 가능
- 비디오 조회 모달 : 연극 세션 등록시 공개여부가 true로 체크된 영상들을 조회, 재생
- 대본 정보 모달 : 모달창에서 각 연극의 상세 세션을 아코디언 UI 메뉴를 통해 조회

![scriptmodal](https://github.com/Mango-Jelly/Frontend/assets/69416561/1e8c3615-19b5-428a-ba9a-0b04092075a7)
![videomodal](https://github.com/Mango-Jelly/Frontend/assets/69416561/c0bcf68d-aa07-49f3-9347-1b69e182bc16)

### 📗 게스트 입장 대기실(/guestroom)

- 인솔자가 공유한 링크를 통해 대기실에 들어온 학생들의 입장 대기실
- 카메라/마이크 및 닉네임 설정 후 방에 입장 가능

![guestroom](https://github.com/Mango-Jelly/Frontend/assets/69416561/ed8286d6-e20b-48b0-9bfd-60c72ca053e7)

### 📗 연극페이지(/playroom)

#### 📗 호스트 시점

![hostwaiting](https://github.com/Mango-Jelly/Frontend/assets/69416561/f42c740a-36fd-4b0e-8d53-1ec03d671ece)

#### 📗 게스트 시점

![guestwaiting](https://github.com/Mango-Jelly/Frontend/assets/69416561/6b9ecda9-4f00-4dca-81eb-92eb1999a0ef)

#### 📗 연극 진행 화면

- 호스트는 화면 하단의 씬 진행 버튼을 통해 대사를 넘길 수 있음
- 종료하기 버튼을 통해 연극 세션을 종료하고 메인화면으로 돌아감

![오픈비두멀티스gif](https://github.com/Mango-Jelly/Frontend/assets/98077576/99c514f5-838b-48df-87e7-38bd19a60706)

#### 📗 에러페이지

- 유저가 잘못된 url 경로로 접속시 출력되는 페이지

![errorpage](https://github.com/Mango-Jelly/Frontend/assets/69416561/9b3748af-58e3-4ef5-a6c6-51e47136f62b)

<br />

## 👨‍💻Members

<table align="center">
    <tr align="center">
        <td style="min-width: 150px;">
            <a href="https://github.com/namjunkim12">
              <img src="https://github.com/namjunkim12.png" width="100">
              <br />
              <b>김남준 (namjunkim12)</b>
            </a> 
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/sangbumlikeagod">
              <img src="https://github.com/sangbumlikeagod.png" width="100">
              <br />
              <b>김상범 (sangbumlikeagod)</b>
            </a>
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/annyoon">
              <img src="https://github.com/annyoon.png" width="100">
              <br />
              <b>윤서안 (annyoon)</b>
            </a> 
        </td>
    </tr>
    <tr align="center">
        <td>
            👶 <br/>
            Web FE
        </td>
        <td>
            🧚🏻 <br />
            Web FE
        </td>
        <td>
           👼  <br />
            Web FE
        </td>
    </tr>
</table>
