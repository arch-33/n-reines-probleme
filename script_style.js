var cells = document.getElementsByClassName("cell");
for (let ii = 0; ii < cells.length; ii++) {
    cells[ii].onmouseover = function () {
        for (let w = 0; w < cells.length; w++) {
            cells[w].removeAttribute("style");
        }
        
        for(let c = 0;c<nbr ;c++){
            cells[nbr*c + (ii%nbr)].setAttribute('style','background: lightgreen');
            cells[Math.floor(ii / nbr) *nbr + (ii + c) % nbr].setAttribute('style', 'background: lightgreen');

            // cells[c * (nbr + 1) + ii].setAttribute('style', 'background: lightgreen');
        }
        line = Math.floor(ii / nbr);
        coll = ii%nbr;
        for (let L = 0; L < nbr; L++) {
            for (let CC = 0; CC < nbr; CC++) {
                if(Math.abs(line - L)==Math.abs(coll - CC)){
                    cells[L * nbr + CC].setAttribute('style', 'background: lightblue');
                }
            }
        }
        cells[ii].setAttribute('style', 'background: coral;color:white;font-family:cursive;font-size:28px');
    }    
}
var tb = document.getElementById("mytable");
tb.onmouseout = function(){
	for (let w = 0; w < cells.length; w++) {
        cells[w].removeAttribute("style");
    }
}