var svg =  document.getElementById('svg_region');
var svgNS = svg.namespaceURI;
var header =  document.getElementById('header');
var headtext =  document.getElementById('headtext');

var begin = [1563, 453] // beginning point, from green line at the point it begins the negative slope
var lw = 24
var step = 34+lw // distance between lines
var angle = 0.567232 // angle of the thingy

var r0 = 38 + lw/2
var r1 = 100


var leaf = '#4eae33'
var mind = '#64c5e4'
var comp = '#64328a'
var gene = '#e5262a'
var vrus = '#f39323'
var cncr = '#f3e600'

colours = [leaf, mind, comp, gene, vrus, cncr]


window.onload = function(e){ 
    for (let i = 0; i < colours.length; i++) {

        let line = []
        let start = [begin[0], begin[1] + i*step]
        line.push(start)
        
        let c0 = [0,0]
        let c1 = [0,0]

        let ad = 513.5

        switch(i) {

            case 0:
                line.unshift([start[0]-1308, start[1]])
                line.unshift([start[0]-1308, start[1]-171])
                c0 = [start[0]-1308, start[1]-171]
                var n = [start[0] + (ad*Math.cos(angle)), start[1] + (ad*Math.sin(angle))]
                line.push(n)
                line.push(n[0]+526, n[1])
                line.push(n[0]+526, n[1]-221)
                line.push(n[0]+526+998, n[1]-221)
                line.push(n[0]+526+998, n[1]-221-224)
                c1 = [n[0]+526+998, n[1]-221-224]

            break;

            case 1:
                line.unshift([start[0]-1161, start[1]])
                line.unshift([start[0]-1161, start[1]-327])
                c0 = [start[0]-1161, start[1]-327]
                var n = [start[0] + (ad*Math.cos(angle)), start[1] + (ad*Math.sin(angle))]
                line.push(n)
                line.push(n[0]+642, n[1])
                line.push(n[0]+642, n[1]-473)
                line.push(n[0]+642+558, n[1]-473)
                c1 = [n[0]+642+558, n[1]-473]
            break;

            case 2:
                line.unshift([start[0]-1209, start[1]])
                line.unshift([start[0]-1209, start[1]+354])
                line.unshift([start[0]-1209+105, start[1]+354])
                c0 = [start[0]-1209+105, start[1]+354]
                var n = [start[0] + (598*Math.cos(angle)), start[1] + (598*Math.sin(angle))]
                line.push(n)
                line.push(n[0]+940, n[1])
                line.push(n[0]+940, n[1]-72)
                line.push(n[0]+940+296, n[1]-72)
                c1 = [n[0]+940+296, n[1]-72]
            break;

            case 3:
                line.unshift([start[0]-1380, start[1]])
                c0 = [start[0]-1380, start[1]]
                var n = [start[0] + (1083*Math.cos(angle)), start[1] + (1083*Math.sin(angle))]
                line.push(n)
                line.push(n[0]+845, n[1])
                c1 = [n[0]+845, n[1]]
            break;

            case 4:
                line.unshift([start[0]-1240, start[1]])
                line.unshift([start[0]-1240, start[1]+423])
                line.unshift([start[0]-1240+237, start[1]+423])
                c0 = [start[0]-1240+237, start[1]+423]
                var n = [start[0] + (ad*Math.cos(angle)), start[1] + (ad*Math.sin(angle))]
                line.push(n)
                line.push(n[0]+828, n[1])
                line.push(n[0]+828, n[1]-355)
                line.push(n[0]+828+885, n[1]-355)
                c1 = [n[0]+828+885, n[1]-355]
                break;

            case 5:
                line.unshift([start[0]-1300, start[1]])
                line.unshift([start[0]-1300, start[1]+504])
                c0 = [start[0]-1300, start[1]+504]
                var n = [start[0] + (ad*Math.cos(angle)), start[1] + (ad*Math.sin(angle))]
                line.push(n)
                line.push(n[0]+1606, n[1])
                c1 = [n[0]+1606, n[1]]
            break;
        }

        let drawnLine = drawLine(colours[i], line, "logo pl_" + i)
        let circle0 = drawCircle(colours[i], r0, c0, "logo c0_" + i)
        let circle1 = drawCircle(colours[i], r1, c1, "logo c1_" + i)
        makeInteractive(i, drawnLine, circle0, circle1)
    }

}


function makeInteractive(i, l, c0, c1) {

	function biggly() {
		header.style.backgroundColor = shade(colours[i], 0.66);
		headtext.style.color = shade(colours[i], -0.66);
		c0.setAttribute('r', r0+20);
		c1.setAttribute('r', r1 + 20);
		c0.setAttribute('fill', 'white');
		c1.setAttribute('fill', 'white');
		l.setAttribute('stroke-width', lw+10);
        l.setAttribute('stroke-linejoin', 'round');
	}

	function smally() {
		c0.setAttribute('r', r0);
		c1.setAttribute('r', r1);
		c0.setAttribute('fill', shade(colours[i], 0.66));
		c1.setAttribute('fill', shade(colours[i], 0.66));
		l.setAttribute('stroke-width', lw);
        l.setAttribute('stroke-linejoin', 'round');
	}

    c0.addEventListener("mouseover", function(event){
		biggly();
	});
    c0.addEventListener("mouseout", function(event){
		smally();
	});
    c1.addEventListener("mouseover", function(event){
		biggly();
	});
    c1.addEventListener("mouseout", function(event){
		smally();
	});
    l.addEventListener("mouseover", function(event){
		biggly();
	});
    l.addEventListener("mouseout", function(event){
		smally();
	});

}

function drawCircle(color, r, pos, cl)
{
    let c = document.createElementNS(svgNS, 'circle');
    c.setAttribute('class', cl);
    c.setAttribute('cx', pos[0]);
    c.setAttribute('cy', pos[1]);
    c.setAttribute('r', r);
    c.setAttribute('fill', shade(color, 0.66));
    c.setAttribute('stroke', color);
    c.setAttribute('stroke-width', lw);
    svg.appendChild(c);
	return c;
}

function drawLine(color, points, cl)
{
    let l = document.createElementNS(svgNS, 'polyline');
    l.setAttribute('class', cl);
    l.setAttribute('points', points);
    l.setAttribute('stroke', color);
    l.setAttribute('fill', 'none');
    l.setAttribute('stroke-width', lw);
    l.setAttribute('stroke-linejoin', 'round');

    svg.appendChild(l);
	return l;
}

function shade(color, percent) {   
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}
