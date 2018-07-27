if (sessionStorage.getItem('writeAccess') == 'true') {
    document.querySelector('.fa-user-circle').innerHTML = `<span class="nav-link" style="font-size: 85%; font-weight: 400"> Logged in as ${sessionStorage.getItem('user')}</span>`;
} else {
    document.querySelector('.fa-user-circle').innerHTML = "";
}