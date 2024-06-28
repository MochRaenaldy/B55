function kotak(panjang) {
    if (panjang % 2 === 0) {
        console.log("Parameter harus ganjil");
        return;
    }
    for (let i = 0; i < panjang; i++) {
    let hasil = '';
        for (let j = 0; j < panjang; j++) {
            if (i === j || i + j === panjang - 1 || j === Math.floor(panjang / 2)) {
            hasil += '*\t';
        } else {
            hasil += '#\t';
        }
    }
    console.log(hasil);
}
}
(kotak(5));
console.log('');
(kotak(7));