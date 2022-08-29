# series-tiempo-ar-generador-componentes
Micrositio para generar código HTML  a partir de un formulario y así personalizar componentes web de series de tiempo fácilmente.

En la barra lateral se encuentra un menú de navegación para ubicar la vista  en el formulario sobre el cual se quiera  trabajar.
## Formulario de previsualización de Componente Card
Este formulario contiene todos los campos personalizables de este componente. Siendo el unico obligatorio el de ID de serie,  el resto quedarán en su valor default a menos que se indique otro valor  en el formulario.
Para ver valores default de cada propiedad del componente consultar [documentación del componente](https://datosgobar.github.io/series-tiempo-ar-explorer/reference/ts-components/card/).

### Modo de uso
Indicar ID de serie a representar en la card y clickear en botón de previsualización, luego de esto aparecera ,en la esquina superior derecha  del formulario , la vista previa de  dicha serie correspondiente con todos los valores default .
Lo siguiente es modificar los distintos parámetros del formulario y clickear previsualizar cada vez que se quiera hasta llegar a la versión que más se ajuste a lo deseado.
Finalmente clickear botón 'Generar HTML' , esto generará  el código HTML con el cual se puede reproducir el estado actual (previsualizado) del componente.


## Formulario de previsualización de Componente Graph

Este formulario contiene todos los campos personalizables de este componente. Siendo el unico obligatorio el de URL de serie a graficar,  el resto quedarán en su valor default a menos que se indique otro valor  en el formulario.

Para ver valores default de cada propiedad del componente consultar [documentación del componente](https://datosgobar.github.io/series-tiempo-ar-explorer/reference/ts-components/graphic/).

Los campos del formulario que se correspondan con una personalización de una serie en específico estarán disponibles  después de haber hecho una previsualización, de esta manera  se validan y leen las series para poder mapear dichas personalizaciones.


### Modo de uso
Indicar URL de serie/s a representar en el gráfico y clickear en botón de previsualización, luego de esto aparecera , debajo del formulario ,  la vista previa (o cualquier error en la elección de  parámetros) de  dicha/s serie/s correspondiente con todos los valores default .
Lo siguiente es modificar los distintos parámetros del formulario y clickear previsualizar cada vez que se quiera hasta llegar a la versión que más se ajuste a lo deseado. 
Finalmente clickear botón 'Generar HTML' , esto generará  el código HTML con el cual se puede reproducir el estado actual (previsualizado) del componente.
