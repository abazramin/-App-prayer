// add city
let cities = [
    {
        arbName: 'الباحة',
        engName: 'Al Bahah'
    },
    {
        arbName: 'مكة المكرمة',
        engName: 'Makkah al Mukarramah'
    },
    {
        arbName: 'المدينة المنورة',
        engName: 'Al Madīnah al Munawwarah'
    },
    {
        arbName: 'الرياض',
        engName: 'Ar Riyāḑ'
    },
    {
        arbName: 'القصيم',
        engName: 'Al Qaşīm'
    },
]

for (let city of cities) {
    const content = `
    <option>${city.arbName}</option>
    `
    document.getElementById('citites').innerHTML += content;
}

document.getElementById('citites').addEventListener('change', function () {
    // change name city
    document.getElementById('city-name').innerHTML = this.value;

    // change time preyer
    let cityName = ''
    for (city of cities) {
        if (city.arbName == this.value) {
            cityName = city.engName;
        }
    }
    timePryers(cityName)
})

// داله بتجيب البيانات وتعرضها في html
async function timePryers(ciryName) {

    let pram = {
        country: 'SA',
        city: ciryName
    }

    const myApi = `http://api.aladhan.com/v1/timingsByCity?country=${pram.country}&city=${pram.city}`

    const res = await fetch(myApi)

    const data = await res.json()

    // متغيرات الجايه من ال Api
    const timings = data.data.timings;
    const data_days = data.data.date;
    // التاريخ
    fillTaim('data-day', data_days.readable);
    // اليوم
    fillTaim('today', data_days.hijri.weekday.ar);
    // الصلوات
    fillTaim('fajr', timings.Fajr);
    fillTaim('sunrice', timings.Sunrise);
    fillTaim('dhour', timings.Dhuhr);
    fillTaim('asr', timings.Asr);
    fillTaim('mogreb', timings.Maghrib);
    fillTaim('isah', timings.Isha);
}
// لقيمه الافتراضية
timePryers('Al Bahah');
// داله وظيفتها اخد Prmas لاضاافه اوقات الصلوات في html
function fillTaim(id, time) {
    document.getElementById(id).innerHTML = time;
}

