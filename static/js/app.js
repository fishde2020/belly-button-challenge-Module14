const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function init(){
    d3.json(url).then(function(data) {
    let dataset = data.names; 
    let dropdownMenu = d3.select("#selDataset");    
    for (let i=0; i<dataset.length; i++){
        dropdownMenu.append("option").text(dataset[i]).property("value", dataset[i])
    }



})};

//BAR AND BUBBLE CHARTS
//Call In Data
function buildcharts (sample){


//Set Up Data
d3.json(url).then(function(data) {

        let samples = data.samples;

        let resultArray = samples.filter(sampleObj => sampleObj.id == sample);

        let firstresult = resultArray[0];

        let labl = firstresult.otu_labels;

        let otid = firstresult.otu_ids;

        let smpva = firstresult.sample_values; 
        

//Horizontal Bar Chart
        let data1 = [{
            x: smpva.slice(0, 10).reverse(),
            y: otid.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            text:labl.slice(0, 10).reverse(),
            type: 'bar',
            orientation: "h"
            }];
    
        Plotly.newPlot("bar", data1)
    
//Bubble Chart    
        let data2 = [{
            x: otid.slice(0, 10).reverse(),
            y: smpva.slice(0, 10).reverse(),
            text:labl.slice(0, 10).reverse(),
            mode: 'markers',
            type: 'bubble',
            marker: {
                size: smpva.slice(0, 10).reverse(),
                color: otid.slice(0, 10).reverse()}
            }];

        Plotly.newPlot("bubble", data2)})};

       
buildcharts("940");


//TABLE
//Call In Data
function buildmetadata (sample){

   
//Set Up Data
    d3.json(url).then(function(data) {

        let metadata = data.metadata; 
        let metadata2 = metadata.filter(Obj => Obj.id == sample);

//Update Table
        let PANEL = d3.select("#sample-metadata");
        PANEL.html("");
        for (key in metadata2[0]){
            PANEL.append("h6").text(`${key.toUpperCase()}: ${metadata2[0][key]}`);
          };
})}; 

buildmetadata("940");

//Dropdown

function optionChanged(id) {
    buildmetadata(id)
    buildcharts(id)
    };

init(); 
