//D3
//Bootstrap

d3.json("samples.json").then(function(jsonData) {
   
    var dropDown = d3.select("#selDataset");
    var mdDisplay = d3.select("#sample-metadata");

    jsonData.names.forEach(name => {
        //console.log(name);
        var option = dropDown.append("option");
        option.text(name).attr("value", name);
    });

        
    var names = jsonData.names;
    var metadata = jsonData.metadata;
    //var samples = jsonData.samples;

    var idNum = names[0];
    function getMetaData(idN) {
        return metadata.find(meta => meta.id == idN);//comparing int to string
    }
    var md = getMetaData(idNum);
    var subjectMDtext = "";
    for(var key in md) {
        console.log(key);
        subjectMDtext += key + ": " + md[key] + "<br>";
    };
    mdDisplay.text(subjectMDtext);
    console.log("end of test");
});
