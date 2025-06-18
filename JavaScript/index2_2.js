document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("form");
    const attention = document.querySelectorAll(".attention");
    const firstName = document.querySelector(".firstName");
    const lastName = document.querySelector(".lastName");
    const email = document.querySelector(".email");
    const textarea = document.querySelector(".textarea");
    const scales = document.querySelector(".scales");

    // テキスト入力欄のバリデーションチェック
    function checkInput() {
        const inputList = document.querySelectorAll(".input");
        console.log(inputList);
        for (let input of inputList) {
            console.log(inputList);
            for (let i = 0; i < attention.length; i++) {
                console.log(attention[i]);
                if (input.value == "") {

                    attention[i].style.visibility = 'visible';
                    console.log(attention[i]);
                }
            }
        }
    }

    function sendEmail() {
        console.log("返信")
    }

    form.addEventListener("submit", (e) => {
        console.log("hi");
        checkInput();
        e.preventDefault();
        sendEmail();
    });

});