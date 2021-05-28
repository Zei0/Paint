let cnv = document.getElementById("canvas"); //Холст для рисования.
let cnv_bg = document.getElementById("bg_layer"); //Холст для заднего фона. 
let ctx = cnv.getContext("2d");
let ctx_bg = cnv_bg.getContext("2d");
let color = document.getElementById("color").value; //Цвет кисти. 
let background = document.getElementById("background"); //Цвет фона. 
let width = 30;
let tool = "Кисточка";
let button_tool = document.getElementById("tool"); //Инструменты.
let button_clear = document.getElementById("clear"); //Ластик.

let displayWidth = cnv.clientWidth; //Устанавливаем размер холста. 
let displayHeight = cnv.clientHeight;
cnv.width = displayWidth;
cnv.height = displayHeight;
cnv_bg.width = displayWidth;
cnv_bg.height = displayHeight;
ctx_bg.fillStyle = background.value;
ctx_bg.fillRect(0, 0, cnv_bg.width, cnv_bg.height);

document.getElementById("color").oninput = function(){
    color = this.value;
}

document.getElementById("size").oninput = function(){
    width = this.value;
}

document.getElementById("save_image").onclick = function(){
    let cnv_save = document.getElementById("save_canvas");
    let ctx_save = cnv_save.getContext("2d");
    cnv_save.width = displayWidth;
    cnv_save.height = displayHeight;
    //Переносим на холст зданего фона сохранения.
    ctx_save.drawImage(cnv_bg, 0, 0, cnv.width, cnv.height);
    ctx_save.drawImage(cnv, 0, 0, cnv.width, cnv.height);
    let image = cnv_save.toDataURL("image/jpg");
    this.href = image;
}

//Рисование мышкой.
cnv.onmousedown = (e) => {
    setTimeout(() => {
        cnv.onmousemove = (event) => {
            if(tool == "Кисточка"){
                ctx.fillStyle = color;
                ctx.fillRect(event.offsetX - width/2, event.offsetY- width/2, width, width);
            }
                
            else
                ctx.clearRect(event.offsetX - width/2, event.offsetY- width/2, width, width);
            
        };
    }, 1);
    if(tool == "Кисточка"){
        ctx.fillStyle = color;
        ctx.fillRect(e.offsetX - width/2, e.offsetY- width/2, width, width);
    }
        
    else
        ctx.clearRect(e.offsetX - width/2, e.offsetY- width/2, width, width);
    
    cnv.onmouseup = () => {
        cnv.onmousemove = null;
    };
}
cnv.ontouchmove = (event) => {
    if(tool == "Кисточка"){
        ctx.fillStyle = color;
        ctx.fillRect(event.changedTouches[0].clientX - width/2, event.changedTouches[0].clientY- width/2, width, width);
    }
        
    else
        ctx.clearRect(event.changedTouches[0].clientX - width/2, event.changedTouches[0].clientY- width/2, width, width);
}


background.addEventListener('input', changeBackground);

function changeBackground(){
    ctx_bg.fillStyle = background.value;
    ctx_bg.fillRect(0, 0, cnv_bg.width, cnv_bg.height);
}

button_tool.addEventListener("click", changeTool);

function changeTool(){
    let btn = document.getElementById("tool");
    if(btn.textContent == "Кисточка"){
        btn.textContent = "Ластик";
        tool = "Ластик";
    }
    else{
        btn.textContent = "Кисточка";
        tool = "Кисточка";
    }
}

button_clear.addEventListener("click", clearCanvas);

function clearCanvas(){
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.fillStyle = background.value;
    ctx.fillRect(0, 0, cnv.width, cnv.height);
}