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

- 정리 리스트가 질서없이 복잡. (1.4 부터시작).
  - 1.n : 한 주(week)
  - 1.n.m : 한 주에 하루. 최대 1.n.7(월~일) 가능.

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
          - input의 type="file"을 통해 파일을 업로드 할 수 있도록 하고 이미지 형식만 받는것을 조건문을 통해 구분한다.(user Setting에 해당하는 기능 및 엘레먼트를 UserEdit 컴포넌트로 분리.)

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

          - UserEdit

            - 이름, 비밀번호, 생일, 이메일, (전화번호), 소개글 등을 변경할수 있는 컴포넌트 제작.
            - 추후 백엔드 연동시 정보르 저장하는 기능 추가예정.

          - 웹페이지에 대한 설정을 저장하는 컴포넌트 PageSetting 제작.

            - 다크모드 설정 : 기존에 제작한 다크모드 기능을 사용. 체크박스 상태 유지 및 저장.
            - ?

## 1.4

# 1.4.1 (23.01.16)

- Main페이지 수정

  - 레이아웃 수정 (size, margin, padding, ... ).
  - 게시물은 column형태가 아닌 row형태로 배치하고 슬라이드애니메이션을 이용해 각 포스트를 볼 수 있도록 한다.

    - 직접 게시물 슬라이드를 구현하기 위해 게시물이 옆으로 이동시 보여지는 슬라이드 애니메이션을 구현한다.
    - 총 5개의 같은 컴포넌트를 사용하며, 가운데 3개를 실제로 보여주고 양끝 2개는 overflow를 이용해 숨기고 이전 및 다음 게시물을 미리 위치시키는 용도로 사용한다.
      - 오른쪽 5번 게시물은 컨테이너 길이로 밀어내어 overflow시키고, 왼쪽 1번은 컨테이너를 `transform: translateX(?)`시킴으로 overflow 시켰다.
    - 보여지는 가운데 3개에서 가운데를 제외한 다른 게시물에 `transform : scale(0.5)`를 적용하여 가운데(5개중 3번째)게시물을 메인으로 보여준다.

    ```js
    const move = (id: string, style: string) => {
      const doc = document.getElementById(id) as HTMLDivElement | null;//엘레먼트 가져오기
      doc.classList.add(styles[style]);//엘레먼트에 스타일 추가
      setTimeout(() => {
        doc.classList.remove(styles[style]);//애니메이션 작동시간에 맞추기 위해 setTimeout을 이용해 추가한 스타일을 제거한다. (제거하지 않을시 두번동작하지 않는다.)
      }, 500);
    };
    ```

    - 애니메이션을 추가 및 제거하기위해 엘레먼트를 가져오고, setTimeout을 이용해 스타일을 제거하는 타이밍을 설정한다.

    ```scss
    @mixin mx-movepost($name, $trans1, $trans2, $scale1, $scale2) {
      @keyframes #{$name} {
        0% {
          transform: translateX($trans1) scale($scale1);
        }
        100% {
          transform: translateX($trans2) scale($scale2);
        }
      }
    }
    ```

    - 위 두개의 코드를 통해 매개변수 없이 반복되는 코드를 줄이고 재사용을 지향한다.

    ```scss
    .move-slideO {
      animation: slideMoveO 0.3s linear forwards;
      margin: automargin();
      @include mx-movepost(slideMoveO, 0, -1000px, 0.5, 0.5);
    } //안보여지는 구역으로 빠지는 게시물2. 이동거리는 크게 상관없다.
    .move-slideL {
      animation: slideMoveL 0.3s linear forwards;
      margin: automargin();
      @include mx-movepost(slideMoveL, 0, -562px, 1, 0.5);
    } //중앙에 위치한 3번 게시물로서 작아지며 2번 게시물의 위치로 이동하며 작아진다.
    .move-slideR {
      animation: slideMoveR 0.3s linear forwards;
      margin: automargin();
      @include mx-movepost(slideMoveR, 0, -562px, 0.5, 1);
    } //4번째 게시물로서 가장 중앙으로 이동 하며 커진다.
    .move-slideH {
      animation: slideMoveH 0.3s linear forwards;
      margin: automargin();
      @include mx-movepost(slideMoveH, 0, -502px, 0.5, 0.5);
    } //5번째 게시물로서 4번째 게시물 위치로 이동. overflow에 의해 안보였기에 간단한 이동만 하면 된다.
    ```

    - 위 코드는 왼쪽으로 이동시키는 css이다. 2,3,4,5번째의 게시물(컴포넌트)만이 움직이며
      코드는 move-slideO 부터 차례로 해당된다.(2번 컴포넌트 스타일은 move-slideO 이다.)

    - 다만 이동거리를 직접적으로 위치시키면 전체창크기 및 거리간격에 의해서 위치가 자주 어긋난다.

      - 이를 해결하기위해 고정적인 넓이(width)를 주거나 직접 컴포넌트 간의 사이간격을 margin을 이용해 만들어주는 것도 하나의 방법이다.
      - 만든이는 flex의 정렬방식을 사용하였기에 전체 컨테이너의 크기 및 컴포넌트의 크기에 따라 자동으로 사이간격이 만들어 졌기에 고정적인 넓이를 주었다.
      - 작성하면서 생각난것이지만 고정적인 margin을 주는것이 보다 translate의 거리를 계산하는데 훨씬 쉽다는 생각이 든다.

    - 다만 위 코드는 엘레먼트가 이동을 하는 애니메이션일뿐, fill-mode가 forwards가 아니기 떄문에 이동후 원래 자신의 자리로 돌아간다. 따라서 애니메이션의 작동시간에 맞춰서 내부에 있는 내용 및 사진들도 바꿔주는 코드를 만들어야한다.

      - 간단하게 배열을 이용해 이동버튼 클릭시 (왼쪽이동 : shift()와 push()사용. 오른쪾이동 : pop()과 unshift()사용.) Arr state를 변경해주는 방식을 사용한다.

      ```js
        //-------배열 요소 위치 변경----------
        const asArray = (bool: boolean) => {
          if (bool) {
            let arr = [...number];
            let temp: number = arr.shift();
            arr.push(temp);
            setNumber((number) => arr);
          } else {
            let arr = [...number];
            let temp: number = arr.pop();
            arr.unshift(temp);
            setNumber((number) => arr);
          }
        };

        //---------버튼 클릭이벤트-----------------
          const btnRight = document.getElementById(
          "slide-right-btn"
        ) as HTMLButtonElement | null;
        const btnLeft = document.getElementById(
          "slide-left-btn"
        ) as HTMLButtonElement | null;
        btnRight.disabled = true;
        btnLeft.disabled = true;
        //왼쪽이동
        move("slide-left", "move-slideO");//2번->1번위치로
        move("slide-middle", "move-slideL");//3번 -> 2번위치로 + 크기변화
        move("slide-right", "move-slideR");//
        move("slide-hidden-left", "move-slideH");//숨겨진 5번 -> 4번 위치로
        console.log(window.innerWidth);
        setTimeout(() => {
          asArray(true);
          btnRight.disabled = false;
          btnLeft.disabled = false;
        }, 500);
      ```

      - 현재 애니메이션의 정상적인 작동을 위해 데이터이동은 이미지만 구현을 했다.
      - 백엔드 및 DB연동시 Slice를 통해 전체 게시물의 개수를 통한 데이터이동 구현예정.(게시물 데이터(배열), 게시물 수).

---

# 예정 (v1.3.2 ~ )

## 제작

- 회원가입
- 문의
- 게시글 작성
- 게시글 설정 (게시물 비공개 등등)

## 수정 예정

- 로그인(수정) => redux 연동
- ~~메인 (수정) => 게시물 마무리~~(1.3.2)

# 이외 오류 (v1.3.2 ~)

- ~~Follow로 만든 마우스포인터 애니메이션이 Header의 "block-header-2"의 위에서만 엘레먼트 뒤로 위치해 가려지는 현상 발생.~~z-index의 우선순위 변경.

- 백엔드연동 이전에 로그인 정보 저장을 위해 redux-persist 사용. 저장 및 로드에는 이상이 없으나, 새로고침시 로딩이 상당히 오래걸리는 현상 발생. 타 우선작업위해 사용 보류.(230115).
