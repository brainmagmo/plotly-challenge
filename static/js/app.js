//D3
//Bootstrap

d3.json("samples.json").then(function(jsonData) {

    //useful variables
    var names = jsonData.names;
    var metadata = jsonData.metadata;
    //var samples = jsonData.samples;

    //populate the drop down menu
    d3.select("#selDataset")
        .selectAll("option")
        .data(names)
        .enter()
        .append("option")
        .text((d)=>d)
        .attr("value",(d)=>d)
        ;

    //get metadata
    var mdDisplay = d3.select("#sample-metadata");
    var idNum = d3.select("#selDataset").property("value");
    function getMetaData(n) {
        return metadata.find(meta => meta.id == n);//comparing int to string
    };
    var metaData = getMetaData(idNum);

    //fill default metadata panel
    var subjectMDtext = "";
    for(var key in metaData) {
        subjectMDtext += key + ": " + metaData[key] + "<br>";
    };
    mdDisplay.html(subjectMDtext);

    //generate bar chart
    /**2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

    * Use `sample_values` as the values for the bar chart.

    * Use `otu_ids` as the labels for the bar chart.

    * Use `otu_labels` as the hovertext for the chart. */

    var sample = jsonData.samples
        .find(samp => samp.id == idNum)
        ;
    
    // Trace1 for the Sample Data for bar chart
    var trace1 = {
        x: sample.sample_values.slice(0,10).reverse(),
        y: sample.otu_ids.slice(0,10).reverse().map(num => "OTU " + num.toString(10)),
        text: sample.otu_labels.slice(0,10).reverse(),
        name: "Samples from " + idNum,
        type: "bar",
        orientation: "h"
    };
    
    //data
    var data1 = [trace1];

    var layout = {
    title: "Belly Button Sample",
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", data1, layout);
    //generate bubble chart

    // Trace2 for the Sample Data for bubble chart
    var trace2 = {
        x: sample.sample_values.slice(0,10).reverse(),
        y: sample.otu_ids.slice(0,10).reverse().map(num => "OTU " + num.toString(10)),
        text: sample.otu_labels.slice(0,10).reverse(),
        name: "Samples from " + idNum,
        // type: "bar",
        // orientation: "h"
    };
    
    //data
    var data2 = [trace1];

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bubble", data2, layout);
    //generate bubble chart
    console.log("end of test");
});


//event handler function

//event listener