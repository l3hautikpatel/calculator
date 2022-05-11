console.log('this is magical notes');


let addBtn = document.getElementById('addBtn');
let addTxt = document.getElementById('addTxt');
let notes = document.getElementById('notes');
let searchText = document.getElementById('searchText');
let impNo = document.getElementById('impNo');
let titleTxt = document.getElementById('titleTxt');

searchText.addEventListener('input', function (e) {
    let value = searchText.value.toLowerCase();
    let cardNotes = document.getElementsByClassName('note-card');

    Array.from(cardNotes).forEach(function (element) {
        let text1 = element.getElementsByTagName('p')[0].innerText;
        let text2 = element.getElementsByTagName('h5')[0].innerText;

        if (text1.includes(value) || text2.includes(value)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    });

});


showNotes();
function showNotes() {

    let html = "";
    let noteString = localStorage.getItem('notes');
    let impNo = localStorage.getItem('impNo');
    let titleTxt = localStorage.getItem('titleTxt');
    if (noteString == null) {
        noteArray = [];
        impNo = [];
        titleTxt = [];
    } else {
        noteArray = JSON.parse(noteString);
        impNo = JSON.parse(impNo);
        titleTxt = JSON.parse(titleTxt);
    }
    if (noteArray.length == 0) { html = '<b>There is no note in account ~~ for adding notes click notes button</b>' }
    noteArray.forEach(function (element, index) {
        if (impNo[index] == 1) {
            html += ` <div  class="alert alert-warning note-card my-2 mx-2 card" style="width:18rem;">
            <div class="card-body">
                <h5 class="card-title">${titleTxt[index]}</h5>
                <p class="card-text">${element}</p>
                <button onclick="deleteNote(${index})" class="btn btn-primary" id="addBtn">Delete Note</button>
            </div>
        </div>`;
        }
        else if (impNo[index] == 2) {
            html += ` <div  class="alert alert-secondary note-card my-2 mx-2 card" style="width:18rem;">
                <div class="card-body">
                    <h5 class="card-title">${titleTxt[index]}</h5>
                    <p class="card-text">${element}</p>
                    <button onclick="deleteNote(${index})" class="btn btn-primary" id="addBtn">Delete Note</button>
                </div>
            </div>`;
        }
        else {
            html += ` <div  class="note-card my-2 mx-2 card" style="width:18rem;">
            <div class="card-body">
                <h5 class="card-title">${titleTxt[index]}</h5>
                <p class="card-text">${element}</p>
                <button onclick="deleteNote(${index})" class="btn btn-primary" id="addBtn">Delete Note</button>
            </div>
        </div>`;
        }
    });

    notes.innerHTML = html;

}

addBtn.addEventListener('click', function (e) {
    let noteString = localStorage.getItem('notes');
    let impNoS = localStorage.getItem('impNo');
    let titleTxtS = localStorage.getItem('titleTxt');
    if (noteString == null) {
        noteArray = [];
        impNoA = [];
        titleTxtA = [];
    } else {
        noteArray = JSON.parse(noteString);
        impNoA = JSON.parse(impNoS);
        titleTxtA = JSON.parse(titleTxtS);
    }
    noteArray.push(addTxt.value);
    impNoA.push(impNo.value);
    titleTxtA.push(titleTxt.value);
    localStorage.setItem('notes', JSON.stringify(noteArray));
    localStorage.setItem('impNo', JSON.stringify(impNoA));
    localStorage.setItem('titleTxt', JSON.stringify(titleTxtA));
    addTxt.value = "";
    titleTxt.value = "";
    error = true;
    showNotes();

});



function deleteNote(index) {
    if (confirm("you realy want to delete your note no ~ " + (index + 1))) {
        let noteString = localStorage.getItem('notes');
        let impNoS = localStorage.getItem('impNo');
        let titleTxtS = localStorage.getItem('titleTxt');

        noteArray = JSON.parse(noteString);
        impNoA = JSON.parse(impNoS);
        titleTxtA = JSON.parse(titleTxtS);

        noteArray.splice(index, 1);
        impNoA.splice(index, 1);
        titleTxtA.splice(index, 1);

        localStorage.setItem('notes', JSON.stringify(noteArray));
        localStorage.setItem('impNo', JSON.stringify(impNoA));
        localStorage.setItem('titleTxt', JSON.stringify(titleTxtA));
    }
    showNotes();
}








if (error == true) {
    var error = document.getElementById('successSpan');
    error.style.display = "block";
    document.getElementById("done-text").innerHTML = "Note Added Successful Check Notes List Below";
    setTimeout(function () {
        error.style.display = "none";
    }, 5000);

} else if (error == false) {
    var error = document.getElementById('errorSpan');
    error.style.display = "block";
    document.getElementById("error-text").innerHTML = "";
    setTimeout(function () {
        error.style.display = "none";
    }, 5000);
}
