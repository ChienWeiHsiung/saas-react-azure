/*在一般畫面中點選某區塊可開啟dialog畫面 */
function opendialog(dialogscreen) {
    dialogscreen.current.showModal();
    fadeIn(dialogscreen);
};

/*在dialog畫面中點選 X 可關閉dialog畫面 */
function closedialog(dialogscreen) {
    dialogscreen.current.style.opacity = 0;
    dialogscreen.current.close();
};

/*在dialog畫面中點選某區塊可進行換頁 */
function changedialog(previous, next) {
    if (!next.open) {
        previous.current.close();
        previous.current.style.opacity = 0;
        next.current.showModal();
        fadeIn(next);
    };
};

/*開啟dialog視窗時會有動畫浮現的效果*/
const intervalTime = 20; // 每隔10毫秒增加不透明度
const maxOpacity = 1; // 最大不透明度
function fadeIn(dialog) {
    let opacity = 0;
    let intervalId = setInterval(() => {
        opacity += 0.25;
        dialog.current.style.opacity = opacity;
        if (opacity >= maxOpacity) {
            clearInterval(intervalId);
        }
    }, intervalTime);
};

/*--------------下拉選單--------------*/
function open_dropdown(dropdown) {
    dropdown.current.classList.toggle('open');
    for (const dropdown of document.querySelectorAll(".select-wrapper")) {
        dropdown.addEventListener('click', function() {
            this.querySelector('.select').classList.toggle('open');
            this.querySelector('.select__trigger').classList.toggle('rotate');
        });
    };

    for (const option of document.querySelectorAll(".custom-option")) {
        option.addEventListener('click', function() {
            if (!this.classList.contains('selected')) {
                this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
                this.classList.add('selected');
                this.closest('.select').querySelector('.select__trigger span').textContent = this.textContent;
            };
        });
    };
}