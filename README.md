# 1

- 제작목표 : 아래 내용들을 이번 프로젝트를 통해 학습한다.

  - SCSS 의 CSS작성
    - mixin, function, import, operators ...
    - 전처리기 도구필요, 컴파일 시간소요.
  - Typescript 작성
  - Redux 상태관리
    - Slice, store
  - Backend(nodejs, mysql) 학습 및 연결

- 비쥬얼스튜디오코드에서 확장프로그램사용하여 커밋시 vsc-git 추가

## 1.1

- 기본 포스팅 구조 및 내부사항.

- 로그인정보를 Redux를 통해 State에 저장.(추후 백엔드를 통한 작업 진행)

## 1.2

- 로그인시 username 및 password의 길이조건 설정, 로그인 성공시 LoginSuccess컴포넌트 팝업, 실패시 alert를 이용한 조건알림 및 input의 value 초기화.

- 메인페이지에 배열 요소의 추가와 삭제를 이용해 구현한 이미지박스 이미지박스(슬라이드)제작.

  - useState의 Array type 선언. (=useState<string[]>([]))

- Likes버튼 클릭시 애니메이션 추가.

- Header 작업

  - 메뉴버튼을 누르면 내려오는 메뉴가 Header를 가리는 현상 발생.
    - z-index를 사용해도 효과없음.
    - transform의 사용이 문제가 될수 있다고하지만, transform을 삭제해도 효과없음.

- SCSS학습, Backend학습

  - 기초학습 nodejs, mysql 학습 및 연결 & 테이블에 데이터 넣기.

- 다크모드테마 추가.

## 1.3

- Profile 페이지 제작.

  - 사진 클릭시 해당 src를 추출하여 다른 엘레먼트에 넣는것으로 이미지 확대 기능 추가.
  - 이미지 추가시 부드럽게 이미지가 보여지는 기능 제작.

    ```js
    const handleimageClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      //console.log(e.currentTarget.value);

      let img = new Image();
      let temp: number;
      let fixedHeight: number;
      let cnt: number = 1;
      //사용할 변수 선언

      if (e.currentTarget.value) {
        const src: string = e.currentTarget.value;
        const exist: string = (
          document.getElementById(id_hid) as HTMLImageElement
        ).src;
        const overflow = document.getElementById(id_id);

        if (exist === e.currentTarget.value) {
          if (overflow && exist) {
            img.src = exist;

            if (img.height <= 500) {
              temp = img.height;
              fixedHeight = img.height;
            } else {
              fixedHeight = 500;
              temp = 500;
            }

            setInterval(
              () => {
                if (101 !== cnt) {
                  console.log(`${fixedHeight - (fixedHeight / 100) * cnt}px`);
                  overflow.style.maxHeight = `${
                    fixedHeight - (fixedHeight / 100) * cnt
                  }px`;
                  cnt++;
                  temp -= fixedHeight / 100;
                }
              },
              cnt === 101 ? null : 3
            );
          }
          setTimeout(() => {
            (document.getElementById(id_hid) as HTMLImageElement).src =
              "http://localhost:3000/profile";//퍼블리싱을 하기전의 src는 현재주소값으로 되어있기에 " "과 같은 방식으로 사용
            overflow.style.display = "none";
            overflow.style.maxHeight = `580px`;
          }, 500);
        } else {
          if (exist !== "http://localhost:3000/profile") {
            (document.getElementById(id_hid) as HTMLImageElement).src = src;
          } else if (exist === "http://localhost:3000/profile") {
            (document.getElementById(id_hid) as HTMLImageElement).src = src;
            if (overflow && src) {
              overflow.style.maxHeight = "0px";
              overflow.style.display = "block";
              console.log("overflow && src");
              img.src = src;

              if (img.height <= 500) {
                temp = img.height + 80;
                fixedHeight = img.height / 100;
              } else {
                fixedHeight = 5;
                temp = 500 + 80;
              }
              let limit: number = temp / fixedHeight;

              console.log(limit, cnt);
              const timer = setInterval(
                () => {
                  if (cnt < limit) {
                    console.log(`limit:${limit}, cnt:${cnt}`);
                    console.log(`${fixedHeight * cnt}px`);
                    overflow.style.maxHeight = `${fixedHeight * cnt}px`;
                    cnt++;
                  } else {
                    clearInterval(timer);
                  }
                },
                cnt < limit ? null : 3
              );
            }
          }
        }
      }
    };

    ```

    - ProfilePost 컴포넌트 제작 및 이동 -> (parent-child 간의 매개변수 같은 오류를 만드는 과정이 반복됨...)

  - Settings 페이지 제작

    - 모든페이지의 다크모드 및 체크박스의 상태를 관리하기 위해 darkSlice를 제작해 redux를 통해 상태를 관리한다.

      - redux를 사용안할시 다크모드의 상태를 모든 페이지 및 컴포넌트마다 props를 통해 전달해 주어야 하기때문에 상당히 많은 코드 및 경로를 거쳐야 하지만 redux를 통한 상태관리를 할시 이전과 같은 작업의 필요없이 관리를 할 수 있기에 매우 편리하다.

    - settings 항목에 user Setting, page setting ...(이후에 추가) 및 logout 항목제작.

      - user Setting 항목에서 개인정보 및 프로필 등에 대해 변경을 할 수 있으며, 이는 백엔드를 구현하여 DB를 연결하기 전까지 userSlice를 통해 정보를 저장하는 것으로 함.
      - input의 type="file"을 통해 파일을 업로드 할 수 있도록 하고 이미지 형식만 받는것을 조건문을 통해 구분한다.

      ```js
      //input의  onChange에 의해서 실행된다.
      function setimage(e: React.ChangeEvent<HTMLInputElement>) {
        //const reader = new FileReader(); //데이터베이스없을시-0
        const files = e.currentTarget.files; //업로드 받은 파일

        //파일 한개이상일시 리턴
        if (files) {
          if ([files].length > 1) {
            alert("이미지 파일은 한개만 업로드 가능합니다.");
            return;
          } else {

            //파일의 확장자(타입)이 이미지가 아닐경우 리턴
            if (!files[0].type.match("image/.*")) {
              alert("파일이 이미지 형식이 아닙니다.");
              return;
            } else {
              /* console.log("reader");
                reader.readAsDataURL(files[0]);
                reader.onload = () => {
                    setUrl(reader.result as string);
                    console.log(url);
                }; */
              //"1개"의 "이미지파일"을 업로드시 url(state)에 set하고 Save버튼을 활성화시키고 img태그에 넣기...userSlice로의 할당은 Save버튼을 통해 한다.
              setUrl(URL.createObjectURL(files[0]));
              (document.getElementById("preview") as HTMLImageElement).src = url;
              (
                document.getElementById("saveimg") as HTMLButtonElement
              ).removeAttribute("disabled");
            }
          }
        }
      }
      ```

      ### 1.3.2

      - Save 버튼태그에 직접 disabled를 넣으면, 다른 형태를 통한 변경이 불가한 상황이 발생.

        - useEffect를 통해 마운트시 버튼에 setAttribute를 사용해 disabled를 추가, 이후에 removeAttribute를 통해 제거시 정상작동.

      - user Setting의 사용자 정보 변경하는 UserEdit 제작.
        - 이름, 비밀번호, 생일, 이메일, (전화번호), 소개글 등을 변경할수 있는 컴포넌트 제작.

  - 마우스를 따라다니는 애니메이션추가. (Follow.tsx 컴포넌트)
    - 헤더에 컴포넌트 추가.(아니면 어디에?) -> 헤더는 로그인 제외한 모든페이지에 존재.

---

# 예정

## 제작

- 회원가입
- 문의
- 게시글 작성
-

## 수정 | 작업中

- 로그인(수정) => redux 연동
- 메인 (수정) => 게시물 마무리
- 설정메뉴 => `작업中`
