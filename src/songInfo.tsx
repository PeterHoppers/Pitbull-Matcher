class SongInfo {
    fileName: string;
    songName: string;
    id: number = 0;

    constructor(fileName: string, songName: string) {
        this.fileName = fileName;
        this.songName = songName;
    }

    setId(id: number) {
        this.id = id;
    }

    getRapSongURL() {
        return this.getSongURL(songType.Rap);
    }

    getSongURL(songType: string) {
        return `/Pitbull-Matcher/audio/${this.fileName}/${songType}.mp3`;
    }
}

const songList = Object.freeze([
    new SongInfo("BackInTime", "Back In Time"),
    new SongInfo("DanceAgain", "Dance Again"),
    new SongInfo("DJGotUsFallingInLove", "DJ Got Us Fallin' In Love"),
    new SongInfo("DontStopTheParty", "Don't Stop the Party"),
    new SongInfo("FeelThisMoment", "Feel This Moment"),
    new SongInfo("Fireball", "Fireball"),
    new SongInfo("GiveMeEverything", "Give Me Everything"),
    new SongInfo("HeyBaby", "Hey Baby (Drop It to the Floor)"),
    new SongInfo("HotelRoomService", "Hotel Room Service"),
    new SongInfo("IKnowYouWantMe", "I Know You Want Me"),
    new SongInfo("ILikeIt", "I Like It"),
    new SongInfo("InternationLove", "International Love"),
    new SongInfo("OnTheFloor", "On The Floor"),
    new SongInfo("RainOverMe", "Rain Over Me"),
    new SongInfo("Timber", "Timber"),
    new SongInfo("TimeOfOurLives", "Time Of Our Lives")
]);

enum songType {
    Rap = "rap",
    TTS = "tts",
    Instrumental = "instrumental",
}    

function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
    

export {
    SongInfo,
    songList,
    songType,
    shuffleArray
} ;