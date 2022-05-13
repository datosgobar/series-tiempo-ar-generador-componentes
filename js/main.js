function makeRequest() {
    const catalog_url = $("input[name=catalog_url]").val();
    const distribution_id = $("input[name=distribution_id]").val().toString();
    const format = $("select.format").children("option:selected").val();
    
    const $errorsContainer = $(".errors-container");
    $errorsContainer.empty();
    $errorsContainer.append("<h4>Validando catálogo...</h4>");

    $.ajax({
        type: "POST",
        url: "https://apis.datos.gob.ar/series/api/validate/",
        dataType: "json",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            "catalog_url": catalog_url,
            "distribution_id": distribution_id,
            "format": format,
        }),
        success: function(data){
            const issuesCount = data.found_issues;
            $errorsContainer.empty();
            $errorsContainer.append("<h4>Resultados de la validación:</h4>");
            if (issuesCount < 1) {
                $errorsContainer.append("<div class='alert alert-success'><p>La distribución cargada no tiene errores<p></div>");
            }
            else {
                issuesDetails = data.detail;
                issuesDetails.forEach(issue => {
                    $errorsContainer.append(`<div class="alert alert-danger"><p>${issue}<p></div>`);
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(jqXHR.statusText);
        },

    });
}

window.addEventListener("load", function() {

    TSComponents.Card.render('card_example', {
        serieId: '148.3_INIVELNAL_DICI_M_26:percent_change',
        color: '#F9A822',
        hasChart: 'small',
        title: "Indice de Precios al Consumidor Nacional",
        links: "none"
    });

    TSComponents.Graphic.render('graph_example', {
        // Llamada a la API de Series de Tiempo
        graphicUrl: 'https://apis.datos.gob.ar/series/api/series/?ids=tmi_arg',
        title: 'Tasa de Mortalidad Infantil de Argentina',
        source: 'Dirección de Estadística e Información en Salud (DEIS). Secretaría de Gobierno de Salud'
    })
})
