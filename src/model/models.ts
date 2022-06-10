
interface HighChartOptions {
}
type ChartType = "line"|"column"|"area";
interface ChartTypes {
    [serie: string]: ChartType;
}

interface LegendLabels {
    [serie: string]: string;
}

interface SeriesAxis {
    [serie: string]: "right"|"left";
}

interface DecimalToolTips {
    [serie: string]: number;
}

interface GraphicParameters {
    graphicUrl:string;
    chartOptions:HighChartOptions;
    navigator:boolean;
    locale:"AR"|"US";
    zoom:boolean;
    exportable:boolean;
    colors:Map<0|1|2|3|4|5|6|7|8,string>;
    backgroundColor:string;
    datePickerEnabled:boolean;
    legendField:string;
    chartTypes:ChartTypes;
    title:string;
    source:string;
    displayUnits:boolean;
    legendLabel:LegendLabels|undefined;
    seriesAxis: SeriesAxis|undefined;
    chartType:ChartType;
    decimalLeftAxis:number|undefined;
    decimalRightAxis:number|undefined;
    decimalTooltips:DecimalToolTips|undefined;
    decimalTooltip:number|undefined;
    numbersAbbreviate:boolean;
    decimalsBillion:number;
    decimalsMillion:number;
    startDate: string;
    endDate: string;
    frequencySelector:boolean;
    aggregationSelector:boolean;
    unitsSelector:boolean;
    chartTypeSelector:boolean;

}
interface CardParameters {
    serieId:string;
    locale:"AR"|"US";
    links:"full"|"small";
    color: any;
    hasChart:"full"| "small";
    explicitSign:boolean;
    title:string;
    source:string;
    units:string;
    hasFrame:boolean|undefined;
    hasColorBar:boolean|undefined;
    collapse:""|"day"|"month"|"quarter"|"semester"|"year";
    apiBaseUrl:string;
    decimals:number;
    numbersAbbreviate:boolean;
    decimalsBillion:number;
    decimalsMillion:number;
    isPercentage:boolean|undefined;
}
interface ComponentesContext {
    graphicParameters:GraphicParameters|undefined;
    cardParameters:CardParameters|undefined;
    cardErrorMap: Array<{error:string }>;
    graphErrorMap: Array<string>;
}
export type {ComponentesContext,GraphicParameters,CardParameters};