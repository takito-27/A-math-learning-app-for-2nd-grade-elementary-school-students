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
        title: "九九の計算①",
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
        title: "九九の計算②",
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
        title: "かけ算の計算①",
        problems: [
            {
                type: "problem",
                text: "12×3の 計算の しかたを 考えましょう。",
                hint: "12を 9と3、または 10と2に わけてみよう。2つの かけ算の 答えを たすと、ぜんぶの 数になるよ。",
                style: "split-multiplication",
                originalColumns: 12,
                originalRows: 3,
                maxParts: 2
            },
            {
                type: "problem",
                text: "13×3の 計算の しかたを 考えましょう。",
                hint: "13を 10と3に わけると、九九を つかって 計算できるかな。",
                style: "split-multiplication",
                originalColumns: 13,
                originalRows: 3,
                maxParts: 2
            },
            {
                type: "problem",
                text: "11×2を、九九を つかって くふうして もとめましょう。",
                hint: "11を 9と2に わけると、どんな かけ算が できるかな。",
                style: "split-multiplication",
                originalColumns: 11,
                originalRows: 2,
                maxParts: 2
            },
            {
                type: "problem",
                text: "14×3を、九九を つかって くふうして もとめましょう。",
                hint: "14を 7と7に わけてみよう。",
                style: "split-multiplication",
                originalColumns: 14,
                originalRows: 3,
                maxParts: 3
            },
            {
                type: "problem",
                text: "15×2を、九九を つかって くふうして もとめましょう。",
                hint: "15を 8と7に わけてみよう。",
                style: "split-multiplication",
                originalColumns: 15,
                originalRows: 2,
                maxParts: 4
            }
        ]
    },

    {
        id: 4,
        title: "かけ算の計算②",
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
            document.getElementById('hint-display').innerText = data.hint;
            document.getElementById('hint-btn').style.display = "none";
            // 画面を初期化
            document.getElementById("formula-section-container").style.display = "block";
            const tableArea = document.getElementById("table-area");
            if (tableArea) tableArea.style.display = "none";
            const chocoArea = document.getElementById("choco-area");
            if (chocoArea) chocoArea.style.display = "none";
            document.getElementById('hint-display').style.display = "none";
            document.querySelector('.options-container').style.display = "flex";

            if (data.style === "chocolate-multiplication") {
                showChocolateProblem(data)
            } else if (data.style === "grid-table-multiplication") {
                showGridTableProblem(data);
            } else if (data.style === "split-multiplication") {
                showSplitProblem(data); 
            } else if(data.style==="normal"){
                showNormalProblem(data);
            }
            selectedId = ""; resetSelection(); document.getElementById('result-message').innerText = "";
            document.getElementById('custom-keypad').style.display = "none";
            activeInputId = null;

            // 「つぎへ」ボタンの表示切替
            const nextButton = document.getElementById("next-btn");

                if (currentProblem >= unit.problems.length - 1) {
                    nextButton.style.display = "none";
                } else {
                    nextButton.style.display = "inline-block";
                }
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

    
    function createOriginalArray(columns, rows) {
        const container = document.createElement("div");

        container.style.display = "grid";
        container.style.width = "100%";
        container.style.maxWidth = "650px";
        container.style.boxSizing = "border-box";
        container.style.gridTemplateColumns =
            `repeat(${columns}, minmax(0, 1fr))`;
        container.style.gap = "5px";
        container.style.margin = "20px auto";

        // 現在の問題に設定された最大分割数
        const data = getCurrentProblem();
        const maxParts = Math.max(
            2,
            Math.min(columns, Number(data.maxParts) || 2)
        );

        const colors = [
            "#79c7ec",
            "#a6d974",
            "#f7c879",
            "#c5a8eb"
        ];

        const cells = [];

        for (let i = 0; i < columns * rows; i++) {
            const cell = document.createElement("div");

            cell.style.width = "100%";
            cell.style.aspectRatio = "1 / 1";
            cell.style.boxSizing = "border-box";
            cell.style.border = "1px solid #3989b7";
            cell.style.borderRadius = "4px";
            cell.style.backgroundColor = colors[0];
            cell.style.cursor = "pointer";

            container.appendChild(cell);
            cells.push(cell);
        }

        // 複数の分割位置を保存する
        let splitPositions = [];

        container.dataset.splitPositions = "[]";

        // 既存の2分割用の判定との互換性を維持
        container.dataset.splitPosition = "";

        function updateArray() {
            splitPositions.sort((a, b) => a - b);

            container.dataset.splitPositions =
                JSON.stringify(splitPositions);

            // 2分割の場合は従来の判定を使用できる
            container.dataset.splitPosition =
                splitPositions.length === 1
                    ? String(splitPositions[0])
                    : "";

            cells.forEach((cell, index) => {
                const column = index % columns;

                const groupIndex = splitPositions.filter(
                    position => column >= position
                ).length;

                cell.style.backgroundColor =
                    colors[groupIndex % colors.length];
            });

            const formulaContainer = document.getElementById(
                "formula-section-container"
            );

            if (formulaContainer) {
                // 1か所以上分けた場合に式を表示
                formulaContainer.style.display =
                    splitPositions.length > 0 ? "block" : "none";
            }
        }

        // クリックした位置で区切る
        cells.forEach((cell, index) => {
            cell.addEventListener("click", () => {
                const position = (index % columns) + 1;

                // 最後の列の後ろでは分割できない
                if (position >= columns) return;

                const existingIndex =
                    splitPositions.indexOf(position);

             if (existingIndex !== -1) {
                    // 同じ位置を押すと区切りを解除
                    splitPositions.splice(existingIndex, 1);
                } else if (splitPositions.length < maxParts - 1) {
                    // 上限以内なら区切りを追加
                    splitPositions.push(position);
                }

                updateArray();
            });
        });

        return container;
    }


    function showSplitProblem(data){
        document.getElementById('options-section').style.display = "block";
        // この問題ではA・B・Cの選択肢を使わない
        document.querySelector('.options-container').style.display = "none";
        document.getElementById('options-instruction').style.display = "none";
        document.getElementById('options-instruction').innerHTML = `<strong>${data.optionsTitle}</strong>`;
        document.getElementById('draw-A').innerHTML = data.drawA;
        document.getElementById('draw-B').innerHTML = data.drawB;
        document.getElementById('draw-C').innerHTML = data.drawC;
        // 分ける前のアレイ図を表示
        const originalSection = document.getElementById("original-array-section");
        const originalArray = document.getElementById("original-array");

        originalArray.innerHTML = "";

        if (data.originalColumns && data.originalRows) {
            originalSection.style.display = "block";

            originalArray.appendChild(
                createOriginalArray(data.originalColumns, data.originalRows)
            );
        } else {
            originalSection.style.display = "none";
        }        
                
        const instructionEl = document.getElementById('formula-instruction');
        instructionEl.style.display = "block";
        
        instructionEl.innerHTML = `
            <strong>② わけた図を見て、式をつくりましょう。</strong>
            <div style="margin-top:8px; line-height:1.8;">
            それぞれの数を、かけ算でもとめましょう。
            </div>
            
            <div style="margin-top:12px;">
                <strong>③ 2つの答えをたして、ぜんぶの数をもとめましょう。</strong>
            </div>
        `;

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
        // 図を選ぶまでは、計算式を表示しない
        document.getElementById('formula-section-container').style.display = "none";
            
    }
    function showGridTableProblem(data){
        document.getElementById("formula-section-container").style.display = "none";
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
        document.getElementById("formula-section-container").style.display = "block";
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

    function previousQuestion() {
        if (currentProblem === 0) {
            backToProblemSelect();
        } else {
            moveQuestion(-1);
        }
    }

    function selectOption(id) {
        selectedId = id;
        resetSelection();

        document.getElementById('opt-' + id).classList.add('selected');

        // 図を選んだら、計算式を表示する
        const formulaContainer = document.getElementById('formula-section-container');

        if (getCurrentProblem().style === "split-multiplication" && formulaContainer) {
            formulaContainer.style.display = "block";
        }
    }
    function resetSelection() {
        ['A', 'B', 'C'].forEach(id => {
            const el = document.getElementById('opt-' + id);
            if (el) el.classList.remove('selected');
        });
    }

    // ヒントウィンドウを開く
function toggleHint() {

    const modal = document.getElementById("hint-modal");
    const hint = document.getElementById("hint-display");

    // ヒント内容は表示状態にする
    hint.style.display = "block";

    // ウィンドウを表示
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
}


// ヒントウィンドウを閉じる
function closeHint() {

    const modal = document.getElementById("hint-modal");

    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
}


// 背景をクリックしたら閉じる
function closeHintFromBackground(event) {

    if (event.target.id === "hint-modal") {
        closeHint();
    }

}

    function openKeypad(id, isGridTable = false) {
        activeInputId = id;

        const keypad = document.getElementById('custom-keypad');
        const inputEl = document.getElementById(id);
        const problemScreen = document.getElementById('problem-screen');

        keypad.style.display = "block";
        problemScreen.classList.add('keypad-open');
        inputEl.focus();

        if (!isGridTable) {
            setTimeout(() => {
                const inputRect = inputEl.getBoundingClientRect();
                const keypadRect = keypad.getBoundingClientRect();

                // 入力欄の下端を、テンキー上端より40px上に表示する
                const safeBottom = keypadRect.top - 40;

                if (inputRect.bottom > safeBottom) {
                    const moveAmount = inputRect.bottom - safeBottom;

                   window.scrollBy({
                        top: moveAmount,
                        behavior: "smooth"
                    });
                }
            }, 100);
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
            document.getElementById('problem-screen').classList.remove('keypad-open');
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

    document.addEventListener('pointerdown', function (event) {
        const keypad = document.getElementById('custom-keypad');

        // テンキーが閉じている場合は何もしない
        if (keypad.style.display === 'none') return;

        // テンキー内、または入力欄をタップした場合は閉じない
        if (
            keypad.contains(event.target) ||
            event.target.matches('input[inputmode="none"]')
        ) {
            return;
        }
        

        // テンキーの外をタップした場合に閉じる
        keypad.style.display = 'none';
        document
            .getElementById('problem-screen')
            .classList.remove('keypad-open');

        if (activeInputId) {
            const inputEl = document.getElementById(activeInputId);
            if (inputEl) inputEl.blur();
        }
    

        activeInputId = null;
    });

    function checkAnswer() {
        const data = getCurrentProblem();
        
        const res = document.getElementById('result-message');
        const hintBtn = document.getElementById('hint-btn');
        
        // かけ算の計算①：アレイ図が分割されているか確認
        if (data.style === "split-multiplication") {

            const array = document.querySelector(
                "#original-array [data-split-position]"
            );

            // 図がまだ分割されていない場合
            if (!array || array.dataset.splitPosition === "") {
                res.innerText = "図を分けてね！";
                res.style.color = "orange";
                hintBtn.style.display = "none";
                return;
            }
        }
        if(data.style === "normal"){
            if(checkNormalAnswer(data)){
                res.innerText = "せいかい！！";
                res.style.color = "red";
                hintBtn.style.display = "none";
                document.getElementById("hint-display").style.display = "none";

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
                hintBtn.style.display = "inline-block";
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
            hintBtn.style.display = "none";
            document.getElementById("hint-display").style.display = "none";
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
            hintBtn.style.display = "none";
        } else {
            mistakeCount[currentProblem]++;
            res.innerText = "ちがうよ！"; 
            res.style.color = "blue";
            hintBtn.style.display = "inline-block";
        }
    
    }
function checkNormalAnswer(data){
    const value = document.getElementById("vAns").value;
    return Number(value) === data.answer;
}


function checkSplitAnswer(data) {
    // 現在のアレイ図を取得する
    const array = document.querySelector(
        "#original-array [data-split-position]"
    );

    // 図がまだ分割されていない場合
    if (!array || array.dataset.splitPosition === "") {
        return {
            correct: false,
            almost: false
        };
    }

    // 児童が選んだ分割位置
    const splitPosition = Number(array.dataset.splitPosition);

    // 元のアレイ図の列数と行数
    const columns = Number(data.originalColumns);
    const rows = Number(data.originalRows);

    // 左側と右側の列数
    const leftColumns = splitPosition;
    const rightColumns = columns - splitPosition;

    // それぞれのかけ算の答え
    const leftProduct = leftColumns * rows;
    const rightProduct = rightColumns * rows;

    // 全体の数
    const expectedTotal = columns * rows;

    // 入力された値を取得
    const values = [];

    for (let i = 0; i < 8; i++) {
        values.push(
            document.getElementById("v" + i).value.trim()
        );
    }

    const vAns = document.getElementById("vAns").value.trim();

    // 左側と右側の正しい式
    const pair1 = [
        String(leftColumns),
        String(rows),
        String(leftProduct)
    ];

    const pair2 = [
        String(rightColumns),
        String(rows),
        String(rightProduct)
    ];

    // かけ算の式が一致しているか調べる
    function matches(input, expected, allowReverse = false) {
        const normal =
            input[0] === expected[0] &&
            input[1] === expected[1] &&
            input[2] === expected[2];

        const reverse =
            input[0] === expected[1] &&
            input[1] === expected[0] &&
            input[2] === expected[2];

        return normal || (allowReverse && reverse);
    }

    const formula1 = values.slice(0, 3);
    const formula2 = values.slice(3, 6);

    // 左右の式を入れ替えても正解とする
    const multCorrect =
        (matches(formula1, pair1) && matches(formula2, pair2)) ||
        (matches(formula1, pair2) && matches(formula2, pair1));

    // かける数の順序を逆にした場合は「おしい」とする
    const multAlmost =
        (
            matches(formula1, pair1, true) &&
            matches(formula2, pair2, true)
        ) ||
        (
            matches(formula1, pair2, true) &&
            matches(formula2, pair1, true)
        );

    // たし算の判定
    const addCorrect =
        (
            (values[6] === String(leftProduct) &&
             values[7] === String(rightProduct)) ||
            (values[6] === String(rightProduct) &&
             values[7] === String(leftProduct))
        ) &&
        vAns === String(expectedTotal);

    if (multCorrect && addCorrect) {
        return {
            correct: true,
            almost: false
        };
    }

    if (multAlmost && addCorrect) {
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
// 「つかいかた」画面を表示する
function showHelp() {
    const coverScreen = document.getElementById('cover-screen');
    const helpScreen = document.getElementById('help-screen');

    coverScreen.style.display = 'none';
    helpScreen.style.display = 'block';

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


// 「つかいかた」画面を閉じる
function closeHelp() {
    const coverScreen = document.getElementById('cover-screen');
    const helpScreen = document.getElementById('help-screen');

    helpScreen.style.display = 'none';
    coverScreen.style.display = 'flex';

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
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