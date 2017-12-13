 import _ from 'lodash';
 import './style.css';
 import Icon from './logo.png';
 // import Data from './data.xml';
 // import printMe from './print'

    function component() {
        var element = document.createElement('div');
        // Lodash, now imported by this script
        element.innerHTML = _.join(['hello', 'webpack'], ' ');
        element.classList.add('hello');
        var btn = document.createElement('button');

        btn.innerHTML = 'Click me and check the console!';
        //btn.onclick = printMe;
        element.appendChild(btn);
        // Note that because a network request is involved, some indication
           // of loading would need to be shown in a production-level site/app.
            btn.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
                var print = module.default;
                print();
            })
        // 将图像添加到我们现有的 div
         var myIcon = new Image();
         myIcon.src = Icon;

         element.appendChild(myIcon);
         // console.log(Data);

        return element;
    }

//document.body.appendChild(component());

 let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
 document.body.appendChild(element);

 if (module.hot) {
       module.hot.accept('./print.js', function() {
           console.log('Accepting the updated printMe module!');
           // printMe();
           document.body.removeChild(element);
           element = component(); // 重新渲染页面后，component 更新 click 事件处理
           document.body.appendChild(element);
       })
 }