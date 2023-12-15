const url=`https://api.dictionaryapi.dev/api/v2/entries/en/`;
let sound=document.getElementById("sound");
document.addEventListener('DOMContentLoaded', function() {
    let show_ele=document.getElementById("show-credit");
    let x=document.getElementById("x");
    x.addEventListener('click',hide);
    show_ele.addEventListener('click' ,show);
    function show(){
    let info = document.getElementById("credit");
    if (info) {
        info.classList.add("show");
    }
}
function hide(){
    let info = document.getElementById("credit");
    if (info) {
        info.classList.remove("show");
    }
}
});
document.addEventListener('DOMContentLoaded', function() {
let inputfield=document.getElementById("searchinput");
inputfield.addEventListener('keypress',function(event){
    if(event.key=="Enter"){
        event.preventDefault();document.getElementById("searchbtn").click();
    }
});
});
async function find(){
    let input=document.getElementById("searchinput").value;
    let heading=document.getElementById("heading");
    let pronounce=document.getElementById("pronounce");
    let meaning=document.getElementById("meaning");
    let example=document.getElementById("example");
    let sound=document.getElementById("sound");
    let like=document.getElementById("like");
    like.style.backgroundColor="#feb10b";
    like.style.color="white";
    try{
        let response= await fetch(url+input);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data=await response.json();
        data.forEach(element => {
            console.log(element);
        });
        heading.innerHTML=`&lt;&lt; ${input} &gt;&gt;`;
        pronounce.innerHTML=data[0].phonetic;
        meaning.innerHTML=data[0].meanings[0].definitions[0].definition;
        example.innerHTML="Parts Of Speech: "+data[0].meanings[0].partOfSpeech;
        if(data[0].phonetics[0].audio.length>1)
        sound.src=data[0].phonetics[0].audio;
        else if(data[0].phonetics[1].audio.length>1)
        sound.src=data[0].phonetics[1].audio;
        else if(data[0].phonetics[2].audio.length>1)
        sound.src=data[0].phonetics[2].audio;
        else console.error("Audio unavailable");
        
    }
    catch (error) {
        console.error('Error:', error);
    }
}
function playSound(){
        try{
        let sound=document.getElementById("sound");
        sound.play();
        }
        catch (error) {
            console.error('Error:', error);
        }
    }
let flag=0;
function likefunc(){
    if(!flag){
    let like=document.getElementById("like");
    like.style.backgroundColor="pink";
    like.style.color="red";
    flag=1;
    }else{
        like.style.backgroundColor="#feb10b";
        like.style.color="white";
        flag=0;
    }
}
function main(){
    let interface=document.getElementById("interface");
    let container=document.getElementById("container");
    interface.style.display="none";
    container.style.display="block";
}
