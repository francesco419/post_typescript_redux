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

## 1.4

### 1.4.1 (23.01.16)

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

### 1.4.2(23.01.17)

- Join 컴포넌트 제작

  - 회원가입 기능의 컴포넌트.
  - Login페이지의 Join버튼을 통해 컴포넌트를 사용할 수 있으며, name,id,password,birth,email의 기본적인 정보를 입력 할 수 있도록 설정.
  - 백엔드 부분과 연동하여 DB에 회원가입 정보를 저장.
  - 모든 INPUT태그에 required적용하여 모든 항목 필수 기입.
    - required를 사용하지 않는다면 submit시 가져오는 데이터를 기반으로 조건문을 사용하여 입력/비입력을 가려낼수 있다. 이후 return.
  - 디자인 작업.

- Login 페이지 작업

  - 로그인 기능 구현
    - 백엔드 부분과 연동하여 MySQL에 있는 테이블에 입력한 아이디와 비밀번호를 대조하여 같은 값이 들어간것이 확인되면 로그인.
    - axios.post / .get 등을 통하여 백엔드와 데이터를 처리하는 방법을 사용.
    - axios.post에서 두번째 인자로 Login.tsx의 LoginProps의 데이터타입을 가진 객체를 보냈었는데, 응답으로 반환되는 데이터또한 LoginProps 타입의 객체가 반환되어 사용하기 까다로워 짐으로, 인자에 LoginProp가 아닌 직접 객체를 보내는 방식을 사용. 중복되는 코드도 줄일 수 있었고, 반환된 request의 사용이 편리.
      - 다만 타입스크립트를 사용중인 이상 다른 데이터타입으로 보낸 request도 다루도록 한다.
  - input의 required를 사용하지 않고 id 혹은 password가 공백이라면 코드를 이용해 return이 되고, 이를 시각적으로 보여줄수 있는 애니메이션을 추가.

- redux-persist 작업

  - redux-persist는 상태 변경 및 저장시 해당 데이터를 Localstorage / sessionStorage에 저장해주는 기능.
  - persist를 적용하기 위해 기존 store.ts와 index.tsx의 일부 변경.
  - 저장된 데이터는 (local / session)Stirage.getItem("persist:root")으로 가져오지만, json형태로 만들어야 하기에 JSON.parse를 사용.
    ```js
      const json = JSON.parse(SessionStorage.getItem("persist:root"));
      console.log(json.value.?);// 와 같이 사용하면 된다.
    ```

- Node.js, MySQL을 사용하여 프로젝트와 연동(연결). => 이번 프로젝트와 관련된 모든 작업내용은 이곳 README에 표시. (nodejs,mysql ...)

  - 백엔드

    - 프로젝트 상위폴더에 백엔드 프로젝트 폴더 이동. (경로)
    - 파일 분할 => 모듈화.
    - nodejs에서 MySQL로 쿼리를 보낼시 오류.
      - 오류 : ER_BAD_FIELD_ERROR: Unknown column '검색어' in 'where clause'
      - 문제 : 쿼리전송시 `SELECT * FROM users WHERE id=${user_obj.paramId} limit 1;`에서 id=${user_obj.paramId}를 읽지 못함.
      - 이유 : 보내는 쿼리자체가 string으로 보내지만 SQL에서는 일반 명령어로 읽기 때문에 템플릿 리터럴인 ${user_obj.paramId}가 변수가아닌 그대로 문자열이되어 작동.
      - 해결 : `SELECT * FROM users WHERE id="${user_obj.paramId}" limit 1;` => id="${user_obj.paramId}" 템플릿 리터럴 부분을 " " 으로 묶는다.
      - 추가 : `SELECT * FROM users WHERE id='frank' limit 1;` 템플릿 리터럴을 사용하지 않더라도 " " 을 사용해야한다.
      <!-- - nodejs 리턴 오류.
      - 오류 : ERR_HTTP_HEADERS_SENT
      - 문제 : return 이 명시되지 않을시 발생.
      - 해결 : -->

### 1.4.3(23.01.18)

- Post 페이지 작업

  - 현재 작성하고 있는 게시물을 미리볼수 있도록 작성하는 폼 옆으로 PostBox 컴포넌트와 같은 모형의 컴포넌트를 표시한다.
  - tag 관련 규칙을 적용하여 input에 작성시 해당 문자열을 규칙에 따라 구분하여 tag를 표시.
  - 현재 날짜를 표시하기 위해 Date 객체를 생성하는 기능을 여러 컴포넌트에서 사용하기에, 이를 커스텀 hook으로 분리. Timetoday 생성.

### 1.4.4(23.01.19)

- Post 페이지 작업 2

  - post페이지에서 작성하는 모든 부분은 onBlur이벤트를 통해 input박스의 focus를 해제하면 해당 엘레먼트의 값을 state에 저장하고 이를 오른쪽의 preview_post 부분에서 작성글이 어떻게 보이는지 바로 업데이트가 되도록 설정.
  - tag에는 입력 규칙을 명시하고, 해당 규칙이 적용되어 보여지도록 `string.split()`을 사용하여 설정.
  - 이미지 가져오기 작업중, 미리보기부분에서 선택적으로 이미지를 삭제할 수 있도록 설정을 했으나 찾지 못한 오류로 인해 n번째 이미지를 삭제시 n+1번의 이미지도 같이 삭제되는 현상발생.
    - 해결 : 결과적으로 오류 및 설계미스를 찾지 못함으로 다른 방식을 통해 똑같이 구현. 가져온 이미지 src가 state 배열에 저장되도록 만듬으로서, 이미지삭제버튼 클릭시 엘레먼트를 숨기거나 삭제하는것이 아닌, state상태변경을 이용해 삭제와 같은 기능을 구현하였다.

- ImageSlide 컴포넌트
  - 다른 여러 페이지 및 컴포넌트가 추가됨으로서 이들과 효과적으로 작동할 수 있도록 코드 수정.
  - 이전에는 슬라이드 기능을 엘레먼트의 src에 이미지로 구성된 배열의 인덱스를 고정으로 두고 이미지의 순서를 직접 배열 요소 삭제/추가 기능을 통해 구현했었지만, 굉장히 비효율적인 구조였기에(왜 저렇게 만들었는지 의문...) src에 배열과 인덱스를 state를 이용해 변경하는 방식을 사용하였다.
    - 이전 기능은 효율로 보나 코드량으로 보나 쓸데없이 괴상하게 만든 형태였다.
    - 어떠한 기능을 제작하든, 생각하고 제작하자...

### 1.4.5(23.01.20)

- Post 페이지 작업 3

  - DB에 게시물정보 저장 구현.

- Main, PostBox, ImageSlide

  - 작업진행률이 높아진만큼 각각 구현했었고, 임시 데이터들을 넣었던 컴포넌트 및 페이지의 수정작업.
  - 대체적으로 각 게시물의 이미지 로드 및 해당 데이터가 구현한 여러 기능(ex Main페이지 게시물 슬라이드)등에서 정삭작동 하기위해 데이터전달 부분수정.

    - 이전에 코드 중 PostBox와 ImageSlide간의 props전달에서 예시 이미지를 사용하기 위해 ImageSlide에 고정이미지를 추가한채 개발을 해왔었지만, 'Main에서 DB로 게시물(post)데이터 요청, 요청데이터를 Main의 PostBox로 전달, PostBox에서 ImageSlide로 이미지데이터만 전달' 형태로 코드 수정.

      - Redux를 활용하는 방식으로 코드 수정.
        - Main에는 5개의 PostBox가 있고 게시물전환을 위해 redux로 관리하는 counter를 각 PostBox에 전달.
        - PostBox에서 Redux-persist를 사용하여 게시물데이터를 sessionStorage에 저장하고, PostBox에서 스토리지에 접근하여 props로 받은 counter에 해당되는 인덱스의 게시물데이터를 가져온다.
        - Main에서 게시물이동을 실행하면, countSlice의 count의 숫자가 변함으로 PostBox에 나타나는 데이터도 변화.

- lazy, suspense

  - PostBox에서 전달받은 props가 컴포넌트 최초 랜더링시 undefined로 나타나는 현상으로 인하여 컴포넌트 무한로딩 및 에러발생.
  - lazy와 Suspense를 사용하여 필요한 데이터가 로드되기 전까지 대기하는 방식을 사용.

    - 사용정보 검색을 했으나 대체적으로 페이지 로드시 사용방법으로만 사용설명을 하지만, 현재는 컴포넌트로드에 사용이 필요한 상황.

    ```html
    const LazyAbout = React.lazy(() => import("../components/PostBox"));
    //...생략
    <div>
      <React.Suspense fallback="Loading...">
        //...생략
        <LazyAbout num="{counter[0]}" />
        //...생략
        <LazyAbout num="{counter[1]}" />
        //...생략
      </React.Suspense>
    </div>
    ```

    - 형태로 PostBox 컴포넌트를 lazy를 사용한 LazyAbout으로 사용하고 LazyAbout을 가지는 전체적인 부분을 React.Suspense태그 내부에 배치하였다.
    - 정상작동! App.tsx의 라우터설정이 아닌 개별 컴포넌트에도 정상적으로 작동한다.
      - 페이지 첫 로드시 스토리지에 아무것도 없기에 postbox에러..
        - 로딩지연시간을 만들어 해결.

### 1.5.1 (23.01.25)

- UserEdit 작업

  - 작동 수정 작업
    - name 중복여부에 따라 안내문구 변경 및 Submit버튼의 작동 여부 결정.
    - showSlice를 사용하여 여러 컴포넌트에서 UserEdit컴포넌트의 시각여부 결정.
  - 사용자 정보를 수정 할 수 있는 UserEdit 컴포넌트를 백엔드서버와 연결하여 수정가능하도록 작업.
    - name 변경시 서버에 중복되는 name 존재하는지 검색
      - BackEnd : SELECT name FROM users WHERE name=이름' 쿼리를 통해 검색하며, result의 length를 통해 존재여부를 알 수 있도록 설정.
    - 수정할 정보 입력후 Submit 버튼을통해 MySQL의 정보 수정.
      - BackEnd : update users set name='${이름}' , password='${비밀번호}' , ... where id='${아이디}' 쿼리를 통해 수정.
      - UserEdit에서 작성을 하지 않은 부분은 공백이 되며 이것이 MySQL의 정보를 덮어쓰지 않도록 먼저 사용자 정보를 가져오고, 가져온 정보를 수정할 정보와 비교하여 공백으로 입력된 정보는 수정되지 않는 방식으로 설정하였다.
        ```js
        exports.postUserUpdate = (req, res) => {
          const paramId = req.body.id;
          const obj = {
            name: req.body.name,
            password: req.body.newpassword,
            birth: req.body.birth,
            email: req.body.email,
            intro: req.body.info,
          }; //req로 받은 정보 중 수정할 정보
          let updatedObj = {}; //최종 수정적용할 객체선언
          getConnection.getConnection((err, conn) => {
            const exec = conn.query(
              `SELECT * FROM users WHERE id='${paramId}' limit 1;`, //사용자 객체정보를 조회
              (err, result) => {
                conn.release();
                if (err) {
                  console.log(err);
                  return res.send(err);
                }
                if (result) {
                  for (let temp in obj) {
                    //조회한 사용자정보와 obj를 대조하여 obj의 요소의 값이 공백일시 continue, 아닐시 교체(수정).
                    if (obj[temp] === "") {
                      continue;
                    } else {
                      result[0][temp] = obj[temp];
                    }
                  }
                  updatedObj = result[0]; //위에서 수정될 정보를 입력한 result의 값을 updatedObj에 할당.
                  getConnection.getConnection((err, conn) => {
                    const execQuery = conn.query(
                      `update users set name='${updatedObj.name}', password='${updatedObj.password}', birth='${updatedObj.birth}', email='${updatedObj.email}', img='${updatedObj.img}', info='${updatedObj.intro}' where id='${updatedObj.id}';`,
                      (err, result) => {
                        //updatedObj를 사용해 사용자 정보 업데이트.
                        conn.release();
                        if (err) {
                          console.log(err);
                          return res.send(err);
                        }
                        if (result) {
                          console.log("success");
                          return res.send(result);
                        }
                      }
                    );
                  });
                }
              }
            );
          });
        };
        ```
    - respond를 통해 백엔드의 결과값 result를 사용해 userSlice에 해당하는 상태를 변경.
      - 모든 정보를 변경한 것이 아니기에 post, follow 등의 정보가 덮어씌어지지 않기위해 각각 따로 dispatch를 사용
      - 객체 복사 내장함수를 사용해봤지만 변경되지 않아야 할 부분도 같이 변경. 추후 방법 검색을 통해 효율적인 코드로 변화 필요.

### 1.5.2 (23.01.26)

- ImageUpload 컴포넌트 백엔드 연동
- Profile 페이지 백엔드 연동

  - profilepost 수정.
    - profile페이지에서 redux에 저장된 post를 가져와 map()을 통해 컴포넌트를 생성하고, 이때 받는 post데이터를 사용하기위해 수정.
    - 후에 profilepost 내부의 if문법을 정리할 필요가 있음. (if중첩 최대 3번, if를 return을 사용하여 나누어 보기 쉬운 코드를 작성하는것을 목표. )
  - 해당 페이지에는 자신이 작성한 post만 노출.

- 로그인, 회원가입, 글쓰기, 글 불러오기, 사용자정보 수정 등 기본적인 기능들을 구현하고 이를 백엔드작업과 연결하여 실질적인 웹사이트와 비슷한 기능을 구현.

  - 프론트엔드, 백엔드, DB 세가지를 배포하여 서버에서 작동되도록 작업 진행예정. 다만 프론트엔드 페이지 배포 이외의 백엔드 부분의 배포에 대해 공부가 필요함.
  - gh-pages를 사용하여 프론트엔드페이지만 배포를 하였으나 nodejs와 연결시 오류가 발생.
    - build부분에서 오류를 감지하고, 이를 직접적으로 수정 할 방법을 찾지 못하였기에 gh-pages를 삭제.
    - build폴더 자제를 삭제 및 재빌드 => 백엔드에서도 오류없이 프런트엔드 페이지를 로드.

- Header, Main, Settings 디자인 수정 및 전체 폰트 변경.

### 1.5.3 (23.01.26)

- 코드 점검 (코드 간략화 및 컴포넌트화 작업)

  - Main 페이지 수정

    - main.scss의 포스트 슬라이드 이동 애니메이션의 요소를 `animation: $name 0.25s linear forwards; margin: automargin();`를 get.scss의 mx-move에 삽입 및 이외의 불필요한 scss 요소 삭제. (-6line)
    - Main에 슬라이드 기능 버튼의 onclick 이벤트 내부의 코드를 onClickhandler 함수를 만들어 코드 단축. (-15line)

  - 로딩 스피너 기능을 컴포넌트화. 재사용 목적.

  - Profile, Post, Settings, Login 및 사용 컴포넌트의 코드 간략화 및 불필요한 SCSS 코드삭제.

- Pofile 페이지 수정

  - 공용 사용자인 'anonymous'가 작성한 게시물은 모든 사용자의 Profile페이지의 자신의 게시물에 포함되어 보여지도록 설정.

  ```js
  {
    inOrderPost
      .filter((data) => user.id === data.user_id || "anonymous")
      .map((data, index) => <ProfilePost PostState={data} index={index} />);
  }
  ```

  - 자신의 게시물이 anonymous가 작성한 모든 게시물보다 제일 위에 오도록 설정.

  ```js
  const [inOrderPost, setInOrderPost] = useState<PostState[]>([]);

  const changeIndex = () => { //useEffect에서 실행
    let temp: PostState[] = [...post.value];//배열 복사 redux에서 관리하는 post.
    post.value.map((data, index) => {//map()문법 사용하여 처리
      if (data.user_id === user.name) {
        temp.splice(index, 1);//인덱스 요소 삭제
        temp.unshift(data);//맨처음에 요소 삽입
      }
    });
    setInOrderPost((inOrderPost) => temp);//state에 배열 할당.
  };
  ```

### 1.5.4 (23.01.28)

- Axios Interceptor를 적용

  - 호출시마다 반복되는 axios 인스턴스 생성 제거.
  - 오류(404, 503, ...)에 따른 오류처리를 통합관리 가능.
  - 코드 축소 및 유지보수 용이.

- 코드 점검 - 불필요한 코드 축소 및 삭제

---

# 예정 (v1.3.2 ~ )

## 제작예정

- ~~회원가입~~
- 문의

## 작업중

- 게시물 검색 페이지 제작

## 수정 예정 & 수정 필요

- ~~로그인(수정) => redux 연동~~
- ~~메인 (수정) => 게시물 마무리~~
- ~~UserEdit의 redux dispatch부분의 연속적인 사용. -> 객체 복사 방식의 다른 방법 요구.~~
- 메인페이지 게시물 보기 방식 추가.
- ProfilePost의 기능함수의 분할 및 컴포넌트화 필요.

# 이외 오류 / 문제 해결 (v1.3.2 ~)

- Follow로 만든 마우스포인터 애니메이션이 Header의 "block-header-2"의 위에서만 엘레먼트 뒤로 위치해 가려지는 현상 발생.~~z-index의 우선순위 변경.

- 백엔드연동 이전에 로그인 정보 저장을 위해 redux-persist 사용. 저장 및 로드에는 이상이 없으나, 새로고침시 로딩이 상당히 오래걸리는 현상 발생. 타 우선작업위해 사용 보류.(230115).~~백엔드 연동, redux-persist 적용완료.

- Main페이지의 api데이터 로드 소요시간으로 인해 처음 입장시 모든 컴포넌트가 마운트가 안된채로 생성(공백 페이지)
  - 리엑트의 Suspence, Lazy와 제작한 로딩 컴포넌트를 사용하여 공백 및 무한로딩 현상 해결.
