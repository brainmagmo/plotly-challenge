//D3
//Bootstrap

var dropDown = d3.select("#selDataset")

d3.json("samples.json").then(function(jsonData) {
   
    jsonData.names.forEach(name => {
        console.log(name);
        var option = dropDown.append("option");
        option.text(name).attr("value", name);
    });

        
    var names = jsonData.names;
    var metadata = jsonData.metadata;
    //var samples = jsonData.samples;

    var idNum = names[0];
    function getMetaData(idN) {
        return metadata.find(meta => meta.id === idN);
    }

    console.log(getMetaData(idNum));
});
