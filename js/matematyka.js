
function obliczPole(figura)
{
    switch (figura)
    {
        case 'kwadrat':
        {
            let a = document.querySelector("#square-a").value;

            if (a > 0)
                document.querySelector("#result").innerHTML = `Pole tego kwadratu wynosi ${a * a} cm<sup>2</sup>`;
            else
                document.querySelector("#result").innerHTML = `Wartość musi być większa od 0!`;

            break;
        }
        case 'prostokat':
        {
            let a = document.querySelector("#rectangle-a").value;
            let b = document.querySelector("#rectangle-b").value;

            if (a > 0 && b > 0)
                document.querySelector("#result").innerHTML = `Pole tego prostokąta wynosi ${a * b} cm<sup>2</sup>`;
            else
                document.querySelector("#result").innerHTML = `Wartości muszą być większe od 0!`;

            break;
        }
        case 'trojkat':
        {
            let a = document.querySelector("#traingle-a").value;
            let h = document.querySelector("#triangle-h").value;

            if (a > 0 && h > 0)
                document.querySelector("#result").innerHTML = `Pole tego trójkąta wynosi ${a * h / 2} cm<sup>2</sup>`;
            else
                document.querySelector("#result").innerHTML = `Wartości muszą być większe od 0!`;

            break;
        }
        case 'rownoleglobok':
        {
            let a = document.querySelector("#parallelogram-a").value;
            let h = document.querySelector("#parallelogram-h").value;

            if (a > 0 && h > 0)
                document.querySelector("#result").innerHTML = `Pole tego równoległoboku wynosi ${a * h} cm<sup>2</sup>`;
            else
                document.querySelector("#result").innerHTML = `Wartości muszą być większe od 0!`;

            break;
        }
        case 'romb':
        {
            let e = document.querySelector("#rhombus-e").value;
            let f = document.querySelector("#rhombus-f").value;

            if (e > 0 && f > 0)
                document.querySelector("#result").innerHTML = `Pole tego trójkąta wynosi ${e * f / 2} cm<sup>2</sup>`;
            else
                document.querySelector("#result").innerHTML = `Wartości muszą być większe od 0!`;

            break;
        }
        case 'trapez':
        {
            let a = document.querySelector("#trapeze-a").value;
            let b = document.querySelector("#trapeze-b").value;
            let h = document.querySelector("#trapeze-h").value;

            if (a > 0 && b > 0 && h > 0) 
                document.querySelector("#result").innerHTML = `Pole tego trapezu wynosi ${(a + b) * h / 2} cm<sup>2</sup>`;
            else
                document.querySelector("#result").innerHTML = `Wartości muszą być większe od 0!`;

            break;
        }
        case 'kolo':
        {
            let d = document.querySelector("#circle-d").value;
            let r = d /2;

            if (d > 0) 
                document.querySelector("#result").innerHTML = `Pole tego koła wynosi ${(Math.PI * (r ** r)).toFixed(2)} cm<sup>2</sup>`;
            else
                document.querySelector("#result").innerHTML = `Wartości muszą być większe od 0!`;

            break;
        }
        case 'prostopadloscian':
        {
            let a = document.querySelector("#cuboid-a").value;
            let b = document.querySelector("#cuboid-b").value;
            let h = document.querySelector("#cuboid-h").value;

            if (a > 0 && b > 0 && h > 0) 
                document.querySelector("#result").innerHTML = `Pole tego prostopadłościanu wynosi ${2*(a*b + a*h + b*h)} cm<sup>2</sup>`;
            else
                document.querySelector("#result").innerHTML = `Wartości muszą być większe od 0!`;

            break;
        }
        case 'elipsa':
        {
            let a = document.querySelector("#ellipse-a").value;
            let b = document.querySelector("#ellipse-b").value;

            if (a > 0 && b > 0) 
                document.querySelector("#result").innerHTML = `Pole tej elipsy wynosi ${(Math.PI * a * b).toFixed(2)} cm<sup>2</sup>`;
            else
                document.querySelector("#result").innerHTML = `Wartości muszą być większe od 0!`;

            break;
        }
    }
}

// ZMIENNE RÓWNAŃ
let temp = '';
let leftSide = [];
let rightSide = [];
let side = leftSide;
let sign = "+";
let xLeft = 0;
let xRight = 0;
let x;
let leftResult = 0;
let rightResult = 0;
let result;

function obliczRownanieLiniowe()
{
    let input = document.getElementById("equality").value;
    input = input.replace(/\s/g,'');
    
    for (let i = 0; i < input.length; i++)
    {
        if (!isNaN(input[i]))
            temp += input[i];

        if (input[i] == "-")
        {
            if (input.length == 1)
                temp += '-';
            else
            {
                if (input[i - 1] != "x")
                {   
                    side.push(Number(temp));
                    temp = '';
                    sign = '-';
                }
                else
                {
                    temp = '';
                    sign = '-';
                }
            }
        }
        if (input[i] == "." || input[i] == ",")
            temp += '.';

        if (input[i] == "+" && temp != '')
        {
            if (input[i - 1] != "x")
            {   
                side.push(Number(temp));
                temp = '';
            }
            else
                temp = '';
        }
        if (sign == "-")
        {
            temp += "-";
            sign = '+';
        }
        if (input[i] == "=" && temp != '')
        {
            if (input[i - 1] != "x")
            {   
                side.push(Number(temp));
                temp = '';
                side = rightSide;
            }
            else
            {
                temp = '';
                side = rightSide;
            }
        }
        if (input[i] == 'x')
        {
            if (!temp)
                temp += '1';
            if (side == leftSide)
                xLeft += Number(temp);
            if (side == rightSide)
                xRight += Number(temp);
        }
    }
    if (!isNaN(input[input.length - 1]))
        rightSide.push(Number(temp))

    for (let i = 0; i < leftSide.length; i++)
        leftResult += leftSide[i];

    for (let i = 0; i < rightSide.length; i++)
        rightResult += rightSide[i];

    x = xLeft + -xRight;
    if (!isNaN(x))
    {
        result = rightResult - leftResult;
        result /= x;
    }
    if (!isNaN(result) && input.includes('='))
        document.getElementById('result').innerHTML = `Wynik równania <strong>${input}</strong><br>wynosi <strong>x = ${parseFloat(result.toFixed(2))}</strong>`;
    else
        document.getElementById('result').innerHTML = '<strong>Nieprawidłowe dane!</strong>';

    temp = '';
    leftSide = [];
    rightSide = [];
    side = leftSide;
    sign = "+";
    xLeft = 0;
    xRight = 0;
    x = 0;
    leftResult = 0;
    rightResult = 0;
    result = 0;
}

function ciagArytmetyczny()
{
    let a = Number(document.querySelector("#arithseq-a").value);
    let r = Number(document.querySelector("#arithseq-r").value);
    let b = Number(document.querySelector("#arithseq-b").value);
    let sequence = `${a}`;
    for (let i = 0; i < b - 1; i++)
    {
        sequence += `, ${a + r}`;
        a += r;
    }
    if (a != 0 && b != 0 && r != 0)
        document.getElementById('result').innerHTML = `Twój ciąg to: ${sequence}`;
}
function ciagGeometryczny()
{
    let a = Number(document.querySelector("#geoseq-a").value);
    let q = Number(document.querySelector("#geoseq-q").value);
    let b = Number(document.querySelector("#geoseq-b").value);
    let sequence = `${a}`;
    for (let i = 0; i < b - 1; i++)
    {
        sequence += `, ${a * q}`;
        a *= q;
    }
    if (a != 0 && b != 0 && q != 0)
        document.getElementById('result').innerHTML = `Twój ciąg to: ${sequence}`;
}
function silnia()
{
    let a = parseInt(document.querySelector("#factorial-a").value);
    let x = a;

    if (!isNaN(a))
    {
        if (a > 0)
        {
            for (let i = 1; i < a; i++)
            {
                x *= (a - i);
            }
            document.getElementById('result').innerHTML = `Silnia liczby <strong>${a}! = ${x}</strong>`;
        }
        else if (a < 0)
        document.getElementById('result').innerHTML = `Nie da się obliczyć silni dla liczby ${a}`;
        else
        {
            x = 1;
            document.getElementById('result').innerHTML = `Silnia liczby <strong>${a}! = ${x}</strong>`;
        }
    }
}
function najwiekszyDzielnik()
{
    let a = parseInt(document.querySelector("#divider-a").value);
    let b = parseInt(document.querySelector("#divider-b").value);
    let save = [a, b];
    if (!isNaN(a) || !isNaN(b))
    {
        while (a != b)
        {
            if (a > b)
                a = a - b;
            else
                b = b - a;
        }
        document.getElementById('result').innerHTML = `Największy wspólny dzielnik liczb ${save[0]} i ${save[1]} wynosi <strong>${a}</strong>`;
    }
}