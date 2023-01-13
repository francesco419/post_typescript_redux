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
              "http://localhost:3000/profile";
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
