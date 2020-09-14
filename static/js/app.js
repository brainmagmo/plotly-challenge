//D3
//Bootstrap

d3.json("samples.json").then(function(data) {
    var names = data.names;
    var metadata = data.metadata;
    var samples = data.samples;

    var dropDown = d3.select("#selDataset")
    
    name.forEach(name => {
        console.log(name);
        var option = dropDown.append("option");
        option.text(name).attr("value", name);
    });







});

