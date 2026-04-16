import React, { useEffect, useMemo, useRef, useState } from "react";

export default function App() {
  const AUDIO_BASE = "https://everyayah.com/data/Alafasy_128kbps";

  const verses = useMemo(
    () => [
      {
        number: 1,
        arabic:
          "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
        translit:
          "Tabaarakallazii biyadihil mulku wa huwa 'alaa kulli shay'in qadiir.",
        meaning:
          "Barcha mulk qo‘lida bo‘lgan Zot barakotlidir. U har narsaga qodirdir.",
      },
      {
        number: 2,
        arabic:
          "الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ",
        translit:
          "Allazii khalaqal mawta wal hayaata liyabluwakum ayyukum ahsanu 'amalaa; wa huwal 'aziizul ghafuur.",
        meaning:
          "U zot o‘lim va hayotni yaratdi — sizlarni sinash uchun, kimning amali chiroyliroq ekanini bilish uchun. U qudratli va kechiruvchidir.",
      },
      {
        number: 3,
        arabic:
          "الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ",
        translit:
          "Allazii khalaqa sab'a samaawaatin tibaaqaa; maa taraa fii khalqir Rahmaani min tafaawut. Farji'il basara hal taraa min futuur.",
        meaning:
          "U zot yetti osmonni qat-qat qilib yaratdi. Rahmonning yaratishida hech bir nomutanosiblik ko‘rmaysan. Yana boqchi, biror yoriq yoki nuqson ko‘rasanmi?",
      },
      {
        number: 4,
        arabic:
          "ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ",
        translit:
          "Summarji'il basara karratayni yanqalib ilaykal basaru khaasi'an wa huwa hasiir.",
        meaning:
          "So‘ng yana qayta-qayta boq. Ko‘zing senga xor va charchagan holda qaytadi.",
      },
      {
        number: 5,
        arabic:
          "وَلَقَدْ زَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ وَجَعَلْنَاهَا رُجُومًا لِّلشَّيَاطِينِ ۖ وَأَعْتَدْنَا لَهُمْ عَذَابَ السَّعِيرِ",
        translit:
          "Wa laqad zayyannas samaa'ad dunyaa bimaSaabiih; wa ja'alnaahaa rujuuman lish shayaatiin; wa a'tadnaa lahum 'azaabas sa'iir.",
        meaning:
          "Biz yaqin osmonni yulduzlar bilan bezadik, ularni shaytonlarga qarshi otiladigan vosita qildik va ular uchun alangali azobni tayyorladik.",
      },
      {
        number: 6,
        arabic:
          "وَلِلَّذِينَ كَفَرُوا بِرَبِّهِمْ عَذَابُ جَهَنَّمَ ۖ وَبِئْسَ الْمَصِيرُ",
        translit:
          "Wa lillaziina kafaruu birabbihim 'azaabu jahannam; wa bi'sal masiir.",
        meaning:
          "Parvardigoriga kofir bo‘lganlar uchun jahannam azobi bordir. U naqadar yomon manzildir.",
      },
      {
        number: 7,
        arabic: "إِذَا أُلْقُوا فِيهَا سَمِعُوا لَهَا شَهِيقًا وَهِيَ تَفُورُ",
        translit: "Izaa ulquu fiihaa sami'uu lahaa shahiiqan wa hiya tafuur.",
        meaning:
          "U yerga tashlanganlarida, uning dahshatli uvillagan ovozini eshitadilar. U qaynab-toshib turadi.",
      },
      {
        number: 8,
        arabic:
          "تَكَادُ تَمَيَّزُ مِنَ الْغَيْظِ ۖ كُلَّمَا أُلْقِيَ فِيهَا فَوْجٌ سَأَلَهُمْ خَزَنَتُهَا أَلَمْ يَأْتِكُمْ نَذِيرٌ",
        translit:
          "Takaadu tamayyazu minal ghayz; kullamaa ulqiya fiihaa fawjun sa'alahum khazanatuhaa alam ya'tikum naziir.",
        meaning:
          "U g‘azabidan yorilay deydi. Har safar unga bir to‘da tashlansa, qo‘riqchilari: “Sizlarga ogohlantiruvchi kelmaganmi?” deydilar.",
      },
      {
        number: 9,
        arabic:
          "قَالُوا بَلَىٰ قَدْ جَاءَنَا نَذِيرٌ فَكَذَّبْنَا وَقُلْنَا مَا نَزَّلَ اللَّهُ مِن شَيْءٍ إِنْ أَنتُمْ إِلَّا فِي ضَلَالٍ كَبِيرٍ",
        translit:
          "Qaaluu balaa qad jaa'anaa naziirun fakazzabnaa wa qulnaa maa nazzalallaahu min shay'; in antum illaa fii dalaalin kabiir.",
        meaning:
          "Ular aytadilar: “Ha, bizga ogohlantiruvchi kelgan edi. Lekin biz uni yolg‘onga chiqardik va: ‘Alloh hech narsa nozil qilmagan, sizlar faqat katta adashuvdasizlar’, dedik.”",
      },
      {
        number: 10,
        arabic:
          "وَقَالُوا لَوْ كُنَّا نَسْمَعُ أَوْ نَعْقِلُ مَا كُنَّا فِي أَصْحَابِ السَّعِيرِ",
        translit:
          "Wa qaaluu law kunnaa nasma'u aw na'qilu maa kunnaa fii ashaabis sa'iir.",
        meaning:
          "Ular yana aytadilar: “Agar eshitganimizda yoki aql yuritganimizda, biz bu do‘zax ahli orasida bo‘lmas edik.”",
      },
      {
        number: 11,
        arabic: "فَاعْتَرَفُوا بِذَنبِهِمْ فَسُحْقًا لِّأَصْحَابِ السَّعِيرِ",
        translit: "Fa'tarafuu bizambihim fa suhqan li ashaabis sa'iir.",
        meaning:
          "Shunday qilib, ular gunohlarini tan oladilar. Endi alangali do‘zax ahliga halokat bo‘lsin.",
      },
      {
        number: 12,
        arabic:
          "إِنَّ الَّذِينَ يَخْشَوْنَ رَبَّهُم بِالْغَيْبِ لَهُم مَّغْفِرَةٌ وَأَجْرٌ كَبِيرٌ",
        translit:
          "Innal laziina yakhshawna rabbahum bil ghaybi lahum maghfiratun wa ajrun kabiir.",
        meaning:
          "Albatta, Parvardigoridan ko‘rmay turib qo‘rqadiganlar uchun mag‘firat va ulkan mukofot bor.",
      },
      {
        number: 13,
        arabic:
          "وَأَسِرُّوا قَوْلَكُمْ أَوِ اجْهَرُوا بِهِ ۖ إِنَّهُ عَلِيمٌ بِذَاتِ الصُّدُورِ",
        translit:
          "Wa asirruu qawlakum awijharuu bih; innahuu 'aliimun bizaatis suduur.",
        meaning:
          "So‘zingizni yashiring yoki oshkora ayting — albatta, U qalblardagi narsalarni ham biluvchidir.",
      },
      {
        number: 14,
        arabic: "أَلَا يَعْلَمُ مَنْ خَلَقَ وَهُوَ اللَّطِيفُ الْخَبِيرُ",
        translit: "Alaa ya'lamu man khalaq; wa huwal Latiiful Khabiir.",
        meaning:
          "Axir yaratgan Zot bilmaydimi? U nozik biluvchi va har narsadan xabardordir.",
      },
      {
        number: 15,
        arabic:
          "هُوَ الَّذِي جَعَلَ لَكُمُ الْأَرْضَ ذَلُولًا فَامْشُوا فِي مَنَاكِبِهَا وَكُلُوا مِن رِّزْقِهِ ۖ وَإِلَيْهِ النُّشُورُ",
        translit:
          "Huwal lazii ja'ala lakumul arda zaluulan famshuu fii manaakibihaa wa kuluu mir rizqih; wa ilayhin nushuur.",
        meaning:
          "U zot sizlar uchun yerni bo‘ysundirilgan qildi. Bas, uning tomonlarida yuringlar va Allohning rizqidan yenglar. Qayta tirilish ham faqat Uning huzurigadir.",
      },
      {
        number: 16,
        arabic:
          "أَأَمِنتُم مَّن فِي السَّمَاءِ أَن يَخْسِفَ بِكُمُ الْأَرْضَ فَإِذَا هِيَ تَمُورُ",
        translit:
          "A amintum man fis samaa'i ay yakhsifa bikumul arda fa izaa hiya tamuur.",
        meaning:
          "Osmondagi Zot sizlarni yerga yuttirib yuborishidan xotirmisiz? Shunda yer qattiq silkinib ketadi.",
      },
      {
        number: 17,
        arabic:
          "أَمْ أَمِنتُم مَّن فِي السَّمَاءِ أَن يُرْسِلَ عَلَيْكُمْ حَاصِبًا ۖ فَسَتَعْلَمُونَ كَيْفَ نَذِيرِ",
        translit:
          "Am amintum man fis samaa'i ay yursila 'alaykum haasiban fasata'lamuuna kayfa naziir.",
        meaning:
          "Yoki osmondagi Zot ustingizga tosh yog‘diruvchi ofat yuborishidan xotirmisiz? Bas, ogohlantirishim qanday bo‘lishini bilib olasizlar.",
      },
      {
        number: 18,
        arabic:
          "وَلَقَدْ كَذَّبَ الَّذِينَ مِن قَبْلِهِمْ فَكَيْفَ كَانَ نَكِيرِ",
        translit:
          "Wa laqad kazzabal laziina min qablihim fakayfa kaana nakiir.",
        meaning:
          "Ulardan oldingilar ham yolg‘onga chiqargan edilar. Mening inkor etishimning oqibati qanday bo‘lganini ko‘ring.",
      },
      {
        number: 19,
        arabic:
          "أَوَلَمْ يَرَوْا إِلَى الطَّيْرِ فَوْقَهُمْ صَافَّاتٍ وَيَقْبِضْنَ ۚ مَا يُمْسِكُهُنَّ إِلَّا الرَّحْمَٰنُ ۚ إِنَّهُ بِكُلِّ شَيْءٍ بَصِيرٌ",
        translit:
          "Awalam yaraw ilat tayri fawqahum saaffaatin wa yaqbidn; maa yumsikuhunna illar Rahmaan; innahuu bikulli shay'in basiir.",
        meaning:
          "Ular ustilarida qanot yozib va yig‘ib uchayotgan qushlarga qaramaydilarmi? Ularni faqat Rahmon ushlab turadi. Albatta, U har narsani ko‘ruvchidir.",
      },
      {
        number: 20,
        arabic:
          "أَمَّنْ هَٰذَا الَّذِي هُوَ جُندٌ لَّكُمْ يَنصُرُكُم مِّن دُونِ الرَّحْمَٰنِ ۚ إِنِ الْكَافِرُونَ إِلَّا فِي غُرُورٍ",
        translit:
          "Amman haazal lazii huwa jundul lakum yansurukum min duunir Rahmaan; inil kaafiruuna illaa fii ghuruur.",
        meaning:
          "Rahmondan boshqa sizlarga yordam beradigan qanday qo‘shin bor? Kofirlar faqat aldanish ichidadirlar.",
      },
      {
        number: 21,
        arabic:
          "أَمَّنْ هَٰذَا الَّذِي يَرْزُقُكُمْ إِنْ أَمْسَكَ رِزْقَهُ ۚ بَل لَّجُّوا فِي عُتُوٍّ وَنُفُورٍ",
        translit:
          "Amman haazal lazii yarzuqukum in amsaka rizqah; bal lajjuu fii 'utuw wiw nufuur.",
        meaning:
          "Agar U rizqini to‘xtatsa, sizlarga kim rizq beradi? Yo‘q, ular haddan oshish va qochishda davom etdilar.",
      },
      {
        number: 22,
        arabic:
          "أَفَمَن يَمْشِي مُكِبًّا عَلَىٰ وَجْهِهِ أَهْدَىٰ أَمَّن يَمْشِي سَوِيًّا عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ",
        translit:
          "Afam yamshii mukibban 'alaa wajhihii ahdaa ammay yamshii sawiyyan 'alaa siraatim mustaqiim.",
        meaning:
          "Yuzi bilan yiqilib-sudralib yurgan odam to‘g‘ri yo‘ldami yoki tik va to‘g‘ri yo‘lda yurgan odammi?",
      },
      {
        number: 23,
        arabic:
          "قُلْ هُوَ الَّذِي أَنشَأَكُمْ وَجَعَلَ لَكُمُ السَّمْعَ وَالْأَبْصَارَ وَالْأَفْئِدَةَ ۖ قَلِيلًا مَّا تَشْكُرُونَ",
        translit:
          "Qul huwal lazii ansha'akum wa ja'ala lakumus sam'a wal absaara wal af'idah; qaliilam maa tashkuruun.",
        meaning:
          "Ayting: U sizlarni paydo qildi va sizlarga quloq, ko‘zlar va qalblar berdi. Sizlar esa juda oz shukr qilasizlar.",
      },
      {
        number: 24,
        arabic:
          "قُلْ هُوَ الَّذِي ذَرَأَكُمْ فِي الْأَرْضِ وَإِلَيْهِ تُحْشَرُونَ",
        translit: "Qul huwal lazii zara'akum fil ardi wa ilayhi tuhsharuun.",
        meaning:
          "Ayting: U sizlarni yer yuziga tarqatdi va sizlar Uning huzuriga jam qilinasizlar.",
      },
      {
        number: 25,
        arabic: "وَيَقُولُونَ مَتَىٰ هَٰذَا الْوَعْدُ إِن كُنتُمْ صَادِقِينَ",
        translit: "Wa yaquuluuna mataa haazal wa'du in kuntum saadiqiin.",
        meaning:
          "Ular: “Agar rostgo‘y bo‘lsangizlar, bu va’da qachon bo‘ladi?” deydilar.",
      },
      {
        number: 26,
        arabic:
          "قُلْ إِنَّمَا الْعِلْمُ عِندَ اللَّهِ وَإِنَّمَا أَنَا نَذِيرٌ مُّبِينٌ",
        translit:
          "Qul innamal 'ilmu 'indallaah wa innamaa ana naziirum mubiin.",
        meaning:
          "Ayting: “Ilm faqat Allohning huzuridadir. Men esa faqat aniq ogohlantiruvchiman.”",
      },
      {
        number: 27,
        arabic:
          "فَلَمَّا رَأَوْهُ زُلْفَةً سِيئَتْ وُجُوهُ الَّذِينَ كَفَرُوا وَقِيلَ هَٰذَا الَّذِي كُنتُم بِهِ تَدَّعُونَ",
        translit:
          "Falammaa ra'awhu zulfatan sii'at wujuuhul laziina kafaruu wa qiila haazal lazii kuntum bihii tadda'uun.",
        meaning:
          "Qachonki uni yaqin holda ko‘rishsa, kofirlarning yuzlari qorayib ketadi va ularga: “Mana shu sizlar talab qilib yurgan narsa”, deyiladi.",
      },
      {
        number: 28,
        arabic:
          "قُلْ أَرَأَيْتُمْ إِنْ أَهْلَكَنِيَ اللَّهُ وَمَن مَّعِيَ أَوْ رَحِمَنَا فَمَن يُجِيرُ الْكَافِرِينَ مِنْ عَذَابٍ أَلِيمٍ",
        translit:
          "Qul ara'aytum in ahlakaniyallaahu wa man ma'iya aw rahimanaa faman yujiirul kaafiriina min 'azaabin aliim.",
        meaning:
          "Ayting: “Agar Alloh meni va men bilan birga bo‘lganlarni halok qilsa yoki bizga rahm qilsa ham, kofirlarni alamli azobdan kim qutqaradi?”",
      },
      {
        number: 29,
        arabic:
          "قُلْ هُوَ الرَّحْمَٰنُ آمَنَّا بِهِ وَعَلَيْهِ تَوَكَّلْنَا ۖ فَسَتَعْلَمُونَ مَنْ هُوَ فِي ضَلَالٍ مُّبِينٍ",
        translit:
          "Qul huwar Rahmaanu aamannaa bihii wa 'alayhi tawakkalnaa; fasata'lamuuna man huwa fii dalaalim mubiin.",
        meaning:
          "Ayting: “U Rahmondir. Biz Unga iymon keltirdik va Ungagina tavakkal qildik. Kim ochiq adashuvda ekanini tez orada bilasizlar.”",
      },
      {
        number: 30,
        arabic:
          "قُلْ أَرَأَيْتُمْ إِنْ أَصْبَحَ مَاؤُكُمْ غَوْرًا فَمَن يَأْتِيكُم بِمَاءٍ مَّعِينٍ",
        translit:
          "Qul ara'aytum in asbaha maa'ukum ghawran famay ya'tiikum bimaa'im ma'iin.",
        meaning:
          "Ayting: “Agar suvingiz yer qa’riga singib ketsa, sizlarga oqar suvni kim keltira oladi?”",
      },
    ],
    [],
  );

  const audioRef = useRef(null);
  const micAudioRef = useRef(null);
  const verseRefs = useRef({});
  const repeatCounterRef = useRef(0);
  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const recognitionRef = useRef(null);
  const chunksRef = useRef([]);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);

  const [selectedVerse, setSelectedVerse] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [search, setSearch] = useState("");
  const [showMeaning, setShowMeaning] = useState(true);
  const [showTranslit, setShowTranslit] = useState(true);
  const [autoNext, setAutoNext] = useState(true);
  const [repeatMode, setRepeatMode] = useState("off");
  const [repeatCount, setRepeatCount] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [loadingVerse, setLoadingVerse] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [compactMode, setCompactMode] = useState(() => {
    const saved = localStorage.getItem("mulk-compact-mode-v2");
    return saved ? JSON.parse(saved) : false;
  });
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("mulk-bookmarks-v2");
    return saved ? JSON.parse(saved) : [];
  });
  const [savedSettingsLoaded, setSavedSettingsLoaded] = useState(false);
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState(() => {
    const saved = localStorage.getItem("mulk-recordings-meta-v1");
    return saved ? JSON.parse(saved) : {};
  });
  const [speechSupported, setSpeechSupported] = useState(false);
  const [speechLang, setSpeechLang] = useState("ar-SA");
  const [speechResult, setSpeechResult] = useState("");
  const [speechInterim, setSpeechInterim] = useState("");
  const [speechStatus, setSpeechStatus] = useState("idle");
  const [micLevel, setMicLevel] = useState(0);
  const [shadowDelay, setShadowDelay] = useState(1200);
  const [shadowModeArmed, setShadowModeArmed] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const [practiceMode, setPracticeMode] = useState("arabic"); // arabic | translit
  const [viewMode, setViewMode] = useState("all"); // all | practice | exam

  const currentVerseData = verses.find((v) => v.number === selectedVerse);

  useEffect(() => {
    const saved = localStorage.getItem("mulk-settings-v2");
    if (saved) {
      const parsed = JSON.parse(saved);
      setShowMeaning(parsed.showMeaning ?? true);
      setShowTranslit(parsed.showTranslit ?? true);
      setAutoNext(parsed.autoNext ?? true);
      setRepeatMode(parsed.repeatMode ?? "off");
      setRepeatCount(parsed.repeatCount ?? 1);
      setPlaybackRate(parsed.playbackRate ?? 1);
      setSpeechLang(parsed.speechLang ?? "ar-SA");
      setShadowDelay(parsed.shadowDelay ?? 1200);
      setPracticeMode(parsed.practiceMode ?? "arabic");
      setViewMode(parsed.viewMode ?? "all");
    }
    setSavedSettingsLoaded(true);
  }, []);

  useEffect(() => {
    if (!savedSettingsLoaded) return;
    localStorage.setItem(
      "mulk-settings-v2",
      JSON.stringify({
        showMeaning,
        showTranslit,
        autoNext,
        repeatMode,
        repeatCount,
        playbackRate,
        speechLang,
        shadowDelay,
        practiceMode,
        viewMode,
      }),
    );
  }, [
    showMeaning,
    showTranslit,
    autoNext,
    repeatMode,
    repeatCount,
    playbackRate,
    speechLang,
    shadowDelay,
    practiceMode,
    viewMode,
    savedSettingsLoaded,
  ]);

  useEffect(() => {
    localStorage.setItem("mulk-bookmarks-v2", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem("mulk-compact-mode-v2", JSON.stringify(compactMode));
  }, [compactMode]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    setSpeechSupported(Boolean(SpeechRecognition));
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const getAudioUrl = (verseNumber) => {
    const ayah = String(verseNumber).padStart(3, "0");
    return `${AUDIO_BASE}/067${ayah}.mp3`;
  };

  const normalizeArabic = (text = "") =>
    text
      .toLowerCase()
      .replace(/[ًٌٍَُِّْـ]/g, "")
      .replace(/[ۖۚۗۙۘ]/g, "")
      .replace(/[،؛؟.,!]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const normalizeLatin = (text = "") =>
    text
      .toLowerCase()
      .replace(/['‘’`]/g, "")
      .replace(/[-.,;:!?()]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const levenshtein = (a = "", b = "") => {
    const matrix = Array.from({ length: b.length + 1 }, () => []);
    for (let i = 0; i <= b.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1,
          );
        }
      }
    }
    return matrix[b.length][a.length];
  };

  const similarity = (a = "", b = "") => {
    if (!a && !b) return 100;
    const distance = levenshtein(a, b);
    const maxLen = Math.max(a.length, b.length) || 1;
    return Math.max(0, Math.round((1 - distance / maxLen) * 100));
  };

  const compareWordLists = (targetText, spokenText) => {
    const targetWords = targetText.split(" ").filter(Boolean);
    const spokenWords = spokenText.split(" ").filter(Boolean);

    const missing = targetWords.filter((word) => !spokenWords.includes(word));
    const extra = spokenWords.filter((word) => !targetWords.includes(word));
    const matched = targetWords.filter((word) => spokenWords.includes(word));

    return {
      targetWords,
      spokenWords,
      missing,
      extra,
      matched,
    };
  };

  const buildPronunciationTips = (verse) => {
    const tips = [];
    if (!verse) return tips;

    if (verse.translit.includes("gh")) {
      tips.push("“gh” tovushi tomoqdan chiqadi, odatiy “g” kabi aytmang.");
    }
    if (verse.translit.includes("kh")) {
      tips.push("“kh” tovushini chuqurroq, tomoqdan chiqaring.");
    }
    if (verse.translit.includes("q")) {
      tips.push("“q” ni oddiy “k” emas, chuqurroq talaffuz qiling.");
    }
    if (verse.translit.includes("aa")) {
      tips.push("Cho‘ziq unlilarni shoshmay, biroz cho‘zib ayting.");
    }
    if (verse.arabic.includes("الل")) {
      tips.push("“Alloh” lafzini aniq va sokin aytishga harakat qiling.");
    }
    if (tips.length === 0) {
      tips.push("Talaffuzni tekis, sokin va oyatni bo‘lib-bo‘lib ayting.");
    }
    return tips;
  };

  const evaluateSpeech = (recognizedText, verse) => {
    if (!verse) return null;

    const target =
      practiceMode === "arabic"
        ? normalizeArabic(verse.arabic)
        : normalizeLatin(verse.translit);

    const spoken =
      practiceMode === "arabic"
        ? normalizeArabic(recognizedText)
        : normalizeLatin(recognizedText);

    const score = similarity(target, spoken);
    const words = compareWordLists(target, spoken);

    let level = "Qayta mashq qiling";
    if (score >= 90) level = "Juda yaxshi";
    else if (score >= 75) level = "Yaxshi";
    else if (score >= 55) level = "O‘rtacha";

    return {
      score,
      level,
      target,
      spoken,
      ...words,
      tips: buildPronunciationTips(verse),
    };
  };

  const filteredVerses = verses.filter((item) => {
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      item.number.toString().includes(q) ||
      item.arabic.toLowerCase().includes(q) ||
      item.translit.toLowerCase().includes(q) ||
      item.meaning.toLowerCase().includes(q);

    const matchesBookmark =
      !showOnlyBookmarks || bookmarks.includes(item.number);
    return matchesSearch && matchesBookmark;
  });

  const scrollToVerse = (verseNumber) => {
    const target = verseRefs.current[verseNumber];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const playVerse = async (verseNumber, resetRepeat = true) => {
    try {
      setSelectedVerse(verseNumber);
      setLoadingVerse(verseNumber);
      setFeedback(null);
      setSpeechResult("");
      setSpeechInterim("");

      if (resetRepeat) repeatCounterRef.current = 0;

      const audio = audioRef.current;
      if (!audio) return;

      audio.src = getAudioUrl(verseNumber);
      audio.load();
      await audio.play();

      scrollToVerse(verseNumber);
      setIsPlaying(true);
    } catch (error) {
      console.error(error);
      setIsPlaying(false);
      alert("Audio yuklanmadi. Internet yoki audio manbani tekshirib ko‘ring.");
    } finally {
      setLoadingVerse(null);
    }
  };

  const pauseAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const resumeAudio = async () => {
    try {
      if (!audioRef.current) return;
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error(error);
    }
  };

  const nextVerse = () => {
    if (selectedVerse < verses.length) playVerse(selectedVerse + 1);
    else if (repeatMode === "all") playVerse(1);
  };

  const prevVerse = () => {
    if (selectedVerse > 1) playVerse(selectedVerse - 1);
  };

  const toggleBookmark = (verseNumber) => {
    setBookmarks((prev) =>
      prev.includes(verseNumber)
        ? prev.filter((n) => n !== verseNumber)
        : [...prev, verseNumber].sort((a, b) => a - b),
    );
  };

  const jumpToBookmark = (verseNumber) => {
    setSelectedVerse(verseNumber);
    scrollToVerse(verseNumber);
  };

  const formatTime = (sec) => {
    if (!sec || Number.isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  const cleanupMicVisual = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = null;
    setMicLevel(0);
  };

  const stopMediaStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    cleanupMicVisual();
  };

  const setupMicLevelMeter = async (stream) => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = new AnalyserNode(audioContext, { fftSize: 256 });

    source.connect(analyser);

    audioContextRef.current = audioContext;
    analyserRef.current = analyser;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const tick = () => {
      if (!analyserRef.current) return;
      analyserRef.current.getByteFrequencyData(dataArray);
      const avg =
        dataArray.reduce((sum, val) => sum + val, 0) / dataArray.length || 0;
      setMicLevel(Math.min(100, Math.round((avg / 255) * 100)));
      animationRef.current = requestAnimationFrame(tick);
    };

    tick();
  };

  const startRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    recognition.lang = speechLang;
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setSpeechStatus("listening");
    recognition.onerror = () => setSpeechStatus("error");
    recognition.onend = () => {
      setSpeechStatus((prev) => (prev === "processing" ? "done" : prev));
    };

    recognition.onresult = (event) => {
      let interim = "";
      let finalText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0]?.transcript || "";
        if (event.results[i].isFinal) finalText += transcript + " ";
        else interim += transcript + " ";
      }

      if (interim.trim()) setSpeechInterim(interim.trim());
      if (finalText.trim()) {
        setSpeechResult((prev) => `${prev} ${finalText}`.trim());
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
    return recognition;
  };

  const stopRecognition = () => {
    try {
      if (recognitionRef.current) {
        setSpeechStatus("processing");
        recognitionRef.current.stop();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const startRecording = async () => {
    try {
      setFeedback(null);
      setSpeechResult("");
      setSpeechInterim("");

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      await setupMicLevelMeter(stream);

      const mimeType = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "";
      const mediaRecorder = new MediaRecorder(
        stream,
        mimeType ? { mimeType } : {},
      );
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: mimeType || "audio/webm",
        });
        const url = URL.createObjectURL(blob);

        setRecordings((prev) => ({
          ...prev,
          [selectedVerse]: {
            url,
            createdAt: Date.now(),
          },
        }));

        const finalText = `${speechResult} ${speechInterim}`.trim();
        if (finalText) {
          const result = evaluateSpeech(finalText, currentVerseData);
          setFeedback(result);
        } else {
          setFeedback({
            score: 0,
            level: "Matn aniqlanmadi",
            target:
              practiceMode === "arabic"
                ? normalizeArabic(currentVerseData?.arabic || "")
                : normalizeLatin(currentVerseData?.translit || ""),
            spoken: "",
            missing: [],
            extra: [],
            matched: [],
            tips: [
              "Mikrofonga yaqinroq gapiring.",
              "Sekin va aniq talaffuz qiling.",
              "Brauzeringizda speech recognition ishlamasligi ham mumkin.",
            ],
          });
        }

        stopMediaStream();
      };

      mediaRecorder.start();
      setIsRecording(true);

      if (speechSupported) startRecognition();
      else setSpeechStatus("unsupported");
    } catch (error) {
      console.error(error);
      alert("Mikrofon ruxsati berilmadi yoki recording boshlanmadi.");
    }
  };

  const stopRecording = () => {
    try {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      }
      stopRecognition();
      setIsRecording(false);
    } catch (error) {
      console.error(error);
      setIsRecording(false);
      stopMediaStream();
    }
  };

  const startShadowPractice = async () => {
    setShadowModeArmed(true);
    await playVerse(selectedVerse);
  };

  const clearRecording = (verseNumber) => {
    setRecordings((prev) => {
      const copy = { ...prev };
      if (copy[verseNumber]?.url) URL.revokeObjectURL(copy[verseNumber].url);
      delete copy[verseNumber];
      return copy;
    });
  };

  const getExamHidden = (type) => {
    if (viewMode !== "exam") return false;
    if (type === "arabic") return true;
    if (type === "translit") return true;
    if (type === "meaning") return true;
    return false;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime || 0);

    const onEnded = async () => {
      setIsPlaying(false);

      if (shadowModeArmed) {
        setShadowModeArmed(false);
        setTimeout(() => {
          startRecording();
        }, shadowDelay);
        return;
      }

      if (repeatMode === "one") {
        if (repeatCounterRef.current < repeatCount - 1) {
          repeatCounterRef.current += 1;
          await playVerse(selectedVerse, false);
          return;
        } else {
          repeatCounterRef.current = 0;
          if (autoNext) {
            if (selectedVerse < verses.length)
              await playVerse(selectedVerse + 1);
            else if (repeatMode === "all") await playVerse(1);
          }
          return;
        }
      }

      if (autoNext) {
        if (selectedVerse < verses.length) await playVerse(selectedVerse + 1);
        else if (repeatMode === "all") await playVerse(1);
      }
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [
    selectedVerse,
    autoNext,
    repeatMode,
    repeatCount,
    shadowModeArmed,
    shadowDelay,
    verses.length,
  ]);

  useEffect(() => {
    return () => {
      stopMediaStream();
      try {
        if (recognitionRef.current) recognitionRef.current.stop();
      } catch {}
    };
  }, []);

  const feedbackColor = !feedback?.score
    ? "text-slate-300"
    : feedback.score >= 90
      ? "text-emerald-300"
      : feedback.score >= 75
        ? "text-sky-300"
        : feedback.score >= 55
          ? "text-amber-300"
          : "text-red-300";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#0f172a_0%,#020617_45%,#020617_100%)] text-white">
      <audio ref={audioRef} preload="none" />
      <audio ref={micAudioRef} preload="none" />

      <div className="mx-auto max-w-7xl px-4 pb-40 pt-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
          <div className="bg-gradient-to-br from-emerald-500/10 via-sky-500/10 to-fuchsia-500/10 p-4 sm:p-6 lg:p-8">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Pill>67-sura</Pill>
              <Pill>30 oyat</Pill>
              <Pill>Mishary Alafasy</Pill>
              <Pill>
                {speechSupported
                  ? "Speech check mavjud"
                  : "Speech check cheklangan"}
              </Pill>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Mulk surasi premium practice
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                  Audio, takrorlash, yodlash, exam mode va mikrofonda aytib
                  talaffuzni tekshirish — hammasi bitta sahifada.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <ActionButton onClick={() => playVerse(1)} variant="primary">
                    1-oyatdan boshlash
                  </ActionButton>
                  <ActionButton onClick={prevVerse}>← Oldingi</ActionButton>
                  {isPlaying ? (
                    <ActionButton onClick={pauseAudio}>Pause</ActionButton>
                  ) : (
                    <ActionButton onClick={resumeAudio}>Continue</ActionButton>
                  )}
                  <ActionButton onClick={nextVerse}>Keyingi →</ActionButton>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  <ActionButton
                    onClick={startShadowPractice}
                    variant="secondary"
                  >
                    Listen → Keyin Record
                  </ActionButton>
                  {!isRecording ? (
                    <ActionButton onClick={startRecording} variant="secondary">
                      🎙 Record boshlash
                    </ActionButton>
                  ) : (
                    <ActionButton onClick={stopRecording} variant="danger">
                      ⏹ Record to‘xtatish
                    </ActionButton>
                  )}
                  <ActionButton
                    onClick={() => toggleBookmark(selectedVerse)}
                    variant="secondary"
                  >
                    {bookmarks.includes(selectedVerse)
                      ? "Bookmark olib tashlash"
                      : "Bookmark"}
                  </ActionButton>
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-slate-950/60 p-4 shadow-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Hozirgi oyat
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  {selectedVerse}-oyat
                </h2>

                {!getExamHidden("arabic") ? (
                  <p
                    className="mt-4 text-right text-2xl leading-[2.15] sm:text-3xl"
                    dir="rtl"
                  >
                    {currentVerseData?.arabic}
                  </p>
                ) : (
                  <div className="mt-4 rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-center text-slate-400">
                    Exam mode: oyat yashirilgan
                  </div>
                )}

                {showTranslit && !getExamHidden("translit") && (
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {currentVerseData?.translit}
                  </p>
                )}

                {showMeaning && !getExamHidden("meaning") && (
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {currentVerseData?.meaning}
                  </p>
                )}

                <button
                  onClick={() => playVerse(selectedVerse)}
                  className="mt-5 w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-3 text-sm font-black text-slate-950 transition hover:scale-[1.01]"
                >
                  {loadingVerse === selectedVerse
                    ? "Yuklanmoqda..."
                    : "🎧 Shu oyatni eshitish"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[26px] border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Qidirish
            </label>
            <input
              type="text"
              placeholder="Oyat raqami, arabcha, o‘qilishi yoki ma’nosi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />

            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <ToggleCard
                label="Ma’nosini ko‘rsatish"
                checked={showMeaning}
                onChange={setShowMeaning}
              />
              <ToggleCard
                label="O‘qilishini ko‘rsatish"
                checked={showTranslit}
                onChange={setShowTranslit}
              />
              <ToggleCard
                label="Auto next"
                checked={autoNext}
                onChange={setAutoNext}
              />
              <ToggleCard
                label="Compact mode"
                checked={compactMode}
                onChange={setCompactMode}
              />
              <ToggleCard
                label="Faqat bookmarklar"
                checked={showOnlyBookmarks}
                onChange={setShowOnlyBookmarks}
              />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <SelectBlock
                label="Repeat mode"
                value={repeatMode}
                onChange={setRepeatMode}
                options={[
                  { label: "Off", value: "off" },
                  { label: "One", value: "one" },
                  { label: "All", value: "all" },
                ]}
              />

              <SelectBlock
                label="Repeat count"
                value={repeatCount}
                onChange={(v) => setRepeatCount(Number(v))}
                options={[1, 2, 3, 4, 5, 7, 10].map((n) => ({
                  label: `${n} marta`,
                  value: n,
                }))}
              />

              <SelectBlock
                label="Speed"
                value={playbackRate}
                onChange={(v) => setPlaybackRate(Number(v))}
                options={[
                  { label: "0.75x", value: 0.75 },
                  { label: "1x", value: 1 },
                  { label: "1.25x", value: 1.25 },
                  { label: "1.5x", value: 1.5 },
                ]}
              />

              <SelectBlock
                label="Speech lang"
                value={speechLang}
                onChange={setSpeechLang}
                options={[
                  { label: "Arabic (ar-SA)", value: "ar-SA" },
                  { label: "English (en-US)", value: "en-US" },
                ]}
              />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <SelectBlock
                label="Practice target"
                value={practiceMode}
                onChange={setPracticeMode}
                options={[
                  { label: "Arabic", value: "arabic" },
                  { label: "Translit", value: "translit" },
                ]}
              />

              <SelectBlock
                label="View mode"
                value={viewMode}
                onChange={setViewMode}
                options={[
                  { label: "All", value: "all" },
                  { label: "Practice", value: "practice" },
                  { label: "Exam", value: "exam" },
                ]}
              />

              <SelectBlock
                label="Shadow delay"
                value={shadowDelay}
                onChange={(v) => setShadowDelay(Number(v))}
                options={[
                  { label: "0.8 sec", value: 800 },
                  { label: "1.2 sec", value: 1200 },
                  { label: "1.8 sec", value: 1800 },
                  { label: "2.5 sec", value: 2500 },
                ]}
              />
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                <span>Audio progress</span>
                <span>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="rounded-[26px] border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              AI practice / talaffuz tekshiruv
            </p>

            <div className="mt-3 grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-200">
                    Mikrofon holati
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      isRecording
                        ? "bg-red-500/20 text-red-300"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    {isRecording ? "Recording..." : "Idle"}
                  </span>
                </div>

                <div className="mt-3">
                  <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                    <span>Mic level</span>
                    <span>{micLevel}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-fuchsia-400 via-pink-400 to-red-400 transition-all"
                      style={{ width: `${micLevel}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 text-xs leading-6 text-slate-400">
                  Speech status:{" "}
                  <span className="font-semibold text-slate-200">
                    {speechStatus}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Aniqlangan matn
                </p>
                <p className="min-h-[56px] text-sm leading-7 text-slate-200">
                  {speechResult || speechInterim || "Hali matn aniqlanmadi."}
                </p>
              </div>

              {recordings[selectedVerse]?.url && (
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-200">
                      Sizning yozilgan audiongiz
                    </p>
                    <button
                      onClick={() => clearRecording(selectedVerse)}
                      className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300"
                    >
                      O‘chirish
                    </button>
                  </div>
                  <audio
                    controls
                    className="w-full"
                    src={recordings[selectedVerse].url}
                  />
                </div>
              )}

              {feedback && (
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                        Natija
                      </p>
                      <h3
                        className={`mt-1 text-2xl font-black ${feedbackColor}`}
                      >
                        {feedback.score}% • {feedback.level}
                      </h3>
                    </div>
                    <div className="rounded-2xl bg-white/5 px-4 py-3 text-right">
                      <p className="text-xs text-slate-500">Target</p>
                      <p className="text-sm font-semibold text-slate-200">
                        {practiceMode === "arabic"
                          ? "Arabcha oyat"
                          : "O‘qilishi"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3">
                    <MiniBlock
                      title="Tushib qolgan so‘zlar"
                      value={
                        feedback.missing.length
                          ? feedback.missing.join(", ")
                          : "Yo‘q"
                      }
                    />
                    <MiniBlock
                      title="Ortiqcha / noto‘g‘ri so‘zlar"
                      value={
                        feedback.extra.length
                          ? feedback.extra.join(", ")
                          : "Yo‘q"
                      }
                    />
                    <MiniBlock
                      title="Mos kelgan so‘zlar"
                      value={
                        feedback.matched.length
                          ? feedback.matched.join(", ")
                          : "Hali aniqlanmadi"
                      }
                    />
                  </div>

                  <div className="mt-4 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-4">
                    <p className="mb-2 text-sm font-bold text-emerald-300">
                      Mashq tavsiyalari
                    </p>
                    <ul className="space-y-2 text-sm leading-7 text-slate-300">
                      {feedback.tips.map((tip, i) => (
                        <li key={i}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {bookmarks.length > 0 && (
          <div className="mt-6 rounded-[26px] border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold text-white">
                Bookmark qilingan oyatlar
              </h3>
              <button
                onClick={() => setBookmarks([])}
                className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300"
              >
                Tozalash
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {bookmarks.map((num) => (
                <button
                  key={num}
                  onClick={() => jumpToBookmark(num)}
                  className="rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-200"
                >
                  {num}-oyat
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 grid gap-4">
          {filteredVerses.map((item) => {
            const isActive = item.number === selectedVerse;
            const isBookmarked = bookmarks.includes(item.number);

            return (
              <div
                key={item.number}
                ref={(el) => (verseRefs.current[item.number] = el)}
                className={`rounded-[26px] border p-4 transition-all sm:p-5 ${
                  isActive
                    ? "border-emerald-400/30 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10"
                    : "border-white/10 bg-white/5"
                } shadow-xl backdrop-blur`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          isActive
                            ? "bg-emerald-400 text-slate-950"
                            : "bg-white/10 text-slate-200"
                        }`}
                      >
                        {item.number}-oyat
                      </span>
                      {isActive && (
                        <span className="rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold text-sky-300">
                          Hozirgi oyat
                        </span>
                      )}
                      {isBookmarked && (
                        <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-300">
                          Bookmark
                        </span>
                      )}
                    </div>

                    {!getExamHidden("arabic") ? (
                      <p
                        dir="rtl"
                        className={`text-right text-white ${
                          compactMode
                            ? "text-2xl leading-[2.05]"
                            : "text-3xl leading-[2.15]"
                        }`}
                      >
                        {item.arabic}
                      </p>
                    ) : (
                      <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/40 p-4 text-sm text-slate-500">
                        Exam mode yoqilgan
                      </div>
                    )}

                    {showTranslit &&
                      !getExamHidden("translit") &&
                      viewMode !== "practice" && (
                        <div className="mt-4">
                          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                            O‘qilishi
                          </p>
                          <p className="text-sm leading-7 text-slate-300 sm:text-base">
                            {item.translit}
                          </p>
                        </div>
                      )}

                    {showMeaning &&
                      !getExamHidden("meaning") &&
                      viewMode === "all" && (
                        <div className="mt-4">
                          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                            Ma’nosi
                          </p>
                          <p className="text-sm leading-7 text-slate-400 sm:text-base">
                            {item.meaning}
                          </p>
                        </div>
                      )}
                  </div>

                  <div className="grid shrink-0 grid-cols-2 gap-2 sm:w-64">
                    <SmallButton
                      onClick={() => playVerse(item.number)}
                      variant="primary"
                    >
                      {loadingVerse === item.number ? "..." : "Play"}
                    </SmallButton>
                    <SmallButton onClick={() => setSelectedVerse(item.number)}>
                      Tanlash
                    </SmallButton>
                    <SmallButton onClick={() => toggleBookmark(item.number)}>
                      {isBookmarked ? "Unsave" : "Save"}
                    </SmallButton>
                    <a
                      href={getAudioUrl(item.number)}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white"
                    >
                      Audio
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Bottom player
              </p>
              <p className="truncate text-sm font-bold text-white sm:text-base">
                {selectedVerse}-oyat • {currentVerseData?.translit}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <SmallIconButton onClick={prevVerse}>←</SmallIconButton>

              {isPlaying ? (
                <SmallIconButton onClick={pauseAudio}>Pause</SmallIconButton>
              ) : (
                <SmallIconButton onClick={() => playVerse(selectedVerse)}>
                  Play
                </SmallIconButton>
              )}

              <SmallIconButton onClick={nextVerse}>→</SmallIconButton>

              {!isRecording ? (
                <SmallIconButton onClick={startRecording}>🎙</SmallIconButton>
              ) : (
                <SmallIconButton onClick={stopRecording}>⏹</SmallIconButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pill({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
      {children}
    </span>
  );
}

function ActionButton({ children, onClick, variant = "default" }) {
  const styles = {
    primary:
      "bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-black hover:scale-[1.01]",
    secondary: "bg-white/5 text-white border border-white/10 hover:bg-white/10",
    danger:
      "bg-red-500/15 text-red-300 border border-red-500/20 hover:bg-red-500/20",
    default: "bg-white/5 text-white border border-white/10 hover:bg-white/10",
  };

  return (
    <button
      onClick={onClick}
      className={`rounded-2xl px-4 py-3 text-sm transition ${styles[variant] || styles.default}`}
    >
      {children}
    </button>
  );
}

function SmallButton({ children, onClick, variant = "default" }) {
  const cls =
    variant === "primary"
      ? "bg-emerald-400 text-slate-950 font-black"
      : "bg-white/5 border border-white/10 text-white";
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl px-4 py-3 text-sm ${cls}`}
    >
      {children}
    </button>
  );
}

function SmallIconButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
    >
      {children}
    </button>
  );
}

function ToggleCard({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-200">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-emerald-400"
      />
      {label}
    </label>
  );
}

function SelectBlock({ label, value, onChange, options }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
      >
        {options.map((opt) => (
          <option key={String(opt.value)} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function MiniBlock({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
        {title}
      </p>
      <p className="text-sm leading-7 text-slate-200">{value}</p>
    </div>
  );
}
