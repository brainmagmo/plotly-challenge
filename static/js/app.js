//D3
//Bootstrap

d3.json("samples.json").then(function(jsonData) {
   //populate the drop down menu
    var dropDown = d3.select("#selDataset");

    jsonData.names.forEach(name => {
        //console.log(name);
        var option = dropDown.append("option");
        option.text(name).attr("value", name);
    });

        
    var names = jsonData.names;
    var metadata = jsonData.metadata;
    //var samples = jsonData.samples;

    
    var mdDisplay = d3.select("#sample-metadata");

    var idNum = names[0];
    function getMetaData(idN) {
        return metadata.find(meta => meta.id == idN);//comparing int to string
    }
    var md = getMetaData(idNum);
    var subjectMDtext = "";
    for(var key in md) {
        //console.log(key);
        subjectMDtext += key + ": " + md[key] + "<br>";
    };
    mdDisplay.html(subjectMDtext);
    console.log("end of test");
});
