import { memeData } from "./data.js";

const emotionRadio = document.getElementById('emotion-radios');
const button = document.getElementById('get-image-btn');
const isGifOption = document.getElementById('gifs-only-option');
const memeModalInner = document.getElementById('meme-modal-inner');
const memeModal = document.getElementById('meme-modal');
const closeButton = document.getElementById('meme-modal-close-btn');


emotionRadio.addEventListener('change', highLightCheckedOption);

closeButton.addEventListener('click',closeModal)

button.addEventListener('click', renderMeme);

 function highLightCheckedOption(e){
     
    const radios = document.getElementsByClassName('radio');
    for(let radio of radios){
        radio.classList.remove('highlight');
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
 }

 function closeModal(){
    memeModal.style.display = 'none';
 }

 function renderMeme(){
    const memeObject = getSingleMemeObject();
    memeModalInner.innerHTML = `<img 
    class="meme-img" 
    src="./images/${memeObject.image}"
    alt="${memeObject.alt}"
    >`
   memeModal.style.display = 'flex';
 }

 function getSingleMemeObject(){
    const memeArrays = getMatchingMeme();
    if(memeArrays.length === 1){
      return (memeArrays[0]);
    }else{
      const randomNumber = Math.floor(Math.random()*memeArrays.length)
      return (memeArrays[randomNumber]);
    }
    
   }

 function getMatchingMeme(){
   if(document.querySelector('input[type="radio"]:checked')){
    const selectedEmotion = document.querySelector('input[type="radio"]:checked').value;
    const isGif = isGifOption.checked;

   const matchingMeme = memeData.filter(function(memes){
    if(isGif){
        return memes.emotionTags.includes(selectedEmotion) && memes.isGif
    }else{
        return memes.emotionTags.includes(selectedEmotion)
              
    }
   
   })
    return matchingMeme;
   
    }
 }

function getEmotionArray(meme){
    const emotionArray = [];
    
    for(let memeGenerator of meme){
        for(let emotionTag of memeGenerator.emotionTags){
            if(emotionArray.includes(emotionTag)!=true){
            emotionArray.push(emotionTag);
            }
            
        }

    }
    return emotionArray;
}

function renderEmotionRadios(meme){
    let radioItems = '';
    const emotions  = getEmotionArray(meme);
  for(let emotion of emotions){
           radioItems +=`
           <div class="radio">
                <label for="${emotion}">${emotion}</label>
                <input
                type="radio"
                id="${emotion}"
                value="${emotion}"
                name = "emotions"
                >
           </div>
           `
  }
  emotionRadio.innerHTML = radioItems;
}
renderEmotionRadios(memeData);