window.onscroll = function(){
    myFunction()
};
var header = document.getElementById("myHeader");
var sticky = header.offsetTop;
// console.log(sticky)

function myFunction(){
    if(window.pageYOffset > sticky){
        header.classList.add('sticky');
    }else{
        header.classList.remove('sticky')
    }
}

// 코드연습 
// var h1 = document.getElementById('h1');
// var h1height = h1.getBoundingClientRect().top;
// var innerheight = window.innerHeight;
// var clientheight = document.documentElement.clientHeight;
// console.log('this is' + h1height);
// console.log('this is' + innerheight);
// console.log('this is' + clientheight);








// const target = document.getElementById('target')

// const clientRect = target.getBoundingClientRect();
// const relativeTop = clientRect.top;
// const scrolledTopLength = window.pageYOffset;
// const absoluteTop = scrolledTopLength + relativeTop;
// console.log(absoluteTop)

// 절대좌표 
// const absoluteTop = window.pageYOffset + target.getBoundingClientRect().top;
// console.log(absoluteTop);

// 상대좌표 
// const relativeTop = target.getBoundingClientRect().top;
// console.log(relativeTop)