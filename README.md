# 1

## 1.1

    - 기본 포스팅 구조 및 내부사항.

    - 로그인정보를 Redux를 통해 State에 저장.(추후 백엔드를 통한 작업 진행)

## 1.2

    - 로그인시 username 및 password의 길이조건 설정, 로그인 성공시 LoginSuccess컴포넌트 팝업, 실패시 alert를 이용한 조건알림 및 input의 value 초기화.
    - 메인페이지에 배열 요소의 추가와 삭제를 이용해 구현한 이미지박스  이미지박스(슬라이드)제작.
        - useState의 Array type 선언. (=useState<string[]>([]))
    - Likes버튼 클릭시 애니메이션 추가.
    - Header 작업
        - 메뉴버튼을 누르면 내려오는 메뉴가 Header를 가리는 현상 발생.
            - z-index를 사용해도 효과없음.
            - transform의 사용이 문제가 될수 있다고하지만, transform을 삭제해도 효과없음.
