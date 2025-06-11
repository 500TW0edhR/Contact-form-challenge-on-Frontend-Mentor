window.addEventListener("DOMContentLoaded", () => {
    
    const caution = document.querySelectorAll(".caution");
    const radios = document.getElementsByName("row");
    const rows = document.querySelectorAll(".row");

    // テキスト入力欄のバリデーションチェック
    function checkText() {

        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;

        if (firstName === "" || firstName === null) {
            caution[0].textContent = "※ 必須事項です"
        }

        if (lastName === "" || lastName === null) {
            caution[1].textContent = "※ 必須事項かもね？"
        }

        if (email === "" || email === null) {
            caution[2].textContent = "※ 必須事項だと思うよ？"
        }
    }

    // ラジオボタンのクリックイベント
    for (let i = 0; i < rows.length; i++) {
        rows[i].addEventListener('click', () => {
            
            for (let j = 0; j < rows.length; j++) {
                rows[j].classList.remove('bgc');
            }
            rows[i].classList.add('bgc');
        });
    }

    // ラジオボタンのバリデーションチェック
    function checkRadio() {

        let radioChecked = false;

        for (let i = 0; i < radios.length; i++) {

            if (radios[i].checked) {
                radioChecked = true;
            }
        }

        if (!radioChecked) {
            caution[3].textContent = "※ どちらか1つを選んでください";
        }
    }


    const btn = document.querySelector("input[type='submit']");

    btn.addEventListener("click", () => {

        console.log("btn_ok");
        checkText();
        checkRadio();
    });
});

function checkBox() {
    const checkbox = document.getElementById("scales");
    const submit = document.getElementById("submit");
    let isChecked = false;
    
    console.log(checkbox.checked);

    if (checkbox.checked) {

        isChecked = true;
        submit.disabled = false;
        console.log("ok");
        console.log(submit.disabled)
    }
    else {
        // isChecked = false;
        submit.disabled = true;
    }
}

