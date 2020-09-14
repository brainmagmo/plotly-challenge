//D3
//Bootstrap
//with code from https://stackoverflow.com/questions/43121679/how-to-append-option-into-select-combo-box-in-d3

d3.json("samples.json").then(function(data) {
    var names = data.names;
    var metadata = data.metadata;
    var samples = data.samples;

    var dropDown = d3.select("#selDataset")
    var options = dropDown.selectAll("option")
                            .data(names)
                            .enter()
                            .append("option");
    options.text(function(d) {
        return d.NAME;
         })
           .attr("value", function(d) {
        return d.NAME;
        });







});

