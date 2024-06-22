const prompt = require("prompt-sync")()

let harga_a = 4500
let harga_b = 5330
let harga_c = 8653
let disc_a = 231
let disc_b = 23 / 100


let barang_beli = prompt("Masukan barang yg mau di beli : ")
let jumlah_barang = prompt("Masukan jumlah barang : ")

if (barang_beli === "A" ) {
    const total_harga = harga_a*jumlah_barang
    console.log("Barang yg anda beli : ", barang_beli)
    console.log("Harga Barang yg anda beli: ", harga_a)
    console.log("Total harga barang yang anda beli :", total_harga)
   if (jumlah_barang > 13 ) {
    let total_diskon = disc_a*jumlah_barang
    console.log("Potongan", total_diskon)
    console.log("Jumlah yang harus dibayar:", total_harga-total_diskon)
   } else    {
    console.log("Jumlah yang harus dibayar:", total_harga)
   }
} else if(barang_beli === "B") {
    const total_harga = harga_b*jumlah_barang
    console.log("Barang yg anda beli : ", barang_beli)
    console.log("Harga Barang yg anda beli: ", harga_b)
    console.log("Total harga barang yang anda beli :", total_harga)
    if (jumlah_barang > 7){
        console.log("Diskon :", disc_b)
        console.log("jumlah yang harus dibayar :", total_harga*disc_b)
    }else {
    console.log("Jumlah yang harus dibayar:", total_harga)
    }
} else if (barang_beli === "C") {
    console.log("Barang yang anda beli : ", barang_beli);
    console.log("Harga barang yang anda beli:", harga_c);
    console.log("Total harga barang yang anda beli :", harga_c*jumlah_barang)

}else{
    console.log("Barang Kosong, yang tersedia hanya barang A,B dan C");
}
