import {ipcRenderer} from 'electron';

ipcRenderer.send('google-oauth', 'getToken');