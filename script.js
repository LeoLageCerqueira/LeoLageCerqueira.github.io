const cards = document.querySelectorAll(".card");

$(document).ready(function(){
    $(".start").click(function(){
        $(".card").css("pointer-events", "none")
        setTimeout(() => {
            $(".card").css("pointer-events", "auto")

        }, 4000);
        randomizar();
        transitionInicio();
        var inicio = new Date();
        virarCompararEndGame(inicio);
    })
})


function randomizar(){
    cards.forEach(card => {
        var random = Math.floor(Math.random() * 16);
        card.style.order = random;
    });
}

function transitionInicio(){
    $(".front-card").delay(3000).fadeOut(500);
    $(".back-card").delay(3500).fadeIn("fast");
}

//Pegando um valor vazio para a source
var imgSrc = "";
var segundaCarta = "";

var clickFrontCards = [];
var clickBackCards = [];
let matchCards = 0;

function virarCompararEndGame(inicio){
    $(".card").on("click",function(){
        console.log(inicio);
        //desvira a carta
        $(".front-card", this).show();
        $(".back-card", this).hide();
        clickFrontCards.push($(".front-card", this));
        clickBackCards.push($(".back-card", this));
        //selecionando a primeira carta, pois a imgSrc ainda está vazia
        if (imgSrc == ""){
            //a imgSrc agora é preenchida pela src da imagem
            imgSrc = $(".front-card", this).attr("src");
            console.log(imgSrc);
            $(this).addClass("selected");
        }
        else{
            var segundaCarta = $(".front-card", this).attr("src");
            console.log(segundaCarta);
            $(this).addClass("selected");
            //caso a src da primeira não dê match com a segunda entramos no if
            if (imgSrc != segundaCarta){
                    //imgSrc e segunda carta são esvaziadas
                    imgSrc = "";
                    segundaCarta = "";
                    console.log("Errou");
                    //vira e desvira cartas
                    for (let frontCard of clickFrontCards){
                        frontCard.delay(1500).slideUp("fast");
                    }
                    for (let backCard of clickBackCards){
                        backCard.delay(1500).fadeIn("fast");
                    }
                    //desabilita o click por 1.7 segundos
                    
                    $(".card").css("pointer-events", "none")
                    setTimeout(() => {
                        $(".card").css("pointer-events", "auto")

                    }, 1700);
                    clickFrontCards = [];
                    clickBackCards = [];
            }else{
                //contabiliza cards
                matchCards ++;
                imgSrc = "";
                segundaCarta = "";
                console.log("Acertou!");
                $(".selected").addClass("matched");
                clickFrontCards = [];
                clickBackCards = [];
                //fim do jogo quando acontecem 8 matches
                if(matchCards === 8){
                    var fim = new Date();
                    console.log(inicio);
                    var decorrido = fim.getTime() - inicio.getTime();
                    var decorrido2 = decorrido/1000;
                    alert("Você acabou o jogo com o tempo de: " + decorrido2 + " segundos");

                }
            }
            
        }

    })
}
/* function endGame(inicio){
    var fim = ((new Date().getTime())/(10));
    console.log(inicio);
    var decorrido = fim - inicio;
    console.log(decorrido);
    console.log(fim);
    alert("Você acabou o jogo com o tempo de: " + decorrido + " segundos");
} */
