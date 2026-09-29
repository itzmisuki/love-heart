const heart = document.getElementById("heart");
const centerMessage = document.getElementById("center-message");

/* =========================================
   SETTINGS
========================================= */

const HEART_WORDS = 520;
const AMBIENT_WORDS = 320;

const SCALE = 18;

/* =========================================
   HEART MATHEMATICAL SHAPE
========================================= */

function heartPoint(t) {

    const x =
        16 *
        Math.pow(Math.sin(t), 3);

    const y =
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);

    return {
        x,
        y
    };
}

/* =========================================
   HEART BOUNDARY
========================================= */

const boundary = [];

for (let i = 0; i < 700; i++) {

    const t =
        (Math.PI * 2 * i) / 700;

    boundary.push(
        heartPoint(t)
    );
}

/* =========================================
   POINT INSIDE HEART
========================================= */

function isInsideHeart(x, y) {

    let inside = false;

    for (
        let i = 0,
            j = boundary.length - 1;

        i < boundary.length;

        j = i++
    ) {

        const xi = boundary[i].x;
        const yi = boundary[i].y;

        const xj = boundary[j].x;
        const yj = boundary[j].y;

        const intersect =
            yi > y !== yj > y &&
            x <
                ((xj - xi) *
                    (y - yi)) /
                    (yj - yi) +
                xi;

        if (intersect) {

            inside = !inside;
        }
    }

    return inside;
}

/* =========================================
   RANDOM POINT INSIDE
========================================= */

function randomInsideHeart() {

    while (true) {

        const x =
            Math.random() * 32 - 16;

        const y =
            Math.random() * 30 - 17;

        if (
            isInsideHeart(x, y)
        ) {

            return {
                x,
                y
            };
        }
    }
}

/* =========================================
   RANDOM BORDER POINT
========================================= */

function randomBoundary() {

    const point =
        boundary[
            Math.floor(
                Math.random() *
                boundary.length
            )
        ];

    return {
        x: point.x,
        y: point.y
    };
}

/* =========================================
   RED COLORS
========================================= */

function randomRed() {

    return Math.random() < 0.68
        ? "#b00018"
        : "#260006";
}

/* =========================================
   MAIN HEART WORDS
========================================= */

for (
    let i = 0;
    i < HEART_WORDS;
    i++
) {

    const word =
        document.createElement("span");

    word.className = "word";

    word.textContent =
        "I love you";

    const point =
        Math.random() < 0.34
            ? randomBoundary()
            : randomInsideHeart();

    const x =
        point.x * SCALE +
        (Math.random() * 10 - 5);

    const y =
        -point.y * SCALE +
        (Math.random() * 10 - 5);

    const startX =
        (Math.random() * 2 - 1) *
        1200;

    const startY =
        (Math.random() * 2 - 1) *
        900;

    const size =
        0.8 +
        Math.random() * 0.45;

    const duration =
        4.2 +
        Math.random() * 1.8;

    const delay =
        i * 0.009;

    const opacity =
        0.45 +
        Math.random() * 0.4;

    word.style.setProperty(
        "--x",
        `${x}px`
    );

    word.style.setProperty(
        "--y",
        `${y}px`
    );

    word.style.setProperty(
        "--start-x",
        `${startX}px`
    );

    word.style.setProperty(
        "--start-y",
        `${startY}px`
    );

    word.style.setProperty(
        "--scale",
        size
    );

    word.style.setProperty(
        "--duration",
        `${duration}s`
    );

    word.style.setProperty(
        "--delay",
        `${delay}s`
    );

    word.style.setProperty(
        "--opacity",
        opacity
    );

    word.style.setProperty(
        "--color",
        randomRed()
    );

    heart.appendChild(word);
}

/* =========================================
   EXTRA LIVING WORDS
========================================= */

function createAmbientWords() {

    for (
        let i = 0;
        i < AMBIENT_WORDS;
        i++
    ) {

        const word =
            document.createElement("span");

        word.className =
            "word ambient";

        word.textContent =
            "I love you";

        let point;

        if (
            Math.random() < 0.7
        ) {

            point =
                randomInsideHeart();

        } else {

            point =
                randomBoundary();
        }

        const x =
            point.x * SCALE +
            (Math.random() * 16 - 8);

        const y =
            -point.y * SCALE +
            (Math.random() * 16 - 8);

        /* Faster animation */

        const duration =
            2.1 +
            Math.random() * 1.8;

        const delay =
            -Math.random() * 4;

        const opacity =
            0.25 +
            Math.random() * 0.45;

        /* More visible movement */

        const moveX =
            Math.random() * 18 - 9;

        const moveY =
            Math.random() * 18 - 9;

        const scale =
            0.75 +
            Math.random() * 0.4;

        word.style.setProperty(
            "--x",
            `${x}px`
        );

        word.style.setProperty(
            "--y",
            `${y}px`
        );

        word.style.setProperty(
            "--duration",
            `${duration}s`
        );

        word.style.setProperty(
            "--delay",
            `${delay}s`
        );

        word.style.setProperty(
            "--opacity",
            opacity
        );

        word.style.setProperty(
            "--move-x",
            `${moveX}px`
        );

        word.style.setProperty(
            "--move-y",
            `${moveY}px`
        );

        word.style.setProperty(
            "--scale",
            scale
        );

        word.style.setProperty(
            "--color",
            Math.random() < 0.58
                ? "#b00018"
                : "#260006"
        );

        heart.appendChild(word);
    }
}

/* =========================================
   START EXTRA ANIMATION
========================================= */

setTimeout(() => {

    createAmbientWords();

}, 8500);

/* =========================================
   FINAL MESSAGE
========================================= */

setTimeout(() => {

    centerMessage.classList.add(
        "show"
    );

}, 11300);