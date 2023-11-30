// Get the samples.json endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


//-----------------------------Function to populate the initial page---------------------------------//

function init() {
  d3.json(url).then(function(data) {
    demoInfo(data.metadata, data.names[0]);
    ids(data.names);
    addBarChart(data.samples, data.names[0]);
    addBubbleChart(data.samples, data.names[0]);
    addGauge(data.metadata, data.names[0]);
  });
}
//--------------------------------------------------------------//



//------------------------------Function to add Bar Chart--------------------------------//

function addBarChart(data, id) {
  
// Collect sample data using id
let sampleObjects = collectSampleData(data, id);

// Sort the data by sample_values descending
let sortedBysampleObjects = sampleObjects.sort((a, b) => 
b.sample_values - a.sample_values);

// Slice the first 10 objects for plotting
let slicedData = sortedBysampleObjects.slice(0, 10);

// Reverse the array to accommodate Plotly's defaults
let reversedData = slicedData.reverse();

// Trace1 for the Sample Data
let traceBar = {
    x: reversedData.map(object => object.sample_values),
    y: reversedData.map(object => object.otu_ids),
    text: reversedData.map(object => object.otu_labels),
    name: "Top 10 OTUs",
    type: "bar",
    orientation: "h",
    marker:{color: "#A2165F"}
  };


let traceBarData = [traceBar];

// Apply a title to the layout
let layout = {
  title: `Top 10 OTUs Found in Individuals`,
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }
};

Plotly.newPlot("bar", traceBarData, layout);
}
//--------------------------------------------------------------//



//---------------------------------Function to add Bubble Chart-----------------------------//

function addBubbleChart(data, id) {
  
  // Collect sample data using id
  let sampleObjects = collectSampleDataNum(data, id);

  // Trace for the Sample Data
let traceBubble = {
  type: "scatter",
  mode: "markers",
  x: sampleObjects.map(object => object.otu_ids),
  y: sampleObjects.map(object => object.sample_values),
  text: sampleObjects.map(object => object.otu_labels),
  marker: {
    size: sampleObjects.map(object => object.sample_values*20),
    sizemode: 'area',
    color: sampleObjects.map(object => object.otu_ids),
    colorscale: [[0, 'rgb(0, 0, 255)'], [0.5, 'rgb(0, 255, 0)'], [1, 'rgb(255, 0, 0)']]
  }  
  
};


let traceBubbleData = [traceBubble];

// Apply a title and axis label to the layout
let layout = {
title: 'All OTUs Found in Individuals',
xaxis: {title:'OTU ID'}
};

Plotly.newPlot("bubble", traceBubbleData, layout);
}
//--------------------------------------------------------------//



//-----------------------------Function to populate the option list of Id's---------------------------------//

function ids(data) {

    // Iterate through all inputed data
    for (let i = 0; i < data.length; i++) {

      // set variable to create option element
      let added = document.createElement('option');

      // Set location of the new element as a variable
      let dataset = document.getElementById('selDataset');

      // though each iteration grab the data and save as value and html and then append to the location
      added.value = data[i];
      added.innerHTML = data[i];
      dataset.append(added);
    };
}
//--------------------------------------------------------------//



//-----------------------------Function to be run when id has been changed and run functions using new id----------------------------------//
  
 function optionChanged(id) {

  let currentId = id

  // Fetch the JSON data using url and run applicable functions          
    d3.json(url).then(function(data) {
    demoInfo(data.metadata, currentId);
    updateBarChart(data.samples, currentId);
    updateBubbleChart(data.samples, currentId);
    updateGauge(data.metadata, currentId);});
 };
//--------------------------------------------------------------//
 


//-----------------------------Function to add demographic Info---------------------------------//

function demoInfo(data, id){
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id){

      // Set target element for data to be displayed
      let dataset = document.getElementById('sample-metadata');

      // set relevant data as new variable
      let list = data[i];

      // Create new Array variable to hold the key and value as string
      let keyAndValue = [];

      // iterate through newly created object to grab the data and push to new array
      for (var key in list) {
        let item = (`${key}: ${list[key]}`);
        keyAndValue.push(item);};

      // set the html to nothing/blank
      dataset.innerHTML = "";

      // iterate through keyandvalue array adding each item to the html
      for (let i = 0; i < keyAndValue.length; i++) {
        dataset.insertAdjacentHTML("beforeend", `<strong style="font-size:85%;">${keyAndValue[i]}</strong><br>`)};
    };};};
//--------------------------------------------------------------//



//------------------------------Function to update Bar Chart--------------------------------//

function updateBarChart(data, id) {

// Collect sample data using id
let sampleObjects = collectSampleData(data, id);

// Sort the data by sample_values descending
let sortedBysampleObjects = sampleObjects.sort((a, b) => 
b.sample_values - a.sample_values);

// Slice the first 10 objects for plotting
let slicedData = sortedBysampleObjects.slice(0, 10);

// Reverse the array to accommodate Plotly's defaults
let reversedData = slicedData.reverse();

// Add values to variables to be used in restyling
let x = reversedData.map(object => object.sample_values);
let y = reversedData.map(object => object.otu_ids);
let text = reversedData.map(object => object.otu_labels);

// Update/resyle bar chart with new data
Plotly.restyle("bar", 'x', [x]);
Plotly.restyle("bar", 'y', [y]);
Plotly.restyle("bar", 'text', [text]);
}
//--------------------------------------------------------------//



//---------------------------------Function to update Bubble Chart-----------------------------//

function updateBubbleChart(data, id) {
  
  // Collect sample data using id
  let sampleObjects = collectSampleDataNum(data, id);


// Set new values as variables
let x = sampleObjects.map(object => object.otu_ids);
let y = sampleObjects.map(object => object.sample_values);
let text = sampleObjects.map(object => object.otu_labels);
let marker = {
  size: sampleObjects.map(object => object.sample_values*20),
  sizemode: 'area',
  color: sampleObjects.map(object => object.otu_ids),
  colorscale: [[0, 'rgb(0, 0, 255)'], [0.5, 'rgb(0, 255, 0)'], [1, 'rgb(255, 0, 0)']]
}  

// Update/resyle bubble chart with new data
Plotly.restyle("bubble", 'x', [x]);
Plotly.restyle("bubble", 'y', [y]);
Plotly.restyle("bubble", 'text', [text]);
Plotly.restyle("bubble", 'marker', [marker]);
}
//--------------------------------------------------------------//



//---------------------------------Function to Collect and Return sample data -  With STRING OTU ID's-----------------------------//

 function collectSampleData(data, id) {
  // Initialize empty arrays 
  let sample_value = [];
  let otu_id = [];
  let otu_label = [];
  let sampleObjects = [];

  // Looping through data to find the id that matches
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id){

      // store id's data in dedicated arrays
      sample_value  = data[i].sample_values;
      otu_id = data[i].otu_ids;
      otu_label = data[i].otu_labels;

      // Loop through the arrays and create objects for each iteration
      for (let j = 0; j < sample_value.length; j++) {
        sampleObjects[j] = {sample_values: sample_value[j], otu_ids: `OTU ${otu_id[j]}`, otu_labels: otu_label[j]};
      }
    };
  };
  return(sampleObjects);
 }
//--------------------------------------------------------------//



//---------------------------------Function to Collect and Return sample data -  With number OTU ID's-----------------------------//

function collectSampleDataNum(data, id) {
  // Initialize empty arrays 
  let sample_value = [];
  let otu_id = [];
  let otu_label = [];
  let sampleObjects = [];

  // Looping through data to find the id that matches
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id){

      // store id's data in dedicated arrays
      sample_value  = data[i].sample_values;
      otu_id = data[i].otu_ids;
      otu_label = data[i].otu_labels;

      // Loop through the arrays and create objects for each iteration
      for (let j = 0; j < sample_value.length; j++) {
        sampleObjects[j] = {sample_values: sample_value[j], otu_ids: otu_id[j], otu_labels: otu_label[j]};
      }
    };
  };
  return(sampleObjects);
 }
//--------------------------------------------------------------//



//---------------------------------Bonus - create gauge chart -----------------------------//

function addGauge(data, id) {

  // Collect wash frequency value using data and id
  let washFrequency = washFreq(data, id);

  // set values for gauge chart
  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: washFrequency,
      title: { text: "BellyButton Washing Frequency" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [null, 9],
          tickmode: 'linear'},
        bar: {color: "#A2165F"},
        steps: [
          {range: [0, 1], color: "#F6EFCC" },
          { range: [1, 2], color: "#EFF0AB" },
          { range: [2, 3], color: "#D6E88B" },
          { range: [3, 4], color: "#B4E06C" },
          { range: [4, 5], color: "#89D74D" },
          { range: [5, 6], color: "#56CD2F" },
          { range: [6, 7], color: "#1DC212" },
          { range: [7, 8], color: "#0DAC25" },
          { range: [8, 9], color: "#09963C" }
        ],
      }
    }
  ];
  
  // Set layout for gauge chart
  var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };

  // Plot gauge chart to gauge location
  Plotly.newPlot('gauge', data, layout);
}
//--------------------------------------------------------------//



//---------------------------------Bonus - update gauge chart -----------------------------//

function updateGauge(data, id) {

  // use function to get wash frequesncy value
  let value = washFreq(data, id);

// Update/resyle gauge chart with new data
Plotly.restyle("gauge", 'value', [value]);
}
//--------------------------------------------------------------//



//---------------------------------Bonus - function - Wash frequency -----------------------------//

function washFreq(data, id){

  // Reset freq to nothing
  let freq = ""

  // loop through data to find results that match the specified id
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id){

      // set relevant data as variable
      freq = data[i].wfreq;
    };
  };
  return(freq);
}
//--------------------------------------------------------------//

  init();
