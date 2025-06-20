// - ※ フォームを入力し、送信に成功すると成功のメッセージが表示されます。

// - ※ 以下の場合、フォーム検証メッセージを受け取る

// -    - 必須フィールドの入力漏れ

// -    - メールアドレスが正しくフォーマットされていない

// - ※ キーボードだけでフォームを入力する

// - ※ 入力、エラーメッセージ、成功メッセージをスクリーンリーダーに表示する

// - ※ デバイスの画面サイズに応じて、インターフェイスの最適なレイアウトを表示する

// - ※ ページ上のすべてのインタラクティブ要素のホバーとフォーカスの状態を見る


document.addEventListener("DOMContentLoaded", () => {

    // a. checkboxにチェックが付かない限りsubmitは動作しない。
    // a-2.チェックボックス下部にエラーメッセージ表示

    // b. チェックでsubmit動作可能

    // a. b. ともに動作確認ok。終了

    // c. バリデーションチェック。 各inputが空欄ならエラーメッセージ表示。


    // 3. message sentをアラートで知らせる

    const form = document.getElementById("form");
    const scales = document.getElementById("scales");
    const submit = document.getElementById("submit");

    // 各入力欄
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    let radios = document.getElementsByName("row");
    const message = document.getElementById("message");

    // エラーメッセージ
    const attention = document.querySelectorAll(".attention");
    const attnFname = document.querySelector(".fname");
    const attnLname = document.querySelector(".lname");
    const attnEmail = document.querySelector(".email");
    const attnRadios = document.querySelector(".radios");
    const attnMessage = document.querySelector(".message");
    const attnScales = document.querySelector(".scales");

    // console.log(attnFname);



    // input validation
    const validateInputs = () => {

        const firstNameValue = firstName.value;
        const lastNameValue = lastName.value;
        const emailValue = email.value;
        const messageValue = message.value;
        console.log(messageValue);

        // firstName validation
        if (firstNameValue.trim() == "" || firstNameValue.trim() == null) {
            attnFname.style.visibility = 'visible';
            firstName.style.border = "3px solid red"
        }
        else {
            attnFname.style.visibility = "hidden";
        }

        // lastName validation
        if (lastNameValue.trim() == "" || lastNameValue.trim() == null) {
            attnLname.style.visibility = 'visible';
            lastName.style.border = "3px solid red"
        }
        else {
            attnEmail.style.visibility = "hidden";
        }

        // email validation
        if (emailValue.trim() == "" || emailValue.trim() == null) {
            attnEmail.style.visibility = 'visible';
            email.style.border = "3px solid red"
        }
        else {
            attnEmail.style.visibility = "hidden";
        }

        // message validation 
        if (messageValue.trim() == "" || messageValue.trim() == null) {
            attnMessage.style.visibility = 'visible';
            message.style.border = "3px solid red"
        }
        else {
            attnMessage.style.visibility = "hidden";
        }

    }// end of validateInputs


    // radios validation
    function checkRadio() {

        let radioChecked = false;

        for (let i = 0; i < radios.length; i++) {

            if (radios[i].checked) {
                radioChecked = true;
            }
        }

        if (!radioChecked) {
            attnRadios.style.visibility = "visible";
        }
    }


    // checkBoxにチェックが入るとattnScalesのvisibilityをhiddenにする。
    function checkAgree() {
        scales.addEventListener("change", () => {
            if (scales.checked) {
                attnScales.style.visibility = "hidden";
                console.log("disabled off");
            }
        });
    }
    checkAgree();


    // clickイベント
    submit.addEventListener("click", (e) => {
        console.log("click");

        // checkBoxのチェック判定 - OK
        if (scales.checked) {
            validateInputs();
            checkRadio();
            alert("Message Sent! Thanks for completing the form. We'll be in touch soon!");
        }
        // checkBoxのチェック判定 - NG
        else if (!scales.checked) {
            attnScales.style.visibility = 'visible';
            validateInputs();
            checkRadio();
            e.preventDefault(); // フォームの送信などを防ぐ
        }

    });

});

