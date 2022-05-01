//
// Cote UI de l'application "lucioles"
//
// Auteur : G.MENEZ
// RMQ : Manipulation naive (debutant) de Javascript
//
function async_ajax(params) {
  const { success } = params;
  const { error } = params;
  delete params.success;
  delete params.error;
  return new Promise((resolve, reject) => {
    $.ajax({
      ...params,
      success: (result, status) => {
        if (success) success(result, status);
        resolve(result, status);
      },
      error: (result, status, err) => {
        if (error) error(result, status, err);
        reject(result, status, err);
      }
    });
  });
}

var chart1, chart2;
const WS_TEMP = "/esp/topic_temp";
const WS_LIGHT = "/esp/topic_light";

//=== Initialisation of all users in database ===================
const MAC_ADDRESS_ESP = [];

async function init() {

  try {
    const result = await getAllUsers();
    MAC_ADDRESS_ESP.push(...result.map(({ name, mac }) => ({ name: name.toUpperCase(), mac_address: mac })));
  } catch (err) {
    if (err.responseJSON.error_auth) {
      location.href = location.origin.concat('/login');
    }
  }

  Highcharts.setOptions({
    global: {
      // https://stackoverflow.com/questions/13077518/highstock-chart-offsets-dates-for-no-reason
      useUTC: false,
      type: "spline",
    },
    time: { timezone: "Europe/Paris" },
  });
  // cf https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/spline-irregular-time/
  // @ts-ignore
  chart1 = new Highcharts.Chart({
    title: { text: "Temperatures" },
    subtitle: { text: "Irregular time data in Highcharts JS" },
    legend: { enabled: true },
    credits: false,
    chart: { renderTo: "container1" },
    xAxis: { title: { text: "Heure" }, type: "datetime" },
    yAxis: { title: { text: "Temperature (Deg C)" } },
    series: MAC_ADDRESS_ESP.map(({ name }) => ({ name, data: [] })),
    //colors: ['#6CF', '#39F', '#06C', '#036', '#000'],
    colors: ["red", "green", "blue"],
    plotOptions: {
      line: {
        dataLabels: { enabled: true },
        //color: "red",
        enableMouseTracking: true,
      },
    },
  });
  // @ts-ignore
  chart2 = new Highcharts.Chart({
    title: { text: "Lights" },
    legend: { title: { text: "Lights" }, enabled: true },
    credits: false,
    chart: { renderTo: "container2" },
    xAxis: { title: { text: "Heure" }, type: "datetime" },
    yAxis: { title: { text: "Lumen (Lum)" } },
    series: MAC_ADDRESS_ESP.map(({ name }) => ({ name, data: [] })),
    //colors: ['#6CF', '#39F', '#06C', '#036', '#000'],
    colors: ["red", "green", "blue"],
    plotOptions: {
      line: { dataLabels: { enabled: true }, enableMouseTracking: true },
    },
  });

  //=== Gestion de la flotte d'ESP =================================
  const which_esps = MAC_ADDRESS_ESP.map(({ mac_address }) => mac_address);


  for (var i = 0; i < which_esps.length; i++) {
    console.log("process_esp : ", i);
    process_esp(which_esps, i);
  }
}

//=== Search all users ==========================
function getAllUsers() {
  const json = sessionStorage.getItem('user');
  const { token } = json ? JSON.parse(json) : {};
  return async_ajax({
    url: location.origin.concat('/users/all'),
    type: 'GET',
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
  });
}

//=== Installation de la periodicite des requetes GET============
function process_esp(which_esps, i) {
  const refreshT = 10000; // Refresh period for chart
  const esp = which_esps[i]; // L'ESP "a dessiner"
  console.log("process_esp : ", esp); // cf console du navigateur

  // Gestion de la temperature
  // premier appel pour eviter de devoir attendre RefreshT
  get_samples(WS_TEMP, chart1.series[i], esp);
  //calls a function or evaluates an expression at specified
  //intervals (in milliseconds).
  window.setInterval(
    get_samples,
    refreshT,
    WS_TEMP, // param 1 for get_samples()
    chart1.series[i], // param 2 for get_samples()
    esp
  ); // param 3 for get_samples()

  // Gestion de la lumiere
  get_samples(WS_LIGHT, chart2.series[i], esp);
  window.setInterval(
    get_samples,
    refreshT,
    WS_LIGHT, // URL to GET
    chart2.series[i], // Serie to fill
    esp
  ); // ESP targeted
}

//=== Recuperation dans le Node JS server des samples de l'ESP et
//=== Alimentation des charts ====================================
function get_samples(path_on_node, serie, wh) {
  // path_on_node => help to compose url to get on Js node
  // serie => for choosing chart/serie on the page
  // wh => which esp do we want to query data

  console.log("get samples !");
  const node_url = location.origin;

  //https://openclassrooms.com/fr/courses/1567926-un-site-web-dynamique-avec-jquery/1569648-le-fonctionnement-de-ajax
  // @ts-ignore
  const json = sessionStorage.getItem("user");
  const {token} = json ? JSON.parse(json) : {};
  $.ajax({
    url: `${node_url}${path_on_node}`, // URL to "GET" : /esp/temp ou /esp/light
    type: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    data: { who: wh }, // parameter of the GET request
    success: function (resultat, statut) {
      serie.setData(resultat.map(({ date, value }) => ([Date.parse(date), value]))); //serie.redraw();
    },
    error: function (resultat, statut, erreur) { },
    complete: function (resultat, statut) { },
  });
}

//assigns the onload event to the function init.
//=> When the onload event fires, the init function will be run.
window.onload = init;
