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



## 📄 Application Structure

![메뉴구조도](https://github.com/Mango-Jelly/Frontend/assets/69416561/40953a76-0b0a-456f-b953-0ecc4307bcfe)

## User Flow



## 📄 Page Detail

### 메인페이지

- 로그인 / 회원가입 / 내가 나온 비디오 조회 / 제공하는 대본 스크립트 조회 / 연극방 생성 모달 인터페이스 제공

![mainpage](https://github.com/Mango-Jelly/Frontend/assets/69416561/a49c14b8-881a-4b38-a05a-53814a9b991f)

#### 내가 나온 비디오 / 대본 정보 모달 
- 내가 등장한 영상과 사이트에서 제공하는 연극의 대본을 조회 가능
- 비디오 조회 모달 : 연극 세션 등록시 공개여부가 true로 체크된 영상들을 조회, 재생
- 대본 정보 모달 : 모달창에서 각 연극의 상세 세션을 아코디언 UI 메뉴를 통해 조회

![scriptmodal](https://github.com/Mango-Jelly/Frontend/assets/69416561/1e8c3615-19b5-428a-ba9a-0b04092075a7)
![videomodal](https://github.com/Mango-Jelly/Frontend/assets/69416561/c0bcf68d-aa07-49f3-9347-1b69e182bc16)

### 연극페이지

#### 소켓 통신을 통한 게스트, 호스트간 화면 동기화
- 호스트의 통제에 따라 게스트의 역할이 정해지고 게스트들이 그것을 동기적으로 확인할 수 있는 기능
- 연극의 진행상황이 동기화되고, 장면에 따라 배역의 카메라들이 소켓으로 동기화되어 연극의 상태가 유지되는 기능
![오픈비두멀티스gif](https://github.com/Mango-Jelly/Frontend/assets/98077576/99c514f5-838b-48df-87e7-38bd19a60706)
