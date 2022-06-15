import {context, defaultGraphParameters} from "./main";
import {CardParameters, GraphicParameters} from "./model/models";

let outputCardParameters:CardParameters ;
let outputGraphParameters:GraphicParameters;
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

        if(key.toString().includes('chartOptions')){
            value = JSON.stringify(value);
            separatorEnd='';
            separatorBegin='';
        }
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
function updateCardErrorContainer(errorString:string){
    let errorDiv = document.getElementById('card-error-container');
    if(errorDiv){
        errorDiv.textContent = errorString ;
    }
}
function updateGraphErrorContainer(errorString:string){
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
export  {HTMLRowsForNotDefaultGraphParameters,generateCardHTML,filterAllFalsyValues,generateGraphHTML,HTMLRowsForNotDefaultCardParameters,getHtmlForDiffFields,generateChartTypeSelects,clearGraph,clearCard,updateGraphErrorContainer,updateCardErrorContainer};