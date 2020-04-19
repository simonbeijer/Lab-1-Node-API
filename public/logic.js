window.addEventListener('load', () => {
    const form = document.getElementById('formAdd')
    form.addEventListener('submit', addGuitar)
    //....
    //....
})


fetch('http://127.0.0.1:3000/guitars').then((response) => {
    return response.json()
}).then((guitars) => {
    printGuitars(guitars)
    console.log(guitars)
})


function printGuitars(guitars) {
    let printGuitarsContainer = document.getElementById('guitars')

    guitars.forEach(guitar => {
        let guitarName = document.createElement('h3')
        let guitarId = document.createElement('button')
        let update = document.createElement('button')
        guitarId.onclick = function () { deleteGuitar(guitar.id) }
        update.onclick = function () { updateGuitarDiv(guitar.id, guitar.name, guitar.color)}
        guitarName.innerText = guitar.name
        guitarId.innerText = "Delete"
        update.innerText = "Update"
        let guitarColor = document.createElement('h4')
        let guitarPrice = document.createElement('h4')
        let guitarType = document.createElement('h4')
        guitarColor.innerText = guitar.color
        guitarPrice.innerText = guitar.price
        guitarType.innerText = guitar.type

        let guitarDiv = document.createElement('div')
        guitarDiv.appendChild(update)
        guitarDiv.appendChild(guitarId)
        guitarDiv.appendChild(guitarName)
        guitarDiv.appendChild(guitarColor)
        guitarDiv.appendChild(guitarPrice)
        guitarDiv.appendChild(guitarType)
        

        printGuitarsContainer.appendChild(guitarDiv)
    });

};

function searchId() {
    const id = document.getElementById('searchId').value

    fetch('http://127.0.0.1:3000/guitars/' + id).then((response) => {
        if (response.status === 404) {
            printGuitarId()
        } else {
            return response.json()
        }
    }).then((guitar) => {
        printGuitarId(guitar)
    })
}

function printGuitarId(guitar) {
    let foundGuitarDiv = document.getElementById('foundGuitarDiv');
    foundGuitarDiv.innerHTML = '';

    if (guitar) {
        let guitarName = document.createElement('h3')
        let guitarColor = document.createElement('h4')
        let guitarPrice = document.createElement('h4')
        let guitarType = document.createElement('h4')

        guitarName.innerText = guitar.name
        guitarColor.innerText = guitar.color
        guitarPrice.innerText = guitar.price
        guitarType.innerText = guitar.type

        let guitarDiv = document.createElement('div')
        guitarDiv.appendChild(guitarName)
        guitarDiv.appendChild(guitarColor)
        guitarDiv.appendChild(guitarPrice)
        guitarDiv.appendChild(guitarType)
        foundGuitarDiv.style.cssText = "border:black solid 1px;"
        foundGuitarDiv.appendChild(guitarDiv)
        
    } else {
        let errorResponese = document.createElement('h4');
        foundGuitarDiv.style.cssText = "border:black solid 1px;"
        errorResponese.innerText = 'Hittar ingen gitarr';
        foundGuitarDiv.appendChild(errorResponese)
    }
};



function addGuitar(event) {
    event.preventDefault()
    console.log(event)


    const formData = new FormData(event.target)
    const guitar = {}
    for (let pair of formData.entries()) {
        const [key, value] = pair
        guitar[key] = value
    }
    console.log(guitar)
    fetch('http://127.0.0.1:3000/guitars', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(guitar)
    })
    location.reload();
}


function deleteGuitar(id) {


    fetch('http://127.0.0.1:3000/guitars/delete/' + id, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(res => console.log(res))

    location.reload();

    // fetch('http://127.0.0.1:3000/guitars/delete/' + id).then((response) => {
    //     if (response.status === 404) {
    //         console.log("cant find guitar")
    //     } else {
    //         return response.json()
    //     }
    // }).then((response) => {
    //     response.send()
    //     console.log("guitar is deleted")
    // })
}


let nr = 0;
function updateGuitarDiv(id, name, color) {
    if(nr < 1) {
        nr ++ 
        let updateGuitarDiv = document.getElementById('updateGuitarDiv');
        
        let guitarName = document.createElement('input');
        guitarName.value = name;
        let guitarColor = document.createElement('input');
        guitarColor.value = color;
        let submit = document.createElement('button');
        submit.innerText = "Update"
        submit.onclick = function () {updateGuitar(id, guitarName.value, guitarColor.value)}
        
        let guitarDiv = document.createElement('div')
        guitarDiv.cssText = "background: cadetblue; display: flex; justify-content: space-around; align-items: center; height: 5rem;"
        guitarDiv.appendChild(guitarName)
        guitarDiv.appendChild(guitarColor)
        guitarDiv.appendChild(submit)
        
        updateGuitarDiv.appendChild(guitarDiv)
    }
        
}

function updateGuitar(id, updateName, updateColor) {

    console.log(id, updateName, updateColor)
    let guitar = {name: updateName, color: updateColor}
    fetch('http://127.0.0.1:3000/guitars/' + id, {
        method: "PUT",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(guitar)
    })
    location.reload();

}