export const introPy = {
  questions: [
    {
      question:
                'What is Python primarily known for?',
      choices: [
        'High-performance gaming.',
        'Web design and development.',
        'Scientific computing and data analysis.',
        'Real-time operating systems.'
      ],
      type: 'MCQs',
      correctAnswer: 'Web design and development.'
    },
    {
      question: 'Which of the following is not a fundamental data type in Python?',
      choices: [
        'Integer',
        'Float',
        'Complex',
        'String'
      ],
      type: 'MCQs',
      correctAnswer: 'String'
    },
    {
      question:
                'Which keyword is used to define a function in Python?',
      choices: ['def',
        'func',
        'define',
        'function'],
      type: 'MCQs',
      correctAnswer: 'def'
    },
    {
      question: 'What is the purpose of an if statement in Python?',
      choices: ['To define a loop.',
        'To print output to the console.',
        'To check a condition and execute code based on whether it\'s true or false.',
        'To import external modules.'],
      type: 'MCQs',
      correctAnswer: 'To check a condition and execute code based on whether it\'s true or false.'
    },
    {
      question: 'Which Python data structure is an ordered collection of elements, and can contain elements of different data types?',
      choices: [
        'List',
        'Dictionary',
        'Set',
        'Tuple'
      ],
      type: 'MCQs',
      correctAnswer: 'Dictionary'
    }
  ]
};

export const resultInitalState = {
  score: 0,
  correctAnswers: 0,
  wrongAnswers: 0
};
