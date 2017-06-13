const fs = require('fs');

const Q_AND_A_DIR = 'manually-cleaned';
const DIST_DIR = 'dist';

const getCatalogue = (name) => {
  const solutions = fs.readFileSync(`./${Q_AND_A_DIR}/${name}-solutions.md`, 'utf8').trim().split('');
  const questions = fs.readFileSync(`./${Q_AND_A_DIR}/${name}-questions.md`, 'utf8')
    .trim()
    .split('\n\n')
    .map((question, i) => {
      return {
        question: question.split('\n')[0],
        answers: question.split('\n').slice(1),
        correctAnswer: solutions[i],
      };
    });

  console.log(solutions.length);
  console.log(questions.length);

  return questions;
};

const saveCataloguesAsJSON = (catalogues) => {
  catalogues.forEach(catalogue =>
    fs.writeFileSync(`./${DIST_DIR}/${catalogue.name}-output.json`, JSON.stringify(catalogue.questions, null, 2))
  );
};

/*
* Anki supports HTML
* => We can leverage that, to make the questions look nicer
*/
const saveForAnki = (catalogues) => {
  catalogues.forEach(catalogue => {
    const questions = catalogue.questions.map(question => {
      const q = '<h1>' + question.question + '</h1>';
      const possibleAnswers = question.answers
        .map(answer => '<p>' + answer + '</p>')
        .join('');

      const front = '<div>' + q + possibleAnswers + '</div>';
      const back = question.correctAnswer;

      return [front.replace(';', ',.'), back].join(';');
    });

    fs.writeFileSync(`./${DIST_DIR}/${catalogue.name}-output-anki.csv`, questions.join('\n'));
  })
};

const saveCustomCSV = (catalogues) => {
  catalogues.forEach(catalogue => {
    const questions = catalogue.questions.map(question => {
      const q = question.question;
      const [ a1, a2, a3, a4 ] = question.answers
        .map(a => a.replace(/,/g, '\\,'))
        .map(a => a.replace(/ß/g, 'ss'))
        .map(a => a.replace(/ä/g, 'ae'))
        .map(a => a.replace(/Ä/g, 'AE'))
        .map(a => a.replace(/ö/g, 'oe'))
        .map(a => a.replace(/ü/g, 'ue'))
        .map(a => a.replace(/Ü/g, 'UE'));

      let correctAnswer;

      switch(question.correctAnswer) {
        case 'A': correctAnswer = '1'; break;
        case 'B': correctAnswer = '2'; break;
        case 'C': correctAnswer = '3'; break;
        case 'D': correctAnswer = '4'; break;
        default: break;
      }

      return [q, a1, a2, a3, a4, null, null, null, null, null, null, correctAnswer].join(',');
    });

    fs.writeFileSync(`./${catalogue.name}-output-custom.csv`, questions.join('\n'));
  })
};

const catalogues = [
  'flugpraxis',
  'luftrecht',
  'meteorologie',
  'technik',
].map(name => (
  {
    name,
    questions: getCatalogue(name)
  }
));

// console.log(catalogues);
// saveCustomCSV(catalogues);
// saveCataloguesAsJSON(catalogues);
saveForAnki(catalogues);
