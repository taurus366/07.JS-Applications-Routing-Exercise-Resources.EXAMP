import page from '//unpkg.com/page/page.mjs';

const pages = {
  '/home' : '<h2>Home Page </h2><p>Home page content</p>',
  '/catalog' : '<h2>catalog Page </h2><p>catalog page content <a href="/test/123">test</a></p>',
  '/about' : '<h2>about Page </h2><p>about page content</p>',
  '/test' : '<h2>test Page </h2><p>test page content</p>',
  '/test/123' : '<h2>test Page </h2><p>123 page content</p>'
};

const defaultPage = '<h2>404</h2><p>Page not Found</p>';

const main = document.querySelector('main');

page('/home', updateContent);
page('/catalog', updateContent);
page('/about',updateContent);
page('/test/:id', itemDetails);
page.redirect('/','/home');
page.start();

async function updateContent(context) {
    main.innerHTML = '<p> LOADING.</p>'


    await new Promise(p => setTimeout(p, 1000));
    main.innerHTML = '<p> LOADING..</p>'
    await new Promise(p => setTimeout(p, 1000));
    main.innerHTML = '<p> LOADING....</p>'
    await new Promise(p => setTimeout(p, 1000));

    main.innerHTML = pages[context.pathname] || defaultPage;
    console.log(context)
}
function itemDetails(context) {
    const id = context.params.id;
    const html = `<h2>item ${id}</h2>`
    main.innerHTML = html
}