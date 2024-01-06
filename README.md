클래스팅 테스트

해당 레포는 클래스팅 프론트엔드 과제를 위한 레포 입니다.

주의사항: https://opentdb.com/api_config.php 에서 직접 API 를 이용하면 2번만 호출하여도 423 (too many call) 에러가 발생하여 json 파일을 직접 가져왔습니다.



tests

src/utils/__test__/transform.test.ts: 데이터 구조를 normalize 하고 검증 하는 부분은 테스트가 필요한 부분이기에 단위테스트를 구성했습니다.

src/storage/__test__/storage.test.ts: Session Storage 를 이용한 get, remove, set 이 잘 작동하는지에 대한 단위테스트 입니다. 특히 schema 를 통한 validation 이 작동하는지 알아보기 위해 작성했습니다.

src/components/__test__/question.test.tsx: 퀴즈 문제와 해당하는 answer 과 answer 을 클릭했을때 이벤트가 잘 동작하는지 알아보기 위해 테스트를 작성했습니다.

src/components/__test__/answer.test.tsx: currentAnswer 의 상태에 따라서 다르게 css 가 적용되는것을 확인하기 위해서 작성했습니다.

src/components/__test__/answerNoteForm.test.tsx: 오답노트 가 잘 렌더링 되는지와 오답노트를 저장했을때 잘 저장되는지 확인하기 위해서 테스트를 작성했습니다.