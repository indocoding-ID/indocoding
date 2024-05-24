import { routes, handleRoute} from './router.js';

const Container = document.getElementById('app');

const page = function(a, ic, data){
    ic = ic?ic:[];
    data = data?data:{};
    var txt = app.ReadFile(a+'.html');
    txt = ejs.render(txt,data);
    for(let c of ic){
        let tx = app.ReadFile(c+'.html');
        let ts = txt.replace('{{'+c+'}}', tx);
        ts = ejs.render(ts, data)
        txt = ts;
    }
    Container.innerHTML = '';
    Container.appendChild(
        el('div')
        .addModule('htm', txt)
        .load(function(e){
            let html = el('div').html(e.el.htm).get();
            let sc = '';
            Array.from(html.querySelectorAll('script')).forEach(function (o) {
                sc += o.innerHTML;
                sc += "\n";
                o.remove();
            });
            let elm = e.el;
            elm.appendChild(html);
            elm.appendChild(el('script').html(sc).get())
        }).get()
    )
}

routes['/'] = async function(a){
    page('./splashscreen',['nav'])
}

routes['/home'] = async function(a){
    page('./home',['nav'])
}

if(location.hash == ''){
    location.hash = '/';
}