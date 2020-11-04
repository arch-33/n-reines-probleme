
var nbr = window.prompt("nombre des columns :(0 < nbr < 12)");
if (Number(nbr) > 0 && Number(nbr)<12){
    main(Number(nbr));
}else{
    alert("nombre des columns doit etre entre 1 et 11");
    document.location = document.location;
}

function main(nbr){
    var table = document.getElementById("mytable");
    var tab_mem = document.getElementById("mem");
    var next_btn = document.getElementById("next_solu");
    var nbr_solutions_area = document.getElementById("nbr_solutions");


    function init_document(nbr) {
        var mem_tr = document.createElement("tr");
        tab_mem.appendChild(mem_tr);
        for (let i = 0; i < nbr; i++) {
            var tr = document.createElement("tr");
            table.appendChild(tr);
            for (let j = 0; j < nbr; j++) {
                var td = document.createElement("td");
                td.setAttribute("id", "c" + (i * nbr + j));
                td.setAttribute("class", "cell");
                td.innerHTML = " ";
                tr.appendChild(td);
            }
            var mem_td = document.createElement("td");
            mem_td.setAttribute("id", "mem" + i);
            mem_td.setAttribute("class", "mem");
            mem_td.innerHTML = "-"
            mem_tr.appendChild(mem_td);
        }
		
    }
    //initialing document 
    init_document(nbr);
    var cells = document.getElementsByClassName("cell");
    var memoire = document.getElementsByClassName('mem');
    var virtual_mem = new Array(nbr);//for saving the palces that are chosien virtual_mem[coll] = line
    var solutions_count = calc_nbr_solutions();
    nbr_solutions_area.innerHTML = "le nombre des solutions est : " + solutions_count;
    //--------------------

    function set_coin(coll, line) {
        if (isNaN(line)) {
            return false;
        }
        if (coll < 0) {//end solutions
            return (false);
        } else if (coll >= nbr) {//solution founded
            return (true);
        } else {//processing to the solution 0<=coll<nbr
            if (line >= nbr) {//go to priv
                return (set_coin(coll - 1, virtual_mem[coll - 1] + 1));
            } else if (line < 0) {
                //
            } else {
                var safe = true;
                for (let t = 0; t < coll; t++) {
                    if ((virtual_mem[t] == line) || (Math.abs(virtual_mem[t] - line) == Math.abs(t - coll))) {//is the (coll,line) a safe place or not
                        safe = false;
                        break;
                    }
                }
                if (safe) {//save into virtual_mem this place and go to next coll
                    virtual_mem[coll] = line;
                    return (set_coin(coll + 1, 0));
                } else {
                    if (line < nbr - 1) {//move to the next line if possible
                        return (set_coin(coll, line + 1))
                    } else {
                        var priv = find_priv_to_incr(coll - 1);
                        if (priv >= 0) {

                            return (set_coin(priv, virtual_mem[priv] + 1));
                        } else {
                            return (false);
                        }
                    }
                }
            }
        }
    }
    if (set_coin(0, 0)) {
        update_document();
    }
    next_btn.onclick = function () {

        if (set_coin(find_priv_to_incr(nbr - 1), virtual_mem[nbr - 1] + 1)) {
            update_document();
        }
    }
    function update_document() {

        for (let t = 0; t < nbr * nbr; t++) {
            cells[t].innerHTML = " ";
        }
        for (let i = 0; i < nbr; i++) {
            memoire[i].innerHTML = virtual_mem[i];
            cells[nbr * virtual_mem[i] + i].innerHTML = "X";
        }

    }
    function find_priv_to_incr(coll) {
        for (let i = coll; i >= 0; i--) {
            if (virtual_mem[i] < nbr - 1) {
                return (i);
            }
        }
        return (-1);
    }
    function calc_nbr_solutions() {
        var nbr_solutions = 0;
        if (set_coin(0, 0)) {
            nbr_solutions++;
        }
        while (set_coin(find_priv_to_incr(nbr - 1), virtual_mem[nbr - 1] + 1)) {
            nbr_solutions++;
        }
        return nbr_solutions;
    }
}
