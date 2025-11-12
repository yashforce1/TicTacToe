let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");

let count = 0;
let chance = "X";

let gameovers = false;

const changeturn =()=>{
    if(chance === "X"){
        return "0";
    }
    else{
        return "X";
    }
}
//  const changeturn = () => chance==="X" ? "0":"X";  // short fun for checking turn

const winarray = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const checkwin = () =>{
    for(pattern of winarray){
        let position1 = boxes[pattern[0]].innerText;
        let position2 = boxes[pattern[1]].innerText;
        let position3 = boxes[pattern[2]].innerText;

        if(position1!="" && position2!="" && position3!=""){
            if(position1===position2 && position2===position3){
                
                gameover.play();   // sound

                document.querySelector('.info').innerText="";
                document.querySelector('.imagebox img').style.display="block";  // will show the animation.
                document.querySelector('.winner').innerText="Congratulation the game is won by : "+ chance;
                gameovers = true;
                return;
            }
        }
    }
}

// Game logic
let boxes = document.getElementsByClassName('boxes');
Array.from(boxes).forEach(Element=>{
    let boxtext = Element.querySelector('.boxtext');
    Element.addEventListener('click',()=>{
       
        if(boxtext.innerText===""){
            boxtext.innerText=chance;
            checkwin();
            
            count++;
            
            if(!gameovers){
                chance = changeturn();
                audioTurn.play();

                // you cannot directly pass classNme f(), because it give collection of array.
                // you can pass but with claaName(')[0];
                // document.getElementsByClassName('info')[0].innerText="Turn for"+ chance;
                document.querySelector('.info').innerText="Turn For : "+ chance;
                
                if(count === 9){
                    document.querySelector('.winner').innerText="Game Draw ! , Play again";
                    gameover.play();
                    gameovers = true;   // this tells that the game cannot be played futher;
                }

            }
           
    
        }
    })

})

//reset


function resetgame(){
    Array.from(boxes).forEach(Element =>{
        let boxtext = Element.querySelector('.boxtext');
        boxtext.innerText="";
    })
    chance ="X";
    count = 0;
    gameovers = false;

    document.querySelector('.info').innerText=" New Game!  Turn For : " + chance;
    //on reset the image & congratulation will be reset
    document.querySelector('.imagebox img').style.display= "none";
     document.querySelector('.winner').innerText="";

}

// if reset button is preseed.
let reset = document.getElementById('reset');
reset.addEventListener('click',()=>{
    resetgame();
})
