import "../node_modules/ar-poncho/dist/css/poncho.min.css"
import "../node_modules/ar-poncho/dist/icono-arg.css"
import {CardParameters, ComponentesContext, GraphicParameters} from "./model/models";
import axios from 'axios';
import {AxiosResponse} from 'axios';
import queryString, { ParsedQuery } from 'query-string';

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
    chartOptions: {}, //TODO: default como objetos vacios o agrego undefined a la interface y los pongo como undefined?
    chartType: "line",
    chartTypeSelector: false,
    chartTypes: {},
    colors: Array.from(defaultColorsMap).flatMap(x=>x),
    datePickerEnabled: false,
    decimalLeftAxis: undefined,
    decimalRightAxis: undefined,
    decimalTooltip: undefined,
    decimalTooltips: undefined,
    decimalsBillion: 2,
    decimalsMillion: 2,
    displayUnits: false,
    endDate: "inicializarEnFetchDeSerie como la mas antigua",
    exportable: false,
    frequencySelector: false,
    graphicUrl: "",
    legendField: "",
    legendLabel: undefined,
    locale: "AR",
    navigator: false,
    numbersAbbreviate: true,
    seriesAxis: undefined,
    source: "",
    startDate: "inicializar en fetch de serie como la mas reciente",
    title: "",
    unitsSelector: false,
    zoom: false

}
let outputCardParameters:CardParameters ;
let outputGraphParameters:GraphicParameters;
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

    let card :HTMLElement | null = document.getElementById('graph_example_'+counterCard.toString());
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
            if(key.toString().includes('colorPalette')){
                let index = parseInt(key.substring(key.length-1,key.length)) as 0|1|2|3|4|5|6|7|8;
                updatedColorsMap.set(index,value.toString());
            }else if(key.toString().includes("chartOptions")){

            }else if(key.toString().includes("chartType")){

            }
            else{
                object[key] = value;
            }
        });
    object['colors'] = Array.from( updatedColorsMap).flatMap(x=>x);
    let objectComponent : GraphicParameters =
        {...defaultGraphParameters,
            ...object
        };

    context.graphicParameters = filterAllFalsyValues(objectComponent);
    let seriesIdFromGraphUrl =queryString.parseUrl(context.graphicParameters?.graphicUrl as string)
    let seriesId :ParsedQuery= seriesIdFromGraphUrl?.query ;
    let query = seriesId as {ids:string};
    let ids:Array<string> = Array.from(query.ids.split(','));
    validateSeries(ids,'')
        .then(
            ()=>{
                clearGraph();
                generateChartTypeSelects(ids);
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
                context.graphErrorMap.forEach((value)=>{oneStringErrors+='\n'+value});
                updateGraphErrorContainer(oneStringErrors);
                clearGraph();
            }
        );


}
function HTMLRowsForNotDefaultCardParameters(){
    outputCardParameters = Object.assign({},context.cardParameters); //arranco con los values actuales
    const mapDefault = new Map (Object.entries({...defaultCardParameters,numbersAbbreviate:true}));//  el valor por default de numbAbb es true, pero esta seteado en false arriba por practicidad (ver comentario arriba)
    let mapOutput = new Map (Object.entries(outputCardParameters));
    let htmlOutputForNotDefaultProps:string=getHtmlForDiffFields(mapOutput,mapDefault);

    return htmlOutputForNotDefaultProps;
  }

function getHtmlForDiffFields(mapOutput: Map<any, any> , mapDefault: Map<any,any>) {
    let htmlOutputForNotDefaultProps: string = ""
    mapOutput.forEach((value, key, map) => {
        if (mapDefault.get(key) == value) {
            map.delete(key);
        }
    })
    console.log(mapOutput);
    mapOutput.forEach((value, key) => {
        let separatorBegin = (value != true && value != false) ? "'" : " ";
        let separatorEnd = separatorBegin;

        if(key.toString().includes('colors')) {
            let formattedArray:Array<string|number> = value as Array<string|number>;
            let realformat = formattedArray.map((x,index)=>{
                if(index%2){
                   return "\""+x+"\"";
                }else{
                    return x;
                }
            })
            separatorBegin = '[';
            separatorEnd = ']';
             value = realformat;
        }
        htmlOutputForNotDefaultProps += "<span class='nx'>" + key + "</span><span class='o'>:</span>" +
            "<span class='s1'>" + separatorBegin + value.toString() + separatorEnd + ",</span>\n            ";
    })
    return htmlOutputForNotDefaultProps;
}

function HTMLRowsForNotDefaultGraphParameters(){
    outputGraphParameters = Object.assign({},context.graphicParameters); //arranco con los values actuales
    const mapDefault = new Map (Object.entries({...defaultGraphParameters}));//  el valor por default de numbAbb es true, pero esta seteado en false arriba por practicidad (ver comentario arriba)
    let mapOutput = new Map (Object.entries(outputGraphParameters));
    let htmlOutputForNotDefaultProps = getHtmlForDiffFields(mapOutput, mapDefault);
    return htmlOutputForNotDefaultProps;
}
 function filterAllFalsyValues(obj:any){

   return  Object.entries(obj).reduce(
       (a:any,[k,v]) => (!(v!==false&&(v==undefined||v=="")) ? (a[k]=v, a) : a)
       , {});
}
function generateCardHTML() {
    let html:string ="<pre>\n" +
        "<span class='c'>&lt;!-- código HTML donde ubicar un div con una tarjeta --&gt;</span>\n" +
        "<span class='p'>&lt;</span>" +
        "<span class='nt'>div</span> " +
        "<span class='na'>id</span>" +
        "<span class='o'>=</span>" +
        "<span class='s'>'tmi'</span>" +
        "<span class='p'>&gt;&lt;/</span> " +
        "<span class='nt'>div</span>" +
        "<span class='p'>&gt;</span>\n\n" +
        "<span class='c'>&lt;!-- JS que genera la tarjeta en el div --&gt;</span>\n" +
        "<span class='p'>&lt;</span>" +
        "<span class='nt'>script</span>" +
        "<span class='p'>&gt;</span>\n    " +
        "<span class='nb'>window</span>" +
        "<span class='p'>.</span>" +
        "<span class='nx'>onload</span> " +
        "<span class='o'>=</span> " +
        "<span class='kd'>function</span>" +
        "<span class='p'>()</span> " +
        "<span class='p'>{</span>\n        " +
        "<span class='nx'>TSComponents</span><span class='p'>.</span>" +
        "<span class='nx'>Card</span>" +
        "<span class='p'>.</span>" +
        "<span class='nx'>render</span>" +
        "<span class='p'>(</span>" +
        "<span class='s1'>'tmi'</span>" +
        "<span class='p'>,</span> "+
        "<span class='p'>{</span>\n            " +
        HTMLRowsForNotDefaultCardParameters() +
        "<span class='p'>})</span>\n    " +
        "<span class='p'>}</span>\n" +
        "<span class='p'>&lt;/</span>" +
        "<span class='nt'>script</span>" +
        "<span class='p'>&gt;</span>\n" +
        "</pre>"

    let codeTag = document.getElementById('codeTagCard');
    if(codeTag){
        codeTag.innerHTML = html;
    }
}
function generateGraphHTML() {
    let html:string ="<pre>\n" +
        "<span class='c'>&lt;!-- código HTML donde ubicar un div con un Graphic --&gt;</span>\n" +
        "<span class='p'>&lt;</span>" +
        "<span class='nt'>div</span> " +
        "<span class='na'>id</span>" +
        "<span class='o'>=</span>" +
        "<span class='s'>'tmi'</span>" +
        "<span class='p'>&gt;&lt;/</span> " +
        "<span class='nt'>div</span>" +
        "<span class='p'>&gt;</span>\n\n" +
        "<span class='c'>&lt;!-- JS que genera el Graph en el div --&gt;</span>\n" +
        "<span class='p'>&lt;</span>" +
        "<span class='nt'>script</span>" +
        "<span class='p'>&gt;</span>\n    " +
        "<span class='nb'>window</span>" +
        "<span class='p'>.</span>" +
        "<span class='nx'>onload</span> " +
        "<span class='o'>=</span> " +
        "<span class='kd'>function</span>" +
        "<span class='p'>()</span> " +
        "<span class='p'>{</span>\n        " +
        "<span class='nx'>TSComponents</span><span class='p'>.</span>" +
        "<span class='nx'>Graphic</span>" +
        "<span class='p'>.</span>" +
        "<span class='nx'>render</span>" +
        "<span class='p'>(</span>" +
        "<span class='s1'>'tmi'</span>" +
        "<span class='p'>,</span> "+
        "<span class='p'>{</span>\n            " +
        HTMLRowsForNotDefaultGraphParameters() +
        "<span class='p'>})</span>\n    " +
        "<span class='p'>}</span>\n" +
        "<span class='p'>&lt;/</span>" +
        "<span class='nt'>script</span>" +
        "<span class='p'>&gt;</span>\n" +
        "</pre>"

    let codeTag = document.getElementById('codeTagGraph');
    if(codeTag){
        codeTag.innerHTML = html;
    }
}
function initializeComponents() {
    if(!context) {
        context = {
            cardParameters:defaultCardParameters,
            graphicParameters: defaultGraphParameters,
            cardErrorMap: new Array<{error:string }>(),
            graphErrorMap: new Array<string>()

        }
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
function updateCardErrorContainer(errorString:string){
    let errorDiv = document.getElementById('card-error-container');
    if(errorDiv){
        errorDiv.textContent = errorString ;
    }
}function updateGraphErrorContainer(errorString:string){
    let errorDiv = document.getElementById('graph-error-container');
    if(errorDiv){
        errorDiv.textContent = errorString ;
    }
}
function clearCard(){
    let errorDiv = document.getElementById('card_example');
    if(errorDiv){
        errorDiv.innerHTML = "" ;
    }
}
function clearGraph(){
    let errorDiv = document.getElementById('graph_example');
    if(errorDiv){
        errorDiv.innerHTML = "" ;
    }
}
function generateChartTypeSelects(ids: Array<string>) {
    let container = document.getElementById('chartTypeBySeries');

    let baseHTMLSelect = (id:string)=> "<label for='chartTypeBySeries'>Tipo de gráfico para la serie: "+id+" </label><br>" +
          "<select name=\"chartTypes"+id+"\" class=\"format form-control\">" +
          "<option value=\"line\">Línea</option>" +
          "<option value=\"area\">Área</option>" +
          "<option value=\"column\">Columna</option>" +
          "</select>";
    let finalHTMLSelect ="";
    ids.forEach((id:string)=>{
        finalHTMLSelect+= baseHTMLSelect(id);
    })
    if(container){
        container.innerHTML=finalHTMLSelect;
    }
}
initializeComponents();
export {initializeComponents,updateValuesCard,filterAllFalsyValues,generateCardHTML,validateSeries,updateCardErrorContainer,reRenderCardComponent,clearCard}
