import { useMemo, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle, Shuffle, Trophy, BookOpen, ArrowRight } from "lucide-react";

const QUESTION_POOL = [
  {
    question: "Wann wurde Martin Luther geboren?",
    options: ["10. November 1483", "11. November 1483", "10. November 1519", "28. April 1521"],
    answer: 0,
    explanation: "Im Arbeitsblatt steht, dass Martin Luther am 10. November 1483 geboren wurde. Danach beginnt die Geschichte von seiner Familie und seiner Kindheit."
  },
  {
    question: "Wo wurde Martin Luther geboren?",
    options: ["Mansfeld", "Worms", "Eisleben", "Eisenach"],
    answer: 2,
    explanation: "Als Geburtsort wird Eisleben genannt. Später zog seine Familie dann nach Mansfeld."
  },
  {
    question: "Was arbeitete Martins Vater?",
    options: ["Bergarbeiter", "Lehrer", "Kaiser", "Pfarrer"],
    answer: 0,
    explanation: "Sein Vater war Bergarbeiter. So wird im Material beschrieben, aus welcher Familie Martin Luther kam."
  },
  {
    question: "Worum kümmerte sich Martins Mutter?",
    options: ["Um die Schule", "Um die kinderreiche Familie", "Um den Klostergarten", "Um die Bibel"],
    answer: 1,
    explanation: "Im Text steht, dass sich seine Mutter um die kinderreiche Familie kümmerte. Damit wird das Leben in seiner Familie erklärt."
  },
  {
    question: "Warum nannten die Eltern ihren Sohn Martin?",
    options: ["Weil sein Vater so hieß", "Weil es ein Familienname war", "Weil am 11. November Martinstag war", "Weil ein Mönch es vorgeschlagen hatte"],
    answer: 2,
    explanation: "Der Name wird mit dem Martinstag am 11. November erklärt. Das steht direkt bei seiner Geburt."
  },
  {
    question: "Wohin zog die Familie, als Martin ein Jahr alt war?",
    options: ["Nach Magdeburg", "Nach Mansfeld", "Nach Wittenberg", "Nach Wartburg"],
    answer: 1,
    explanation: "Nach einem Jahr zog die Familie nach Mansfeld. Dort verbrachte Martin seine Kindheit."
  },
  {
    question: "Wo verbrachte Martin seine Kindheit?",
    options: ["In Mansfeld", "In Worms", "In Eisenach", "In Eisleben"],
    answer: 0,
    explanation: "Seine Kindheit verbrachte er in Mansfeld. Dieser Ort war für seine frühen Jahre wichtig."
  },
  {
    question: "Wie alt war Martin, als er in die Schule kam?",
    options: ["5 Jahre", "6 Jahre", "7 Jahre", "8 Jahre"],
    answer: 1,
    explanation: "Im Text steht, dass er mit sechs Jahren eingeschult wurde. Das zeigt, wie früh seine Schulzeit begann."
  },
  {
    question: "In welche Stadt kam Martin mit 14 Jahren zur Schule?",
    options: ["Eisleben", "Eisenach", "Magdeburg", "Rom"],
    answer: 2,
    explanation: "Mit 14 Jahren kam Martin auf eine Schule in Magdeburg. Dort war das Lernen sehr streng."
  },
  {
    question: "Welche Sprache mussten alle Kinder in der Schule in Magdeburg sprechen?",
    options: ["Deutsch", "Latein", "Griechisch", "Hebräisch"],
    answer: 1,
    explanation: "Im Text steht: ‚In dieser Schule mussten alle Kinder Latein sprechen.' Das war damals an solchen Schulen üblich."
  },
  {
    question: "Wer ging damals laut Text in die Schule?",
    options: ["Nur Mädchen", "Jungen und Mädchen", "Nur Jungen", "Nur Kinder aus Klöstern"],
    answer: 2,
    explanation: "Im Material steht, dass nur Jungen zur Schule gingen. Mädchen mussten stattdessen zu Hause helfen."
  },
  {
    question: "Was mussten die Mädchen stattdessen tun?",
    options: ["Im Kloster leben", "Den Müttern im Haushalt helfen", "Latein lernen", "Im Bergwerk arbeiten"],
    answer: 1,
    explanation: "Der Text sagt, dass die Mädchen den Müttern im Haushalt helfen mussten. Daran sieht man, dass Jungen und Mädchen damals sehr unterschiedlich lebten."
  },
  {
    question: "Wie war Martin als Schüler?",
    options: ["Faul und unruhig", "Fleißig und gut", "Still und langsam", "Streng und hart"],
    answer: 1,
    explanation: "Luther wird als sehr fleißiger und guter Schüler beschrieben. Er lernte außerdem schnell."
  },
  {
    question: "Wie lernte Martin?",
    options: ["Sehr langsam", "Nur mit Hilfe", "Er lernte schnell", "Er lernte ungern"],
    answer: 2,
    explanation: "Im Text steht ausdrücklich: Er lernte schnell. Das passt dazu, dass er als guter Schüler beschrieben wird."
  },
  {
    question: "Vor wem hatte Martin in der Schule Angst?",
    options: ["Vor der Reise", "Vor seinem Lehrer", "Vor Büchern", "Vor Mitschülern"],
    answer: 1,
    explanation: "Er hatte Angst vor seinem Lehrer, weil dieser streng war. Das zeigt, dass Schule damals oft hart war."
  },
  {
    question: "Was kam laut Text öfter vor?",
    options: ["Der Lehrer schlug Schüler mit einem Stock", "Die Kinder lasen die Bibel", "Alle Kinder beteten zusammen", "Die Schule fiel oft aus"],
    answer: 0,
    explanation: "Es kam des Öfteren vor, dass der Lehrer die Schüler mit einem Stock schlug. Das wird im Material als Teil des harten Schulalltags beschrieben."
  },
  {
    question: "In welche Stadt kam Martin mit 15 Jahren zur Schule?",
    options: ["Eisenach", "Mansfeld", "Worms", "Wittenberg"],
    answer: 0,
    explanation: "Mit 15 Jahren kam Martin nach Eisenach zur Schule. Auch das war eine wichtige Station in seiner Jugend."
  },
  {
    question: "Bei wem wohnte Martin in Eisenach?",
    options: ["Bei seinem Onkel", "Im Kloster", "Bei einer anderen Familie", "Allein"],
    answer: 2,
    explanation: "Im Text steht, dass er dort bei einer anderen Familie wohnte. So konnte er die Schule in Eisenach besuchen."
  },
  {
    question: "Welche Angst war für Martin am schlimmsten?",
    options: ["Angst vor Krankheiten", "Angst vor den Eltern", "Angst vor Gott", "Angst vor der Schule"],
    answer: 2,
    explanation: "Am schlimmsten war seine Angst vor Gott. Diese Angst begleitete ihn lange Zeit."
  },
  {
    question: "Was konnte Martin wegen seines guten Abschlusses studieren?",
    options: ["Eine Pilgerreise", "Rechtswissenschaften", "Das Leben im Kloster", "Lehramt"],
    answer: 1,
    explanation: "Sein guter Schulabschluss ermöglichte ihm ein Studium der Rechtswissenschaften. Das wird im Material als nächster wichtiger Schritt beschrieben."
  },
  {
    question: "Wie war Martin Luther auch im Kloster?",
    options: ["Sehr faul", "Sehr fleißig", "Oft krank und untätig", "Nur beim Beten aktiv"],
    answer: 1,
    explanation: "Der Text sagt, dass Martin Luther auch im Kloster sehr fleißig war. Er nahm sein Leben dort sehr ernst."
  },
  {
    question: "Was wollte Martin im Kloster sein?",
    options: ["Ein guter Mönch", "Ein Lehrer", "Ein Kaiserberater", "Ein Händler"],
    answer: 0,
    explanation: "Er wollte Gott gefallen und ein guter Mönch sein. Gerade deshalb machte er sich viele Gedanken über sein Leben vor Gott."
  },
  {
    question: "Wozu verpflichtete sich Martin mit seinem Gelübde?",
    options: ["Zu reisen und viel Geld zu sammeln", "Nicht zu heiraten, kein Geld zu besitzen und zu vielem mehr", "Nur noch zu unterrichten", "In seine Heimat zurückzukehren"],
    answer: 1,
    explanation: "Im Arbeitsblatt steht, dass er sich verpflichtete, nicht zu heiraten, kein Geld zu besitzen und zu vielem mehr. Daran merkt man, wie streng das Klosterleben im Material beschrieben wird."
  },
  {
    question: "Woraus bestanden die Tage im Kloster?",
    options: ["Aus Reisen und Unterricht", "Aus Beten und dem Studium der Bibel", "Aus Arbeit im Bergwerk", "Aus Festen und Feiern"],
    answer: 1,
    explanation: "Die Klostertage bestanden aus Beten und dem Studium der Bibel. Das war sein Alltag im Kloster."
  },
  {
    question: "Warum wurde im Kloster sehr oft gefastet?",
    options: ["Um Geld zu sparen", "Um Gott näher zu sein", "Um gesund zu bleiben", "Weil es keine Küche gab"],
    answer: 1,
    explanation: "Es wurde wenig gegessen und getrunken, um Gott näher zu sein. So beschreibt das Material das strenge Leben im Kloster."
  },
  {
    question: "War Luther im Kloster glücklich?",
    options: ["Ja, immer", "Nur am Anfang", "Nein", "Nur beim Essen"],
    answer: 2,
    explanation: "Im Text steht ausdrücklich, dass Luther nicht glücklich war. Seine Sorgen und seine Angst vor Gott blieben."
  },
  {
    question: "Was beschäftigte Martin im Kloster weiter?",
    options: ["Nur Heimweh", "Angst vor Gott und die Frage, womit er Gott gefallen könne", "Der Wunsch nach Reichtum", "Streit mit Mitschülern"],
    answer: 1,
    explanation: "Er hatte noch immer Angst vor Gott und wusste nicht, womit er Gott gefallen konnte. Das war für ihn eine große innere Not."
  },
  {
    question: "Wie früh musste Martin laut Tagebucheintrag aufstehen?",
    options: ["Um 5.00 Uhr", "Um 4.00 Uhr", "Um 6.00 Uhr", "Um 3.00 Uhr"],
    answer: 1,
    explanation: "Im Tagebucheintrag steht, dass er um 4.00 Uhr aufstehen musste. Auch daran sieht man, wie streng der Tagesablauf war."
  },
  {
    question: "Welcher Satz ist laut Material eine berühmte Idee von Martin Luther?",
    options: ["Der Mensch wird durch Arbeit gerecht", "Der Gerechte wird aus Glauben leben", "Nur Könige sprechen für Gott", "Geld bringt Vergebung"],
    answer: 1,
    explanation: "Der hervorgehobene Satz lautet: Der Gerechte wird aus Glauben leben. Diese Erkenntnis war für Martin Luther sehr wichtig."
  },
  {
    question: "Was konnte man laut Luther nicht mit Geld kaufen?",
    options: ["Die Bibel", "Die Vergebung der Sünden", "Die Schule", "Das Klosterleben"],
    answer: 1,
    explanation: "Er sagte, dass man die Vergebung der Sünden nicht mit Geld erkaufen könne. Damit wandte er sich gegen eine wichtige Praxis seiner Zeit."
  },
  {
    question: "Wer allein konnte den Menschen ihre Schuld vergeben?",
    options: ["Nur der Papst", "Nur die Kirche", "Nur Gott allein", "Der Kaiser"],
    answer: 2,
    explanation: "Im Text steht, dass nur Gott allein den Menschen ihre Schuld vergeben könne. Das war ein zentraler Gedanke von Luther."
  },
  {
    question: "Wem steht der einzelne Mensch laut Luther direkt gegenüber?",
    options: ["Dem Papst", "Dem Lehrer", "Gott", "Dem Kaiser"],
    answer: 2,
    explanation: "Der einzelne Mensch stehe unmittelbar Gott gegenüber. Auch damit widersprach Luther wichtigen Vorstellungen seiner Zeit."
  },
  {
    question: "Wer wollte seine eigenen Worte und Kirchengesetze nicht an der Wahrheit der Bibel messen lassen?",
    options: ["Karl V.", "Friedrich der Weise", "Der Papst", "Micha"],
    answer: 2,
    explanation: "Im Text heißt es, der Papst wollte das nicht. Dadurch kam es zum Streit mit Luther."
  },
  {
    question: "Welche Strafe verhängte Papst Leo X. 1521 gegen Martin Luther?",
    options: ["Reichsacht", "Kirchenbann", "Gefängnis", "Schulverbot"],
    answer: 1,
    explanation: "Papst Leo X. verhängte 1521 den Kirchenbann. Das war eine schwere Strafe der Kirche."
  },
  {
    question: "Wie heißt eine heute noch berühmte Schrift von Martin Luther?",
    options: ["Die Freiheit eines Christenmenschen", "Über die Schule", "Das Leben im Kloster", "Der Weg nach Worms"],
    answer: 0,
    explanation: "Diese Schrift wird im Material ausdrücklich genannt. Sie gehört zu seinen bekannten Texten."
  },
  {
    question: "Wer wurde 1519 neuer Kaiser im Heiligen Römischen Reich Deutscher Nation?",
    options: ["Leo X.", "Karl V.", "Friedrich der Weise", "Martin Luther"],
    answer: 1,
    explanation: "Im Text steht, dass Karl V. 1519 neuer Kaiser wurde. Später spielte er im Streit mit Luther eine wichtige Rolle."
  },
  {
    question: "Wer setzte sich sehr für Martin Luther ein?",
    options: ["Der Lehrer in Magdeburg", "Der Papst", "Der sächsische Kurfürst Friedrich der Weise", "Micha"],
    answer: 2,
    explanation: "Friedrich der Weise setzte sich für Luther ein. Er half ihm später auch, in Sicherheit zu kommen."
  },
  {
    question: "Wohin wurde Martin Luther eingeladen, um seine Ansichten zu verteidigen?",
    options: ["Nach Eisleben", "Zum Reichstag nach Worms", "Nach Rom", "In die Schule nach Eisenach"],
    answer: 1,
    explanation: "Er wurde zum Reichstag nach Worms eingeladen. Dort sollte er zu seinen Schriften Stellung nehmen."
  },
  {
    question: "Was verlangte man von Martin Luther in Worms?",
    options: ["Dass er Kaiser wird", "Dass er seine Schriften widerruft", "Dass er ins Kloster zurückgeht", "Dass er ein neues Buch schreibt"],
    answer: 1,
    explanation: "Man forderte ihn auf, seine Schriften zu widerrufen. Luther sollte also seine Aussagen zurücknehmen."
  },
  {
    question: "Womit konnte Luther den Widerruf nicht vereinbaren?",
    options: ["Mit seinem Gewissen", "Mit seiner Familie", "Mit seinem Studium", "Mit seiner Reise"],
    answer: 0,
    explanation: "Er sagte, dass er so etwas gegen sein Gewissen nicht tun könne. Dieser Satz gehört zu den bekanntesten Momenten seines Lebens."
  },
  {
    question: "Welche Strafe verhängte Karl V. gegen Martin Luther?",
    options: ["Den Kirchenbann", "Die Reichsacht", "Hausarrest", "Geldstrafe"],
    answer: 1,
    explanation: "Nach dem Reichstag verhängte Karl V. die Reichsacht gegen Luther. Damit wurde seine Lage noch gefährlicher."
  },
  {
    question: "Was bedeutete diese Strafe für Martin Luther?",
    options: ["Er war vogelfrei", "Er wurde Lehrer", "Er durfte wieder predigen", "Er wurde reich"],
    answer: 0,
    explanation: "Im Text steht, dass Luther dadurch vogelfrei war. Das bedeutete, dass er nicht mehr geschützt war."
  },
  {
    question: "Wohin wurde Martin Luther zur Sicherheit gebracht?",
    options: ["Nach Eisleben", "Zur Wartburg", "Nach Magdeburg", "Nach Rom"],
    answer: 1,
    explanation: "Friedrich der Weise ließ ihn auf die Wartburg bringen. Dort war Luther zunächst in Sicherheit."
  }
];

const QUESTIONS_PER_ROUND = 5;

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getRoundQuestions() {
  return shuffle(QUESTION_POOL).slice(0, QUESTIONS_PER_ROUND);
}

export default function MartinLutherQuiz() {
  const [roundQuestions, setRoundQuestions] = useState(() => getRoundQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  // null = not yet answered, true = correct, false = wrong
  const [results, setResults] = useState(() => Array(QUESTIONS_PER_ROUND).fill(null));

  const currentQuestion = roundQuestions[currentIndex];

  const handleAnswer = (index) => {
    if (hasAnswered || isFinished) return;
    const correct = index === currentQuestion.answer;
    setSelectedIndex(index);
    setHasAnswered(true);
    if (correct) setScore((prev) => prev + 1);
    setResults((prev) => {
      const next = [...prev];
      next[currentIndex] = correct;
      return next;
    });
  };

  const handleNextQuestion = () => {
    if (!hasAnswered) return;
    const isLastQuestion = currentIndex === roundQuestions.length - 1;
    if (isLastQuestion) {
      setIsFinished(true);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setSelectedIndex(null);
    setHasAnswered(false);
  };

  const startNewRound = () => {
    setRoundQuestions(getRoundQuestions());
    setCurrentIndex(0);
    setScore(0);
    setSelectedIndex(null);
    setHasAnswered(false);
    setIsFinished(false);
    setResults(Array(QUESTIONS_PER_ROUND).fill(null));
  };

  useEffect(() => {
    if (!isFinished || score !== QUESTIONS_PER_ROUND) return;
    const end = Date.now() + 2500;
    const frame = () => {
      confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, [isFinished, score]);

  if (isFinished) {
    const percentage = Math.round((score / QUESTIONS_PER_ROUND) * 100);
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl bg-white shadow-xl overflow-hidden">
            <div className="p-6 md:p-8 pb-4 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <Trophy className="h-8 w-8 text-slate-700" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">Runde beendet</h1>
              <p className="mt-2 text-slate-600">
                Du hast 5 zufällige Fragen aus einem Pool von {QUESTION_POOL.length} Fragen beantwortet.
              </p>
            </div>
            <div className="p-6 md:p-8 pt-2 space-y-6">
              <div className="rounded-2xl bg-slate-100 p-6 text-center">
                <div className="text-sm uppercase tracking-wide text-slate-500">Dein Score</div>
                <div className="mt-2 text-5xl font-bold text-slate-900">
                  {score} / {QUESTIONS_PER_ROUND}
                </div>
                <div className="mt-2 text-lg text-slate-700">{percentage}% richtig</div>
                <div className="mt-4 flex gap-1.5">
                  {results.map((r, i) => (
                    <div
                      key={i}
                      className={`h-3 flex-1 rounded-full ${r === true ? "bg-green-500" : "bg-red-500"}`}
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={startNewRound}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 text-base font-medium text-white hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <Shuffle className="h-4 w-4" />
                Neue Runde starten
              </button>
              <p className="text-center text-sm text-slate-500">
                In jeder neuen Runde werden wieder 5 Fragen zufällig ausgewählt.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="rounded-3xl bg-white shadow-xl overflow-hidden">
          <div className="p-6 md:p-8 pb-4 space-y-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2 text-slate-500">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-sm">Martin-Luther-Quiz</span>
                </div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Frage {currentIndex + 1} von {QUESTIONS_PER_ROUND}
                </h1>
              </div>
              <div className="rounded-2xl bg-slate-100 px-4 py-3 text-center">
                <div className="text-xs uppercase tracking-wide text-slate-500">Score</div>
                <div className="text-2xl font-bold text-slate-900">{score}</div>
              </div>
            </div>
            {/* Progress segments */}
            <div className="flex gap-1.5">
              {Array.from({ length: QUESTIONS_PER_ROUND }).map((_, i) => {
                const isCurrent = !isFinished && i === currentIndex;
                const result = results[i];
                let cls = "h-3 flex-1 rounded-full transition-colors duration-300 ";
                if (result === true) cls += "bg-green-500";
                else if (result === false) cls += "bg-red-500";
                else if (isCurrent) cls += "bg-slate-900";
                else cls += "bg-slate-200";
                return <div key={i} className={cls} />;
              })}
            </div>
          </div>

          <div className="p-6 md:p-8 pt-2 space-y-6">
            <h2 className="text-2xl font-semibold leading-snug text-slate-900">
              {currentQuestion.question}
            </h2>

            <div className="grid gap-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedIndex === index;
                const isCorrect = index === currentQuestion.answer;

                let cls =
                  "flex w-full items-start gap-3 rounded-2xl border px-4 py-4 text-left text-base transition-colors";

                if (hasAnswered) {
                  if (isCorrect) {
                    cls += " border-green-600 bg-green-50 text-green-900";
                  } else if (isSelected && !isCorrect) {
                    cls += " border-red-600 bg-red-50 text-red-900";
                  } else {
                    cls += " border-slate-200 bg-white text-slate-700";
                  }
                } else {
                  cls += " border-slate-200 bg-white text-slate-900 hover:bg-slate-100 cursor-pointer";
                }

                return (
                  <button
                    key={`${currentIndex}-${index}`}
                    className={cls}
                    onClick={() => handleAnswer(index)}
                    disabled={hasAnswered}
                  >
                    <span className="font-semibold shrink-0">{String.fromCharCode(65 + index)}.</span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {hasAnswered && (
              <div
                className={`rounded-2xl p-4 ${
                  selectedIndex === currentQuestion.answer ? "bg-green-50" : "bg-red-50"
                }`}
              >
                <div className="mb-2 flex items-center gap-2 font-semibold">
                  {selectedIndex === currentQuestion.answer ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-700" />
                      <span className="text-green-800">Richtig</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-700" />
                      <span className="text-red-800">Falsch</span>
                    </>
                  )}
                </div>
                <p className="text-slate-800">
                  <span className="font-semibold">Richtige Antwort: </span>
                  {currentQuestion.options[currentQuestion.answer]}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{currentQuestion.explanation}</p>
                <button
                  onClick={handleNextQuestion}
                  className="mt-4 flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  {currentIndex === roundQuestions.length - 1 ? "Zur Auswertung" : "Nächste Frage"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-sm text-slate-500">
          Jede Runde zeigt 5 zufällige Fragen aus einem Pool von 40 Fragen.
        </p>
      </div>
    </div>
  );
}
