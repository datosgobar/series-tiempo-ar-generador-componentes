import "../node_modules/ar-poncho/dist/css/poncho.min.css"
import "../node_modules/ar-poncho/dist/icono-arg.css"
import {CardParameters, ComponentesContext} from "./model/models";
import axios from 'axios';
import {AxiosResponse} from 'axios';


const windowObject = window as any;
const TSComponents = windowObject.TSComponents;
const API_SERIES_URL:string = "https://apis.datos.gob.ar/series/api/series/";
let context:ComponentesContext;
let defaultCardParameters:CardParameters= {
    apiBaseUrl: "http://apis.datos.gob.ar/series/api",
        collapse: "",
        color: "#0072BB",
        decimals: 2,
        decimalsBillion: 2,
        decimalsMillion: 2,
        explicitSign: false,
        hasChart: "small",
        hasColorBar: undefined,
        hasFrame: undefined,
        isPercentage: undefined,
        links: "full",
        locale: "AR",
        numbersAbbreviate: true,
        serieId: "",
        source: "",
        title: "",
        units: ""
};
 export function reRenderCardComponent  () {
    console.log("entre en reload components: estos son los cardParameters agraficar")
    console.log(context.cardParameters)
     
     TSComponents.Card.render('card_example', context.cardParameters);

        //     .then(
        //     (error:any)=>{
        //         console.log(error)
        //     }
        // );

    // .catch(
    // (error:PromiseRejectedResult)=>{
    //     context.errorMap.set("serieId",error.reason);
    // }
    // );
}

function clearErrorMap() {
    context.errorMap= [];
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
            let elementById = document.getElementById(key);
            let checkboxes = elementById as HTMLInputElement;
            if(checkboxes?.checked){
                object[key] = (checkboxes.checked);
            }
        });
    let objectComponent : CardParameters =
        {...context.cardParameters,
            ...object,
            apiBaseUrl:(object.apiBaseUrl)?object.apiBaseUrl:defaultCardParameters.apiBaseUrl,
            // // traduzco el "on/off" de los checkboxes en true/false
            // hasChart:(object['hasChart'])?object['hasChart']=='on'?true:false:undefined,
            // hasColorBar:(object['hasColorBar'])?object['hasColorBar']=='on'?true:false:undefined,
            // hasFrame:(object['hasFrame'])?object['hasFrame']=='on'?true:false:undefined,
            // isPercentage:(object['isPercentage'])?object['isPercentage']=='on'?true:false:undefined,
        };

    context.cardParameters = filterAllFalsyValues(objectComponent);
    validateSeries(context.cardParameters?.serieId as string,context.cardParameters?.collapse as string)
        .then(
            ()=>{
                reRenderCardComponent();
                clearErrorMap();
            }
        )
        .catch(
            (error)=>{
                context.errorMap = error.response.data.errors;
                // console.log(context.errorMap.values('\n'));
                let oneStringErrors:string='' ;
                context.errorMap.forEach((value)=>{oneStringErrors+='\n'+value.error});
                updateErrorContainer(oneStringErrors);
            }
            );


}
 function filterAllFalsyValues(obj:any){
   return  Object.entries(obj).reduce((a:any,[k,v]) => (v ? (a[k]=v, a) : a), {});
}
// windowObject.addEventListener("load", function() {
//   console.log("entre en eventlistener load")
//   // TSComponents.Card.render('card_example', {
//   //     serieId: '148.3_INIVELNAL_DICI_M_26:percent_change',
//   //     color: '#F9A822',
//   //     hasChart: 'small',
//   //     title: "Indice de Precios al Consumidor Nacional",
//   //     links: "none"
//   // });
//   initializeComponents();
//   TSComponents.Graphic.render('graph_example', {
//       // Llamada a la API de Series de Tiempo
//       graphicUrl: 'https://apis.datos.gob.ar/series/api/series/?ids=tmi_arg',
//       title: 'Tasa de Mortalidad Infantil de Argentina',
//       source: 'Dirección de Estadística e Información en Salud (DEIS). Secretaría de Gobierno de Salud'
//   })
// })

function generateCardHTML() {
     const text = "\nwindow.onload = function() {\n" +
         "  TSComponents.Card.render('tmi', {\n" +
         "  // ID de la serie solicitada\n" +
         "  serieId: '"+context.cardParameters?.serieId+"'\n" +
         "     })\n" +
         "}";
     let codeTag = document.getElementById('codeTagCard');
         if(codeTag){
             codeTag.textContent = text;
         }
}
function initializeComponents() {
    if(!context) {
        context = {
            cardParameters:defaultCardParameters,
            graphicParameters: undefined,
            errorMap: new Array<string>()

        }
    }
        // reloadComponents();
    const reloadButton:HTMLButtonElement = document.getElementById("previewButton") as HTMLButtonElement;
    reloadButton?.addEventListener('click',function handleClick(){
        updateValuesCard();
    })
    const generateCardHtmlButton:HTMLButtonElement = document.getElementById("generateCardHTML") as HTMLButtonElement;
    generateCardHtmlButton?.addEventListener('click',function handleClick(){
        generateCardHTML();
    })
}
function validateSeries(seriesId:string,collapse:string): Promise<AxiosResponse<any, any>>{
     return axios.get(API_SERIES_URL,{params:{ids:seriesId , collapse:collapse,collapse_aggregation:'sum'}});
}
function updateErrorContainer(errorString:string){
    let errorDiv = document.getElementById('error-container');
    if(errorDiv){
        errorDiv.textContent = errorString ;
    }
}
initializeComponents();
export {initializeComponents,updateValuesCard,filterAllFalsyValues,generateCardHTML,validateSeries,updateErrorContainer}
