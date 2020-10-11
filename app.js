const input = document.querySelector("#text");

const submit = document.querySelector(".submit");

const deleteItem = document.querySelector(".delete")

const listItems = document.querySelectorAll(".items__list-item")


// =========== Master function to create new elements ===========
function renderElements(source) {
    // Create new li item
    const newLi = document.createElement("li");
    newLi.classList.add("items__list-item")

    // Add child p to new li
    const newP = document.createElement("p");
    newLi.appendChild(newP);

    // // Make new p editable
    // newP.setAttribute("contenteditable", "true")

    // Add text inside new p element
    newP.innerHTML = source;

    // Add child a to new li
    const newA = document.createElement("a");
    newA.setAttribute("href", "#");
    newLi.insertAdjacentElement("beforeend", newA)

    // Add child i inside new a
    const newIcon = document.createElement("i");
    newIcon.classList.add("fas");
    newIcon.classList.add("fa-trash-alt");
    newIcon.classList.add("delete");
    newA.appendChild(newIcon);

    // Append new li to existing ul
    document.querySelector(".items__lists").insertAdjacentElement("beforeend", newLi)
}


// Hide items block if it's empty and show when new list items added
function ulVisibility() {
    const itemsBlock = document.querySelector(".items")
    if (itemsBlock.firstElementChild.childElementCount == 0) {
        itemsBlock.classList.add("hidden")
    } else {
        itemsBlock.classList.remove("hidden")
    }
}


// =========== Onload events ===========
window.addEventListener("load", () => {
    const storage = localStorage

    // Sort storage entries by keys
    const storageSorted = {}
    Object.keys(storage).sort().forEach(key => {
        storageSorted[key] = storage[key];
    })
    
    // Render item list
    for (const[key, value] of Object.entries(storageSorted)) {
        renderElements(localStorage.getItem(key))

        // Remove empty lists
        targetItem = document.querySelector(".items__lists").lastElementChild

        targetItem.setAttribute("data-key", key)
    }

    // Hide ul if list is empty
    ulVisibility();

    // // =========== Make List Items Editable ===========
    // // Create confirm edition button
    // const lists = document.querySelectorAll(".items__list-item");
    // const listsArray = Array.from(lists);
    // console.log(listsArray)
    // listsArray.forEach(list => {
    //     list.addEventListener("click", () => {
    //         const confirm = document.createElement("a");
    //         confirm.setAttribute("href", "#");
    //         const icon = document.createElement("i");
    //         icon.classList.add("fas", "fa-check-circle");
    //         confirm.appendChild(icon);
    //         confirm.classList.add("confirm")

    //         // Append new confirm button after editable p
    //         list.firstElementChild.after(confirm)
    //         console.log("success")
    //     })
    // })
})


// =========== Add new item to the list ===========
submit.addEventListener("click", (e) => {
    e.preventDefault();
    const inputText = input.value;

    // Append new element through master render function
    renderElements(inputText);

    // Add new task to local storage
    // How many lis in ul currently?
    const lisCount = document.querySelector(".items__lists").childElementCount;

    // Select text content of new li
    const newValue = document.querySelector(".items__lists").lastElementChild.firstElementChild.innerHTML;

    // Check items list visibility
    ulVisibility();

    // Add new item in local storage
    localStorage.setItem(`${lisCount}`, newValue)

    // Add data-key to new list item
    // // Adding this number in the data-key attribute
    document.querySelector(".items__lists").lastElementChild.setAttribute("data-key", lisCount)

    // Clear input field after submitting
    input.value = ''
})


// =========== Remove item from list ===========
document.addEventListener("click", (e) => {
    e.preventDefault();
    let targetLink = e.target;
    if (targetLink.classList.contains("fas")) {
        // Show confirmation alert
        const overlay = document.querySelector(".overlay");
        const alarm = document.querySelector(".alarm");
    
        overlay.classList.remove("hidden")
        alarm.classList.remove("hidden")

        // Alert window buttons
        const misclick = document.querySelector(".misclick");
        const fulldelete = document.querySelector(".fulldelete");

        // If user misclicked
        misclick.addEventListener("click", () => {
            overlay.classList.add("hidden")
            alarm.classList.add("hidden")
        })

        // If user confirm deletion
        fulldelete.addEventListener("click", () => {
            // Hide alarm window
            overlay.classList.add("hidden")
            alarm.classList.add("hidden")

            // Remove item from local storage
            // // Get data-key of current li
            const dataKey = targetLink.parentElement.parentElement.getAttribute("data-key");
            // // Remove local storage value by data key
            localStorage.removeItem(dataKey)
            
            // Remove item from list
            targetLink.parentElement.parentElement.remove();

            // Hide ul if list is empty
            ulVisibility();
        })
    }
})