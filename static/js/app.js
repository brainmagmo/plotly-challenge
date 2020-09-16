//D3
//Bootstrap

d3.json("samples.json").then(function(jsonData) {

    //useful variables
    var names = jsonData.names;
    var metadata = jsonData.metadata;
    //var samples = jsonData.samples;
    //********************************************************************/
    //populate the drop down menu
    d3.select("#selDataset")
        .selectAll("option")
        .data(names)
        .enter()
        .append("option")
        .text((d)=>d)
        .attr("value",(d)=>d)
        ;

    //********************************************************************/
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

    var values = sample.sample_values.slice(0,10).reverse();
    var otus = sample.otu_ids.slice(0,10).reverse();
    var labels = otus.map(num => "OTU " + num.toString(10));
    var hoverText = sample.otu_labels.slice(0,10).reverse();
    
    //********************************************************************/
    // Trace1 for the Sample Data for bar chart
    var trace1 = {
        x: values,
        y: labels,
        text: hoverText,

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

    //********************************************************************/
    /**Create a bubble chart that displays each sample.

    Use otu_ids for the x values.

    Use sample_values for the y values.

    Use sample_values for the marker size.

    Use otu_ids for the marker colors.

    Use otu_labels for the text values. */
    var maxotu = Math.max.apply(null, otus);
    var minotu = Math.min.apply(null, otus);
    console.log("max: " + maxotu + " min: " + minotu);
    var colors = otus.map(function(num) {
        var red = Math.round(256 * (num - minotu) / (maxotu - minotu));
        var blue = 256 - red;
        var green = 125;
        return `rgb(${red}, ${green}, ${blue})`;
    });
    console.log(colors);
    //generate bubble chart

    // Trace2 for the Sample Data for bubble chart
    var trace2 = {
        x: labels,
        y: values,
        //text: hoverText,

        mode: 'markers',
        marker: {
            size: values.map((val)=>100*Math.round(Math.sqrt(val)))//,
            //color: 'rgb(120,120,120)'
        }
    };
    console.log("size: " + trace2.marker.size);
    //data
    var data2 = [trace2];

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bubble", data2, layout);
    //generate bubble chart
    console.log("end of test");
});


//event handler function

//event listener