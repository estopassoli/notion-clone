var notes = []
/* try { */
var existnotes = JSON.parse(localStorage.getItem('notions'))

for (let i in existnotes) {
    var data = {
        id: existnotes[i].id,
        title: existnotes[i].title,
        color: existnotes[i].color,
        type: existnotes[i].type,
        desc: existnotes[i].desc,
        date: existnotes[i].date,
        datef: existnotes[i].datef
    }
    notes.push(data)
}

let user_id = ''
console.log(notes)
/* 
} catch {} */
$('form').on('submit', function (e) {
    e.preventDefault();

    var title = document.getElementById('input-title');
    var color = document.getElementById('note-color');
    var type = document.getElementById('note-type');
    var datef = document.getElementById('date-note').value;
    var date = document.getElementById('date-note').value;
    var desc = document.getElementById('note-description')
    datef = datef.split('T')
    let hour = datef[1];
    datef = datef[0].split('-')
    datef = datef[2] + '/' + datef[1] + '/' + datef[0] + ' ' + hour;


    var id = Math.floor(Math.random() * 65885);


    var data = {
        id: id,
        title: title.value,
        color: color.value,
        type: type.value,
        desc: desc.value,
        date: date,
        datef: datef
    }
    for (let i in notes) {
        if (notes[i].id != user_id) {

        } else {
            notes[i] = data;
        }
        notes.push(data);
        localStorage.setItem('notions', JSON.stringify(notes))
        window.location.href = '/';
    }


})



setTimeout(function () {
    for (let i in notes) {
        let color = "#000000"
        if (notes[i].color != "#ffffff") {
            color = "#fff"
        } else {}
        $('#content-list').append(`
        <div id="row-list" style="background-color: ${notes[i].color};">
            
        
        
        <div id="row-content" style="color: ${color};">
                        <p id="note-title" style="color: ${color};">${notes[i].title}</p>
                        <div id="options">
        <i class="bi bi-pencil-fill" onclick="editRow('${notes[i].id}')" style="color: ${color};"></i>
        <i class="bi bi-trash3-fill" onclick="deleteRow('${notes[i].id}')" style="color: ${color};"></i>
        </div>
                <p id="note-date" style="color: ${color};">${notes[i].datef}</p>
                <p id="note-desc" style="color: ${color};">${notes[i].desc}</p>
                <p id="row-type" style="color: ${color};">${notes[i].type}</p>
        </div>
        
        </div>`)
    }
}, 1)


function deleteRow(id) {
    var co = confirm("Deseja mesmo excluir esta tarefa?")
    var newNotes = []
    if (co) {
        for (let i in notes) {
            if (notes[i].id != id) {
                newNotes.push(notes[i])
            }
        }
        console.log('new notes: ', newNotes)
        localStorage.removeItem('notions')
        localStorage.setItem('notions', JSON.stringify(newNotes))

        window.location.href = "/";
    }
}

function editRow(id) {
    user_id = id;
    for (let i in notes) {
        if (notes[i].id == id) {
            document.getElementById('input-title').value = notes[i].title;
            document.getElementById('note-color').value = notes[i].color;
            document.getElementById('note-type').value = notes[i].type;
            document.getElementById('date-note').value = notes[i].date;
            document.getElementById('note-description').value = notes[i].desc;
        } else {

        }
    }


}