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
        .attr("value",(d)=>d);

    //get metadata
    var mdDisplay = d3.select("#sample-metadata");
    var idNum = d3.select("#selDataset").property("value");
    function getMetaData(idN) {
        return metadata.find(meta => meta.id == idN);//comparing int to string
    }
    var md = getMetaData(idNum);

    //fill default metadata panel
    var subjectMDtext = "";
    for(var key in md) {
        subjectMDtext += key + ": " + md[key] + "<br>";
    };
    mdDisplay.html(subjectMDtext);

    //generate bar chart
    /**2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

    * Use `sample_values` as the values for the bar chart.

    * Use `otu_ids` as the labels for the bar chart.

    * Use `otu_labels` as the hovertext for the chart. */

        // Sort the data by Greek search results
    //var sortedByGreekSearch = data.sort((a, b) => b.greekSearchResults - a.greekSearchResults);
    var sample = jsonData.samples
                            .find(samp => samp.id == idNum)
                            ;
    console.log(sample);
    // Trace1 for the Greek Data
    var trace1 = {
        x: sample.sample_values.slice(0,10).reverse(),
        y: sample.otu_ids.slice(0,10).reverse().map(num => num.toString(10)),
        text: sample.otu_labels.slice(0,10).reverse(),
        name: "Samples from " + idNum,
        type: "bar",
        orientation: "h"
    };
    console.log(trace1.y);
    // data
    var data = [trace1];

    // Apply the group bar mode to the layout
    var layout = {
    title: "Belly Button Sample",
        // margin: {
        //     l: 100,
        //     r: 100,
        //     t: 100,
        //     b: 100
        // }
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", data, layout);
    //generate bubble chart


    console.log("end of test");
});


//event handler function

//event listener