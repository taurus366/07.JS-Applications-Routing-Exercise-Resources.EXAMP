import page from '//unpkg.com/page/page.mjs';
import { render } from 'https://unpkg.com/lit-html?module';
import * as api from './api/data.js';
//api.settings.host = 'http://localhost:3030';
window.api = api;

const main = document.querySelector('.container');

import {dashboardPage} from './views/dashboard.js';
import {detailsPage} from './views/details.js';
import {createPage} from './views/create.js';
import {editPage} from './views/edit.js';
import {registerPage} from './views/register.js';
import {loginPage} from './views/login.js';
import {myPage} from './views/myFurniture.js';
import {logout} from './api/data.js';

page('/', decorateContext, dashboardPage);
page('/dashboard', decorateContext, dashboardPage);
page('/my-furniture', decorateContext, myPage);
page('/details/:id', decorateContext, detailsPage);
page('/create', decorateContext, createPage);
page('/edit/:id', decorateContext, editPage);
page('/register', decorateContext, registerPage);
page('/login', decorateContext, loginPage);
//page.redirect('/','/catalog.html');

document.getElementById('logoutBtn').addEventListener('click',async () => {
    await logout();
    setUserNav();
    page.redirect('/');
});

setUserNav();

page.start();

function decorateContext(context, next) {
    context.render = (content) => render(content ,main);
    context.setUserNav = setUserNav;
    next();
}
function setUserNav() {
    const userId = sessionStorage.getItem('userId');
    if (userId !== null){
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    }else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}
