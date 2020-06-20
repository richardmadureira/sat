const { atom } = require("recoil");

export const loadingState = atom({
    key: 'loadingState',
    default: false
});

export const selectedMenuState = atom({
    key: 'selectedMenu',
    default: ''
});