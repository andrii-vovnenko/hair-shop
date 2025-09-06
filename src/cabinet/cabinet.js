function leaveAccount() {
    const exitBtn = document.querySelector('.exit');
    const cabinet = document.querySelector('.cabinet');
    const accountBtn = document.querySelector('.account-btn')
    exitBtn.addEventListener('click', () => {
        accountBtn.classList.remove('active');
        cabinet.classList.remove('active');
        localStorage.removeItem('currentUser');
        window.location.href = '../HTML/gallery.html';
    })
}
window.addEventListener('header-ready', () => {
leaveAccount();
});




