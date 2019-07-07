/*------------------------Example 1.1-----------------------*/

/*Используя rest оператор и деструктуризацию, создать функцию, которая принимает
любое количество аргументов и возвращает объект, содержащий первый аргумент и массив из остатка:*/

function func() {
    let [first, ...other] = arguments;
    return {
        first: first,
        other: other
    };
}

console.log(func('a', 'b', 'c', 'd'));
func('a', 'b', 'c', 'd');

/*------------------------Example 1.2-----------------------*/

/*Организовать функцию getInfo, которая принимает объект вида
{ name: ...,  info: { employees: [...], partners: [ … ]  } }
и выводит в консоль имя (если имени нет, показывать ‘Unknown’) и первые две компании из массива partners:
*/

let getInfo = (data) => {
    let {
        name,
        info: {
            partners: [companyOne, companyTwo]
        }
    } = data;
    if (name === undefined) {
        name = 'Unknown';
        console.log(name);
        console.log(`Partners: ${companyOne} ${companyTwo}`);
    } else {
        console.log(`Name:  ${name}`);
        console.log(`Partners: ${companyOne} ${companyTwo}`);
    }
};

const organisation = {
    name: 'Google',
    info: {
        employees: ['Vlad', 'Olga'],
        partners: ['Microsoft', 'Facebook', 'Xing']
    }
};

getInfo(organisation);

/*------------------------Example 2.1-----------------------*/

// Переделать функцию с использованием функции-стрелки (в методе reduce тоже использовать arrow function):

let sum = (...args) => {
    const params = Array.prototype.slice.call(args);
    if (!params.length) return 0;
    return params.reduce((prev, next) => {
        return prev + next;
    });
};

sum(1, 2, 3, 4); // 10
sum(); // 0

/*------------------------Example 3.1-----------------------*/
/*Создать две функции и дать им осмысленные названия:
- первая функция принимает массив и колбэк (одна для всех вызовов)
- вторая функция (колбэк) обрабатывает каждый элемент массива (для каждого вызова свой callback)

Первая функция возвращает строку “New value: ” и результат обработки:

firstFunc([‘my’, ‘name’, ‘is’, ‘Trinity’], handler1) → “New value: MyNameIsTrinity”
firstFunc([10, 20, 30], handler2) → “New value: 100, 200, 300,”
firstFunc([{age: 45, name: ‘Jhon’}, {age: 20, name: ‘Aaron’}], handler3) →
“New value: Jhon is 45, Aaron is 20,”
firstFunc([‘abc’, ‘123’], handler4) → “New value: cba, 321,” // строки инвертируются*/

let firstFunc = (data, callback) => {
    callback(data);
    return `New value: ${callback(data)}`
};

let handler1 = array => {
    let arr = [];
    array.forEach((item, i, array) => {
        arr.push(array[i].charAt(0).toUpperCase() + array[i].slice(1))
    });
    return arr.join('');
};

let handler2 = array => {
    return array.map(x => x * 10).join(', ');
};

let handler3 = array => {
    let arr = [];
    array.forEach((item, i, array) => {
        arr.push(`${array[i].name} is ${array[i].age}`)
    });
    return arr.join(', ');
};

let handler4 = array => {
    let arr = [];
    array.forEach((item, i, array) => {
        arr.push(array[i].split('').reverse().join(''))
    });
    return arr.join(', ')
};

console.log(firstFunc(['my', 'name', 'is', 'Trinity'], handler1));
console.log(firstFunc([10, 20, 30], handler2));
console.log(firstFunc([{
    age: 45,
    name: 'Jhon'
}, {
    age: 20,
    name: 'Aaron'
}], handler3));
console.log(firstFunc(['abc', '123'], handler4));
firstFunc(['abc', '123'], handler4);
firstFunc([10, 20, 30], handler2);
firstFunc([{
    age: 45,
    name: 'Jhon'
}, {
    age: 20,
    name: 'Aaron'
}], handler3);
firstFunc(['abc', '123'], handler4);

/*------------------------Example 3.2-----------------------*/
/*
Написать аналог метода every.
Создайте функцию every, она должна принимать первым аргументом массив чисел
(обязательно проверьте что передан массив) вторым аргументом callback (обязательно проверьте что передана функция)
функция должна возвращать true или false в зависимости от результата вызова callback (проверить число больше 5).
Callback  должен принимать один элемент массива, его индекс в массиве и весь массив.
*/

let every = (arr, callback) => {
    if (arr instanceof Array && callback instanceof Function) {
        let el = 2;
        if (el >= arr.length || el < 0) {
            alert(`Выбранный Вами элемент ${el}, укажите номер элемента от 0 до ${arr.length - 1}`);
        } else {
            return callback(arr[el], arr.indexOf(arr[el]), arr);
        }
    } else {
        if (arr instanceof Array === false) {
            return alert(`Передаваемый аргумент ${arr} не является массивом`);
        } else {
            return alert(`Передаваемый аргумент ${callback} не является функцией`);
        }
    }
};

let handler = (el, item, arr) => {
    return el > 5;
};

console.log(every([1, 12, 25, 30, 44, 48], handler));
every([1, 12, 25, 30, 44, 48], handler);
