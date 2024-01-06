클래스팅 테스트

해당 레포는 클래스팅 프론트엔드 과제를 위한 레포 입니다.
해당 프로젝트는 https://class-ting-test-f1pw.vercel.app 에서 확인 가능합니다.

주의사항: https://opentdb.com/api_config.php 에서 직접 API 를 이용하면 2번만 호출하여도 423 (too many call) 에러가 발생하여 json 파일을 직접 가져왔습니다.


사용한 기술
vite: 프로젝트 세팅을 위해 사용했습니다.
vitest: 단위, 통합 테스트를 위해 사용했습니다.

ErrorBoundary - 에러 처리를 위해서 ErrorBoundary 를 설정 하였습니다.
React Suspense - loading 에 대한 처리를 하기 위해서 suspense 를 설정하였습니다.
Context API - dependency Injection 및 quiz 에 대한 상태 관리를 위해 context api 를 사용했습니다.
React Query - 외부 에서 가져온 데이터를 관리하기 위해 React Query 를 사용했습니다.
Tailwind Css,
React-Router-Dom - client navigation 을 위해서 사용했습니다.
ChartJS - 간단한 차트를 그리기 위해서 사용했습니다.
Session Storage - 오답노트를 저장하기 위해서 사용했습니다.

tests

src/utils/__test__/transform.test.ts: 데이터 구조를 normalize 하고 검증 하는 부분은 테스트가 필요한 부분이기에 단위테스트를 구성했습니다.

src/storage/__test__/storage.test.ts: Session Storage 를 이용한 get, remove, set 이 잘 작동하는지에 대한 단위테스트 입니다. 특히 schema 를 통한 validation 이 작동하는지 알아보기 위해 작성했습니다.

src/components/__test__/question.test.tsx: 퀴즈 문제와 해당하는 answer 과 answer 을 클릭했을때 이벤트가 잘 동작하는지 알아보기 위해 테스트를 작성했습니다.

src/components/__test__/answer.test.tsx: currentAnswer 의 상태에 따라서 다르게 css 가 적용되는것을 확인하기 위해서 작성했습니다.

src/components/__test__/answerNoteForm.test.tsx: 오답노트 가 잘 렌더링 되는지와 오답노트를 저장했을때 잘 저장되는지 확인하기 위해서 테스트를 작성했습니다.