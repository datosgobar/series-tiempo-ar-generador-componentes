
interface GraphicParameters {

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
}
export type {ComponentesContext,GraphicParameters,CardParameters};