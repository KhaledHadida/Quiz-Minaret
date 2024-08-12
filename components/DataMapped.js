//Below is my statically mapped data (mostly the quizzes)
//Could've put this in one of the .js files under screen but think it's best i organize my code
//also this design is best for scalability (adding more languages)

const quizDataMapping = {
    "English": {
        "Islamic Foundations": require('../quizzes/English/Islamic Foundations.json'),
        "Islamic History": require('../quizzes/English/Islamic History.json'),
        "Islamic Practices": require('../quizzes/English/Islamic Practices.json'),
    },
    "Arabic": {
        "Islamic Foundations": require('../quizzes/Arabic/Islamic Foundations.json'),
        "Islamic History": require('../quizzes/Arabic/Islamic History.json'),
        "Islamic Practices": require('../quizzes/Arabic/Islamic Practices.json'),
    }
};

const imageMapping = {
    "Islamic Foundations": require('../assets/Islamic Foundation.png'),
    "Islamic History": require('../assets/Islamic History.png'),
    "Islamic Practices": require('../assets/Islamic Practice.png'),
};

export { quizDataMapping, imageMapping };