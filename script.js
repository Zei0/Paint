let cnv = document.getElementById("canvas")
let ctx = cnv.getContext("2d")
let color = "white"
let width = 15

let displayWidth = cnv.clientWidth
let displayHeight = cnv.clientHeight
cnv.width = displayWidth
cnv.height = displayHeight


cnv.onmousedown = (e) => {
 setTimeout(() => {
  cnv.onmousemove = (event) => {
   ctx.fillStyle = color 
   ctx.fillRect(e.offsetX - width/2, e.offsetY - width/2, width, width)
   
 }
 }, )}
 
 cnv.onmouseup = () => {
     cnv.onmousemove = null
 }
