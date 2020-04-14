

async function getARR() {


  const response = await fetch('/coordinates', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
  })

  const result = await response.json();
  const arr = result.events
  console.log(arr[5].coordinates);
  return arr

}


ymaps.ready(init);

async function init() {
  const arr = await getARR();

  const myMap = new ymaps.Map("map", {
    center: [55.76, 37.64],
    zoom: 10
  }, {
    searchControlProvider: 'yandex#search'
  }),
    // Значения цветов иконок.
    placemarkColors = [
      '#DB425A', '#4C4DA2', '#00DEAD', '#D73AD2',
      '#F8CC4D', '#F88D00', '#AC646C', '#548FB7'
    ],
    clusterer = new ymaps.Clusterer({
      // Макет метки кластера pieChart.
      clusterIconLayout: 'default#pieChart',
      // Радиус диаграммы в пикселях.
      clusterIconPieChartRadius: 25,
      // Радиус центральной части макета.
      clusterIconPieChartCoreRadius: 10,
      // Ширина линий-разделителей секторов и внешней обводки диаграммы.
      clusterIconPieChartStrokeWidth: 3,
      // Определяет наличие поля balloon.
      hasBalloon: false
    }),

    // Создаем геообъект с типом геометрии "Точка".
    myGeoObject = new ymaps.GeoObject({
      // Описание геометрии.
      geometry: {
        type: "Point",
        coordinates: arr[77].coordinates
      },
      // Свойства.
      properties: {
        // Контент метки.
        iconContent: 'Я тащусь',
        hintContent: 'Ну давай уже тащи'
      }
    }, {
      // Опции.
      // Иконка метки будет растягиваться под размер ее содержимого.
      preset: 'islands#blackStretchyIcon',
      // Метку можно перемещать.
      draggable: true
    }),
    myPieChart = new ymaps.Placemark([
      arr[33].coordinates
    ], {
      // Данные для построения диаграммы.
      data: [
        { weight: 8, color: '#0E4779' },
        { weight: 6, color: '#1E98FF' },
        { weight: 4, color: '#82CDFF' }
      ],
      iconCaption: "Диаграмма"
    }, {
      // Зададим произвольный макет метки.
      iconLayout: 'default#pieChart',
      // Радиус диаграммы в пикселях.
      iconPieChartRadius: 30,
      // Радиус центральной части макета.
      iconPieChartCoreRadius: 10,
      // Стиль заливки центральной части.
      iconPieChartCoreFillStyle: '#ffffff',
      // Cтиль линий-разделителей секторов и внешней обводки диаграммы.
      iconPieChartStrokeStyle: '#ffffff',
      // Ширина линий-разделителей секторов и внешней обводки диаграммы.
      iconPieChartStrokeWidth: 3,
      // Максимальная ширина подписи метки.
      iconPieChartCaptionMaxWidth: 200
    });
  for (let index = 0; index < arr.length; index++) {
    myMap.geoObjects
      .add(new ymaps.Placemark(arr[index].coordinates, {
        balloonContent: 'цвет <strong>красный</strong>'
      }, {
        preset: 'islands#redSportIcon'
      }));
  }






  // .add(myGeoObject)
  // .add(myPieChart)
  // .add(new ymaps.Placemark(arr[23].coordinates, {
  //   balloonContent: 'цвет <strong>воды пляжа бонди</strong>'
  // }, {
  //   preset: 'islands#icon',
  //   iconColor: '#0095b6'
  // }))
  // .add(new ymaps.Placemark(arr[52].coordinates, {
  //   balloonContent: '<strong>серобуромалиновый</strong> цвет'
  // }, {
  //   preset: 'islands#dotIcon',
  //   iconColor: '#735184'
  // }))
  // .add(new ymaps.Placemark(arr[50].coordinates, {
  //   balloonContent: 'цвет <strong>влюбленной жабы</strong>'
  // }, {
  //   preset: 'islands#circleIcon',
  //   iconColor: '#3caa3c'
  // }))
  // .add(new ymaps.Placemark(arr[55].coordinates, {
  //   balloonContent: 'цвет <strong>детской неожиданности</strong>'
  // }, {
  //   preset: 'islands#circleDotIcon',
  //   iconColor: 'yellow'
  // }))

  // .add(new ymaps.Placemark(arr[54].coordinates, {
  //   balloonContent: 'цвет <strong>фэйсбука</strong>'
  // }, {
  //   preset: 'islands#governmentCircleIcon',
  //   iconColor: '#3b5998'
  // }))
  // .add(new ymaps.Placemark(arr[55].coordinates, {
  //   balloonContent: 'цвет <strong>носика Гены</strong>',
  //   iconCaption: 'Очень длиннный, но невероятно интересный текст'
  // }, {
  //   preset: 'islands#greenDotIconWithCaption'
  // }))
  // .add(new ymaps.Placemark(arr[7].coordinates, {
  //   balloonContent: 'цвет <strong>голубой</strong>',
  //   iconCaption: 'Очень длиннный, но невероятно интересный текст'
  // }, {
  //   preset: 'islands#blueCircleDotIconWithCaption',
  //   iconCaptionMaxWidth: '50'
  // }));
}
