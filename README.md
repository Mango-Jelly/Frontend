# 🍋 MangoJelly Frontend


![image](https://github.com/Mango-Jelly/Frontend/assets/69416561/3382e4ee-d7f8-4aa0-963d-e8e7086b0ecb)

```
선생님과 아이들이 함께 하는 webRTC 아동 연극 서비스 "MangoTail"
```

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

### 🎙도입 이유

- Next.Js v14 : app router, server action 등 안정화된 기능과 react v18의 기능들을 활용할 수 있음. 
- TypeScript : 타입 안정성을 고려한 개발이 가능하여 도입
- Tailwind css : 다른 css 라이브러리들이 app router 에서 사용이 불가능한 이슈가 있어 도입
- Openvidu : Kurento 미디어 서버를 한 번 더 래핑하여 클라이언트 코드를 커스터마이징하여 간단하게 구현할 수 있다는 장점이 있음.
- 기타 : NextAuth / sockjs / axios 등  

## 🖥 Application Structure / User Flow

![메뉴구조도](https://github.com/Mango-Jelly/Frontend/assets/69416561/40953a76-0b0a-456f-b953-0ecc4307bcfe)

1. 인솔자(호스트)는 메인페이지에 입장 후 회원가입 - 로그인 절차를 거친 뒤, openvidu 라이브러리를 통한 N:M 화상채팅 세션(연극페이지)을 생성 후 이동한다.
2. 인솔자가 세션내의 링크 공유 버튼을 클릭해 게스트 입장 링크를 생성 & 복사하고, 이를 학생들에게 공유한다.
3. 인솔자의 링크를 통해 입장한 학생(게스트)는 게스트 대기실 페이지에서 닉네임과 카메라 설정 후 세션에 입장한다.
4. 인솔자가 학생들에게 역할을 부여하고, 소켓통신을 통해 게스트의 준비상황을 실시간으로 확인 후 연극을 진행한다.

## 📄 Page Detail

### 📗 메인페이지 (/)

- 학생들의 인솔자가 회원가입 및 로그인을 진행 후, 연극 페이지를 생성할 수 있는 세션
  
- 로그인 / 회원가입 / 내가 나온 비디오 조회 / 제공하는 대본 스크립트 조회 / 연극방 생성 모달 인터페이스 제공
  
- 모든 모달 UI는 **Intercepting Route**를 통한 별도의 URL을 보유한 페이지로, 유저의 페이지 이동에 따른 명시적인 경로 표기 가능

![mainpage](https://github.com/Mango-Jelly/Frontend/assets/69416561/a49c14b8-881a-4b38-a05a-53814a9b991f)

#### 📗 로그인(/login) / 회원가입(/signup) / 방생성(/newroom) 모달

- 로그인 / 회원가입 : nextAuth 라이브러리를 를 통한 유저 인증 & 인가 / 토큰 및 유저정보 관리
  
- **공통 : server Action, useFormState, useFormStatus 를 통한 폼 구조 개선 및 렌더링 효율 개선**

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
  
- 카메라, 마이크 온오프를 통한 상태 확인이 가능
  
- 닉네임 설정을 하고 방에 입장이 가능

![guestroom](https://github.com/Mango-Jelly/Frontend/assets/69416561/ed8286d6-e20b-48b0-9bfd-60c72ca053e7)


### 📗 연극페이지(/playroom)

- 호스트(인솔자)는 연극 대본 및 게스트(학생)의 역할을 지정할 수 있고, 게스트는 부여된 각자의 역할을 Socket 통신으로 실시간으로 확인 가능

- 게스트는 호스트에게 하고싶은 말을 4가지 버튼(할 말 있어요, 준비됐어요, 화장실에 가고 싶어요, 응급 상황을 확인해주세요)으로 전달이 가능하며, 호스트는 소켓 통신을 통해 실시간으로 상태를 전달받을 수 있음
  
- 연극의 진행상황이 동기화되고, 장면에 따라 배역의 카메라들이 소켓으로 동기화되어 연극의 상태(연극 대기 / 연극 시작)가 유지되는 기능

#### 📗 호스트 시점
![hostwaiting](https://github.com/Mango-Jelly/Frontend/assets/69416561/f42c740a-36fd-4b0e-8d53-1ec03d671ece)


#### 📗 게스트 시점
![guestwaiting](https://github.com/Mango-Jelly/Frontend/assets/69416561/6b9ecda9-4f00-4dca-81eb-92eb1999a0ef)

#### 📗 연극 진행 화면

- 연극이 시작되면 연극의 각 씬 별 다른 배경이 나타나며, 씬이 진행될때마다 씬의 테마에 맞게 UI가 전환됨

- 호스트는 화면 하단의 씬 진행 버튼을 통해 대사를 넘길 수 있음
  
- 종료하기 버튼을 통해 연극 세션을 종료하고 메인화면으로 돌아감

![오픈비두멀티스gif](https://github.com/Mango-Jelly/Frontend/assets/98077576/99c514f5-838b-48df-87e7-38bd19a60706)

#### 📗 에러페이지

- 유저가 잘못된 url 경로로 접속시 출력되는 페이지

![errorpage](https://github.com/Mango-Jelly/Frontend/assets/69416561/9b3748af-58e3-4ef5-a6c6-51e47136f62b)


