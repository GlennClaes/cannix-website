const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);

    let age = today.getFullYear() - birth.getFullYear();

    const birthdayPassed =
        today.getMonth() > birth.getMonth() ||
        (today.getMonth() === birth.getMonth() &&
            today.getDate() >= birth.getDate());

    if (!birthdayPassed) {
        age--;
    }

    return age;
};

export const bio = {
    name: "Cannix",
    tagline: "Energy. Bass. Connection.",

    age: calculateAge("2004-06-18"),

    shortBio: `Cannix is een DJ & producer met meer dan 5 jaar ervaring. Als DJ beweegt hij tussen allround fuifmuziek, echte meezingers, harde remixes en Drum & Bass. Binnen DnB ligt zijn focus onder andere op Jump Up, terwijl ook Hardstyle en Jumpstyle deel uitmaken van zijn sound.

  Wat hij ook draait of produceert, het doel blijft simpel: mensen laten bewegen, hun aandacht vasthouden en energie creëren.`,

    longBio: `Cannix is een Belgische DJ & producer die al meer dan 5 jaar actief is in de muziekwereld. Als DJ beweegt hij tussen verschillende stijlen en settings. Van allround fuiven met herkenbare meezingers en bekende feestplaten tot harde remixes en energieke Drum & Bass.

  Binnen Drum & Bass ligt zijn focus onder andere op Jump Up. Daarnaast maken ook Hardstyle en Jumpstyle deel uit van zijn muzikale stijl. Door die brede interesse kan Cannix zich aanpassen aan verschillende soorten publiek en events, zonder de energie uit het oog te verliezen.

  Naast DJ'en is Cannix ook actief als producer. In de studio werkt hij aan zijn eigen sound en experimenteert hij voortdurend met nieuwe muziek, sounds en ideeën.

  Of hij nu achter de draaitafels staat of in de studio zit, het doel blijft hetzelfde: mensen laten bewegen, hun aandacht vasthouden en een sfeer creëren die blijft hangen.`,

    stats: [
        { label: "Leeftijd", value: `${calculateAge("2004-06-18")}` },
        { label: "Jaar ervaring", value: "5+" },
        { label: "Optredens", value: "15+" },
        { label: "Festivals", value: "0" },
    ],

    genres: [
        "Allround",
        "Fuifmuziek",
        "Meezingers",
        "Harde Remixes",
        "Drum & Bass",
        "Jump Up",
        "Hardstyle",
        "Jumpstyle",
    ],

    socials: {
        instagram: "https://instagram.com/djcannix",
        facebook: "https://facebook.com/djcannix",
        soundcloud: "https://soundcloud.com/djcannix",
        mixcloud: "https://mixcloud.com/djcannix",
        email: "mailto:bookings@cannix.be",
    },

    contact: {
        email: "bookings@cannix.be",
        phone: "+32 4XX XX XX XX",
        management: "management@cannix.be",
    },
};