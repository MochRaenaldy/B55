function buble(arr) {

    for (var a = 0; a < arr.length; a++) {

        for (var b = 0; b < (arr.length - a - 1); b++) {

            if (arr[b] > arr[b + 1]) {

                var c = arr[b]
                arr[b] = arr[b + 1]
                arr[b + 1] = c
            }
        }
    }
    console.log(arr);
}

var arr = [20,12,35,11,17,9,58,23,69,21];
buble(arr);