import "../node_modules/ar-poncho/dist/css/poncho.min.css"
import "../node_modules/ar-poncho/dist/icono-arg.css"
import {
    BySeriesObject,
    CardParameters,
    ChartType,
    ChartTypes,
    ComponentesContext,
    GraphicParameters
} from "./model/models";
import axios from 'axios';
import {AxiosResponse} from 'axios';
import queryString, { ParsedQuery } from 'query-string';
import {defaultOptions as highChartDefaultOptions} from 'highcharts';
import {
    clearCard,
    clearGraph,
    filterAllFalsyValues,
    generateCardHTML,
    generateChartTypeSelects, generateDecimalNumbersInTooltipBySeriesInput,
    generateGraphHTML, generateLegendLabelInputs, generateSeriesAxisSelects, updateCardErrorContainer,
    updateGraphErrorContainer
} from "./utils";
import DateTimeFormat = Intl.DateTimeFormat;
let dateTimeFormat:DateTimeFormat = new DateTimeFormat('fr-ca');
let objectBySeries : BySeriesObject = {};

const windowObject = window as any;
const TSComponents = windowObject.TSComponents;
const API_SERIES_URL:string = "https://apis.datos.gob.ar/series/api/series/";
let context:ComponentesContext;
let defaultCardParameters:CardParameters= {
    apiBaseUrl: "http://apis.datos.gob.ar/series/api",
        collapse: "",
        color: "#0072bb",
        decimals: 2,
        decimalsBillion: 2,
        decimalsMillion: 2,
        explicitSign: false,
        hasChart: "small",
        hasColorBar: false,
        hasFrame: false,
        isPercentage: false,
        links: "full",
        locale: "AR",
        numbersAbbreviate: true,//  en realidad el default es true para este campo, pero si aca pongo true no habria manera de desactivarlo, ya que solo se genera un par (key,value)
        serieId: "",                // en el form cuando el checkbox esta en checked. Entonces lo dejo checked por default en html y aca en false, cosa que si lo uncheckean
        source: "",                 // no aparece en los (key,value) y por lo tanto queda este valor
        title: "",
        units: "",
};
let defaultColorsMap = new Map<0|1|2|3|4|5|6|7|8, string>().set(0,"#0072bb").set(1,"#2e7d33").set(2,"#c62828").set(3,"#f9a822").set(4,"#6a1b99").set(5,"#ec407a").set(6,"#c2185b").set(7,"#039be5").set(8,"#6ea100");
let defaultGraphParameters:GraphicParameters = {
    aggregationSelector: false,
    backgroundColor: "#cdcdcd",
    chartOptions: highChartDefaultOptions, //TODO: default como objetos vacios o agrego undefined a la interface y los pongo como undefined?
    chartType: "line",
    chartTypeSelector: false,
    chartTypes: {},
    colors: Array.from(defaultColorsMap).flatMap(x=>x),
    datePickerEnabled: false,
    decimalLeftAxis: undefined,
    decimalRightAxis: undefined,
    decimalTooltip: undefined,
    decimalTooltips: {},
    decimalsBillion: 2,
    decimalsMillion: 2,
    displayUnits: false,
    endDate: "",
    exportable: false,
    frequencySelector: false,
    graphicUrl: "",
    legendField: "title",
    legendLabel: undefined,
    locale: "AR",
    navigator: false,
    numbersAbbreviate: true,
    seriesAxis: undefined,
    source: "",
    startDate: "",
    title: "",
    unitsSelector: false,
    zoom: false

}

let counterCard:number = 1;
let counterGraph:number = 1;

  function reRenderCardComponent  () {
    console.log("entre en reload components: estos son los cardParameters agraficar")
    console.log(context.cardParameters)

      let card :HTMLElement | null = document.getElementById('card_example_'+counterCard.toString());
      counterCard=counterCard+1;

      if(card)
        card.outerHTML="<div id=\"card_example_"+counterCard.toString()+"\"></div>"
     TSComponents.Card.render('card_example_'+counterCard.toString(), context.cardParameters);

}
function reRenderGraphComponent  () {
    console.log("entre en reload components: estos son los graphParam agraficar")
    console.log(context.graphicParameters)

    let card :HTMLElement | null = document.getElementById('graph_example_'+counterGraph.toString());
    counterGraph=counterGraph+1;

    if(card)
        card.outerHTML="<div id=\"graph_example_"+counterGraph.toString()+"\"></div>"
    TSComponents.Graphic.render('graph_example_'+counterGraph.toString(), context.graphicParameters);

}
function clearErrorMap() {
    context.cardErrorMap= [];
    // updateErrorContainer('');
}

function updateValuesCard () {
    const form:HTMLFormElement = document.getElementById("form-card") as HTMLFormElement;
    const formData:FormData = new FormData(form);
    var object :any = {};
    formData.forEach(
        (value, key) =>
        {
            object[key] = value;
            // let elementById = document.getElementsByName(key)?.item(0);
            // let checkboxes = elementById as HTMLInputElement;
            if(value.toString().includes("Disabled")){
                object[key] = false;
            }else if (value.toString().includes("Enabled")){
                object[key] = true;
            }
        });
    let objectComponent : CardParameters =
        {...defaultCardParameters,
            ...object,
            apiBaseUrl:(object.apiBaseUrl)?object.apiBaseUrl:defaultCardParameters.apiBaseUrl,
        };

    context.cardParameters = filterAllFalsyValues(objectComponent);
    let seriesArray = new Array<string>();
    seriesArray.push(context.cardParameters?.serieId as string);

    validateSeries(seriesArray,context.cardParameters?.collapse as string)
        .then(
            ()=>{
                clearCard();
                reRenderCardComponent();
                updateCardErrorContainer("");
                clearErrorMap();
            }
        )
        .catch(
            (error)=>{
                context.cardErrorMap = error.response.data.errors;
                // console.log(context.errorMap.values('\n'));
                let oneStringErrors:string='' ;
                context.cardErrorMap.forEach((value)=>{oneStringErrors+='\n'+value.error});
                updateCardErrorContainer(oneStringErrors);
                clearCard();
            }
            );


}
function updateValuesGraph () {
    const form:HTMLFormElement = document.getElementById("form-graph") as HTMLFormElement;
    const formData:FormData = new FormData(form);
    let updatedColorsMap:Map<0|1|2|3|4|5|6|7|8, string>= new Map(defaultColorsMap);
    var object :any = {};
    let chartTypes :ChartTypes = {};
    formData.forEach(
        (value, key) =>
        {
            // let elementById = document.getElementsByName(key)?.item(0);
            // let checkboxes = elementById as HTMLInputElement;
            if(value.toString().includes("Disabled")){
                object[key] = false;
            }else if (value.toString().includes("Enabled")) {
                object[key] = true;
            }
            else if(key.toString().includes('colorPalette')){
                let index = parseInt(key.substring(key.length-1,key.length)) as 0|1|2|3|4|5|6|7|8;
                updatedColorsMap.set(index,value.toString());
            }
            else if(key.toString().includes("chartTypes") && value != defaultGraphParameters.chartType){
                    chartTypes[key.toString().split('chartTypes')[1]] = value as ChartType;
            } else if(key.toString().includes("BySeries")&& value){
                let [realKey,series] = key.split('BySeries');
                if (!object[realKey]) {
                    object[realKey] = {[series]:{}}
                }
                let bySeries = object[realKey] as BySeriesObject;
                bySeries[series] = realKey.includes('decimal')?parseInt(value.toString()):value;
            }
            else if(key.toString().includes('Date')&&value){
                let stringDate:string = dateTimeFormat.format(Date.parse(value.toString()));
                object[key]=stringDate;
            }
            else if(!object[key]&& value && value != defaultGraphParameters[key]){
                object[key] = value;
            }
        });
    object['colors'] = Array.from( updatedColorsMap).flatMap(x=>x);
    let objectComponent : GraphicParameters =
        {...defaultGraphParameters,
            ...object
        };

    context.graphicParameters = filterAllFalsyValues(objectComponent);
    let seriesIdFromGraphUrl =queryString.parseUrl(context.graphicParameters?.graphicUrl? context.graphicParameters.graphicUrl as string :"");
    let seriesId :ParsedQuery= seriesIdFromGraphUrl?.query ;
    let query = seriesId as {ids:string};
    let ids:Array<string> = Array.from(query.ids?query.ids.split(','):"");
    context.seriesIdGraph = Array.from(ids);
    context.seriesIdGraph.forEach((element)=>objectBySeries[element]={});
    validateSeries(ids,'')
        .then(
            ()=>{
                clearGraph();
                generateLegendLabelInputs(ids)
                generateChartTypeSelects(ids);
                generateSeriesAxisSelects(ids);
                generateDecimalNumbersInTooltipBySeriesInput(ids);
                reRenderGraphComponent();
                updateGraphErrorContainer("");
                clearErrorMap();
            }
        )
        .catch(
            (error)=>{
                if(error.response) {
                    context.graphErrorMap = error.response.data.errors;
                }else{
                    context.graphErrorMap.push(error.message)
                }
                // console.log(context.errorMap.values('\n'));
                let oneStringErrors:string='' ;
                context.graphErrorMap.forEach(
                    (value)=>
                    {oneStringErrors+='\n'+value.error}
                    );
                updateGraphErrorContainer(oneStringErrors);
                clearGraph();
            }
        );


}



function initializeComponents() {
    if(!context) {
        context = {
            cardParameters:defaultCardParameters,
            graphicParameters: defaultGraphParameters,
            cardErrorMap: new Array<{error:string }>(),
            graphErrorMap: new Array<string>(),
            seriesIdGraph: new Array<string>(),

        }
        const previewButtonCard:HTMLButtonElement = document.getElementById("previewButtonCard") as HTMLButtonElement;
        previewButtonCard?.addEventListener('click',updateValuesCard);
        const generateCardHtmlButton:HTMLButtonElement = document.getElementById("generateCardHTML") as HTMLButtonElement;
        generateCardHtmlButton?.addEventListener('click',generateCardHTML)
        const previewButtonGraph:HTMLButtonElement = document.getElementById("previewButtonGraph") as HTMLButtonElement;
        previewButtonGraph?.addEventListener('click',updateValuesGraph);
        const generateGraphHTMLButton:HTMLButtonElement = document.getElementById("generateGraphHTML") as HTMLButtonElement;
        generateGraphHTMLButton?.addEventListener('click',generateGraphHTML)
}

}
function validateSeries(seriesId:Array<string>,collapse:string): Promise<AxiosResponse<any, any>>{
    let GraphParams=
                {
                    ids:seriesId.join(',') ,
                };
    let CardParams = {
        ...GraphParams,
        collapse:collapse,
        collapse_aggregation: 'sum'
    }
    let  FinalParams = (collapse)?CardParams:GraphParams;
    let paramsObject= { params: FinalParams}
    console.log(paramsObject)
    return axios.get(API_SERIES_URL,paramsObject);
}

window.onload = initializeComponents;
export {initializeComponents,updateValuesCard,context,defaultGraphParameters,defaultCardParameters,reRenderCardComponent}

