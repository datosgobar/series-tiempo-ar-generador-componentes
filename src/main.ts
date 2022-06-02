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
        hasColorBar: false,
        hasFrame: false,
        isPercentage: false,
        links: "full",
        locale: "AR",
        numbersAbbreviate: false,//  en realidad el default es true para este campo, pero si aca pongo true no habria manera de desactivarlo, ya que solo se genera un par (key,value)
        serieId: "",                // en el form cuando el checkbox esta en checked. Entonces lo dejo checked por default en html y aca en false, cosa que si lo uncheckean
        source: "",                 // no aparece en los (key,value) y por lo tanto queda este valor
        title: "",
        units: ""
};
let outputCardParameters:CardParameters ;
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
            let elementById = document.getElementsByName(key)?.item(0);
            let checkboxes = elementById as HTMLInputElement;
            if(checkboxes?.checked){
                object[key] = (checkboxes.checked);
            }
        });
    let objectComponent : CardParameters =
        {...defaultCardParameters,
            ...object,
            apiBaseUrl:(object.apiBaseUrl)?object.apiBaseUrl:defaultCardParameters.apiBaseUrl,
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
function HTMLRowsForNotDefaultParameters(){
    outputCardParameters = Object.assign({},context.cardParameters); //arranco con los values actuales
    const mapDefault = new Map (Object.entries({...defaultCardParameters,numbersAbbreviate:true}));//  el valor por default de numbAbb es true, pero esta seteado en false arriba por practicidad (ver comentario arriba)
    let mapOutput = new Map (Object.entries(outputCardParameters));
    let htmlOutputForNotDefaultProps:string=""
    mapOutput.forEach((value,key,map)=>{
        if(mapDefault.get(key)  == value){
            map.delete(key);
        }
    })
    console.log(mapOutput);
    mapOutput.forEach((value,key)=>{
         let separator = (value!=true&&value!=false)?"'":" ";
        htmlOutputForNotDefaultProps+= "<span class='nx'>"+key+"</span><span class='o'>:</span>" +
        "<span class='s1'>"+separator+value+separator+",</span>\n            " ;
    })
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
        HTMLRowsForNotDefaultParameters() +
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
export {initializeComponents,updateValuesCard,filterAllFalsyValues,generateCardHTML,validateSeries,updateErrorContainer,reRenderCardComponent,clearCard,HTMLRowsForNotDefaultParameters}
