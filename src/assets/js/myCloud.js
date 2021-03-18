import * as d3 from 'd3';
import cloud from './d3.layout.cloud';
export default function (option,callback) {
    //传入的option参数对象和回调函数
    let theSize = option.size,
        theWordList = option.wordList,
        theSvgElement = option.svgElement
    
    var layout = cloud()
        .size(theSize)
        .words(theWordList)
        .padding(5)
        //配置随机旋转的角度
        .rotate(function () {return ~~(Math.random() * 3) * 30;})
        .font("Impact")
        .fontSize(function (d) { return d.size;})
        // .fontSize(10)
        .on("end", draw);

    layout.start();

    function draw(words) {
        let color = d3.scaleOrdinal(d3.schemePaired);
        let svg = d3.select(theSvgElement)
            .attr("width", layout.size()[0])
            .attr("height", layout.size()[1])
            .append('g').attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            
            let g = svg.selectAll("g").data(words)
            .enter().append("g").style("id","back").attr("stroke","none").attr("stroke-width",1).attr("fill","none").attr("fill-rule","evenodd")
            let g1 = g.append("g").attr("transform","translate(-170.000000, -393.000000)").attr('fill','#3AFFEC')
            let g2 = g1.append("g").attr('transform','translate(167.000000, 393.000000)')
            g2.append("polygon").attr('stroke','#3AFFEC').attr('stroke-width','0.5').attr('fill-opacity','0.216881793').attr('points','34 1 63.4448637 18 63.4448637 52 34 69 4.55513627 52 4.55513627 18')
            g2.append('circle').attr('cx','34.5454545').attr('cy','1.54545455').attr('r','1.54545455')
            g2.append('circle').attr('cx','34.5454545').attr('cy','69.5454545').attr('r','1.54545455')
            g2.append('circle').attr('cx','63.5454545').attr('cy','18.5454545').attr('r','1.54545455')
            g2.append('circle').attr('cx','63.5454545').attr('cy','52.5454545').attr('r','1.54545455')
            g2.append('circle').attr('cx','4.54545455').attr('cy','52.5454545').attr('r','1.54545455')
            g2.append('circle').attr('cx','4.54545455').attr('cy','18.5454545').attr('r','1.54545455')

            g2.append('text',(d)=>{
                console.log(d)
                return d.text
            })
            // .style("font-size", function (d) {return d.size + "px";})
            // .style("cursor", "pointer")
            // .style("fill", function (d, i) {return color(i);})
            g.attr("transform", function (d) {return "translate(" + [d.x, d.y] + ")"})
            // .text(function (d) {return d.text;})
    }
    
    // function draw(words) {
    //     // console.log(words)
    //     let color = d3.scaleOrdinal(d3.schemePaired);
    //     // let color = d3.scaleOrdinal(d3.schemeCategory10);
    //     d3.select(theSvgElement)
    //         // .append("svg")
    //         .attr("width", layout.size()[0])
    //         .attr("height", layout.size()[1])
    //         .append("g")
    //         .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    //         .selectAll("text")
    //         .data(words)
    //         .enter().append("text")
    //         .style("font-size", function (d) {return d.size + "px";})
    //         .style("font-family", "Impact")
    //         .style("cursor", "pointer")
    //         .style("fill", function (d, i) {return color(i);})
    //         .attr("text-anchor", "middle")
    //         .attr("transform", function (d) {return "translate(" + [d.x, d.y] + ")"})
    //         .text(function (d) {return d.text;})
    //         // 添加点击的回调方法
    //         // .on("click", function (d) {  
    //         //     callback(d.text)
    //         // });
    // }
}