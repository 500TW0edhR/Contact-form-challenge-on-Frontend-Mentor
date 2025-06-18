// - フォームを入力し、送信に成功すると成功のメッセージが表示されます。

// - 以下の場合、フォーム検証メッセージを受け取る

// - 必須フィールドの入力漏れ

// - メールアドレスが正しくフォーマットされていない

// - キーボードだけでフォームを入力する

// - 入力、エラーメッセージ、成功メッセージをスクリーンリーダーに表示する

// - デバイスの画面サイズに応じて、インターフェイスの最適なレイアウトを表示する

// - ページ上のすべてのインタラクティブ要素のホバーとフォーカスの状態を見る


document.addEventListener("DOMContentLoaded", () => {
    // フォーム要素と送信ボタンを取得
    const form = document.getElementById("form");
    const submitButton = document.getElementById("submit");

    // 全ての必須入力フィールド（text, email, textarea）を取得
    const textInputs = document.querySelectorAll('#firstName, #lastName, #email, #message');

    // ラジオボタンのグループとチェックボックスを取得
    const queryTypeRadios = document.querySelectorAll('input[name="row"]');
    const consentCheckbox = document.getElementById('scales');

    // ラジオボタンとチェックボックスに対応するattentionスパンを直接取得
    const queryTypeAttention = document.querySelector('#chooseOne .attention');
    const consentAttention = document.querySelector('.checkbox + .attention');

    /**
     * テキスト/メール/テキストエリアの入力フィールドのバリデーションを行う関数
     * @param {HTMLInputElement|HTMLTextAreaElement} inputElement - バリデーション対象の要素
     * @returns {boolean} - 有効な場合は true、無効な場合は false
     */
    function validateTextInput(inputElement) {
        // inputElementの直後にあるspan.attention要素を取得
        const attentionSpan = inputElement.nextElementSibling;
        const value = inputElement.value.trim(); // 前後の空白を削除した値

        // HTML標準のバリデーションルール（required, minlength, maxlength, pattern）を総合的にチェック
        if (!inputElement.checkValidity() || value === '') {
            if (attentionSpan && attentionSpan.classList.contains('attention')) {
                // エラーメッセージの内容を動的に設定（必要に応じて）
                if (inputElement.validity.valueMissing) {
                    attentionSpan.textContent = 'This field is required';
                } else if (inputElement.validity.patternMismatch) {
                    attentionSpan.textContent = 'Please enter a valid email address';
                } else if (inputElement.validity.tooShort) {
                    attentionSpan.textContent = `Please enter at least ${inputElement.minLength} characters.`;
                } else if (inputElement.validity.tooLong) {
                    attentionSpan.textContent = `Please enter no more than ${inputElement.maxLength} characters.`;
                }
                attentionSpan.style.visibility = 'visible';
            }
            // エラー表示時にinputのボーダーを赤くするクラスを追加（CSSで定義）
            inputElement.classList.add('error-border');
            return false;
        } else {
            if (attentionSpan && attentionSpan.classList.contains('attention')) {
                attentionSpan.style.visibility = 'hidden';
            }
            // エラーがない場合、赤ボーダーを削除
            inputElement.classList.remove('error-border');
            return true;
        }
    }

    /**
     * ラジオボタンのバリデーションを行う関数
     * @param {NodeList} radioGroup - ラジオボタンのNodeList (例: input[name="row"])
     * @param {HTMLElement} attentionSpan - 対応するattention span要素
     * @returns {boolean} - 有効な場合は true、無効な場合は false
     */
    function validateRadioGroup(radioGroup, attentionSpan) {
        let isChecked = false;
        for (const radio of radioGroup) {
            if (radio.checked) {
                isChecked = true;
                break;
            }
        }

        if (!isChecked) {
            attentionSpan.style.visibility = 'visible';
            return false;
        } else {
            attentionSpan.style.visibility = 'hidden';
            return true;
        }
    }

    /**
     * チェックボックスのバリデーションを行う関数
     * @param {HTMLInputElement} checkboxElement - チェックボックス要素
     * @param {HTMLElement} attentionSpan - 対応するattention span要素
     * @returns {boolean} - 有効な場合は true、無効な場合は false
     */
    function validateCheckbox(checkboxElement, attentionSpan) {
        if (!checkboxElement.checked) {
            attentionSpan.style.visibility = 'visible';
            return false;
        } else {
            attentionSpan.style.visibility = 'hidden';
            return true;
        }
    }

    /**
     * Submitボタンのdisabled状態を更新する関数
     * 同意チェックボックスがチェックされているかどうかに基づいてボタンを有効/無効にする
     */
    function updateSubmitButtonState() {
        submitButton.disabled = !consentCheckbox.checked;
    }

    // --- イベントリスナーの登録 ---

    // **テキスト入力フィールド**に 'input' および 'blur' イベントリスナーを追加
    // リアルタイムでのバリデーションと、フォーカスが外れた際の最終チェック
    textInputs.forEach(input => {
        input.addEventListener('input', () => {
            validateTextInput(input);
        });
        input.addEventListener('blur', () => {
            validateTextInput(input);
        });
    });

    // **ラジオボタン**に 'change' イベントリスナーを追加
    // 選択状態が変更されたらバリデーション
    queryTypeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            validateRadioGroup(queryTypeRadios, queryTypeAttention);
        });
    });

    // **同意チェックボックス**に 'change' イベントリスナーを追加
    // チェック状態が変更されたらバリデーション、そしてSubmitボタンの状態を更新
    consentCheckbox.addEventListener('change', () => {
        validateCheckbox(consentCheckbox, consentAttention);
        updateSubmitButtonState(); // チェックボックスが変更されたらボタンの状態を更新
    });

    // ページロード時にSubmitボタンの初期状態を設定
    updateSubmitButtonState();

    // **フォームの 'submit' イベントリスナー**
    // フォーム送信時に全体のバリデーションを実行し、成功した場合のみ送信を許可
    form.addEventListener("submit", (event) => {
        // デフォルトのフォーム送信動作を阻止
        event.preventDefault();

        let isValidForm = true; // フォーム全体のバリデーション状態を保持

        // 各フィールドのバリデーションを実行し、フォーム全体の有効性をチェック
        // ※ ここで各バリデーション関数を呼び出すことで、全てのエラーメッセージが表示される
        if (!validateTextInput(document.getElementById('firstName'))) isValidForm = false;
        if (!validateTextInput(document.getElementById('lastName'))) isValidForm = false;
        if (!validateTextInput(document.getElementById('email'))) isValidForm = false;
        if (!validateTextInput(document.getElementById('message'))) isValidForm = false; // messageも必須のため追加

        if (!validateRadioGroup(queryTypeRadios, queryTypeAttention)) isValidForm = false;
        if (!validateCheckbox(consentCheckbox, consentAttention)) isValidForm = false; // Submit時にもチェック

        // 全てのバリデーションが成功した場合
        if (isValidForm) {
            // ここにフォーム送信成功時の処理を記述します。
            // 例: アラートを表示してユーザーに成功を伝える
            alert("Message Sent! Thanks for completing the form. We'll be in touch soon!");

            // フォームをリセット（必要であれば）
            form.reset();

            // フォームリセット後、全てのエラーメッセージとエラーボーダーを非表示に戻す
            document.querySelectorAll('.attention').forEach(span => {
                span.style.visibility = 'hidden';
            });
            document.querySelectorAll('input, textarea').forEach(el => {
                el.classList.remove('error-border');
            });
            // リセット後もSubmitボタンの状態を更新
            updateSubmitButtonState();

            // 実際のアプリケーションでは、ここでサーバーへのデータ送信（例: fetch API）を行います
            // console.log("Form submitted successfully!");

        } else {
            // バリデーションに失敗した場合、ユーザーにエラーを通知
            // (エラーメッセージは既に表示されているため、追加のアラートは通常不要ですが、
            // 全体の失敗を知らせるために利用しても良いでしょう)
            // alert("Please correct the errors in the form before submitting.");
        }
    });







    // const form = document.getElementById("form");
    // const attention = document.querySelectorAll(".attention");

    // const fullName = document.getElementById("fullName")
    // const firstName = document.getElementById("firstName");
    // const lastName = document.getElementById("lastName");
    // const email = document.getElementById("email");

    // const firstNameValue = document.getElementById("firstName").value;
    // const lastNameValue = document.getElementById("lastName").value;
    // const emailValue = document.getElementById("email").value;

    // const submit = document.getElementById("submit");

    // console.log(attention);
    // console.log(firstName);
    // console.log(lastName);
    // console.log(email);

    // テキスト入力欄のバリデーションチェック
    // function checkInput() {
    //     const inputList = document.querySelectorAll("input");
    //     console.log(inputList);
    //     for(let input of inputList) {
    //         if(input.value == "") {
    //             input.parentElement.span.style.visibility = 'visible';
    //         }
    //     }
    // }

    // function sendEmail() {
    //     console.log("返信")
    // }

    // form.addEventListener("submit", (e) => {
    //     console.log("hi");
    //     checkInput();
    //     e.preventDefault();
    //     sendEmail();
    // });















    // function checkText() {


    //     if (firstNameValue === "" || firstNameValue === null) {
    //         attention[0].style.visibility = 'visible';
    //     }

    //     if (lastNameValue === "" || lastNameValue === null) {
    //         attention[1].style.visibility = 'visible';
    //     }

    //     if (emailValue === "" || emailValue === null) {
    //         attention[2].style.visibility = 'visible';
    //     }
    // }
    // // checkText(); submitのクリックイベントに入れる

    // send.addEventListener("click", () => {
    //     checkText();
    // });




});