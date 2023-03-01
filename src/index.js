// write your code here
//http://localhost:3000/ramens
document.addEventListener('DOMContentLoaded', run)


function run()
{
    fetch('http://localhost:3000/ramens')
    .then(resp => resp.json())
    .then(ramens => ramens.forEach(el => showRamen(el)))
    const form = document.getElementById('new-ramen')
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newName = document.getElementById('new-name').value
        const newRest = document.getElementById('new-restaurant').value
        const newImg = document.getElementById('new-image').value
        const newRating = document.getElementById('new-rating').value
        const newCommment = document.getElementById('new-comment').value
        const newRamen = {
            name: newName,
            restaurant: newRest,
            image: newImg,
            rating: newRating,
            comment:newCommment 
        }
        fetch('http://localhost:3000/ramens', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newRamen)
        })
        .then(resp => resp.json())
        .then(a => showRamen(a))
        e.target.reset();
    })
}
//Click on an image from the #ramen-menu div and see all the info about that ramen displayed inside the 
//#ramen-detail div and where it says insert comment here and insert rating here.
function handleDelete(e)
{
    const response = confirm("You are about to delete this item from the server, are you sure?");
    if (response)
    {
        fetch(`http://localhost:3000/ramens/${e.target.dataset.id}`, {method: 'DELETE'})
        .then(e => {if (e.ok)
                    alert('Delete successful')
                    else
                    alert('ERROR deleting this element.')
                })
        location.reload();
    }
}

function showRamen(ramen)
{ 
    const imgCont = document.getElementById('ramen-menu')
    const rImg = document.createElement('img')
    const del = document.createElement('input')
    const bDiv = document.createElement('div')
    bDiv.id = 'bdiv'
    del.type = 'button'
    del.value = 'X'
    del.dataset.id = ramen.id;
    del.id = 'del-btn'
    del.addEventListener('click', (e) => handleDelete(e))
    rImg.src = ramen.image
    rImg.dataset.id = ramen.id;
    rImg.addEventListener('click', handleClick)
    bDiv.append(del)
    imgCont.append(rImg, bDiv)
}

function handleClick(e)
{
    //e.target.dataset.id
    //img goes in img.detail-image
    //name goes in h2.name
    //rest goes in h3.restaurant
    //rating goes in #rating-display
    //comment goes in #comment-display
    const img = document.querySelector('img.detail-image')
    const name = document.querySelector('h2.name')
    const rest = document.querySelector('h3.restaurant')
    const rating = document.getElementById('rating-display')
    const comment = document.getElementById('comment-display')
    fetch(`http://localhost:3000/ramens/${e.target.dataset.id}`)
    .then(resp => resp.json())
    .then((ramen) => {
        img.src = ramen.image;
        name.textContent = ramen.name
        rest.textContent = ramen.restaurant
        rating.textContent = ramen.rating
        comment.textContent = ramen.comment
    })
}

//10:45
