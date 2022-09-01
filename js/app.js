const quitBtn = document.querySelector('.quit');
const reduceBtn = document.querySelector('.reduce');
const increaseBtn = document.querySelector('.increase');
const listNums = document.querySelectorAll("button:not(.operator):not(.equalSign)");
const operatos = document.querySelectorAll("button.operator");
const options = document.querySelectorAll(".options span")
const resultElem = document.querySelector("#inner-result")
const equalSign = document.querySelector(".equalSign")
const buttonsDiv = document.querySelector('.buttons')

let firstNum = ""
let secNum = ""
let curOpr = ""
let result = "0"

reduceBtn.addEventListener('click', () => {
    buttonsDiv.style.height = "0px"
    reduceBtn.classList.add('hide')
    increaseBtn.classList.remove('hide')

})

increaseBtn.addEventListener('click', () => {
    buttonsDiv.style.height = "300px"
    increaseBtn.classList.add('hide')
    reduceBtn.classList.remove('hide')

})


listNums.forEach(num => {
    num.addEventListener('click', () => {

        if(curOpr === ""){

            firstNum += num.innerHTML !== "," ? num.innerHTML : canAddComa(firstNum) ? num.innerHTML : "";
            resultElem.innerHTML = firstNum

        } else {

            secNum += num.innerHTML !== "," ? num.innerHTML : canAddComa(secNum) ? num.innerHTML : "";
            resultElem.innerHTML = secNum
            
        }
    
    })
})

operatos.forEach(op => {
    op.addEventListener('click', () =>{
        if(op.innerHTML === "AC") {
            firstNum = ""
            secNum = ""
            curOpr = ""
            result = "0"
            resultElem.innerHTML = result

        } else if(op.innerHTML === "%") {
            if(secNum.length > 0) {
                secNum = eval(secNum + "/100")
                resultElem.innerHTML = secNum
            } else {
                firstNum = eval(firstNum + "/100")
                resultElem.innerHTML = firstNum
            }
        } else if(firstNum.length > 0 && curOpr.length === 0) {
            curOpr = op.innerHTML === "x" ? "*" : op.innerHTML
            resultElem.innerHTML = curOpr 
        }
    })
})

equalSign.addEventListener('click', () => {
    if(firstNum.length > 0 && secNum.length > 0 && curOpr.length > 0) {
        console.log("equal => ",firstNum, curOpr, secNum)

        console.log("type of a", typeof firstNum)
        console.log("type of b", typeof secNum)
        let final = calculate(firstNum, secNum, curOpr)
        console.log("final => ",final)

        
        result = final
        firstNum = final
        secNum = ""
        curOpr = ""
        resultElem.innerHTML = result
    } 
})

// let calcString = ""

const calculate = (a, b, operator) => {
    let final = 0;

    if(a.indexOf(',') >= 0) { 
        a = a.replace(',', '.')
        a = parseFloat(a) 
    }
    else if(a.indexOf(',') < 0) { 
        a = parseInt(a) 
    }

    if(b.indexOf(',') >= 0) { 
        b = b.replace(',', '.')
        b = parseFloat(b) 
    }
    else if(b.indexOf(',') < 0) {
        b = parseInt(b) 
    }

    console.log(typeof a, typeof b, a, b)

    if(operator === "+") { final = a + b }
    if(operator === "-") { final = a - b }
    if(operator === "*") { final = a * b }
    if(operator === "/") { final = a / b }

    if(final % 1 === 0) { final = final.toFixed(2) }

    let finalStr = (`${final}`).replace('.', ',') 

    if(finalStr.split(',').length === 2) {
        let [int, float] = finalStr.split(',')
        float = float.substring(0,2)
        finalStr = `${int},${float}` 
    }

    if(finalStr.split(',')[1] == "00"){
        finalStr = finalStr.split(',')[0]
    }

    return finalStr

}

function canAddComa(str){
    if(str.indexOf(",") >= 0) return false
    else return true
}