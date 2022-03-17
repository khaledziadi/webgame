var grid = document.getElementById("grid");
const element = document.getElementById("mybtn");
const audioclick = new Audio()
const audioflg = new Audio()
const audiogameover = new Audio()
const audioopen = new Audio()
const audioflgr = new Audio()
const audioopengame = new Audio()
audioclick.src = "./audio2.wav"
audioflg.src = "./flgaudio.wav"
audiogameover.src = "./gameover.wav"
audioopen.src = "./open2.wav"
audioflgr.src = "./flagremove.wav"
audioopengame.src = "./gameopen.wav"

var flags = 0
let bomb = 0
let scr = 0
var testMode = false;
var counter = 100;
var a = 1000;
setInterval(function() {
    counter--;
    if (counter >= 0) {
        id = document.getElementById('count');
        id.innerHTML = counter;

    }
    if (counter == 0) {
        document.getElementById("gameover").innerHTML = "TIME OVER";
    }





}, a)

generateGrid();

function generateGrid() {

    grid.innerHTML = "";
    for (var i = 0; i < 10; i++) {
        row = grid.insertRow(i);
        for (var j = 0; j < 10; j++) {
            cell = row.insertCell(j);
            /*cell.onclick = function() {
                clickCell(this);

            };*/
            audioopengame.play();
            cell.addEventListener('click', function(e) {
                clickCell(this);
                audioclick.play()


            })
            cell.addEventListener('contextmenu', function(event) {
                event.preventDefault()
                addflag(this)


            })



            var mine = document.createAttribute("data-mine");
            mine.value = "false";
            cell.setAttributeNode(mine);
            document.getElementById("gameover").innerHTML = "";
            document.getElementById("count").innerHTML = "100"
            counter = 100
            a = 1000

        }


    }

    addMines();


}





//add flag 
function addflag(cell) {
    /* if (cell.getAttribute("data-mine") == "true") {
        revealMines();
        let o = document.getElementById("gameover").innerHTML = "GAME OVER";
    }*/
    if (!cell.classList.contains('clicked') && (flags < bomb)) {
        if (!cell.classList.contains('flag')) {
            cell.classList.add('flag')
            cell.innerHTML = "🏴"
            flags++
            document.getElementById("flgnmb").innerHTML = flags
            audioflg.play()
            if (cell.getAttribute("data-mine") == "true") {
                scr++
                console.log(scr)

            }
            if (scr == bomb) {
                let d = document.getElementById("gameover").innerHTML = "  YOU WIN";
                document.getElementById("count").innerHTML = ""
                counter = 0
                a = 0
                audioopengame.play()


            }


        } else {
            cell.classList.remove('flag')
            cell.innerHTML = ''
            flags--
            document.getElementById("flgnmb").innerHTML = flags
            audioflgr.play()
        }


    }


}

function addMines() {
    //Add mines random 
    for (var i = 0; i < 20; i++) {
        var r = Math.floor(Math.random() * 10);
        var c = Math.floor(Math.random() * 10);
        var cell = grid.rows[r].cells[c];
        //cell.classList.add("flag");
        //console.log(row, col)

        cell.setAttribute("data-mine", "true");
        cell.innerHTML = ""





    }
    //console.log(x)
    //console.log(y)
    console.log("bomb", bomb)


}

function revealMines() {
    //Highlight all mines in red
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var cell = grid.rows[i].cells[j];
            if (cell.getAttribute("data-mine") == "true") {
                cell.className = "mine";
                cell.innerHTML = "💣"



            }
        }
    }
}

function checkLevelCompletion() {
    var levelComplete = true;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if ((grid.rows[i].cells[j].getAttribute("data-mine") == "false") && (grid.rows[i].cells[j].innerHTML == "")) levelComplete = false;
        }
    }
    if (levelComplete) {
        let d = document.getElementById("gameover").innerHTML = "  YOU WIN";
        document.getElementById("count").innerHTML = ""
        counter = 0
        a = 0
        revealMines();

    }

}

function clickCell(cell) {
    if (cell.getAttribute("data-mine") == "true") {
        revealMines();
        let o = document.getElementById("gameover").innerHTML = "GAME OVER";
        document.getElementById("count").innerHTML = ""
        counter = 0
        a = 0
        audiogameover.play()



    } else {
        cell.className = "clicked";
        //Count and display the number of adjacent mines
        var mineCount = 0;
        var cellRow = cell.parentNode.rowIndex;
        var cellCol = cell.cellIndex;
        for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
            for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
                if (grid.rows[i].cells[j].getAttribute("data-mine") == "true") mineCount++;
            }
        }
        cell.innerHTML = mineCount;
        if (mineCount == 0) {
            cell.innerHTML = ""
            for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
                for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
                    //Recursive Call
                    if (grid.rows[i].cells[j].innerHTML == "") clickCell(grid.rows[i].cells[j]);



                }
            }
        }
        //checkLevelCompletion();

    }
}
for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
        if (grid.rows[i].cells[j].getAttribute("data-mine") == "true") {
            bomb++
        }
    }
}

console.log("bomb", bomb)