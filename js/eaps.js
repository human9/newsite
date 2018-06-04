var svg =  document.getElementById('svg_region');
var svgNS = svg.namespaceURI;
var defs = document.createElementNS(svgNS, 'defs');
var header =  document.getElementById('header');
var headtext =  document.getElementById('headtext');

var begin = [1563, 453] // beginning point, from green line at the point it begins the negative slope
var lw = 24
var step = 34+lw // distance between lines
var angle = 0.567232 // angle of the thingy

var r0 = 38 + lw/2
var r1 = 100
var i1 = r1*1.3;

var leaf = '#4eae33'
var mind = '#64c5e4'
var comp = '#64328a'
var gene = '#e5262a'
var vrus = '#f39323'
var cncr = '#f3e600'

colours = [leaf, mind, comp, gene, vrus, cncr]

images = ["Ecology.png", "Neurobiology.png", "Bioinformatics.png", "Genetics_Cellbiology.png", "Immunology_Virology.png", "Cancer.png"]

themes = ["Ecology", "Neurobiology", "Bioinformatics", "Genetics_and_Cell_Biology", "Virology_and_Immunology", "Oncology"];

components = [];

var active = 6;

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
                line.push(n[0]+526+998, n[1]-221-224+r1)
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
                line.push(n[0]+642+558-r1, n[1]-473)
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
                line.push(n[0]+940+296-r1, n[1]-72)
                c1 = [n[0]+940+296, n[1]-72]
            break;

            case 3:
                line.unshift([start[0]-1380, start[1]])
                c0 = [start[0]-1380, start[1]]
                var n = [start[0] + (1083*Math.cos(angle)), start[1] + (1083*Math.sin(angle))]
                line.push(n)
                line.push(n[0]+845-r1, n[1])
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
                line.push(n[0]+828+885-r1, n[1]-355)
                c1 = [n[0]+828+885, n[1]-355]
                break;

            case 5:
                line.unshift([start[0]-1300, start[1]])
                line.unshift([start[0]-1300, start[1]+504])
                c0 = [start[0]-1300, start[1]+504]
                var n = [start[0] + (ad*Math.cos(angle)), start[1] + (ad*Math.sin(angle))]
                line.push(n)
                line.push(n[0]+1606-r1, n[1])
                c1 = [n[0]+1606, n[1]]
            break;
        }

        let drawnLine = drawLine(colours[i], line, "pl_" + i)
        let circle0 = drawCircle(themes[i], colours[i], null, r0, c0, "logo c0_" + i)
		let imgbgrnd = drawImage(images[i], colours[i], i1, c1);
        let circle1 = drawCircle(themes[i], colours[i], images[i], r1, c1, "logo c1_" + i)

        components.push({l: drawnLine, c0: circle0, c1: circle1});

        makeInteractive(i, drawnLine, circle0, circle1, imgbgrnd);


		$('*[class~="svg-scroll"]').bind('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top - 70
			}, 1000, 'easeInOutExpo');
			event.preventDefault();
		});

    }
	svg.appendChild(defs);

}

function polyLineLength(polyline) {
    let sum = 0;
    for (var i = 0 ; i < polyline.points.numberOfItems;i++) {
        var pos = polyline.points.getItem(i);
        if (i > 0) {
            sum += Math.sqrt(Math.pow((pos.x - prevPos.x), 2) + Math.pow((pos.y - prevPos.y), 2));
        }
        prevPos = pos;
    }
    return sum;

}

function makeInteractive(i, l, c0, c1, img) {

    let time = Math.random() + 2;

    c0.style.strokeDasharray = polyLineLength(l);
    c0.style.strokeDashoffset = polyLineLength(l);
    c0.style.animation = "dash " + time + "s ease-in-out forwards";
    c0.style.transition = "0.3s";
    c0.style.visibility = "hidden";
    c0.style.visibility = "hidden";
    
    img.style.transition = "0.3s";

    c1.style.strokeDasharray = "2000";
    c1.style.strokeDashoffset = "2000";
    c1.style.opacity = "0.4";
    c1.style.animation = "dash 1s ease-in-out forwards";
    c1.style.animationDelay = time - 0.2 + "s";
    c1.style.transition = "0.3s";
    c1.style.visibility = "hidden";

    l.style.strokeDasharray = polyLineLength(l);
    l.style.strokeDashoffset = polyLineLength(l);
    l.style.animation = "dash " + time + "s ease-in-out forwards";
    l.style.transition = "0.3s";
    l.style.visibility = "hidden";

	function biggly() {
		header.style.backgroundColor = shade(colours[i], 0.66);
		headtext.style.color = shade(colours[i], -0.66);
		c0.setAttribute('r', r0+20);
		c0.setAttribute('fill', 'white');
		img.setAttribute('fill', 'white');
		c1.setAttribute('r', r1 + 20);
		l.setAttribute('stroke-width', lw+10);
        l.setAttribute('stroke-linejoin', 'round');
	}

	function smally() {
		c0.setAttribute('r', r0);
		c0.setAttribute('fill', shade(colours[i], 0.66));
		img.setAttribute('fill', shade(colours[i], 0.66));
		c1.setAttribute('r', r1);
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

function drawCircle(theme, color, image, r, pos, cl)
{
    let a = document.createElementNS(svgNS, 'a');
    a.setAttribute('class', "svg-scroll");
    a.setAttribute('href', "#" + theme);
    a.setAttribute('style', "cursor: pointer");
    let c = document.createElementNS(svgNS, 'circle');
    c.setAttribute('class', cl);
    c.setAttribute('cx', pos[0]);
    c.setAttribute('cy', pos[1]);
    c.setAttribute('r', r);
    c.setAttribute('fill', 'url(#'+image+')');
    if(!image) c.setAttribute('fill', shade(color, 0.66));
    c.setAttribute('stroke', color);
    c.setAttribute('stroke-width', lw);
	a.appendChild(c);
    svg.appendChild(a);
	return c;
}

function drawImage(image, color,  h, pos) {
	let i = document.createElementNS(svgNS, 'image');
	var h = 0.6;
	i.setAttribute('href', '/img/themes/' + image);
	i.setAttribute('preserveAspectRatio', 'none');
	i.setAttribute('x', (1-h)/2);
	i.setAttribute('y', (1-h)/2);
	i.setAttribute('height', h);
	i.setAttribute('width', h);

	let p = document.createElementNS(svgNS, 'pattern');
	p.setAttribute('id', image);
	p.setAttribute('patternContentUnits', 'objectBoundingBox');
	p.setAttribute('height', '100%');
	p.setAttribute('width', '100%');

	let r = document.createElementNS(svgNS, 'rect');
	r.setAttribute('height', '100%');
	r.setAttribute('width', '100%');
    r.setAttribute('fill', shade(color, 0.66));

	p.appendChild(r);
	p.appendChild(i);
	defs.appendChild(p);

	return r;
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
