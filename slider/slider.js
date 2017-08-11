(function($) //prevenimos conflictos
{
    
$.fn.sliderSoySano = function(imgs,paraphs,velocity)
{

var slider;
var counter = 1;
var conf = new Object();
Object.defineProperty(conf,"images",{
    enumerable:true,
    configurable:false,
    value: imgs.images,
    writable:true
});
Object.defineProperty(conf,"paragraphs",{
    enumerable:true,
    configurable:false,
    value: paraphs.paragraphs,
    writable:true
});
var current = 0;
var next = 1;
var progress = 0;
var bar_increment = 10/7;
var buttons_lock = false;

var bar = document.getElementById("slider-soysano-bar");
var slide = document.getElementById("slider-soysano-slide");
var buttons;
var buttons_container = document.getElementById("slider-soysano-navigation-container");
var paragraph = document.getElementById("slider-soysano-slide-text");


function addButtons()
{
    var button_container_element;
    var button_element;
    for(i = 0; i < conf.images.length; i++)
    {
        button_container_element = document.createElement("div");
        button_element = document.createElement("div");
        button_container_element.className = "slider-soysano-button-container";
        button_element.className = "slider-soysano-button";
        if(i==0){button_element.className = button_element.className.concat(" slider-soysano-button-sombra");}
        button_element.dataset.button = i;
        button_element.innerHTML = "&nbsp;";
        button_element.addEventListener("click",function(){
            if(!buttons_lock)
            {
                buttons_lock = !buttons_lock;
                window.clearInterval(slider);
                counter = 1;
                next = this.dataset.button;
                transicion();
            }

        });
        button_container_element.appendChild(button_element);
        buttons_container.appendChild(button_container_element);
    }
    buttons = document.getElementsByClassName("slider-soysano-button");
    
}

addButtons();

slider = window.setInterval(function(){
    var current_width = bar_increment*counter;
    bar.style.width = current_width.toString().concat("%");
    
    if(counter == 70)
    {
        window.clearInterval(slider);
        counter = 1;
        transicion();
    }
    else
    {
        counter++;       
    }
    
},velocity);

function transicion()
{
    if(slide.className == "")
        {
            slide.className = "desaparicion-clase";
            buttons[0].className = buttons[0].className.concat(" quitar-sombra-clase");
        }
    else
        {
            slide.className = slide.className.replace("aparicion-clase","desaparicion-clase");
            buttons[current].className = buttons[current].className.replace("aplicar-sombra-clase"," quitar-sombra-clase");
        }
    
    slide.addEventListener('animationend',evento_slide);  
}

function evento_slide(){
      progress += 1;    
      if(progress == 1)
      {
         bar.style.width = "0%";
         slide.style.backgroundImage = "url(".concat(conf.images[next]).concat(")");
         paragraph.textContent = conf.paragraphs[next];
         slide.className = this.className.replace("desaparicion-clase","aparicion-clase");
         buttons[next].className = buttons[current].className.replace("quitar-sombra-clase","aplicar-sombra-clase");
      }
      else if(progress == 2)
      {
          slide.removeEventListener("animationend",evento_slide);
          progress = 0;
          next++;
          if(next == buttons.length){next = 0;}
          current = ((next-1) < 0)?(buttons.length - 1):(next -1);
          slider = window.setInterval(function(){
                        bar.style.width = (100/70)*counter + "%";
                        if(counter == 70)
                        {
                            window.clearInterval(slider);
                            counter = 1;
                            transicion();
                        }
                        else if(counter == 1 && buttons_lock)
                        {
                            buttons_lock = !buttons_lock;
                            counter++;
                        }
                        else
                        {
                            counter++;
                        }
                    },velocity);
      }
      
  }    
}
 
}(jQuery));
var images = {images:["http://media.salemwebnetwork.com/cms/IB/30491-bible-table-sized.400w.tn.jpg","http://media.salemwebnetwork.com/cms/CW/faith/39891-HolyBible-Bible-read-ThinkstockPhotos-585291064.1200w.tn.jpg","https://image.desiringgod.org/resolved-to-read-the-bible-zc7fors3-en/landscape/large_resolved-to-read-the-bible-zc7fors3.jpg?1481913446","http://media.salemwebnetwork.com/cms/CW/faith/33059-bible-sunlight-1200.1200w.tn.jpg"]};

var paragraphs = {paragraphs:["Uno solo puede ser vencido, pero dos pueden resistir. ¡La cuerda de tres hilos no se rompe fácilmente!. Eclesiast&eacute;s 4:12","Clama a mí, y yo te responderé, y te enseñaré cosas grandes y ocultas que tú no conoces. Jeremias 33:3","lorem10","Crea en mí, oh Dios, un corazón limpio, y renueva la firmeza de mi espíritu. Salmos 51:10"]};

var velocity = 120; //120*70 son los segundos que dura

$("#slider-soysano").sliderSoySano(images,paragraphs,velocity);