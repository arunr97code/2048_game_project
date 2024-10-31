document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('current-score');
    const resultDisplay = document.getElementById('result');
    const newGameButton = document.getElementById('new-game');
    const width = 4;
    let squares = [];
    let score = 0;

    //high score
    let getHighScore = parseInt(localStorage.getItem('2048-highScore')) || 0;
    const highScoreDisplay = document.getElementById('high-score');
    highScoreDisplay.textContent = getHighScore;

    // localStorage.removeItem('2048-highScore');
    // highScoreDisplay.innerHTML = '0'; // Update display if needed

    // console.log(gridDisplay);
    //create the playing board
    function createBoard(){
        for(let i= 0; i < width * width; i++){
            const square = document.createElement('div');
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
            // console.log(squares);
        }
        generate();
        generate();
    }
    //Reset the game 
    function newGame(){
        squares.forEach(square => {
            square.innerHTML = 0;
            square.style.backgroundColor = '#afa192';
            square.style.color = 'transparent';
        });

        score = 0;
        scoreDisplay.innerHTML= score;

        if (score > getHighScore) {
            getHighScore = score;
            highScoreDisplay.innerHTML = getHighScore;
            localStorage.setItem('2048-highScore', getHighScore);
        }

        // Generate new numbers
        generate();
        generate();

        resultDisplay.innerHTML = 'Join the numbers and get to the <span class="fw-bold">2048</span> tile!';
        resultDisplay.style.color = '';
        resultDisplay.style.fontWeight = '';
        resultDisplay.style.fontSize = '';

        document.removeEventListener('keydown', control);
        document.addEventListener('keydown', control);
    }
    createBoard();


    //generate a new number
    function generate(){
        const randomNumber = Math.floor(Math.random() * squares.length);
        // console.log(randomNumber);
        if(squares[randomNumber].innerHTML == 0){
            squares[randomNumber].innerHTML = 2;
            addColors();
            checkForGameOver()
        }else generate()

    }

    function moveRight(){
        for(let i = 0; i < 16; i++){
            if(i % 4 === 0){
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i+1].innerHTML;
                let totalThree = squares[i+2].innerHTML;
                let totalFour = squares[i+3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
                

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(filteredRow);
                // console.log(newRow);
                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
    }

    function moveLeft(){
        for(let i = 0; i < 16; i++){
            if(i % 4 === 0){
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i+1].innerHTML;
                let totalThree = squares[i+2].innerHTML;
                let totalFour = squares[i+3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filteredRow = row.filter(num => num);
                let missing  = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = filteredRow.concat(zeros);

                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
    }

    function moveUp(){
        for(let i = 0; i < 4; i++){
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i+width].innerHTML;
                let totalThree = squares[i+width*2].innerHTML;
                let totalFour = squares[i+width*3].innerHTML;
                let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filteredColumn = column.filter(num => num);
                let missing  = 4 - filteredColumn.length;
                let zeros = Array(missing).fill(0);
                let newColumn = filteredColumn.concat(zeros);

                squares[i].innerHTML = newColumn[0];
                squares[i+width].innerHTML = newColumn[1];
                squares[i+width*2].innerHTML = newColumn[2];
                squares[i+width*3].innerHTML = newColumn[3];
        }
    }

    function moveDown(){
        for(let i = 0; i < 4; i++){
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i+width].innerHTML;
                let totalThree = squares[i+width*2].innerHTML;
                let totalFour = squares[i+width*3].innerHTML;
                let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filteredColumn = column.filter(num => num);
                let missing  = 4 - filteredColumn.length;
                let zeros = Array(missing).fill(0);
                let newColumn = zeros.concat(filteredColumn);

                squares[i].innerHTML = newColumn[0];
                squares[i+width].innerHTML = newColumn[1];
                squares[i+width*2].innerHTML = newColumn[2];
                squares[i+width*3].innerHTML = newColumn[3];
        }
    }

    function combineRow(){
       for(let i = 0; i < 15; i++){
            if(squares[i].innerHTML === squares[i+1].innerHTML && squares[i].innerHTML !== '0'){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i+1].innerHTML = '0';

                let mergingElement = squares[i];
                mergingElement.classList.add('merging');
                //add merging class
                // squares[i].classList.add('merging');
                setTimeout(() =>{
                    mergingElement.classList.remove('merging');
                    
                },300);
                score += combinedTotal;
                    scoreDisplay.innerHTML = score;
                    addColors();
                    if(score > getHighScore){
                        getHighScore = score;
                        highScoreDisplay.innerHTML = getHighScore;
                        localStorage.setItem('2048-highScore', getHighScore);
                    }
                    
            }
       } 
       checkForWin()
    }

    function combineColumn(){
        for(let i = 0; i < 12; i++){
             if(squares[i].innerHTML === squares[i+width].innerHTML && squares[i].innerHTML !== '0'){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i+width].innerHTML = '0';

                let mergingElement = squares[i];
                mergingElement.classList.add('merging');

                //add merging class
                // squares[i].classList.add('merging');
                setTimeout(() => {
                    mergingElement.classList.remove('merging');
                    
                },300);
                    score += combinedTotal;
                    scoreDisplay.innerHTML = score;
                    addColors();
                    if(score > getHighScore){
                        getHighScore = score;
                        highScoreDisplay.innerHTML = getHighScore;
                        localStorage.setItem('2048-highScore', getHighScore);
                    }

             }
        } 
        checkForWin()
     }

     newGameButton.addEventListener('click', newGame);

    // moveRight(); 
    //assign functions to keys
    function control(e){
        if (resultDisplay.innerHTML.includes('WIN') || resultDisplay.innerHTML.includes('LOSE')) {
            return; // Prevent controls when the game is over
        }
        if(e.key === 'ArrowLeft'){
            keyLeft();
        }else if(e.key === 'ArrowRight'){
            keyRight();
        }else if(e.key === 'ArrowUp'){
            keyUp();
        }else if(e.key === 'ArrowDown'){
            keyDown();
        }
    }  
    document.addEventListener('keydown', control) 

    function keyLeft(){
        moveLeft();
        combineRow();
        moveLeft();
        generate();
    }

    function keyRight(){
        moveRight();
        combineRow();
        moveRight();
        generate();
    }

    function keyUp(){
        moveUp();
        combineColumn();
        moveUp();
        generate();
    }

    function keyDown(){
        moveDown();
        combineColumn();
        moveDown();
        generate();
    }

    //check for the number 2048 to win
    function checkForWin(){
        for(let i = 0; i < squares.length; i++){
            if(squares[i].innerHTML === 2048){
                resultDisplay.innerHTML = 'You WIN!';
                resultDisplay.style.color = 'green';
                resultDisplay.style.fontWeight = 'bold';
                resultDisplay.style.fontSize = '30px';
                document.removeEventListener('keydown', control)
                setTimeout(clear, 3000);
            }
        }
    }

    //check if there is no zeros on board to lose
    function checkForGameOver(){
        let zeros = 0;
        for(let i = 0; i < squares.length; i++){
            if(squares[i].innerHTML == 0){
                zeros++;
            }
           
        }
        if(zeros === 0){
            resultDisplay.innerHTML = 'You LOSE!';
            resultDisplay.style.color = 'red';
            resultDisplay.style.fontWeight = 'bold';
            resultDisplay.style.fontSize = '30px';
            document.removeEventListener('keydown', control);

            if(score > getHighScore){
                getHighScore = score;
                highScoreDisplay.innerHTML = getHighScore;
                localStorage.setItem('2048-highScore', getHighScore);
            }
            setTimeout(clear, 3000);
        }
    }

    

    function clear(){
        clearInterval(myTimer);
    }

    // Touch controls for mobile devices
    let startX, startY, endX, endY;

    // Detect touch start
    gridDisplay.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    // Detect touch move
    gridDisplay.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;

        handleTouch(startX, startY, endX, endY);
    });

    function handleTouch(startX, startY, endX, endY) {
        const diffX = endX - startX;
        const diffY = endY - startY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Horizontal swipe
            if (diffX > 0) {
                keyRight();
            } else {
                keyLeft();
            }
        } else {
            // Vertical swipe
            if (diffY > 0) {
                keyDown();
            } else {
                keyUp();
            }
        }
    }
    //add colors
    function addColors(){
        for(let i = 0; i < squares.length; i++){
            if(squares[i].innerHTML == 0){
                squares[i].style.backgroundColor = '#afa192';
                // squares[i].innerHTML ='';
                squares[i].style.color = 'transparent';
                // squares[i].classList.add('tile-0');
            }else if(squares[i].innerHTML == 2){
                squares[i].style.backgroundColor = '#eee4da';
                squares[i].style.color = '#776e65';
            }else if(squares[i].innerHTML == 4){
                squares[i].style.backgroundColor = '#ede0c8';
                squares[i].style.color = '#776e65';
            }else if(squares[i].innerHTML == 8){
                squares[i].style.backgroundColor = '#f2b179';
                squares[i].style.color = '#f9f6f2';
            }else if(squares[i].innerHTML == 16){
                squares[i].style.backgroundColor = '#f59563';
                squares[i].style.color = '#f9f6f2';
            }else if(squares[i].innerHTML == 32){
                squares[i].style.backgroundColor = '#f67c5f';
                squares[i].style.color = '#f9f6f2';
            }else if(squares[i].innerHTML == 64){
                squares[i].style.backgroundColor = '#f65e3b';
                squares[i].style.color = '#f9f6f2';
            }else if(squares[i].innerHTML == 128){
                squares[i].style.backgroundColor = '#edcf72';
                squares[i].style.color = '#f9f6f2';
            }else if(squares[i].innerHTML == 256){
                squares[i].style.backgroundColor = '#edcc61';
                squares[i].style.color = '#f9f6f2';
            }else if(squares[i].innerHTML == 512){
                squares[i].style.backgroundColor = '#edc850';
                squares[i].style.color = '#f9f6f2';
            }else if(squares[i].innerHTML == 1024){
                squares[i].style.backgroundColor = '#edc53f';
                squares[i].style.color = '#f9f6f2';
            }else if(squares[i].innerHTML == 2048){
                squares[i].style.backgroundColor = '#edc22e';
                squares[i].style.color = '#f9f6f2';
            }else if(squares[i].innerHTML > 2048){
                squares[i].style.backgroundColor = '#3c3a32';
                squares[i].style.color = '#f9f6f2';
            }
        }
    }
    addColors();

    let myTimer = setInterval(addColors, 50)
})