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
let counter:number = 1;

  function reRenderCardComponent  () {
    console.log("entre en reload components: estos son los cardParameters agraficar")
    console.log(context.cardParameters)

      let card :HTMLElement | null = document.getElementById('card_example_'+counter.toString());
      counter=counter+1;

      if(card)
        card.outerHTML="<div id=\"card_example_"+counter.toString()+"\"></div>"
     TSComponents.Card.render('card_example_'+counter.toString(), context.cardParameters);

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
                clearCard();
                reRenderCardComponent();
                updateErrorContainer("");
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
                clearCard();
            }
            );


}
 function filterAllFalsyValues(obj:any){
   return  Object.entries(obj).reduce((a:any,[k,v]) => (v ? (a[k]=v, a) : a), {});
}
// windowObject.addEventListener("load", function() {
//   console.log("entre en eventlistener load")
//   TSComponents.Card.render('card_example',
//   {
//   //     serieId: '148.3_INIVELNAL_DICI_M_26:percent_change',
//   //     color: '#F9A822',
//   //     hasChart: 'small',
//   //     title: "Indice de Precios al Consumidor Nacional",
//   //     links: "none"
//   // }
//   );
//   initializeComponents();
//   TSComponents.Graphic.render('graph_example', {
//       // Llamada a la API de Series de Tiempo
//       graphicUrl: 'https://apis.datos.gob.ar/series/api/series/?ids=tmi_arg',
//       title: 'Tasa de Mortalidad Infantil de Argentina',
//       source: 'Dirección de Estadística e Información en Salud (DEIS). Secretaría de Gobierno de Salud'
//   })
// })

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
        "<span class='p'>&lt;</span>\n    " +
        "<span class='nt'>script</span>\n    " +
        "<span class='p'>&gt;</span>\n    " +
        "<span class='nb'>window</span>\n    " +
        "<span class='p'>.</span>\n    " +
        "<span class='nx'>onload</span>\n    " +
        "<span class='o'>=</span>\n    " +
        "<span class='kd'>function</span>\n    " +
        "<span class='p'>()</span>\n    " +
        "<span class='p'>{</span>\n        " +
        "<span class='nx'>TSComponents</span><span class='p'>.</span>" +
        "<span class='nx'>Card</span>" +
        "<span class='p'>.</span>" +
        "<span class='nx'>render</span>" +
        "<span class='p'>(</span>" +
        "<span class='s1'>'tmi'</span>" +
        "<span class='p'>,</span>" +
        "<span class='p'>{</span>\n            " +
        "<span class='c1'>// ID de la serie solicitada</span>\n            " +
        "<span class='nx'>serieId</span><span class='o'>:</span>" +
        "<span class='s1'>'"+context.cardParameters?.serieId+"'</span>\n        " +
        "<span class='p'>})</span>\n    " +
        "<span class='p'>}</span>\n" +
        "<span class='p'>&lt;/</span>\n    " +
        "<span class='nt'>script</span>\n    " +
        "<span class='p'>&gt;</span>\n" +
        "</pre>"
    // const text = "\nwindow.onload = function() {\n" +
    //     "  TSComponents.Card.render('tmi', {\n" +
    //     "  // ID de la serie solicitada\n" +
    //     "  serieId: '"+context.cardParameters?.serieId+"'\n" +
    //     "     })\n" +
    //     "}";
    let codeTag = document.getElementById('codeTagCard');
    if(codeTag){
        codeTag.innerHTML = html;
    }
}
function initializeComponents() {
    if(!context) {
        context = {
            cardParameters:defaultCardParameters,
            graphicParameters: undefined,
            errorMap: new Array<{error:string }>()

        }
    }
        // reloadComponents();
    const reloadButton:HTMLButtonElement = document.getElementById("previewButton") as HTMLButtonElement;
    reloadButton?.addEventListener('click',updateValuesCard);
    const generateCardHtmlButton:HTMLButtonElement = document.getElementById("generateCardHTML") as HTMLButtonElement;
    generateCardHtmlButton?.addEventListener('click',generateCardHTML)
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
function clearCard(){
    let errorDiv = document.getElementById('card_example');
    if(errorDiv){
        errorDiv.innerHTML = "" ;
    }
}

initializeComponents();
export {initializeComponents,updateValuesCard,filterAllFalsyValues,generateCardHTML,validateSeries,updateErrorContainer,reRenderCardComponent,clearCard}
