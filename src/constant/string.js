import indonesian from './indonesian.js';
import english from './english.js';
// const language = 'english';
const language = 'indonesian';

function getString(payload) {
    if (language == 'english') {
        if (english[payload]) {
            return english[payload]
        } else {
            return 'String Undefined'
        }
    } else {
        if (indonesian[payload]) {
            return indonesian[payload]
        } else {
            return 'String Undefined'
        }
    }
}

export const str = {
    welcome: getString('welcome'),
    back: getString('back'),
    signIn: getString('signIn'),
    or: getString('or'),
    signUp: getString('signUp'),
    forgotPass: getString('forgotPass'),
    name: getString('name'),
    password: getString('password'),
    register: getString('register'),
    account: getString('account'),
    passConfirm: getString('passConfirm'),
    tnc: getString('tnc'),
    tutor: getString('tutor'),
    school: getString('school'),
    schedule: getString('schedule'),
    article: getString('article'),
    category: getString('category')
}

