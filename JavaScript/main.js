/* - フォームを入力し、送信に成功すると成功のメッセージが表示されます。
- 以下の場合、フォーム検証メッセージを受け取る
- 必須フィールドの入力漏れ
- メールアドレスが正しくフォーマットされていない
- キーボードだけでフォームを入力する
- 入力、エラーメッセージ、成功メッセージをスクリーンリーダーに表示する
- デバイスの画面サイズに応じて、インターフェイスの最適なレイアウトを表示する
- ページ上のすべてのインタラクティブ要素のホバーとフォーカスの状態を見る */

// screen reader javascript 書き方
// https://www.google.com/search?q=screen+reader+javascript+%E6%9B%B8%E3%81%8D%E6%96%B9&sca_esv=7a77ebcaa46a83bd&ei=0L6VZ5X6J_Xh2roP-9uAmA4&ved=0ahUKEwiVou32ypKLAxX1sFYBHfstAOMQ4dUDCBA&uact=5&oq=screen+reader+javascript+%E6%9B%B8%E3%81%8D%E6%96%B9&gs_lp=Egxnd3Mtd2l6LXNlcnAiInNjcmVlbiByZWFkZXIgamF2YXNjcmlwdCDmm7jjgY3mlrkyBRAAGO8FMggQABiABBiiBDIFEAAY7wVI590BUNIcWKTbAXAEeAGQAQCYAZEToAH5V6oBDjAuMjcuNy43LTEuMS4xuAEDyAEA-AEB-AECmAIcoALmKMICChAAGLADGNYEGEfCAggQABiiBBiJBcICBRAAGIAEwgIEEAAYHsICBRAhGKABwgIEECEYFcICBhAhGAoYKpgDAIgGAZAGCpIHCjQuMTkuNC43LTGgB-9P&sclient=gws-wiz-serp

// 【アクセシビリティ】WAI-ARIAを完全に理解した。
// https://qiita.com/degudegu2510/items/dd072655880adbe3f58c

// aria-current
// https://www.google.com/search?q=aria-current&sourceid=chrome&ie=UTF-8

// how to writing WAI-ARIA
// https://www.youtube.com/results?search_query=how+to+writing+WAI-ARIA

// ラジオボタンの選択中止後のチェック解除をする
window.addEventListener("DOMContentLoaded", () => {

    const radioError = document.querySelectorAll(".radioError");
    const rows = document.querySelectorAll(".row");
    let radios = document.getElementsByName("row");
    const checkBox = document.getElementById("scales");
    const btn = document.querySelector('input[type="submit"]');
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");

    // ラジオボタンをクリックでカラーチェンジ
    function radioClick() {

        for (let i = 0; i < rows.length; i++) {

            rows[i].addEventListener("change", () => {

                for (let j = 0; j < rows.length; j++) {
                    rows[j].classList.remove("bgc");
                }
                rows[i].classList.add("bgc");
            });
        }
    }
    radioClick();


    // ラジオボタンのバリデーションチェック + errorMessage
    function radioChecked() {

        let isChecked = false;

        for (let i = 0; i < radios.length; i++) {

            if (radios[i].checked) {
                isChecked = true;
                radioError[0].textContent = "";
            }

            if (!isChecked) {
                radioError[0].textContent = "Please select a query type";
                // console.log("どちらかにチェックを入れてください。");
            }
        }
    }


    // checkBoxにチェックをするとbtn.disabled解除
    function checkAgree() {

        checkBox.addEventListener("change", () => {

            if (checkBox.checked) {
                btn.disabled = false;
            }
            else {
                btn.disabled = true;
            }

        });
    }
    checkAgree();


    // submitのクリックイベント
    btn.addEventListener("click", (e) => {
        // submitの動きを停止
        e.preventDefault();
        // console.log(e);    
        
        radioChecked();
        validateInputs();
        
    }); // end of btn.addEventListener


    // validation error message
    const setError = (e, message) => {
        
        const inputGroup = e.parentElement;
        const errorDisplay = inputGroup.querySelector(".error");
        console.log(inputGroup);
        errorDisplay.innerText = message;
    }


    // validation success message
    const setSuccess = e => {
        // console.log(e);
        const inputGroup = e.parentElement;
        const errorDisplay = inputGroup.querySelector(".error");
        console.log(inputGroup);
        errorDisplay.innerText = "";
    }


    // input.validation
    const validateInputs = () => {

        const firstNameValue = firstName.value;
        const lastNameValue = lastName.value;
        const emailValue = email.value;

        // firstName validation
        if (firstNameValue.trim() == "" || firstNameValue.trim() == null) {
            setError(firstName, "This field is required");
        }
        else {
            setSuccess(firstName);
        }

        // lastName validation
        if (lastNameValue.trim() == "" || lastNameValue.trim() == null) {
            setError(lastName, "This field is required");
        }
        else {
            setSuccess(lastName);
        }

        // email validation
        if (emailValue.trim() == "" || emailValue.trim() == null) {
            setError(email, "This field is required");
        }
        else {
            setSuccess(email);
        }

    } // end of validateInputs
});


