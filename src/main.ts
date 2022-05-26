import "../node_modules/ar-poncho/dist/css/poncho.min.css"
import "../node_modules/ar-poncho/dist/icono-arg.css"
import {CardParameters, ComponentesContext, GraphicParameters} from "./model/models";
const windowObject = window as any;
const TSComponents = windowObject.TSComponents;

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
const reloadComponents = function(){
    console.log("entre en reload components: estos son los cardParameters agraficar")
    console.log(context.cardParameters)
    TSComponents.Card.render('card_example', context.cardParameters);
}

const updateValuesCard = function () {
    const form:HTMLFormElement = document.getElementById("form-card") as HTMLFormElement;
    const formData:FormData = new FormData(form);
    formData.forEach(file=> console.log(file));
    var object :any = {};
    formData.forEach((value, key) => { object[key] = value});
    let objectComponent : CardParameters =
        {...context.cardParameters,
            apiBaseUrl:(!object.apiBaseUrl)?object.apiBaseUrl:defaultCardParameters.apiBaseUrl,
            ...object};
    console.log(objectComponent)
    context.cardParameters = objectComponent;
    reloadComponents();

}
windowObject.addEventListener("load", function() {
  console.log("entre en eventlistener load")
  TSComponents.Card.render('card_example', {
      serieId: '148.3_INIVELNAL_DICI_M_26:percent_change',
      color: '#F9A822',
      hasChart: 'small',
      title: "Indice de Precios al Consumidor Nacional",
      links: "none"
  });
  initializeComponents();
  TSComponents.Graphic.render('graph_example', {
      // Llamada a la API de Series de Tiempo
      graphicUrl: 'https://apis.datos.gob.ar/series/api/series/?ids=tmi_arg',
      title: 'Tasa de Mortalidad Infantil de Argentina',
      source: 'Dirección de Estadística e Información en Salud (DEIS). Secretaría de Gobierno de Salud'
  })
})


const initializeComponents = function(){
    if(!context) {
        context = {
            cardParameters:defaultCardParameters,
            graphicParameters: undefined

        }
    }
        // reloadComponents();
    const reloadButton:HTMLButtonElement = document.getElementById("generateButton") as HTMLButtonElement;
    reloadButton?.addEventListener('click',function handleClick(event){
        updateValuesCard();
    })
}
export {initializeComponents,updateValuesCard,reloadComponents}
