/**
 *  Name : locales.js
 *  Explain : 
 * 
 */

var Locales = module.exports = {};


Locales.eng = Locales.en = {
    aggregators: {
        count: "Count",
        countUniqueValues: "Count Unique Values",
        listUniqueValues: "List Unique Values",
        sum : "Sum",
        integerSum : "Integer Sum",
        average: "Average",
        median: "Median",
        sampleVariance: "Sample Variance",
        sampleStandardDeviation: "Sample Standard Deviation",
        minimum: "Minimum",
        maximum: "Maximum",
        first: "First",
        last: "Last",
        sumOverSum: "Sum over Sum",
        etyPerUpperBound: "80% Upper Bound",
        etyPerLowerBound: "80% Lower Bound",
        sumFractionTotal: "Sum as Fraction of Total",
        sumFractionRows: "Sum as Fraction of Rows",
        sumFractionColumns: "Sum as Fraction of Columns",
        countFractionTotal: "Count as Fraction of Total",
        countFractionRows: "Count as Fraction of Rows",
        countFractionColumns: "Count as Fraction of Columns"
    },
    renderers:{
        table: "Table",
        tableBar: "Table Barchart",
        heatmap: "Heatmap",
        rowHeatmap: "Row Heatmap",
        colHeatmap: "Col Heatmap"
    },
    localeStrings: {
        renderError: "An error occurred rendering the PivotTable results.",
        computeError: "An error occurred computing the PivotTable results.",
        uiRenderError: "An error occurred rendering the PivotTable UI.",
        selectAll: "Select All",
        selectNone: "Select None",
        optionSelect: "Select Option",
        tooMany: "(too many to list)",
        filterResults: "Filter values",
        apply: "Apply",
        cancel: "Cancel",
        totals: "Totals",
        vs: "vs",
        by: "by"
    }
}

Locales.kor = Locales.kr = {
    aggregators: {
        count: "갯수",
        countUniqueValues: "중복이 아닌 값 갯수",
        listUniqueValues: "중복이 아닌 리스트",
        sum : "합계",
        integerSum : "정수 합계",
        average: "평균",
        median: "중간값",
        sampleVariance: "Sample Variance",
        sampleStandardDeviation: "Sample Standard Deviation",
        minimum: "최대",
        maximum: "최소",
        first: "첫번째 값",
        last: "마지막 값",
        sumOverSum: "다중 합계",
        etyPerUpperBound: "80% 이상",
        etyPerLowerBound: "80% 이하",
        sumFractionTotal: "전체 합에 대한 지수",
        sumFractionRows: "각 열의 합에 대한 지수",
        sumFractionColumns: "각 행의 합에 대한 지수",
        countFractionTotal: "전체 갯수에 대한 지수",
        countFractionRows: "각 열의 갯수에 대한 지수",
        countFractionColumns: "각 행의 갯수에 대한 지수"
    },
    renderers: {
        table: "표",
        tableBar: "표 막대그래프",
        heatmap: "Heatmap",
        rowHeatmap: "열 Heatmap",
        colHeatmap: "행 Heatmap"
    },
    localeStrings: {
        renderError: "결과에 대한 그리기에 실패 하였습니다.",
        computeError: "결과에 대한 계산에 실패 하였습니다.",
        uiRenderError: "테이블 그리기에 실패 하였습니다.",
        selectAll: "전체 선택",
        selectNone: "전체 선택 해제",
        optionSelect: "옵션 선택",
        tooMany: "(너무 목록이 많습니다.)",
        filterResults: "필터 값",
        apply: "적용",
        cancel: "취소",
        totals: "전체",
        vs: "vs",
        by: "by"
    }
}