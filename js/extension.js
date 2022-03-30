// Declare Mylist 
let myFavList=[]
let liEl= document.getElementById("list-el")
let  inputEl=document.getElementById("input-el")
// Declare Button 
const inputBtn=document.getElementById('save-btn')
const deleteBtn= document.getElementById("delete-btn")
const tabBtn = document.getElementById("save-tab")

// Convert My list to array from LocalStorage 
let myStorageList= JSON.parse(localStorage.getItem("myList"))

// Check if myStorageList is truly Not null 
if (myStorageList){
   myFavList = myStorageList
   render(myFavList)
}

// Function to loop through Mylist and render it to the screen 
function render(lst){
   let listItems= ""
   // Iterate thru our list and show up in unordered list 
   for (let i =0 ;i<lst.length;i++){
      //liEl.innerHTML+=  "<li>" + myFavList[i] + "</li>"
      //listItems+= "<li><a target='_blank' href='" + myFavList[i]+ "'>" +  myFavList[i]  +"</a></li>" 
      listItems+=
       `<li>
         <a target='_blank' href='${ lst[i]}'>${lst[i]} </a>
      </li>`
}  
   liEl.innerHTML= listItems
}

// Event Listener To save Tab button 
tabBtn.addEventListener("click",function(){
   chrome.tabs.query({active:true,currentWindow:true}, function(tabs){
         myFavList.push(tabs[0].url)
         localStorage.setItem("myList",JSON.stringify(myFavList))
         render(myFavList)
   })
  
})


// Event Listeener For save Button
inputBtn.addEventListener('click', function(){
   myFavList.push(inputEl.value)
   //console.log(myFavList) 
   
   render(myFavList)
   // clear out input after clicking the btn 
   inputEl.value =""
   localStorage.setItem("myList",JSON.stringify(myFavList))
 
})

// Event Listener For Delete All Button
deleteBtn.addEventListener("dblclick",function(){
   localStorage.clear()
   myFavList=[]
   render(myFavList)
})

