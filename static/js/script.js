let uploadBtn = document.querySelector('button.upload'),
    fileInput = document.querySelector('.head input'),
    cardContainer = document.querySelector('.cards-container'),
    mergeBtn = document.querySelector('.merge'),
    downloadBtn = document.querySelector('.downlaod'),
    layout = document.querySelector('.layout');
let src_pre = '';

uploadBtn.addEventListener('click', _ => fileInput.click());

fileInput.addEventListener('input', _ => {
    layout.classList.add('active');
    let file = fileInput.files[0];
    if (file && file.type == 'application/pdf') {
        let reader = new FileReader();
        reader.onload = _ => {
            let url = reader.result;
            console.log(file)
            addCardToCardContainer(file.name.length > 25 ? `${file.name.split('').splice(0, 25).join('')}..` : file.name, url);
            fileInput.value = '';
            layout.classList.remove('active');
            checkEmpty();
        }
        reader.readAsDataURL(file);
    }
});

mergeBtn.addEventListener('click', mergePDFS);

function addCardToCardContainer(fileName, code) {
    cardContainer.innerHTML += `
                            <div class="card" code="${code}">
                                <p class="name"><span class="material-symbols-outlined">description</span>${fileName}</p>
                                <button class="delete">delete</button>
                            </div>
                        `;
    activateDeleteCard();
}

function activateDeleteCard() {
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.querySelector('.delete').addEventListener('click', e => {
            e.target.parentNode.remove();
            downloadBtn.classList.contains('inactive') ? null : downloadBtn.classList.add('inactive');
            checkEmpty();
        });
    });
}

function mergePDFS() {
    let filesCode = [],
        cards = document.querySelectorAll('.card');
    cards.forEach(card => filesCode.push(card.getAttribute('code')));
    sendDataToSurver(filesCode);
}


function downloadMergedFile(src) {
    if (src_pre != src) {
        src_pre = src;
        let link = document.createElement('a'),
            lenght = src.split('/').lenght;
        link.href = src;
        link.download = src.split('/')[lenght - 1];
        link.click();
    }
}

function checkEmpty() {
    if (document.querySelectorAll('.card').length == 0) {
        downloadBtn.classList.add('inactive');
        mergeBtn.classList.add('inactive');
    } else {
        mergeBtn.classList.remove('inactive');
    }
}

function sendDataToSurver(filesCode) {
    layout.classList.add('active');
    fetch(`${window.origin}/request`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ "codes": filesCode }),
        cache: 'no-cache',
        headers: new Headers({
            'content-type': "application/json",
        }),
    }).then(response => {
        if (response.status !== 200) {
            console.log(`Response status was not 200: ${response.status}`);
            return;
        }
        response.json().then(data => {
            setTimeout(_ => {
                layout.classList.remove('active');
                downloadBtn.classList.contains('inactive') ? downloadBtn.classList.remove('inactive') : null;
                downloadBtn.addEventListener('click', _ => {
                    downloadMergedFile(data['path']);
                    setTimeout(_ => downloadBtn.classList.contains('inactive') ? null : downloadBtn.classList.add('inactive'), 1000);
                });
            }, 5000);
        });
    });
}


