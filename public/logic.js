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
        guitarName.innerText = guitar.name
        let guitarColor = document.createElement('h4')
        guitarColor.innerText = guitar.color

        let guitarDiv = document.createElement('div')
        guitarDiv.appendChild(guitarName)
        guitarDiv.appendChild(guitarColor)

        printGuitarsContainer.appendChild(guitarDiv)
    });

};

function searchId() {
    const id = document.getElementById('searchId').value

    fetch('http://127.0.0.1:3000/guitars/' + id).then((response) => {
        if(response.status === 404) {
            printGuitarId()
        } else {
            return response.json()
        }
    }).then((color) => {
        printGuitarId(color)
    })
}

function printGuitarId(color) {
    let foundGuitarDiv = document.getElementById('foundGuitarDiv');
    foundGuitarDiv.innerHTML = '';

    if(color) {
        let guitarName = document.createElement('h3')
        guitarName.innerText = color.name
        let guitarColor = document.createElement('h4')
        guitarColor.innerText = color.color

        let guitarDiv = document.createElement('div')
        guitarDiv.appendChild(guitarName)
        guitarDiv.appendChild(guitarColor)

        foundGuitarDiv.appendChild(guitarDiv)
        
    } else {
        let errorResponese = document.createElement('h4');
        errorResponese.innerText = 'Hittar ingen gitarr';
        foundGuitarDiv.appendChild(errorResponese)
    }
};



// function addGuitar() {
//         const id = document.getElementById('guitarId').value
//         const name = document.getElementById('guitarName').value
//         const color = document.getElementById('guitarColor').value

//         fetch('http://127.0.0.1:3000/api/guitars').then((response) => {
//             if(response.status === 404) {

    
//             } else {
//                 return response.json()
//             }
//         }).then(() => {
    
//         })
    
    
//     }
    