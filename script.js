let currentProblem = 0;
let currentUnit = 1;
let mistakeCount = [];
let currentProblemPage = 0;
const problemsPerPage = 3;

// 九九の計算①：81パターンからランダムに10問を作成
function createRandomKukuProblems() {

    const problems = [];

    for (let left = 1; left <= 9; left++) {
        for (let right = 1; right <= 9; right++) {

            problems.push({
                type: "problem",
                text: `${left}×${right}をもとめましょう。`,
                hint: `${left}のだんをおもいだそう。`,
                style: "normal",
                left: left,
                right: right,
                answer: left * right,
                difficulty: 1
            });
        }
    }

    // Fisher-Yates法でランダムに並び替える
    for (let i = problems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [problems[i], problems[j]] =
            [problems[j], problems[i]];
    }

    // 重複なしで10問取り出す
    return problems.slice(0, 10);
}


// 現在表示しているヒントの段階を管理
let hintStep = 0;

// 最後に判定した間違いの種類
let hintErrorType = null;
// かけ算の計算①で正解済みかどうか
let splitSolved = false;
// かけ算の計算②で正解済みかどうか
let chocoSolved = false;
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
        problems: createRandomKukuProblems()
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
                style: "chocolate-multiplication",
                chocoPattern: 1
            },
            {
                type: "problem",
                text: "チョコレートの数を九九をつかって、くふうしてもとめましょう。",
                hint: "1つか2つのまとまりを作って、チョコレートの数を九九でもとめよう。",
                style: "chocolate-multiplication",
                chocoPattern: 2,
                difficulty: 2
            }
        ]
    }
];



    // チョコレートの盤面サイズ
    const CHOCO_ROWS = 7;
    const CHOCO_COLS = 8;

    // 上下左右に1マスずつ空きを追加
    const initialChocoMap = [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,1,1,1,0],
        [0,0,0,0,1,1,1,0],
        [0,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,0]
    ];

    let currentChocoMap = [];

    // 第2問：22個のチョコレート
    const secondChocoMap = [
        [0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,0,0],
        [0,1,1,1,1,1,0,0],
        [0,0,1,1,1,1,0,0],
        [0,0,1,1,1,1,0,0],
        [0,0,1,1,1,1,0,0],
        [0,0,0,0,0,0,0,0]
    ];

    // 現在の問題に対応する初期配置を取得
    function getCurrentChocoInitialMap() {
        const data = getCurrentProblem();

        return data.chocoPattern === 2
            ? secondChocoMap
            : initialChocoMap;
    }
    let chocoBorders = [];
    let lockedCells = [];
    let selectedCells = [];
    let chocoHistory = [];
    let dragInfo = null;

    
    let selectedId = "";
    let activeInputId = null;

    let chocoPairsCount = 1;
    let chocoInputsValues = {};
    // 編集可能なチョコレートの枠を管理する
    let chocoFrames = [];

    // 現在選択している枠のID
    let selectedFrameId = null;

    // 新しい枠に割り当てるID
    let nextChocoFrameId = 1;

    // 同時に作成できる枠は最大2つ
    const maxChocoFrames = 2;


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

        // かけ算のもんだい②の専用レイアウト
        document.getElementById("problem-screen").classList.toggle(
            "choco-layout",
            data.style === "chocolate-multiplication"
        );

        // 九九の計算①の専用レイアウト
        document.getElementById("problem-screen").classList.toggle(
            "normal-layout",
            data.style === "normal"
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
            (
                data.style === "split-multiplication" ||
                data.style === "chocolate-multiplication" ||
                data.style === "normal"
            ) ? "grid" : "block";
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

            // 九九の計算①で作成したアレイ図を削除
            const normalArray = document.getElementById("normal-array-container");
            if (normalArray) {
                normalArray.remove();
            }

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
            // 問題切り替え時にテンキーの位置を初期化
            const keypad = document.getElementById("custom-keypad");

            keypad.classList.remove("keypad-dragged");

            [
                "position",
                "left",
                "top",
                "right",
                "bottom",
                "transform",
                "width",
                "maxWidth"
            ].forEach(property => {
                keypad.style.removeProperty(property);
            });

            // 再チャレンジ時もテンキーの初期サイズを維持
            keypad.style.width = "100%";
            keypad.style.maxWidth = "650px";

            document.getElementById("problem-screen")
            .classList.remove("keypad-open");
            activeInputId = null;

            // 新しい問題では正解状態をリセット
            splitSolved = false;
            chocoSolved = false;

            // 正解後の専用ボタンを準備
            setupSplitNextButton();


            
            // 既存の「つぎへ」ボタンの表示切替
            const nextButton = document.getElementById("next-btn");

            if (nextButton) {

                if (data.style === "split-multiplication"||
                    data.style === "normal"
                ) {

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


function createNormalArray(left, right) {
    const area = document.createElement("div");
    area.className = "normal-array-area";

    const grid = document.createElement("div");
    grid.className = "normal-array-grid";

    // 1行に「かけられる数」個、
    // 「かける数」行の図を作る
    const columns = left;
    const rows = right;

    // 最大9×9でも固定エリアに収まるように調整
    const cellSize = Math.min(
        42,
        320 / columns,
        260 / rows
    );

    grid.style.gridTemplateColumns =
        `repeat(${columns}, ${cellSize}px)`;
    grid.style.gridAutoRows = `${cellSize}px`;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const cell = document.createElement("div");
            cell.className = "normal-array-cell";

            cell.style.backgroundColor =
                row % 2 === 0 ? "#79c7ec" : "#a6d974";

            grid.appendChild(cell);
        }
    }

    const label = document.createElement("p");
    label.className = "normal-array-label";
    label.textContent =
        `${left}こずつ ${right}つ分`;

    area.appendChild(grid);
    area.appendChild(label);

    return area;
}


    
function showNormalProblem(data) {
    const optionsSection =
        document.getElementById("options-section");

    // 左側に図を表示
    optionsSection.style.display = "block";

    // ほかの問題用の要素は非表示
    optionsSection.querySelector("hr").style.display = "none";

    document.getElementById(
        "original-array-section"
    ).style.display = "none";

    document.getElementById(
        "options-instruction"
    ).style.display = "none";

    document.querySelector(
        ".options-container"
    ).style.display = "none";

    // 前の図があれば削除
    const oldArea =
        document.getElementById("normal-array-container");

    if (oldArea) {
        oldArea.remove();
    }

    // 問題に応じた図を作成
    const container = document.createElement("div");
    container.id = "normal-array-container";

    container.appendChild(
        createNormalArray(data.left, data.right)
    );

    optionsSection.appendChild(container);

    // 従来の回答欄
    document.getElementById(
        "formula-instruction"
    ).style.display = "block";

    document.getElementById(
        "formula-instruction"
    ).innerHTML = "<strong>こたえをいれよう</strong>";

    document.getElementById(
        "formula-inputs"
    ).innerHTML = `
        <div class="formula-row">
            <span class="formula-number">${data.left}</span> ×
            <span class="formula-number">${data.right}</span> =
            <input
                class="formula-input"
                id="vAns"
                type="text"
                inputmode="none"
                onclick="openKeypad('vAns')"
            >
        </div>
    `;
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

    const getBoundaryY = position => {
        const targetCell = cells[position * rows];
        if (!targetCell) return null;

        const containerRect = container.getBoundingClientRect();
        const targetRect = targetCell.getBoundingClientRect();

        return targetRect.top - containerRect.top - 2;
    };

    const boundaryY = getBoundaryY(splitPosition);
    if (boundaryY === null) return;

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
    line.style.willChange = "transform";

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
    let activePointerId = null;
    let currentOffset = 0;

    // ドラッグ可能な範囲を、最初と最後の境界に制限
    const firstBoundary = getBoundaryY(1);
    const lastBoundary = getBoundaryY(columns - 1);

    line.addEventListener("pointerdown", event => {
        if (splitSolved) return;
        if (event.button !== 0) return;

        event.preventDefault();
        event.stopPropagation();

        startY = event.clientY;
        currentOffset = 0;
        dragging = true;
        activePointerId = event.pointerId;

        line.setPointerCapture(event.pointerId);
    });

    // ドラッグ中は指の動きに合わせて連続移動
    line.addEventListener("pointermove", event => {
        if (!dragging || event.pointerId !== activePointerId) {
            return;
        }

        event.preventDefault();

        const distance = event.clientY - startY;

        const minOffset = firstBoundary - boundaryY;
        const maxOffset = lastBoundary - boundaryY;

        currentOffset = Math.max(
            minOffset,
            Math.min(maxOffset, distance)
        );

        line.style.transform =
            `translateY(${currentOffset}px)`;
    });

    line.addEventListener("pointerup", event => {
        if (!dragging || event.pointerId !== activePointerId) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        dragging = false;
        activePointerId = null;

        // 指を離した位置に最も近い境界を探す
        const finalY = boundaryY + currentOffset;

        let nearestPosition = splitPosition;
        let nearestDistance = Infinity;

        for (let position = 1; position < columns; position++) {
            const candidateY = getBoundaryY(position);
            if (candidateY === null) continue;

            const distance = Math.abs(candidateY - finalY);

            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestPosition = position;
            }
        }

        if (nearestPosition !== splitPosition) {
            splitPosition = nearestPosition;
            updateArray();
        } else {
            renderLines();
        }
    });

    line.addEventListener("pointercancel", () => {
        dragging = false;
        activePointerId = null;
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
        // 前の問題で表示した青いアレイ図を非表示にする
        document.getElementById("original-array-section").style.display = "none";

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
                    <button type="button" class="btn" onclick="deleteSelectedChocoFrame()" style="background: #ff6b6b; color: white;">枠を消す</button>
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
        chocoPairsCount = 2;
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

    instructionEl.style.display = "block";
    instructionEl.innerHTML =
        "<strong>2. それぞれのまとまりを しきにしよう</strong>";

    const input = (id) => {
        const value = chocoInputsValues[id] || "";
        return `<input type="text" id="${id}" value="${value}"
            inputmode="none" onclick="openKeypad('${id}')">`;
    };

    let html = `
        <div style="text-align:center; margin-bottom:18px;">
            <strong>① かけ算のしき</strong>
        </div>
    `;

    for (let i = 0; i < 2; i++) {
        html += `
            <div style="text-align:center; margin-bottom:12px;">
                <div style="margin-bottom:5px;">
                    ${i + 1}つ目のまとまり
                </div>
                ${input(`c_${i}_0`)}
                <span> × </span>
                ${input(`c_${i}_1`)}
                <span> = </span>
                ${input(`c_${i}_2`)}
            </div>
        `;
    }

    html += `
        <div style="text-align:center; margin:20px 0 10px;">
            <strong>② たし算のしき</strong>
        </div>
        <div style="text-align:center; margin-bottom:15px;">
            ${input("choco_add_0")}
            <span> + </span>
            ${input("choco_add_1")}
            <span> = </span>
            ${input("vAns")}
        </div>
    `;

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
        // 枠の状態を初期化
        chocoFrames = [];
        selectedFrameId = null;
        nextChocoFrameId = 1;

        currentChocoMap = JSON.parse(JSON.stringify(getCurrentChocoInitialMap()));
        chocoBorders = Array(CHOCO_ROWS).fill().map(() =>
            Array(CHOCO_COLS).fill().map(() => ({
                top: false,
                right: false,
                bottom: false,
                left: false
            }))
        );
        lockedCells = Array(CHOCO_ROWS).fill().map(() =>
            Array(CHOCO_COLS).fill(false)
        );
        selectedCells = Array(CHOCO_ROWS).fill().map(() =>
            Array(CHOCO_COLS).fill(false)
        );
        chocoHistory = [];
        dragInfo = null;
        renderChocolate();
    }

function resetChocolatePosition() {

    // リセット前の状態を履歴に保存
    saveChocoHistory();

    // チョコレートを初期配置に戻す
    currentChocoMap = JSON.parse(
        JSON.stringify(getCurrentChocoInitialMap())
    );

    // 作成済みの枠をすべて削除
    chocoFrames = [];
    selectedFrameId = null;
    nextChocoFrameId = 1;

    // 選択状態を初期化
    selectedCells = Array.from(
        { length: CHOCO_ROWS },
        () => Array(CHOCO_COLS).fill(false)
    );

    dragInfo = null;

    // 枠の境界線と固定状態を再計算
    rebuildChocoBorders();

    renderChocolate();
}

function saveChocoHistory() {

    chocoHistory.push({

        map: JSON.parse(
            JSON.stringify(currentChocoMap)
        ),

        // 枠そのものの情報を保存
        frames: JSON.parse(
            JSON.stringify(chocoFrames)
        ),

        // 選択していた枠
        selectedFrameId: selectedFrameId,

        // 次に割り当てる枠ID
        nextChocoFrameId: nextChocoFrameId
    });
}


function undoChoco() {

    if (chocoHistory.length === 0) return;

    const previous = chocoHistory.pop();

    currentChocoMap = JSON.parse(
        JSON.stringify(previous.map)
    );

    chocoFrames = JSON.parse(
        JSON.stringify(previous.frames)
    );

    selectedFrameId = previous.selectedFrameId;
    nextChocoFrameId = previous.nextChocoFrameId;

    selectedCells = Array.from(
        { length: CHOCO_ROWS },
        () => Array(CHOCO_COLS).fill(false)
    );

    dragInfo = null;

    rebuildChocoBorders();
    renderChocolate();
}

    function renderChocolate() {
        const container = document.getElementById('choco-grid-container');
        if (!container) return;

        // グリッドの空いているマスを押したときに選択解除
        container.onclick = function(event) {

            if (
                event.target.classList.contains("empty-cell")
            ) {
            clearChocoFrameSelection();
            }
        };
        container.innerHTML = '';
        
        for (let r = 0; r < CHOCO_ROWS; r++) {
            for (let c = 0; c < CHOCO_COLS; c++) {
                const cell = document.createElement('div');
                
                if (currentChocoMap[r][c] === 1) {
                    cell.className = 'choco-cell';
                    const dot = document.createElement('div');
                    dot.className = 'choco-dot' + (lockedCells[r][c] ? ' locked' : '');
                    dot.addEventListener('pointerdown', (e) => {

                        if (lockedCells[r][c]) {

                            const frame = chocoFrames.find(frame =>
                                r >= frame.row &&
                                r < frame.row + frame.height &&
                                c >= frame.col &&
                                c < frame.col + frame.width
                            );

                            if (frame) {
                                startChocoFrameEdit(e, frame.id, "move");
                            }

                        } else {

                            startDrag(e, r, c, dot);
                        }
                    });
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
        svg.setAttribute(
            "viewBox",
            `0 0 ${CHOCO_COLS * 100} ${CHOCO_ROWS * 100}`
        );
        let greyPathData = "";
        greyPathData +=
            ` M 5 5` +
            ` L ${CHOCO_COLS * 100 - 5} 5` +
            ` L ${CHOCO_COLS * 100 - 5} ${CHOCO_ROWS * 100 - 5}` +
            ` L 5 ${CHOCO_ROWS * 100 - 5} Z`;
        for (let c = 1; c < CHOCO_COLS; c++) {
            greyPathData +=
                ` M ${c * 100} 5` +
                ` L ${c * 100} ${CHOCO_ROWS * 100 - 5}`;
        }

        for (let r = 1; r < CHOCO_ROWS; r++) {
            greyPathData +=
                ` M 5 ${r * 100}` +
                ` L ${CHOCO_COLS * 100 - 5} ${r * 100}`;
        }
        
        const greyPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        greyPath.setAttribute("d", greyPathData);
        greyPath.setAttribute("stroke", "#ddd");
        greyPath.setAttribute("stroke-width", "6");
        greyPath.setAttribute("fill", "none");
        svg.appendChild(greyPath);
        
        let pathData = "";

        // 選択していない枠だけ赤い線で描画する
        for (const frame of chocoFrames) {

            if (frame.id === selectedFrameId) {
                continue;
            }

            const x1 = frame.col * 100;
            const y1 = frame.row * 100;
            const x2 = (frame.col + frame.width) * 100;
            const y2 = (frame.row + frame.height) * 100;

            pathData +=
                ` M ${x1} ${y1}` +
                ` L ${x2} ${y1}` +
                ` L ${x2} ${y2}` +
                ` L ${x1} ${y2} Z`;
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
        // 移動・拡大縮小できる枠を表示
        renderEditableChocoFrames(container);
    }

function renderEditableChocoFrames(container) {

    const directions = [
        "nw", "n", "ne",
        "w",       "e",
        "sw", "s", "se"
    ];

    for (const frame of chocoFrames) {

        // 選択中の枠だけ編集用の枠を表示
        if (frame.id !== selectedFrameId) continue;

        const element = document.createElement("div");

        element.className = "choco-edit-frame";

        if (frame.id === selectedFrameId) {
            element.classList.add("selected");
        }

        element.style.left = `${frame.col / CHOCO_COLS * 100}%`;
        element.style.top = `${frame.row / CHOCO_ROWS * 100}%`;
        element.style.width = `${frame.width / CHOCO_COLS * 100}%`;
        element.style.height = `${frame.height / CHOCO_ROWS * 100}%`;

        // 枠の内側をドラッグすると移動
        element.addEventListener("pointerdown", event => {
            if (event.target !== element) return;

            startChocoFrameEdit(event, frame.id, "move");
        });

        // 選択中の枠に8個のサイズ変更ハンドルを表示
        if (frame.id === selectedFrameId) {

            for (const direction of directions) {

                const handle = document.createElement("div");

                handle.className =
                    `choco-resize-handle handle-${direction}`;

                handle.addEventListener("pointerdown", event => {
                    startChocoFrameEdit(
                        event,
                        frame.id,
                        direction
                    );
                });

                element.appendChild(handle);
            }
        }

        container.appendChild(element);
    }
}

    function startDrag(e, r, c, dotEl) {
        if (lockedCells[r][c]) return;
        e.preventDefault();

        let dragTargets = [];
        if (selectedCells[r][c]) {
            for (let row = 0; row < CHOCO_ROWS; row++) {
                for (let col = 0; col < CHOCO_COLS; col++) {
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
        const cellWidth = gridRect.width / CHOCO_COLS;
        const cellHeight = gridRect.height / CHOCO_ROWS;

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
            const currentCellEl = gridEl.children[target.r * CHOCO_COLS + target.c];
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
                        if (nr < 0 || nr >= CHOCO_ROWS || nc < 0 || nc >= CHOCO_COLS) {
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
                    let nextSelected = Array(CHOCO_ROWS).fill().map(() => Array(CHOCO_COLS).fill(false));

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

        // 枠は最大2つまで
        if (chocoFrames.length >= maxChocoFrames) {
            alert("かこむのは２回まででかんがえてね");
            return;
        }

        const cells = [];

        for (let r = 0; r < CHOCO_ROWS; r++) {
            for (let c = 0; c < CHOCO_COLS; c++) {
                if (selectedCells[r][c]) {
                    cells.push({ r, c });
                }
            }
        }

        if (cells.length === 0) return;

        // 選択したマスが長方形か確認
        const rows = cells.map(cell => cell.r);
        const cols = cells.map(cell => cell.c);

        const minRow = Math.min(...rows);
        const maxRow = Math.max(...rows);
        const minCol = Math.min(...cols);
        const maxCol = Math.max(...cols);

        const width = maxCol - minCol + 1;
        const height = maxRow - minRow + 1;

        if (cells.length !== width * height) {
            alert("長方形になるように、チョコレートをえらんでね。");
            return;
        }

        // 他の枠と重ならないか確認
        const overlaps = chocoFrames.some(frame =>
            cells.some(cell =>
                cell.r >= frame.row &&
                cell.r < frame.row + frame.height &&
                cell.c >= frame.col &&
                cell.c < frame.col + frame.width
            )
        );

        if (overlaps) {
            alert("ほかの枠と重ならないようにしてね。");
            return;
        }

        saveChocoHistory();

        const frame = {
            id: nextChocoFrameId++,
            row: minRow,
            col: minCol,
            width,
            height
        };

        chocoFrames.push(frame);
        selectedFrameId = frame.id;

        for (const cell of cells) {
            lockedCells[cell.r][cell.c] = true;
            selectedCells[cell.r][cell.c] = false;
        }

        rebuildChocoBorders();
        renderChocolate();
    }

function rebuildChocoBorders() {

    chocoBorders = Array.from({ length: CHOCO_ROWS  }, () =>
        Array.from({ length: CHOCO_COLS }, () => ({
            top: false,
            right: false,
            bottom: false,
            left: false
        }))
    );

    lockedCells = Array.from(
        { length: CHOCO_ROWS },
        () => Array(CHOCO_COLS).fill(false)
    );

    for (const frame of chocoFrames) {

        for (let r = frame.row; r < frame.row + frame.height; r++) {
            for (let c = frame.col; c < frame.col + frame.width; c++) {

                lockedCells[r][c] = true;

                const border = chocoBorders[r][c];

                if (r === frame.row) {
                    border.top = true;
                }

                if (r === frame.row + frame.height - 1) {
                    border.bottom = true;
                }

                if (c === frame.col) {
                    border.left = true;
                }

                if (c === frame.col + frame.width - 1) {
                    border.right = true;
                }
            }
        }
    }
}

function isValidChocoFrameRect(rect, frameId) {

    if (
        rect.row < 0 ||
        rect.col < 0 ||
        rect.width < 1 ||
        rect.height < 1 ||
        rect.row + rect.height > CHOCO_ROWS  ||
        rect.col + rect.width > CHOCO_COLS
    ) {
        return false;
    }

    // 他の枠との重複を確認
    const overlaps = chocoFrames.some(other => {

        if (other.id === frameId) return false;

        return (
            rect.row < other.row + other.height &&
            rect.row + rect.height > other.row &&
            rect.col < other.col + other.width &&
            rect.col + rect.width > other.col
        );
    });

    if (overlaps) return false;

    // 枠内のすべてのマスにチョコレートがあるか
    for (let r = rect.row; r < rect.row + rect.height; r++) {
        for (let c = rect.col; c < rect.col + rect.width; c++) {

            if (currentChocoMap[r][c] !== 1) {
                return false;
            }
        }
    }

    return true;
}

function clearChocoFrameSelection() {
    if (selectedFrameId === null) return;

    selectedFrameId = null;
    renderChocolate();
}
function startChocoFrameEdit(event, frameId, mode) {

    if (event.button !== 0) return;

    const frame = chocoFrames.find(
        item => item.id === frameId
    );

    if (!frame) return;

    event.preventDefault();
    event.stopPropagation();

    const grid = document.getElementById(
        "choco-grid-container"
    );

    const gridRect = grid.getBoundingClientRect();

    const cellWidth = gridRect.width / CHOCO_COLS;
    const cellHeight = gridRect.height / CHOCO_ROWS;

    const startX = event.clientX;
    const startY = event.clientY;
    const pointerId = event.pointerId;

    const original = { ...frame };

    // 操作開始前に選択されていたかを記録
    const wasSelected = selectedFrameId === frameId;

    const preview = document.createElement("div");
    preview.className = "choco-frame-preview";

    grid.appendChild(preview);

    let lastX = startX;
    let lastY = startY;

    let hasMoved = false;

    function updatePreview(x, y) {

        const dx = x - startX;
        const dy = y - startY;

        const left = original.col * cellWidth;
        const top = original.row * cellHeight;
        const width = original.width * cellWidth;
        const height = original.height * cellHeight;

        let x1 = left;
        let y1 = top;
        let x2 = left + width;
        let y2 = top + height;

        if (mode === "move") {

            x1 += dx;
            x2 += dx;
            y1 += dy;
            y2 += dy;

        } else {

            if (mode.includes("w")) x1 += dx;
            if (mode.includes("e")) x2 += dx;
            if (mode.includes("n")) y1 += dy;
            if (mode.includes("s")) y2 += dy;

            // 最小サイズは1マス
            if (mode.includes("w")) {
                x1 = Math.min(x1, x2 - cellWidth);
            }

            if (mode.includes("e")) {
                x2 = Math.max(x2, x1 + cellWidth);
            }

            if (mode.includes("n")) {
                y1 = Math.min(y1, y2 - cellHeight);
            }

            if (mode.includes("s")) {
                y2 = Math.max(y2, y1 + cellHeight);
            }
        }

        preview.style.left = `${x1}px`;
        preview.style.top = `${y1}px`;
        preview.style.width = `${x2 - x1}px`;
        preview.style.height = `${y2 - y1}px`;
    }

    function getFinalRect() {

        const colShift = Math.round(
            (lastX - startX) / cellWidth
        );

        const rowShift = Math.round(
            (lastY - startY) / cellHeight
        );

        let left = original.col;
        let top = original.row;
        let right = original.col + original.width;
        let bottom = original.row + original.height;

        if (mode === "move") {

            left += colShift;
            right += colShift;
            top += rowShift;
            bottom += rowShift;

        } else {

            if (mode.includes("w")) left += colShift;
            if (mode.includes("e")) right += colShift;
            if (mode.includes("n")) top += rowShift;
            if (mode.includes("s")) bottom += rowShift;

            // 最小1マスを保証
            left = Math.min(left, right - 1);
            right = Math.max(right, left + 1);
            top = Math.min(top, bottom - 1);
            bottom = Math.max(bottom, top + 1);
        }

        return {
            row: top,
            col: left,
            width: right - left,
            height: bottom - top
        };
    }

    function moveHandler(e) {

        if (e.pointerId !== pointerId) return;

        e.preventDefault();

        lastX = e.clientX;
        lastY = e.clientY;

        if (
            Math.abs(lastX - startX) > 3 ||
            Math.abs(lastY - startY) > 3
        ) {
            hasMoved = true;
        }

        updatePreview(lastX, lastY);
    }

    function cleanup() {

        window.removeEventListener(
            "pointermove", moveHandler
        );

        window.removeEventListener(
            "pointerup", upHandler
        );

        window.removeEventListener(
            "pointercancel", cancelHandler
        );

        preview.remove();
    }

    function upHandler(e) {

        if (e.pointerId !== pointerId) return;

        lastX = e.clientX;
        lastY = e.clientY;

        cleanup();

        if (!hasMoved) {

            // 移動用の領域をタップした場合だけ選択を切り替える
            if (mode === "move") {
                selectedFrameId = wasSelected ? null : frameId;
            } else {
                selectedFrameId = frameId;
            }

            renderChocolate();
            return;
        }

        // ドラッグ操作後は編集対象の枠を選択する
        selectedFrameId = frameId;

        const next = getFinalRect();

        if (!isValidChocoFrameRect(next, frameId)) {
            renderChocolate();
            return;
        }

        const changed =
            next.row !== original.row ||
            next.col !== original.col ||
            next.width !== original.width ||
            next.height !== original.height;

        if (changed) {

            saveChocoHistory();

            frame.row = next.row;
            frame.col = next.col;
            frame.width = next.width;
            frame.height = next.height;

            rebuildChocoBorders();
        }

        renderChocolate();
    }

    function cancelHandler(e) {

        if (e.pointerId !== pointerId) return;

        cleanup();
        renderChocolate();
    }

    // 押した枠を選択
    selectedFrameId = frameId;

    // 編集前の位置にプレビューを表示
    updatePreview(startX, startY);

    window.addEventListener(
        "pointermove", moveHandler,
        { passive: false }
    );

    window.addEventListener(
        "pointerup", upHandler
    );

    window.addEventListener(
        "pointercancel", cancelHandler
    );
}

function selectChocoFrame(r, c) {

    const frame = chocoFrames.find(frame =>
        r >= frame.row &&
        r < frame.row + frame.height &&
        c >= frame.col &&
        c < frame.col + frame.width
    );

    if (!frame) return;

    selectedFrameId = frame.id;

    renderChocolate();
}

function deleteSelectedChocoFrame() {

    if (selectedFrameId === null) return;

    const frameExists = chocoFrames.some(
        frame => frame.id === selectedFrameId
    );

    if (!frameExists) return;

    // 削除前の状態を保存
    saveChocoHistory();

    chocoFrames = chocoFrames.filter(
        frame => frame.id !== selectedFrameId
    );

    selectedFrameId = null;

    rebuildChocoBorders();
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

    
    } else if (data.style === "normal") {

        // 九九の計算①：3段階のヒント
        const a = data.left;
        const b = data.right;

        const hints = [
            `${a}×${b}は、${a}が${b}つ分あるということだよ。`,
            `${a}のだんの九九を、1つずつ思い出してみよう。`,
            `${a}を${b}回たすと、いくつになるかな？`
        ];

        hintStep = Math.min(hintStep + 1, hints.length);

        title.innerText = `ヒント ${hintStep}/${hints.length}`;

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

            if (i === hintStep - 1) {
                item.classList.add("hint-step-current");
            }

            hint.appendChild(item);
        }



    } else if (data.style === "chocolate-multiplication") {

        // かけ算のもんだい②：間違いに応じた3段階ヒント
        const hintGroups = {
            noFrames: [
                "チョコレートのまとまりを見つけてみよう。",
                "まとまりを、長方形の枠でかこめるかな？",
                "1つか2つの枠で、ぜんぶのチョコレートをかこんでみよう。"
            ],

            frameCoverage: [
                "チョコレートのかこみ方を、もう一度見てみよう。",
                "かこまれていないチョコレートはないかな？",
                "枠のたてとよこの数をたしかめよう。枠が1つのときは、使わない式を0×0＝0にしよう。"
            ],

            incomplete: [
                "まだ書いていないところがあるよ。空いているところをさがそう。",
                "まとまりの数を、かけ算の式に書いてみよう。",
                "まとまりが1つのときは、使わない式を0×0＝0にしよう。"
            ],

            multiplication: [
                "かけ算の答えを、もう一度たしかめてみよう。",
                "かけ算の式に書いた数を見て、九九で計算してみよう。",
                "計算した答えと、枠の中のチョコレートの数が同じか、たしかめよう。"
            ],

            formula: [
                "かけ算の式と、チョコレートの枠を見くらべてみよう。",
                "それぞれの枠は、たてに何こ、よこに何こならんでいるかな？",
                "2つのかけ算の式が、それぞれの枠のたてとよこの数に合っているか、たしかめよう。"
            ],

            addition: [
                "2つのかけ算の答えを、たし算に使っているかな？",
                "それぞれのまとまりのチョコレートの数を、たしてみよう。",
                "たし算の答えが、ぜんぶのチョコレートの数と同じになるか、たしかめよう。"
            ],

            default: [
                "チョコレートの枠と計算の式を、もう一度見てみよう。",
                "かこんだまとまりの数を、かけ算で求めよう。", 
                "2つのかけ算の答えをたして、ぜんぶの数を求めよう。"
            ]
        };

        const hints = hintGroups[hintErrorType] || hintGroups.default;

        // ヒントを1段階進める（最大3段階）
        hintStep = Math.min(hintStep + 1, hints.length);

        // タイトルに現在の段階を表示
        title.innerText = `ヒント ${hintStep}/${hints.length}`;

        // 以前のヒントも含めて表示
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

            // 今回追加したヒントを強調
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


/* ==========================================
   全単元共通：テンキーのドラッグ移動
   ========================================== */

function setupDraggableKeypad() {
    const keypad = document.getElementById("custom-keypad");
    const handle = document.getElementById("keypad-drag-handle");

    if (!keypad || !handle) return;

    let dragging = false;
    let pointerId = null;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;

    handle.addEventListener("pointerdown", event => {
        if (event.button !== 0) return;

        event.preventDefault();
        event.stopPropagation();

        const rect = keypad.getBoundingClientRect();

        // 現在の表示位置を記録
        initialLeft = rect.left;
        initialTop = rect.top;
        startX = event.clientX;
        startY = event.clientY;

        // パネル内配置から、自由に動かせる固定配置へ変更
        keypad.style.position = "fixed";
        keypad.style.left = `${rect.left}px`;
        keypad.style.top = `${rect.top}px`;
        keypad.style.bottom = "auto";
        keypad.style.right = "auto";
        keypad.style.transform = "none";
        keypad.style.width = `${rect.width}px`;
        keypad.style.maxWidth = "none";

        keypad.classList.add("keypad-dragged");

        dragging = true;
        pointerId = event.pointerId;

        handle.setPointerCapture(event.pointerId);
    });

    handle.addEventListener("pointermove", event => {
        if (!dragging || event.pointerId !== pointerId) {
            return;
        }

        event.preventDefault();

        const dx = event.clientX - startX;
        const dy = event.clientY - startY;

        const rect = keypad.getBoundingClientRect();

        // 画面の外へ出ないように制限
        const maxLeft = Math.max(
            0,
            window.innerWidth - rect.width
        );

        const maxTop = Math.max(
            0,
            window.innerHeight - rect.height
        );

        const newLeft = Math.max(
            0,
            Math.min(maxLeft, initialLeft + dx)
        );

        const newTop = Math.max(
            0,
            Math.min(maxTop, initialTop + dy)
        );

        keypad.style.left = `${newLeft}px`;
        keypad.style.top = `${newTop}px`;
    });

    const finishDrag = event => {
        if (!dragging || event.pointerId !== pointerId) {
            return;
        }

        dragging = false;
        pointerId = null;

        if (handle.hasPointerCapture(event.pointerId)) {
            handle.releasePointerCapture(event.pointerId);
        }
    };

    handle.addEventListener("pointerup", finishDrag);
    handle.addEventListener("pointercancel", finishDrag);

    // 画面の向きやサイズが変わっても画面内に収める
    window.addEventListener("resize", () => {
        if (!keypad.classList.contains("keypad-dragged")) {
            return;
        }

        const rect = keypad.getBoundingClientRect();

        const maxLeft = Math.max(
            0,
            window.innerWidth - rect.width
        );

        const maxTop = Math.max(
            0,
            window.innerHeight - rect.height
        );

        keypad.style.left =
            `${Math.max(0, Math.min(maxLeft, rect.left))}px`;

        keypad.style.top =
            `${Math.max(0, Math.min(maxTop, rect.top))}px`;
    });
}

// ページ読み込み時に一度だけ設定
setupDraggableKeypad();

    function openKeypad(id, isGridTable = false) {

        // チョコレート問題では、式の入力時に枠の選択を解除
        if (getCurrentProblem().style === "chocolate-multiplication") {
            clearChocoFrameSelection();
        }
        activeInputId = id;

        const keypad = document.getElementById('custom-keypad');
        const inputEl = document.getElementById(id);
        const problemScreen = document.getElementById('problem-screen');

        keypad.style.display = "block";
        problemScreen.classList.add('keypad-open');
        inputEl.focus();

        if (
            !isGridTable &&
            getCurrentProblem().style !== "split-multiplication"&&
            !keypad.classList.contains("keypad-dragged")
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
        `repeat(${rows}, var(--reflection-cell-width))`;

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

        array.appendChild(cell);
    }
}

// 分割位置に、図全体を横切る1本の線を描く
const splitPosition = boundaries[0];

if (
    widths.length === 2 &&
    splitPosition > 0 &&
    splitPosition < columns
) {
    const splitLine = document.createElement("div");
    splitLine.className = "split-reflection-line";

    // 描画後に境界の位置を取得
    requestAnimationFrame(() => {
        const firstCellBelow = array.children[splitPosition * rows];

        if (!firstCellBelow) return;

        splitLine.style.top = `${firstCellBelow.offsetTop - 2}px`;
    });

    array.appendChild(splitLine);
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

                <div class="split-success-actions">
                    <button type="button"
                            id="split-success-retry"
                            class="split-success-next">
                        もう1回チャレンジ
                    </button>

                    <button type="button"
                            id="split-success-back"
                            class="split-success-next">
                        もどる
                    </button>
                </div>

            </div>
        `;

        document.body.appendChild(modal);

        // 同じ問題に再挑戦する
        document.getElementById("split-success-retry")
            .addEventListener("click", function () {

                const data = getCurrentProblem();

                const canRetry =
                    (data.style === "split-multiplication" && splitSolved) ||
                    (data.style === "chocolate-multiplication" && chocoSolved);
                if (!canRetry) {
                    return;
                }

                modal.classList.remove("is-visible");
                modal.setAttribute("aria-hidden", "true");

                // 問題番号は変えず、同じ問題を初期化
                updateDisplay();
            });

        // ホームのメニューに戻る
        document.getElementById("split-success-back")
            .addEventListener("click", function () {

                modal.classList.remove("is-visible");
                modal.setAttribute("aria-hidden", "true");

                splitSolved = false;
                chocoSolved = false;
                showMenu();
            });
    }

    // 新しい問題ではポップアップを非表示
    modal.classList.remove("is-visible");
    modal.setAttribute("aria-hidden", "true");
}



function showSplitNextButton() {

    const modal =
        document.getElementById("split-success-modal");

    const content =
        document.getElementById("split-success-content");

    const retryButton =
        document.getElementById("split-success-retry");

    if (!modal || !content || !retryButton) return;

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


    retryButton.disabled = false;

    // ポップアップを表示
    modal.classList.add("is-visible");
    modal.setAttribute("aria-hidden", "false");

    retryButton.focus();
}

/* ========================================
   かけ算の計算②：正解時の振り返り
   ======================================== */

function createChocolateReflectionVisual() {

    if (chocoFrames.length === 0 ||
        chocoFrames.length > maxChocoFrames
    ) {
        return null;
    }

    const rows = currentChocoMap.length;
    const cols = currentChocoMap[0].length;

    const colors = ["#79c7ec", "#a6d974"];

    const wrapper = document.createElement("div");
    wrapper.className = "split-reflection";

    // 分け方の説明
    const description = document.createElement("p");
    description.className = "split-reflection-description";
    description.textContent =
        "自分の分け方をふり返ってみよう！";

    wrapper.appendChild(description);

    // 児童が入力した2つのかけ算
    const formulas = [];

    for (let i = 0; i < 2; i++) {
        formulas.push({
            a: Number(document.getElementById(`c_${i}_0`).value),
            b: Number(document.getElementById(`c_${i}_1`).value),
            result: Number(document.getElementById(`c_${i}_2`).value)
        });
    }

    // 入力した式と枠を対応付ける
    const remainingFrames = [...chocoFrames];

    const orderedFrames = formulas.map(formula => {

        // 0×0＝0には対応する枠がない
        if (
            chocoFrames.length === 1 &&
            formula.a === 0 &&
            formula.b === 0 &&
            formula.result === 0
        ) {
            return null;
        }

        const index = remainingFrames.findIndex(frame =>
            (formula.a === frame.width &&
             formula.b === frame.height) ||
            (formula.a === frame.height &&
             formula.b === frame.width)
        );

        if (index === -1) return null;

        return remainingFrames.splice(index, 1)[0];
    });

    // 0×0＝0以外の式には対応する枠が必要
    if (
        orderedFrames.some((frame, index) =>
            !frame &&
            !(
                chocoFrames.length === 1 &&
                formulas[index].a === 0 &&
                formulas[index].b === 0 &&
                formulas[index].result === 0
            )
        ) ||
        remainingFrames.length !== 0
    ) {
        return null;
    }

    // チョコレートのアレイ図
    const array = document.createElement("div");
    array.className = "choco-reflection-array";

    array.style.gridTemplateColumns =
        `repeat(${cols}, minmax(0, 1fr))`;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {

            const cell = document.createElement("div");
            cell.className = "choco-reflection-cell";

            const frameIndex = orderedFrames.findIndex(frame =>
                frame !== null &&
                r >= frame.row &&
                r < frame.row + frame.height &&
                c >= frame.col &&
                c < frame.col + frame.width
            );

            if (frameIndex !== -1) {
                cell.style.backgroundColor = colors[frameIndex];
            }

            if (currentChocoMap[r][c] === 1) {

                const dot = document.createElement("div");
                dot.className = "choco-reflection-dot";

                cell.appendChild(dot);
            }

            array.appendChild(cell);
        }
    }

    // 囲んだ2つの枠を重ねて表示
    orderedFrames.forEach((frame, index) => {

         // 枠が存在しない場合は描画しない
        if (!frame) return;

        const border = document.createElement("div");
        border.className = "choco-reflection-frame";

        border.style.borderColor = colors[index];

        border.style.left =
            `${frame.col / cols * 100}%`;

        border.style.top =
            `${frame.row / rows * 100}%`;

        border.style.width =
            `${frame.width / cols * 100}%`;

        border.style.height =
            `${frame.height / rows * 100}%`;

        array.appendChild(border);
    });

    wrapper.appendChild(array);

    // 2つのかけ算の式
    const formulaContainer = document.createElement("div");
    formulaContainer.className = "split-reflection-formulas";

    formulas.forEach((formula, index) => {

        const row = document.createElement("div");
        row.className = "split-reflection-formula";

        row.style.borderLeft =
            `7px solid ${
                orderedFrames[index]
                ? colors[index]
                : "#cccccc"
            }`;

        const label = document.createElement("span");
        label.className = "split-reflection-formula-label";
        label.textContent = `${index + 1}つめ`;

        const expression = document.createElement("strong");
        expression.textContent =
            `${formula.a} × ${formula.b} = ${formula.result}`;

        row.appendChild(label);
        row.appendChild(expression);

        formulaContainer.appendChild(row);
    });

    wrapper.appendChild(formulaContainer);

    // 児童が入力したたし算
    const add0 =
        document.getElementById("choco_add_0").value;

    const add1 =
        document.getElementById("choco_add_1").value;

    const answer =
        document.getElementById("vAns").value;

    const addition = document.createElement("div");
    addition.className = "split-reflection-addition";

    addition.textContent =
        `${add0} + ${add1} = ${answer}`;

    wrapper.appendChild(addition);

    // 最後のメッセージ
    const message = document.createElement("p");
    message.className = "split-reflection-message";

    message.textContent =
        "九九を使って、じょうずに計算できたね！";

    wrapper.appendChild(message);

    return wrapper;
}

/* ========================================
   かけ算の計算②：正解ポップアップ
   ======================================== */

function showChocolateSuccessModal() {

    const modal =
        document.getElementById("split-success-modal");

    const content =
        document.getElementById("split-success-content");

    const retryButton =
        document.getElementById("split-success-retry");

    if (!modal || !content || !retryButton) return;

    // 前の振り返り内容を削除
    content.replaceChildren();

    // 自分が囲んだチョコレートと計算式を表示
    const reflectionVisual =
        createChocolateReflectionVisual();

    if (reflectionVisual) {
        content.appendChild(reflectionVisual);
    } else {
        const message = document.createElement("p");
        message.textContent =
            "ほかの分け方も考えてみよう！";

        content.appendChild(message);
    }

    retryButton.disabled = false;

    modal.classList.add("is-visible");
    modal.setAttribute("aria-hidden", "false");

    retryButton.focus();
}
    
function checkAnswer() {
    const data = getCurrentProblem();
    // 正解後の重複した答え合わせを防ぐ
    if (
        (data.style === "split-multiplication" && splitSolved) ||
        (data.style === "chocolate-multiplication" && chocoSolved)
    ) {
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

        if (!isValueCorrect) {
            errorType = getChocolateErrorType();
        }
    }

    // 間違いの種類が変わったらヒントを最初から表示
    if (
        data.style === "split-multiplication" ||
        data.style === "chocolate-multiplication"
    ) {
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

        } else if (data.style === "chocolate-multiplication") {

            chocoSolved = true;

            res.innerText = "せいかい！";

            showChocolateSuccessModal();

        } else {
            res.innerText = "せいかい！";
        }

        res.style.color = "red";

        hintBtn.style.display = "none";
        hintDisplay.style.display = "none";

        hintErrorType = null;
        hintStep = 0;

        if (
            data.style !== "split-multiplication" &&
            data.style !== "chocolate-multiplication"
        ) {

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


function getChocolateErrorType() {

    // ① 枠が1つまたは2つあるか
    if (
        chocoFrames.length === 0 ||
        chocoFrames.length > maxChocoFrames
    ) {
        return "noFrames";
    }

    // ② 枠がすべてのチョコレートを正しく囲んでいるか
    let totalChoco = 0;
    let totalLocked = 0;

    for (let r = 0; r < CHOCO_ROWS; r++) {
        for (let c = 0; c < CHOCO_COLS; c++) {
            if (currentChocoMap[r][c] === 1) {
                totalChoco++;

                if (lockedCells[r][c]) {
                    totalLocked++;
                }
            }
        }
    }

    const frameTotal = chocoFrames.reduce(
        (sum, frame) => sum + frame.width * frame.height,
        0
    );

    const invalidFrame = chocoFrames.some(frame => {
        for (let r = frame.row; r < frame.row + frame.height; r++) {
            for (let c = frame.col; c < frame.col + frame.width; c++) {
                if (currentChocoMap[r]?.[c] !== 1) {
                    return true;
                }
            }
        }
        return false;
    });

    if (
        totalLocked !== totalChoco ||
        frameTotal !== totalChoco ||
        invalidFrame
    ) {
        return "frameCoverage";
    }

    // ③ 計算式を取得する
    const readNumber = id => {
        const input = document.getElementById(id);
        if (!input) return null;

        const value = input.value.trim();
        if (!/^\d+$/.test(value)) return null;

        return Number(value);
    };

    const formulas = [];

    for (let i = 0; i < 2; i++) {
        const a = readNumber(`c_${i}_0`);
        const b = readNumber(`c_${i}_1`);
        const result = readNumber(`c_${i}_2`);

        if (a === null || b === null || result === null) {
            return "incomplete";
        }

        formulas.push({ a, b, result });
    }

    const add0 = readNumber("choco_add_0");
    const add1 = readNumber("choco_add_1");
    const answer = readNumber("vAns");

    if (add0 === null || add1 === null || answer === null) {
        return "incomplete";
    }

    // ④ かけ算の計算を確認
    for (const formula of formulas) {

        // 枠が1つの場合、使わない式は0×0＝0を許容
        const isUnusedFormula =
            chocoFrames.length === 1 &&
            formula.a === 0 &&
            formula.b === 0 &&
            formula.result === 0;

        if (isUnusedFormula) {
            continue;
        }

        if (
            formula.a <= 0 ||
            formula.b <= 0 ||
            formula.a * formula.b !== formula.result
        ) {
            return "multiplication";
        }
    }

    // ⑤ かけ算の式と枠の対応を確認
    const remainingFrames = [...chocoFrames];

    for (const formula of formulas) {

        // 枠が1つの場合、0×0＝0は照合しない
        if (
            chocoFrames.length === 1 &&
            formula.a === 0 &&
            formula.b === 0 &&
            formula.result === 0
        ) {
            continue;
        }

        const index = remainingFrames.findIndex(frame =>
            (formula.a === frame.height &&
             formula.b === frame.width) ||
            (formula.a === frame.width &&
             formula.b === frame.height)
        );

        if (index === -1) {
            return "formula";
        }

        remainingFrames.splice(index, 1);
    }

    // すべての枠が計算式に対応しているか確認
    if (remainingFrames.length !== 0) {
        return "formula";
    }
    // ⑥ たし算の式を確認
    const results = formulas
        .map(formula => formula.result)
        .sort((a, b) => a - b);

    const addends = [add0, add1]
        .sort((a, b) => a - b);

    if (
        results[0] !== addends[0] ||
        results[1] !== addends[1] ||
        add0 + add1 !== answer ||
        answer !== totalChoco
    ) {
        return "addition";
    }

    return null;
}


function checkChocolateAnswer(data) {

    // 数字が正しく入力されているか確認する
    function getNumber(id) {
        const element = document.getElementById(id);
        if (!element) return null;

        const value = element.value.trim();

        if (!/^\d+$/.test(value)) {
            return null;
        }

        return Number(value);
    }

    // 枠が1つまたは2つ作成されているか
    if (
        chocoFrames.length === 0 ||
        chocoFrames.length > maxChocoFrames
    ) {
        return false;
    }

    // かけ算の式を取得する
    const formulas = [];

    for (let i = 0; i < 2; i++) {

        const a = getNumber(`c_${i}_0`);
        const b = getNumber(`c_${i}_1`);
        const result = getNumber(`c_${i}_2`);

       // 未入力は不正解
        if (
            a === null || b === null || result === null
        ) {
            return false;
        }


        // 枠が1つの場合、使わない式は0×0＝0を許容
        const isUnusedFormula =
            chocoFrames.length === 1 &&
            a === 0 &&
            b === 0 &&
            result === 0;

        // それ以外の0を含む式は不正解
        if (!isUnusedFormula && (a <= 0 || b <= 0)) {
            return false;
        }

        // かけ算の計算結果が正しいか
        if (a * b !== result) {
            return false;
        }

        formulas.push({ a, b, result });
    }

    // たし算の式を取得する
    const add0 = getNumber("choco_add_0");
    const add1 = getNumber("choco_add_1");
    const answer = getNumber("vAns");

    if (
        add0 === null ||
        add1 === null ||
        answer === null
    ) {
        return false;
    }

    // たし算の計算結果が正しいか
    if (add0 + add1 !== answer) {
        return false;
    }

    // かけ算で求めた2つの個数と、
    // たし算で使った2つの個数が対応しているか
    const multiplicationResults = formulas
        .map(formula => formula.result)
        .sort((a, b) => a - b);

    const additionValues = [add0, add1]
        .sort((a, b) => a - b);

    if (
        multiplicationResults[0] !== additionValues[0] ||
        multiplicationResults[1] !== additionValues[1]
    ) {
        return false;
    }

    // チョコレートの総数と、
    // 枠で囲まれたチョコレートの数を確認する
    let totalChoco = 0;
    let totalLocked = 0;

    for (let r = 0; r < CHOCO_ROWS; r++) {
        for (let c = 0; c < CHOCO_COLS; c++) {

            if (currentChocoMap[r][c] === 1) {
                totalChoco++;

                if (lockedCells[r][c]) {
                    totalLocked++;
                }
            }
        }
    }

    // すべてのチョコレートが囲まれているか
    if (totalLocked !== totalChoco) {
        return false;
    }

    // 各枠がチョコレートだけを囲んでいるか確認する
    for (const frame of chocoFrames) {

        for (let r = frame.row; r < frame.row + frame.height; r++) {
            for (let c = frame.col; c < frame.col + frame.width; c++) {

                if (currentChocoMap[r]?.[c] !== 1) {
                    return false;
                }
            }
        }
    }

    // 2つの枠の面積が総数と一致するか
    const frameTotal = chocoFrames.reduce(
        (sum, frame) => sum + frame.width * frame.height,
        0
    );

    if (frameTotal !== totalChoco) {
        return false;
    }

    // かけ算の式と枠の縦・横を照合する
    const remainingFrames = [...chocoFrames];

    for (const formula of formulas) {

         // 枠が1つの場合、0×0＝0には対応する枠がない
        if (
            chocoFrames.length === 1 &&
            formula.a === 0 &&
            formula.b === 0 &&
            formula.result === 0
        ) {
            continue;
        }

        const index = remainingFrames.findIndex(frame => {

            const height = frame.height;
            const width = frame.width;

            return (
                (formula.a === height && formula.b === width) ||
                (formula.a === width && formula.b === height)
            );
        });

        // 対応する枠が見つからない
        if (index === -1) {
            return false;
        }

        // 同じ枠を二重に使用しない
        remainingFrames.splice(index, 1);
    }

    // 最後に全体の答えを確認する
    return (
        remainingFrames.length === 0 &&
        answer === totalChoco
    );
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

     // 九九の計算①は、単元を開くたびに10問を抽選
    if (number === 1) {
        unitData[0].problems = createRandomKukuProblems();
    }

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

    // 九九の計算①は再挑戦時に問題を再抽選
    if (currentUnit === 1) {
        unitData[0].problems = createRandomKukuProblems();
    }


    mistakeCount = new Array(getCurrentUnit().problems.length).fill(0);

    document.getElementById("screen-result").style.display = "none";
    document.getElementById("problem-screen").style.display = "block";

    updateDisplay();

}