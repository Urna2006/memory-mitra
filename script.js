let selectedRegion = "";
let selectedLanguage = "";
let selectedDifficulty = "";

let cards = [];
let flippedCards = [];
let moves = 0;
let mistakes = 0;
let correctMatches = 0;
let responseTimes = [];
let cardFlipStartTime = null;
let matchedPairs = 0;
let timer = 0;
let timerInterval;


// =====================================================
// REGIONAL CARD DATABASE
// প্রতিটি region-এ অনেকগুলো আলাদা card
// =====================================================

const regionCards = {

    assam: [
    { image: "Images/assam/assam-tea.jpg", name: "Assam Tea Garden" },
    { image: "Images/assam/dance.jpg", name: "Bihu Dance" },
    { image: "Images/assam/drum.jpg", name: "Dhol Drum" },
    { image: "Images/assam/gamosa.jpg", name: "Gamosa" },
    { image: "Images/assam/jaapi.jpg", name: "Jaapi" },
    { image: "Images/assam/kamakhya.jpg", name: "Kamakhya" },
    { image: "Images/assam/majuli.jpg", name: "Majuli Island" },
    { image: "Images/assam/manas.jpg", name: "Manas National Park" },
    { image: "Images/assam/mask.jpg", name: "Mask" },
    { image: "Images/assam/muga.jpg", name: "Muga Silk" },
    { image: "Images/assam/pitha.jpg", name: "Pitha" },
    { image: "Images/assam/rang-ghar.jpg", name: "Rang Ghar" },
    { image: "Images/assam/rhino.jpg", name: "One-horned Rhino" },
    { image: "Images/assam/saraighat.jpg", name: "Saraighat" },
    { image: "Images/assam/temple.jpg", name: "Kamakhya Temple" },
    { image: "Images/assam/thali.jpg", name: "Assamese Thali" }
    ],

    nepal: [
    { image: "Images/nepal/art.jpg", name: "Mithila Art" },
    { image: "Images/nepal/chitwan.jpg", name: "Chitwan National Park" },
    { image: "Images/nepal/daura.jpg", name: "Daura Suruwal" },
    { image: "Images/nepal/durbar.jpg", name: "Kathmandu Durbar Square" },
    { image: "Images/nepal/everest.jpg", name: "Mount Everest" },
    { image: "Images/nepal/food.jpg", name: "Thakali Food " },
    { image: "Images/nepal/kumari.jpg", name: "Living Goddess Kumari" },
    { image: "Images/nepal/lake.jpg", name: "Phewa Lake" },
    { image: "Images/nepal/lakhey.jpg", name: "Lakhey Dance" },
    { image: "Images/nepal/nepal.jpg", name: "Nepal Flag" },
    { image: "Images/nepal/nepali.jpg", name: "Nepali Momo" },
    { image: "Images/nepal/pokhara.jpg", name: "Pokhara" },
    { image: "Images/nepal/stupa.jpg", name: "Boudhanath Stupa" },
    { image: "Images/nepal/swayambhunath.jpg", name: "Swayambhunath Stupa" },
    { image: "Images/nepal/tihar.jpg", name: "Tihar Festival" },
    { image: "Images/nepal/topi.jpg", name: "Dhaka Topi" }    
        
    ],

    sikkim: [
    { image: "Images/sikkim/bamboo.jpg", name: "Sikkim Bamboo" },
    { image: "Images/sikkim/churpi.jpg", name: "Churpi" },
    { image: "Images/sikkim/dress.jpg", name: "Traditional Dress" },
    { image: "Images/sikkim/festival.jpg", name: "Losar Festival" },
    { image: "Images/sikkim/flag.jpg", name: "Prayer Flag" },
    { image: "Images/sikkim/flok.jpg", name: "Folk Dance" },
    { image: "Images/sikkim/momo.jpg", name: "Momo" },
    { image: "Images/sikkim/monastery.jpg", name: "Rumtek Monastery" },
    { image: "Images/sikkim/mountain.jpg", name: "Kanchenjunga" },
    { image: "Images/sikkim/nathula.jpg", name: "Nathula Pass" },
    { image: "Images/sikkim/painting.jpg", name: "Thangka Painting" },
    { image: "Images/sikkim/panda.jpg", name: "Red Panda" },
    { image: "Images/sikkim/roti.jpg", name: "Sel Roti" },
    { image: "Images/sikkim/thukpa.jpg", name: "Thukpa" },
    { image: "Images/sikkim/water fall.jpg", name: "Seven Sister Waterfall" },
    { image: "Images/sikkim/yak.jpg", name: "Yak" }
        
    ],

    west_bengal: [
    { image: "Images/westbengal/coconut.jpg", name: "Coconut" },
    { image: "Images/westbengal/dhak.jpg", name: "Dhak" },
    { image: "Images/westbengal/durgapuja.jpg", name: "Durga Puja" },
    { image: "Images/westbengal/hilsa.jpg", name: "Hisla" },
    { image: "Images/westbengal/howrah.jpg", name: "Howrah Bridge" },
    { image: "Images/westbengal/mango.jpg", name: "Mango" },
    { image: "Images/westbengal/misti-doi.jpg", name: "Misti-doi" },
    { image: "Images/westbengal/patachitra.jpg", name: "Patachitra" },
    { image: "Images/westbengal/rice.jpg", name: "Rice" },
    { image: "Images/westbengal/rosogolla.jpg", name: "Rosogolla" },
    { image: "Images/westbengal/shiuli.jpg", name: "Shiuli Flower" },
    { image: "Images/westbengal/sundarbans.jpg", name: "Sundarbans" },
    { image: "Images/westbengal/tea.jpg", name: "Darjeeling Tea" },
    { image: "Images/westbengal/tiger.jpg", name: "Royal Bengal Tiger" },
    { image: "Images/westbengal/victoria.jpg", name: "Victoria Memorial" },
    { image: "Images/westbengal/village.jpg", name: "Bengal Village" }

    ],
};

const cardTranslations = {

    "Coconut": {
        bengali: "নারকেল",
        english: "Coconut",
        hindi: "नारियल",
        assamese: "নাৰিকল",
        nepali: "नरिवल"
    },

    "Dhak": {
        bengali: "ঢাক",
        english: "Dhak",
        hindi: "ढाक",
        assamese: "ঢাক",
        nepali: "ढाक"
    },

    "Durga Puja": {
        bengali: "দুর্গাপূজা",
        english: "Durga Puja",
        hindi: "दुर्गा पूजा",
        assamese: "দুৰ্গা পূজা",
        nepali: "दुर्गा पूजा"
    },

    "Hisla": {
        bengali: "ইলিশ",
        english: "Hilsa",
        hindi: "हिल्सा",
        assamese: "ইলিশ",
        nepali: "हिल्सा"
    },

    "Howrah Bridge": {
        bengali: "হাওড়া ব্রিজ",
        english: "Howrah Bridge",
        hindi: "हावड़ा ब्रिज",
        assamese: "হাওৰা দলং",
        nepali: "हावडा पुल"
    },

    "Mango": {
        bengali: "আম",
        english: "Mango",
        hindi: "आम",
        assamese: "আম",
        nepali: "आँप"
    },

    "Misti-doi": {
        bengali: "মিষ্টি দই",
        english: "Sweet Yogurt",
        hindi: "मिष्टी दोई",
        assamese: "মিঠা দৈ",
        nepali: "मिठो दही"
    },

    "Patachitra": {
        bengali: "পটচিত্র",
        english: "Patachitra",
        hindi: "पटचित्र",
        assamese: "পটচিত্ৰ",
        nepali: "पटचित्र"
    },

    "Rice": {
        bengali: "চাল",
        english: "Rice",
        hindi: "चावल",
        assamese: "চাউল",
        nepali: "चामल"
    },

    "Rosogolla": {
        bengali: "রসগোল্লা",
        english: "Rosogolla",
        hindi: "रसगुल्ला",
        assamese: "ৰসগোল্লা",
        nepali: "रसबरी"
    },

    "Shiuli Flower": {
        bengali: "শিউলি ফুল",
        english: "Shiuli Flower",
        hindi: "शिउली फूल",
        assamese: "শেৱালি ফুল",
        nepali: "शेफाली फूल"
    },

    "Sundarbans": {
        bengali: "সুন্দরবন",
        english: "Sundarbans",
        hindi: "सुंदरबन",
        assamese: "সুন্দৰবন",
        nepali: "सुन्दरवन"
    },

    "Darjeeling Tea": {
        bengali: "দার্জিলিং চা",
        english: "Darjeeling Tea",
        hindi: "दार्जिलिंग चाय",
        assamese: "দাৰ্জিলিং চাহ",
        nepali: "दार्जिलिङ चिया"
    },

    "Royal Bengal Tiger": {
        bengali: "রয়্যাল বেঙ্গল টাইগার",
        english: "Royal Bengal Tiger",
        hindi: "रॉयल बंगाल टाइगर",
        assamese: "ৰয়েল বেংগল টাইগাৰ",
        nepali: "रोयल बंगाल बाघ"
    },

    "Victoria Memorial": {
        bengali: "ভিক্টোরিয়া মেমোরিয়াল",
        english: "Victoria Memorial",
        hindi: "विक्टोरिया मेमोरियल",
        assamese: "ভিক্টোৰিয়া মেম’ৰিয়েল",
        nepali: "भिक्टोरिया मेमोरियल"
    },

    "Bengal Village": {
        bengali: "বাংলার গ্রাম",
        english: "Bengal Village",
        hindi: "बंगाल का गाँव",
        assamese: "বংগৰ গাঁও",
        nepali: "बंगालको गाउँ"
    },

    "Assam Tea Garden": {
        bengali: "আসামের চা বাগান",
        english: "Assam Tea Garden",
        hindi: "असम का चाय बागान",
        assamese: "অসমৰ চাহ বাগিচা",
        nepali: "असमको चिया बगान"
    },

    "Bihu Dance": {
        bengali: "বিহু নৃত্য",
        english: "Bihu Dance",
        hindi: "बिहू नृत्य",
        assamese: "বিহু নৃত্য",
        nepali: "बिहु नृत्य"
    },

    "Dhol Drum": {
        bengali: "ঢোল",
        english: "Dhol Drum",
        hindi: "ढोल",
        assamese: "ঢোল",
        nepali: "ढोल"
    },

    "Gamosa": {
        bengali: "গামোছা",
        english: "Gamosa",
        hindi: "गामोछा",
        assamese: "গামোচা",
        nepali: "गामोछा"
    },

    "Jaapi": {
        bengali: "জাপি",
        english: "Jaapi",
        hindi: "जापी",
        assamese: "জাপি",
        nepali: "जापी"
    },

    "Kamakhya": {
        bengali: "কামাখ্যা",
        english: "Kamakhya",
        hindi: "कामाख्या",
        assamese: "কামাখ্যা",
        nepali: "कामाख्या"
    },

    "Majuli Island": {
        bengali: "মাজুলি দ্বীপ",
        english: "Majuli Island",
        hindi: "माजुली द्वीप",
        assamese: "মাজুলী দ্বীপ",
        nepali: "माजुली टापु"
    },

    "Manas National Park": {
        bengali: "মানস জাতীয় উদ্যান",
        english: "Manas National Park",
        hindi: "मानस राष्ट्रीय उद्यान",
        assamese: "মানস ৰাষ্ট্ৰীয় উদ্যান",
        nepali: "मानस राष्ट्रिय निकुञ्ज"
    },

    "Mask": {
        bengali: "মুখোশ",
        english: "Mask",
        hindi: "मुखौटा",
        assamese: "মুখা",
        nepali: "मुखौटा"
    },

    "Muga Silk": {
        bengali: "মুগা রেশম",
        english: "Muga Silk",
        hindi: "मूगा रेशम",
        assamese: "মুগা ৰেচম",
        nepali: "मुगा रेशम"
    },

    "Pitha": {
        bengali: "পিঠা",
        english: "Pitha",
        hindi: "पीठा",
        assamese: "পিঠা",
        nepali: "पिठा"
    },

    "Rang Ghar": {
        bengali: "রং ঘর",
        english: "Rang Ghar",
        hindi: "रंग घर",
        assamese: "ৰংঘৰ",
        nepali: "रंग घर"
    },

    "One-horned Rhino": {
        bengali: "একশৃঙ্গ গণ্ডার",
        english: "One-horned Rhino",
        hindi: "एक सींग वाला गैंडा",
        assamese: "এশিঙীয়া গঁড়",
        nepali: "एकसिंगे गैँडा"
    },

    "Saraighat": {
        bengali: "সরাইঘাট",
        english: "Saraighat",
        hindi: "सराईघाट",
        assamese: "শৰাইঘাট",
        nepali: "सराइघाट"
    },

    "Kamakhya Temple": {
        bengali: "কামাখ্যা মন্দির",
        english: "Kamakhya Temple",
        hindi: "कामाख्या मंदिर",
        assamese: "কামাখ্যা মন্দিৰ",
        nepali: "कामाख्या मन्दिर"
    },

    "Assamese Thali": {
        bengali: "অসমীয়া থালি",
        english: "Assamese Thali",
        hindi: "असमिया थाली",
        assamese: "অসমীয়া থালি",
        nepali: "असमिया थाली"
    },

    "Sikkim Bamboo": {
        bengali: "সিকিমের বাঁশ",
        english: "Sikkim Bamboo",
        hindi: "सिक्किम का बाँस",
        assamese: "ছিকিমৰ বাঁহ",
        nepali: "सिक्किमको बाँस"
    },

    "Churpi": {
        bengali: "ছুরপি",
        english: "Churpi",
        hindi: "छुरपी",
        assamese: "ছুৰপি",
        nepali: "छुर्पी"
    },

    "Traditional Dress": {
        bengali: "ঐতিহ্যবাহী পোশাক",
        english: "Traditional Dress",
        hindi: "पारंपरिक पोशाक",
        assamese: "পৰম্পৰাগত পোছাক",
        nepali: "परम्परागत पोशाक"
    },

    "Losar Festival": {
        bengali: "লোসার উৎসব",
        english: "Losar Festival",
        hindi: "लोसार त्योहार",
        assamese: "লোছাৰ উৎসৱ",
        nepali: "ल्होसार पर्व"
    },

    "Prayer Flag": {
        bengali: "প্রার্থনার পতাকা",
        english: "Prayer Flag",
        hindi: "प्रार्थना ध्वज",
        assamese: "প্ৰাৰ্থনা পতাকা",
        nepali: "प्रार्थना झण्डा"
    },

    "Folk Dance": {
        bengali: "লোকনৃত্য",
        english: "Folk Dance",
        hindi: "लोक नृत्य",
        assamese: "লোক নৃত্য",
        nepali: "लोक नृत्य"
    },

    "Momo": {
        bengali: "মোমো",
        english: "Momo",
        hindi: "मोमो",
        assamese: "মোমো",
        nepali: "मोमो"
    },

    "Rumtek Monastery": {
        bengali: "রুমটেক মঠ",
        english: "Rumtek Monastery",
        hindi: "रुमटेक मठ",
        assamese: "ৰুমটেক মঠ",
        nepali: "रुमटेक गुम्बा"
    },

    "Kanchenjunga": {
        bengali: "কাঞ্চনজঙ্ঘা",
        english: "Kanchenjunga",
        hindi: "कंचनजंघा",
        assamese: "কাঞ্চনজংঘা",
        nepali: "कञ्चनजङ्घा"
    },

    "Nathula Pass": {
        bengali: "নাথুলা পাস",
        english: "Nathula Pass",
        hindi: "नाथुला दर्रा",
        assamese: "নাথুলা গিৰিপথ",
        nepali: "नाथुला दर्रा"
    },

    "Thangka Painting": {
        bengali: "থাংকা চিত্র",
        english: "Thangka Painting",
        hindi: "थांका चित्रकला",
        assamese: "থাংকা চিত্ৰ",
        nepali: "थाङ्का चित्रकला"
    },

    "Red Panda": {
        bengali: "লাল পান্ডা",
        english: "Red Panda",
        hindi: "लाल पांडा",
        assamese: "ৰঙা পান্ডা",
        nepali: "रातो पाण्डा"
    },

    "Sel Roti": {
        bengali: "সেল রুটি",
        english: "Sel Roti",
        hindi: "सेल रोटी",
        assamese: "চেল ৰুটি",
        nepali: "सेल रोटी"
    },

    "Thukpa": {
        bengali: "থুকপা",
        english: "Thukpa",
        hindi: "थुकपा",
        assamese: "থুকপা",
        nepali: "थुक्पा"
    },

    "Seven Sister Waterfall": {
        bengali: "সেভেন সিস্টার্স জলপ্রপাত",
        english: "Seven Sister Waterfall",
        hindi: "सेवन सिस्टर्स जलप्रपात",
        assamese: "ছেভেন ছিষ্টাৰ জলপ্ৰপাত",
        nepali: "सेभेन सिस्टर्स झरना"
    },

    "Yak": {
        bengali: "চমরী গাই",
        english: "Yak",
        hindi: "याक",
        assamese: "য়াক",
        nepali: "याक"
    },

    "Mithila Art": {
        bengali: "মিথিলা শিল্প",
        english: "Mithila Art",
        hindi: "मिथिला कला",
        assamese: "মিথিলা শিল্প",
        nepali: "मिथिला कला"
    },

    "Chitwan National Park": {
        bengali: "চিতওয়ান জাতীয় উদ্যান",
        english: "Chitwan National Park",
        hindi: "चितवन राष्ट्रीय उद्यान",
        assamese: "চিতৱান ৰাষ্ট্ৰীয় উদ্যান",
        nepali: "चितवन राष्ट्रिय निकुञ्ज"
    },

    "Daura Suruwal": {
        bengali: "দৌরা সুরুওয়াল",
        english: "Daura Suruwal",
        hindi: "दौरा सुरुवाल",
        assamese: "দৌৰা সুৰুৱাল",
        nepali: "दौरा सुरुवाल"
    },

    "Kathmandu Durbar Square": {
        bengali: "কাঠমান্ডু দরবার স্কয়ার",
        english: "Kathmandu Durbar Square",
        hindi: "काठमांडू दरबार स्क्वायर",
        assamese: "কাঠমাণ্ডু দৰবাৰ স্কোৱেৰ",
        nepali: "काठमाडौं दरबार स्क्वायर"
    },

    "Mount Everest": {
        bengali: "মাউন্ট এভারেস্ট",
        english: "Mount Everest",
        hindi: "माउंट एवरेस्ट",
        assamese: "মাউণ্ট এভাৰেষ্ট",
        nepali: "सगरमाथा"
    },

    "Thakali Food ": {
        bengali: "থাকালি খাবার",
        english: "Thakali Food",
        hindi: "थकाली भोजन",
        assamese: "থাকালি খাদ্য",
        nepali: "थकाली खाना"
    },

    "Living Goddess Kumari": {
        bengali: "জীবন্ত দেবী কুমারী",
        english: "Living Goddess Kumari",
        hindi: "जीवित देवी कुमारी",
        assamese: "জীৱন্ত দেৱী কুমাৰী",
        nepali: "जीवित देवी कुमारी"
    },

    "Phewa Lake": {
        bengali: "ফেওয়া হ্রদ",
        english: "Phewa Lake",
        hindi: "फेवा झील",
        assamese: "ফেৱা হ্ৰদ",
        nepali: "फेवा ताल"
    },

    "Lakhey Dance": {
        bengali: "লাখে নৃত্য",
        english: "Lakhey Dance",
        hindi: "लाखे नृत्य",
        assamese: "লাখে নৃত্য",
        nepali: "लाखे नाच"
    },

    "Nepal Flag": {
        bengali: "নেপালের পতাকা",
        english: "Nepal Flag",
        hindi: "नेपाल का झंडा",
        assamese: "নেপালৰ পতাকা",
        nepali: "नेपालको झण्डा"
    },

    "Nepali Momo": {
        bengali: "নেপালি মোমো",
        english: "Nepali Momo",
        hindi: "नेपाली मोमो",
        assamese: "নেপালী মোমো",
        nepali: "नेपाली मोमो"
    },

    "Pokhara": {
        bengali: "পোখারা",
        english: "Pokhara",
        hindi: "पोखरा",
        assamese: "পোখৰা",
        nepali: "पोखरा"
    },

    "Boudhanath Stupa": {
        bengali: "বৌদ্ধনাথ স্তূপ",
        english: "Boudhanath Stupa",
        hindi: "बौद्धनाथ स्तूप",
        assamese: "বৌদ্ধনাথ স্তূপ",
        nepali: "बौद्धनाथ स्तूप"
    },

    "Swayambhunath Stupa": {
        bengali: "স্বয়ম্ভুনাথ স্তূপ",
        english: "Swayambhunath Stupa",
        hindi: "स्वयम्भूनाथ स्तूप",
        assamese: "স্বয়ম্ভুনাথ স্তূপ",
        nepali: "स्वयम्भूनाथ स्तूप"
    },

    "Tihar Festival": {
        bengali: "তিহার উৎসব",
        english: "Tihar Festival",
        hindi: "तिहार त्योहार",
        assamese: "তিহাৰ উৎসৱ",
        nepali: "तिहार पर्व"
    },

    "Dhaka Topi": {
        bengali: "ঢাকা টুপি",
        english: "Dhaka Topi",
        hindi: "ढाका टोपी",
        assamese: "ঢাকা টুপী",
        nepali: "ढाका टोपी"
    }

};

function getCardName(name) {
    if (cardTranslations[name]) {
        return cardTranslations[name][selectedLanguage] || name;
    }

    return name;
}


// =====================================================
// LANGUAGE TEXT
// =====================================================

const languageText = {

    bengali: {
        difficulty: "কঠিনতার স্তর বেছে নিন 🎯",
        moves: "চাল",
        time: "সময়",
        restart: "🔄 আবার শুরু করুন",
        win: "🎉 অভিনন্দন!",
        winMessage: "আপনি সফলভাবে সব কার্ড মিলিয়েছেন!",
        playAgain: "🔄 আবার খেলুন",
        home: "🏠 হোম"
    },

    assamese: {
        difficulty: "কঠিনতাৰ স্তৰ বাছনি কৰক 🎯",
        moves: "চাল",
        time: "সময়",
        restart: "🔄 পুনৰ আৰম্ভ কৰক",
        win: "🎉 অভিনন্দন!",
        winMessage: "আপুনি সফলতাৰে সকলো কাৰ্ড মিলাইছে!",
        playAgain: "🔄 আকৌ খেলক",
        home: "🏠 হোম"
    },

    hindi: {
        difficulty: "कठिनाई स्तर चुनें 🎯",
        moves: "चाल",
        time: "समय",
        restart: "🔄 फिर से शुरू करें",
        win: "🎉 बधाई हो!",
        winMessage: "आपने सफलतापूर्वक सभी कार्ड मिला दिए!",
        playAgain: "🔄 फिर से खेलें",
        home: "🏠 होम"
    },

    english: {
        difficulty: "Choose Difficulty 🎯",
        moves: "Moves",
        time: "Time",
        restart: "🔄 Restart Game",
        win: "🎉 Congratulations!",
        winMessage: "You completed the game!",
        playAgain: "🔄 Play Again",
        home: "🏠 Home"
    },

    nepali: {
        difficulty: "कठिनाई स्तर छान्नुहोस् 🎯",
        moves: "चाल",
        time: "समय",
        restart: "🔄 फेरि सुरु गर्नुहोस्",
        win: "🎉 बधाई छ!",
        winMessage: "तपाईंले सफलतापूर्वक सबै कार्ड मिलाउनुभयो!",
        playAgain: "🔄 फेरि खेल्नुहोस्",
        home: "🏠 गृहपृष्ठ"
    }
};


// =====================================================
// SCREEN CONTROL
// =====================================================

function showScreen(screenId) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(screenId).classList.add("active");
}


// =====================================================
// START BUTTON
// =====================================================

document.getElementById("startBtn").addEventListener("click", () => {
    showScreen("regionScreen");
});


// =====================================================
// REGION SELECTION
// =====================================================

document.querySelectorAll(".region-btn").forEach(button => {

    button.addEventListener("click", () => {

        selectedRegion = button.dataset.region;

        showScreen("languagesScreen");
    });

});


// =====================================================
// LANGUAGE SELECTION
// =====================================================

document.querySelectorAll(".language-btn").forEach(button => {

    button.addEventListener("click", () => {

        selectedLanguage = button.dataset.language;

        updateLanguage();

        showScreen("difficultyScreen");
    });

});


// =====================================================
// DIFFICULTY SELECTION
// =====================================================

document.querySelectorAll(".difficulty-btn").forEach(button => {

    button.addEventListener("click", () => {

        selectedDifficulty = button.dataset.difficulty;

        startGame();
    });

});


// =====================================================
// LANGUAGE UPDATE
// =====================================================

function updateLanguage() {

    const text = languageText[selectedLanguage];

    document.getElementById("difficultyTitle").textContent =
        text.difficulty;

    document.getElementById("restartBtn").textContent =
        text.restart;

    document.querySelector("#winScreen h1").textContent =
        text.win;

    document.getElementById("winMessage").textContent =
        text.winMessage;

    document.getElementById("playAgainBtn").textContent =
        text.playAgain;

    document.getElementById("homeBtn").textContent =
        text.home;
}


// =====================================================
// SHUFFLE FUNCTION
// =====================================================

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] =
            [array[j], array[i]];
    }

    return array;
}


// =====================================================
// START GAME
// =====================================================

function startGame() {

    clearInterval(timerInterval);

    mistakes = 0;
    correctMatches = 0;
    responseTimes = [];
    cardFlipStartTime = null;

    const difficultyIndicator = document.getElementById("difficultyIndicator");

if (difficultyIndicator) {
    difficultyIndicator.textContent =
        "🧠 AI Difficulty: " +
        selectedDifficulty.charAt(0).toUpperCase() +
        selectedDifficulty.slice(1);
}

    moves = 0;
    matchedPairs = 0;
    flippedCards = [];
    timer = 0;

    console.log("Selected region:", 
    selectedRegion);

    const availableCards =
        regionCards[selectedRegion];

    let numberOfPairs;

    if (selectedDifficulty === "easy") {
        numberOfPairs = 4;
    }
    else if (selectedDifficulty === "medium") {
        numberOfPairs = 8;
    }
    else {
        numberOfPairs = 12;
    }

    // Randomly choose cards
    const shuffledCards =
        shuffle([...availableCards]);

    const selectedCards =
        shuffledCards.slice(0, numberOfPairs);

    // Create pairs
    cards = [];

    selectedCards.forEach(card => {

        cards.push({
            ...card
        });

        cards.push({
            ...card
        });

    });

    // Shuffle final cards
    shuffle(cards);

    createBoard();

    document.getElementById("moves").textContent = "0";
    document.getElementById("timer").textContent = "0";

    showScreen("gameScreen");

    timerInterval = setInterval(() => {

        timer++;

        document.getElementById("timer").textContent =
            timer;

    }, 1000);
}


// =====================================================
// CREATE BOARD
// =====================================================

function createBoard() {

    const gameBoard =
        document.getElementById("gameBoard");

    gameBoard.innerHTML = "";

    cards.forEach((cardData, index) => {

        const card =
            document.createElement("div");

        card.classList.add("card");

        card.dataset.image =
            cardData.image;

        card.dataset.name =
            getCardName(cardData.name);

        card.dataset.index =
            index;

        card.textContent = "❓";

        card.addEventListener("click", flipCard);

        gameBoard.appendChild(card);

    });
}


// =====================================================
// FLIP CARD
// =====================================================

function flipCard() {

    if (
        this.classList.contains("flipped") ||
        this.classList.contains("matched") ||
        flippedCards.length === 2
    ) {
        return;
    }

    this.classList.add("flipped");

    if (flippedCards.length === 0) {
        cardFlipStartTime = Date.now();
    }

    this.innerHTML =
    `<img src="${this.dataset.image}" alt="${this.dataset.name}">
     <div class="card-name">${this.dataset.name}</div>`;

    flippedCards.push(this);

    if (flippedCards.length === 2) {

        moves++;

        document.getElementById("moves").textContent =
            moves;

        checkMatch();
    }
}


// =====================================================
// CHECK MATCH
// =====================================================

function checkMatch() {

    const [card1, card2] =
        flippedCards;

    if (cardFlipStartTime) {
        const responseTime = (Date.now() - cardFlipStartTime) / 1000;
        responseTimes.push(responseTime);
        cardFlipStartTime = null;
    }

    if (card1.dataset.name === card2.dataset.name) {
        correctMatches++;

        card1.classList.add("matched");
        card2.classList.add("matched");

        flippedCards = [];

        matchedPairs++;

        const totalPairs =
            cards.length / 2;

        if (matchedPairs === totalPairs) {

            setTimeout(() => {

                clearInterval(timerInterval);

                showWinScreen();

            }, 600);
        }

    }
    else {
        mistakes++;

        setTimeout(() => {

            card1.classList.remove("flipped");
            card2.classList.remove("flipped");

            card1.textContent = "❓";
            card2.textContent = "❓";

            flippedCards = [];

        }, 900);
    }
    adjustDifficulty();
}

function adjustDifficulty() {
    const totalAttempts = correctMatches + mistakes;

    if (totalAttempts < 3) {
        return;
    }

    const accuracy = correctMatches / totalAttempts;

    const averageResponseTime =
        responseTimes.length > 0
            ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
            : 0;

    if (accuracy < 0.5 || averageResponseTime > 8) {
        selectedDifficulty = "easy";
    } else if (accuracy >= 0.8 && averageResponseTime <= 4) {
        selectedDifficulty = "hard";
    } else {
        selectedDifficulty = "medium";
    }
}


// =====================================================
// WIN SCREEN
// =====================================================

function showWinScreen() {

    const text =
        languageText[selectedLanguage];

    document.getElementById("winMessage").textContent =
        `${text.winMessage} ${text.moves}: ${moves} | ${text.time}: ${timer}s`;

    // Performance Report
    const totalAttempts = correctMatches + mistakes;

    const accuracy =
        totalAttempts > 0
            ? Math.round((correctMatches / totalAttempts) * 100)
            : 0;

    const averageResponseTime =
        responseTimes.length > 0
            ? (
                responseTimes.reduce((a, b) => a + b, 0) /
                responseTimes.length
              ).toFixed(1)
            : 0;

    document.getElementById("accuracyResult").textContent =
        accuracy + "%";

    document.getElementById("mistakesResult").textContent =
        mistakes;

    document.getElementById("correctMatchesResult").textContent =
        correctMatches;

    document.getElementById("averageTimeResult").textContent =
        averageResponseTime + "s";

    document.getElementById("finalDifficultyResult").textContent =
        selectedDifficulty.charAt(0).toUpperCase() +
        selectedDifficulty.slice(1);

    // Caregiver Summary
    let cognitiveStatus = "Good";
    let progressStatus = "Good";

    if (accuracy >= 80 && averageResponseTime <= 4) {
        cognitiveStatus = "Excellent";
        progressStatus = "Very Good";
    }
    else if (accuracy < 50 || averageResponseTime > 8) {
        cognitiveStatus = "Needs Attention";
        progressStatus = "Needs Improvement";
    }

    document.getElementById("cognitiveStatus").textContent =
        cognitiveStatus;

    document.getElementById("progressStatus").textContent =
        progressStatus;

    showScreen("winScreen");
}


// =====================================================
// RESTART GAME
// =====================================================

document.getElementById("restartBtn")
    .addEventListener("click", () => {

        startGame();

    });


// =====================================================
// PLAY AGAIN
// =====================================================

document.getElementById("playAgainBtn")
    .addEventListener("click", () => {

        startGame();

    });


// =====================================================
// HOME
// =====================================================

document.getElementById("homeBtn")
    .addEventListener("click", () => {

        clearInterval(timerInterval);

        showScreen("homeScreen");

    });

// =====================================================
// CAREGIVER DASHBOARD
// =====================================================

document.getElementById("caregiverBtn")
    .addEventListener("click", () => {

        document.getElementById("dashboardAccuracy").textContent =
            document.getElementById("accuracyResult").textContent;

        document.getElementById("dashboardMistakes").textContent =
            document.getElementById("mistakesResult").textContent;

        document.getElementById("dashboardCorrect").textContent =
            document.getElementById("correctMatchesResult").textContent;

        document.getElementById("dashboardTime").textContent =
            document.getElementById("averageTimeResult").textContent;

        document.getElementById("dashboardDifficulty").textContent =
            document.getElementById("finalDifficultyResult").textContent;

        document.getElementById("dashboardCognitive").textContent =
            document.getElementById("cognitiveStatus").textContent;

        document.getElementById("dashboardProgress").textContent =
            document.getElementById("progressStatus").textContent;

        showScreen("caregiverDashboard");

    });

    document.getElementById("dashboardHomeBtn")
    .addEventListener("click", () => {

        showScreen("homeScreen");

    });