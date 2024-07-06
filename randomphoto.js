const apiKey = "0jVyFeTunLuNu7PQ2jrrypqCVu8wxuSs9PWI8goZFjs";

const imageGridEl = document.getElementById("imageGrid")
const inputEl = document.getElementById("searchInput")

const formEl = document.querySelector("form")



const showMoreEl = document.querySelector(".showMore")

let gelenArama = "";
let page =1;

formEl.addEventListener("submit", function (event) {
   
    event.preventDefault();
    page =1;
    takePhoto();

})


async function takePhoto() {

    gelenArama = inputEl.value

    
        const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${gelenArama}&client_id=${apiKey}`)

       

        const data = await response.json()
        
        if(page===1){
            imageGridEl.innerHTML="";

        }
        const result = data.results;

        result.map((result)=>{
            const imageWrapper = document.createElement("div")
            imageWrapper.classList.add("search-result")
            const image = document.createElement("img")
            image.src = result.urls.small
            image.alt = result.alt_description
            const imageLink = document.createElement("a")
            imageLink.href = result.links.html 
            imageLink.target="_blank"
            imageLink.textContent = result.alt_description

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            imageGridEl.appendChild(imageWrapper);

        });

        page++

        
      

        if(page >1){
            showMoreEl.style.display = "block";
        }
      
   }

   showMoreEl.addEventListener("click",function(){
    takePhoto()
   })

