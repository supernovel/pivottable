# pivottable
https://github.com/nicolaskruchten/pivottable 의 라이브러리를 수정한 저장소.\
plotly와 합치기 위해 jquery제거한 버전

# Todo
1. 기존 코드 분리 (90%)
    - pivotUI에서 그리는 부분 분리(0%)
    - jqueryUI 의 sortable 부분은 sortablejs로 대체(완료)
    - jqeury 부분 전부 제거(완료)
2. ploty.js | chart.js 렌더링 플러그인 작성 (0%)
3. 변수명 정리 (0%)
4. 최적화 (0%)

# 완료
1. webpack 설정파일 작성 (완료)

#Note
1. 기존 
   ```
        $().pivotUI(input, inputopts, overwrite, locale) 
   ```
   에서 
   ```
        pivotUi({
            target: 타켓 엘리먼트
            input: 데이터,
            inputOpts: 데이터 옵션,
            overwrite: 덮어쓰기,
            locale: 언어
        })
   ```
   으로 옵션을 오브젝트로 넘기보도록 변경 되어있음.
2. 기존 
   ```
        $().pivot(input, inputopts, locale) 
   ```
   에서 
   ```
        pivot({
            target: 타켓 엘리먼트
            input: 데이터,
            inputOpts: 데이터 옵션,
            locale: 언어
        })
   ```
   으로 옵션을 오브젝트로 넘기보도록 변경 되어있음.

3. 다중 테이블을 볼 수 있도록 테이블 선택 창 추가.\
   다중 테이블을 사용하고 싶다면 데이터를 다음과 같은 식으로 input키에 대한 값으로 넘기면 됨.\
   (pivotUI 함수에만 해당됨.)
   ``` 
        [{
            name: 테이블 이름1,
            data: 데이터 배열1
        },{
            name: 테이블 이름2,
            data: 데이터 배열2
        }, ...]
    ```
4. 나머지 자세한 사항 옵션은 원본 라이브러리 참고.\
   https://github.com/nicolaskruchten/pivottable