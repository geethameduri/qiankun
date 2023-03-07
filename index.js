import { registerMicroApps, setDefaultMountApp, start } from 'qiankun';
import 'zone.js';
import render from './render/VueRender';




render({ loading: true });
const loader = loading => render({ loading });

function loadApps() {
  registerMicroApps(
    [{
            name: 'dashboard',
            entry: '//localhost:4208',
            container: '#subapp-viewport',
            loader,
            activeRule: '/dashboard',
        },
        {
            name: 'masters',
            entry: '//localhost:4209',
            container: '#subapp-viewport',
            activeRule: '/masters',
            loader,
            persistent: true,
        },
        {
            name: 'validation',
            entry: '//localhost:4300',
            container: '#subapp-viewport',
            loader,
            activeRule: '/validation'
        },
  
    ], {
        beforeLoad: [
            app => {
                console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
                localStorage.setItem("logoutRedirect",app.name)
            },
        ],
        beforeMount: [
            app => {
                console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
            },
        ],
        afterUnmount: [
            app => {
                console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
            },
        ],
    },
  );


  
}
loadApps()


  // start qiankun
  start();  
  runAfterFirstMounted(() => {
    console.log('[MainApp] first app mounted');
});
// setDefaultMountApp('/masters')