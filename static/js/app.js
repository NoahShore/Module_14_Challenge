//1.Use the D3 library to read in samples.json from the URL

const url= "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
 
d3.json(url).then(function(data) {
    console.log(data);
   });

//2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

function init()
{
    let dropdownMenu = d3.select("#selDataset");
    
    d3.json(url).then((data) =>
    {        
        
        let names = data.names;        
        
        names.forEach((id) =>
        {
            console.log(id);
        
            dropdownMenu.append("option").text(id).property("value",id);
        });
    });
};
 
function createBarChart(sample) 
{
    d3.json(url).then((data) =>
    {
        let sampleInfo = data.samples;
        
        let value = sampleInfo.filter(result => result.id == sample);
        
        let values = value[0];
        
        let otu_ids = values.otu_ids;
        
        let otu_labels = values.otu_labels;
        
        let sample_values = values.sample_values;

        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        
        let xticks = sample_values.slice(0,10).reverse();
        
        let labels = otu_labels.slice(0,10).reverse();        
        
        let trace1 =
        {
            x: xticks,
        
            y: yticks,
        
            text: labels,
        
            type: "bar",
        
            orientation: "h"
        };
        
        let layout =
        {
        
            title: "The 10 Highest OTUs"
        };
        
        Plotly.newPlot("bar", [trace], layout)
    });
};

//3. Create a bubble chart that displays each sample.

function createBubbleChart(sample)
{
    d3.json(url).then((data) => 
    {
        let sampleInfo = data.samples;
        
        let value = sampleInfo.filter(result => result.id == sample);
        
        let valueData = value[0];
        
        let otu_ids = valueData.otu_ids;
        
        let otu_labels = valueData.otu_labels;
        
        let sample_values = valueData.sample_values;
        
        console.log(otu_ids,otu_labels,sample_values);        
        
        let trace2 =
        {
            x: otu_ids,
        
            y: sample_values,
        
            text: otu_labels,
        
            mode: "markers",
        
            marker:
            {
                size: sample_values,
            
                color: otu_ids,
            
                colorscale: "Jet"
            }
        };
        
        let layout =
        {
            title: "Bacteria Per Sample",
            
            hovermode: "closest",
            
            xaxis: {title: "OTU ID"},
        };
        
        Plotly.newPlot("bubble", [trace2], layout)
    });
};

//4. Display the sample metadata, i.e., an individual's demographic information.

//5. Display each key-value pair from the metadata JSON object somewhere on the page.

function createMetadata(sample)
{
    d3.json(url).then((data) =>
    {
        let metadata = data.metadata;
        
        let value = metadata.filter(result => result.id == sample);

        console.log(value)

        let valueData = value[0];
        
        d3.select("#sample-metadata").html("");
        
        Object.entries(valueData).forEach(([key,value]) =>
        {
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
};

//6. Update all the plots when a new sample is selected

function updatePlots(value)
{ 
    console.log(value); 
    
    createMetadata(value);
    
    createBarChart(value);
    
    createBubbleChart(value);
};

//Webpage
init();