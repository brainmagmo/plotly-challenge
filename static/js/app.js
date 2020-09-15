//D3
//Bootstrap

d3.json("samples.json").then(function(jsonData) {
   //populate the drop down menu
    //useful variable
    var names = jsonData.names;
    var metadata = jsonData.metadata;
    //var samples = jsonData.samples;

    //var dropDown = d3.select("#selDataset");
    d3.select("#selDataset")
        .data(names)
        .enter()
        .append("option")
        .text((d)=>d)
        .attr("value",(d)=>d);
    // jsonData.names.forEach(name => {
    //     //console.log(name);
    //     var option = dropDown.append("option");
    //     option.text(name).attr("value", name);
    // });
    


    //fill default metadata panel
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

    //generate bar chart

    //generate bubble cahrt


    console.log("end of test");
});


//event handler function

//event listener