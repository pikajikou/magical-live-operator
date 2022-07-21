/**
 * API チュートリアル「1. 開発の始め方」のサンプルコードを参考にしています。
 * TextAlive App API basic example
 * https://github.com/TextAliveJp/textalive-app-basic
 * https://developer.textalive.jp/app/
 */

import { Player, stringToDataUrl } from "textalive-app-api";

let lyricsorder = -1;
let changeflag = true;
let seekbarflag = false;
let deleteflag = true;

var nowUpLeftLight = "";
var nowMidLeftLight = "";
var nowLowLeftLight = "";
var nowUpRightLight = "";
var nowMidRightLight = "";
var nowLowRightLight = "";

const animateWord = function (now, unit) {
  if (unit.contains(now)) {
    var textelements = document.getElementsByClassName("lyricsframe");
    var footer = document.getElementById("phrase")
    var strSelect = document.getElementById("strselect");

    if (seekbarflag) {
      footer.textContent = unit.parent.text;
      let index = unit.parent.text.indexOf(unit.text);
      footer.textContent = unit.parent.text.substring(0, index);
      console.log(unit.parent.text + ", " + unit.text + ", " + footer.textContent)
      if (lyricsorder != -1) {
        textelements[lyricsorder].textContent = unit.parent.text;
        textelements[lyricsorder].textContent = textelements[lyricsorder].textContent.substring(0, index);
      }
      seekbarflag = false;
      return
    }

    if (unit.text === unit.parent.firstWord.text) {
      footer.textContent = unit.text;
      if (textelements.length == 0) { return; }
      if (changeflag) {
        lyricsorder += 1;
        changeflag = false;
      }
      if (lyricsorder >= textelements.length) { lyricsorder = 0; }
      if (deleteflag) {
        while (textelements[lyricsorder].firstChild) {
          textelements[lyricsorder].removeChild(textelements[lyricsorder].firstChild)
        }
        var new_word = document.createElement("div");

        if (strSelect.value == "popup") {
          new_word.style.animation = "popup 1.5s forwards";
        } else if (strSelect.value == "kurukuru") {
          new_word.style.animation = "kurukuru 1.5s forwards";
        } else if (strSelect.value == "slidein") {
          new_word.style.animation = "slidein 1.5s forwards";
        } else if (strSelect.value == "slideup") {
          new_word.style.animation = "slideup 1.5s forwards";
        }

        new_word.style.fontWeight = 800;
        new_word.style.display = "inline-block"
        new_word.textContent = unit.text;
        textelements[lyricsorder].appendChild(new_word);
      }
      deleteflag = false;
    } else if (footer.textContent.indexOf(unit.text) === -1 || !(footer.textContent.endsWith(unit.text))) {
      footer.textContent += unit.text;
      if (textelements.count == 0) { return; }
      changeflag = true;
      deleteflag = true;
      var new_word = document.createElement("div");
      if (strSelect.value == "popup") {
        new_word.style.animation = "popup 1.5s forwards";
      } else if (strSelect.value == "kurukuru") {
        new_word.style.animation = "kurukuru 1.5s forwards";
      } else if (strSelect.value == "slidein") {
        new_word.style.animation = "slidein 1.5s forwards";
      } else if (strSelect.value == "slideup") {
        new_word.style.animation = "slideup 1.5s forwards";
      }
      new_word.style.fontWeight = 800;
      new_word.style.display = "inline-block"
      new_word.textContent = unit.text;
      textelements[lyricsorder].appendChild(new_word);

    }
  }
};

// TextAlive Player を作る
// Instantiate a TextAlive Player instance
const player = new Player({
  app: {
    token: "Q93hUOurwTq9cdTs",
  },
  mediaElement: document.querySelector("#media"),
});

// TextAlive Player のイベントリスナを登録する
// Register event listeners
player.addListener({
  onAppReady,
  onVideoReady,
  onTimerReady,
  onTimeUpdate,
  onPlay,
  onPause,
  onStop,
});

const playBtns = document.querySelectorAll(".play");
const jumpBtn = document.querySelector("#jump");
const pauseBtn = document.querySelector("#pause");
const rewindBtn = document.querySelector("#rewind");
const seekbar = document.querySelector("#seekbar");
const paintedSeekbar = seekbar.querySelector("div");

const artistSpan = document.querySelector("#artist span");
const songSpan = document.querySelector("#song span");

/**
 * TextAlive App が初期化されたときに呼ばれる
 *
 * @param {IPlayerApp} app - https://developer.textalive.jp/packages/textalive-app-api/interfaces/iplayerapp.html
 */
function onAppReady(app) {
  // TextAlive ホストと接続されていなければ再生コントロールを表示する
  // Show control if this app is launched standalone (not connected to a TextAlive host)
  if (!app.managed) {
    // Loading Memories / せきこみごはん feat. 初音ミク
    player.createFromSongUrl("https://piapro.jp/t/RoPB/20220122172830", {
      video: {
        // 音楽地図訂正履歴: https://songle.jp/songs/2243651/history
        beatId: 4086301,
        chordId: 2221797,
        repetitiveSegmentId: 2247682,
        // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FRoPB%2F20220122172830
        lyricId: 53718,
        lyricDiffId: 7076
      },
    });

    // 青に溶けた風船 / シアン・キノ feat. 初音ミク
    // player.createFromSongUrl("https://piapro.jp/t/9cSd/20220205030039", {
    //   video: {
    //     // 音楽地図訂正履歴: https://songle.jp/songs/2245015/history
    //     beatId: 4083452,
    //     chordId: 2221996,
    //     repetitiveSegmentId: 2247861,
    //     // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2F9cSd%2F20220205030039
    //     lyricId: 53745,
    //     lyricDiffId: 7080
    //   },
    // });

    // 歌の欠片と / imo feat. MEIKO
    // player.createFromSongUrl("https://piapro.jp/t/Yvi-/20220207132910", {
    //   video: {
    //     // 音楽地図訂正履歴: https://songle.jp/songs/2245016/history
    //     beatId: 4086832,
    //     chordId: 2222074,
    //     repetitiveSegmentId: 2247935,
    //     // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FYvi-%2F20220207132910
    //     lyricId: 53746,
    //     lyricDiffId: 7082
    //   },
    // });

    // 未完のストーリー / 加賀（ネギシャワーP） feat. 初音ミク
    // player.createFromSongUrl("https://piapro.jp/t/ehtN/20220207101534", {
    //   video: {
    //     // 音楽地図訂正履歴: https://songle.jp/songs/2245017/history
    //     beatId: 4083459,
    //     chordId: 2222147,
    //     repetitiveSegmentId: 2248008,
    //     // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FehtN%2F20220207101534
    //     lyricId: 53747,
    //     lyricDiffId: 7083
    //   },
    // });

    // みはるかす / ねこむら（cat nap） feat. 初音ミク
    // player.createFromSongUrl("https://piapro.jp/t/QtjE/20220207164031", {
    //   video: {
    //     // 音楽地図訂正履歴: https://songle.jp/songs/2245018/history
    //     beatId: 4083470,
    //     chordId: 2222187,
    //     repetitiveSegmentId: 2248075,
    //     // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FQtjE%2F20220207164031
    //     lyricId: 53748,
    //     lyricDiffId: 7084
    //   },
    // });

    // fear / 201 feat. 初音ミク
    // player.createFromSongUrl("https://piapro.jp/t/GqT2/20220129182012", {
    //   video: {
    //     // 音楽地図訂正履歴: https://songle.jp/songs/2245019/history
    //     beatId: 4083475,
    //     chordId: 2222294,
    //     repetitiveSegmentId: 2248170,
    //     // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FGqT2%2F20220129182012
    //     lyricId: 53749,
    //     lyricDiffId: 7085
    //   },
    // });

    document.querySelector("#control").style.display = "inline-block";

    // 再生ボタン / Start music playback
    playBtns.forEach((playBtn) =>
      playBtn.addEventListener("click", () => {
        player.video && player.requestPlay();
        playBtns[0].textContent = "再開！"
      })
    );

    // 歌詞頭出しボタン / Seek to the first character in lyrics text
    jumpBtn.addEventListener(
      "click",
      () => player.video && player.requestMediaSeek(player.video.firstChar.startTime)
    );

    // 一時停止ボタン / Pause music playback
    pauseBtn.addEventListener(
      "click",
      () => player.video && player.requestPause()
    );

    // 巻き戻しボタン / Rewind music playback
    rewindBtn.addEventListener(
      "click",
      () => player.video && player.requestMediaSeek(0)
    );
  }
}

/**
 * 動画オブジェクトの準備が整ったとき（楽曲に関する情報を読み込み終わったとき）に呼ばれる
 *
 * @param {IVideo} v - https://developer.textalive.jp/packages/textalive-app-api/interfaces/ivideo.html
 */
function onVideoReady(v) {
  // メタデータを表示する
  // Show meta data
  artistSpan.textContent = player.data.song.artist.name;
  songSpan.textContent = player.data.song.name;

  // 定期的に呼ばれる各単語の "animate" 関数をセットする
  // Set "animate" function
  let w = player.video.firstWord;
  while (w) {
    w.animate = animateWord;
    w = w.next;
  }
}

/**
 * 音源の再生準備が完了した時に呼ばれる
 *
 * @param {Timer} t - https://developer.textalive.jp/packages/textalive-app-api/interfaces/timer.html
 */
function onTimerReady(t) {
  // ボタンを有効化する
  // Enable buttons
  if (!player.app.managed) {
    document
      .querySelectorAll("button")
      .forEach((btn) => (btn.disabled = false));
  }

  // 歌詞がなければ歌詞頭出しボタンを無効にする
  // Disable jump button if no lyrics is available
  jumpBtn.disabled = !player.video.firstChar;
}

/* 再生位置の情報が更新されたら呼ばれる */
let b, beat;
function onTimeUpdate(position) {
  //console.log("onTimeUpdate")
  // 現在のビート情報を取得
  beat = player.findBeat(position);
  if (b !== beat) {
    b = beat;
  }
  // シークバーの表示を更新
  paintedSeekbar.style.width = `${parseInt((position * 1000) / player.video.duration) / 10
    }%`;
  // 歌詞情報がなければこれで処理を終わる
  if (!player.video.firstChar) {
    return;
  }
}

/**
 * 動画の再生位置が変更されたときに呼ばれる（あまりに頻繁な発火を防ぐため一定間隔に間引かれる）
 *
 * @param {number} position - https://developer.textalive.jp/packages/textalive-app-api/interfaces/playereventlistener.html#onthrottledtimeupdate
 */


// 再生が始まったら #overlay を非表示に
// Hide #overlay when music playback started
function onPlay() {
  document.querySelector("#overlay").style.display = "none";
}

// 再生が一時停止・停止したら歌詞表示をリセット
// Reset lyrics text field when music playback is paused or stopped
function onPause() {
  //document.querySelector("#text").textContent = "-";
}
function onStop() {
  //document.querySelector("#text").textContent = "-";
}

// 照明制御ボタン
//上段左
const upLeftWhiteBtn = document.querySelector("#upleftwhitebtn");
const upLeftMikuBtn = document.querySelector("#upleftmikubtn");
const upLeftRinBtn = document.querySelector("#upleftrinbtn");
const upLeftLenBtn = document.querySelector("#upleftlenbtn");
const upLeftLukaBtn = document.querySelector("#upleftlukabtn");
const upLeftKaitoBtn = document.querySelector("#upleftkaitobtn");
const upLeftMeikoBtn = document.querySelector("#upleftmeikobtn");
const upLeftOffBtn = document.querySelector("#upleftoffbtn");

//中段左
const midLeftWhiteBtn = document.querySelector("#midleftwhitebtn");
const midLeftMikuBtn = document.querySelector("#midleftmikubtn");
const midLeftRinBtn = document.querySelector("#midleftrinbtn");
const midLeftLenBtn = document.querySelector("#midleftlenbtn");
const midLeftLukaBtn = document.querySelector("#midleftlukabtn");
const midLeftKaitoBtn = document.querySelector("#midleftkaitobtn");
const midLeftMeikoBtn = document.querySelector("#midleftmeikobtn");
const midLeftOffBtn = document.querySelector("#midleftoffbtn");

//下段左
const lowLeftWhiteBtn = document.querySelector("#lowleftwhitebtn");
const lowLeftMikuBtn = document.querySelector("#lowleftmikubtn");
const lowLeftRinBtn = document.querySelector("#lowleftrinbtn");
const lowLeftLenBtn = document.querySelector("#lowleftlenbtn");
const lowLeftLukaBtn = document.querySelector("#lowleftlukabtn");
const lowLeftKaitoBtn = document.querySelector("#lowleftkaitobtn");
const lowLeftMeikoBtn = document.querySelector("#lowleftmeikobtn");
const lowLeftOffBtn = document.querySelector("#lowleftoffbtn");

//上段右
const upRightWhiteBtn = document.querySelector("#uprightwhitebtn");
const upRightMikuBtn = document.querySelector("#uprightmikubtn");
const upRightRinBtn = document.querySelector("#uprightrinbtn");
const upRightLenBtn = document.querySelector("#uprightlenbtn");
const upRightLukaBtn = document.querySelector("#uprightlukabtn");
const upRightKaitoBtn = document.querySelector("#uprightkaitobtn");
const upRightMeikoBtn = document.querySelector("#uprightmeikobtn");
const upRightOffBtn = document.querySelector("#uprightoffbtn");

//中段右
const midRightWhiteBtn = document.querySelector("#midrightwhitebtn");
const midRightMikuBtn = document.querySelector("#midrightmikubtn");
const midRightRinBtn = document.querySelector("#midrightrinbtn");
const midRightLenBtn = document.querySelector("#midrightlenbtn");
const midRightLukaBtn = document.querySelector("#midrightlukabtn");
const midRightKaitoBtn = document.querySelector("#midrightkaitobtn");
const midRightMeikoBtn = document.querySelector("#midrightmeikobtn");
const midRightOffBtn = document.querySelector("#midrightoffbtn");

//下段右
const lowRightWhiteBtn = document.querySelector("#lowrightwhitebtn");
const lowRightMikuBtn = document.querySelector("#lowrightmikubtn");
const lowRightRinBtn = document.querySelector("#lowrightrinbtn");
const lowRightLenBtn = document.querySelector("#lowrightlenbtn");
const lowRightLukaBtn = document.querySelector("#lowrightlukabtn");
const lowRightKaitoBtn = document.querySelector("#lowrightkaitobtn");
const lowRightMeikoBtn = document.querySelector("#lowrightmeikobtn");
const lowRightOffBtn = document.querySelector("#lowrightoffbtn");




const helpBtn = document.querySelector("#helpb");
const overlayplayBtn = document.getElementsByClassName("play");
const imglist = document.querySelectorAll("img");
const songSelect = document.getElementById("songselect");


// 照明制御ボタンイベントリスナーセット
// 上段左
upLeftWhiteBtn.addEventListener("click", () => changeUpLeftLight("upleftwhite"));
upLeftMikuBtn.addEventListener("click", () => changeUpLeftLight("upleftmiku"));
upLeftRinBtn.addEventListener("click", () => changeUpLeftLight("upleftrin"));
upLeftLenBtn.addEventListener("click", () => changeUpLeftLight("upleftlen"));
upLeftLukaBtn.addEventListener("click", () => changeUpLeftLight("upleftluka"));
upLeftKaitoBtn.addEventListener("click", () => changeUpLeftLight("upleftkaito"));
upLeftMeikoBtn.addEventListener("click", () => changeUpLeftLight("upleftmeiko"));
upLeftOffBtn.addEventListener("click", () => changeUpLeftLight(""));

// 中段左
midLeftWhiteBtn.addEventListener("click", () => changeMidLeftLight("midleftwhite"));
midLeftMikuBtn.addEventListener("click", () => changeMidLeftLight("midleftmiku"));
midLeftRinBtn.addEventListener("click", () => changeMidLeftLight("midleftrin"));
midLeftLenBtn.addEventListener("click", () => changeMidLeftLight("midleftlen"));
midLeftLukaBtn.addEventListener("click", () => changeMidLeftLight("midleftluka"));
midLeftKaitoBtn.addEventListener("click", () => changeMidLeftLight("midleftkaito"));
midLeftMeikoBtn.addEventListener("click", () => changeMidLeftLight("midleftmeiko"));
midLeftOffBtn.addEventListener("click", () => changeMidLeftLight(""));

// 下段左
lowLeftWhiteBtn.addEventListener("click", () => changeLowLeftLight("lowleftwhite"));
lowLeftMikuBtn.addEventListener("click", () => changeLowLeftLight("lowleftmiku"));
lowLeftRinBtn.addEventListener("click", () => changeLowLeftLight("lowleftrin"));
lowLeftLenBtn.addEventListener("click", () => changeLowLeftLight("lowleftlen"));
lowLeftLukaBtn.addEventListener("click", () => changeLowLeftLight("lowleftluka"));
lowLeftKaitoBtn.addEventListener("click", () => changeLowLeftLight("lowleftkaito"));
lowLeftMeikoBtn.addEventListener("click", () => changeLowLeftLight("lowleftmeiko"));
lowLeftOffBtn.addEventListener("click", () => changeLowLeftLight(""));

// 上段右
upRightWhiteBtn.addEventListener("click", () => changeUpRightLight("uprightwhite"));
upRightMikuBtn.addEventListener("click", () => changeUpRightLight("uprightmiku"));
upRightRinBtn.addEventListener("click", () => changeUpRightLight("uprightrin"));
upRightLenBtn.addEventListener("click", () => changeUpRightLight("uprightlen"));
upRightLukaBtn.addEventListener("click", () => changeUpRightLight("uprightluka"));
upRightKaitoBtn.addEventListener("click", () => changeUpRightLight("uprightkaito"));
upRightMeikoBtn.addEventListener("click", () => changeUpRightLight("uprightmeiko"));
upRightOffBtn.addEventListener("click", () => changeUpRightLight(""));

// 中段右
midRightWhiteBtn.addEventListener("click", () => changeMidRightLight("midrightwhite"));
midRightMikuBtn.addEventListener("click", () => changeMidRightLight("midrightmiku"));
midRightRinBtn.addEventListener("click", () => changeMidRightLight("midrightrin"));
midRightLenBtn.addEventListener("click", () => changeMidRightLight("midrightlen"));
midRightLukaBtn.addEventListener("click", () => changeMidRightLight("midrightluka"));
midRightKaitoBtn.addEventListener("click", () => changeMidRightLight("midrightkaito"));
midRightMeikoBtn.addEventListener("click", () => changeMidRightLight("midrightmeiko"));
midRightOffBtn.addEventListener("click", () => changeMidRightLight(""));

// 下段右
lowRightWhiteBtn.addEventListener("click", () => changeLowRightLight("lowrightwhite"));
lowRightMikuBtn.addEventListener("click", () => changeLowRightLight("lowrightmiku"));
lowRightRinBtn.addEventListener("click", () => changeLowRightLight("lowrightrin"));
lowRightLenBtn.addEventListener("click", () => changeLowRightLight("lowrightlen"));
lowRightLukaBtn.addEventListener("click", () => changeLowRightLight("lowrightluka"));
lowRightKaitoBtn.addEventListener("click", () => changeLowRightLight("lowrightkaito"));
lowRightMeikoBtn.addEventListener("click", () => changeLowRightLight("lowrightmeiko"));
lowRightOffBtn.addEventListener("click", () => changeLowRightLight(""));


helpBtn.addEventListener("click", () => showHelp());
playBtns[0].addEventListener("click", () => closeHelp());
overlayplayBtn[0].addEventListener("mouseout", () => mouseoutPlayBtn());
overlayplayBtn[0].addEventListener("mouseover", () => mouseoverPlayBtn());

songSelect.addEventListener("change", () => changeSongurl());

// 上段左に色セット
function changeUpLeftLight(id) {
  if (nowUpLeftLight) {
    var light = document.getElementById(nowUpLeftLight);
    light.style.display = "none";
  }
  nowUpLeftLight = id;
  if (nowUpLeftLight) {
    var light = document.getElementById(nowUpLeftLight);
    light.style.display = "inline";
  }
}

// 中段左に色セット
function changeMidLeftLight(id) {
  if (nowMidLeftLight) {
    var light = document.getElementById(nowMidLeftLight);
    light.style.display = "none";
  }
  nowMidLeftLight = id;
  if (nowMidLeftLight) {
    var light = document.getElementById(nowMidLeftLight);
    light.style.display = "inline";
  }
}

// 下段左に色セット
function changeLowLeftLight(id) {
  if (nowLowLeftLight) {
    var light = document.getElementById(nowLowLeftLight);
    light.style.display = "none";
  }
  nowLowLeftLight = id;
  if (nowLowLeftLight) {
    var light = document.getElementById(nowLowLeftLight);
    light.style.display = "inline";
  }
}

// 上段右に色セット
function changeUpRightLight(id) {
  if (nowUpRightLight) {
    var light = document.getElementById(nowUpRightLight);
    light.style.display = "none";
  }
  nowUpRightLight = id;
  if (nowUpRightLight) {
    var light = document.getElementById(nowUpRightLight);
    light.style.display = "inline";
  }
}

// 中段右に色セット
function changeMidRightLight(id) {
  if (nowMidRightLight) {
    var light = document.getElementById(nowMidRightLight);
    light.style.display = "none";
  }
  nowMidRightLight = id;
  if (nowMidRightLight) {
    var light = document.getElementById(nowMidRightLight);
    light.style.display = "inline";
  }
}

// 下段右に色セット
function changeLowRightLight(id) {
  if (nowLowRightLight) {
    var light = document.getElementById(nowLowRightLight);
    light.style.display = "none";
  }
  nowLowRightLight = id;
  if (nowLowRightLight) {
    var light = document.getElementById(nowLowRightLight);
    light.style.display = "inline";
  }
}

/* シークバー */
seekbar.addEventListener("click", (e) => {
  e.preventDefault();
  if (player) {
    player.requestMediaSeek(
      (player.video.duration * e.offsetX) / seekbar.clientWidth
    );
    seekbarflag = true;
  }
  return false;
});

function showHelp() {
  var overlay = document.querySelector("#overlay")
  //console.log(playBtns)
  if (overlay.style.display == "none") {
    overlay.style.display = "";
  }
}
function closeHelp() {
  var overlay = document.querySelector("#overlay")
  //console.log(playBtns)
  if (overlay.style.display == "") {
    overlay.style.display = "none";
  }
}
function mouseoutPlayBtn() {
  overlayplayBtn[0].style.backgroundColor = "#cfdfd3"
}
function mouseoverPlayBtn() {
  overlayplayBtn[0].style.backgroundColor = "#73f894"
}

function changeSongurl() {
  var targetsong = document.getElementById("songselect");
  //console.log(targetsong.value)
  //console.log(player.mediaElement)

  if (targetsong.value == "sfirst") {
    player.createFromSongUrl("https://piapro.jp/t/RoPB/20220122172830", {
      video: {
        // 音楽地図訂正履歴: https://songle.jp/songs/2243651/history
        beatId: 4086301,
        chordId: 2221797,
        repetitiveSegmentId: 2247682,
        // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FRoPB%2F20220122172830
        lyricId: 53718,
        lyricDiffId: 7076
      },
    });
  } else if (targetsong.value == "ssecond") {
    player.createFromSongUrl("https://piapro.jp/t/9cSd/20220205030039", {
      video: {
        // 音楽地図訂正履歴: https://songle.jp/songs/2245015/history
        beatId: 4083452,
        chordId: 2221996,
        repetitiveSegmentId: 2247861,
        // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2F9cSd%2F20220205030039
        lyricId: 53745,
        lyricDiffId: 7080
      },
    });
  } else if (targetsong.value == "sthird") {
    player.createFromSongUrl("https://piapro.jp/t/Yvi-/20220207132910", {
      video: {
        // 音楽地図訂正履歴: https://songle.jp/songs/2245016/history
        beatId: 4086832,
        chordId: 2222074,
        repetitiveSegmentId: 2247935,
        // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FYvi-%2F20220207132910
        lyricId: 53746,
        lyricDiffId: 7082
      },
    });
  } else if (targetsong.value == "sfourth") {
    player.createFromSongUrl("https://piapro.jp/t/ehtN/20220207101534", {
      video: {
        // 音楽地図訂正履歴: https://songle.jp/songs/2245017/history
        beatId: 4083459,
        chordId: 2222147,
        repetitiveSegmentId: 2248008,
        // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FehtN%2F20220207101534
        lyricId: 53747,
        lyricDiffId: 7083
      },
    });
  } else if (targetsong.value == "sfifth") {
    player.createFromSongUrl("https://piapro.jp/t/QtjE/20220207164031", {
      video: {
        // 音楽地図訂正履歴: https://songle.jp/songs/2245018/history
        beatId: 4083470,
        chordId: 2222187,
        repetitiveSegmentId: 2248075,
        // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FQtjE%2F20220207164031
        lyricId: 53748,
        lyricDiffId: 7084
      },
    });
  } else if (targetsong.value == "ssixth") {
    player.createFromSongUrl("https://piapro.jp/t/GqT2/20220129182012", {
      video: {
        // 音楽地図訂正履歴: https://songle.jp/songs/2245019/history
        beatId: 4083475,
        chordId: 2222294,
        repetitiveSegmentId: 2248170,
        // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FGqT2%2F20220129182012
        lyricId: 53749,
        lyricDiffId: 7085
      },
    });
  }
}

