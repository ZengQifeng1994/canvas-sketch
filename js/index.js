let canvas = document.getElementById("myCanvas")
let bg = canvas.getContext("2d")
let canvas2 = document.getElementById("myCanvas2")
let sketchpad = canvas2.getContext("2d")

let tool = {
    status: false,
    oldx: 0,
    oldy: 0,
    color: '#42445A',
    radius: 20,
    clear: false,
    disk: '#42445A'
}
let clientWidth = $(document).width()
let clientHeight =  $(document).height() - 4

$('#myCanvas2').css('cursor', 'url(img/' + tool.radius + '.png) ' + tool.radius/2 + ' ' + tool.radius/2 + ', auto')
canvas.width = clientWidth
canvas2.width = clientWidth
canvas.height = clientHeight
canvas2.height = clientHeight

	
canvas2.onmousedown = e => {
	down(e)
}
canvas2.ontouchstart = e => {
	down(e.touches[0])
}
 
canvas2.onmousemove = e => {
	move(e)
}
canvas2.ontouchmove = e => {
	move(e.touches[0])
}
 
canvas2.onmouseup = () => {
	bg.drawImage(canvas2, 0, 0)
	sketchpad.clearRect(0, 0, canvas.width, canvas.height)
	tool.status = false
}
canvas2.ontouchend = () => {
	bg.drawImage(canvas2, 0, 0)
	sketchpad.clearRect(0, 0, canvas.width, canvas.height)
	tool.status = false
}


function down(e) {
	sketchpad.strokeStyle = tool.color
	sketchpad.strokeStyle = tool.color
	sketchpad.lineWidth = tool.radius
	sketchpad.lineCap = "round"
	sketchpad.lineJoin = "round"

	sketchpad.beginPath()
	sketchpad.moveTo(e.clientX - canvas2.offsetLeft, e.clientY - canvas2.offsetTop)
	sketchpad.lineTo(e.clientX - canvas2.offsetLeft, e.clientY - canvas2.offsetTop)
	sketchpad.clearRect(0, 0, canvas2.width, canvas2.height)
	sketchpad.stroke()
	tool.status = true
}
function move(e) {
	if(tool.status){
		sketchpad.lineTo(e.clientX - canvas2.offsetLeft, e.clientY - canvas2.offsetTop)
		sketchpad.clearRect(0, 0, canvas2.width, canvas2.height)
		sketchpad.stroke()
	}
}

window.addEventListener('resize', () => {
	canvas.width = $(window).width()
    canvas2.width = $(window).width()
    canvas.height = $(window).height() - 4
    canvas2.height = $(window).height() - 4
}, true)

$('#eraser').click(function () {
	if ($(this).hasClass('active')) {
		$(this).removeClass('active')
		tool.color = tool.disk
	} else {
		$(this).addClass('active')
		tool.color = '#fff'
	}
})