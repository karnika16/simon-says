// array to track game sequence
let gameseq=[]
// array to track user pressed key
let userseq=[]
// initailly game is not started
let started=false
// initillay,0 level
let level=0

// array to access to buttons
let button=["red","orange","green","purple"]

// h2 for changing current level
let h2=document.querySelector("h2")

// when any key is pressed, the game starts
document.addEventListener("keypress",function(){
    // game can start only for once
    if(started == false){
        console.log("game started")
        started=true
    }
    levelUp()
})

// function for game flash
function gameFlash(btn){
    btn.classList.add("flash")
    setTimeout(() => {
        btn.classList.remove("flash")
    }, 200);
}

// function for user pressed button flash
function userFlash(btn){
    btn.classList.add("userFlash")
    setTimeout(() => {
        btn.classList.remove("userFlash")
    }, 200);
}

// function for incrementing level
function levelUp(){
    userseq=[]
    level++;
    h2.innerText=`level : ${level}`
    // choose random button
    let randomIndex=Math.floor(Math.random()*4)
    let randomColor=button[randomIndex]
    let randomBtn=document.querySelector(`.${randomColor}`)
    gameseq.push(randomColor)
    gameFlash(randomBtn)
}

// function to match sequence
function checkbtn(idx){
    if(userseq[idx] === gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(levelUp,1000)
        }
    }else{
        h2.innerHTML=`Game Over. your score was <b>${level}</b> <br> Press any key to start`
        document.querySelector("body").style.backgroundColor="red"
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white"
        },400)
        reset()
    }
}

// function that delas with user flash button
function btnPress(){
    let buttonPressed=this
    userFlash(buttonPressed)

    let userColor=buttonPressed.getAttribute("id")
    userseq.push(userColor)

    checkbtn(userseq.length-1)
}

// function for user press
let allbtns=document.querySelectorAll(".btn")
for(btn of allbtns){
        btn.addEventListener("click",btnPress)
}

// function that resets the game when game is over
function reset(){
    started=false
    gameseq=[]
    userseq=[]
    level=0
}