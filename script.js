let currentProblem = 0;
let currentUnit = 1;
let mistakeCount = [];
let currentProblemPage = 0;
const problemsPerPage = 3;

function getCurrentProblem() {
    return unitData[currentUnit - 1].problems[currentProblem];
}

function getCurrentUnit() {
    return unitData[currentUnit - 1];
}
const unitData = [
    {
        id: 1,
        title: "九九のけいさん①",
        problems: [
            {
                type:"problem",
                text:"6×4をもとめましょう。",
                hint:"6のだんをおもいだそう。",
                style:"normal",
                left:6,
                right:4,
                answer:24,
                difficulty:1,
            },

            {
                type:"problem",
                text:"7×8をもとめましょう。",
                hint:"7のだんをおもいだそう。",
                style:"normal",
                left:7,
                right:8,
                answer:56,
                difficulty:1,
            },

            {
                type:"problem",
                text:"8×6をもとめましょう。",
                hint:"8のだんをおもいだそう。",
                style:"normal",
                left:8,
                right:6,
                answer:48,
                difficulty:2,
            },

            {
                type:"problem",
                text:"9×7をもとめましょう。",
                hint:"9のだんをおもいだそう。",
                style:"normal",
                left:9,
                right:7,
                answer:63,
                difficulty:2,
            },

            {
                type:"problem",
                text:"4×9をもとめましょう。",
                hint:"4のだんをおもいだそう。",
                style:"normal",
                left:4,
                right:9,
                answer:36,
                difficulty:2,
            },

            {
                type:"problem",
                text:"8×8をもとめましょう。",
                hint:"8のだんをおもいだそう。",
                style:"normal",
                left:8,
                right:8,
                answer:64,
                difficulty:3,
            },

            {
                type:"problem",
                text:"9×9をもとめましょう。",
                hint:"9のだんをおもいだそう。",
                style:"normal",
                left:9,
                right:9,
                answer:81,
                difficulty:3,
            },
        ]
    },

    {
        id: 2,
        title: "九九のけいさん②",
        problems: [
            {
                type: "problem",
                text: "12×3をかけ算の表をひろげてかんがえてみましょう。",
                hint: "かける数が1ふえると、答えはかけられる数だけふえるよ。3の段のきまりを見つけてみよう。",
                style: "grid-table-multiplication"
            }
        ]
    },

    {
        id: 3,
        title: "かけ算のけいさん①",
        problems: [
            {
                type: "problem",
                text: "11×3をならった九九をつかってもとめましょう。",
                hint: "11を2つにわけて、それぞれ九九を計算してからたし算しよう。",
                style: "split-multiplication",

                optionsTitle: "1. 11を2つにわけてみよう",

                drawA:'<img src="img/11.1.png" class="option-image">',
                drawB:'<img src="img/11.2.png" class="option-image">',
                drawC:'<img src="img/11.3.png" class="option-image">',

                answers:{
                    A:[10,3,30,1,3,3],
                    B:[6,3,18,5,3,15],
                    C:[8,3,24,3,3,9]
                }
            },
            {
                type: "problem",
                text: "12×3をならった九九をつかってもとめましょう。",
                hint: "12を2つにわけて、それぞれ九九を計算してからたし算しよう。",
                style: "split-multiplication",

                optionsTitle: "1. 12を2つにわけてみよう",

                drawA:'<img src="img/12.1.png" class="option-image">',
                drawB:'<img src="img/12.2.png" class="option-image">',
                drawC:'<img src="img/12.3.png" class="option-image">',

                answers:{
                    A:[6,3,18,6,3,18],
                    B:[8,3,24,4,3,12],
                    C:[2,3,6,10,3,30]
                }
            },
            {
                type: "problem",
                text: "13×3をならった九九をつかってもとめましょう。",
                hint: "13を2つにわけて、それぞれ九九を計算してからたし算しよう。",
                style: "split-multiplication",

                optionsTitle: "1. 13を2つにわけてみよう",

                drawA:'<img src="img/13.1.png" class="option-image">',
                drawB:'<img src="img/13.2.png" class="option-image">',
                drawC:'<img src="img/13.3.png" class="option-image">',

                answers:{
                    A:[10,3,30,3,3,9],
                    B:[6,3,18,7,3,21],
                    C:[5,3,15,8,3,24]
                }
            },

            {
                type: "problem",
                text: "14×3をならった九九をつかってもとめましょう。",
                hint: "14を2つにわけて、それぞれ九九を計算してからたし算しよう。",
                style: "split-multiplication",

                optionsTitle: "1. 14を2つにわけてみよう",

                drawA:'<img src="img/14.1.png" class="option-image">',
                drawB:'<img src="img/14.2.png" class="option-image">',
                drawC:'<img src="img/14.3.png" class="option-image">',

                answers:{
                    A:[6,3,18,8,3,24],
                    B:[4,3,12,10,3,30],
                    C:[7,3,21,7,3,21]
                }
            },

            {
                type: "problem",
                text: "15×3をならった九九をつかってもとめましょう。",
                hint: "15を2つにわけて、それぞれ九九を計算してからたし算しよう。",
                style: "split-multiplication",

                optionsTitle: "1. 15を2つにわけてみよう",

                drawA:'<img src="img/15.1.png" class="option-image">',
                drawB:'<img src="img/15.2.png" class="option-image">',
                drawC:'<img src="img/15.3.png" class="option-image">',

                answers:{
                    A:[7,3,21,8,3,24],
                    B:[10,3,30,5,3,15],
                    C:[9,3,27,6,3,18]
                }
            },

            {
                type: "problem",
                text: "16×3をならった九九をつかってもとめましょう。",
                hint: "16を2つにわけて、それぞれ九九を計算してからたし算しよう。",
                style: "split-multiplication",

                optionsTitle: "1. 16を2つにわけてみよう",

                drawA:'<img src="img/16.1.png" class="option-image">',
                drawB:'<img src="img/16.2.png" class="option-image">',
                drawC:'<img src="img/16.3.png" class="option-image">',

                answers:{
                    A:[7,3,21,9,3,27],
                    B:[8,3,24,8,3,24],
                    C:[10,3,30,6,3,18]
                }
            },

            {
                type: "problem",
                text: "17×3をならった九九をつかってもとめましょう。",
                hint: "17を2つにわけて、それぞれ九九を計算してからたし算しよう。",
                style: "split-multiplication",

                optionsTitle: "1. 17を2つにわけてみよう",

                drawA:'<img src="img/17.1.png" class="option-image">',
                drawB:'<img src="img/17.2.png" class="option-image">',
                drawC:'<img src="img/17.3.png" class="option-image">',

                answers:{
                    A:[10,3,30,7,3,21],
                    B:[9,3,27,8,3,24],
                    C:[8,3,24,9,3,27]
                }
            }


        ]
    },

    {
        id: 4,
        title: "かけ算のけいさん②",
        problems: [
            {
                type: "problem",
                text: "チョコレートの数を九九をつかって、くふうしてもとめましょう。",
                hint: "「1つ分の数」×「いくつ分」＝「ぜんぶの数」になるようにしきをたてよう。",
                style: "chocolate-multiplication"
            }
        ]
    }
];



    const initialChocoMap = [
        [0,0,0,1,1,1],
        [0,0,0,1,1,1],
        [1,1,1,1,1,1],
        [1,1,1,1,1,1],
        [1,1,1,1,1,1]
    ];

    let currentChocoMap = [];
    let chocoBorders = [];
    let lockedCells = [];
    let selectedCells = [];
    let chocoHistory = [];
    let dragInfo = null;

    
    let selectedId = "";
    let activeInputId = null;

    let chocoPairsCount = 1;
    let chocoInputsValues = {};

    // スタート画面→メニュー画面
    function showMenu(){
        document.getElementById("cover-screen").style.display = "none";
        document.getElementById("screen-menu").style.display = "block";
        document.getElementById("problem-screen").style.display = "none";
        document.getElementById('screen-problem-select').style.display = "none";
        document.getElementById("screen-result").style.display = "none";
         // 次回問題を開くときは最初から
        currentProblem = 0;
    }
    // メニュー画面→スタート画面
    function goToStart(){
        document.getElementById("cover-screen").style.display = "";
        document.getElementById("screen-menu").style.display = "none";
        document.getElementById("problem-screen").style.display = "none";
        document.getElementById('screen-problem-select').style.display = "none";
    }

    // 問題選択画面へ戻る
    function backToProblemSelect(){
        // 問題画面を閉じる
        document.getElementById("problem-screen").style.display = "none";
        // 問題選択画面を表示
        document.getElementById("screen-problem-select").style.display = "block";
        // 問題一覧を再表示
        createProblemList();
    }

    function renderDifficulty(level){
        let stars = "";
        for(let i = 1; i <= 5; i++){
            if(i <= level){
                stars += "★";
            }else{
                stars += "☆";
            }
        }
        document.getElementById("problem-stars").textContent = stars;
    }

    function updateDisplay() {
        
        window.scrollTo(0, 0);
        const unit = getCurrentUnit();
        const data = getCurrentProblem();
        document.getElementById("unit-name").innerText =unit.title;
        if (data.type === "cover") {
            document.getElementById('cover-screen').style.display = "block";
            document.getElementById('problem-screen').style.display = "none";
            document.getElementById('screen-menu').style.display = "none";
            document.getElementById('screen-problem-select').style.display = "none";
            document.getElementById("display-grade").innerText=data.grade;
            document.getElementById('display-main-title').innerText = data.title;
        } else {
            document.getElementById('cover-screen').style.display = "none";
            document.getElementById('problem-screen').style.display = "block";
            document.getElementById('screen-menu').style.display = "none";
            const problemNo = currentProblem + 1;
            document.getElementById('page-info').innerText = `${currentProblem+1} / ${unit.problems.length}`;
            document.getElementById("problem-title").innerText ="だい" + (currentProblem+1) + "もん";
            renderDifficulty(data.difficulty ?? 1);
            
            document.getElementById("problem-text").innerText = data.text;
            document.getElementById("character-balloon").innerText = data.hint;

            // 問題を開いた直後は非表示
            document.getElementById("character-message").style.display = "none";
            document.getElementById("hint-btn").style.display = "none";

            if (data.style === "chocolate-multiplication") {
                showChocolateProblem(data)
            } else if (data.style === "grid-table-multiplication") {
                showGridTableProblem(data);
            } else if (data.style === "split-multiplication") {
                showSplitProblem(data); 
            } else if(data.style==="normal"){
                showNormalProblem(data);
            }
            selectedId = "";
            resetSelection();

            document.getElementById("result-message").innerText = "";

            // ヒント関係を初期化
            document.getElementById("hint-btn").style.display = "none";
            document.getElementById("character-message").style.display = "none";
            document.getElementById("custom-keypad").style.display = "none";
            activeInputId = null;
        }
        
    }

    function showNormalProblem(data){
           document.getElementById("options-section").style.display="none";
                document.getElementById("formula-instruction").style.display="block";
                document.getElementById("formula-instruction").innerHTML="<strong>こたえをいれよう</strong>";
                document.getElementById("formula-inputs").innerHTML=
                `
                <div class="formula-row">
                <span class="formula-number">${data.left}</span>×
                <span class="formula-number">${data.right}</span>=
                <input class="formula-input"id="vAns"type="text"inputmode="none"onclick="openKeypad('vAns')">
                </div>`;
    }
    function showSplitProblem(data){
        document.getElementById('options-section').style.display = "block";
        document.querySelector('.options-container').style.display = "flex";
        document.getElementById('options-instruction').innerHTML = `<strong>${data.optionsTitle}</strong>`;
        document.getElementById('draw-A').innerHTML = data.drawA;
        document.getElementById('draw-B').innerHTML = data.drawB;
        document.getElementById('draw-C').innerHTML = data.drawC;
                
        const chocoArea = document.getElementById('choco-area');
        if (chocoArea) chocoArea.style.opacity = "none";
        let tableArea = document.getElementById('table-area');
        if (tableArea) tableArea.style.display = "none";
                
        const instructionEl = document.getElementById('formula-instruction');
        instructionEl.style.display = "block";
        instructionEl.innerHTML = "<strong>2. それぞれにかける数をかけて足そう</strong>";

        let html = `
        <div class="formula-row">
            <input class="formula-input" type="text" id="v0" inputmode="none" onclick="openKeypad('v0')"> × 
            <input class="formula-input" type="text" id="v1" inputmode="none" onclick="openKeypad('v1')"> = 
            <input class="formula-input" type="text" id="v2" inputmode="none" onclick="openKeypad('v2')">
        </div>
        <div class="formula-row">
            <input class="formula-input" type="text" id="v3" inputmode="none" onclick="openKeypad('v3')"> × 
            <input class="formula-input" type="text" id="v4" inputmode="none" onclick="openKeypad('v4')"> = 
            <input class="formula-input" type="text" id="v5" inputmode="none" onclick="openKeypad('v5')">
        </div>
        <div>
            <input class="formula-input" type="text" id="v6" inputmode="none" onclick="openKeypad('v6')"> + 
            <input class="formula-input" type="text" id="v7" inputmode="none" onclick="openKeypad('v7')"> = 
            <input class="formula-input" type="text" id="vAns" inputmode="none" onclick="openKeypad('vAns')">
        </div>`;
        document.getElementById('formula-inputs').innerHTML = html;
            
    }
    function showGridTableProblem(data){
        document.getElementById('options-section').style.display = "block";
        document.getElementById('options-instruction').innerHTML = "<strong>1. かけ算の表をかんせいさせよう</strong>";
        document.querySelector('.options-container').style.display = "none";

        let chocoArea = document.getElementById('choco-area');
        if (chocoArea) chocoArea.style.display = "none";

        let tableArea = document.getElementById('table-area');
        if (!tableArea) {
            tableArea = document.createElement('div');
            tableArea.id = 'table-area';
            tableArea.className = 'grid-table-container';
            document.getElementById('options-section').appendChild(tableArea);
        } else {
            tableArea.style.display = "block";
        }
        renderGridTable();

        const instructionEl = document.getElementById('formula-instruction');
        instructionEl.style.display = "none";
        document.getElementById('formula-inputs').innerHTML = "";
    }
    function showChocolateProblem(data){
        document.getElementById('options-section').style.display = "block";
        document.getElementById('options-instruction').innerHTML = "<strong>1. チョコレートをかこったり、ならべかえたりしよう</strong>";
        document.querySelector('.options-container').style.display = "none";
            
        let chocoArea = document.getElementById('choco-area');
        if (!chocoArea) {
            chocoArea = document.createElement('div');
            chocoArea.id = 'choco-area';
            chocoArea.innerHTML = `
                <div style="margin-bottom: 10px; display: flex; flex-wrap: wrap; gap: 5px; justify-content: center;">
                    <button type="button" class="btn" onclick="applyFrame()" style="background: #3399ff; color: white;">かこむ</button>
                    <button type="button" class="btn" onclick="undoChoco()" style="background: #ff6b6b; color: white;">1つもどす</button>
                    <button type="button" class="btn" onclick="resetChocolatePosition()" style="background: #94d82d; color: white;">リセット</button>
                </div>
                <div id="choco-grid-container" class="choco-grid"></div>
            `;
            document.getElementById('options-section').appendChild(chocoArea);
        } else {
            chocoArea.style.display = "block";
        }
                
        let tableArea = document.getElementById('table-area');
        if (tableArea) tableArea.style.display = "none";
                
        // チョコレート問題を開いたら毎回初期化する
        initChocolate();
        chocoPairsCount = 1;
        chocoInputsValues = {};

        renderChocoFormulaInputs();
    }

    function renderGridTable() {
        const container = document.getElementById('table-area');
        if (!container) return;

        let html = '<div class="grid-table">';
        html += '<div class="grid-cell grid-header">×</div>';
        for (let c = 1; c <= 12; c++) {
            html += `<div class="grid-cell grid-header">${c}</div>`;
        }

        for (let r = 1; r <= 12; r++) {
            html += `<div class="grid-cell grid-header">${r}</div>`;
            for (let c = 1; c <= 12; c++) {
                if (r === 3 && (c === 10 || c === 11 || c === 12)) {
                    html += `<div class="grid-cell"><input type="text" id="t_${r}_${c}" inputmode="none" onclick="openKeypad('t_${r}_${c}', true)"></div>`;
                } else {
                    let val = "";
                    if (r <= 9 && c <= 9) {
                        val = r * c;
                    } else if (r === 3 && c < 10) {
                        val = r * c;
                    }
                    html += `<div class="grid-cell">${val}</div>`;
                }
            }
        }
        html += '</div>';
        container.innerHTML = html;
    }

    function saveAllChocoInputs() {
        for (let i = 0; i < chocoPairsCount; i++) {
            let el0 = document.getElementById(`c_${i}_0`);
            let el1 = document.getElementById(`c_${i}_1`);
            if (el0) chocoInputsValues[`c_${i}_0`] = el0.value;
            if (el1) chocoInputsValues[`c_${i}_1`] = el1.value;
        }
        let elAns = document.getElementById('vAns');
        if (elAns) chocoInputsValues['vAns'] = elAns.value;
    }

    function renderChocoFormulaInputs() {
        const instructionEl = document.getElementById('formula-instruction');
        instructionEl.style.display = "flex";
        instructionEl.style.alignItems = "center";
        instructionEl.style.justifyContent = "center";
        instructionEl.style.gap = "10px";
        instructionEl.innerHTML = `
            <strong style="margin: 0;">2. 当てはまる 数を かこう</strong>
            <button type="button" class="btn" onclick="addChocoPair()" style="background: #f1f3f5; color: #495057; border: 1px solid #ced4da; padding: 4px 10px; font-size: 0.9rem;">ついか</button>
            <button type="button" class="btn" onclick="removeChocoPair()" style="background: #f1f3f5; color: #495057; border: 1px solid #ced4da; padding: 4px 10px; font-size: 0.9rem;">もどす</button>
        `;

        let html = '<div style="margin-bottom: 10px; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 5px;">';
        for (let i = 0; i < chocoPairsCount; i++) {
            let val0 = chocoInputsValues[`c_${i}_0`] || "";
            let val1 = chocoInputsValues[`c_${i}_1`] || "";
            
            if (i > 0) {
                html += `<span style="font-size: 24px; margin: 0 3px;">+</span>`;
            }
            html += `<input type="text" id="c_${i}_0" value="${val0}" inputmode="none" onclick="openKeypad('c_${i}_0')"> × `;
            html += `<input type="text" id="c_${i}_1" value="${val1}" inputmode="none" onclick="openKeypad('c_${i}_1')">`;
        }
        
        let ansVal = chocoInputsValues['vAns'] || "";
        html += `<span style="font-size: 24px; margin: 0 5px;">=</span><input type="text" id="vAns" value="${ansVal}" inputmode="none" onclick="openKeypad('vAns')">`;
        html += '</div>';
        
        document.getElementById('formula-inputs').innerHTML = html;
    }

    function addChocoPair() {
        saveAllChocoInputs();
        chocoPairsCount++;
        document.getElementById('custom-keypad').style.display = "none";
        activeInputId = null;
        renderChocoFormulaInputs();
    }

    function removeChocoPair() {
        saveAllChocoInputs();
        if (chocoPairsCount > 1) {
            delete chocoInputsValues[`c_${chocoPairsCount-1}_0`];
            delete chocoInputsValues[`c_${chocoPairsCount-1}_1`];
            chocoPairsCount--;
        }
        document.getElementById('custom-keypad').style.display = "none";
        activeInputId = null;
        renderChocoFormulaInputs();
    }

    function initChocolate() {
        currentChocoMap = JSON.parse(JSON.stringify(initialChocoMap));
        chocoBorders = Array(5).fill().map(() => Array(6).fill().map(() => ({ top: false, right: false, bottom: false, left: false })));
        lockedCells = Array(5).fill().map(() => Array(6).fill(false));
        selectedCells = Array(5).fill().map(() => Array(6).fill(false));
        chocoHistory = [];
        dragInfo = null;
        renderChocolate();
    }

    function resetChocolatePosition() {
        saveChocoHistory();
        currentChocoMap = JSON.parse(JSON.stringify(initialChocoMap));
        chocoBorders = Array(5).fill().map(() => Array(6).fill().map(() => ({ top: false, right: false, bottom: false, left: false })));
        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 6; c++) {
                lockedCells[r][c] = false;
                selectedCells[r][c] = false;
            }
        }
        renderChocolate();
    }

    function saveChocoHistory() {
        chocoHistory.push({
            map: JSON.parse(JSON.stringify(currentChocoMap)),
            borders: JSON.parse(JSON.stringify(chocoBorders)),
            locked: JSON.parse(JSON.stringify(lockedCells))
        });
    } 


    function undoChoco() {
        if (chocoHistory.length === 0) return;
        const previous = chocoHistory.pop();
        currentChocoMap = JSON.parse(JSON.stringify(previous.map));
        chocoBorders = JSON.parse(JSON.stringify(previous.borders));
        lockedCells = JSON.parse(JSON.stringify(previous.locked));
        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 6; c++) {
                selectedCells[r][c] = false;
            }
        }
        renderChocolate();
    }

    function renderChocolate() {
        const container = document.getElementById('choco-grid-container');
        if (!container) return;
        container.innerHTML = '';
        
        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 6; c++) {
                const cell = document.createElement('div');
                
                if (currentChocoMap[r][c] === 1) {
                    cell.className = 'choco-cell';
                    const dot = document.createElement('div');
                    dot.className = 'choco-dot' + (lockedCells[r][c] ? ' locked' : '');
                    dot.addEventListener('pointerdown', (e) => startDrag(e, r, c, dot));
                    cell.appendChild(dot);
                } else {
                    cell.className = 'choco-cell empty-cell';
                }
                
                if (lockedCells[r][c]) {
                    cell.style.backgroundColor = '#ffe5e5';
                } else if (selectedCells[r][c]) {
                    cell.style.backgroundColor = '#fff3bf';
                }
                
                cell.addEventListener('click', (e) => {
                    if (e.target.classList.contains('choco-dot')) return;
                    handleChocoCellClick(r, c);
                });
                container.appendChild(cell);
            }
        }

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("style", "position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:1000;");
        svg.setAttribute("viewBox", "0 0 600 500");
        
        let greyPathData = "";
        greyPathData += " M 5 5 L 595 5 L 595 495 L 5 495 Z";
        for (let c = 1; c < 6; c++) {
            greyPathData += ` M ${c * 100} 5 L ${c * 100} 495`;
        }
        for (let r = 1; r < 5; r++) {
            greyPathData += ` M 5 ${r * 100} L 595 ${r * 100}`;
        }
        
        const greyPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        greyPath.setAttribute("d", greyPathData);
        greyPath.setAttribute("stroke", "#ddd");
        greyPath.setAttribute("stroke-width", "6");
        greyPath.setAttribute("fill", "none");
        svg.appendChild(greyPath);
        
        let pathData = "";
        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 6; c++) {
                const border = chocoBorders[r][c];
                const x1 = c * 100;
                const y1 = r * 100;
                const x2 = x1 + 100;
                const y2 = y1 + 100;
                
                let rx1 = (c === 0) ? 5 : x1;
                let ry1 = (r === 0) ? 5 : y1;
                let rx2 = (c === 5) ? 595 : x2;
                let ry2 = (r === 4) ? 495 : y2;
                
                if (border.top) pathData += ` M ${rx1} ${ry1} L ${rx2} ${ry1}`;
                if (border.right) pathData += ` M ${rx2} ${ry1} L ${rx2} ${ry2}`;
                if (border.bottom) pathData += ` M ${rx1} ${ry2} L ${rx2} ${ry2}`;
                if (border.left) pathData += ` M ${rx1} ${ry1} L ${rx1} ${ry2}`;
            }
        }
        
        if (pathData) {
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", pathData);
            path.setAttribute("stroke", "#ff0000");
            path.setAttribute("stroke-width", "10");
            path.setAttribute("stroke-linecap", "round");
            path.setAttribute("stroke-linejoin", "round");
            path.setAttribute("fill", "none");
            svg.appendChild(path);
        }
        container.appendChild(svg);
    }

    function startDrag(e, r, c, dotEl) {
        if (lockedCells[r][c]) return;
        e.preventDefault();

        let dragTargets = [];
        if (selectedCells[r][c]) {
            for (let row = 0; row < 5; row++) {
                for (let col = 0; col < 6; col++) {
                    if (selectedCells[row][col]) {
                        dragTargets.push({ r: row, c: col });
                    }
                }
            }
        } else {
            dragTargets.push({ r: r, c: c });
        }

        const gridEl = document.getElementById('choco-grid-container');
        const gridRect = gridEl.getBoundingClientRect();
        const cellWidth = gridRect.width / 6;
        const cellHeight = gridRect.height / 5;

        const rect = dotEl.getBoundingClientRect();
        
        const groupEl = document.createElement('div');
        groupEl.style.position = 'fixed';
        groupEl.style.left = '0';
        groupEl.style.top = '0';
        groupEl.style.width = '100vw';
        groupEl.style.height = '100vh';
        groupEl.style.zIndex = '10001';
        groupEl.style.pointerEvents = 'none';
        
        let targetElements = [];
        dragTargets.forEach(target => {
            const currentCellEl = gridEl.children[target.r * 6 + target.c];
            const currentDotEl = currentCellEl.querySelector('.choco-dot');
            if (currentDotEl) {
                const dRect = currentDotEl.getBoundingClientRect();
                const dragEl = document.createElement('div');
                dragEl.className = 'choco-dot';
                dragEl.style.position = 'fixed';
                dragEl.style.width = dRect.width + 'px';
                dragEl.style.height = dRect.height + 'px';
                dragEl.style.left = dRect.left + 'px';
                dragEl.style.top = dRect.top + 'px';
                dragEl.style.cursor = 'grabbing';
                groupEl.appendChild(dragEl);
                
                currentDotEl.style.opacity = '0';
                targetElements.push({ r: target.r, c: target.c, dragEl: dragEl, sourceDot: currentDotEl, initLeft: dRect.left, initTop: dRect.top });
            }
        });

        document.body.appendChild(groupEl);

        dragInfo = {
            pointerId: e.pointerId,
            baseRow: r,
            baseCol: c,
            groupElement: groupEl,
            targets: targetElements,
            startX: e.clientX,
            startY: e.clientY,
            moved: false
        };
        
        const moveHandler = (evt) => {
            if (!dragInfo || evt.pointerId !== dragInfo.pointerId) return;
            const deltaX = evt.clientX - dragInfo.startX;
            const deltaY = evt.clientY - dragInfo.startY;
            
            if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
                dragInfo.moved = true;
            }

            dragInfo.targets.forEach(t => {
                t.dragEl.style.left = (t.initLeft + deltaX) + 'px';
                t.dragEl.style.top = (t.initTop + deltaY) + 'px';
            });
        };

        const upHandler = (evt) => {
            if (!dragInfo || evt.pointerId !== dragInfo.pointerId) return;
            
            window.removeEventListener('pointermove', moveHandler);
            window.removeEventListener('pointerup', upHandler);
            window.removeEventListener('pointercancel', upHandler);
            
            if (evt.type === 'pointercancel') {
                dragInfo.groupElement.remove();
                dragInfo = null;
                renderChocolate();
                return;
            }
            
            if (!dragInfo.moved) {
                handleChocoCellClick(dragInfo.baseRow, dragInfo.baseCol);
            } else {
                const deltaX = evt.clientX - dragInfo.startX;
                const deltaY = evt.clientY - dragInfo.startY;

                const rowShift = Math.round(deltaY / cellHeight);
                const colShift = Math.round(deltaX / cellWidth);

                let canMove = true;
                if (rowShift === 0 && colShift === 0) {
                    canMove = false;
                }

                if (canMove) {
                    dragInfo.targets.forEach(t => {
                        const nr = t.r + rowShift;
                        const nc = t.c + colShift;
                        if (nr < 0 || nr >= 5 || nc < 0 || nc >= 6) {
                            canMove = false;
                        } else if (lockedCells[nr][nc]) {
                            canMove = false;
                        }
                    });
                }

                if (canMove) {
                    const targetSet = new Set(dragInfo.targets.map(t => `${t.r},${t.c}`));
                    dragInfo.targets.forEach(t => {
                        const nr = t.r + rowShift;
                        const nc = t.c + colShift;
                        if (!targetSet.has(`${nr},${nc}`) && currentChocoMap[nr][nc] === 1) {
                            canMove = false;
                        }
                    });
                }

                if (canMove) {
                    saveChocoHistory();

                    let nextMap = JSON.parse(JSON.stringify(currentChocoMap));
                    let nextBorders = JSON.parse(JSON.stringify(chocoBorders));
                    let nextLocked = JSON.parse(JSON.stringify(lockedCells));
                    let nextSelected = Array(5).fill().map(() => Array(6).fill(false));

                    dragInfo.targets.forEach(t => {
                        nextMap[t.r][t.c] = 0;
                        nextBorders[t.r][t.c] = { top: false, right: false, bottom: false, left: false };
                        nextLocked[t.r][t.c] = false;
                    });

                    dragInfo.targets.forEach(t => {
                        const nr = t.r + rowShift;
                        const nc = t.c + colShift;
                        nextMap[nr][nc] = currentChocoMap[t.r][t.c];
                        nextBorders[nr][nc] = chocoBorders[t.r][t.c];
                        nextLocked[nr][nc] = lockedCells[t.r][t.c];
                    });

                    currentChocoMap = nextMap;
                    chocoBorders = nextBorders;
                    lockedCells = nextLocked;
                    selectedCells = nextSelected;
                }
            }
            
            dragInfo.groupElement.remove();
            dragInfo = null;
            renderChocolate();
        };

        window.addEventListener('pointermove', moveHandler);
        window.addEventListener('pointerup', upHandler);
        window.addEventListener('pointercancel', upHandler);
    }

    function handleChocoCellClick(r, c) {
        if (lockedCells[r][c] || currentChocoMap[r][c] !== 1) return;
        selectedCells[r][c] = !selectedCells[r][c];
        renderChocolate();
    }

    function applyFrame() {
        let hasSelection = false;
        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 6; c++) {
                if (selectedCells[r][c]) {
                    hasSelection = true;
                    break;
                }
            }
            if (hasSelection) break;
        }
        if (!hasSelection) return;

        saveChocoHistory();

        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 6; c++) {
                if (selectedCells[r][c]) {
                    if (r === 0 || !selectedCells[r-1][c]) chocoBorders[r][c].top = true;
                    if (r === 4 || !selectedCells[r+1][c]) chocoBorders[r][c].bottom = true;
                    if (c === 0 || !selectedCells[r][c-1]) chocoBorders[r][c].left = true;
                    if (c === 5 || !selectedCells[r][c+1]) chocoBorders[r][c].right = true;
                    
                    lockedCells[r][c] = true;
                }
            }
        }

        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 6; c++) {
                selectedCells[r][c] = false;
            }
        }
        renderChocolate();
    }

   function moveQuestion(step) {
    const unit = getCurrentUnit();

    let next = currentProblem + step;

    if (next >= 0 && next < unit.problems.length) {
        currentProblem = next;
        updateDisplay();
    }
}

    function selectOption(id) {
        selectedId = id; resetSelection();
        document.getElementById('opt-' + id).classList.add('selected');
    }

    function resetSelection() {
        ['A', 'B', 'C'].forEach(id => {
            const el = document.getElementById('opt-' + id);
            if (el) el.classList.remove('selected');
        });
    }

    function toggleHint() {
        const h = document.getElementById('hint-display');
        h.style.display = (h.style.display === "none") ? "block" : "none";
    }

    function openKeypad(id, isGridTable = false) {
        activeInputId = id;
        document.getElementById('custom-keypad').style.display = "block";
        document.getElementById(id).focus();
        
        // isGridTable(表内入力)の時だけ自動スクロール(scrollTo)を実行しない
        if (!isGridTable) {
            setTimeout(() => {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });
            }, 50);
        }
    }

    function pressKey(key) {
        if (!activeInputId) return;
        const inputEl = document.getElementById(activeInputId);
        let pos = inputEl.selectionStart;
        let value = inputEl.value;

        if (key === 'backspace') {
            if (pos > 0) {
                inputEl.value = value.slice(0, pos - 1) + value.slice(pos);
                inputEl.setSelectionRange(pos - 1, pos - 1);
            }
        } else if (key === 'left') {
            if (pos > 0) inputEl.setSelectionRange(pos - 1, pos - 1);
        } else if (key === 'right') {
            if (pos < value.length) inputEl.setSelectionRange(pos + 1, pos + 1);
        } else if (key === 'enter') {
            document.getElementById('custom-keypad').style.display = "none";
            inputEl.blur();
            activeInputId = null;
        } else {
            inputEl.value = value.slice(0, pos) + key + value.slice(pos);
            inputEl.setSelectionRange(pos + 1, pos + 1);
        }
        
        const data = getCurrentProblem();
        if (data.style === "chocolate-multiplication") {
            saveAllChocoInputs();
        }
        
        if (inputEl) inputEl.focus();
    }

    function checkAnswer() {
        const data = getCurrentProblem();
        const q = data;
        const res = document.getElementById('result-message');
        
        if (q.style === "split-multiplication" && !selectedId) { 
            res.innerText = "図をえらんでね！"; res.style.color = "orange"; 
            return; 
        }
        if(data.style === "normal"){
            if(checkNormalAnswer(data)){
                res.innerText = "せいかい！！";
                res.style.color = "red";
                
                setTimeout(function(){
                    if(currentProblem < getCurrentUnit().problems.length - 1){
                        currentProblem++;
                        updateDisplay();
                    }else{
                        showResultScreen();
                    }

                }, 2000);

           }else{
                mistakeCount[currentProblem]++;
                res.innerText = "ちがうよ！";
                res.style.color = "blue";

                // 間違えたときはヒントボタンだけ表示
                document.getElementById("hint-btn").style.display = "inline-block";

                // キャラクターとヒント文はまだ表示しない
                document.getElementById("character-message").style.display = "none";
            }
        return;
        }
        let isValueCorrect = true;
        let isAlmostCorrect = false;

        if(data.style==="split-multiplication"){
            const result = checkSplitAnswer(data);
            isValueCorrect = result.correct;
            isAlmostCorrect = result.almost;
        } else if(data.style==="grid-table-multiplication"){
            isValueCorrect = checkGridTableAnswer(data);
        } else if(data.style==="chocolate-multiplication"){
            isValueCorrect = checkChocolateAnswer(data);
        }

        if (isValueCorrect) {
            res.innerText = "せいかい！";
            res.style.color = "red";
            setTimeout(function(){
                if(currentProblem < getCurrentUnit().problems.length - 1){
                    currentProblem++;
                    updateDisplay();
                }else{
                    showResultScreen();
                }

        },2000);

        } else if (isAlmostCorrect) {
            res.innerText = "おしい！";
            res.style.color = "orange";
        } else {
            mistakeCount[currentProblem]++;
            res.innerText = "ちがうよ！"; res.style.color = "blue";
        }
    
    }
function checkNormalAnswer(data){
    const value = document.getElementById("vAns").value;
    return Number(value) === data.answer;
}

function checkSplitAnswer(data){
    let expected = data.answers[selectedId];
    const v0 = document.getElementById('v0').value.trim();
    const v1 = document.getElementById('v1').value.trim();
    const v2 = document.getElementById('v2').value.trim();
    const v3 = document.getElementById('v3').value.trim();
    const v4 = document.getElementById('v4').value.trim();
    const v5 = document.getElementById('v5').value.trim();
    const v6 = document.getElementById('v6').value.trim();
    const v7 = document.getElementById('v7').value.trim();
    const vAns = document.getElementById('vAns').value.trim();

    let pair1 = [expected[0].toString(), expected[1].toString(), expected[2].toString()];
    let pair2 = [expected[3].toString(), expected[4].toString(), expected[5].toString()];
    let p1r = [pair1[1], pair1[0], pair1[2]];
    let p2r = [pair2[1], pair2[0], pair2[2]];

    const f1_p1 = (v0 === pair1[0] && v1 === pair1[1] && v2 === pair1[2]);
    const f1_p1r = (v0 === p1r[0] && v1 === p1r[1] && v2 === p1r[2]);
    const f1_p2 = (v0 === pair2[0] && v1 === pair2[1] && v2 === pair2[2]);
    const f1_p2r = (v0 === p2r[0] && v1 === p2r[1] && v2 === p2r[2]);

    const f2_p1 = (v3 === pair1[0] && v4 === pair1[1] && v5 === pair1[2]);
    const f2_p1r = (v3 === p1r[0] && v4 === p1r[1] && v5 === p1r[2]);
    const f2_p2 = (v3 === pair2[0] && v4 === pair2[1] && v5 === pair2[2]);
    const f2_p2r = (v3 === p2r[0] && v4 === p2r[1] && v5 === p2r[2]);

    let multCorrect = (f1_p1 && f2_p2) || (f1_p2 && f2_p1);
    let multAlmost = ((f1_p1 || f1_p1r) && (f2_p2 || f2_p2r)) || ((f1_p2 || f1_p2r) && (f2_p1 || f2_p1r));
    let addCorrect = (((v6 === v2 && v7 === v5) || (v6 === v5 && v7 === v2)) && vAns === "36");

    
    if (multCorrect && addCorrect){
        return {
            correct: true,
            almost: false
        };
    }

    if (multAlmost && addCorrect){
        return {
            correct: false,
            almost: true
        };
    }


    return {
        correct: false,
        almost: false
    };
}

function checkGridTableAnswer(data){

    const ans10 = document.getElementById("t_3_10").value.trim();
    const ans11 = document.getElementById("t_3_11").value.trim();
    const ans12 = document.getElementById("t_3_12").value.trim();

    return (
        ans10 === "30" &&
        ans11 === "33" &&
        ans12 === "36"
    );
}

function checkChocolateAnswer(data){


            let isCleanLayout = true;
            for (let r = 0; r < 5; r++) {
                for (let c = 0; c < 6; c++) {
                    if (r === 0) {
                        if (currentChocoMap[r][c] !== 0) isCleanLayout = false;
                    } else {
                        if (currentChocoMap[r][c] !== 1) isCleanLayout = false;
                    }
                }
            }

            let userPairs = [];
            let isAllInputsFilled = true;
            for (let i = 0; i < chocoPairsCount; i++) {
                let el0 = document.getElementById(`c_${i}_0`);
                let el1 = document.getElementById(`c_${i}_1`);
                let v0 = el0 ? el0.value.trim() : "";
                let v1 = el1 ? el1.value.trim() : "";
                if (v0 === "" || v1 === "") {
                    isAllInputsFilled = false;
                    continue;
                }
                let val0 = parseInt(v0, 10);
                let val1 = parseInt(v1, 10);
                userPairs.push([val0, val1]);
            }
            let elAns = document.getElementById('vAns');
            let vAns = elAns ? elAns.value.trim() : "";
            let nAns = parseInt(vAns, 10);

            if (isCleanLayout) {
                if (chocoPairsCount === 1 && isAllInputsFilled && nAns === 24) {
                    let p = userPairs[0];
                    if ((p[0] === 4 && p[1] === 6) || (p[0] === 6 && p[1] === 4)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                let visited = Array(5).fill().map(() => Array(6).fill(false));
                let groups = {}; 
                let totalLockedChoco = 0;
                let totalChocoInMap = 0;

                for (let r = 0; r < 5; r++) {
                    for (let c = 0; c < 6; c++) {
                        if (currentChocoMap[r][c] === 1) {
                            totalChocoInMap++;
                            if (lockedCells[r][c]) {
                                totalLockedChoco++;
                            }
                        }
                    }
                }

                for (let r = 0; r < 5; r++) {
                    for (let c = 0; c < 6; c++) {
                        if (currentChocoMap[r][c] === 1 && lockedCells[r][c] && !visited[r][c]) {
                            let size = 0;
                            let queue = [[r, c]];
                            visited[r][c] = true;

                            while (queue.length > 0) {
                                let [cr, cc] = queue.shift();
                                size++;

                                if (cr > 0 && !chocoBorders[cr][cc].top && lockedCells[cr-1][cc] && currentChocoMap[cr-1][cc] === 1 && !visited[cr-1][cc]) {
                                    visited[cr-1][cc] = true; queue.push([cr-1, cc]);
                                }
                                if (cr < 4 && !chocoBorders[cr][cc].bottom && lockedCells[cr+1][cc] && currentChocoMap[cr+1][cc] === 1 && !visited[cr+1][cc]) {
                                    visited[cr+1][cc] = true; queue.push([cr+1, cc]);
                                }
                                if (cc > 0 && !chocoBorders[cr][cc].left && lockedCells[cr][cc-1] && currentChocoMap[cr][cc-1] === 1 && !visited[cr][cc-1]) {
                                    visited[cr][cc-1] = true; queue.push([cr, cc-1]);
                                }
                                if (cc < 5 && !chocoBorders[cr][cc].right && lockedCells[cr][cc+1] && currentChocoMap[cr][cc+1] === 1 && !visited[cr][cc+1]) {
                                    visited[cr][cc+1] = true; queue.push([cr, cc+1]);
                                }
                            }
                            if (size > 0) {
                                groups[size] = (groups[size] || 0) + 1;
                            }
                        }
                    }
                }

                if (totalLockedChoco !== totalChocoInMap || totalLockedChoco === 0 || !isAllInputsFilled || userPairs.length === 0 || nAns !== totalChocoInMap) {
                    return false;
                } else {
                    let expectedPairs = [];
                    for (let sz in groups) {
                        expectedPairs.push([parseInt(sz, 10), groups[sz]]);
                    }

                    if (userPairs.length !== expectedPairs.length) {
                        return false;
                    } else {
                        let tempExpected = JSON.parse(JSON.stringify(expectedPairs));
                        let allMatch = true;
                        for (let upair of userPairs) {
                            let idx = tempExpected.findIndex(epair => epair[0] === upair[0] && epair[1] === upair[1]);
                            if (idx !== -1) {
                                tempExpected.splice(idx, 1);
                            } else {
                                allMatch = false;
                                break;
                            }
                        }
                        return allMatch;
                    }
                }
            }
        

}

    document.addEventListener('pointerup', function(e) {
        const keypad = document.getElementById('custom-keypad');
        if (keypad.style.display === "block" && !e.target.closest('input') && !e.target.closest('#custom-keypad')) {
            keypad.style.display = "none";
            if (activeInputId) document.getElementById(activeInputId).blur();
            activeInputId = null;
        }
    });
  // 単元を開く
function openUnit(number){

    // 現在の単元番号を保存
    currentUnit = number;
    currentProblemPage = 0;
    mistakeCount = new Array(getCurrentUnit().problems.length).fill(0);

    // メニュー画面を非表示
    document.getElementById("screen-menu").style.display = "none";

    // 問題画面はまだ表示しない
    document.getElementById("problem-screen").style.display = "none";

    // 問題選択画面を表示
    document.getElementById("screen-problem-select").style.display = "block";

    // 単元名を表示
    document.getElementById("unit-title").innerText =
        unitData[number - 1].title;

    // 問題一覧を作成
    createProblemList();

}

// 問題一覧を表示する
function createProblemList() {

    const list = document.getElementById("problem-list");
    const unit = getCurrentUnit();
    const problems = unit.problems;

    list.innerHTML = "";

    const startIndex = currentProblemPage * problemsPerPage;
    const endIndex = Math.min(
        startIndex + problemsPerPage,
        problems.length
    );

    for (let i = startIndex; i < endIndex; i++) {

        const button = document.createElement("button");

        button.className = "problem-button";
        button.innerText = "もんだい " + (i + 1);

        button.onclick = function () {
            openProblem(i);
        };

        list.appendChild(button);
    }

    updateProblemPageButtons();
}
function changeProblemPage(step) {

    const problems = getCurrentUnit().problems;
    const totalPages = Math.ceil(problems.length / problemsPerPage);
    const nextPage = currentProblemPage + step;

    if (nextPage < 0 || nextPage >= totalPages) {
        return;
    }

    currentProblemPage = nextPage;
    createProblemList();
}
function updateProblemPageButtons() {

    const problems = getCurrentUnit().problems;
    const totalPages = Math.ceil(problems.length / problemsPerPage);

    const prevButton = document.getElementById("problem-page-prev");
    const nextButton = document.getElementById("problem-page-next");
    const pageInfo = document.getElementById("problem-page-info");

    prevButton.disabled = currentProblemPage === 0;
    nextButton.disabled = currentProblemPage >= totalPages - 1;

    pageInfo.innerText =
        `${currentProblemPage + 1} / ${totalPages}`;
}
// 問題を開く
function openProblem(index){

    document.getElementById("screen-problem-select").style.display="none";
    document.getElementById("problem-screen").style.display="block";

    currentProblem = index;

    updateDisplay();
}

// 「つかいかた」ボタン
function showHelp(){

    alert("使い方説明は現在作成中です。");

}

function showResultScreen(){

    document.getElementById("problem-screen").style.display = "none";
    document.getElementById("screen-result").style.display = "block";

    const resultArea = document.getElementById("result-area");
    let score = 0;

    for(let i = 0; i < mistakeCount.length; i++){
        if(mistakeCount[i] === 0){
            score += 2;
        }
        else if(mistakeCount[i] <= 2){
            score += 1;
        }
    }
    const maxScore = mistakeCount.length * 2;
    let star = 1;
    if(score >= maxScore){
        star = 5;
    }
    else if(score >= maxScore * 0.8){
        star = 4;
    }
    else if(score >= maxScore * 0.6){
        star = 3;
    }   
    else if(score >= maxScore * 0.4){
        star = 2;
    }
    let stars = "";

    for(let i = 1; i <= 5; i++){

        if(i <= star){
            stars += "★";
        }
        else{
            stars += "☆";
        }

    }
    let message = "";
    switch(star){
        case 5:
            message = "🌸 とてもよくできました！";
            break;
        case 4:
            message = "😊 よくできました！";
            break;
        case 3:
            message = "😀 がんばりました！";
            break;
        case 2:
            message = "🙂 もうすこし！";
            break;
        default:
            message = "💪 またチャレンジしよう！";
    }

    document.getElementById("total-result").innerHTML =
    `
    <h3>${message}</h3>
    <div class="total-stars">${stars}</div>
    `;


    let html = "";

    for(let i = 0; i < mistakeCount.length; i++){
        let mark = "";
        let comment = "";
        if(mistakeCount[i] === 0){
            mark = "◎";
            comment = "いっぱつでできた！";
        }
        else if(mistakeCount[i] <= 2){
            mark = "○";
            comment = mistakeCount[i] + "かいまちがえた";
        }
        else{
            mark = "△";
            comment = mistakeCount[i] + "かいまちがえた";
        }
        html += `
        <div class="result-row">
        <span class="result-problem">
        だい${i+1}もん
        </span>
        
        <span class="result-mark">
            ${mark}
        </span>

        <span class="result-comment">
            ${comment}
        </span>
    </div>
    `;
    }

    resultArea.innerHTML = html;

}
function retryUnit(){

    currentProblem = 0;

    mistakeCount = new Array(getCurrentUnit().problems.length).fill(0);

    document.getElementById("screen-result").style.display = "none";
    document.getElementById("problem-screen").style.display = "block";

    updateDisplay();

}
