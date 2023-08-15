import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://playground-69138-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database,"shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addToCartBtnEl = document.getElementById("addtocart-btn")
const shoppingListEl = document.getElementById("shopping-list")

addToCartBtnEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value
    push(shoppingListInDB,inputValue)
    clearInputField()
})

onValue(shoppingListInDB,function(snapshot){
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        clearShoppingListEl()
        for(let i =0 ;i<itemsArray.length;i++){
            let currentItem = itemsArray[i]
            appendItemToShoppingListEl(currentItem)
        }
    }
    else{
        shoppingListEl.innerHTML = `<h2 style="color:#075E54;">No items here yet...</h2>`
    }
})

function clearShoppingListEl(){
    shoppingListEl.innerHTML = ""
}
function clearInputField(){
    inputFieldEl.value = ""
}
function appendItemToShoppingListEl(item){
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    
    newEl.addEventListener("click",function(){
        let exactLocationOfItemInDB = ref(database,`shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    shoppingListEl.append(newEl)
}