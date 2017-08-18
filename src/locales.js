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
        
    },
    renderers: {
        
    },
    localeStrings: {
        renderError: "결과에 대한 그리기에 실패 하였습니다.",
        computeError: "결과에 대한 계산에 실패 하였습니다.",
        uiRenderError: "테이블 그리기에 실패 하였습니다.",
        selectAll: "전체 선택",
        selectNone: "전체 선택 해제",
        tooMany: "(너무 목록이 많습니다.)",
        filterResults: "필터 값",
        apply: "적용",
        cancel: "취소",
        totals: "전체",
        vs: "vs",
        by: "by"
    }
}