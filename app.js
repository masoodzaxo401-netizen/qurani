// قائمة الـ 28 قارئاً المحدثة مع السيرفرات السريعة لعام 2026
const reciters = [
    { id: "01", name: "عبد الباسط عبد الصمد", server: "https://server7.mp3quran.net/basit/" },
    { id: "02", name: "مشاري بن راشد العفاسي", server: "https://server8.mp3quran.net/afs/" },
    { id: "03", name: "ماهر المعيقلي", server: "https://server12.mp3quran.net/maher/" },
    { id: "04", name: "سعود الشريم", server: "https://server7.mp3quran.net/shur/" },
    { id: "05", name: "عبد الرحمن السديس", server: "https://server11.mp3quran.net/sds/" },
    { id: "06", name: "سعد الغامدي", server: "https://server7.mp3quran.net/s_gmd/" },
    { id: "07", name: "أحمد بن علي العجمي", server: "https://server10.mp3quran.net/ajm/" },
    { id: "08", name: "فارس عباد", server: "https://server8.mp3quran.net/frs_a/" },
    { id: "09", name: "ياسر الدوسري", server: "https://server11.mp3quran.net/yasser/" },
    { id: "10", name: "ناصر القطامي", server: "https://server6.mp3quran.net/qtm/" },
    { id: "11", name: "محمود خليل الحصري", server: "https://server13.mp3quran.net/husr/" },
    { id: "12", name: "محمد صديق المنشاوي", server: "https://server10.mp3quran.net/minsh/" },
    { id: "13", name: "أبو بكر الشاطري", server: "https://server11.mp3quran.net/shatri/" },
    { id: "14", name: "خالد الجليل", server: "https://server10.mp3quran.net/jleel/" },
    { id: "15", name: "صلاح بو خاطر", server: "https://server8.mp3quran.net/bu_khtr/" },
    { id: "16", name: "عبد الله عواد الجهني", server: "https://server13.mp3quran.net/jhn/" },
    { id: "17", name: "ماجد الزامل", server: "https://server9.mp3quran.net/zaml/" },
    { id: "18", name: "علي بن عبد الرحمن الحذيفي", server: "https://server9.mp3quran.net/huzaifi/" },
    { id: "19", name: "محمد اللحيدان", server: "https://server8.mp3quran.net/lhdan/" },
    { id: "20", name: "إدريس أبكر", server: "https://server6.mp3quran.net/abkr/" },
    { id: "21", name: "هاني الرفاعي", server: "https://server8.mp3quran.net/hani/" },
    { id: "22", name: "محمد أيوب", server: "https://server8.mp3quran.net/ayoub/" },
    { id: "23", name: "منصور السالمي", server: "https://server14.mp3quran.net/shuraim/" },
    { id: "24", name: "عبد الرشيد صوفي", server: "https://server9.mp3quran.net/sof_g/" },
    { id: "25", name: "عبد الله الخياط", server: "https://server12.mp3quran.net/khayat/" },
    { id: "26", name: "خالد القحطاني", server: "https://server10.mp3quran.net/qht/" },
    { id: "27", name: "شيرزاد عبد الرحمن طاهر", server: "https://server12.mp3quran.net/shirzad/" },
    { id: "28", name: "خليفة الطنيجي", server: "https://server12.mp3quran.net/thinj/" }
];

const surahNames = [
    "الفاتحة","البقرة","آل عمران","النساء","المائدة","الأنعام","الأعراف","الأنفال","التوبة","يونس","هود","يوسف","الرعد",
    "إبراهيم","الحجر","النحل","الإسراء","الكهف","مريم","طه","الأنبياء","الحج","المؤمنون","النور","الفرقان","الشعراء",
    "النمل","القصص","العنكبوت","الروم","لقمان","السجدة","الأحزاب","سبأ","فاطر","يس","الصافات","ص","الزمر","غافر",
    "فصلت","الشورى","الزخرف","الدخان","الجاثية","الأحقاف","محمد","الفتح","الحجرات","ق","الذاريات","الطور","النجم",
    "القمر","الرحمن","الواقعة","الحديد","المجادلة","الحشر","الممتحنة","الصف","الجمعة","المنافقون","التغابن","الطلاق",
    "التحريم","الملك","القلم","الحاقة","المعارج","نوح","الجن","المزمل","المدثر","القيامة","الإنسان","المرسلات","النبأ",
    "النازعات","عبس","التكوير","الانفطار","المطففين","الانشقاق","البروج","الطارق","الأعلى","الغاشية","الفجر","البلد",
    "الشمس","الليل","الضحى","الشرح","التين","العلق","القدر","البينة","الزلزلة","العاديات","القارعة","التكاثر","العصر",
    "الهمزة","الفيل","قريش","الماعون","الكوثر","الكافرون","النصر","المسد","الإخلاص","الفلق","الناس"
];

let currentLang = 'ar';
let currentSurahData = [];
let deferredPrompt;
let totalMinutesListened = parseFloat(localStorage.getItem('stats_mins') || 0);
let totalAyahsRead = parseInt(localStorage.getItem('stats_ayahs') || 0);

// متغيرات لمنع السكرول القسري العشوائي
let lastActiveAyahNum = null; 
let isUserScrolling = false;
let userScrollTimeout;

document.addEventListener("DOMContentLoaded", () => {
    initSelectors();
    setupAudioAnalytics();
    setupScrollProgress();
    setupPWA();
    changeLanguage('ar');
    
    const savedSize = localStorage.getItem('font-size') || '22';
    document.documentElement.style.setProperty('--base-font-size', savedSize + 'px');

    // تتبع إذا كان المستخدم يقوم بالتمرير بنفسه لمنع النظام من إزعاجه
    window.addEventListener('wheel', handleUserScroll);
    window.addEventListener('touchmove', handleUserScroll);
});

function handleUserScroll() {
    isUserScrolling = true;
    clearTimeout(userScrollTimeout);
    // يعود النظام للمتابعة التلقائية بعد 4 ثوانٍ من توقف المستخدم عن اللمس أو التمرير
    userScrollTimeout = setTimeout(() => {
        isUserScrolling = false;
    }, 4000);
}

function initSelectors() {
    const rSel = document.getElementById("reciter-select");
    const sSel = document.getElementById("surah-select");
    
    rSel.innerHTML = "";
    sSel.innerHTML = "";
    reciters.forEach((r, i) => rSel.innerHTML += `<option value="${i}">${r.name}</option>`);
    surahNames.forEach((name, i) => sSel.innerHTML += `<option value="${i+1}">${i+1}. سورة ${name}</option>`);

    rSel.onchange = sSel.onchange = updatePlatform;
}

function toggleMenu() { document.getElementById("sideMenu").classList.toggle("active"); }
function changeTheme(theme) { document.body.className = theme; }

function adjustFont(val) {
    let currentSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--base-font-size'));
    let newSize = currentSize + val;
    if(newSize >= 14 && newSize <= 45) {
        document.documentElement.style.setProperty('--base-font-size', newSize + 'px');
        localStorage.setItem('font-size', newSize);
    }
}

function changeSpeed(val) { document.getElementById("audio-player").playbackRate = parseFloat(val); }

async function updatePlatform() {
    const rIdx = document.getElementById("reciter-select").value;
    const sNum = document.getElementById("surah-select").value;
    const formattedSurah = String(sNum).padStart(3, '0');
    
    const reciter = reciters[rIdx];
    const audioUrl = `${reciter.server}${formattedSurah}.mp3`;
    
    const audio = document.getElementById("audio-player");
    audio.src = audioUrl;
    document.getElementById("track-info").innerText = `سورة ${surahNames[sNum-1]} | القارئ: ${reciter.name}`;
    
    const downloadBtn = document.getElementById("download-btn");
    downloadBtn.href = audioUrl;
    
    // إعادة تعيين الآية النشطة لتجنب تجميد التمرير بين السور
    lastActiveAyahNum = null;
    
    await fetchQuranAndTranslation(sNum);
}

async function fetchQuranAndTranslation(sNum) {
    const container = document.getElementById("quran-text-container");
    container.innerHTML = `<p style="text-align:center; padding: 20px;">جاري تحميل كتاب الله، يرجى الانتظار...</p>`;

    try {
        const arRes = await fetch(`https://api.alquran.cloud/v1/surah/${sNum}`);
        const arData = await arRes.json();
        currentSurahData = arData.data.ayahs;

        let identifier = 'ar.jalalayn'; 
        if (currentLang === 'ckb') identifier = 'ku.asan'; 
        if (currentLang === 'pnb') identifier = 'ku.baban'; 

        let transData;
        try {
            const transRes = await fetch(`https://api.alquran.cloud/v1/surah/${sNum}/${identifier}`);
            transData = await transRes.json();
            if (!transData || transData.code !== 200) throw new Error();
        } catch (innerError) {
            const fallbackRes = await fetch(`https://api.alquran.cloud/v1/surah/${sNum}/ku.asan`);
            transData = await fallbackRes.json();
        }

        container.innerHTML = "";
        currentSurahData.forEach((ayah, i) => {
            container.innerHTML += `
                <div class="ayah-block" id="ayah-${i+1}" onclick="highlightAndRead(${i+1})">
                    <div class="ayah-arabic">${ayah.text} <span class="ayah-num-mark">﴿${ayah.numberInSurah}﴾</span></div>
                    <div class="ayah-translation">${transData.data.ayahs[i].text}</div>
                </div>
            `;
            
            totalAyahsRead++;
            localStorage.setItem('stats_ayahs', totalAyahsRead);
            document.getElementById("stat-ayahs").innerText = totalAyahsRead;
        });
    } catch (e) {
        container.innerHTML = "<p style='text-align:center; color:red; padding: 20px;'>خطأ في الاتصال بالخادم العالمي لتنزيل البيانات.</p>";
    }
}

// دالة السكرول الذكي والمبتكر لمنع قفل التصفح
function highlightAndRead(ayahNum, forceScroll = true) {
    document.querySelectorAll(".ayah-block").forEach(b => b.classList.remove("active-ayah"));
    const block = document.getElementById(`ayah-${ayahNum}`);
    if(block) {
        block.classList.add("active-ayah");
        
        // حل المشكلة الفوري: لا نتحرك للأعلى إلا إذا تغيرت الآية فعلياً ولم يكن المستخدم يسحب بنفسه
        if(lastActiveAyahNum !== ayahNum) {
            lastActiveAyahNum = ayahNum;
            if(!isUserScrolling || forceScroll) {
                block.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }
}

function setupAudioAnalytics() {
    const audio = document.getElementById("audio-player");
    
    audio.ontimeupdate = () => {
        if(audio.paused) return; // إذا تم إيقاف الصوت، يتوقف الكود فوراً
        
        totalMinutesListened += 0.01;
        localStorage.setItem('stats_mins', totalMinutesListened.toFixed(1));
        document.getElementById("stat-minutes").innerText = totalMinutesListened.toFixed(1);

        if(currentSurahData.length > 0 && audio.duration) {
            let progress = audio.currentTime / audio.duration;
            let targetAyah = Math.floor(progress * currentSurahData.length) + 1;
            if(targetAyah <= currentSurahData.length) {
                // نمرر false هنا لنعلم النظام أن التحديث قادم تلقائياً وليس بضغط زر قسري
                highlightAndRead(targetAyah, false);
            }
        }
    };

    audio.onended = () => {
        if(document.getElementById("continuous-play").checked) {
            let sSel = document.getElementById("surah-select");
            if(parseInt(sSel.value) < 114) {
                sSel.value = parseInt(sSel.value) + 1;
                updatePlatform();
            }
        }
    };
}

function searchQuran(query) {
    const resultsBox = document.getElementById("search-results");
    if(!query || query.length < 2) { resultsBox.classList.add("hidden"); return; }
    
    resultsBox.innerHTML = "";
    resultsBox.classList.remove("hidden");

    let found = false;
    surahNames.forEach((name, idx) => {
        if(name.includes(query)) {
            found = true;
            resultsBox.innerHTML += `<div class="search-item" onclick="selectSurahFromSearch(${idx+1})">🔍 سورة ${name}</div>`;
        }
    });

    if(!found) resultsBox.innerHTML = `<div class="search-item">${translations[currentLang].noResults}</div>`;
}

function selectSurahFromSearch(num) {
    document.getElementById("surah-select").value = num;
    document.getElementById("search-results").classList.add("hidden");
    document.getElementById("search-input").value = "";
    updatePlatform();
}

function setupScrollProgress() {
    window.onscroll = () => {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        const bar = document.getElementById("reading-progress");
        if(bar) bar.style.width = scrolled + "%";
    };
}

function changeLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    
    document.getElementById("top-logo").innerText = t.title;
    document.getElementById("lbl-lang").innerText = t.selectLanguage;
    document.getElementById("lbl-theme").innerText = t.selectTheme;
    document.getElementById("lbl-font-size").innerText = t.fontSize;
    document.getElementById("lbl-stats").innerText = t.stats;
    document.getElementById("player-hd").innerText = t.playerTitle;
    document.getElementById("search-input").placeholder = t.searchPlaceholder;
    document.getElementById("installApp").innerText = t.install;
    document.getElementById("lbl-continuous").innerText = t.continuous;
    document.getElementById("download-btn").innerText = t.download;
    
    document.getElementById("lbl-min").innerText = t.minutes;
    document.getElementById("lbl-ayahs-count").innerText = t.readAyahs;

    if(document.getElementById("surah-select").value) updatePlatform();
}

function setupPWA() {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault(); deferredPrompt = e;
        document.getElementById("installApp").style.display = "block";
    });
    document.getElementById("installApp").addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            await deferredPrompt.userChoice;
            deferredPrompt = null;
        }
    });
}