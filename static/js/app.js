//D3
//Bootstrap
var layout1 = {
    title: "Belly Button Sample",
};

var layout2 = {
    title: "Belly Button Sample",
    xaxis: { title: "OTU IDs"}
};

d3.json("samples.json").then(function(jsonData) {

    //useful variables
    var names = jsonData.names;
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

    // Plotly.newPlot("bar", [{
    //     x: [1],
    //     y: ["OTU 1"],
    //     text: ["hoverText"],

    //     type: "bar",
    //     orientation: "h"
    // }], layout1);

    // // Render the plot to the div tag with id "bubble"
    // Plotly.newPlot("bubble", [{
    //     x: [1],
    //     y: [1],
    //     text: ["hoverText"],

    //     mode: 'markers',
    //     marker: {
    //         size: [1],
    //         color: 'black'
    //     }
    // }], layout2);

    optionChanged()
  
    console.log("end of promise");
});


//event handler function
function optionChanged() {
    
    d3.json("samples.json").then(function(jsonData) {
        //********************************************************************/
        //get metadata
        var metadata = jsonData.metadata;
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



        // Render the plot to the div tag with id "bar"
        Plotly.react("bar", data1, layout1);

        //********************************************************************/
        //Create a bubble chart that displays each sample.

        //define dynamic colors
        var maxotu = Math.max.apply(null, otus);
        var minotu = Math.min.apply(null, otus);
        var midotu = (maxotu + minotu) / 2;
        var colors = otus.map(function(num) {
            var red = (num > midotu) ? 0 : Math.round(256 * (midotu - num) / (midotu - minotu));
            var blue = (num < midotu) ? 0 : Math.round(256 * (num - midotu) / (maxotu - midotu));
            var green = (num > midotu) ? Math.round(256 * (maxotu - num) / (maxotu - midotu)) : Math.round(256 * (num - minotu) / (midotu - minotu));
            return `rgb(${red}, ${green}, ${blue})`;
        });
        
        //generate bubble chart

        // Trace2 for the Sample Data for bubble chart
        var trace2 = {
            x: otus,
            y: values,
            text: hoverText,

            mode: 'markers',
            marker: {
                size: values.map((val)=>10*Math.round(Math.sqrt(val))),
                color: colors//'black'
            }
        };
        
        //data
        var data2 = [trace2];


        // Render the plot to the div tag with id "bubble"
        Plotly.react("bubble", data2, layout2);
    })
    
};

//event listener
d3.select("#selDataset").on("change", optionChanged);

console.log("end of file")