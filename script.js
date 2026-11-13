let currentProblem = 0;
let currentUnit = 1;
let mistakeCount = [];
let currentProblemPage = 0;
const problemsPerPage = 3;

// 現在表示しているヒントの段階を管理
let hintStep = 0;

// 最後に判定した間違いの種類
let hintErrorType = null;
// かけ算の計算①で正解済みかどうか
let splitSolved = false;
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
                maxParts: 2
            },
            {
                type: "problem",
                text: "15×2を、九九を つかって くふうして もとめましょう。",
                hint: "15を 8と7に わけてみよう。",
                style: "split-multiplication",
                originalColumns: 15,
                originalRows: 2,
                maxParts: 2
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
        // かけ算のもんだい①だけ専用レイアウトを使用する
        document.getElementById("problem-screen").classList.toggle(
            "split-layout",
            data.style === "split-multiplication"
        );

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
            document.getElementById('problem-screen').style.display =
            data.style === "split-multiplication" ? "grid" : "block";
            document.getElementById('screen-menu').style.display = "none";
            const problemNo = currentProblem + 1;
            document.getElementById('page-info').innerText = `${currentProblem+1} / ${unit.problems.length}`;
            document.getElementById("problem-title").innerText ="だい" + (currentProblem+1) + "もん";
            renderDifficulty(data.difficulty ?? 1);
            
            document.getElementById("problem-text").innerText = data.text;

            // ヒントの進行状況を初期化
            hintStep = 0;
            hintErrorType = null;


            const hintDisplay = document.getElementById("hint-display");
            const hintButton = document.getElementById("hint-btn");

            hintDisplay.innerText = "";
            hintDisplay.style.display = "none";
            hintButton.style.display = "none";
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
            
            selectedId = "";
            resetSelection();

            document.getElementById("result-message").innerText = "";
            document.getElementById("custom-keypad").style.display = "none";

            activeInputId = null;

            // 新しい問題では正解状態をリセット
            splitSolved = false;

            // 正解後の専用ボタンを準備
            setupSplitNextButton();


            
            // 既存の「つぎへ」ボタンの表示切替
            const nextButton = document.getElementById("next-btn");

            if (nextButton) {

                if (data.style === "split-multiplication") {

                    // かけ算の計算①では、正解後の専用ボタンを使用
                    nextButton.style.display = "none";

                } else if (
                    currentProblem >= unit.problems.length - 1
                ) {

                    nextButton.style.display = "none";

                } else {

                    nextButton.style.display = "inline-block";
                }
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
    const wrapper = document.createElement("div");
    const gridArea = document.createElement("div");
    const container = document.createElement("div");

    wrapper.className = "split-array-wrapper";
    gridArea.className = "split-array-area";
    container.className = "split-array-grid";

    // 計算上の columns を縦方向に並べる
    // 例：12×3 → 縦12行、横3列
    container.style.display = "grid";
    container.style.gridTemplateColumns =
        `repeat(${rows}, minmax(0, 1fr))`;
    container.style.gap = "4px";

    gridArea.style.position = "relative";

    const colors = ["#79c7ec", "#a6d974"];
    const cells = [];
    let splitPosition = null;
    let previousSplitKey = "[]";

    container.dataset.splitPositions = "[]";
    container.dataset.splitPosition = "";

    const instruction = document.createElement("p");
    instruction.className = "split-array-instruction";
    instruction.textContent =
        "図をタップして、2つに分けましょう。";

    const lineLayer = document.createElement("div");
    lineLayer.style.position = "absolute";
    lineLayer.style.inset = "0";
    lineLayer.style.pointerEvents = "none";

    // 縦 columns 行、横 rows 列のアレイ図
    for (let row = 0; row < columns; row++) {
        for (let col = 0; col < rows; col++) {
            const cell = document.createElement("div");

            cell.className = "split-array-cell";
            cell.style.aspectRatio = "1 / 1";
            cell.style.boxSizing = "border-box";
            cell.style.border = "1px solid #3989b7";
            cell.style.borderRadius = "4px";
            cell.style.backgroundColor = colors[0];
            cell.style.cursor = "pointer";

            // タップした行の下側に分割線を置く
            const position = row + 1;

            cell.addEventListener("click", () => {
                if (splitSolved) return;
                if (position >= columns) return;

                // 何度押しても分割位置は1か所だけ
                if (splitPosition === position) return;

                splitPosition = position;
                updateArray();
            });

            container.appendChild(cell);
            cells.push(cell);
        }
    }

    function updateArray() {
        const positions =
            splitPosition === null ? [] : [splitPosition];

        const currentSplitKey = JSON.stringify(positions);

        const splitChanged = currentSplitKey !== previousSplitKey;
        if (splitChanged) {
            hintStep = 0;
            hintErrorType = null;

            const hintButton =
                document.getElementById("hint-btn");
            if (hintButton) {
                hintButton.style.display = "none";
            }

            const hintDisplay =
                document.getElementById("hint-display");
            if (hintDisplay) {
                hintDisplay.replaceChildren();
            }

            const hintModal =
                document.getElementById("hint-modal");

            if (
                hintModal &&
                hintModal.getAttribute("aria-hidden") === "false"
            ) {
                closeHint();
            }

            previousSplitKey = currentSplitKey;
        }

        // 既存の計算・ヒント処理との互換性を維持
        container.dataset.splitPositions = currentSplitKey;
        container.dataset.splitPosition =
            splitPosition === null ? "" : String(splitPosition);

        cells.forEach((cell, index) => {
            const row = Math.floor(index / rows);

            cell.style.backgroundColor =
                splitPosition !== null && row >= splitPosition
                    ? colors[1]
                    : colors[0];
        });

        renderLines();

        // 未分割なら入力欄なし、分割後は2つ分
        updateSplitFormula(
            splitPosition === null ? 0 : 2,
            splitChanged
        );

        if (splitPosition === null) {
            instruction.textContent =
                "図をタップして、2つに分けましょう。";
        } else {
            instruction.textContent =
                `${columns}を ${splitPosition}と` +
                `${columns - splitPosition}に分けました。` +
                " ほかの場所を押すと分け方を変えられます。";
        }
    }

    function renderLines() {
        lineLayer.replaceChildren();

        if (splitPosition === null) return;

        const firstCell = cells[0];
        const targetCell = cells[splitPosition * rows];

        if (!firstCell || !targetCell) return;

        const containerRect =
            container.getBoundingClientRect();
        const targetRect =
            targetCell.getBoundingClientRect();

        // 分割する行の境界
        const boundaryY =
            targetRect.top - containerRect.top - 2;

        const line = document.createElement("div");

        line.style.position = "absolute";
        line.style.left = "0";
        line.style.top = `${boundaryY - 12}px`;
        line.style.width = "100%";
        line.style.height = "24px";
        line.style.cursor = "ns-resize";
        line.style.touchAction = "none";
        line.style.pointerEvents = "auto";
        line.style.zIndex = "10";

        const visualLine = document.createElement("div");

        visualLine.style.position = "absolute";
        visualLine.style.left = "0";
        visualLine.style.top = "10px";
        visualLine.style.width = "100%";
        visualLine.style.height = "4px";
        visualLine.style.backgroundColor = "#e17b39";
        visualLine.style.borderRadius = "3px";
        visualLine.style.pointerEvents = "none";

        line.appendChild(visualLine);

        let startY = 0;
        let dragging = false;

        line.addEventListener("pointerdown", event => {
            if (splitSolved) return;
            if (event.button !== 0) return;

            event.preventDefault();
            event.stopPropagation();

            startY = event.clientY;
            dragging = true;
            line.setPointerCapture(event.pointerId);
        });

        line.addEventListener("pointerup", event => {
            if (!dragging) return;

            event.preventDefault();
            event.stopPropagation();
            dragging = false;

            const distance = event.clientY - startY;

            // 分割線を上下にドラッグして位置を変更
            const cellHeight =
                firstCell.getBoundingClientRect().height + 4;

            const moveCount =
                Math.round(distance / cellHeight);

            const newPosition = Math.max(
                1,
                Math.min(
                    columns - 1,
                    splitPosition + moveCount
                )
            );

            if (newPosition !== splitPosition) {
                splitPosition = newPosition;
                updateArray();
            } else {
                renderLines();
            }
        });

        line.addEventListener("pointercancel", () => {
            dragging = false;
            renderLines();
        });

        lineLayer.appendChild(line);
    }

    gridArea.appendChild(container);
    gridArea.appendChild(lineLayer);

    wrapper.appendChild(instruction);
    wrapper.appendChild(gridArea);

    const resizeObserver = new ResizeObserver(() => {
        renderLines();
    });

    resizeObserver.observe(container);

    updateArray();

    return wrapper;
}



    
   
function updateSplitFormula(partCount, resetValues = false) {
    const formulaInputs = document.getElementById("formula-inputs");
    const formulaContainer = document.getElementById(
        "formula-section-container"
    );

    if (!formulaInputs || !formulaContainer) return;

   // 分割位置が変わっていない場合だけ入力内容を保存する
    const savedValues = {};

    if (!resetValues) {
        formulaInputs.querySelectorAll("input").forEach(input => {
            savedValues[input.id] = input.value;
        });
    }

    if (partCount < 2) {
        formulaInputs.innerHTML = "";
        formulaContainer.style.display = "none";
        return;
    }

    let html = "";

    // 分割数に応じたかけ算の入力欄
    for (let i = 0; i < partCount; i++) {
        html += `
            <div class="formula-row">
                <input class="formula-input"
                    type="text"
                    id="mul-${i}-0"
                    inputmode="none"
                    onclick="openKeypad('mul-${i}-0')"> ×
                <input class="formula-input"
                    type="text"
                    id="mul-${i}-1"
                    inputmode="none"
                    onclick="openKeypad('mul-${i}-1')"> =
                <input class="formula-input"
                    type="text"
                    id="mul-${i}-2"
                    inputmode="none"
                    onclick="openKeypad('mul-${i}-2')">
            </div>
        `;
    }

    // たし算の入力欄
    html += `<div class="formula-row">`;

    for (let i = 0; i < partCount; i++) {
        if (i > 0) html += " + ";

        html += `
            <input class="formula-input"
                type="text"
                id="add-${i}"
                inputmode="none"
                onclick="openKeypad('add-${i}')">
        `;
    }

    html += `
        = <input class="formula-input"
            type="text"
            id="add-answer"
            inputmode="none"
            onclick="openKeypad('add-answer')">
        </div>
    `;

    formulaInputs.innerHTML = html;
    formulaContainer.style.display = "block";

    // 保存した入力内容を復元する
    formulaInputs.querySelectorAll("input").forEach(input => {
        if (Object.prototype.hasOwnProperty.call(
            savedValues, input.id
        )) {
            input.value = savedValues[input.id];
        }
    });
}



function getSplitHintInfo(data) {
    const array = document.querySelector(
        "#original-array [data-split-positions]"
    );

    if (!array) return null;

    let positions;

    try {
        positions = JSON.parse(array.dataset.splitPositions);
    } catch (error) {
        return null;
    }

    // 分割は必ず1回だけ
    if (!Array.isArray(positions) || positions.length !== 1) {
        return null;
    }

    const columns = Number(data.originalColumns);
    const rows = Number(data.originalRows);
    const position = positions[0];

    if (
        !Number.isInteger(columns) ||
        !Number.isInteger(rows) ||
        columns < 2 ||
        rows < 1 ||
        !Number.isInteger(position) ||
        position <= 0 ||
        position >= columns
    ) {
        return null;
    }

    // 上下に分けた数
    // 既存の処理に合わせて widths という名前を維持
    const widths = [
        position,
        columns - position
    ];

    return {
        widths,
        rows,
        columns
    };
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
                <strong>③ それぞれの答えをたして、ぜんぶの数をもとめましょう。</strong>
            </div>
        `;

        // 図を分けるまでは計算式を表示しない
        updateSplitFormula(0);
            
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
    const title = document.getElementById("hint-window-title");
    const data = getCurrentProblem();

    // かけ算の計算①：間違いに応じた段階的ヒント
    if (data.style === "split-multiplication") {

        const hintGroups = {
            noSplit: [
                "ならった九九で計算できるように、図を分けてみよう。",
                "どこで分けると、知っている九九で計算できるかな？",
                "たとえば、10こ分と残りに分ける方法や、9こ分と残りに分ける方法もあるよ。"
            ],

            incomplete: [
                "まだ書いていないところがあるよ。空いているところをさがしてみよう。",
                "図を分けたら、それぞれのかけ算の式を書いてみよう。",
                "かけ算の答えが出たら、それらをたして、ぜんぶの数を求めよう。"
            ],

            formula: [
                "図の分け方と、かけ算の式が合っているかたしかめよう。",
                "分けたそれぞれの部分には、横に何こ、たてに何だんあるかな？",
                "1だんにある数と、だんの数を使って、かけ算の式を作ってみよう。"
            ],

            multiplication: [
                "分けたそれぞれの部分のかけ算を、もう一度たしかめよう。",
                "かけ算の式に書いた数を見て、九九を使って計算してみよう。",
                "それぞれの部分の答えが、図の数と合っているか数えてみよう。"
            ],

            addition: [
                "それぞれのかけ算の答えを、たし算に使っているかな？",
                "分けた部分の答えを、ひとつずつたし算の式に書いてみよう。",
                "たし算の答えは、図にあるぜんぶの数と同じになるはずだよ。"
            ],

            reverse: [
                "かけ算の式の数のじゅんばんを、もう一度見てみよう。",
                "1だんに何こあるかな？ それが何だんあるかな？",
                "図の『1だんの数 × だんの数』のじゅんばんで式を書いてみよう。"
            ],

            default: [
                "図と式を、もう一度見くらべてみよう。",
                "分けたそれぞれの部分の数を、かけ算で求めてみよう。",
                "それぞれの答えをたして、ぜんぶの数を求めよう。"
            ]
        };

        
        const hints = [
            ...(hintGroups[hintErrorType] || hintGroups.default)
        ];

        // 現在の図の分け方を取得
        const splitInfo = getSplitHintInfo(data);

        if (splitInfo) {
            const widthText = splitInfo.widths
                .map(width => `${width}こ`)
                .join("、");

            const splitDescription =
                `いまの図は、横に${widthText}ある部分に分かれているね。` +
                `どの部分も、たてに${splitInfo.rows}だんあるよ。`;

            // 図と式の対応を考えるヒントを具体化
            if (
                hintErrorType === "formula" ||
                hintErrorType === "reverse"
            ) {
                hints[1] = splitDescription;
            }

            // かけ算の答えを考えるヒントを具体化
            if (hintErrorType === "multiplication") {
                hints[1] =
                    splitDescription +
                    "それぞれの部分を、九九を使って計算してみよう。";
            }

            // たし算のヒントを具体化
            if (hintErrorType === "addition") {
                hints[1] =
                    splitDescription +
                    "それぞれの部分のかけ算の答えを、ぜんぶたしてみよう。";
            }
        }


        // ヒントを1段階進める（最大3段階）
        hintStep = Math.min(hintStep + 1, hints.length);

        // タイトルに現在の段階を表示
        title.innerText = `ヒント ${hintStep}/${hints.length}`;

        // 過去のヒントも含めて表示
        hint.replaceChildren();

        for (let i = 0; i < hintStep; i++) {
            const item = document.createElement("div");
            item.className = "hint-step-item";

            const stepLabel = document.createElement("strong");
            stepLabel.innerText = `ヒント ${i + 1}`;

            const stepText = document.createElement("p");
            stepText.innerText = hints[i];

            item.appendChild(stepLabel);
            item.appendChild(stepText);

            // 現在のヒントを強調
            if (i === hintStep - 1) {
                item.classList.add("hint-step-current");
            }

            hint.appendChild(item);
        }

    } else {

        // ほかの単元は従来のヒントを表示
        title.innerText = "ヒント";
        hint.innerText = data.hint;
    }

    // ヒントを表示
    hint.style.display = "block";

    // モーダルウィンドウを開く
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

        if (
            !isGridTable &&
            getCurrentProblem().style !== "split-multiplication"
        ) {
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


/* ========================================
   かけ算の計算①：正解時の振り返り
   ======================================== */

function createSplitReflection(data) {
    const splitInfo = getSplitHintInfo(data);

    if (!splitInfo) return "";

    const { widths, rows, columns } = splitInfo;

    // 児童が分けたそれぞれの部分の答え
    const products = widths.map(width => width * rows);

    // 分け方の説明
    const widthText = widths.join("と");

    // かけ算の式
    const multiplicationText = widths
        .map((width, index) =>
            `${width} × ${rows} = ${products[index]}`
        )
        .join("\n");

    // たし算の式
    const additionText =
        `${products.join(" + ")} = ${columns * rows}`;

    return (
        `${columns}を「${widthText}」に分けて考えたんだね。\n\n` +
        `${multiplicationText}\n\n` +
        `${additionText}\n\n` +
        "九九を使って、じょうずに計算できたね！"
    );
}


/* ========================================
   正解ポップアップ用の色分けアレイ図
   ======================================== */

function createSplitReflectionVisual(data) {

    const info = getSplitHintInfo(data);

    if (!info) {
        return null;
    }

    const { widths, rows, columns } = info;

    // 問題画面のアレイ図と同じ色
    const colors = [
        "#79c7ec",
        "#a6d974",
        "#f7c879",
        "#c5a8eb",
        "#f3a6b4",
        "#9bd9c3"
    ];

    const wrapper = document.createElement("div");
    wrapper.className = "split-reflection";

    // 分け方の説明
    const description = document.createElement("p");
    description.className = "split-reflection-description";
    description.textContent =
        `${columns}を「${widths.join("と")}」に分けて考えたんだね。`;

    wrapper.appendChild(description);

    // アレイ図
    const array = document.createElement("div");
    array.className = "split-reflection-array";

    // 問題画面と同じく、縦に12行・横に3列
    array.style.gridTemplateColumns =
        `repeat(${rows}, minmax(0, 1fr))`;

    // 各列がどの部分に属するかを計算
    const boundaries = [];
    let totalWidth = 0;

    widths.forEach(width => {
        totalWidth += width;
        boundaries.push(totalWidth);
    });

    
// 縦方向に「columns」行、横方向に「rows」列
for (let row = 0; row < columns; row++) {
    for (let col = 0; col < rows; col++) {

        const cell = document.createElement("div");
        cell.className = "split-reflection-cell";

        // 分割位置より上は青、下は緑
        const groupIndex = boundaries.findIndex(
            boundary => row < boundary
        );

        cell.style.backgroundColor =
            colors[groupIndex % colors.length];

        // 分割位置に横線を引く
        if (
            row > 0 &&
            boundaries.slice(0, -1).includes(row)
        ) {
            cell.classList.add("split-reflection-boundary");
        }

        array.appendChild(cell);
    }
}


    wrapper.appendChild(array);

    // 分けた部分ごとの計算式
    const formulas = document.createElement("div");
    formulas.className = "split-reflection-formulas";

    const products = widths.map(width => width * rows);

    widths.forEach((width, index) => {

        const formula = document.createElement("div");
        formula.className = "split-reflection-formula";

        formula.style.borderLeft =
            `7px solid ${colors[index % colors.length]}`;

        const label = document.createElement("span");
        label.className = "split-reflection-formula-label";
        label.textContent = `${index + 1}つめ`;

        const expression = document.createElement("strong");
        expression.textContent =
            `${width} × ${rows} = ${products[index]}`;

        formula.appendChild(label);
        formula.appendChild(expression);

        formulas.appendChild(formula);
    });

    wrapper.appendChild(formulas);

    // 最後のたし算
    const addition = document.createElement("div");
    addition.className = "split-reflection-addition";

    addition.textContent =
        `${products.join(" + ")} = ${columns * rows}`;

    wrapper.appendChild(addition);

    const message = document.createElement("p");
    message.className = "split-reflection-message";
    message.textContent =
        "九九を使って、じょうずに計算できたね！";

    wrapper.appendChild(message);

    return wrapper;
}


/* ========================================
   かけ算の計算①：正解後の次へボタン
   ======================================== */


/* ========================================
   かけ算の計算①：正解ポップアップ
   ======================================== */

function setupSplitNextButton() {

    // 以前の小さなボタンがあれば削除
    const oldButton = document.getElementById("split-next-btn");

    if (oldButton) {
        oldButton.remove();
    }

    let modal = document.getElementById("split-success-modal");

    // ポップアップは一度だけ作成
    if (!modal) {

        modal = document.createElement("div");
        modal.id = "split-success-modal";
        modal.className = "split-success-modal";
        modal.setAttribute("aria-hidden", "true");

        modal.innerHTML = `
            <div class="split-success-window"
                 role="dialog"
                 aria-modal="true"
                 aria-labelledby="split-success-title">

                <h2 id="split-success-title">
                    せいかい！
                </h2>

                <div id="split-success-content"
                     class="split-success-content">
                </div>

                <button type="button"
                        id="split-success-next"
                        class="split-success-next">
                    つぎのもんだいへ
                </button>

            </div>
        `;

        document.body.appendChild(modal);

        const nextButton =
            document.getElementById("split-success-next");

        nextButton.addEventListener("click", function () {

            const data = getCurrentProblem();

            if (
                data.style !== "split-multiplication" ||
                !splitSolved
            ) {
                return;
            }

            // 連続クリックを防ぐ
            nextButton.disabled = true;
            splitSolved = false;

            modal.classList.remove("is-visible");
            modal.setAttribute("aria-hidden", "true");

            if (
                currentProblem <
                getCurrentUnit().problems.length - 1
            ) {
                currentProblem++;
                updateDisplay();
            } else {
                showResultScreen();
            }
        });
    }

    // 新しい問題では非表示にする
    modal.classList.remove("is-visible");
    modal.setAttribute("aria-hidden", "true");

    const nextButton =
        document.getElementById("split-success-next");

    if (nextButton) {
        nextButton.disabled = false;
    }
}



function showSplitNextButton() {

    const modal =
        document.getElementById("split-success-modal");

    const content =
        document.getElementById("split-success-content");

    const nextButton =
        document.getElementById("split-success-next");

    if (!modal || !content || !nextButton) return;

    const data = getCurrentProblem();

    // 以前の表示内容を消去
    content.replaceChildren();

    // 色分けしたアレイ図と計算式を生成
    const reflectionVisual = createSplitReflectionVisual(data);

    if (reflectionVisual) {

        // アレイ図と計算式を表示
        content.appendChild(reflectionVisual);

    } else {

        // 分割情報を取得できない場合の予備表示
        content.textContent = createSplitReflection(data);

    }

    const isLastProblem =
        currentProblem >=
        getCurrentUnit().problems.length - 1;

    nextButton.textContent = isLastProblem
        ? "けっかを見る"
        : "つぎのもんだいへ";

    nextButton.disabled = false;

    // ポップアップを表示
    modal.classList.add("is-visible");
    modal.setAttribute("aria-hidden", "false");

    nextButton.focus();
}



    
function checkAnswer() {
    const data = getCurrentProblem();
    // 正解後の重複した答え合わせを防ぐ
    if (data.style === "split-multiplication" && splitSolved) {
        return;
    }

    const res = document.getElementById("result-message");
    const hintBtn = document.getElementById("hint-btn");
    const hintDisplay = document.getElementById("hint-display");

    // かけ算の計算①：図が分割されているか確認
    if (data.style === "split-multiplication") {
        const array = document.querySelector(
            "#original-array [data-split-positions]"
        );

        let splitPositions = [];

        if (array) {
            try {
                splitPositions = JSON.parse(
                    array.dataset.splitPositions
                );
            } catch (error) {
                splitPositions = [];
            }
        }

        if (
            !Array.isArray(splitPositions) ||
            splitPositions.length === 0
        ) {
            res.innerText = "図を分けてね！";
            res.style.color = "orange";

            hintErrorType = "noSplit";
            hintStep = 0;

            // 図の分け方についてヒントを表示できるようにする
            hintBtn.style.display = "inline-block";
            return;
        }
    }

    // 従来の九九の計算
    if (data.style === "normal") {
        if (checkNormalAnswer(data)) {
            res.innerText = "せいかい！！";
            res.style.color = "red";
            hintBtn.style.display = "none";
            hintDisplay.style.display = "none";

            setTimeout(function () {
                if (
                    currentProblem <
                    getCurrentUnit().problems.length - 1
                ) {
                    currentProblem++;
                    updateDisplay();
                } else {
                    showResultScreen();
                }
            }, 2000);

        } else {
            mistakeCount[currentProblem]++;
            res.innerText = "ちがうよ！";
            res.style.color = "blue";
            hintBtn.style.display = "inline-block";
        }

        return;
    }

    let isValueCorrect = true;
    let isAlmostCorrect = false;
    let errorType = null;

    if (data.style === "split-multiplication") {
        const result = checkSplitAnswer(data);

        isValueCorrect = result.correct;
        isAlmostCorrect = result.almost;
        errorType = result.errorType;

    } else if (data.style === "grid-table-multiplication") {
        isValueCorrect = checkGridTableAnswer(data);

    } else if (data.style === "chocolate-multiplication") {
        isValueCorrect = checkChocolateAnswer(data);
    }

    // 間違いの種類が変わったらヒントを最初から表示
    if (data.style === "split-multiplication") {
        if (hintErrorType !== errorType) {
            hintStep = 0;
        }

        hintErrorType = errorType;
    }

    
    
    if (isValueCorrect) {

        // かけ算の計算①では、正解時に計算過程を表示
        if (data.style === "split-multiplication") {

            // 正解済みの状態にする
            splitSolved = true;

            // 問題画面側には短い正解メッセージのみ表示
            res.innerText = "せいかい！";

            // 振り返りは専用ポップアップに表示
            showSplitNextButton();

        } else {
            res.innerText = "せいかい！";
        }

        res.style.color = "red";

        hintBtn.style.display = "none";
        hintDisplay.style.display = "none";

        hintErrorType = null;
        hintStep = 0;

        if (data.style !== "split-multiplication") {

            // ほかの単元は従来どおり2秒後に進む
            setTimeout(function () {
                if (
                    currentProblem <
                    getCurrentUnit().problems.length - 1
                ) {
                    currentProblem++;
                    updateDisplay();
                } else {
                    showResultScreen();
                }
            }, 2000);
        }



    } else if (isAlmostCorrect) {

        res.innerText = "おしい！";
        res.style.color = "orange";

        // 「おしい！」の場合もヒントを利用できる
        if (data.style === "split-multiplication") {
            hintBtn.style.display = "inline-block";
        } else {
            hintBtn.style.display = "none";
        }

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
    const incorrect = (errorType) => ({
        correct: false,
        almost: false,
        errorType
    });

    const array = document.querySelector(
        "#original-array [data-split-positions]"
    );

    if (!array) {
        return incorrect("noSplit");
    }

    let splitPositions;

    try {
        splitPositions = JSON.parse(
            array.dataset.splitPositions
        );
    } catch (error) {
        return incorrect("noSplit");
    }

    if (
        !Array.isArray(splitPositions) ||
        splitPositions.length === 0
    ) {
        return incorrect("noSplit");
    }

    const columns = Number(data.originalColumns);
    const rows = Number(data.originalRows);

    // 分割位置から各部分の列数を計算
    const positions = [...splitPositions].sort(
        (a, b) => a - b
    );

    const boundaries = [0, ...positions, columns];
    const widths = [];

    for (let i = 0; i < boundaries.length - 1; i++) {
        widths.push(
            boundaries[i + 1] - boundaries[i]
        );
    }

    const partCount = widths.length;

    // 図に対応する正しいかけ算を生成
    const expectedMultiplications = widths.map(width => ({
        first: width,
        second: rows,
        product: width * rows
    }));

    const inputMultiplications = [];

    // 入力されたかけ算を取得
    for (let i = 0; i < partCount; i++) {
        const first = document.getElementById(`mul-${i}-0`);
        const second = document.getElementById(`mul-${i}-1`);
        const product = document.getElementById(`mul-${i}-2`);

        if (!first || !second || !product) {
            return incorrect("incomplete");
        }

        inputMultiplications.push({
            first: first.value.trim(),
            second: second.value.trim(),
            product: product.value.trim()
        });
    }

    // 入力されたたし算を取得
    const additionValues = [];

    for (let i = 0; i < partCount; i++) {
        const input = document.getElementById(`add-${i}`);

        if (!input) {
            return incorrect("incomplete");
        }

        additionValues.push(input.value.trim());
    }

    const answerInput = document.getElementById("add-answer");

    if (!answerInput) {
        return incorrect("incomplete");
    }

    // すべての入力値を確認
    const allValues = [
        ...inputMultiplications.flatMap(item => [
            item.first,
            item.second,
            item.product
        ]),
        ...additionValues,
        answerInput.value.trim()
    ];

    if (allValues.some(value => value === "")) {
        return incorrect("incomplete");
    }

    if (!allValues.every(value => /^\d+$/.test(value))) {
        return incorrect("incomplete");
    }

    // かけ算の数の組み合わせを比較する
    // 同じ式が複数ある場合にも対応
    function checkMultiplications(checkType) {
        const used = new Array(
            expectedMultiplications.length
        ).fill(false);

        for (const input of inputMultiplications) {
            let found = false;

            for (let i = 0; i < expectedMultiplications.length; i++) {
                if (used[i]) continue;

                const expected = expectedMultiplications[i];

                const first = Number(input.first);
                const second = Number(input.second);
                const product = Number(input.product);

                const normalOperands =
                    first === expected.first &&
                    second === expected.second;

                const reverseOperands =
                    first === expected.second &&
                    second === expected.first;

                let matches = false;

                if (checkType === "operands") {
                    matches = normalOperands;
                } else if (checkType === "reverse") {
                    matches = normalOperands || reverseOperands;
                } else if (checkType === "complete") {
                    matches =
                        normalOperands &&
                        product === expected.product;
                } else if (checkType === "completeReverse") {
                    matches =
                        (normalOperands || reverseOperands) &&
                        product === expected.product;
                }

                if (matches) {
                    used[i] = true;
                    found = true;
                    break;
                }
            }

            if (!found) {
                return false;
            }
        }

        return true;
    }

    const operandsCorrect =
        checkMultiplications("operands");

    const operandsAllowReverse =
        checkMultiplications("reverse");

    const multiplicationCorrect =
        checkMultiplications("complete");

    const multiplicationAllowReverse =
        checkMultiplications("completeReverse");

    // たし算の項を順序に関係なく比較
    const expectedProducts = expectedMultiplications
        .map(item => item.product)
        .sort((a, b) => a - b);

    const enteredProducts = additionValues
        .map(Number)
        .sort((a, b) => a - b);

    const additionCorrect =
        expectedProducts.every(
            (value, index) =>
                value === enteredProducts[index]
        ) &&
        Number(answerInput.value.trim()) === columns * rows;

    // すべて正しい
    if (multiplicationCorrect && additionCorrect) {
        return {
            correct: true,
            almost: false,
            errorType: "correct"
        };
    }

    // かけ算の数の順序だけが違う
    if (multiplicationAllowReverse && additionCorrect) {
        return {
            correct: false,
            almost: true,
            errorType: "reverse"
        };
    }

    // 図と式の数が一致していない
    if (!operandsAllowReverse) {
        return incorrect("formula");
    }

    // かけ算の答えが違う
    if (!multiplicationAllowReverse) {
        return incorrect("multiplication");
    }

    // 数の順序が逆で、ほかにも間違いがある
    if (!operandsCorrect) {
        return incorrect("reverse");
    }

    // たし算が違う
    return incorrect("addition");
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