import {context, defaultCardParameters, defaultGraphParameters} from "./main";
import { CardParameters, GraphicParameters} from "./model/models";

let outputCardParameters:CardParameters ;
let outputGraphParameters:GraphicParameters;
function HTMLRowsForNotDefaultGraphParameters(){
    outputGraphParameters = Object.assign({},context.graphicParameters); //arranco con los values actuales
    const mapDefault = new Map (Object.entries({...defaultGraphParameters}));//  el valor por default de numbAbb es true, pero esta seteado en false arriba por practicidad (ver comentario arriba)
    let mapOutput = new Map (Object.entries(outputGraphParameters));
    reduceMapToDiffParameters(mapOutput,mapDefault);
    let htmlOutputForNotDefaultProps = getHtmlFromMap(mapOutput);
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

    updateCodeSnippetCard(html);

}
function generateGraphHTML() {
    let html:string ="<pre>\n" +
        "<span class='c'>&lt;!-- código HTML donde ubicar un div con un Graphic --&gt;</span>\n" +
        "<span class='p'>&lt;</span>" +
        "<span class='nt'>div</span> " +
        "<span class='na'>id</span>" +
        "<span class='o'>=</span>" +
        "<span class='s'>'tmi'</span>" +
        "<span class='p'>&gt;&lt;/</span>" +
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
        updateCodeSnippetGraph(html);

}
function updateCodeSnippetGraph(content:string){
    let codeTag = document.getElementById('codeTagGraph');
    if(codeTag){
        codeTag.innerHTML = content;
    }
}
function updateCodeSnippetCard(content:string){
    let codeTag = document.getElementById('codeTagCard');
    if(codeTag){
        codeTag.innerHTML = content;
    }
}
function HTMLRowsForNotDefaultCardParameters(){
    outputCardParameters = Object.assign({},context.cardParameters); //arranco con los values actuales
    const mapDefault = new Map (Object.entries({...defaultCardParameters,numbersAbbreviate:true}));//  el valor por default de numbAbb es true, pero esta seteado en false arriba por practicidad (ver comentario arriba)
    let mapOutput = new Map (Object.entries(outputCardParameters));
    reduceMapToDiffParameters(mapOutput,mapDefault);
    let htmlOutputForNotDefaultProps:string=getHtmlFromMap(mapOutput);

    return htmlOutputForNotDefaultProps;
}
function reduceMapToDiffParameters(mapToReduce:Map<any,any>,referenceMap:Map<any,any>) {
    mapToReduce.forEach((value, key, map) => {
        if (referenceMap.get(key) == value) {
            map.delete(key);
        }
    })
}
function getHtmlFromMap(map: Map<any, any> ) {
    let htmlOutputForNotDefaultProps: string = ""
    console.log(map);
    map.forEach((value, key) => {
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
    let options = new Map<string,string>();
    options.set("line","Línea").set("area","Área").set("column","Columna");
    generateSelectsInContainerLabeledById(ids,'chartTypeBySeries',options,"Tipo de gráfico para la serie:");
}
function generateSeriesAxisSelects(ids: Array<string>){
    let options = new Map<string,string>();
    options.set("right","Derecha").set("left","Izquierda");
    generateSelectsInContainerLabeledById(ids,"seriesAxisBySeries",options,"Ubicación del eje para la serie:");
}
function generateSelectsInContainerLabeledById(ids: Array<string>,container_id:string,options:Map<string,string>,legend:string) {
    let container = document.getElementById(container_id);
    let getOptionHTML = (optionValue:string,optionLegend:string)=>
    {
       return "<option value=\""+optionValue+"\">"+optionLegend+"</option>"
    };
    let optionHtml = getOptionHTML("","");
    options.forEach((key,value)=> optionHtml+=getOptionHTML(value,key));
    let baseHTMLSelect = (idSerie:string)=> "<label for='"+container_id+"'>"+legend+idSerie+" </label><br>" +
        "<select name=\""+container_id+idSerie+"\" class=\"format form-control\">" +
        optionHtml
        +"</select>";
    let finalHTMLSelect ="";
    ids.forEach((id:string)=>{
        finalHTMLSelect+= baseHTMLSelect(id);
    })
    if(container){
        container.innerHTML=finalHTMLSelect;
    }
}
function generateDecimalNumbersInTooltipBySeriesInput(ids:Array<string>){
    generateInputsInContainerBySeriesId(ids,'decimalTooltipsBySeries',"number",
        "Cantidad de decimales en tooltip para la serie:")
}
function generateLegendLabelInputs(ids: Array<string>) {
    generateInputsInContainerBySeriesId(ids,'legendLabelBySeries',"text",
        "Texto en leyenda para la serie:")
}
function generateInputsInContainerBySeriesId(seriesIds: Array<string>,containerId:string,inputType:"number"|"text",legend:string) {
    let container = document.getElementById(containerId);

    let baseHTMLInput = (id:string)=> "<label for='"+containerId+"'>"+legend+" "+id+" </label><br>" +
        "<input type=\""+inputType+"\" class=\"form-control\" name=\""+containerId+id+"\" >";
    let finalHTMLSelect ="";
    seriesIds.forEach((id:string)=>{
        finalHTMLSelect+= baseHTMLInput(id);
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
export  {HTMLRowsForNotDefaultGraphParameters,generateCardHTML,filterAllFalsyValues,generateGraphHTML,
    HTMLRowsForNotDefaultCardParameters,getHtmlFromMap,generateChartTypeSelects,clearGraph,clearCard,
    updateGraphErrorContainer,updateCardErrorContainer,generateLegendLabelInputs,generateSeriesAxisSelects,
    generateDecimalNumbersInTooltipBySeriesInput,reduceMapToDiffParameters,updateCodeSnippetGraph,updateCodeSnippetCard};