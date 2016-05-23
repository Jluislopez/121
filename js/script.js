 $(function()
{

var cuentaTiempo = 0;
var total_numeros=121;
var usados = []; 
var dimensiones=11;
var mostrando = false;
var objetivo=1;
var ayudas=6;
var alto= screen.height;
var ancho= screen.width;
var matriz=[[],[],[],[],[],[],[],[],[],[],[]];
var animaciones=["animated tada","animated flash","animated wobble","animated zoomIn","animated rotateIn","animated swing"];


iniciarJuego();

function iniciarJuego () 
  {
    crearEscenario();
    llenarMatriz();
  }


function llenarMatriz () 
  {
    do
        {
        for (var i = 0; i < matriz.length; i++) 
            {
                for (e=0; e<matriz.length; e++)
                {
                            
                         matriz[i][e]=aleatorio(total_numeros);
                };
            };
        }

        while(matriz.length===12)
        
        for (i=0; i<matriz.length; i++)
            {
                for (e=0; e<matriz.length; e++)
                  {
                    $('#'+i+"_"+e).html(matriz[i][e]);
                  };
            };
  }



function crearEscenario () 
    {
        var txt = "<table id = 'chess_board' cellpadding = '0' cellspacing = '0' >";
        var divTabla = "";
        for(var i = 0; i < dimensiones; i++)
        {
            txt += "<tr>";
            for(var c = 0; c < dimensiones; c++)
            {
                divTabla = i + "_" + c;
                txt += "<td id = '"+(divTabla)+"'></td>";
            }
            txt += "</tr>";
            

        }
        txt += "</table>";
        $("#escenario").html(txt);


          $("#chess_board").css
                          ({
                             "width"                : (ancho-15)+"px",
                              "height"              : (alto-100 )+"px",
                           // "border"              : "1px solid red",
                              "font-weight"         : "bold",
                              "font-family"         : "Arial",
                              "line-height"         : 5+"px",
                              "cursor"              : "pointer",
                              "text-align"          :"center",
                              "font-size"           : "35px",
                              "margin-top"        :   "20px"
                               
                         });

        clickCelda();
        
      
    };


function aleatorio(min)
{ 
    if (usados.length !=  min)
    {   
        var num; 
        var repe= false; 
            do 
            { 
                var num=Math.floor((Math.random()*min)+1);
                repe = repetido(num); 
            } 
            
            while (repe != false); 
                usados.push(num); 
                return num; 
    } 

    else 
    { 
    return 0; 
    } 
}   


function repetido(num)
{ 
    var repe = false; 
        for (var i = 0; i < usados.length; i++) 
        {
            if (num == usados[i]) 
            { 
                repe = true; 
            } 
        } 
  return repe; 

}  



function clickCelda () 
    {
        for(var i = 0; i < dimensiones; i++)
        {
            for(var c = 0; c < dimensiones; c++)
            {
             $("#" + i + "_" + c).click(function(event)
                {
                  if (event.toElement.innerHTML==objetivo) 
                  {
                        $("#"+event.toElement.id).removeClass();
                        $("#"+event.toElement.id).addClass("EX").css
                        ({
                             "color"              : 'red',
                             "background-color"   : "black",
                             "font-weight"        : "bold",
                             "border-radius"      : "100%"
                        })                      
                                                     
                         objetivo++;                     

                        if (objetivo==121)
                        {
                            swal({   
                                    title   : "!Felicitaciones!",   
                                    text    : "Lo haz conseguido en "+cuentaTiempo+" segundos",
                                    imageUrl: "imagenes/like.png",
                                    timer   :  5000
                                });  
                                iniciarJuego();                                                    
                        };


                       $("#objetivo").html("<i class='fa fa-eye'></i> "+objetivo);

                      
                  };                                      
 
                });
            };
        };
    };





$("#play").click(function(event) 
  {
    mostrarOpciones();
    tiempo = setInterval(function()
      {
        cuentaTiempo++;
        if ((cuentaTiempo%20)===0)
          {
            if (palabra!=huevoPascua) 
              {
                createjs.Sound.play("reloj", {startTime: 0, duration: 3000});
              };
          };

        if((cuentaTiempo)%200===0)
          {
            navigator.vibrate(1000);
          }
    
        $("#tiempo").html("<div id = 'tiempo' > <i class='fa fa-clock-o fa-pulse'></i> "+cuentaTiempo+"'</div>");
      }, 1000);  
  });

 

$("#ayuda").click(function(event)
  {
    ayudas--;

    for (i=0; i<matriz.length; i++)
      {
        for (e=0; e<matriz.length; e++)
          {   
            if($('#'+i+"_"+e).html()==objetivo)
              {
                  $('#'+i+"_"+e).removeClass();
                  $('#'+i+"_"+e).addClass("obj").css
                  ({
                      "color"              : 'black',
                      "background-color"   : "red",
                      "font-weight"        : "bold",
                      "border-radius"      : "50%"
                  });                


                   $("#ayuda").html("<i class = 'fa fa-heart faa-pulse animated-hover '></i>"+"x"+ayudas).css
                    ({
                       "font-size": '4em',
                       "font": 'normal normal normal FontAwesome'
                    });
              };

              if (ayudas===0) 
               {
                    $("#ayuda").hide();
                    swal
                      ({     
                          title               : "Fail",  
                          text                :"Se han acabado las ayudas.", 
                          showCancelButton    : false,   
                          confirmButtonColor  : "#DD6B55",  
                          confirmButtonText   : "Aceptar", 
                          closeOnConfirm      : false,
                          timer               : 5000,    
                          imageUrl            : "imagenes/sad.png"
                      });  
                       
                    
                };
          };
      };
  });

$("#salir").click(function(event)
  {
    
    swal({   
            title               : "¿Estas seguro?",   
            text                : "Se acabará el juego",  
            type                : "warning",   
            showCancelButton    : true,   
            confirmButtonColor  : "#DD6B55",   
            confirmButtonText   : "Acabar",
            cancelButtonText    : "Cancelar",   
            closeOnConfirm      : false,   
            closeOnCancel       : false 
          },

        function(isConfirm)
        {   
          if (isConfirm) 
            {     
             
                swal
                ({
                    title             : "Cargando",   
                    text              : "Recargando página...",   
                    showConfirmButton : false 
                });     

            } 
            else 
              {  
                swal
                ({
                    title   : "Reinicio Cancelado",   
                    text: ":)", 
                    type:"error",
                    timer:2200 
                });   
              }; 

        });
  });

function mostrarOpciones () 
  {
    $("#play").hide('slow');
    $("#info").hide('slow');
    $("#escenario").show();
    $("#tiempo").css('display', 'inline-block').show();
    $("#salir").css('display', 'inline-block').show();
    $("#ayuda").css('display', 'inline-block').show();
    $("#objetivo").css('display', 'inline-block').show();
        
  };


function randomColor () 
    {       
        return '#'+(function lol(m,s,c){return s[m.floor(m.random() * s.length)] +
        (c && lol(m,s,c-1))})(Math,'0123456789ABCDEF',4);
    };

});
